import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SweetAlertService } from 'ngx-sweetalert2';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	title = 'Signup';
	results = [];
	userService: any;
	users = [];
	data: any = {
		username: '',
		email: '',
		first_name: '',
		last_name: '',
		info: '',
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

	signup() {
		this.userService.addUser(this.data)
	    .subscribe(res => {
	    	if(res.success) {
	    		this.router.navigate(['/login']);
	    		// this._swal2.success({ title: 'Create success!' });
	    	}else{
	    		this._swal2.error({ title: 'Error!' });
	    	}
	    });
	}

}
