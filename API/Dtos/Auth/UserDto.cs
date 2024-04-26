using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Auth
{
    public class UserDto
    {
        public required string Email { get; set; }
        public required string Token { get; set; }
    }
}