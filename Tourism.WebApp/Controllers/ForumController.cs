using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tourism.Core;
using Tourism.Core.Models;
using Tourism.WebApp.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tourism.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IForumService _forumService;

        public ForumController(UserManager<User> userManager, IForumService forumService)
        {
            _userManager = userManager;
            _forumService = forumService;
        }


        // GET: api/<ForumController>

        // Get default forum
        [HttpGet]
        public ForumViewModel Get()
        {
            try
            {
                var item = _forumService.GetById();

                var forumVM = BuildForumViewModel(item);

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
        public async Task<IActionResult> Post([FromBody] ForumInputModel model)
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

        private Forum BuildForum(ForumInputModel model)
        {
            return new Forum
            {
                Title = model.Title,
                Description = model.Description,
                Created = model.Created,
                ImageUrl = model.ImageUrl == null ? "" : model.ImageUrl            
            };
        }


        private ForumViewModel BuildForumViewModel(Forum forum)
        {
            var forumViewModel = new ForumViewModel
            {
                Id = forum.Id,
                Title = forum.Title,
                Description = forum.Description,
                ImageUrl = forum.ImageUrl
            };

            List<ArticleViewModel> articles = new List<ArticleViewModel>();

            foreach(var a in forum.Articles)
            {
                var articleVM = BuildArticleViewModel(a);

                articles.Add(articleVM);
            }

            forumViewModel.Articles = articles;

            return forumViewModel;
        }

        private static ArticleViewModel BuildArticleViewModel(Article a)
        {
            var replies = a.Replies as List<ArticleReply>;
            return new ArticleViewModel
            {
                Author = a.User.Username,
                Id = a.Id,
                Title = a.Title,
                Content = a.Content,
                CountReplies = replies != null ? replies.Count : 0,
                Created = a.Created,
                ForumId = a.ForumId,
                ImageUrl = a.ImageUrl
            };
        }



        #endregion
    }
}
