using App.DA.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.DA.Interfaces
{
    public interface IOrderReposetory
    {
        Task<List<Order>> GetOrdersAsync();
        Task<Order> CreateOrderAsync(Order order);
        Task<Order> GetOrderByIdAsync(Guid OrderId);
        Task<Order> UpdateOrderAsync(Order order);
        Task DeleteOrderAsync(Guid OrderId);
        Task<List<Order>> GetOrdersByUserIdAsync(Guid userId);
    }
}
