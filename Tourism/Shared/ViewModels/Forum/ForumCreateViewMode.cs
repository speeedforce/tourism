using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tourism.Shared.ViewModels.Forum
{
    public class ForumCreateViewMode
    {
        public string Title { get; set; }
        public string Description { get; set; }

        public DateTime Created { get; set; }

        public string? ImageUrl { get; set; }
    }

    
}
