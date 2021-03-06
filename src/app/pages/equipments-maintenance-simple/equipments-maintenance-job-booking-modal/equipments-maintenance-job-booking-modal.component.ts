import {Component, Input, ViewChild} from '@angular/core';
import {EquipmentsMaintenanceSheet, MaintenanceStatus} from "../../../model/model";
import {EquipmentsMaintenanceJobBookingFormComponent} from "./equipments-maintenance-job-booking-form/equipments-maintenance-job-booking-form.component";
import {EquipmentsMaintenanceJobBookingTableComponent} from "./equipments-maintenance-job-booking-table/equipments-maintenance-job-booking-table.component";
import {EquipmentsMaintenanceManagementUnfinishedComponent} from "../equipments-maintenance-tab/equipments-maintenance-management-unfinished/equipments-maintenance-management-unfinished.component";
import {NzMessageService} from "ng-zorro-antd/message";
import {EquipmentService} from "../../../service/equipment.service";

@Component({
  selector: 'app-equipments-maintenance-job-booking-modal',
  templateUrl: './equipments-maintenance-job-booking-modal.component.html'
})
export class EquipmentsMaintenanceJobBookingModalComponent {
  @Input() equipmentManagementUnfinished: EquipmentsMaintenanceManagementUnfinishedComponent;
  @ViewChild('equipmentBookingForm') equipmentBookingForm: EquipmentsMaintenanceJobBookingFormComponent;
  @ViewChild('equipmentBookingTable') equipmentBookingTable: EquipmentsMaintenanceJobBookingTableComponent;
  isVisible = false;
  isOkLoading = false;
  maintenance!: EquipmentsMaintenanceSheet;

  constructor(public nzMsgService: NzMessageService,
              public equipmentService: EquipmentService,
              equipmentsMaintenanceManagementUnfinishedComponent: EquipmentsMaintenanceManagementUnfinishedComponent,
              equipmentsMaintenanceJobBookingFormComponent: EquipmentsMaintenanceJobBookingFormComponent,
              equipmentsMaintenanceJobBookingTableComponent: EquipmentsMaintenanceJobBookingTableComponent) {
    this.equipmentManagementUnfinished = equipmentsMaintenanceManagementUnfinishedComponent;
    this.equipmentBookingTable = equipmentsMaintenanceJobBookingTableComponent;
    this.equipmentBookingForm = equipmentsMaintenanceJobBookingFormComponent;
  }

  showModal(): void {
    if (this.equipmentManagementUnfinished.listOfSelection.length !== 1) {
      this.nzMsgService.error("?????????????????????")
    } else {
      this.maintenance = this.equipmentManagementUnfinished.listOfSelection[0];
      this.equipmentBookingForm.maintenanceCodes = this.equipmentManagementUnfinished.listOfData.map(m=>{
        return m.code;
      });
      this.equipmentBookingForm.selectedMaintenanceCode = this.equipmentBookingForm.maintenanceCodes
        .find(m=>m==this.equipmentManagementUnfinished.listOfSelection[0].code)!
      this.equipmentBookingTable.maintenance = this.maintenance;
      this.isVisible = true;
    }
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.updateMaintenance();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  updateMaintenance() {
    const api = this.equipmentService.api + '/maintenance/maintainer';
    let param = {
      id: this.maintenance.id!,
      malfunctionType: this.equipmentBookingForm.malfunctionType,
      pauseTime: this.equipmentBookingForm.maintenanceForm.get('time')?.value,
      maintenanceDesc: this.equipmentBookingForm.maintenanceForm.get('comment')?.value,
      maintainPicUrls: [this.equipmentBookingForm.upload1.url, this.equipmentBookingForm.upload2.url],
      spareParts:this.equipmentBookingTable.listOfData,
      status:MaintenanceStatus.MAINTAINED
    }
    this.equipmentService.postData(api, param).then(() => {
      this.nzMsgService.success("????????????")
      this.isOkLoading = false;
      this.isVisible = false;
      this.equipmentManagementUnfinished.resetAndSearch();
    })
  }
}
