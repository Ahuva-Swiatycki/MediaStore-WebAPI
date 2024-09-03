using App.API.Models;
using App.DA.Entities;
using AutoMapper;

namespace App.API.Profiles
{
    public class ClientOrderProfile : Profile
    {
       public ClientOrderProfile()
    {
            CreateMap<CreateOrderRequest, OrderDTO>()
                .ForMember(dest => dest.OrderItems, opt => opt.MapFrom(src => src.OrderItems))
                .ForMember(dest => dest.User, opt => opt.Ignore());

            CreateMap<CreateOrderItemRequest, OrderItemDTO>();
    }
    }
}
