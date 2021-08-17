using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Tourism.Core.Models
{
    public class Article
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public string ImageUrl { get; set; }

        public virtual User User { get; set; }

        public int ForumId { get; set; }
        public virtual Forum Forum { get; set; }

        public virtual IEnumerable<ArticleReply> Replies { get; set; } 
    }
}
