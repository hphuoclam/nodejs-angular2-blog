import { Component, Inject, OnInit } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  	selector: 'app-blog-detail',
  	templateUrl: './blog-detail.component.html',
  	styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
	id: number;
  	private sub: any;
    blogsService: any;
    userService: any;
    results = {};
    comments = [];
    users = [];
    data = {
    	comment: '',
        blog_id: 0,
        user_id: '',
    }

  	constructor(
        private route: ActivatedRoute,
        @Inject(BlogsService) blogsService,
        @Inject(UserService) userService
    ) {
        this.blogsService = blogsService;
        this.userService = userService;
    }

  	ngOnInit() {
  		this.sub = this.route.params.subscribe(params => {
	       	this.id = +params['id']; // (+) converts string 'id' to a number
            this.data.blog_id = this.id;
	    });
	    this.getData();
        this.getUsers();
  	}

    getData() {
      	this.blogsService.detail(this.id)
            .map(res => res.json())
            .subscribe(results => {
                this.results = results[0];
            });

        this.blogsService.get_comments(this.id)
          	.map(res => res.json())
          	.subscribe(results => {
    	      	this.comments = results;
          	});
    }

    getUsers() {
        this.userService.getUsers()
            .map(res => res.json())
            .subscribe(results => this.users = results);
    }

    addComment(){
        this.blogsService.add_comments(this.data)
            .subscribe(res => {
                if(res.success == "true") {
                    this.getData();
                }
                this.data.comment = '';
            });
    }

}
