using SonataStash.Interfaces;
using SonataStash.Repositories;

namespace SonataStash
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowMyOrigin",
                    builder => builder.AllowAnyOrigin().AllowAnyMethod()
                        .WithHeaders("Authorization", "Content-Type", "Accept"));
            });

            // Add services to the container.
            builder.Services.AddTransient<IComposerRepository, ComposerRepository>();
            builder.Services.AddTransient<IBookRepository, BookRepository>();
            builder.Services.AddTransient<IPieceRepository, PieceRepository>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;

            app.UseHttpsRedirection();

            app.UseCors("AllowMyOrigin");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}