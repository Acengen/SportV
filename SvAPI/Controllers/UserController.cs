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
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly SvDbContext _context;
        private readonly IMapper _mapper;

        private readonly IFav _repo;

        public UserController(SvDbContext context, IMapper mapper, IFav repo)
        {
            _repo = repo;
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
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            var userToRetun = _mapper.Map<UserDetailDto>(user);

            return Ok(userToRetun);
        }

        [HttpPut("{id}/edit")]
        public async Task<IActionResult> EditUser(int id, UserToUpdateDto userToUpdateDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            var userToreturn = _mapper.Map(userToUpdateDto, user);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("product/{id}/user/{userId}")]
        public async Task<IActionResult> AddToShopCart(int id, int userId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            var userToRetun = new ProductAndUser
            {
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
        public async Task<IActionResult> GetProductsByUser(int uId)
        {
            var productOfUser = await _context.ProductAndUsers.Where(p => p.UId == uId).ToListAsync();
            return Ok(productOfUser);
        }

        [HttpDelete("productAndUser/{id}")]
        public async Task<IActionResult> RemoveProductFromUser(int id)
        {
            var prodAndUser = await _context.ProductAndUsers.FirstOrDefaultAsync(p => p.Id == id);

            _context.ProductAndUsers.Remove(prodAndUser);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("removeAllProductFromUser/user/{id}")]
        public async Task<IActionResult> RemoveAllProductsAfterBuyThem(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            var prod = _context.ProductAndUsers.Where(p => p.UId == id);

            _context.ProductAndUsers.RemoveRange(prod);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("productBuy/{uId}")]
        public async Task<IActionResult> BuyProduct(int uId)
        {
            var productOfUser = await _context.ProductAndUsers.Where(p => p.UId == uId).ToListAsync();
            var sum = productOfUser.Sum(p => p.ProductPrice);
            return Ok(new
            {
                productOfUser,
                sum
            });
        }

        [HttpGet("product/user/{id}")]
        public async Task<IActionResult> PostToCart(int id, int uid)
        {
            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            var product = _context.ProductAndUsers.Where(p => p.UId == currentUser.Id).Count();
            return Ok(product);

        }

        [HttpPost("{id}/fav/{prodId}")]
        public async Task<IActionResult> AddToFav(int id, int prodId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == prodId);

            var fav = new Favorit
            {
                Name = product.Name,
                UId = user.Id,
                Price = product.Price,
                Age = product.Age,
                Brand = product.Brand,
                PId = product.Id
            };

            fav.isFav = true;

            await _context.Favorits.AddAsync(fav);
            await _context.SaveChangesAsync();

            return Ok(fav);
        }

        [HttpDelete("favorit/{id}")]
        public async Task<IActionResult> RemoveFavorite(int id)
        {
            var favtoremove = await _context.Favorits.FirstOrDefaultAsync(f => f.PId == id);

            _context.Favorits.Remove(favtoremove);

            _context.SaveChanges();

            return NoContent();
        }

        [HttpGet("fav/{id}")]

        public async Task<IActionResult> GetFavorits(int id)
        {
            
            var favRepo = await _repo.GetFavorit(id);
           
            return Ok(favRepo);
        }

    }


}