import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['User', Validators.required]  // Admin/Manager/User
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    this.authService.register(this.registerForm.value).subscribe({
      next: res => alert('Registration successful! You can now log in.'),
      error: err => alert('Registration failed!')
    });
  }
}




