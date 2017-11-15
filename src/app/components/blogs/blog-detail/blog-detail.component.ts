import { Component, Inject, OnInit } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';

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
    users = {};
    data = {
    	comment: '',
        blog_id: 0,
        user_id: '',
    }

  	constructor(
        private route: ActivatedRoute,
        private _swal2: SweetAlertService,
        @Inject(BlogsService) blogsService,
        @Inject(UserService) userService,
    ) {
        this.blogsService = blogsService;
        this.userService = userService;
        this.userService.getUsers().subscribe((value) => {
            this.users = value;
            this.data.user_id = value.id;
        });
    }

  	ngOnInit() {
  		this.sub = this.route.params.subscribe(params => {
	       	this.id = +params['id']; // (+) converts string 'id' to a number
            this.data.blog_id = this.id;
	    });
	    this.getData();
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

    likeClick(e){
        e.preventDefault();
        this._swal2.success({ title: 'Like Click!' });
    }

    addComment(){
        this.blogsService.add_comments(this.data)
            .subscribe(res => {
                if(res.success) {
                    this.getData();
                }
                this.data.comment = '';
            });
    }

}
