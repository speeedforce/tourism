using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Tourism.Core.Helpers
{
    public  class PasswordValidationAtribute : ValidationAttribute
    {
        public PasswordValidationAtribute()
        : base("{0} value is not valid password")
        {
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string input = (string)value;

            var passwordCheck = new Regex(@"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}");



            var isValidated = passwordCheck.IsMatch(input);
               

            if (isValidated)
                return null;

            return new ValidationResult("Error1");
        }
    }
}
