using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

using Microsoft.Extensions.Hosting;

namespace Tourism.WebApp
{
    public class Program
    {
        // main entry point for your application
        public static void Main(string[] args)
        {
            // create the web host builder
            CreateWebHostBuilder(args)
                // build the web host
                .Build()
                // and run the web host, i.e. your web application
                .Run();
        }

        public static IHostBuilder CreateWebHostBuilder(string[] args) =>
          // create a default web host builder, with the default settings and configuration
          Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(x =>
                {
                    x.UseStartup<Startup>();
                
                });
    }
}
