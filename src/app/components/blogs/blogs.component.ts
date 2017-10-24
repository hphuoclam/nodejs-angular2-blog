import { Component, Inject, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { UserService } from '../../services/user.service';

@Component({
  	selector: 'app-blogs',
  	templateUrl: './blogs.component.html',
  	styleUrls: ['./blogs.component.css']
})


export class BlogsComponent implements OnInit {

  	title = 'Blogs';
	results = [];
	blogsService: any;
	userService: any;
	users = [];
	data: any = {
		name: '',
		description: '',
		users_id: '',
	};

	constructor(@Inject(BlogsService) blogsService, @Inject(UserService) userService) {
	  this.blogsService = blogsService;
	  this.userService = userService;
	  this.getData();
	  this.getUsers();
	}

	ngOnInit() {
	  this.results = [];
	  this.getData();
	}

	getData() {
	  this.blogsService.get()
	  .map(res => res.json())
	  .subscribe(results => this.results = results);
	}

	getUsers() {
	  	this.userService.getUsers()
	  	.map(res => res.json())
	  	.subscribe(results => this.users = results);
	}


	addBlogs() {
		console.log(this.data)
	  	var result = this.blogsService.add(this.data)
		    .subscribe(res => {
		    	if(res.success == "true") {
		    		this.getData();
		    	}
		      	this.data = {
					name: '',
					description: '',
					users_id: '',
				};
		    });
	}

}
