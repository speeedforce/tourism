using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tourism.Server.IntegrationTests.Models.Forum
{
    public class TestForumCreateViewModel
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime Created { get; set; }

        public string? ImageUrl { get; set; }

        public TestForumCreateViewModel CloneWith(Action<TestForumCreateViewModel> changes)
        {
            var clone = (TestForumCreateViewModel)MemberwiseClone();

            changes(clone);

            return clone;
        }
    }
}
