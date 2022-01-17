import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedOutGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authService.validate().subscribe({
      next: (v) => {
        if (v.message === 'authorized') {
          this.router.navigateByUrl('dashboard');
          console.log('AUTORIZADO');
          return true;
        } else {
          console.log('NO AUTORIZADO');
          return false;
        }
      },
      error: (err) => {
        return false;
      },
    });
    return true;
  }
}
