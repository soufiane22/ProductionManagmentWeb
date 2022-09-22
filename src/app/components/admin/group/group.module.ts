import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListGroupsComponent,
    AddGroupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    SharedModule,
    SharedModule
  ]
})
export class GroupModule { }
