//using App.API.Models;
//using App.BL.Services;
//using App.DA.Entities;
//using App.DA.Interfaces;
//using AutoMapper;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Security.Claims;
//using System.Threading.Tasks;

//namespace YourNamespace.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CartsController : ControllerBase
//    {
//        private readonly ICartService _cartService;
//        private readonly IUserService _userService;
//        private readonly IMapper _mapper;
//        //private const string TempUserCookieName = "TempUserId"; 

//        public CartsController(ICartService cartService, IUserService userService, IMapper mapper)
//        {
//            _cartService = cartService;
//            _userService = userService;
//            _mapper = mapper;
//        }
//        [HttpGet("{id}")]
//        public async Task<ActionResult<Cart>> GetCartById(Guid id)
//        {
//            var cart = await _cartService.GetCartByIdAsync(id);
//            if (cart == null)
//                return NotFound();
//            return Ok(cart);
//        }

//        [HttpPut("{cartId}/product/{productId}")]
//        public async Task<IActionResult> UpdateCartItem(Guid cartId, Guid productId, [FromBody] updateCartRequest request)
//        {
//            try
//            {
//                await _cartService.UpdateCartItem(cartId, productId, request.Quantity);
//                return NoContent();
//            }
//            catch (KeyNotFoundException)
//            {
//                return NotFound();
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, ex.Message);
//            }
//        }


//        public async Task<ActionResult<Cart>> addToCart([FromBody] Cart cart)
//        {
//            var updatedOrder = await _cartService.UpdateCartAsync(cart);
//            if (updatedOrder == null)
//                return NotFound();
//            return Ok(updatedOrder);
//        }
//        // GET api/carts
//        //[HttpGet]
//        //public async Task<ActionResult<List<CartDTO>>> GetCart()
//        //{
//        //    var userId = User.Identity.IsAuthenticated
//        //        ? new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier))
//        //        : GetOrCreateTemporaryUserId();

//        //    var cartList = await _cartService.GetCartAsync(userId);
//        //    return Ok(cartList);
//        //}

//        //// POST api/carts
//        //[HttpPost]
//        //public async Task<ActionResult<CartDTO>> AddToCart([FromBody] CreateCartRequest request)
//        //{
//        //    var userId = User.Identity.IsAuthenticated
//        //        ? new Guid(User.FindFirstValue(ClaimTypes.NameIdentifier))
//        //        : GetOrCreateTemporaryUserId();

//        //    var cartDTO = _mapper.Map<CartDTO>(request);
//        //    cartDTO.UserId = userId;

//        //    var createdCart = await _cartService.CreateCartAsync(cartDTO);

//        //    return CreatedAtAction(nameof(GetCart), new { id = createdCart.CartId }, createdCart);
//        //}

//        //private Guid GetOrCreateTemporaryUserId()
//        //{
//        //    var tempUserIdCookie = Request.Cookies[TempUserCookieName];
//        //    if (string.IsNullOrEmpty(tempUserIdCookie))
//        //    {
//        //        var temporaryUser = _userService.CreateTemporaryUserAsync().Result;
//        //        var userId = temporaryUser.UserId;
//        //        Response.Cookies.Append(TempUserCookieName, userId.ToString(), new CookieOptions
//        //        {
//        //            Expires = DateTimeOffset.UtcNow.AddDays(30),
//        //            HttpOnly = true, // Secure flag if you're using HTTPS
//        //            SameSite = SameSiteMode.Lax // Adjust based on your needs
//        //        });
//        //        return userId;
//        //    }
//        //    return new Guid(tempUserIdCookie);
//        //}
//    }
//}

