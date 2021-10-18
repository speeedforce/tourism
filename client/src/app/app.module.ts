import { ReactiveFormsModule } from '@angular/forms';
import { ForumModule } from './forum/forum.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AppRoutingModule } from './app.routing.module';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { ErrorInterceptor } from 'src/api-authorization/helpers/error.interceptor';
import { JwtInterceptor } from 'src/api-authorization/helpers/jwt.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderContentComponent } from './shared/header-content/header-content.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePasswordComponent } from './user-profile/change-password/change-password.component';

@NgModule({
  declarations: [					
    AppComponent,
    NavMenuComponent,
    PageNotFoundComponent,
      UserProfileComponent,
      ChangePasswordComponent,
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ApiAuthorizationModule,
    AppRoutingModule,
    ForumModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
