import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.setting';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router) { }

  	canActivate(){
    	// next: ActivatedRouteSnapshot,
    	// state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    	// return true;
    	if (localStorage.getItem(AppSettings.COOKIE_USERS)) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
  	}
}
