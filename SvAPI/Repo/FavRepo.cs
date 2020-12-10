using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SvAPI.Data;
using SvAPI.Models;

namespace SvAPI.Repo
{
    public class FavRepo : IFav
    {
        private readonly SvDbContext _context;
        public FavRepo(SvDbContext context)
        {
            _context = context;

        }
        public async Task<IEnumerable<Favorit>> GetFavorit(int userId)
        {
            var getFav = await _context.Favorits.Where(f => f.UId == userId).ToListAsync();

            return getFav;
        }
    }
}