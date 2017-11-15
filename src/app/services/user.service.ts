import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  	http: any;
  	headers: any;
	options: any;

	constructor(
		@Inject(Http) http,
		private authenticationService: AuthenticationService
	) {
		this.http = http;
		this.headers = new Headers({"Content-Type": "application/json"});
		this.options = new RequestOptions({ headers: this.headers });
	}

	getListUsers() {
		return this.http.get('http://localhost:3000/');
	}

	addUser(data) {
		return this.http.post('http://localhost:3000/adduser', JSON.stringify(data), this.options)
			.map(res => res.json());
	}

	deleteUser(data) {
		return this.http.post('http://localhost:3000/deleteuser', JSON.stringify(data), this.options)
			.map(res => res.json());
	}

    getUsers(): Observable<any> {
        return  this.authenticationService.currentUser.asObservable();
    }

    isLoggedIn() : Observable<boolean> {
        return this.authenticationService.isLogin.asObservable();
    }


}
