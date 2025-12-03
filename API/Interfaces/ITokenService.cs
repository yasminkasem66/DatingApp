
using API.Entities;

namespace API.Interfaces;

// it provides an abstraction away from what the service
// But we can't tell what logic is inside the implementation class to create the token, nor do we care.
public interface ITokenService
{
    string CreateToken(AppUser user);
}
 