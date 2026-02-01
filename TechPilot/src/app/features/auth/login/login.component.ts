
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSignup = false;
  error = '';
  rolesList = ['admin', 'manager', 'user'];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildLoginForm();
  }

  private buildLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private buildSignupForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  toggleMode() {
    this.error = '';
    this.isSignup = !this.isSignup;
    this.isSignup ? this.buildSignupForm() : this.buildLoginForm();
  }

//   onSubmit() {
//     if (this.loginForm.invalid) {
//       this.loginForm.markAllAsTouched();
//       return;
//     }

//     if (this.isSignup) {
//       const { username, email, password, confirmPassword, role } = this.loginForm.value;

//       if (password !== confirmPassword) {
//         this.error = 'Passwords do not match';
//         return;
//       }

//       const user: User = { username, email, password, role };
//       const success = this.auth.signup(user);

//       if (success) {
//         alert('Signup successful! Redirecting to dashboard...');
//         this.router.navigate(['/login']);
//       } else {
//         this.error = 'Username already exists';
//       }

//     } else {
//       const { username, password } = this.loginForm.value;
//       const success = this.auth.login(username, password);

//       if (success) {
//         alert('Login successful! Redirecting to dashboard...');
//         this.router.navigate(['/dashboard']);
//       } else {
//         this.error = 'Invalid username or password';
//       }
//     }
//   }
onSubmit() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  if (this.isSignup) {
    const { username, email, password, confirmPassword, role } = this.loginForm.value;

    if (password !== confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    const success = this.auth.signup({ username, email, password, role });
    if (success) {
      alert('Signup successful! Redirecting to login...');
      this.router.navigate(['/auth/login']);
    } else {
      this.error = 'Username already exists';
    }

  } else {
    const { username, password } = this.loginForm.value;
    const success = this.auth.login(username, password);

    if (success) {
      alert('Login successful! Redirecting to dashboard...');
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid username or password';
    }
  }
}

}
