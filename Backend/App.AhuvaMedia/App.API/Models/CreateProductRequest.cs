using App.DA.Entities;

namespace App.API.Models
{
    public class CreateProductRequest
    {
        public string ProductName { get; set; } = null!;

        public string Img { get; set; } = null!;
    }
}
