using System;

namespace Tourism.WebApp.ViewModels
{
    public class ArticleInputModel
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public string? ImageUrl { get; set; }
    }
}
