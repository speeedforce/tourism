using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Tourism.Core.Models;

namespace Tourism.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {

    

        private readonly IConfiguration Configuration;

        public ApplicationDbContext(IConfiguration configuration, DbContextOptions options) : base(options)
        {
            Configuration = configuration;
        }

        //public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        //public DbSet<Forum> Forums { get; set; }
        //public DbSet<Article> Articles { get; set; }
        //public DbSet<ArticleReply> ArticleReplies { get; set; }

        public DbSet<User> Users { get; set; }

       
    }
}
