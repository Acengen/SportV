using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SvAPI.Data;
using SvAPI.DataTransferObj;
using SvAPI.Models;

namespace SvAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly SvDbContext _context;
        private readonly IMapper _mapper;
        public UserController(SvDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            var userToRetun = _mapper.Map<IEnumerable<UserDetailDto>>(users);

            return Ok(userToRetun);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id) {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            var userToRetun = _mapper.Map<UserDetailDto>(user);

            return Ok(userToRetun);
        }

        [HttpPut("{id}/edit")]
        public async Task<IActionResult> EditUser(int id, UserToUpdateDto userToUpdateDto) {
           var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

           var userToreturn = _mapper.Map(userToUpdateDto,user);
           
           await _context.SaveChangesAsync();

           return NoContent();
        }

        [HttpPost("product/{id}/user/{userId}")]
        public async Task<IActionResult> AddToShopCart(int id, int userId){
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            var userToRetun = new ProductAndUser{
                UId = user.Id,
                Username = user.Username,
                UserEmail = user.Email,
                ProductName = product.Name,
                ProductPrice = product.Price,
                ProductDescription = product.Description,
                ProductGender = product.Gender
            };

            _context.ProductAndUsers.Add(userToRetun);

            await _context.SaveChangesAsync();

            return Ok(userToRetun);
        }

          [HttpGet("product/{uId}")]
          public async Task<IActionResult> GetProductsByUser(int uId) {
              var productOfUser = await _context.ProductAndUsers.Where(p => p.UId == uId).ToListAsync();

              return Ok(productOfUser);
          }
    }

  
}