using System.Collections.Generic;
using System.Threading.Tasks;
using SvAPI.Helper;
using SvAPI.Models;

namespace SvAPI.Repo
{
    public interface IProduct
    {
         Task<IEnumerable<Product>> GetProducts(ProductParam productParam);
    }
}