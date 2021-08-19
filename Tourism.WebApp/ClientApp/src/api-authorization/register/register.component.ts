import { IErrorHandler } from './../../app/types/error';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { SYSTEM_CONTENT } from 'src/content.const';
import { AuthenticationService } from '../authorize.service';


function passwordMatchValidator(g: FormGroup) {
  const result = g.get('password').value === g.get('repeatPassword').value
     ? null : {'mismatch': true};

     g.get('repeatPassword').setErrors(result);
     console.log(result);
     return result;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  SYSTEM_CONTENT = SYSTEM_CONTENT;

  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
    ) { 
      if (this.authenticationService.userValue) {
        this.router.navigate(['/']);
      }
  
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
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
    this.authenticationService.register(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (message: string) => {
          this.error = message;
          this.loading = false;
        }
      });
  }
}
