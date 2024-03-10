namespace SonataStash.Models;

public class BookContent
{
    public int ContentId { get; set; }
    public int? ContentBookId { get; set; }
    public int? ContentPieceId { get; set; }
    public string? PageRange { get; set; } 

    public Book? Book { get; set; } 
    public Piece? Piece { get; set; } 
}