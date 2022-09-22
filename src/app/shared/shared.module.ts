import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
/****** Primeng Moduls  ************* */
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import  {ToastModule} from  'primeng/toast'
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
/********* ng Bootsrap ******** */
import { NgbActiveModal, NgbModule ,NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    TableModule,
    ButtonModule,
    RadioButtonModule,
    ToastModule,
    MultiSelectModule,
    ConfirmDialogModule,
    DialogModule,
    NgbModule,
    CardModule,
    NgbNavModule,
  
   
  ],
  exports: [
    ToastModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
    ConfirmDialogModule,
    DialogModule,
    NgbModule,
    CardModule,
    NgbNavModule

  ]
})
export class SharedModule { }
