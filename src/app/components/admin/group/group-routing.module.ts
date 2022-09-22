import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupComponent } from './add-group/add-group.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';

const routes: Routes = [
  {
    path:'',
    component:ListGroupsComponent,
  },
  {
    path:"add",
    component: AddGroupComponent
  },
  {
    path:"add/:id",
    component: AddGroupComponent
  },
  {
    path:"vue/:id/:mode",
    component: AddGroupComponent
  },
  {
    path:'list',
    component:ListGroupsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
