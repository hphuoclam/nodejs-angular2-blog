import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent {

	isLogin: any;
	users: any;

	constructor(
		private router: Router,
		private userService: UserService,
		private authenticationService: AuthenticationService,
	) {
		this.userService.getUsers().subscribe((value) => {
			this.users = value;
		});
		router.events.subscribe(event => {
			if(event instanceof NavigationEnd) {
				this.userService.isLoggedIn().subscribe((value) => {
					this.isLogin = value;
				});
			}
		});
	}

	logout(e){
		e.preventDefault()
		this.authenticationService.logout();
		this.router.navigate(['/']);
	}
}
