using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tourism.Server.IntegrationTests
{
    public static class Config
    {
        public static string DB_STAGING_STRING { get; }
        public static string URI { get;  }


        static Config()
        {
            DB_STAGING_STRING = "Host=localhost;Username=postgres;Password=stas;Database=tourism.staging";
            URI = "http://localhost/api";
        }
    }
}
