import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogsNewComponent } from './components/blogs/blogs-new/blogs-new.component';
import { UsersComponent } from './components/users/users.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { BlogDetailComponent } from './components/blogs/blog-detail/blog-detail.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full'
	},
	{
		path: 'blogs',
		children: [
	      	{path: '', component: BlogsComponent}, 
	      	{path: 'add-new', component: BlogsNewComponent},
	      	{path: ':id', component: BlogDetailComponent},
	    ]
	},
	{
		path: 'users',
		component: UsersComponent,
	},
	{
		path: 'error',
		component: NotFoundComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{ 
		path: '**',
		redirectTo: '/error'
	}
];

export const routing = RouterModule.forRoot(routes);