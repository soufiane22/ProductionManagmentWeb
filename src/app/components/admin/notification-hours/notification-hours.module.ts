import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationHoursRoutingModule } from './notification-hours-routing.module';
import { ListNotificationHoursComponent } from './list-notification-hours/list-notification-hours.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListNotificationHoursComponent
  ],
  imports: [
    CommonModule,
    NotificationHoursRoutingModule,
    SharedModule
  ]
})
export class NotificationHoursModule { }
