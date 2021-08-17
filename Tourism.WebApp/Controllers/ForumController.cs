using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Tourism.Core;
using Tourism.Core.Dto.ForumDto;
using Tourism.Core.Models;
using Tourism.Server.Services;
using Tourism.WebApp.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tourism.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumController : ControllerBase
    {
        private readonly IForumService _forumService;

        public ForumController(IForumService forumService)
        {
            _forumService = forumService;
        }

        [HttpGet]
        public ForumResponseDto Get()
        {
            try
            {
                var item = _forumService.GetById();

                var forumVM = ForumService.BuildForumDto(item);

                return forumVM;
            }
            catch (Exception)
            {
                //TODO
            }

            return null;
        } 

        // POST api/<ForumController>
        [HttpPost]
        
        // TODO only for admin
        public async Task<IActionResult> Post([FromBody] ForumRequestDto model)
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
        }

       

        // PUT api/<ForumController>/5
        [HttpPut("{id}")]

        // TODO Only for admin
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


        #region ViewModels

        private Forum BuildForum(ForumRequestDto model)
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
