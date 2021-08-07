using System;

namespace Tourism.Server.IntegrationTests.Models
{
    public class TestForumInputModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime Created { get; set; }

        public string? ImageUrl { get; set; }

        public TestForumInputModel CloneWith(Action<TestForumInputModel> changes)
        {
            var clone = (TestForumInputModel)MemberwiseClone();

            changes(clone);

            return clone;
        }
    }
}
