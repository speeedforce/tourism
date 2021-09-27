using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tourism.Core;
using Tourism.Core.Dto.ArticleDto;
using Tourism.Core.Models;

namespace Tourism.Infrastructure
{
    public class ArticleService : IArticleService
    {
        private ApplicationDbContext _context;
        public ArticleService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<ArticleResponseDto> GetAll()
        {
           return _context.Articles.Include(a => a.User)
                .Select(a => BuildArticleResponseDto(a));
        }
        
        public Article GetById(int id) => 
            _context.Articles.FirstOrDefault(item => item.Id == id);

        public async Task<ArticleResponseDto> Create(Article article)
        {
            _context.Articles.Add(article);
            await _context.SaveChangesAsync();
            return BuildArticleResponseDto(article);
        }

        public async Task<ArticleResponseDto> Edit(Article article)
        {

            _context.Entry(article).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return BuildArticleResponseDto(article);
        }


        public async Task Delete(int id)
        {
            var item = GetById(id);
            _context.Articles.Remove(item);
            await _context.SaveChangesAsync();
        }

      


        public static ArticleResponseDto BuildArticleResponseDto(Article a)
        {
            return new ArticleResponseDto
            {
                Author = a.User.Username,
                Id = a.Id,
                Title = a.Title,
                Content = a.Content,
                CountReplies = a.Replies == null ? 0 : (a.Replies as List<ArticleReply>).Count,
                Created = a.Created,
                ForumId = a.ForumId,
                ImageUrl = a.ImageUrl
            };
        }
    }
}
