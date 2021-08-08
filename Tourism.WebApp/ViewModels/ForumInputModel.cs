using System;
using System.ComponentModel.DataAnnotations;

namespace Tourism.WebApp.ViewModels
{
    public class ForumInputModel
    {

        [Required]
        [StringLength(32, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 8)]
        public string Title { get; set; }

        [Required]
        [StringLength(240, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 32)]
        public string Description { get; set; }

        public DateTime Created { get; set; }

        public string? ImageUrl { get; set; }
    }

    
}
