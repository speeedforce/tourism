using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tourism.Core;
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

        public IEnumerable<Article> GetAll() => _context.Articles;
        
        public Article GetById(int id) => _context.Articles.FirstOrDefault(item => item.Id == id);

        public async Task<Article> Create(Article article)
        {
            _context.Articles.Add(article);
            await _context.SaveChangesAsync();
            return article;
        }

        public async Task Delete(int id)
        {
            var item = GetById(id);
            _context.Remove(item);
            await _context.SaveChangesAsync();
        }

        public async Task<Article> Edit(Article article)
        {
         
            _context.Entry(article).State = EntityState.Modified;
           
            await _context.SaveChangesAsync();

            return article;
        }

      
    }
}
