using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tourism.Server.Models;

namespace Tourism.Server.Data
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
