using System.Collections.Generic;


namespace Tourism.WebApp.ViewModels
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
