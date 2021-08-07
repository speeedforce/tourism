
using System.Collections.Generic;
using System.Threading.Tasks;
using Tourism.Core.Models;

namespace Tourism.Core
{
    public interface IArticleService
    {
        IEnumerable<Article> GetAll();

        Article GetById(int id);

        Task<Article> Create(Article article);

        Task<Article> Edit(Article article);

        Task Delete(int id);
    }
}
