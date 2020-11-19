using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SvAPI.Data;
using SvAPI.DataTransferObj;

namespace SvAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly SvDbContext _context;
        private readonly IMapper _mapper;
        public ProductController(SvDbContext context, IMapper mapper)
        {
            
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.Include(i => i .ProductImages).ToListAsync();
            var productToReturn = _mapper.Map<IEnumerable<ProductDto>>(products);
            
            return Ok(productToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
           
            var product = await _context.Products.Include(p => p.ProductImages).FirstOrDefaultAsync(i => i.Id == id);
            
            await _context.Sizes.Where(s => s.ProductId == product.Id).ToListAsync();

        
            var productToReturn = _mapper.Map<ProductDetailDto>(product);

            return Ok(productToReturn);
        }

    }
}