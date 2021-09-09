using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Tourism.Core.Models;
using Tourism.Server.IntegrationTests;
using Xunit;

namespace Tourism.WebApp.IntegrationTests.Controllers
{
    public class ArticleControllerTests : IntegrationTestBase
    {
        private HttpClient _httpClient;
        private CustomWebApplicationFactory<Startup> _factory;
        //private SignInManager<ApplicationUser> _signInManager;
        public ArticleControllerTests(CustomWebApplicationFactory<Startup> factory) : base(factory)
        {
            _httpClient = factory.CreateClient(new WebApplicationFactoryClientOptions
            {
                BaseAddress = new Uri("http://localhost:5000")
            });
            _factory = factory;
        }

        [Fact]
        public async Task Get_EndpointsReturnSuccess()
        {
            var client = GetFactory().CreateClient(new WebApplicationFactoryClientOptions
            {
                BaseAddress = new Uri("http://localhost:5000/api/article")
            });

            var response = await client.GetAsync("");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299

        }

        [Fact]
        public async Task Get_SecurePageRedirectsAnUnauthenticatedUser()
        {
            
            var client = _factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureTestServices(services =>
                {
                    services.AddAuthentication("Test")
                        .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>(
                            "Test", options => { });
                });
            })
            .CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false,
                BaseAddress = new Uri("http://localhost:5000/api/article")
            });

            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Test");

            

            // Act
            var response = await client.GetAsync("");


            // Assert
            Assert.Equal(HttpStatusCode.Redirect, response.StatusCode);
            Assert.StartsWith("http://localhost/Identity/Account/Login",
                response.Headers.Location.OriginalString);
        }

        public async Task Get_AuthorizeTestReturnsUser()
        {
            // Arrange
           
           
            // Arrange
            var client = _factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureTestServices(services =>
                {
                    services.AddAuthentication("Test")
                        .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>(
                            "Test", options => { });
                });


            })
            .CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false,
                BaseAddress = new Uri("http://localhost:5000/api/article")
            });

            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Test");

            // Act
            var response = await client.GetAsync("");

            // Assert
            Assert.Equal(HttpStatusCode.Redirect, response.StatusCode);
            Assert.StartsWith("http://localhost/Identity/Account/Login",
                response.Headers.Location.OriginalString);
        }
    }


}