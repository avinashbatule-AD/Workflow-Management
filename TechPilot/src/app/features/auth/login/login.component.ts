import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
}

  onSubmit() {
    const { username, password } = this.loginForm.value;
    if (this.auth.login(username, password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
