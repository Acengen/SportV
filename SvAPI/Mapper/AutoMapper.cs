using System.Linq;
using AutoMapper;
using SvAPI.DataTransferObj;
using SvAPI.Models;

namespace SvAPI.Mapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {   
            CreateMap<Product,ProductDto>().ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.ProductImages.FirstOrDefault(p => p.IsMain).Image));
            

            CreateMap<Product,ProductDetailDto>().ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.ProductImages.FirstOrDefault(p => p.IsMain).Image));
            

            CreateMap<ProductImage,ImageDto>();


            CreateMap<Size, SizesDto>();

            CreateMap<UserForRegistarDto,User>();
            
            
            CreateMap<UserDetailDto,User>();

            CreateMap<User,UserDetailDto>();

            CreateMap<UserToUpdateDto,User>();

           
        }   
    }
}