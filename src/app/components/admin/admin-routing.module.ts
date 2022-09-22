import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const routes: Routes = [
  // {
  //   path:'',
  //   redirectTo:'dashboard',
  //   pathMatch:'full'
  // },
  {
    path: '',
    component: NavBarComponent,
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
          roles: ['ROLE_CONTROLER','ROLE_ADMIN']
        }
      },
      {
        path: 'presence',
        loadChildren: () => import('./presence/presence.module').then(m => m.PresenceModule),
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_CONTROLER','ROLE_ADMIN']
        }
      },
      {
        path: 'groups',
        loadChildren: () => import('./group/group.module').then(m => m.GroupModule),
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_ADMIN']
        }
       },
       {
        path: 'accounts',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_ADMIN']
        }
       },
       {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_ADMIN']
        }
       },
       {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_ADMIN']
        }
       },

    
      {path:'',redirectTo:'home',pathMatch:'full'}


    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
