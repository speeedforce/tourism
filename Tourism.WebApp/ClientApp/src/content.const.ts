
export class ERRORS_TEXT {
    
     static EMAIL_REQUIRED = "Email - обов'язкове поле.";
     static PASSWORD_REQUIRED = "Пароль - обов'язкове поле.";
     static EMAIL_INVALID = "Некоректна пошта, перевірте коректність введення.";
     static PASSWOWRD_INVALID = "Некоректний пароль. Пароль пивинен бути мініму 8 символів, містит великі та малі літери, а також цифру.";
     static EMAIL_DUPLICATE = "Користувач вже зареєстрований.";
    
     static CONFIRM_PASSWORD_REQUIRED = "Пароль - обов'язкове поле.";
     static PASSWORD_NOT_MATCHED = "Поле пароль та підтвердження різні.";

     static INVALID_AUTH = "Некоректний логін або пароль.";



    }

export class CONTENT_TEXT {

    // title 
    static REGISTER_TITLE = "Реєстрація";
    static LOGIN_TITLE = "Вхід на сайт";



     static EMAIL = "Пошта";
     static PASSWORD = "Пароль";
     static CONFIRM_PASSWORD = "Підтвердіть пароль";


     static LOGIN = "Вхід";
     static REGISTER = "Зареєструватися";
     static LOGOUT = "Вихід";

     static BOOK = "Прийняти участь";
     static APPROVE = "Підтвердити";
     static DECLINE = "Відхилити";

     static CREAT = "Створити";
     static EDIT = "Змінити";
     static REMOVE = "Видалити";
     static ATTACHED = "Додати вкладення";
     static REPLY = "Відповісти";
}

export class SYSTEM_CONTENT {
     static CONTENT = CONTENT_TEXT;
     static ERRORS = ERRORS_TEXT;
}

