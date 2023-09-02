import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | void> {
    return new Promise(async (resolve) => {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['authentication']);
        resolve(false);
      }
      resolve(true);
    });
  }
}
