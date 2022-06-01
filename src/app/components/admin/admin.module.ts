import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NotificationHoursModule } from './notification-hours/notification-hours.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    NavBarComponent,
    DashboardComponent,
    HomeComponent
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NotificationHoursModule,
    SharedModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,

    
  ]
})
export class AdminModule { }
