import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentsRoutingModule } from './equipments-routing.module';
import { EquipmentsComponent } from './equipments.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { WelcomeModule } from '../welcome/welcome.module';


@NgModule({
  declarations: [
    EquipmentsComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    EquipmentsRoutingModule,
    WelcomeModule
  ]
})
export class EquipmentsModule { }
