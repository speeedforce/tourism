using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Tourism.Athorization.Core;
using Tourism.Core;
using Tourism.Core.Authorization;
using Tourism.Core.Helpers;
using Tourism.Core.Models;
using Tourism.Infrastructure;
using Tourism.Infrastructure.Services;
using Tourism.Infrastructure.Services.Authorization;
using Tourism.Server.Services;
using Tourism.WebApp.Authorization;
using BCryptNet = BCrypt.Net.BCrypt;

namespace Tourism.WebApp
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public virtual void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
               options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"),
               b => b.MigrationsAssembly("Tourism.WebApp")));


            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                                  builder =>
                                  {
                                      builder.AllowAnyHeader();
                                      builder.WithOrigins("http://localhost:4200");
                                      builder.AllowAnyMethod();
                                  });
            });

            services.AddControllers().AddJsonOptions(x =>
            {
                // serialize enums as strings in api responses (e.g. Role)
                x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });



            // configure strongly typed settings object
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));


            services.AddScoped<IJwtUtils, JwtUtils>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IForumService, ForumService>();
            services.AddScoped<IArticleService, ArticleService>();


            services.AddRazorPages(options =>
            {
                options.Conventions.AuthorizePage("/SecurePage");
            });
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public virtual void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationDbContext context)
        {
            //this.createTestUsers(context);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }
          
            app.UseRouting();
            app.UseCors();
            // global error handler
            app.UseMiddleware<ErrorHandlerMiddleware>();

            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });


        }

        private void createTestUsers(ApplicationDbContext context)
        {
            // add hardcoded test users to db on startup
            var testUsers = new List<User>
            {
                new User { Id = 1, FirstName = "Admin", LastName = "User", Username = "admin", PasswordHash = BCryptNet.HashPassword("admin"), Role = Role.Admin },
                new User { Id = 2, FirstName = "Normal", LastName = "User", Username = "user", PasswordHash = BCryptNet.HashPassword("user"), Role = Role.User }
            };
            context.Users.AddRange(testUsers);
            context.SaveChanges();
        }
    }
}
