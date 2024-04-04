import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  providers: [AuthenticationService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }
    if (
      this.signUpForm.value.password !== this.signUpForm.value.confirmPassword
    ) {
      return;
    }
    this.submitted = true;
    console.log(this.signUpForm.value);
    this.authenticationService
      .userSignup(this.signUpForm.value)
      .subscribe((data) => {
        console.log(data);
        if (data.success) {
          this.signUpForm.reset();
          localStorage.setItem('access_token', data.token);
          localStorage.setItem('refresh_token', data.refreshToken);
          this.router.navigate(['contact-form']);
        }
      });
  }
}
