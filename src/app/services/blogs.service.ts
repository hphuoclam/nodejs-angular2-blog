import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppSettings } from '../app.setting';

@Injectable()
export class BlogsService {

	http: any;

	constructor(@Inject(Http) http) {
		this.http = http;
	}

	get() {
		return this.http.get(AppSettings.HOST_SERVER + 'api/blogs');
	}

	detail(id) {
		return this.http.get(AppSettings.HOST_SERVER + 'api/blogs/' + id);
	}

	get_comments(id) {
		return this.http.get(AppSettings.HOST_SERVER + 'api/comment/' + id);
	}

	add_comments(data) {
        let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.HOST_SERVER + 'api/comment/add', JSON.stringify(data), options)
			.map(res => res.json());
	}

	delete_comments(data) {
        let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.HOST_SERVER + 'api/comment/delete', JSON.stringify(data), options)
			.map(res => res.json());
	}

	add(data) {
        let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.HOST_SERVER + 'api/blogs/add', JSON.stringify(data), options)
			.map(res => res.json());
	}

	like(data) {
        let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });

		return this.http.post(AppSettings.HOST_SERVER + 'api/blogs/like', JSON.stringify(data), options)
			.map(res => res.json());
	}

	// add(data, file) {
	// 	let formData:FormData = new FormData();
 //        formData.append('image_title', file);
 //        formData.append('name', data.name);
 //        formData.append('description', data.description);
 //        formData.append('short', data.short);
 //        formData.append('user_id', data.user_id);
 //        let headers = new Headers();
 //        * No need to include Content-Type in Angular 4 
 //        headers.append('Content-Type', 'multipart/form-data');
 //        headers.append('Accept', 'application/json');
 //        let options = new RequestOptions({ headers: headers });
 //        return this.http.post(AppSettings.HOST_SERVER + 'api/blogs/add', formData, options)
 //            .map(res => res.json())
	// }

}
