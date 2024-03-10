using Microsoft.AspNetCore.Mvc;
using SonataStash.Interfaces;
using SonataStash.Models;
using SonataStash.Repositories;

namespace SonataStash.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ComposerController : ControllerBase
{
    private readonly IComposerRepository _composerRepository;

    public ComposerController(IComposerRepository composerRepository)
    {
        _composerRepository = composerRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetComposersAsync()
    {
        var composers = await _composerRepository.GetComposersAsync();
        return Ok(composers.OrderBy(x => x.LastName));
    }

    [HttpPost]
    public async Task<IActionResult> AddComposerAsync([FromBody] Composer composer)
    {
        var createdId = await _composerRepository.AddComposerAsync(composer);
        return StatusCode(StatusCodes.Status201Created, createdId);
    }
}