using System;
using System.Collections.Generic;

namespace App.DA.Entities
{
    public partial class OrderDTO
    {
        public Guid OrderId { get; set; }

        public Guid UserId { get; set; }

        public DateTime OrderDate { get; set; }

        public string? PaymentStatus { get; set; }

        public decimal? TotalAmount { get; set; }

        public virtual ICollection<OrderItemDTO> OrderItems { get; set; } = new List<OrderItemDTO>();

        public virtual UserDTO User { get; set; } = null!;
    }
}
