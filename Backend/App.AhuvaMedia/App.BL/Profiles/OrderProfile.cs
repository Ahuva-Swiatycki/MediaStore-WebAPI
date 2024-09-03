using App.DA.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.BL.Profiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<OrderDTO, Order>().ReverseMap();
            CreateMap<OrderItemDTO, OrderItem>().ReverseMap(); 
        }
    }
}
