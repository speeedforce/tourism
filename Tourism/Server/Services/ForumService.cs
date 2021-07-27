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

        public async Task Delete(Forum item)
        {
            _context.Remove(item);
            await _context.SaveChangesAsync();
        }

        public async Task<Forum> Edit(Forum forum)
        {
            _context.Entry(forum).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return forum;
        }

        public IEnumerable<Forum> GetAll() => _context.Forums.ToList();
       

        public Forum GetById(int id) => _context.Forums.FirstOrDefault(item => item.Id == id);
    }
}
