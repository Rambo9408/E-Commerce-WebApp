import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  private isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT
      const exp = payload.exp * 1000;
      if (Date.now() > exp) {
        localStorage.clear();
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  private checkRole(expectedRole: string): boolean {
    const userRole = localStorage.getItem('role'); // store role during login
    return userRole === expectedRole;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tokenValid = this.isTokenValid();

    if (!tokenValid) {
      this.router.navigate(['/']);
      return false;
    }

    const expectedRole = route.data['role'];
    if (expectedRole && !this.checkRole(expectedRole)) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
