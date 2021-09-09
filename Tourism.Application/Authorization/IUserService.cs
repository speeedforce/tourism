using System.Collections.Generic;
using System.Threading.Tasks;
using Tourism.Core.Dto.UserDto;
using Tourism.Core.Models;


namespace Tourism.Athorization.Core
{
    public interface IUserService
    {
        AuthenticateResponseDto Authenticate(AuthenticateRequestDto model);

        User GetById(long id);

        IEnumerable<User> GetAll();

        Task<AuthenticateResponseDto> Register(AuthenticateRequestDto model);
    }

   
}
