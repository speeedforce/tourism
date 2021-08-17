using System;
using System.Text.Json.Serialization;

namespace Tourism.Core.Models
{
    public class ArticleReply
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }

        public virtual User User { get; set; }

        [JsonIgnore]
        public virtual Article Article { get; set; }
    }
}
