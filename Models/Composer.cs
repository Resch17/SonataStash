namespace SonataStash.Models;

public class Composer
{
    public int ComposerId { get; set; }
    public string? FirstName { get; set; }
    public required string LastName { get; set; } 
    public int? BirthYear { get; set; }
    public int? DeathYear { get; set; }
    public string? Nationality { get; set; }
    // calculated, not stored
    public int? PieceCount { get; init; }
}