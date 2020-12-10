using System.Collections.Generic;
using System.Threading.Tasks;
using SvAPI.Models;

namespace SvAPI.Repo
{
    public interface IFav
    {
         Task<IEnumerable<Favorit>> GetFavorit(int userId);
    }
}