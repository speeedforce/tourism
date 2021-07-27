using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Tourism.Server.Data;
using Tourism.Server.Models;
using Tourism.Shared.Error;
using Tourism.Shared.ViewModels.Forum;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tourism.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IForumService _forumService;

        public ForumController(UserManager<ApplicationUser> userManager, IForumService forumService)
        {
            _userManager = userManager;
            _forumService = forumService;
        }


        // GET: api/<ForumController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var items = _forumService.GetAll();
                return Ok(new { items = items });
            }
            catch (Exception)
            {
                //TODO
            }

            return NoContent();
        }

        // GET api/<ForumController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var item = _forumService.GetById(id);
                if (item == null)
                    return NotFound(
                        new ErrorViewModel { Message = $"Forum doesn't find with Id = {id}" });
                else
                    return Ok(new { item = item });
            }
            catch(Exception)
            {
                //TODO
            }

            return NoContent();
        }

        // POST api/<ForumController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ForumCreateViewMode model)
        {
            var forum = BuildForum(model);

            try
            {
                await _forumService.Create(forum);
                return Ok(new { item = forum });
            }
            catch (DbUpdateException ex)
            {

                //TODO
                return BadRequest(new ErrorViewModel()
                {
                    Message = ex.InnerException.Message
                });
            }

            return NoContent();
        }

       

        // PUT api/<ForumController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Forum forum)
        {
            if (id != forum.Id)
                return BadRequest();

            try
            {
                var item = await _forumService.Edit(forum);
                return Ok(item);
            }
            catch (DbUpdateConcurrencyException)
            {

            }

            return NoContent();
        }

        // DELETE api/<ForumController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {

                var item = _forumService.GetById(id);

                if (item == null) return BadRequest(new ErrorViewModel() { Message = "Item doesn't exist or alread has been deleted." });
                else  await _forumService.Delete(item);
                return Ok();
                
            }
            
            catch (DbUpdateConcurrencyException)
            {

            }

            return NoContent();
        }

        #region ViewModels

        private Forum BuildForum(ForumCreateViewMode model)
        {
            return new Forum
            {
                Title = model.Title,
                Description = model.Description,
                Created = model.Created,
                ImageUrl = model.ImageUrl == null ? "" : model.ImageUrl            
            };
        }

        #endregion
    }
}
