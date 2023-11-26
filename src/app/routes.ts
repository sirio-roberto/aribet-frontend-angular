import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
  },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'Sign in',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Sign up',
  },
];

export default routeConfig;
