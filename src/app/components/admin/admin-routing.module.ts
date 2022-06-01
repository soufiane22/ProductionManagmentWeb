import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // {
  //   path:'',
  //   redirectTo:'dashboard',
  //   pathMatch:'full'
  // },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'notification-hours',
        loadChildren: () => import('./notification-hours/notification-hours.module').then(m => m.NotificationHoursModule),
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_CONTROLER'
        }
      },
      {
        path: 'presence',
        loadChildren: () => import('./presence/presence.module').then(m => m.PresenceModule),
        canActivate: [AuthGuard],
        data: {
          role: 'ROLE_CONTROLER'
        }
      },
      {path:'',redirectTo:'admin/home',pathMatch:'full'}


    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
