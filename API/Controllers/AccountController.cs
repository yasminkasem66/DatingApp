using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

// Now we're also going to need access to our database because we're going to be allowing our users to
// register, which means we need to save that entity into the database.
public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
{

    [HttpPost("register")] //api/account/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await EmailExist(registerDto.Email)) return BadRequest("Email taken");
        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key,
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return  user.ToUserDto(tokenService);
    }


    //     conventionally if we use an object then the API controller is going
    // to go look in the body of the request.
    // But supposing I did want to send this up as query string parameters, do I need to use strings as parameters
    // inside here?Well, no.We can give the API controller a hint.
    // And if I did want to get this information from a query string, then I could use an attribute in front
    // of the login DTO.So that would go and get the information from the query string instead of the body of the request.
    // And likewise, if I wanted to use strings instead of an object, I could also use from body in front
    // of each parameter inside here if I wanted to use strings.So we're not stuck with conventions, we do have ways to override it.
    [HttpPost("login")] //api/account/login
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        // var user = context.Users.SingleOrDefaultAsync(x=>x.Email== loginDto.Email);
        // var user = context.Users.FirstOrDefaultAsync(x=>x.Email== loginDto.Email);
        var user = await context.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);
        if (user == null) return Unauthorized("invalid email");
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (var i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
        }
        return  user.ToUserDto(tokenService);

    }


    private async Task<bool> EmailExist(string Email)
    {
        return await context.Users.AnyAsync(x => x.Email.ToLower() == Email.ToLower());
    }
}
