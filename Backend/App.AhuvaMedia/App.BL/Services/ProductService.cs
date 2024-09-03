using App.DA.Entities;
using App.DA.Interfaces;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.BL.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductReposetory _productReposetory;
        private readonly IMapper _mapper;

        public ProductService(IProductReposetory productReposetory, IMapper mapper)
        {
            _productReposetory = productReposetory;
            _mapper = mapper;
        }

        public async Task<ProductDTO> CreateProductAsync(ProductDTO product)
        {
            product.ProductId = Guid.NewGuid();
            var createProduct = await _productReposetory.CreateProductAsync(_mapper.Map<Product>(product));
            return _mapper.Map<ProductDTO>(createProduct);
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            return await _productReposetory.CreateProductAsync(product);
        }

        public async Task DeleteProductAsync(Guid ProductId)
        {
            await _productReposetory.DeleteProductAsync(ProductId);
        }

        public async Task<Product> GetProductByIdAsync(Guid ProductId)
        {
            return await _productReposetory.GetProductByIdAsync(ProductId);
        }

        public async Task<List<ProductDTO>> GetProductsAsync()
        {
            var productList = await _productReposetory.GetProductsAsync();
            return _mapper.Map<List<ProductDTO>>(productList);
        }

        public async Task<Product> UpdateProductAsync(Product product)
        {
            return await _productReposetory.UpdateProductAsync(product);
        }
    }
}
