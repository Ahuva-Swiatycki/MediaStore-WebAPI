using App.DA.DataContext;
using App.DA.Entities;
using App.DA.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.DA.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly AhuvaMediaContext _db;

        public CartRepository(AhuvaMediaContext dbCart)
        {
            _db = dbCart;
        }

        public async Task<List<Cart>> GetCartAsync()
        {
            return await _db.Carts.ToListAsync();
        }
        public async Task<List<Cart>> GetCartByUserIdAsync(Guid userId)
        {
            return await _db.Carts.Where(c => c.UserId == userId).ToListAsync();
        }

        public async Task<Cart> CreateCartAsync(Cart cart)
        {
            cart.CartId = Guid.NewGuid();
            await _db.Carts.AddAsync(cart);
            await _db.SaveChangesAsync();
            return cart;
        }

        //public async Task DeleteCartAsync(Guid cartId)
        //{
        //    var cartToDelete = await _db.Carts.SingleOrDefaultAsync(c => c.CartId == cartId);
        //    if (cartToDelete != null)
        //    {
        //        _db.Carts.Remove(cartToDelete);
        //        await _db.SaveChangesAsync();
        //    }
        //}

        public async Task<Cart> GetCartByIdAsync(Guid cartId)
        {
            return await _db.Carts.SingleOrDefaultAsync(c => c.CartId == cartId);
        }

        //public async Task<Cart> UpdateCartAsync(Cart cart)
        //{
        //    _db.Carts.Entry(cart).State = EntityState.Modified;
        //    await _db.SaveChangesAsync();
        //    return cart;
        //}
        public async Task<Cart> GetCartItemAsync(Guid cartId, Guid productId)
        {
            return await _db.Carts.SingleOrDefaultAsync(c => c.CartId == cartId && c.ProductId == productId);
        }

        public async Task RemoveCartItemAsync(Cart cartItem)
        {
            _db.Carts.Remove(cartItem);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateCartItemAsync(Cart cartItem)
        {
            _db.Carts.Update(cartItem);
            await _db.SaveChangesAsync();
        }

    }
}
