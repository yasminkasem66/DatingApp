using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
    // And then we need to tell Entity Framework about our entities.And we do that by creating DB sets.So we create a property to use the prop snippet.
    public DbSet<AppUser> Users { get; set; } //So if I give this a name of users then this is going to represent the table name inside the database.
}
