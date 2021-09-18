
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using BCryptNet = BCrypt.Net.BCrypt;
using Tourism.Core.Models;

namespace Tourism.Infrastructure
{
    public static class SeedExtension
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                   new User { Id = 1, FirstName = "Admin", LastName = "User", Username = "admin@gmail.com", PasswordHash = BCryptNet.HashPassword("Admin1111"), Role = Role.Admin },
                   new User { Id = 2, FirstName = "Normal", LastName = "User", Username = "user@gmail.com", PasswordHash = BCryptNet.HashPassword("User1111"), Role = Role.User }
            );

            
            modelBuilder.Entity<Forum>().HasData(
                new Forum()
                {
                    ImageUrl = "",
                    Title = "Default",
                    Description = "Default Description",
                    Articles = new List<Article>(),
                    Created = System.DateTime.Now,
                    Id = 1,
                }
            );
        }
    }
}
