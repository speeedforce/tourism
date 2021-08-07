using System;

namespace Tourism.Server.IntegrationTests.TestModels
{
    public class TestArticleInputModel
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public string ImageUrl { get; set; }
    }
}
