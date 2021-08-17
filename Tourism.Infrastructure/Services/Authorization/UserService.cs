using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Athorization.Core;
using Tourism.Core;
using Tourism.Core.Authorization;
using Tourism.Core.Dto.UserDto;
using Tourism.Core.Helpers;
using Tourism.Core.Models;
using BCryptNet = BCrypt.Net.BCrypt;
namespace Tourism.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private ApplicationDbContext _context;
        private IJwtUtils _jwtUtils;
        private readonly AppSettings _appSettings;

        public UserService(
            ApplicationDbContext context,
            IJwtUtils jwtUtils,
            IOptions<AppSettings> appSettings)
        {
            _context = context;
            _jwtUtils = jwtUtils;
            _appSettings = appSettings.Value;
        }


        public AuthenticateResponseDto Authenticate(AuthenticateRequestDto model)
        {
            var user = _context.Users.SingleOrDefault(x => x.Username == model.Username);

            // validate
            if (user == null || !BCryptNet.Verify(model.Password, user.PasswordHash))
                throw new AppException("Username or password is incorrect");
            // authentication successful so generate jwt token
            // authentication successful so generate jwt token
            var jwtToken = _jwtUtils.GenerateJwtToken(user);

            return new AuthenticateResponseDto(user, jwtToken);
        }

        public async Task<AuthenticateResponseDto> Register(AuthenticateRequestDto model)
        {
            var user = _context.Users.SingleOrDefault(x => x.Username == model.Username);

            if (user != null)
                throw new AppException("Username already exist");

            user = new User()
            {
                Username = model.Username,
                PasswordHash = BCryptNet.HashPassword(model.Password),
                Role = Role.User,
                FirstName = "",
                LastName = ""
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var newUser = Authenticate(model);

            return newUser;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(long id)
        {
            var user = _context.Users.Find(id);
            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        }

    }
}
