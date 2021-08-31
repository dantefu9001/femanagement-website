import {Component, ViewChild} from '@angular/core';

import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {EquipmentsMaintenanceSheet, MaintenanceStatus} from "../../../model/model";
import {EquipmentService} from "../../../service/equipment.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {EquipmentsMaintenanceJobBookingFormComponent} from "../../equipments-maintenance-simple/equipments-maintenance-job-booking-modal/equipments-maintenance-job-booking-form/equipments-maintenance-job-booking-form.component";
import {EquipmentsMaintenanceJobBookingTableComponent} from "../../equipments-maintenance-simple/equipments-maintenance-job-booking-modal/equipments-maintenance-job-booking-table/equipments-maintenance-job-booking-table.component";
import {EquipmentsMaintenanceJobBookingModalFormComponent} from "./equipments-maintenance-job-booking-modal-form/equipments-maintenance-job-booking-modal-form.component";
import {NzImageService} from "ng-zorro-antd/image";

@Component({
  selector: 'app-equipments-maintenance-my-job-bookings',
  templateUrl: './equipments-maintenance-my-job-bookings.component.html',

  styleUrls: ['./equipments-maintenance-my-job-bookings.component.scss']
})
export class EquipmentsMaintenanceMyJobBookingsComponent {
  @ViewChild('equipmentBookingForm') equipmentBookingForm: EquipmentsMaintenanceJobBookingModalFormComponent;
  @ViewChild('equipmentBookingTable') equipmentBookingTable: EquipmentsMaintenanceJobBookingTableComponent;
  listOfSelection: Array<EquipmentsMaintenanceSheet> = [];
  isVisible = false;
  isOkLoading = false;

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  listOfData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  setOfCheckedId = new Set<number>();
  searchForm!: FormGroup;


  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
      this.listOfSelection = [...this.listOfData.filter(d => d.id == id)]
    } else {
      this.setOfCheckedId.delete(id);
      this.listOfSelection = this.listOfSelection.filter(d => d.id !== id)
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: ReadonlyArray<EquipmentsMaintenanceSheet>): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.length > 0 && this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  constructor(
    public fb: FormBuilder,
    equipmentBookingForm: EquipmentsMaintenanceJobBookingModalFormComponent,
    equipmentBookingTable: EquipmentsMaintenanceJobBookingTableComponent,
    public nzImageService: NzImageService,
    public equipmentService: EquipmentService,
    public nzMsgService: NzMessageService) {
    this.equipmentBookingForm = equipmentBookingForm;
    this.equipmentBookingTable = equipmentBookingTable;
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      "equipmentGroup": new FormControl(''),
      "equipment": new FormControl(''),
      "startDate": [null],
      "endDate": [null],
    });
    this.search();
  }

  search() {
    const api = this.equipmentService.api + '/maintenance/submitter';
    let param = {
      startDate: this.searchForm.get('startDate')?.value,
      endDate: this.searchForm.get('endDate')?.value,
      equipment: this.searchForm.get('equipment')?.value,
      equipmentGroup: this.searchForm.get('equipmentGroup')?.value,
      status:MaintenanceStatus.DISPATCHED
    };
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.listOfData = result.data
    });
  }

  view() {

  }

  book() {
    const api = this.equipmentService.api + '/maintenance/maintainer';
    let param = {
      id: this.listOfSelection[0]?.id!,
      malfunctionType: this.equipmentBookingForm.malfunctionType,
      pauseTime: this.equipmentBookingForm.maintenanceForm.get('time')?.value,
      maintenanceDesc: this.equipmentBookingForm.maintenanceForm.get('comment')?.value,
      precaution:this.equipmentBookingForm.maintenanceForm.get('precaution')?.value,
      maintainPicUrls: [this.equipmentBookingForm.upload1.url, this.equipmentBookingForm.upload2.url],
      spareParts: this.equipmentBookingTable.listOfData,
      status: MaintenanceStatus.MAINTAINED
    }
    this.equipmentService.postData(api, param).then(() => {
      this.nzMsgService.success("报工成功")
      this.isOkLoading = false;
      this.isVisible = false;
      this.resetAndSearch();
    })
  }

  showModal(): void {
    if (this.setOfCheckedId.size !== 1) {
      this.nzMsgService.error("请选择一条数据进行操作")
    } else {
      this.equipmentBookingForm.maintenanceCodes = this.listOfData.map(m=>{
        return m.code;
      });
      this.equipmentBookingForm.selectedMaintenanceCode = this.equipmentBookingForm.maintenanceCodes
        .find(code=>code==this.listOfSelection[0].code)!
      this.isVisible = true;
    }
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.book();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  resetAndSearch() {
    this.searchForm.setControl('equipment', new FormControl(''));
    this.searchForm.setControl('equipmentGroup', new FormControl(''))
    this.search();
  }

  viewPic(pic: any) {
    const images = [
      {
        src: pic,

        alt: ''
      }
    ];
    this.nzImageService.preview(images, { nzZoom: 1, nzRotate: 0 });
  }
}
