import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
	selector: "home",
	templateUrl: "home.component.html",
})

export class HomeComponent implements OnInit {

	title = 'NodeJs + Angular 4 + MySql';

	constructor() {
	}

	ngOnInit() {
	  
	}
	
}