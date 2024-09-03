using App.API.Models;
using App.BL.Services;
using App.DA.Entities;
using App.DA.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            var orders = await _orderService.GetOrdersAsync();
            var ordersDTO = _mapper.Map<List<OrderDTO>>(orders);
            return Ok(ordersDTO);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<OrderDTO>>> GetOrdersByUserId(Guid userId)
        {
            var orders = await _orderService.GetOrdersByUserIdAsync(userId);
            if (orders == null || !orders.Any())
                return NotFound();

            return Ok(orders);
        }



        [HttpPost]
        public async Task<ActionResult<OrderDTO>> CreateOrder([FromBody] CreateOrderRequest order)
        {
            var orderDTO = _mapper.Map<OrderDTO>(order);
            var createdOrder = await _orderService.CreateOrderAsync(orderDTO);
            return Ok(createdOrder);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Order>> UpdateOrder(Guid id, [FromBody] Order order)
        {
            if (id != order.OrderId) 
            {
                return BadRequest("Order ID mismatch.");
            }

            var updatedOrder = await _orderService.UpdateOrderAsync(order);
            if (updatedOrder == null)
                return NotFound();

            return Ok(updatedOrder);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrder(Guid id)
        {
            var orderToDelete = await _orderService.GetOrderByIdAsync(id);
            if (orderToDelete == null)
                return NotFound();

            await _orderService.DeleteOrderAsync(id);
            return NoContent();
        }

    }
}
