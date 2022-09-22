import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUsersComponent } from './list-users/list-users.component';

const routes: Routes = [
  {
    path:'',
    component:ListUsersComponent
  },
  {
    path:"add",
    component: AddUserComponent
  },
  {
    path:"add/:id",
    component: AddUserComponent
  },
  {
    path:'list',
    component:ListUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
