namespace SonataStash.Models;

public class Piece
{
    public int PieceId { get; set; }
    public required string PieceTitle { get; set; }
    public int? PieceComposerId { get; set; }
    public string? PieceKey { get; set; } 
    public string? PieceOpusNumber { get; set; } 
    public string? PieceDescription { get; set; } 

    public Composer? Composer { get; set; }
    public List<BookContent> AppearsIn { get; set; } = new();
}