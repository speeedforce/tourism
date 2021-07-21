using System;


namespace Tourism.Server.Models
{
    public class ArticleReply
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public virtual ApplicationUser User { get; set; }
        public virtual Article Article { get; set; }
    }
}
