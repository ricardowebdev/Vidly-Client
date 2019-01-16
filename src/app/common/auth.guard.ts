import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private service: AuthService,
                private router: Router) { }

    canActivate(route, state: RouterStateSnapshot) {
        if (!this.service.isLogged()) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
            return false;
        }

        return true;
    }
}
