using App.DA.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.DA.Interfaces
{
    public interface ICartService
    {
        //Task<CartDTO> CreateCartAsync(CartDTO cart);
        //Task DeleteCartAsync(Guid cartId);
        Task<List<CartDTO>> GetCartAsync(Guid userId);
        Task UpdateCartItem(Guid cartId, Guid productId, int quantity);
        Task<Cart> GetCartByIdAsync(Guid cartId);
        Task<Cart> UpdateCartAsync(Cart cart);
    }
}
