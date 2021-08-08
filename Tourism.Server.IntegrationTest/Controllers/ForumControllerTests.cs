
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using Tourism.Server.IntegrationTests.Models;
using Tourism.WebApp;
using Tourism.WebApp.ViewModels;
using Tourism.Server.IntegrationTests;

namespace Tourism.WebApp.IntegrationTests
{
    public class ForumControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;

        public ForumControllerTests(CustomWebApplicationFactory<Startup> factory)
        {
            factory.ClientOptions.BaseAddress = new Uri($"{Config.URI}/forum");
            _client = factory.CreateClient();
        }



        [Fact]
        public async Task GetAll_ReturnsExpected200()
        {
            var response = await _client.GetAsync("");

            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task GetAll_ReturnsExpectedResponse() {

            var model = await _client.GetFromJsonAsync<ForumViewModel>("");
            Assert.NotNull(model);
        }
    }
}
