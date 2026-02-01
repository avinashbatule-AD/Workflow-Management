
import { Injectable } from '@angular/core';

export interface User {
  username: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private localStorageKey = 'users';
  private currentUserKey = 'currentUser';

  constructor() {}

  // Signup: save user to localStorage
  signup(user: User): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');

    // Check if username already exists
    if (users.find(u => u.username === user.username)) {
      return false; // username taken
    }

    users.push(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    localStorage.setItem(this.currentUserKey, JSON.stringify(user)); // auto-login after signup
    return true;
  }

  // Login: check username/password
  login(username: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem(this.currentUserKey) !== null;
  }

  // Get current logged-in user
  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem(this.currentUserKey) || 'null');
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  // Get current user role
  getRole(): string | null {
    const user = this.getCurrentUser();
    return user?.role || null;
  }
}



 
