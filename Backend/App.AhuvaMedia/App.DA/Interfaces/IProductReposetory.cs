using App.DA.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.DA.Interfaces
{
    public interface IProductReposetory
    {
        Task<List<Product>> GetProductsAsync();
        Task<Product> CreateProductAsync(Product product);
        Task<Product> GetProductByIdAsync(Guid ProductId);
        Task<Product> UpdateProductAsync(Product product);
        Task DeleteProductAsync(Guid ProductId);
    }
}
