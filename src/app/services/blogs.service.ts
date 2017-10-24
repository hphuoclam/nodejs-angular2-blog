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

	add(data) {
		let headers = new Headers({"Content-Type": "application/json"});
		let options = new RequestOptions({ headers: headers });

		return this.http.post('http://localhost:3000/add', JSON.stringify(data), options)
			.map(res => res.json());
	}

}
