import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';
import { AuthGuard } from './guard/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'admin',
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
    canActivate:[AuthGuard],
    data:{
      roles:['ROLE_CONTROLER','ROLE_ADMIN']
    }
  },
  {
    path:'**',
    component:NotFoundComponent
  },
  {
    path:'forbidden',
    component:ForbiddenComponent
  },
 

];

@NgModule({
  imports: [ RouterModule.forRoot(routes , {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
