using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SvAPI.Data;
using SvAPI.Models;

namespace SvAPI.Repos
{
    public class Auth : IAuth
    {
        private readonly SvDbContext _context;
        public Auth(SvDbContext context)
        {
            _context = context;

        }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if(user == null)
            {
                return null;
            }

            if(!VerifyPassword(password,user.PasswordHash,user.PasswordSalt)){
                return null;
            }

            return user;
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmc = new System.Security.Cryptography.HMACSHA512(passwordSalt)){
                var computeHash = hmc.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for(int i = 0; i < computeHash.Length;i++){
                    if(computeHash[i] != passwordHash[i])
                        return false;
                }

                return true;
            }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmc = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmc.Key;
                passwordHash = hmc.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExist(string username)
        {
            if(await _context.Users.AnyAsync(x => x.Username == username)) {
                return true;
            }

            return false;
        }
    }
}