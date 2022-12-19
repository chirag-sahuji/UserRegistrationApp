import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { ReviewsAddComponent } from './reviews-add/reviews-add.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'user-home',
    component:UserHomeComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/add',
    component: UserAddComponent
  },
  {
    path: 'users/add/:id',
    component: UserAddComponent
  },
  {
    path: 'review',
    component:ReviewsListComponent
  },
  {
    path: 'review/add',
    component:ReviewsAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
