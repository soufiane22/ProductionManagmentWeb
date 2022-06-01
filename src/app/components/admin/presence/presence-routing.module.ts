import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPresenceComponent } from './list-presence/list-presence.component';

const routes: Routes = [
  {
    path:'',
    component:ListPresenceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresenceRoutingModule { }
