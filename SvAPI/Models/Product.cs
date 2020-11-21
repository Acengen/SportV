using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SvAPI.Models
{
    public class Product
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
        public ICollection<Size> Sizes { get; set; }

        public ICollection<ProductImage> ProductImages { get; set; }

    }
}