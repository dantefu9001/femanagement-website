import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EquipmentsMaintenanceStandardRoutingModule} from './equipments-maintenance-standard-routing.module';
import {EquipmentsMaintenanceRecordStandardComponent} from './equipments-maintenance-record-standard/equipments-maintenance-record-standard.component';
import {EquipmentsMaintenanceSimpleModule} from "../equipments-maintenance-simple/equipments-maintenance-simple.module";
import {EquipmentMaintenanceValidateJudgementComponent} from './equipment-maintenance-validate-judgement/equipment-maintenance-validate-judgement.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzRateModule} from "ng-zorro-antd/rate";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {ResponseRatingComponent} from './equipment-maintenance-validate-judgement/ratings/response-rating/response-rating.component';
import {QualityRatingComponent} from './equipment-maintenance-validate-judgement/ratings/quality-rating/quality-rating.component';
import {FiveSRatingComponent} from './equipment-maintenance-validate-judgement/ratings/five-s-rating/five-s-rating.component';
import {OverallRatingComponent} from './equipment-maintenance-validate-judgement/ratings/overall-rating/overall-rating.component';
import { EquipmentsMaintenanceValidateTabComponent } from './equipments-maintenance-validate-tab/equipments-maintenance-validate-tab.component';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import { EquipmentsMaintenanceToBeValidateComponent } from './equipments-maintenance-validate-tab/equipments-maintenance-to-be-validate/equipments-maintenance-to-be-validate.component';
import { EquipmentsMaintenanceValidatedComponent } from './equipments-maintenance-validate-tab/equipments-maintenance-validated/equipments-maintenance-validated.component';
import { EquipmentsMaintenanceDispatchComponent } from './equipments-maintenance-dispatch/equipments-maintenance-dispatch.component';
import { EquipmentsMaintenanceMyJobBookingsComponent } from './equipments-maintenance-my-job-bookings/equipments-maintenance-my-job-bookings.component';
import { EquipmentsMaintenanceJobBookingModalFormComponent } from './equipments-maintenance-my-job-bookings/equipments-maintenance-job-booking-modal-form/equipments-maintenance-job-booking-modal-form.component';
import {EquipmentEditUploadPicComponent} from "../equipments/equipment-edit/equipment-edit-upload-pic/equipment-edit-upload-pic.component";
import {EquipmentsMaintenanceJobBookingTableComponent} from "../equipments-maintenance-simple/equipments-maintenance-job-booking-modal/equipments-maintenance-job-booking-table/equipments-maintenance-job-booking-table.component";
import {EquipmentsModule} from "../equipments/equipments.module";
import {EquipmentsMaintenanceStandardFormComponent} from "./equipments-maintenance-standard-form/equipments-maintenance-standard-form.component";


@NgModule({
    declarations: [
        EquipmentsMaintenanceRecordStandardComponent,
        EquipmentMaintenanceValidateJudgementComponent,
        ResponseRatingComponent,
        QualityRatingComponent,
        FiveSRatingComponent,
        OverallRatingComponent,
        EquipmentsMaintenanceValidateTabComponent,
        EquipmentsMaintenanceToBeValidateComponent,
        EquipmentsMaintenanceValidatedComponent,
        EquipmentsMaintenanceDispatchComponent,
        EquipmentsMaintenanceMyJobBookingsComponent,
        EquipmentsMaintenanceJobBookingModalFormComponent,
        EquipmentsMaintenanceStandardFormComponent
    ],
    imports: [
        CommonModule,
        EquipmentsMaintenanceStandardRoutingModule,
        EquipmentsMaintenanceSimpleModule,
        NzFormModule,
        ReactiveFormsModule,
        NzSelectModule,
        FormsModule,
        NzModalModule,
        NzDatePickerModule,
        NzTableModule,
        NzRateModule,
        NzCheckboxModule,
        NzTabsModule,
        EquipmentsModule
    ],
    exports: [
        EquipmentsMaintenanceStandardFormComponent
    ],
    providers: [
        EquipmentsMaintenanceJobBookingModalFormComponent,
        EquipmentEditUploadPicComponent,
        EquipmentsMaintenanceJobBookingTableComponent,
        OverallRatingComponent,
        QualityRatingComponent,
        FiveSRatingComponent,
        ResponseRatingComponent,
    ]
})
export class EquipmentsMaintenanceStandardModule {
}
