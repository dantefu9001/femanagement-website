import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentsRoutingModule } from './equipments-routing.module';
import { EquipmentsComponent } from './equipments.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { WelcomeModule } from '../welcome/welcome.module';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EquipmentsComponent,
    EquipmentSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzFormModule,
    EquipmentsRoutingModule,
    WelcomeModule
  ]
})
export class EquipmentsModule { }
