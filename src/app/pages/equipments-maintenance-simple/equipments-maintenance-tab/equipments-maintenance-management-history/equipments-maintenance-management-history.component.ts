import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EquipmentsMaintenanceSheet, MaintenanceStatus} from "../../../../model/model";
import {EquipmentService} from "../../../../service/equipment.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-equipments-maintenance-management-history',
  templateUrl: './equipments-maintenance-management-history.component.html',
  styleUrls: ['./equipments-maintenance-management-history.component.scss']
})
export class EquipmentsMaintenanceManagementHistoryComponent implements OnInit {
  listOfSelection = [];


  isVisible = false;
  isOkLoading = false;

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  listOfData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  setOfCheckedId = new Set<number>();
  searchForm!: FormGroup;

  isAudit!: boolean;

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
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

  constructor(public fb: FormBuilder, public equipmentService: EquipmentService, public nzMsgService: NzMessageService) {
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
      this.nzMsgService.error("请选择至少一条数据进行操作")
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
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  resetAndSearch() {
    this.searchForm.setControl('equipment', new FormControl(''));
    this.searchForm.setControl('equipmentGroup', new FormControl(''))
    this.search();
  }

  export(){

  }
}
