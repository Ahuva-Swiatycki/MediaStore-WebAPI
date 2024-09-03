using App.DA.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.DA.Interfaces
{
    public interface ICartRepository
    {
        Task<Cart> GetCartItemAsync(Guid cartId, Guid productId);
        Task RemoveCartItemAsync(Cart cartItem);
        Task UpdateCartItemAsync(Cart cartItem);
        Task<List<Cart>> GetCartByUserIdAsync(Guid userId);
        Task<List<Cart>> GetCartAsync();
        //Task<Cart> CreateCartAsync(Cart cart);
        Task<Cart> GetCartByIdAsync(Guid cartId);
        //Task<Cart> UpdateCartAsync(Cart cart);
        //Task DeleteCartAsync(Guid cartId);
    }
}
