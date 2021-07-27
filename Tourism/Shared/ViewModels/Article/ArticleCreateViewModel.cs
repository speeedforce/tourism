using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tourism.Shared.ViewModels.Article
{
    public class ArticleCreateViewModel
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public int ForumId { get; set; }
    }
}
