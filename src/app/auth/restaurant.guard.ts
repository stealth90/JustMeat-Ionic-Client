import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // tslint:disable-next-line: variable-name
  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.checkAdmin() || this.authService.isRestaurant()) {
        this.router.navigate(['restaurants/tabs/orders'], { queryParams: { returnUrl: state.url }});
        return false;
    } else {
        return true;
    }
  }
}
