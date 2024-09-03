using System;
using System.Collections.Generic;

namespace App.DA.Entities;

public partial class OrderItem
{
    public Guid OrderItemId { get; set; }

    public Guid OrderId { get; set; }

    public Guid ProductId { get; set; }

    public string? Color { get; set; }

    public string? Font { get; set; }

    public decimal? Price { get; set; }

    public int? Qty { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
