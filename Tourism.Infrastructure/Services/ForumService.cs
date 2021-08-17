using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Tourism.Core;
using Tourism.Core.Dto.ForumDto;
using Tourism.Core.Models;
using Tourism.Infrastructure;

namespace Tourism.Server.Services
{
    public class ForumService : IForumService
    {
        private readonly ApplicationDbContext _context;

        public ForumService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ForumResponseDto> Create(Forum forum)
        {
            _context.Forums.Add(forum);
            await _context.SaveChangesAsync();
            return BuildForumDto(forum);
        }

        public async Task<ForumResponseDto> Edit(Forum forum)
        {
            _context.Entry(forum).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return BuildForumDto(forum);
        }

        public Forum GetById(int id = 1)
        {
            return _context.Forums
                            .Include(item => item.Articles).ThenInclude(a => a.User)
                            .FirstOrDefault(item => item.Id == id);
        }


        #region BuildDto 
        public static ForumResponseDto BuildForumDto(Forum forum)
        {
            var forumDto = new ForumResponseDto
            {
                Id = forum.Id,
                Title = forum.Title,
                Description = forum.Description,
                ImageUrl = forum.ImageUrl,
            };

            

            forumDto.Articles = forum.Articles?
                .Select(item => ArticleService.BuildArticleResponseDto(item))
                .ToList();

            return forumDto;
        }


        #endregion
    }
}
