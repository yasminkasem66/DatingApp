using System;

// Now this namespace we create this for classes.
// So each namespace is a logical representation of where this class is located.
// It's not a physical file although typically the namespace reflects the physical file location it is
namespace API.Entities;

// So our app user is going to represent something in a users table.
// And each instance of this entity is going to represent a row in that table.
// And each property that this entity class has is going to represent a column in that database.
public class AppUser
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    // because we've given our property a name of ID, then this is the property that it's going to use as the primary key of that table in the database.
    public required string DisplayName { get; set; }
    public required string Email { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
}
