using App.API.Models;
using App.DA.Entities;
using AutoMapper;

namespace App.API.Profiles
{
    public class ClientCartProfile : Profile
    {
        public ClientCartProfile()
        {
            CreateMap<CreateCartRequest, CartDTO>();
            CreateMap<CartDTO, Cart>().ReverseMap();
        }
    }
}
