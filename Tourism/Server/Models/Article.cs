using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tourism.Server.Models
{
    public class Article
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public virtual ApplicationUser User { get; set; }

        public int ForumId { get; set; }
        public virtual Forum Forum { get; set; }

        public virtual IEnumerable<ArticleReply> Replies { get; set; } 
    }
}
