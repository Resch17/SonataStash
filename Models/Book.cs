namespace SonataStash.Models;

public class Book
{
    public int BookId { get; set; }
    public required string BookTitle { get; set; }
    public string? Publisher { get; set; }
    public string? VolumeInfo { get; set; }
    public string? Isbn { get; set; }
    public string? BookDescription { get; set; }
    public int? BookComposerId { get; set; } 

    public Composer? Composer { get; set; }
    public List<BookContent> BookContents { get; set; } = new();
}