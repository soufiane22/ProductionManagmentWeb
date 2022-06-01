import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresenceRoutingModule } from './presence-routing.module';
import { ListPresenceComponent } from './list-presence/list-presence.component';


@NgModule({
  declarations: [
    ListPresenceComponent
  ],
  imports: [
    CommonModule,
    PresenceRoutingModule
  ]
})
export class PresenceModule { }
