using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SvAPI.Data;
using SvAPI.Helper;
using SvAPI.Models;

namespace SvAPI.Repo
{
    public class ProductRepo : IProduct
    {
        private readonly SvDbContext _context;
        public ProductRepo(SvDbContext context)
        {
            _context = context;

        }
        public async Task<IEnumerable<Product>> GetProducts(ProductParam productParam)
        {
            var products = await _context.Products.Include(i => i.ProductImages).ToListAsync();

            if(productParam.ProductName != null){
                var prodFilter = _context.Products.Where(p => p.Name == productParam.ProductName);
                return prodFilter;
            }
            if(!productParam.PriceHigh){
                var prodprice = _context.Products.OrderBy(p => p.Price);
                return prodprice;
            }
             if(productParam.PriceHigh){
                var prodprice = _context.Products.OrderBy(p => p.Price).Reverse();
                return prodprice;
            }

            return products;
        }
    }
}