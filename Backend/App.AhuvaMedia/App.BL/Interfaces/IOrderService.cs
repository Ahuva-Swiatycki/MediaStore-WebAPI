using App.DA.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.DA.Interfaces
{
    public interface IOrderService
    {
        Task<List<OrderDTO>> GetOrdersAsync();
        Task<OrderDTO> CreateOrderAsync(OrderDTO orderDTO);
        Task<Order> GetOrderByIdAsync(Guid OrderId);
        Task<Order> UpdateOrderAsync(Order order);
        Task DeleteOrderAsync(Guid OrderId);
        Task<List<OrderDTO>> GetOrdersByUserIdAsync(Guid userId);
    }
}
