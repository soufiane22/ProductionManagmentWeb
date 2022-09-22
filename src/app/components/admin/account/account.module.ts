import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListAccountsComponent } from './list-accounts/list-accounts.component';
import { AddAccountComponent } from './add-account/add-account.component'; 


@NgModule({
  declarations: [
    ListAccountsComponent,
    AddAccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
