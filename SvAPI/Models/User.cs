using System.Collections.Generic;

namespace SvAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public string About { get; set; }
        public string NickName { get; set; }
        public string Email { get; set; }

    }
}