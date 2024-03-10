using Npgsql;

namespace SonataStash.Repositories
{
    public abstract class BaseRepository
    {
        private readonly string? _connectionString;

        public BaseRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("default");
        }

        protected NpgsqlConnection Connection
        {
            get
            {
                return new NpgsqlConnection(_connectionString);
            }
        }
    }
}
