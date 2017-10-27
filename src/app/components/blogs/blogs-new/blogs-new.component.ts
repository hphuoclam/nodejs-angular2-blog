import { Component, Inject, OnInit } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
import { UserService } from '../../../services/user.service';
import { SweetAlertService } from 'ngx-sweetalert2';


@Component({
  	selector: 'app-blogs-new',
  	templateUrl: './blogs-new.component.html',
  	styleUrls: ['./blogs-new.component.css']
})
export class BlogsNewComponent implements OnInit {

	title = 'Add New Blogs';
	results = [];
	blogsService: any;
	userService: any;
	users = [];
	data: any = {
		name: '',
		description: '',
		short: '',
		user_id: ''
	};
	image_title: FileList;

	constructor(
		@Inject(BlogsService) blogsService, 
		@Inject(UserService) userService,
		private _swal2: SweetAlertService,
	) {
	  	this.blogsService = blogsService;
	  	this.userService = userService;
	  	this.getUsers();
	}

	ngOnInit() {
	  this.results = [];
	}

	getUsers() {
	  	this.userService.getUsers()
	  	.map(res => res.json())
	  	.subscribe(results => this.users = results);
	}

	fileChange(event) {
	    let file = event.target.files;
	    if(file.length > 0){
	    	this.image_title = event.target.files[0];
	    }
	}

	addBlogs() {
		console.log(this.data)
		console.log(this.image_title)
	  	var result = this.blogsService.add(this.data, this.image_title)
		    .subscribe(res => {
		    	console.log(res);
		   //  	if(res.success == "true") {
		   //  		this._swal2.success({ title: 'Create success!' });
		   //  		this.data = {
					// 	name: '',
					// 	description: '',
					// 	short: '',
					// 	user_id: '',
					// };
		   //  	}
		    });
	}

}
