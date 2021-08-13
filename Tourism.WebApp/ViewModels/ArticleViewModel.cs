﻿using System;


namespace Tourism.WebApp.ViewModels
{
    public class ArticleViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public string ImageUrl { get; set; }

        public string Author { get; set; }

        public int ForumId { get; set; }
       
        public int CountReplies { get; set; }
    }
}