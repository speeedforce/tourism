using System.Collections.Generic;
using Tourism.Core.Dto.ArticleDto;

namespace Tourism.Core.Dto.ForumDto
{
    public class ForumResponseDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public List<ArticleResponseDto> Articles { get; set; }
    }
}
