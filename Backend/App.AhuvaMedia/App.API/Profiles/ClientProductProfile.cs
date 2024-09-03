using App.API.Models;
using App.DA.Entities;
using AutoMapper;

namespace App.API.Profiles
{
    public class ClientProductProfile : Profile
    {
        public ClientProductProfile()
        {
            CreateMap<CreateProductRequest, ProductDTO>();
        }
    }
}
