using System;
using System.Collections.Generic;

namespace App.DA.Entities;

public partial class ProductDTO
{
    public Guid ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public decimal Price { get; set; }

    public string Img { get; set; } = null!;

    public virtual ICollection<CartDTO> Carts { get; set; } = new List<CartDTO>();

    public virtual ICollection<OrderItemDTO> OrderItems { get; set; } = new List<OrderItemDTO>();
}
