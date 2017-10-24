import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertService } from 'ngx-sweetalert2';
import {CKEditorModule} from 'ng2-ckeditor';
import { routing } from './app.routes';

import { UserService } from './services/user.service';
import { BlogsService } from './services/blogs.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { UsersComponent } from './components/users/users.component';
import { BlogsNewComponent } from './components/blogs/blogs-new/blogs-new.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { BlogDetailComponent } from './components/blogs/blog-detail/blog-detail.component';


import 'rxjs/add/operator/map';
import 'rxjs/Observable';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        BlogsComponent,
        BlogsNewComponent,
        UsersComponent,
        NotFoundComponent,
        LoginComponent,
        BlogDetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        NgbModule.forRoot(),
        ReactiveFormsModule,
        CKEditorModule
    ],
    providers: [
        UserService, 
        BlogsService,
        SweetAlertService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
