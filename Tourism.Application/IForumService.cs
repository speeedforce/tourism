using Tourism.Core.Models;
using System.Threading.Tasks;
using Tourism.Core.Dto.ForumDto;

namespace Tourism.Core
{
    public interface IForumService
    {
        Forum GetById(int id = 1);
        Task<ForumResponseDto> Create(Forum article);

        Task<ForumResponseDto> Edit(Forum article);
    }
}
