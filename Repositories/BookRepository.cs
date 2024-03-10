using System.Data;
using Dapper;
using SonataStash.Interfaces;
using SonataStash.Models;

namespace SonataStash.Repositories;

public class BookRepository : BaseRepository, IBookRepository
{
    public BookRepository(IConfiguration configuration) : base(configuration)
    {
    }

    public async Task<int> AddBookAsync(Book book)
    {
        const string sql = """
                           INSERT INTO books (book_title, publisher, volume_info, isbn, book_description, book_composer_id)
                                                           VALUES (@BookTitle, @Publisher, @VolumeInfo, @Isbn, @BookDescription, @BookComposerId)
                                                           RETURNING book_id
                           """;
        using (var db = Connection)
        {
            var createdBookId = await db.QuerySingleAsync<int>(sql, book);
            book.BookId = createdBookId;
            foreach (var bc in book.BookContents)
            {
                // sequentially create any needed new pieces
                if (bc.ContentPieceId is null)
                {
                    var createdPieceId = await db.QuerySingleAsync<int>(pieceCreateSql, bc.Piece);
                    bc.ContentPieceId = createdPieceId;
                }
            }

            // add batched joins
            var bcSql = book.BookContents.Select((x, index) => $@"
    INSERT INTO book_contents(content_book_id, content_piece_id, page_range) 
    VALUES (@ContentBookId{index}, @CreatedPieceId{index}, @PageRange{index});")
                .Aggregate((current, next) => current + next);

            var parameters = new DynamicParameters();
            for (int i = 0; i < book.BookContents.Count; i++)
            {
                parameters.Add($"ContentBookId{i}", createdBookId, DbType.Int32);
                parameters.Add($"CreatedPieceId{i}", book.BookContents[i].ContentPieceId, DbType.Int32);
                parameters.Add($"PageRange{i}", book.BookContents[i].PageRange, DbType.String);
            }

            await db.ExecuteAsync(bcSql, parameters);
            return createdBookId;
        }
    }

    public async Task<Book?> GetBookByIdAsync(int bookId)
    {
        var sql = bookSql + " WHERE b.book_id = @bookId";

        using (var db = Connection)
        {
            var bookDictionary = new Dictionary<int, Book>();
            var books = await db.QueryAsync<Book, Composer?, BookContent, Piece, Composer?, Book>(sql,
                map: (book, composer, bookContent, piece, pieceComposer) =>
                {
                    Book bookEntry;
                    if (!bookDictionary.TryGetValue(book.BookId, out bookEntry))
                    {
                        bookEntry = book;
                        bookEntry.Composer = composer;
                        bookDictionary.Add(bookEntry.BookId, bookEntry);
                    }

                    var bookContentEntry =
                        bookEntry.BookContents.FirstOrDefault(bc => bc.ContentId == bookContent.ContentId);
                    if (bookContentEntry is null)
                    {
                        bookContent.Piece = piece;
                        bookContent.Piece.Composer = pieceComposer;
                        bookEntry.BookContents.Add(bookContent);
                    }

                    return bookEntry;
                },
                new { bookId },
                splitOn: "composer_id,content_id,piece_id,ComposerId");
            return bookDictionary.Values.FirstOrDefault();
        }
    }

    public async Task<IEnumerable<Book>> GetBooksAsync()
    {
        using (var db = Connection)
        {
            var bookDictionary = new Dictionary<int, Book>();

            var books = await db.QueryAsync<Book, Composer?, BookContent, Piece, Composer?, Book>(bookSql,
                map: (book, composer, bookContent, piece, pieceComposer) =>
                {
                    Book bookEntry;

                    if (!bookDictionary.TryGetValue(book.BookId, out bookEntry))
                    {
                        bookEntry = book;
                        bookEntry.Composer = composer;
                        bookDictionary.Add(bookEntry.BookId, bookEntry);
                    }

                    var bookContentEntry =
                        bookEntry.BookContents.FirstOrDefault(bc => bc.ContentId == bookContent.ContentId);
                    if (bookContentEntry is null)
                    {
                        bookContent.Piece = piece;
                        bookContent.Piece.Composer = pieceComposer;
                        bookEntry.BookContents.Add(bookContent);
                    }

                    return bookEntry;
                },
                splitOn: "composer_id,content_id,piece_id,ComposerId");

            return bookDictionary.Values;
        }
    }

    private const string bookSql = """
                                   SELECT b.book_id, b.book_title, b.publisher, b.volume_info, b.isbn, b.book_description, b.book_composer_id,
                                          c.composer_id, c.first_name, c.last_name, c.birth_year, c.death_year, c.nationality,
                                          bc.content_id, bc.content_book_id, bc.page_range, bc.content_piece_id,
                                          p.piece_id, p.piece_title, p.piece_composer_id, p.piece_key, p.piece_description, p.piece_opus_number,
                                          pc.composer_id AS ComposerId, pc.first_name, pc.last_name, pc.birth_year, pc.death_year, pc.nationality
                                   FROM books b
                                   LEFT JOIN composers c ON b.book_composer_id = c.composer_id
                                   LEFT JOIN book_contents bc ON b.book_id = bc.content_book_id
                                   LEFT JOIN pieces p ON bc.content_piece_id = p.piece_id
                                   LEFT JOIN composers pc on p.piece_composer_id = pc.composer_id
                                   """;

    private const string pieceCreateSql =
        """
        INSERT INTO pieces(piece_title, piece_composer_id, piece_key, piece_opus_number, piece_description)
        VALUES (@PieceTitle, @PieceComposerId, @PieceKey, @PieceOpusNumber, @PieceDescription)
        RETURNING piece_id
        """;
}