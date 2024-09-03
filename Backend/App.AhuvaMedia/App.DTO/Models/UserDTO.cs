using App.DA.Entities;

public partial class UserDTO
{
    public Guid UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Role { get; set; } = null!; 

    public virtual ICollection<CartDTO> Carts { get; set; } = new List<CartDTO>();

    public virtual ICollection<OrderDTO> Orders { get; set; } = new List<OrderDTO>();

}
