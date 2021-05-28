import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EquipmentsMaintenanceSimpleRoutingModule} from './equipments-maintenance-simple-routing.module';
import {EquipmentsMaintenanceRecordComponent} from './equipments-maintenance-record/equipments-maintenance-record.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzGridModule} from "ng-zorro-antd/grid";
import {ReactiveFormsModule} from "@angular/forms";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {EquipmentMaintenanceRecordEditComponent} from './equipments-maintenance-record/equipment-maintenance-record-edit/equipment-maintenance-record-edit.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {EquipmentsMaintenanceManagementUnfinishedComponent} from './equipments-maintenance-tab/equipments-maintenance-management-unfinished/equipments-maintenance-management-unfinished.component';
import {EquipmentsMaintenanceManagementHistoryComponent} from './equipments-maintenance-tab/equipments-maintenance-management-history/equipments-maintenance-management-history.component';
import {EquipmentsMaintenanceTabComponent} from './equipments-maintenance-tab/equipments-maintenance-tab.component';
import {NzTabsModule} from "ng-zorro-antd/tabs";


@NgModule({
  declarations: [
    EquipmentsMaintenanceRecordComponent,
    EquipmentMaintenanceRecordEditComponent,
    EquipmentsMaintenanceManagementUnfinishedComponent,
    EquipmentsMaintenanceManagementHistoryComponent,
    EquipmentsMaintenanceTabComponent,
  ],
  imports: [
    CommonModule,
    EquipmentsMaintenanceSimpleRoutingModule,
    NzTableModule,
    NzGridModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzModalModule,
    NzTabsModule
  ]
})
export class EquipmentsMaintenanceSimpleModule {
}
