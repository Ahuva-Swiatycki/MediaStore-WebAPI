using App.DA.Entities;
using App.DA.Interfaces;
using App.DA.Repositories;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.BL.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartReposetory;
        private readonly IMapper _mapper;

        public CartService(ICartRepository cartReposetory, IMapper mapper)
        {
            _cartReposetory = cartReposetory;
            _mapper = mapper;
        }

        public async Task<List<CartDTO>> GetCartAsync(Guid userId)
        {
            var cartList = await _cartReposetory.GetCartByUserIdAsync(userId);
            return _mapper.Map<List<CartDTO>>(cartList);
        }

        public async Task UpdateCartItem(Guid cartId, Guid productId, int quantity)
        {
            var cartItem = await _cartReposetory.GetCartItemAsync(cartId, productId);

            if (cartItem == null)
            {
                throw new KeyNotFoundException("Cart item not found");
            }

            if (quantity <= 0)
            {
                await _cartReposetory.RemoveCartItemAsync(cartItem);
            }
            else
            {
                cartItem.Quantity = quantity;
                await _cartReposetory.UpdateCartItemAsync(cartItem);
            }
        }

        public async Task<Cart> GetCartByIdAsync(Guid cartId)
        {
            return await _cartReposetory.GetCartByIdAsync(cartId);
        }

        public async Task<Cart> UpdateCartAsync(Cart cart)
        {
            await _cartReposetory.UpdateCartItemAsync(cart);
            return cart;
        }

        //public async Task<List<CartDTO>> GetCartAsync(Guid userId)
        //{
        //    // If userId is empty, return items not associated with any user
        //    var cartList = userId == Guid.Empty
        //        ? await _cartReposetory.GetCartAsync() // Get all carts (for guest users)
        //        : await _cartReposetory.GetCartByUserIdAsync(userId); // Get cart for specific user

        //    return _mapper.Map<List<CartDTO>>(cartList);
        //}

        //public async Task<CartDTO> CreateCartAsync(CartDTO cart)
        //{
        //    cart.CartId = Guid.NewGuid();
        //    var createCart = await _cartReposetory.CreateCartAsync(_mapper.Map<Cart>(cart));
        //    return _mapper.Map<CartDTO>(createCart);
        //}

        //public async Task<Cart> CreateCartAsync(Cart cart)
        //{
        //    return await _cartReposetory.CreateCartAsync(cart);
        //}

        //public async Task<Cart> GetCartByIdAsync(Guid CartId)
        //{
        //    return await _cartReposetory.GetCartByIdAsync(CartId);
        //}

        //public async Task<Cart> UpdateCartAsync(Cart cart)
        //{
        //    return await _cartReposetory.UpdateCartAsync(cart);
        //}

        //public async Task DeleteCartAsync(Guid CartId)
        //{
        //    await _cartReposetory.DeleteCartAsync(CartId);
        //}
    }
}
