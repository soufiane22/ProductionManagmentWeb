import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationHoursRoutingModule } from './notification-hours-routing.module';
import { ListNotificationHoursComponent } from './list-notification-hours/list-notification-hours.component';
import { SharedModule } from 'src/app/shared/shared.module';

/****** Primeng Moduls  ************* */
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import  {ToastModule} from  'primeng/toast'
import {DropdownModule} from 'primeng/dropdown';
/************* Fontawesom ****************/
import { FontAwesomeModule ,FaIconLibrary} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

/*************ng-bootstrap ************** */
import { NgbActiveModal, NgbModule,NgbNavModule   } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ListNotificationHoursComponent
  ],
  imports: [
    CommonModule,
    NotificationHoursRoutingModule,
    SharedModule,
    TableModule,
    FontAwesomeModule,
    ButtonModule,
    InputTextModule,
    NgbModule,
    FormsModule,
    ToastModule,
    DropdownModule,
    NgbNavModule

  ],
  providers: [
    NgbActiveModal
  ]
})
export class NotificationHoursModule { 

}
