using System.Threading.Tasks;
using SvAPI.Models;

namespace SvAPI.Repos
{
    public interface IAuth
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username,string password);
         Task<bool> UserExist(string username);
    }
}