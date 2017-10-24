import { Component, Inject, OnInit } from '@angular/core';
import { BlogsService } from '../../../services/blogs.service';
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
    results = {};
    data = {
    	comment: '',
    }

  	constructor(
          private route: ActivatedRoute,
          @Inject(BlogsService) blogsService,
    ) {
        this.blogsService = blogsService;
    }

  	ngOnInit() {
  		this.sub = this.route.params.subscribe(params => {
	       	this.id = +params['id']; // (+) converts string 'id' to a number
	    });
	    this.getData();
  	}

    getData() {
      	this.blogsService.detail(this.id)
      	.map(res => res.json())
      	.subscribe(results => {
	      	this.results = results[0]
      	});
    }

    addComment(){
    	console.log(this.data);
    }

}
