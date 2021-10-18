import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/api-authorization/authorize.service';
import { SYSTEM_CONTENT } from 'src/content.const';

function passwordMatchValidator(g: FormGroup) {
  const result = g.get('password').value === g.get('repeatPassword').value
     ? null : {'mismatch': true};

     g.get('repeatPassword').setErrors(result);
     return result;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  SYSTEM_CONTENT = SYSTEM_CONTENT;

  constructor( private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
    ) { 
     
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      curpassword: ['',  [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}')
       ]],
      password: ['',  [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,15}')
       ]],
      repeatPassword: ['', [Validators.required]]
    }, {
      validator:  passwordMatchValidator
    });
  }



   // convenience getter for easy access to form fields
   get f() { return this.registerForm.controls; }

   onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.changePassword(this.f.password.value)
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          alert('Пароль успішно змінено')
        },
        error: (message: string) => {
          this.error = message;
          this.loading = false;
        }
      });
  }

}
