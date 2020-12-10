using Microsoft.EntityFrameworkCore;
using SvAPI.Models;

namespace SvAPI.Data
{
    public class SvDbContext : DbContext
    {
        public SvDbContext(DbContextOptions<SvDbContext> options):base(options) 
        {
            
        }

       public DbSet<Product> Products {get;set;}
       public DbSet<Size> Sizes {get;set;}
       public DbSet<ProductImage> ProductImages {get;set;}
       public DbSet<User> Users {get;set;}
       public DbSet<Favorit> Favorits {get;set;}

       public DbSet<ProductAndUser> ProductAndUsers {get;set;}

       public DbSet<Order> Orders {get;set;}

       
    }

    
}