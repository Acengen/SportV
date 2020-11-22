using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SvAPI.Data;
using SvAPI.DataTransferObj;
using SvAPI.Models;
using SvAPI.Repos;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace SvAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuth _repo;
        private readonly SvDbContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public AuthController(SvDbContext context, IAuth repo, IMapper mapper, IConfiguration config)
        {
            _config = config;
            _mapper = mapper;
            _context = context;
            _repo = repo;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegistarDto userForRegistarDto)
        {
            userForRegistarDto.Username = userForRegistarDto.Username.ToLower();

            if (await _repo.UserExist(userForRegistarDto.Username))
            {
                return BadRequest("Username already exists");
            }

            var userToCreate = _mapper.Map<User>(userForRegistarDto);

            var createUser = await _repo.Register(userToCreate, userForRegistarDto.Password);

            var userReturn = _mapper.Map<UserDetailDto>(createUser);

            return StatusCode(201,userReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto)
        {
            var userFromRepo = await _repo.Login(userLoginDto.Username.ToLower(), userLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

             var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

             var tokenDescriptor = new SecurityTokenDescriptor
             {
                 Subject = new ClaimsIdentity(claims),
                 Expires = DateTime.Now.AddDays(1),
                 SigningCredentials = cred
             };

             var tokenHandler = new JwtSecurityTokenHandler();

             var token = tokenHandler.CreateToken(tokenDescriptor);

             var user = _mapper.Map<UserDetailDto>(userFromRepo);

             return Ok( new 
             {
                 token = tokenHandler.WriteToken(token),
                 user
             });
        }
    }
}