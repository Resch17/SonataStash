using Microsoft.AspNetCore.Mvc;
using SonataStash.Interfaces;
using SonataStash.Models;

namespace SonataStash.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookController : ControllerBase
{
    private readonly IBookRepository _bookRepository;

    public BookController(IBookRepository bookRepository)
    {
        _bookRepository = bookRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetBooksAsync()
    {
        return Ok(await _bookRepository.GetBooksAsync());
    }

    [HttpGet("{bookId}")]
    public async Task<IActionResult> GetBookByIdAsync(int bookId)
    {
        var book = await _bookRepository.GetBookByIdAsync(bookId);
        return book is null ? NotFound() : Ok(book);
    }

    [HttpPost]
    public async Task<IActionResult> AddBookAsync([FromBody] Book book)
    {
        var createdId = await _bookRepository.AddBookAsync(book);
        return StatusCode(StatusCodes.Status201Created, createdId);
    }
}