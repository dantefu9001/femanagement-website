import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EquipmentsMaintenanceSheet, MaintenanceStatus} from "../../../../model/model";
import {EquipmentService} from "../../../../service/equipment.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzImageService} from "ng-zorro-antd/image";

@Component({
  selector: 'app-equipments-maintenance-management-unfinished',
  templateUrl: './equipments-maintenance-management-unfinished.component.html',
  styleUrls: ['./equipments-maintenance-management-unfinished.component.scss']
})
export class EquipmentsMaintenanceManagementUnfinishedComponent implements OnInit {
  listOfSelection :Array<EquipmentsMaintenanceSheet>= [];
  isVisible = false;
  isOkLoading = false;

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  listOfData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  setOfCheckedId = new Set<number>();
  searchForm!: FormGroup;
  status = [{
    name: MaintenanceStatus.SUBMITTED,
  }, {
    name:MaintenanceStatus.TO_BE_DISPATCHED,
  }, {
    name: MaintenanceStatus.DISPATCHED,
  }];
  selectedStatus = this.status[0].name;
  isAudit!: boolean;

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
      this.listOfSelection = [...this.listOfData.filter(d=>d.id == id)]
    } else {
      this.setOfCheckedId.delete(id);
      this.listOfSelection = this.listOfSelection.filter(d=>d.id!==id)
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
    public equipmentService: EquipmentService,
    public nzImageService: NzImageService,
    public nzMsgService: NzMessageService) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      "equipmentGroup": new FormControl(''),
      "equipment": new FormControl(''),
      "startDate": [null],
      "endDate": [null],
      "status": new FormControl('')
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
      status: this.selectedStatus
    };
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.listOfData = result.data
    });
  }

  view() {

  }

  deprecate() {
    const api = this.equipmentService.api + '/maintenance/auditor/deprecate';
    let param = {
      "ids": Array.from(this.setOfCheckedId)
    };
    this.equipmentService.postData(api, param).then(() => {
      this.resetAndSearch();
      this.isVisible = false;
      this.isOkLoading = false;
    })
  }

  audit() {
    const api = this.equipmentService.api + '/maintenance/auditor/audit';
    let param = {
      "ids": Array.from(this.setOfCheckedId),
    };
    this.equipmentService.postData(api, param).then(() => {
      this.resetAndSearch();
      this.isVisible = false;
      this.isOkLoading = false;
    })
  }

  showModal(type: string): void {
    if (this.setOfCheckedId.size == 0) {
      this.nzMsgService.error("???????????????????????????????????????")
    } else {
      switch (type) {
        case 'delete':
          this.isAudit = false;
          break;
        case 'audit':
          this.isAudit = true;
          break;
      }
      this.isVisible = true;
    }
  }

  handleOk(): void {
    this.isOkLoading = true;
    if (this.isAudit) {
      this.audit();
    } else {
      this.deprecate()
    }
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
