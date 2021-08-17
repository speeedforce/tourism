using System.ComponentModel.DataAnnotations;

namespace Tourism.Core.Dto.UserDto
{
    public class AuthenticateRequestDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
