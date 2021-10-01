using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
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

namespace Tourism.WebApp
{
    sealed public class Startup
    {
        private IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            foreach (DictionaryEntry de in Environment.GetEnvironmentVariables())
                Debug.WriteLine("  {0} = {1}", de.Key, de.Value);
            
            Debug.WriteLine(Configuration.GetConnectionString("DefaultConnection"));
            
            services.AddDbContext<ApplicationDbContext>(options =>
               options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"),
               b => b.MigrationsAssembly("Tourism.WebApp")));


            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                                  builder =>
                                  {
                                      builder.AllowAnyHeader();
                                      builder.WithOrigins("http://localhost:80");
                                      builder.WithOrigins("http://client:3000");
                                      builder.WithOrigins("http://localhost:3000");
                                      builder.WithOrigins("http://localhost:8888");
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
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationDbContext context)
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
            
           

            app.UseRouting();
            app.UseCors();
            // global error handler
            app.UseMiddleware<ErrorHandlerMiddleware>();

            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(name: "default", "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
