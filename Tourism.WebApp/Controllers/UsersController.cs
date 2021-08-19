
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Tourism.Athorization.Core;
using Tourism.Core.Authorization;
using Tourism.Core.Dto.UserDto;
using Tourism.Core.Helpers;
using Tourism.Core.Models;
using static Tourism.Core.Helpers.PasswordValidationAtribute;

namespace Tourism.WebApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Authenticate(AuthenticateRequestDto model)
        {
            try
            {
                var response = _userService.Authenticate(model);
                return Ok(response);
            }
            catch(AppException ex)
            {
                return BadRequest(new { ex.Message });
            }
            
        }


        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> Register(AuthenticateRequestDto model)
        {
            try
            {
                var response = await _userService.Register(model);
                return Ok(response);
            }
            catch(AppException ex)
            {
                return BadRequest(new { ex.Message });
            }   
        }

        [Authorize(Role.Admin)]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("{id:long}")]
        public IActionResult GetById(long id)
        {
            // only admins can access other user records
            var currentUser = (User)HttpContext.Items["User"];
            if (id != currentUser.Id && currentUser.Role != Role.Admin)
                return Unauthorized(new { message = "Unauthorized" });

            var user = _userService.GetById(id);
            return Ok(user);
        }


    }
}
