
using System.Collections.Generic;
using System.Threading.Tasks;
using Tourism.Core.Dto.ArticleDto;
using Tourism.Core.Models;

namespace Tourism.Core
{
    public interface IArticleService
    {
        IEnumerable<ArticleResponseDto> GetAll();

        ArticleResponseDto GetById(int id);

        Task<ArticleResponseDto> Create(Article article);

        Task<ArticleResponseDto> Edit(Article article);

        Task Delete(int id);
    }
}
