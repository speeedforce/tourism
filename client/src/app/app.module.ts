import { ForumModule } from './forum/forum.module';
import { ReactiveFormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [			
    AppComponent,
    NavMenuComponent,
    PageNotFoundComponent
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ForumModule,
    ApiAuthorizationModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
