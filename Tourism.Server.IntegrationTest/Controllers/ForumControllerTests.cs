
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc;

using Tourism.WebApp.ViewModels;
using Tourism.Server.IntegrationTests.Models;
using Tourism.WebApp;

namespace Tourism.Server.IntegrationTests
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
        public async Task GetAll_ReturnsExpectedResponse() {

            var model = await _client.GetFromJsonAsync<ForumViewModel>("");

            Assert.NotNull(model);
        }

        [Fact]
        public async Task Post_CreateModelValidation_ReturnsBadRequest()
        {
            var forumCreateModel = GetValidForumCreateViewModel().CloneWith(f => f.Title = null);

            var response = await _client.PostAsJsonAsync("", forumCreateModel);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task Post_CreateModelValidation_ReturnsExpectedProblemDetails()
        {
            var forumCreateModel = GetValidForumCreateViewModel().CloneWith(f => f.Title = null);

            var response = await _client.PostAsJsonAsync("", forumCreateModel);

            var problemsDetails = await response.Content.ReadFromJsonAsync<ValidationProblemDetails>();


            Assert.Collection(problemsDetails.Errors, kvp =>
            {
                Assert.Equal("Name", kvp.Key);
                var error = Assert.Single(kvp.Value);
                Assert.Equal("Something", error);
            });
        }



        private static TestForumInputModel GetValidForumCreateViewModel()
        {
            return new TestForumInputModel
            {
                Title = "Test Stas",
                Description = "Valid Description",
                Created = DateTime.UtcNow,
                ImageUrl = ""
            };
        }
    }
}
