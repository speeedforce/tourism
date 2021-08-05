using System.Collections.Generic;
using Tourism.Shared.ViewModels.Article;

namespace Tourism.Shared.ViewModels.Forum
{
    public class ForumViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public List<ArticleViewModel> Articles { get; set; }
    }
}
