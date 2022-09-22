import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PresenceRoutingModule } from './presence-routing.module';
import { ListPresenceComponent } from './list-presence/list-presence.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

/****** Primeng Moduls  ************* */
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import  {ToastModule} from  'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ListPresenceComponent
  ],
  imports: [
    CommonModule,
    PresenceRoutingModule,
    FormsModule,
    NgbModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    SharedModule
  ]
})
export class PresenceModule { }
