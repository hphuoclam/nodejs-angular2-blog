import { Component, OnInit, Input  } from '@angular/core';
import { SweetAlertService } from 'ngx-sweetalert2';

@Component({
  	selector: 'app-comments',
  	templateUrl: './comments.component.html',
  	styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
	@Input('commentData') data: any;

  	constructor(
  		private _swal2: SweetAlertService,
  	) {

  	}

  	ngOnInit() {

  	}	

  	deleteClick(e){
  		e.preventDefault();
  		this._swal2.success({ title: 'Delete Click!' });
        console.log('ok');
  	}

  	replyClick(e){
  		e.preventDefault();
  		this._swal2.success({ title: 'Reply Click!' });
        console.log('ok');
  	}
}
