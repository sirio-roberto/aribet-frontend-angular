import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { CreateBetComponent } from './create-bet/create-bet.component';
import { ViewBetComponent } from './view-bet/view-bet.component';
import { BetListComponent } from './bet-list/bet-list.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
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
  {
    path: 'bets/create',
    component: CreateBetComponent,
    title: 'Create bet',
  },
  {
    path: 'bets/view',
    component: ViewBetComponent,
    title: "Today's bet",
  },
  {
    path: 'today/result',
    component: BetListComponent,
    title: "Today's result",
  },
];

export default routeConfig;
