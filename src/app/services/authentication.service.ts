import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import { AppSettings } from '../app.setting';


@Injectable()
export class AuthenticationService {
    public token: string;
    public isLogin = new BehaviorSubject<boolean>(this.hasToken());
    public currentUser = new BehaviorSubject<any>(this.get_cookie());

  	headers: any;
	options: any;

    constructor(private http: Http) {
    	this.http = http;
		this.headers = new Headers({"Content-Type": "application/json"});
		this.options = new RequestOptions({ headers: this.headers });
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('http://localhost:3000/login', JSON.stringify({ username: username, password: password }), this.options)
            .map((response: Response) => {
            	let res = response.json();
            	if(!res){
            		return false;
            	}else{
                    if(!res.success){
                        return false;
                    }
            		// login successful if there's a jwt token in the response
	                let token = res && res.user.token;
	                if (token) {
	                    // set token property
	                    this.token = token;

	                    // store username and jwt token in local storage to keep user logged in between page refreshes
	                    this.set_cookie(res.user);
	                    this.isLogin.next(true);
                    	this.currentUser.next(res.user);

	                    // return true to indicate successful login
	                    return true;
	                } else {
	                    // return false to indicate failed login
	                    return false;
	                }
            	}
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.remove_cookie();
        this.isLogin.next(false);
        this.currentUser.next(this.get_cookie());
    }

    set_cookie(data : any){
    	// store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(AppSettings.COOKIE_USERS, JSON.stringify(data));
        this.currentUser.next(this.get_cookie());
    }

    get_cookie(){
        return JSON.parse(localStorage.getItem(AppSettings.COOKIE_USERS)) || {};
    }

    remove_cookie(){
        localStorage.removeItem(AppSettings.COOKIE_USERS);
    }


    private hasToken() : boolean {
        return !!localStorage.getItem(AppSettings.COOKIE_USERS);
    }
}