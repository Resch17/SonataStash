using Microsoft.AspNetCore.Mvc;
using SonataStash.Interfaces;
using SonataStash.Models;

namespace SonataStash.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PieceController : ControllerBase
{
    private readonly IPieceRepository _pieceRepository;

    public PieceController(IPieceRepository pieceRepository)
    {
        _pieceRepository = pieceRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetPiecesAsync([FromQuery] int? composerId)
    {
        // if (composerId.HasValue)
        // {
        //     // filter by composerId
        //     return Ok(await _pieceRepository.GetPiecesByComposer(composerId.Value));
        // }
        // else
        // {
        //     // get all pieces
        //     return Ok(await _pieceRepository.GetPiecesAsync());
        // }

        return Ok(composerId.HasValue
            ? await _pieceRepository.GetPiecesByComposer(composerId.Value)
            : await _pieceRepository.GetPiecesAsync());
    }

    [HttpPost]
    public async Task<IActionResult> AddPieceAsync([FromBody] Piece piece)
    {
        var createdId = await _pieceRepository.AddPieceAsync(piece);
        return StatusCode(StatusCodes.Status201Created, createdId);
    }
}