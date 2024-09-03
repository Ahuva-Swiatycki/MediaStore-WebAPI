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
    public class OrderReposetory : IOrderReposetory
    {
        private readonly AhuvaMediaContext _db;

        public OrderReposetory(AhuvaMediaContext dbOrders)
        {
            _db = dbOrders;
        }

        public async Task<List<Order>> GetOrdersAsync()
        {
            return await _db.Orders.ToListAsync();
        }

        public async Task<Order> CreateOrderAsync(Order order)
        {
            order.OrderId = Guid.NewGuid();
            await _db.Orders.AddAsync(order);

            if (order.OrderItems != null && order.OrderItems.Any())
            {
                await _db.OrderItems.AddRangeAsync(order.OrderItems);
            }

            await _db.SaveChangesAsync();
            return order;
        }
        public async Task<List<Order>> GetOrdersByUserIdAsync(Guid userId)
        {
            return await _db.Orders
                .Include(o => o.OrderItems) 
                .Where(o => o.UserId == userId)
                .ToListAsync();
        }


        public async Task DeleteOrderAsync(Guid OrderId)
        {
            var orderToDelete = await _db.Orders.SingleOrDefaultAsync(o => o.OrderId == OrderId);
            if (orderToDelete != null)
            {
                _db.Orders.Remove(orderToDelete);
                await _db.SaveChangesAsync();
            }
        }

        public async Task<Order> GetOrderByIdAsync(Guid OrderId)
        {
            return await _db.Orders.SingleOrDefaultAsync(o => o.OrderId == OrderId);
        }

        public async Task<Order> UpdateOrderAsync(Order order)
        {
            _db.Orders.Entry(order).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return order;
        }
    }
}
