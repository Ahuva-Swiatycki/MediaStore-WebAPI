using App.DA.Entities;

namespace App.API.Models
{
    public class updateCartRequest
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }


    }
}
