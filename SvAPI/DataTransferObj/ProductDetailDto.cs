using System.Collections.Generic;
using System.Text.Json.Serialization;
using SvAPI.Models;

namespace SvAPI.DataTransferObj
{
    public class ProductDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public string Gender { get; set; }
        public string Brand { get; set; }
        public string Age { get; set; }
        public string Usage { get; set; }
        public string PhotoUrl {get;set;}
        public ICollection<ImageDto> ProductImages { get; set; }
        public ICollection<SizesDto> Sizes { get; set; }
    }
}