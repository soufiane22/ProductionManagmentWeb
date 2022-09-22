import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAccountComponent } from './add-account/add-account.component';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';

const routes: Routes = [
  {
    path:'',
    component:ListAccountsComponent,
  },
  {
    path:"add",
    component: AddAccountComponent
  },
  {
    path:'list',
    component:ListAccountsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
