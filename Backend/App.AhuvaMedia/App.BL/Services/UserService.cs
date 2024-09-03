using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using App.DA.Entities;
using App.DA.Interfaces;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace App.BL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserReposetory _userReposetory;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public UserService(IUserReposetory userReposetory, IMapper mapper, IConfiguration configuration)
        {
            _userReposetory = userReposetory;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<UserDTO> CreateUserAsync(UserDTO user)
        {
            var userEntity = _mapper.Map<User>(user);
            userEntity.UserId = Guid.NewGuid();

            userEntity.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            var createdUser = await _userReposetory.CreateUserAsync(userEntity);
            return _mapper.Map<UserDTO>(createdUser);
        }

        public async Task<UserDTO> GetUserByEmailAndPasswordAsync(string email, string password)
        {
            var user = await _userReposetory.GetUserByEmailAndPasswordAsync(email, password);

            // Verify password
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return _mapper.Map<UserDTO>(user);
            }

            return null;
        }



        public async Task<User> CreateUserAsync(User user)
        {
            return await _userReposetory.CreateUserAsync(user);
        }

        public async Task DeleteUserAsync(Guid userId)
        {
            await _userReposetory.DeleteUserAsync(userId);
        }

        public async Task<User> GetUserByIdAsync(Guid userId)
        {
            return await _userReposetory.GetUserByIdAsync(userId);
        }

        public async Task<List<UserDTO>> GetUsersAsync()
        {
            var userList = await _userReposetory.GetUsersAsync();
            return _mapper.Map<List<UserDTO>>(userList);
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            return await _userReposetory.UpdateUserAsync(user);
        }

        public async Task<string> AuthenticateUserAsync(string email, string password)
        {
            var user = await _userReposetory.GetUserByEmailAndPasswordAsync(email, password);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return null; 
            }

            var userDto = _mapper.Map<UserDTO>(user);
            return GenerateJwtToken(userDto); 
        }

        private string GenerateJwtToken(UserDTO user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role) 
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
        public async Task<UserDTO> CreateTemporaryUserAsync()
        {

            var temporaryUser = new User
            {
                UserId = Guid.NewGuid(),
                UserName = $"temp_{Guid.NewGuid()}",
                Email = $"temp_{Guid.NewGuid()}@temp.com",
                Password = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()), 
                Role = "Temporary"
            };

            var createdUser = await _userReposetory.CreateUserAsync(temporaryUser);

            return _mapper.Map<UserDTO>(createdUser);
        }

    }
}
