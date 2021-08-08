using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.IO;
using Tourism.WebApp;
using Tourism.WebApp.IntegrationTests;
using Xunit;

namespace Tourism.Server.IntegrationTests
{
    public class IntegrationTestBase : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public IntegrationTestBase(CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        protected WebApplicationFactory<Startup> GetFactory(bool hasUser = false)
        {
            var projectDir = Directory.GetCurrentDirectory();
            var configPath = Path.Combine(projectDir, "appsettings.json");

            return _factory.WithWebHostBuilder(builder =>
            {
            
                builder.ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config.AddJsonFile(configPath);
                });

                builder.UseSolutionRelativeContentRoot("Tourism.WebApp");

                builder.ConfigureTestServices(services =>
                {
                    services.AddMvc(options =>
                    {
                        if (hasUser)
                        {
                            options.Filters.Add(new AllowAnonymousFilter());
                            options.Filters.Add(new FakeUserFilter());
                        }
                    })
                    .AddApplicationPart(typeof(Startup).Assembly);
                });
            });
        }
    }
}
