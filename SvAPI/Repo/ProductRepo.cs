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

            return products;
        }
    }
}