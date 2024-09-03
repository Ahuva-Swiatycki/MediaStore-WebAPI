using System;
using System.Collections.Generic;

namespace App.DA.Entities;

public partial class Order
{
    public Guid OrderId { get; set; }

    public Guid UserId { get; set; }

    public DateTime OrderDate { get; set; }

    public string? PaymentStatus { get; set; }

    public decimal? TotalAmount { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual User User { get; set; } = null!;
}
