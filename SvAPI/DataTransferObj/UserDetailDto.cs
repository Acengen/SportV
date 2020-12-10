using System.Collections.Generic;
using SvAPI.Models;

namespace SvAPI.DataTransferObj
{
    public class UserDetailDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        
        public string About { get; set; }
        public string NickName { get; set; }
        public string Email { get; set; }


    }
}