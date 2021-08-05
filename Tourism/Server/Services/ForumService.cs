using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tourism.Server.Data;
using Tourism.Server.Models;

namespace Tourism.Server.Services
{
    public class ForumService : IForumService
    {
        private readonly ApplicationDbContext _context;

        public ForumService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Forum> Create(Forum forum)
        {
            _context.Forums.Add(forum);
            await _context.SaveChangesAsync();
            return forum;
        }

        public async Task<Forum> Edit(Forum forum)
        {
            _context.Entry(forum).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return forum;
        }

        public Forum GetById(int id = 1)
        {
            return _context.Forums
                            .Include(item => item.Articles)
                            .FirstOrDefault(item => item.Id == id);
        }
    }
}
