import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SweetAlertService } from 'ngx-sweetalert2';
import { FormGroup, FormArray, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  	selector: 'app-users',
  	templateUrl: './users.component.html',
  	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  	title = 'Users';
	results = [];
	userService: any;
	myForm: FormGroup;

	constructor(
		@Inject(UserService) userService, 
		private _swal2: SweetAlertService, 
		public formBuilder: FormBuilder
	) {
	  	this.userService = userService;
	  	this.getUsers();
	}

	ngOnInit() {
	  	this.results = [];
	  	this.myForm = this.formBuilder.group({
            username: ['', Validators.minLength(5)],
            password: ['', Validators.minLength(5)],
            email: ['', Validators.minLength(5)],
        });
	  	this.getUsers();
	}

	getUsers() {
	  	this.userService.getListUsers()
		  	.map(res => res.json())
		  	.subscribe(results => this.results = results);
	}

	addUser() {
		let data = this.myForm.value;
	  	var result = this.userService.addUser(data)
	    .subscribe(res => {
	    	if(res.success) {
	    		this.getUsers();
	    		this.myForm.reset();
	    		this._swal2.success({ title: 'Create success!' });
	    	}else{
	    		this._swal2.error({ title: 'Error!' });
	    	}
	    });
	}

	deleteUser(event, username){
		this._swal2.swal({
		  	title: 'Are you sure?',
		  	text: "You won't be able to revert this!",
		  	type: 'warning',
		  	showCancelButton: true,
		  	confirmButtonColor: '#3085d6',
		  	cancelButtonColor: '#d33',
		  	confirmButtonText: 'Yes, delete it!'
		}).then(function () {
			var data = {
				username: username,
			};
			this.userService.deleteUser(data)
		    .subscribe(res => {
		    	if(res.success == "true") {
		    		this._swal2.success({ title: 'Delete success!' });
		    		this.getUsers();
		    	}
		    });
		}.bind(this))
	}

}
