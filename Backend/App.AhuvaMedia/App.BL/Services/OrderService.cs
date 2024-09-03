using App.DA.Entities;
using App.DA.Interfaces;
using App.DA.Reposetoris;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.BL.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderReposetory _orderReposetory;
        private readonly IMapper _mapper;

        public OrderService(IOrderReposetory orderReposetory, IMapper mapper)
        {
            _orderReposetory = orderReposetory;
            _mapper = mapper;
        }

        public async Task<OrderDTO> CreateOrderAsync(OrderDTO orderDTO)
{
    orderDTO.OrderId = Guid.NewGuid();
    var order = _mapper.Map<Order>(orderDTO);

            foreach (var item in order.OrderItems)
            {
                item.OrderId = order.OrderId;
            }

            var createdOrder = await _orderReposetory.CreateOrderAsync(order);
    return _mapper.Map<OrderDTO>(createdOrder);
}
        public async Task<List<OrderDTO>> GetOrdersByUserIdAsync(Guid userId)
        {
            var orders = await _orderReposetory.GetOrdersByUserIdAsync(userId);
            return _mapper.Map<List<OrderDTO>>(orders);
        }
        public async Task DeleteOrderAsync(Guid OrderId)
        {
            await _orderReposetory.DeleteOrderAsync(OrderId);
        }

        public async Task<Order> GetOrderByIdAsync(Guid OrderId)
        {
            return await _orderReposetory.GetOrderByIdAsync(OrderId);
        }

        public async Task<List<OrderDTO>> GetOrdersAsync()
        {
            var orderList = await _orderReposetory.GetOrdersAsync();
            return _mapper.Map<List<OrderDTO>>(orderList);
        }

        public async Task<Order> UpdateOrderAsync(Order order)
        {
            return await _orderReposetory.UpdateOrderAsync(order);
        }
    }
}