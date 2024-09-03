using App.DA.Entities;

namespace App.API.Models
{
    public class CreateUserRequest
    {
        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public string Password { get; set; } = null!;

    }
}
