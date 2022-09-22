import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptor } from './guard/auth.interceptor';
import { AuthService } from './shared/services/auth.service';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';

/************* primeNg   *******************/
import {StepsModule} from 'primeng/steps';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
/************* Fontawesom ****************/
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HashLocationStrategy ,LocationStrategy } from '@angular/common';
import { CalloutDirectiveDirective } from './callout-directive.directive';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContentLayoutComponent,
    ForbiddenComponent,
    NotFoundComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    StepsModule,
    RadioButtonModule,
    ButtonModule,
    CardModule,
    InputTextModule,

    
    
  ],
  providers: [ AuthGuard ,{provide:LocationStrategy , useClass :HashLocationStrategy},
  
     { provide: HTTP_INTERCEPTORS,
       useClass:AuthInterceptor,
       multi:true
      },
  
       AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
