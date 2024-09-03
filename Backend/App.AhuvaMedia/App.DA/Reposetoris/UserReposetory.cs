using App.DA.DataContext;
using App.DA.Entities;
using App.DA.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.DA.Reposetoris
{
    public class UserReposetory : IUserReposetory
    {
        private readonly AhuvaMediaContext _db;

        public UserReposetory(AhuvaMediaContext dbUsers)
        {
            _db = dbUsers;
        }

        public async Task<User> CreateUserAsync(User user)
        {
            user.UserId = Guid.NewGuid();
            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();
            return user;
        }
        public async Task<User> GetUserByEmailAndPasswordAsync(string email, string password)
        {
            var user = await _db.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return user;
            }

            return null;
        }

        public async Task DeleteUserAsync(Guid UserId)
        {
            var userToDelete = await _db.Users.SingleOrDefaultAsync(u => u.UserId == UserId);
            if (userToDelete != null)
            {
                _db.Users.Remove(userToDelete);
                await _db.SaveChangesAsync();
            }
        }

        public async Task<User> GetUserByIdAsync(Guid UserId)
        {
            return await _db.Users.SingleOrDefaultAsync(u => u.UserId == UserId);
        }

        public async Task<List<User>> GetUsersAsync()
        {
            return await _db.Users.ToListAsync();
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            _db.Users.Entry(user).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return user;
        }
    }
}
