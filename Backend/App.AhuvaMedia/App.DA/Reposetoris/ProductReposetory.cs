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
    public class ProductReposetory : IProductReposetory
    {
        private readonly AhuvaMediaContext _db;

        public ProductReposetory(AhuvaMediaContext dbProducts)
        {
            _db = dbProducts;
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _db.Products.ToListAsync();
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            product.ProductId = Guid.NewGuid();
            await _db.Products.AddAsync(product);
            await _db.SaveChangesAsync();
            return product;
        }

        public async Task<Product> GetProductByIdAsync(Guid ProductId)
        {
            return await _db.Products.SingleOrDefaultAsync(p => p.ProductId == ProductId);
        }

        public async Task<Product> UpdateProductAsync(Product product)
        {
            _db.Products.Entry(product).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return product;
        }

        public async Task DeleteProductAsync(Guid ProductId)
        {
            var productToDelete = await _db.Products.SingleOrDefaultAsync(p => p.ProductId == ProductId);
            if (productToDelete != null)
            {
                _db.Products.Remove(productToDelete);
                await _db.SaveChangesAsync();
            }
        }
    }
}
