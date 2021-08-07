using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Tourism.Server.IntegrationTests.TestModels;
using Tourism.WebApp;
using Xunit;

namespace Tourism.Server.IntegrationTests.Controllers
{
    public class ArticleControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;

        public ArticleControllerTests(CustomWebApplicationFactory<Startup> factory)
        {
            factory.ClientOptions.BaseAddress = new Uri($"{Config.URI}/article");
            _client = factory.CreateClient();
        }


        [Fact]
        public async Task Post_CreateReturns200()
        {

            var content = GetValidArticleJsonContent();

            var response = await _client.PostAsJsonAsync("", content);


            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }

        private static JsonContent GetValidArticleJsonContent()
        {
            return JsonContent.Create(GetValidArticleViewModel());
        }


        private static TestArticleInputModel GetValidArticleViewModel()
        {
            return new TestArticleInputModel
            {
                Title = "Article Valid Object",
                Content = "Article Conent",
                Created = DateTime.UtcNow,
                ImageUrl = ""
            };
        }

    }


  

}