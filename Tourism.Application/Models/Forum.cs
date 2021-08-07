
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Tourism.Core.Models
{
    public class Forum
    {
        [Key]
        public int Id { get; set; }

        [StringLength(32, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 6)]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public string ImageUrl { get; set; }
        public virtual IEnumerable<Article> Articles { get; set; }
    }
}
