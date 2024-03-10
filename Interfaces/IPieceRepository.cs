using SonataStash.Models;

namespace SonataStash.Interfaces;

public interface IPieceRepository
{
    Task<int> AddPieceAsync(Piece piece);
    Task<IEnumerable<Piece>> GetPiecesAsync();
    Task<IEnumerable<Piece>> GetPiecesByComposer(int composerId);
}