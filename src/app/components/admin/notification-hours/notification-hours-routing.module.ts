import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNotificationHoursComponent } from './list-notification-hours/list-notification-hours.component';

const routes: Routes = [
  {
    path:'',
    component:ListNotificationHoursComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationHoursRoutingModule { }
