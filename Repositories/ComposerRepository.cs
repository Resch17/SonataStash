using Dapper;
using SonataStash.Interfaces;
using SonataStash.Models;

namespace SonataStash.Repositories;

public class ComposerRepository : BaseRepository, IComposerRepository
{
    public ComposerRepository(IConfiguration configuration) : base(configuration)
    {
    }

    public async Task<int> AddComposerAsync(Composer composer)
    {
        const string sql = """
                           INSERT INTO composers (first_name, last_name, birth_year, death_year, nationality)
                                                   VALUES (@FirstName, @LastName, @BirthYear, @DeathYear, @Nationality)
                                                   RETURNING composer_id
                           """;
        using (var db = Connection)
        {
            return await db.QuerySingleAsync<int>(sql, composer);
        }
    }

    public async Task<IEnumerable<Composer>> GetComposersAsync()
    {
        const string sql = """
                           SELECT composer_id, first_name, last_name, birth_year, death_year, nationality
                           FROM composers;
                           """;

        using (var db = Connection)
        {
            return await db.QueryAsync<Composer>(sql);
        }
    }
}