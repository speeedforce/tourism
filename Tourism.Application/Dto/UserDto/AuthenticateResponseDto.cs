using Tourism.Core.Models;

namespace Tourism.Core.Dto.UserDto
{
    public class AuthenticateResponseDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public Role Role { get; set; }
        public string Token { get; set; }

        public AuthenticateResponseDto(User user, string token)
        {
            FirstName = user.FirstName;
            LastName = user.LastName;
            Username = user.Username.ToLower();
            Role = user.Role;
            Token = token;
        }
    }
}
