using App.DA.Entities;
using System.ComponentModel.DataAnnotations;

namespace App.API.Models
{
    public class CreateOrderRequest
    {
        [Required]
        public Guid UserId { get; set; }

        [Required]
        public DateTime OrderDate { get; set; }

        public string? PaymentStatus { get; set; }

        public decimal? TotalAmount { get; set; }

        [Required]
        public virtual ICollection<CreateOrderItemRequest> OrderItems { get; set; } = new List<CreateOrderItemRequest>();

    }
}
