import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface AuthResponse {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://your-api-url.com/auth';  // Replace with your API URL
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
      this.userRoleSubject.next(localStorage.getItem('role'));
    }
  }
register(userData: { username: string; email: string; password: string; role: string }) {
  // Mocked registration API call
  return new Observable(observer => {
    console.log('User registered:', userData);
    setTimeout(() => {
      observer.next({ success: true });
      observer.complete();
    }, 500);
  });

  // For real API:
  // return this.http.post(`${this.authUrl}/register`, userData);
}

  login(username: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, { username, password }).pipe(  // Use AuthResponse interface here
      tap(response => {
        localStorage.setItem('token', response.token);  // Now TypeScript knows token is a string
        localStorage.setItem('role', response.role);    // And role is a string
        this.isAuthenticatedSubject.next(true);
        this.userRoleSubject.next(response.role);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getRole(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }
}
