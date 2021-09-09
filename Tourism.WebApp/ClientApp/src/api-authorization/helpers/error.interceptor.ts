import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './../authorize.service';
import { SYSTEM_CONTENT } from 'src/content.const';
import { IErrorHandler } from 'src/app/types/error';

export function matchServerError(error: string) {
    switch(error) {
        case 'Username already exist. Try to login.':
            return SYSTEM_CONTENT.ERRORS.EMAIL_DUPLICATE;
        case "The Password field is not a valid e-mail address.": 
            return SYSTEM_CONTENT.ERRORS.PASSWOWRD_INVALID;
        case "The Username field is not a valid e-mail address.":
            return SYSTEM_CONTENT.ERRORS.EMAIL_INVALID;
       default:
           return SYSTEM_CONTENT.ERRORS.INVALID_AUTH;
    }
}


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.authenticationService.logout();
            }

            const message = (err.error as IErrorHandler[])
                            .map(e => matchServerError(e.message))
                            .reduce((prev, curr) => prev + '\n' + curr);

            const error = message || err.statusText;
            return throwError(error);
        }))
    }
}