using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tourism.Athorization.Core;
using Tourism.Core;
using Tourism.Core.Dto.ArticleDto;
using Tourism.Core.Models;
using Tourism.WebApp.ViewModels;

namespace Tourism.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;
        private readonly IUserService _userService;
        private readonly IForumService _forumService;
        public ArticleController(IArticleService articleService, 
            IUserService userService,
            IForumService forumService)
        {
            _articleService = articleService;
            _userService = userService;
            _forumService = forumService;
        }

        // GET: api/<ArticleController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok (new  { items = _articleService.GetAll() });
            }
            catch (Exception)
            {
                //TODO
                //Log
                return BadRequest();
            }
           
        }

        // GET api/<ArticleController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
               var item = _articleService.GetById(id);

                if (item == null)
                    return NotFound(
                        new ErrorViewModel { Message = $"Article doesn't find with Id = {id}" });
                else
                    return Ok(new {  item = item });
            }
            catch (DbUpdateConcurrencyException)
            {
                //TODO
                //Log
                return BadRequest();
            }
        }

        // POST api/<ArticleController>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] ArticleRequestDto model)
        {
            try
            {
                var user = (User)HttpContext.Items["User"];
           
                var forum = _forumService.GetById();
                var article = BuildArticle(model, user, forum);

                var item = await _articleService.Create(article);

                return Ok(item);
            }
            catch (DbUpdateConcurrencyException)
            {
                //TODO
                //Log
                return BadRequest();
            }
            catch (Exception)
            {

            }

            return NoContent();
        }



        // PUT api/<ArticleController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Article value)
        {
            if (id != value.Id)
                return BadRequest();

            try
            {
                var item = await _articleService.Edit(value);
                return Ok(item);
            }
            catch (DbUpdateConcurrencyException)
            {
               
            }

            return NoContent();
        }

        // DELETE api/<ArticleController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Task item =  _articleService.Delete(id);
                return item.IsCompletedSuccessfully ? 
                    Ok() 
                    : BadRequest(new ErrorViewModel { Message = "Item wasn't deleted" });
            }
            catch (DbUpdateConcurrencyException)
            {
               
            }

            return NoContent();
        }


        public static Article BuildArticle(ArticleRequestDto model, User user, Forum forum)
        {
            return new Article
            {
                Title = model.Title,
                Content = model.Content,
                Created = model.Created,
                Replies = new List<ArticleReply>(),
                User = user,
                Forum = forum
            };
        }
    }
}
