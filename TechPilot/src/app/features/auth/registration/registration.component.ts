import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
// import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required, Validators.minLength(6)]]
     
    });
  }

  onSubmit(): void {
  if (this.registerForm.invalid) return;

  const success = this.authService.signup(this.registerForm.value);

  if (success) {
    alert('Registration successful! You can now log in.');
  } else {
    alert('Username already exists!');
  }
}
}