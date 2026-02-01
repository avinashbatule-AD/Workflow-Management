import { Component } from '@angular/core';
import { AuthService, User } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Welcome, {{user?.username}}</h2>
    <p>Role: {{user?.role}}</p>
    <button (click)="logout()">Logout</button>
  `
})
export class DashboardComponent {
  user: User | null;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getCurrentUser();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
