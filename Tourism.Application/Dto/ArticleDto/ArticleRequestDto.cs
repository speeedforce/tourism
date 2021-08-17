using System;

namespace Tourism.Core.Dto.ArticleDto
{
    public class ArticleRequestDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public string? ImageUrl { get; set; }
    }
}
