import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent},
        { path: 'logout', component: LogoutComponent}
    
      ]
    )
  ],
  declarations: [ LoginComponent, RegisterComponent, LogoutComponent],
  exports: [LoginComponent, RegisterComponent, LogoutComponent]
})
export class ApiAuthorizationModule { }
