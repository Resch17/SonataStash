using SonataStash.Models;

namespace SonataStash.Interfaces;

public interface IComposerRepository
{
    Task<int> AddComposerAsync(Composer composer);
    Task<IEnumerable<Composer>> GetComposersAsync();
}