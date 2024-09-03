using App.DA.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.DA.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDTO>> GetUsersAsync();
        Task<UserDTO> GetUserByEmailAndPasswordAsync(string email, string password);
        Task<UserDTO> CreateUserAsync(UserDTO user);
        Task<UserDTO> CreateTemporaryUserAsync();    
        Task<User> GetUserByIdAsync(Guid UserId);
        Task<User> UpdateUserAsync(User user);
        Task DeleteUserAsync(Guid UserId);
    }
}
