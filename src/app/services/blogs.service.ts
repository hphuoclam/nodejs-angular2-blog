import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BlogsService {

	http: any;

	constructor(@Inject(Http) http) {
		this.http = http;
	}

	get() {
		return this.http.get('http://localhost:3000/api/blogs');
	}

	detail(id) {
		return this.http.get('http://localhost:3000/api/blogs/' + id);
	}

	get_comments(id) {
		return this.http.get('http://localhost:3000/api/comment/' + id);
	}

	add_comments(data) {
        let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });

		return this.http.post('http://localhost:3000/api/comment/add', JSON.stringify(data), options)
			.map(res => res.json());
	}

	add(data, file) {
		let formData:FormData = new FormData();
        formData.append('image_title', file);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('short', data.short);
        formData.append('user_id', data.user_id);
        let headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/api/blogs/add', formData, options)
            .map(res => res.json())
	}

}
