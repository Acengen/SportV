using System.Collections.Generic;
using SvAPI.Models;

namespace SvAPI.DataTransferObj
{
    public class ProductDto
    {
         public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public string PhotoUrl {get;set;}
        
        public ICollection<ImageDto> ProductImages { get; set;}
    }
}