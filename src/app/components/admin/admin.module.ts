import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NotificationHoursModule } from './notification-hours/notification-hours.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
/****** Primeng Moduls  ************* */
import {TableModule} from 'primeng/table';
import {RadioButtonModule} from 'primeng/radiobutton';

/************* Fontawesom ****************/
import { FontAwesomeModule ,FaIconLibrary} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { CountToModule } from 'angular-count-to';
// import { ChartistModule } from 'ng-chartist';
import {ChartModule} from 'primeng/chart';
import { CalloutDirectiveDirective } from 'src/app/callout-directive.directive';


@NgModule({
  declarations: [
    NavBarComponent,
    DashboardComponent,
    HomeComponent,
    CalloutDirectiveDirective
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NotificationHoursModule,
    SharedModule,
    TableModule,
    FontAwesomeModule,
    CountToModule.forRoot(),
    ChartModule
    
    
  ]
})
export class AdminModule {
  constructor(library:FaIconLibrary) {
    library.addIconPacks(fas,far);
  }

 }
