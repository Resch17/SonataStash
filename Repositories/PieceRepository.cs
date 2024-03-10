using Dapper;
using SonataStash.Interfaces;
using SonataStash.Models;

namespace SonataStash.Repositories;

public class PieceRepository : BaseRepository, IPieceRepository
{
    public PieceRepository(IConfiguration configuration) : base(configuration)
    {
    }

    public async Task<int> AddPieceAsync(Piece piece)
    {
        const string sql = """
                           INSERT INTO pieces(
                            piece_title, piece_composer_id, piece_key, piece_opus_number, piece_description)
                            VALUES (@PieceTitle, @PieceComposerId, @PieceKey, @PieceOpusNumber, @PieceDescription)
                            RETURNING piece_id
                           """;

        using (var db = Connection)
        {
            var createdPieceId = await db.QuerySingleAsync<int>(sql, piece);
            var pieceJoinTasks = piece.AppearsIn.Select(async x =>
            {
                var bcSql = @"INSERT INTO book_contents(content_book_id, content_piece_id, page_range) 
                             VALUES (@ContentBookId, @CreatedPieceId, @PageRange)";
                if (db is null) throw new NullReferenceException();
                return await db.ExecuteAsync(bcSql, new
                {
                    ContentBookId = x.ContentBookId,
                    CreatedPieceId = createdPieceId,
                    PageRange = x.PageRange
                });
            });
            await Task.WhenAll(pieceJoinTasks);
            return createdPieceId;
        }
    }

    public async Task<IEnumerable<Piece>> GetPiecesAsync()
    {
        using (var db = Connection)
        {
            var pieceDictionary = new Dictionary<int, Piece>();
            var pieces = await db.QueryAsync<Piece, Composer?, BookContent, Book, Composer?, Piece>(pieceSql,
                (piece, composer, bookContent, book, bookComposer) =>
                {
                    Piece pieceEntry;

                    if (!pieceDictionary.TryGetValue(piece.PieceId, out pieceEntry))
                    {
                        pieceEntry = piece;
                        pieceEntry.Composer = composer;
                        pieceDictionary.Add(pieceEntry.PieceId, piece);
                    }

                    var bookContentEntry =
                        pieceEntry.AppearsIn.FirstOrDefault(bc => bc.ContentId == bookContent.ContentId);
                    if (bookContentEntry is null)
                    {
                        bookContent.Book = book;
                        bookContent.Book.Composer = bookComposer;
                        pieceEntry.AppearsIn.Add(bookContent);
                    }

                    return pieceEntry;
                }, splitOn: "composer_id,content_id,book_id,ComposerId");
            return pieceDictionary.Values;
        }
    }

    public async Task<IEnumerable<Piece>> GetPiecesByComposer(int composerId)
    {
        const string sql = pieceSql + " WHERE c.composer_id = @composerId";
        using (var db = Connection)
        {
            var pieceDictionary = new Dictionary<int, Piece>();
            var pieces = await db.QueryAsync<Piece, Composer?, BookContent, Book, Composer?, Piece>(sql,
                (piece, composer, bookContent, book, bookComposer) =>
                {
                    Piece pieceEntry;

                    if (!pieceDictionary.TryGetValue(piece.PieceId, out pieceEntry))
                    {
                        pieceEntry = piece;
                        pieceEntry.Composer = composer;
                        pieceDictionary.Add(pieceEntry.PieceId, piece);
                    }

                    var bookContentEntry =
                        pieceEntry.AppearsIn.FirstOrDefault(bc => bc.ContentId == bookContent.ContentId);
                    if (bookContentEntry is null)
                    {
                        bookContent.Book = book;
                        bookContent.Book.Composer = bookComposer;
                        pieceEntry.AppearsIn.Add(bookContent);
                    }

                    return pieceEntry;
                }, new { composerId },
                splitOn: "composer_id,content_id,book_id,ComposerId");

            return pieceDictionary.Values;
        }
    }

    private const string pieceSql = """
                                     SELECT p.piece_id, p.piece_title, p.piece_key, p.piece_opus_number, p.piece_description, p.piece_composer_id,
                                                    c.composer_id, c.first_name, c.last_name, c.birth_year, c.death_year, c.nationality,
                                                    bc.content_id, bc.content_book_id, bc.page_range,
                                                    b.book_id, b.book_title, b.publisher, b.volume_info, b.isbn, b.book_description, b.book_composer_id,
                                                    bcp.composer_id AS ComposerId, bcp.first_name, bcp.last_name, bcp.birth_year, bcp.death_year, bcp.nationality
                                        FROM pieces p
                                            LEFT JOIN composers c on p.piece_composer_id = c.composer_id
                                            LEFT JOIN book_contents bc on p.piece_id = bc.content_piece_id
                                            LEFT JOIN books b on bc.content_book_id = b.book_id
                                            LEFT JOIN composers bcp on bcp.composer_id = b.book_composer_id
                                    """;
}