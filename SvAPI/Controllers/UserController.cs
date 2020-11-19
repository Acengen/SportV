using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SvAPI.Data;
using SvAPI.DataTransferObj;

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
    }
}