using App.DA.Entities;
using System.ComponentModel.DataAnnotations;

namespace App.API.Models
{
    public class CreateOrderItemRequest
    {
        [Required]
        public Guid ProductId { get; set; }

        [Required]
        public decimal? Price { get; set; }
        [Required]
        public int? Qty { get; set; }
        public string? Color { get; set; }
        public string? Font { get; set; }

    }
}
