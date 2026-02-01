import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles']; // roles allowed for this route
    const userRole = this.auth.getRole();

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (expectedRoles && !expectedRoles.includes(userRole!)) {
      alert('You do not have permission to access this page');
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
