// import { Injectable } from "@angular/core";

// @Injectable({ providedIn: 'root' })
// export class AuthService {

//   private roles: Record<string, string> = { 
//     admin: 'Admin', 
//     manager: 'Manager', 
//     user: 'User' 
//   };

//   login(username: string, password: string): boolean {
//     if (this.roles[username]) { 
//       localStorage.setItem('token', 'mock-token');
//       localStorage.setItem('role', this.roles[username]);
//       return true;
//     }
//     return false;
//   }

//   logout() { 
//     localStorage.clear(); 
//   }

//   isLoggedIn(): boolean { 
//     return !!localStorage.getItem('token'); 
//   }

//   getRole(): string { 
//     return localStorage.getItem('role')!; 
//   }
// }
