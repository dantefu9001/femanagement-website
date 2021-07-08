import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EquipmentsMaintenanceSimpleRoutingModule} from './equipments-maintenance-simple-routing.module';
import {EquipmentsMaintenanceRecordComponent} from './equipments-maintenance-record/equipments-maintenance-record.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzGridModule} from "ng-zorro-antd/grid";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {EquipmentMaintenanceRecordEditComponent} from './equipments-maintenance-record/equipment-maintenance-record-edit/equipment-maintenance-record-edit.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {EquipmentsMaintenanceManagementUnfinishedComponent} from './equipments-maintenance-tab/equipments-maintenance-management-unfinished/equipments-maintenance-management-unfinished.component';
import {EquipmentsMaintenanceManagementHistoryComponent} from './equipments-maintenance-tab/equipments-maintenance-management-history/equipments-maintenance-management-history.component';
import {EquipmentsMaintenanceTabComponent} from './equipments-maintenance-tab/equipments-maintenance-tab.component';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import { EquipmentsMaintenanceJobBookingModalComponent } from './equipments-maintenance-job-booking-modal/equipments-maintenance-job-booking-modal.component';
import { EquipmentsMaintenanceJobBookingFormComponent } from './equipments-maintenance-job-booking-modal/equipments-maintenance-job-booking-form/equipments-maintenance-job-booking-form.component';
import { EquipmentsMaintenanceJobBookingTableComponent } from './equipments-maintenance-job-booking-modal/equipments-maintenance-job-booking-table/equipments-maintenance-job-booking-table.component';
import {EquipmentsModule} from "../equipments/equipments.module";
import {EquipmentEditUploadPicComponent} from "../equipments/equipment-edit/equipment-edit-upload-pic/equipment-edit-upload-pic.component";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzImageService} from "ng-zorro-antd/image";


@NgModule({
  providers:[
    EquipmentEditUploadPicComponent,
    EquipmentsMaintenanceJobBookingModalComponent,
    EquipmentsMaintenanceJobBookingFormComponent,
    EquipmentsMaintenanceJobBookingTableComponent,
    NzMessageService,
    NzImageService
  ],
  declarations: [
    EquipmentsMaintenanceRecordComponent,
    EquipmentMaintenanceRecordEditComponent,
    EquipmentsMaintenanceManagementUnfinishedComponent,
    EquipmentsMaintenanceManagementHistoryComponent,
    EquipmentsMaintenanceTabComponent,
    EquipmentsMaintenanceJobBookingModalComponent,
    EquipmentsMaintenanceJobBookingFormComponent,
    EquipmentsMaintenanceJobBookingTableComponent,
  ],
    exports: [
        EquipmentsMaintenanceRecordComponent,
        EquipmentsMaintenanceJobBookingTableComponent
    ],
  imports: [
    CommonModule,
    EquipmentsMaintenanceSimpleRoutingModule,
    NzTableModule,
    NzGridModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzModalModule,
    NzTabsModule,
    NzFormModule,
    NzSelectModule,
    FormsModule,
    EquipmentsModule,
  ]
})
export class EquipmentsMaintenanceSimpleModule {
}
