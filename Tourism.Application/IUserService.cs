using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tourism.Core.Models;
using Tourism.Core.ViewModels;
using Tourism.WebApp.ViewModels;

namespace Tourism.Core
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);

        User GetById(int id);

        IEnumerable<User> GetAll();


    }

   
}
