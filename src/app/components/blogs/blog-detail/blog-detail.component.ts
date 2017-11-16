import { Component, Inject, OnInit } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { Router } from '@angular/router';

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
    disable_like: boolean = false;
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
        private router: Router,
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
        this.getDataDetail();
	    this.getDataComment();
  	}

    getDataDetail() {
      	this.blogsService.detail(this.id)
            .map(res => res.json())
            .subscribe(results => {
                this.results = results[0];
            });
    }

    getDataComment() {
        this.blogsService.get_comments(this.id)
            .map(res => res.json())
            .subscribe(results => {
                this.comments = results;
            });
    }

    likeClick(e){
        e.preventDefault();
        this.blogsService.like({id: this.id})
            .subscribe(results => {
                if(results.success){
                    this._swal2.success({ title: 'Thank you!' });
                    this.results['like'] += 1;
                    this.disable_like = true;
                }
            });
    }

    addComment(data){
        console.log(data)
        // if(!data.user_id){
        //     this._swal2.warning({ title: 'Please login!' }).then(()=>{
        //         this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});
        //     });
        //     return false;
        // }
        // this.blogsService.add_comments(data)
        //     .subscribe(res => {
        //         if(res.success) {
        //             this.getDataComment();
        //         }
        //         this.data.comment = '';
        //     });
    }

}
