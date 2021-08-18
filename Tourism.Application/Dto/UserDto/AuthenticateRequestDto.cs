using System.ComponentModel.DataAnnotations;
using Tourism.Core.Helpers;

namespace Tourism.Core.Dto.UserDto
{
    public class AuthenticateRequestDto
    {
        [Required]
        [EmailAddress]
        public string Username { get; set; }

        [Required]
     
        public string Password { get; set; }
    }
}
