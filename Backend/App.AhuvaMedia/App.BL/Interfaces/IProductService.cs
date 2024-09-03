using App.DA.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.DA.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductDTO>> GetProductsAsync();
        Task<ProductDTO> CreateProductAsync(ProductDTO product);
        Task<Product> GetProductByIdAsync(Guid ProductId);
        Task<Product> UpdateProductAsync(Product product);
        Task DeleteProductAsync(Guid ProductId);
    }
}
