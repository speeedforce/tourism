using Microsoft.AspNetCore.Mvc.Testing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Tourism.Server.Data;
using Tourism.Server.IntegrationTests.Models;
using Xunit;

namespace Tourism.Server.IntegrationTests
{
    public class ForumControllerTests : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;

        public ForumControllerTests(WebApplicationFactory<Startup> factory)
        {
            _client = factory.CreateDefaultClient();
        }

        [Fact]
        public async Task GetAll_Returns200()
        {
            var response = await _client.GetAsync("/api/forum");

            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task GetAll_ReturnsMediaType()
        {
            var response = await _client.GetAsync("/api/forum");

            Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
        }

        [Fact]
        public async Task GetAll_ReturnsContent()
        {
            var response = await _client.GetAsync("/api/forum");

            Assert.NotNull(response.Content);
            Assert.True(response.Content.Headers.ContentLength > 0);
        }

        [Fact]
        public async Task GetAll_ReturnsExpectedJson()
        {
            var responseStream = await _client.GetStreamAsync("/api/forum");
            var model = await JsonSerializer.DeserializeAsync<ExpectedForumsModel>(responseStream,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ;

            Assert.NotNull(model?.items);
        }
    }
}
