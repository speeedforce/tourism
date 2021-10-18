export class ARTICLE_ERROR {
     static TITLE_REQUIRED = "Заголовок - обов'язкове поле."
     static TITLE_MIN_MAX = "Довжина заголовка неменше 6 та не більше 32 символів."

     static CONTENT_REQUIRED = "Контент - обов'язкове поле."
     static CONTENT_MIN_MAX = "Довжина контенту неменше 8 та не більше 512 символів."
}

export class ERRORS_TEXT {
    
     static EMAIL_REQUIRED = "Email - обов'язкове поле.";
     static PASSWORD_REQUIRED = "Пароль - обов'язкове поле.";
     static EMAIL_INVALID = "Некоректна пошта, перевірте коректність введення.";
     static PASSWOWRD_INVALID = "Некоректний пароль. Пароль пивинен бути мініму 8 символів, містит великі та малі літери, а також цифру.";
     static EMAIL_DUPLICATE = "Користувач вже зареєстрований.";
    
     static CONFIRM_PASSWORD_REQUIRED = "Пароль - обов'язкове поле.";
     static PASSWORD_NOT_MATCHED = "Поле пароль та підтвердження різні.";

     static INVALID_AUTH = "Некоректний логін або пароль.";

     static ARTICLE = ARTICLE_ERROR

    }

    export class FORUM_CONTENT {
         static TITLE = "Запорізький центр спортивного орієнтування";
         static INFO = "Все про наші змагання - календар, результатт, протоколи. На сайті Ви можете подати заявку на змагання та дізнатися останні новини."
         static IMAGE = "assets/pictures/main.jpg"
    }

    export class ARTICLE_CONTENT {
     static CREATE = "Створити пост"


     static CREATED = "Зберегти"
     static UPDATED = "Статя успішно оновлена"

     static TITLE = "Заголовок"
     static CONTENT = "Текст статті"

     static ATTACHMENT = "Підкрипити документи"
     static IMAGE_CONTENT = "Завантажити зображення"
     static PREVIEW = "Переглянути"


     static ATTACHMENTS = "Додатки"
     static DOCS = "Документи"


   
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

     static CREATE = "Додати";
     static EDIT = "Змінити";
     static REMOVE = "Видалити";
     static ATTACHED = "Додати вкладення";
     static REPLY = "Відповісти";

     // static ARTICLE_CREATED = "Статтю успішно створено: "
     // static ARTICLE_UPDATED = "Статя успішно оновлена"
     static FORUM = FORUM_CONTENT;
     static ARTICLE = ARTICLE_CONTENT;


     static SUCCESS = "Дія успішно виконена"
     static CONFIRM_WARNING = "Ви підтверджуєте дію?"
}



export class SYSTEM_CONTENT {
     static CONTENT = CONTENT_TEXT;
     static ERRORS = ERRORS_TEXT;
}

