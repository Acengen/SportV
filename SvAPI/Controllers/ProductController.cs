using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SvAPI.Data;
using SvAPI.DataTransferObj;
using SvAPI.Helper;
using SvAPI.Models;
using SvAPI.Repo;

namespace SvAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly SvDbContext _context;
        private readonly IMapper _mapper;
        private readonly IProduct _repo;
        public ProductController(SvDbContext context, IMapper mapper, IProduct repo)
        {
            _repo = repo;

            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] ProductParam productParam)
        {
            var products = await _repo.GetProducts(productParam);
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

        [HttpGet("productsByprice")]
        public async Task<IActionResult> OrderProductByPrice()
        {
            var product = await _context.Products.Include(p => p.ProductImages).OrderBy(p => p.Price).ToListAsync();

            var productToReturn = _mapper.Map<IEnumerable<ProductDto>>(product);

            return Ok(productToReturn);
        }
        [HttpGet("productsByName")]
        public async Task<IActionResult> OrderProductByName()
        {
            var product = await _context.Products.Include(p => p.ProductImages).OrderBy(p => p.Name).ToListAsync();

            var productToReturn = _mapper.Map<IEnumerable<ProductDto>>(product);

            return Ok(productToReturn);
        }

    }
}