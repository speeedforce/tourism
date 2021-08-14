using System.Collections.Generic;
using Tourism.Core.Dto.UserDto;
using Tourism.Core.Models;


namespace Tourism.Athorization.Core
{
    public interface IUserService
    {
        AuthenticateResponseDto Authenticate(AuthenticateRequestDto model);

        User GetById(int id);

        IEnumerable<User> GetAll();


    }

   
}
