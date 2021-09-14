using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mime;
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

            services.AddControllers()
                .AddJsonOptions(x =>
                {
                    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                })
                .ConfigureApiBehaviorOptions(options =>
                 {
                     options.InvalidModelStateResponseFactory = context =>
                     {
                         var allErrors = context.ModelState.Values.SelectMany(v => v.Errors.Select(b => new ErrorViewModel()
                         {
                             Message = b.ErrorMessage,
                             Status = (int)HttpStatusCode.BadRequest

                         }));
                         var result = new BadRequestObjectResult(allErrors);

                         // TODO: add `using System.Net.Mime;` to resolve MediaTypeNames
                         result.ContentTypes.Add(MediaTypeNames.Application.Json);
                         return result;
                     };
                 }); ;



            // configure strongly typed settings object
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));


            services.AddScoped<IJwtUtils, JwtUtils>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IForumService, ForumService>();
            services.AddScoped<IArticleService, ArticleService>();


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

            //seedForum(context);
          
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
                new User { Id = 1, FirstName = "Admin", LastName = "User", Username = "admin@gmail.com", PasswordHash = BCryptNet.HashPassword("Admin1111"), Role = Role.Admin },
                new User { Id = 2, FirstName = "Normal", LastName = "User", Username = "user@gmail.com", PasswordHash = BCryptNet.HashPassword("User1111"), Role = Role.User }
            };
            context.Users.AddRange(testUsers);
            context.SaveChanges();
        }

        private void seedForum(ApplicationDbContext context)
        {
            var forum = new Forum()
            {
                ImageUrl = "",
                Title = "Default",
                Description = "Default Description",
                Articles = new List<Article>(),
                Created = System.DateTime.Now
            };

            context.Forums.Add(forum);
            context.SaveChanges();
        }
    }
}
