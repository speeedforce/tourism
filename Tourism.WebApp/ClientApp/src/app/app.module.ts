
import { LoginComponent } from './../api-authorization/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { ForumComponent } from './components/forum/forum.component';
import { ArticleComponent } from './components/article/article.component';
import { AppRoutingModule } from './app.routing.module';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RouterModule } from '@angular/router';
import { ErrorInterceptor } from 'src/api-authorization/helpers/error.interceptor';
import { JwtInterceptor } from 'src/api-authorization/helpers/jwt.interceptor';

@NgModule({
  declarations: [		
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ForumComponent,
    ArticleComponent
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ApiAuthorizationModule,
    AppRoutingModule,
    RouterModule,
   
  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
