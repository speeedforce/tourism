using Tourism.Core.Models;
using System.Threading.Tasks;

namespace Tourism.Core
{
    public interface IForumService
    {
        Forum GetById(int id = 1);
        Task<Forum> Create(Forum article);

        Task<Forum> Edit(Forum article);
    }
}
