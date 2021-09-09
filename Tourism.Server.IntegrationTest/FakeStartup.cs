using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tourism.Core.Models;
using Tourism.Infrastructure;
using Tourism.Server.IntegrationTests;
using Tourism.WebApp;

namespace Tourism.WebApp.IntegrationTests
{
    public class FakeStartup : Startup
    {
        public FakeStartup(IConfiguration configuration) : base(configuration)
        {
        }

        public override void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            base.Configure(app, env);
            var serviceScopeFactory = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
            using (var serviceScope = serviceScopeFactory.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
                dbContext.Database.EnsureCreated();
                if (dbContext.Database.GetDbConnection().ConnectionString.ToLower().Contains("tourism.dev"))
                {
                    throw new Exception("LIVE SETTINGS IN TESTS!");
                }

                if (!dbContext.Users.Any(u => u.Id == UserSettings.UserId))
                {

                    var user = new ApplicationUser();
                    user.ConcurrencyStamp = DateTime.Now.Ticks.ToString();
                    user.Email = UserSettings.UserEmail;
                    user.EmailConfirmed = true;
                    user.Id = UserSettings.UserId;
                    user.NormalizedEmail = user.Email;
                    user.NormalizedUserName = user.Email;
                    user.PasswordHash = Guid.NewGuid().ToString();
                    user.UserName = user.Email;


                    dbContext.Users.Add(user);
                   
                    dbContext.SaveChanges();
                }
            }
        }


    }
}
