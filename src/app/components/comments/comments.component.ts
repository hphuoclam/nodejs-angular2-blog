import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { SweetAlertService } from 'ngx-sweetalert2';
import { UserService } from '../../services/user.service';
import { BlogsService } from '../../services/blogs.service';

@Component({
  	selector: 'app-comments',
  	templateUrl: './comments.component.html',
  	styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
	@Input('commentData') data: any;
    @Output() getDataComment: EventEmitter<any> = new EventEmitter();
    @Output() addComment: EventEmitter<any> = new EventEmitter();

    users: any;
    showComment: boolean = false;
    commentData: any = {
        comment: '',
        blog_id: 0,
        user_id: 0,
        parent_comment: 0,
    };

  	constructor(
  		private _swal2: SweetAlertService,
        private userService: UserService,
        private blogsService: BlogsService,
  	) {
        this.userService.getUsers().subscribe((value) => {
            this.users = value;
            this.commentData.user_id = value.id;
        });
  	}

  	ngOnInit() {
        this.commentData.blog_id = this.data.blog_id;
        this.commentData.parent_comment = this.data.id;
  	}	

  	deleteClick(e){
  		e.preventDefault();
        this._swal2.swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            this.blogsService.delete_comments({id: this.data.id})
                .subscribe(res => {
                    if(res.success) {
                        this._swal2.success({ title: 'Delete success!' });
                        this.getDataComment.emit();
                    }
                });
        }.bind(this))
  	}

  	replyClick(e){
  		e.preventDefault();
        this.showComment = !this.showComment
  		// this._swal2.success({ title: 'Reply Click!' });
    //     console.log('ok');
  	}

    addReplyComment(){
        this.addComment.emit(this.commentData);
    }
}
