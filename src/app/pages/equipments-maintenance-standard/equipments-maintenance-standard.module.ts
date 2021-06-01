import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentsMaintenanceStandardRoutingModule } from './equipments-maintenance-standard-routing.module';
import { EquipmentsMaintenanceRecordStandardComponent } from './equipments-maintenance-record-standard/equipments-maintenance-record-standard.component';
import {EquipmentsMaintenanceSimpleModule} from "../equipments-maintenance-simple/equipments-maintenance-simple.module";


@NgModule({
  declarations: [
    EquipmentsMaintenanceRecordStandardComponent
  ],
  imports: [
    CommonModule,
    EquipmentsMaintenanceStandardRoutingModule,
    EquipmentsMaintenanceSimpleModule
  ]
})
export class EquipmentsMaintenanceStandardModule { }
