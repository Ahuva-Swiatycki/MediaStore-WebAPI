using App.API.Models;
using App.DA.Entities;
using App.DA.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace App.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly string _jwtSecretKey;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserService userService, IMapper mapper, IConfiguration configuration, ILogger<UsersController> logger)
        {
            _userService = userService;
            _mapper = mapper;
            _jwtSecretKey = configuration["Jwt:Key"] ?? throw new ArgumentNullException("Jwt:Key");
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] CreateUserRequest createUserRequest)
        {
            if (createUserRequest == null)
                return BadRequest("Invalid user data");

            try
            {
                var userDto = _mapper.Map<UserDTO>(createUserRequest);
                var createdUser = await _userService.CreateUserAsync(userDto);

                var token = GenerateJwtToken(createdUser);


                return CreatedAtAction(nameof(GetUserById), new { id = createdUser.UserId }, new
                {
                    User = createdUser,
                    Token = token
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while registering user.");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest1 loginRequest)
        {
            if (loginRequest == null)
                return BadRequest("Invalid login request");

            try
            {
                var user = await _userService.GetUserByEmailAndPasswordAsync(loginRequest.Email, loginRequest.Password);

                if (user == null)
                    return Unauthorized("Invalid email or password");

                var token = GenerateJwtToken(user);
                return Ok(new
                {
                    token = token,
                    userName = user.UserName,
                    userId = user.UserId
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while logging in.");
                return StatusCode(500, "Internal server error");
            }
        }

        private string GenerateJwtToken(UserDTO user)
        {
            if (user.UserName == null)
                throw new ArgumentNullException(nameof(user.UserName));

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            if (!string.IsNullOrEmpty(user.Role))
                claims.Add(new Claim(ClaimTypes.Role, user.Role));

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecretKey));
            var creds = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("temporary")]
        public async Task<ActionResult<UserDTO>> CreateTemporaryUser()
        {
            try
            {
                var temporaryUser = await _userService.CreateTemporaryUserAsync();
                return CreatedAtAction(nameof(GetUserById), new { id = temporaryUser.UserId }, temporaryUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating temporary user.");
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            try
            {
                var users = await _userService.GetUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving users.");
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(Guid id)
        {
            try
            {
                var user = await _userService.GetUserByIdAsync(id);
                if (user == null)
                    return NotFound("User not found");

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving user with ID {id}.");
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize]
        [HttpPut("{id}/change-password")]
        public async Task<ActionResult> ChangePassword(Guid id, [FromBody] ChangePasswordRequest changePasswordRequest)
        {
            if (changePasswordRequest == null)
                return BadRequest("Invalid password change request");

            try
            {
                var user = await _userService.GetUserByIdAsync(id);
                if (user == null)
                    return NotFound("User not found");

                // Verify the current password
                if (!BCrypt.Net.BCrypt.Verify(changePasswordRequest.CurrentPassword, user.Password))
                    return Unauthorized("Current password is incorrect.");

                // Update password
                user.Password = BCrypt.Net.BCrypt.HashPassword(changePasswordRequest.NewPassword);
                await _userService.UpdateUserAsync(user);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while changing password for user with ID {id}.");
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(Guid id, [FromBody] updateUserRequest updateUserRequest)
        {
            if (updateUserRequest == null)
                return BadRequest("Invalid user data");

            try
            {
                var existingUser = await _userService.GetUserByIdAsync(id);

                if (existingUser == null)
                    return NotFound("User not found");

                existingUser.UserName = updateUserRequest.UserName;
                existingUser.Email = updateUserRequest.Email;
                existingUser.PhoneNumber = updateUserRequest.PhoneNumber;

                await _userService.UpdateUserAsync(existingUser);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while updating user with ID {id}.");
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(Guid id)
        {
            try
            {
                var userToDelete = await _userService.GetUserByIdAsync(id);
                if (userToDelete == null)
                    return NotFound("User not found");

                await _userService.DeleteUserAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting user with ID {id}.");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
