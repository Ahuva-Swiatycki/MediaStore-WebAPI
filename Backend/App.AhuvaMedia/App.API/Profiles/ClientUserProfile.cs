using App.API.Models;
using App.DA.Entities;
using AutoMapper;

namespace App.API.Profiles
{
    public class ClientUserProfile : Profile
    {
        public ClientUserProfile()
        {
            CreateMap<CreateUserRequest, UserDTO>();
            CreateMap<updateUserRequest, User>();
        }
    }
}

