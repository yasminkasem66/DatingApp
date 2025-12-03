using System;
using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Extensions;
// When we make something static in C sharp, it means we do not need to create a new instance of it in
// order to use its functionality.
public static class AppUserExtensions
{
   public static UserDto ToUserDto(this AppUser user, ITokenService  tokenService)
   {
       return new UserDto
       {
            Id = user.Id,
            DisplayName = user.DisplayName,
            Email = user.Email,
            Token = tokenService.CreateToken(user)
       };
   }
}
