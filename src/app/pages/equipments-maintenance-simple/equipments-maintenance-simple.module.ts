import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentsMaintenanceSimpleRoutingModule } from './equipments-maintenance-simple-routing.module';
import { EquipmentsMaintenanceRecordComponent } from './equipments-maintenance-record/equipments-maintenance-record.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzGridModule} from "ng-zorro-antd/grid";
import {ReactiveFormsModule} from "@angular/forms";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import { EquipmentMaintenanceRecordEditComponent } from './equipment-maintenance-record-edit/equipment-maintenance-record-edit.component';
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
  declarations: [
    EquipmentsMaintenanceRecordComponent,
    EquipmentMaintenanceRecordEditComponent
  ],
  imports: [
    CommonModule,
    EquipmentsMaintenanceSimpleRoutingModule,
    NzTableModule,
    NzGridModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzModalModule
  ]
})
export class EquipmentsMaintenanceSimpleModule { }
