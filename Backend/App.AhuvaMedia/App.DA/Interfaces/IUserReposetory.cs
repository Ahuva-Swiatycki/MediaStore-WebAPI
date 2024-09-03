using App.DA.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.DA.Interfaces
{
    public interface IUserReposetory
    {
        Task<List<User>> GetUsersAsync();
        Task<User> GetUserByEmailAndPasswordAsync(string email, string password);
        Task<User> CreateUserAsync(User user);
        Task<User> GetUserByIdAsync(Guid UserId);
        Task<User> UpdateUserAsync(User user);
        Task DeleteUserAsync(Guid UserId);

    }
}

