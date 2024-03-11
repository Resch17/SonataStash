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
                           SELECT c.composer_id, c.first_name, c.last_name, c.birth_year, c.death_year, c.nationality,
                                  (SELECT COUNT(*) FROM pieces p
                                    left join composers subc on subc.composer_id = p.piece_composer_id
                                    where p.piece_composer_id = c.composer_id) as piece_count
                           FROM composers c;
                           """;

        using (var db = Connection)
        {
            return await db.QueryAsync<Composer>(sql);
        }
    }
}