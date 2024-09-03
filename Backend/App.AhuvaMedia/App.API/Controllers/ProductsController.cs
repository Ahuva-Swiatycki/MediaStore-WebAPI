using App.API.Models;
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
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductsController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _productService.GetProductsAsync();
            return Ok(products);
        }

        [HttpPost]
        public async Task<ActionResult<ProductDTO>> CreateProduct([FromBody] CreateProductRequest product)
        {
            var productDto = _mapper.Map<ProductDTO>(product);
            var createdProduct = await _productService.CreateProductAsync(productDto);
            return Ok(createdProduct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(Guid id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct([FromBody] Product product)
        {
            var updatedProduct = await _productService.UpdateProductAsync(product);
            if (updatedProduct == null)
                return NotFound();
            return Ok(updatedProduct);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(Guid id)
        {
            var productToDelete = await _productService.GetProductByIdAsync(id);
            if (productToDelete == null)
                return NotFound();

            await _productService.DeleteProductAsync(id);
            return NoContent();
        }
    }
}
