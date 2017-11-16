import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SweetAlertService } from 'ngx-sweetalert2';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	title = 'Login';
	results = [];
	userService: any;
	users = [];
	data: any = {
		username: '',
		password: '',
	};
	error = '';

	constructor(
		@Inject(UserService) userService,
		private authenticationService: AuthenticationService,
		private router: Router,
		private _swal2: SweetAlertService,
	) {
		if (localStorage.getItem('currentUser')) {
         	this.router.navigate(['/']);   
        }
	  	this.userService = userService;
	}

	ngOnInit() {
	  this.results = [];
	}

	login() {
		this.authenticationService.login(this.data.username, this.data.password)
        .subscribe(result => {
            if (result === true) {
            	let returnUrl = this.router['currentUrlTree']['queryParams']['returnUrl'] ? this.router['currentUrlTree']['queryParams']['returnUrl'] : '/';
                this.router.navigate([returnUrl]);
            } else {
                this.error = 'Username or password is incorrect';
            }
        });
	}
}
