using API.Dtos.Auth;
using API.Dtos.Login;
using API.Dtos.Register;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace API.Controllers
{
    [EnableCors("AllowOriginPolicy")]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<User> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.ToArrayAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetById([FromRoute] string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return new UserDto
            {
                Email = user.Email,
                Token = ""
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized();
            }
            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.UserName, Email = registerDto.Email };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }
            await _userManager.AddToRoleAsync(user, "Member");
            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }
    }

}