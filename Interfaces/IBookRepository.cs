using SonataStash.Models;

namespace SonataStash.Interfaces;

public interface IBookRepository
{
    Task<int> AddBookAsync(Book book);
    Task<IEnumerable<Book>> GetBooksAsync();
    Task<Book?> GetBookByIdAsync(int bookId);
}