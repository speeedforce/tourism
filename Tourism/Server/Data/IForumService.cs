using Tourism.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Tourism.Server.Data
{
    public interface IForumService
    {
        Forum GetById(int id);

        IEnumerable<Forum> GetAll();

        Task<Forum> Create(Forum article);

        Task<Forum> Edit(Forum article);

        Task Delete(Forum item);
    }
}
