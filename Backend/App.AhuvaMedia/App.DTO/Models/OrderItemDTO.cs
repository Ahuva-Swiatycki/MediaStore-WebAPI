using System;

namespace App.DA.Entities
{
    public partial class OrderItemDTO
    {

        public Guid OrderItemId { get; set; }

        public Guid OrderId { get; set; }

        public Guid ProductId { get; set; }

        public string? Color { get; set; }

        public string? Font { get; set; }

        public decimal? Price { get; set; }

        public int? Qty { get; set; }

        public virtual OrderDTO Order { get; set; } = null!;

        public virtual ProductDTO Product { get; set; } = null!;
    }
}
