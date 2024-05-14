using API.Dtos.Login;

namespace API.Dtos.Register
{
    public class RegisterDto : LoginDto
    {
        public required string Email { get; set; }
    }
}