import {Component, OnInit} from '@angular/core';
import {EquipmentsMaintenanceSheet, MaintenanceStatus} from "../../../../model/model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EquipmentService} from "../../../../service/equipment.service";
import {NzMessageService} from "ng-zorro-antd/message";

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-equipments-maintenance-to-be-validate',
  templateUrl: './equipments-maintenance-to-be-validate.component.html',
  styleUrls: ['./equipments-maintenance-to-be-validate.component.scss']
})
export class EquipmentsMaintenanceToBeValidateComponent implements OnInit {
  listOfSelection: Array<EquipmentsMaintenanceSheet> = [];
  isVisible = false;
  isOkLoading = false;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  listOfData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  setOfCheckedId = new Set<number>();
  searchForm!: FormGroup;
  validateForm!: FormGroup;
  validations = [
    '完全有效',
    '部分有效',
    '无效'
  ]
  selectedValidate: string = this.validations[0];
  isApproveVisible: boolean = false;
  isApproveOkLoading: boolean = false;

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
    public equipmentService: EquipmentService,
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

    this.validateForm = this.fb.group({
      "description": ''
    })
    this.search();
  }

  search() {
    const api = this.equipmentService.api + '/maintenance/submitter';
    let param = {
      startDate: this.searchForm.get('startDate')?.value,
      endDate: this.searchForm.get('endDate')?.value,
      equipment: this.searchForm.get('equipment')?.value,
      equipmentGroup: this.searchForm.get('equipmentGroup')?.value,
      status: MaintenanceStatus.VALIDATED
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

  showValidateModal(): void {
    if (this.listOfSelection.length !== 1) {
      this.nzMsgService.error("请选择单条数据进行操作");
    } else {
      this.isVisible = true;
    }
  }

  showApproveModal(): void {
    if (this.listOfSelection.length < 1) {
      this.nzMsgService.error("请选择数据");
    }
    // else if (this.listOfSelection.find(d => d.validation === undefined)) {
    //   this.nzMsgService.error("请勿选择未验证的数据");
    // }
    else {
      this.isApproveVisible = true;
    }
  }


  handleOk(): void {
    this.isOkLoading = true;
    const api = this.equipmentService.api + '/maintenance/submitter/validate';
    let param = {
      id: this.listOfSelection[0]?.id,
      validation: this.selectedValidate,
      validateDesc: this.validateForm.get('description')?.value
    };
    this.equipmentService.postData(api, param).then(() => {
      this.resetAndSearch();
      this.isOkLoading = false;
      this.isVisible = false;
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleApproveOk() {
    this.isApproveOkLoading = true;
    const api = this.equipmentService.api + '/maintenance/auditor/approve-validation';
    let param = {
      ids: Array.from(this.setOfCheckedId)
    };
    this.equipmentService.postData(api, param).then(() => {
      this.resetAndSearch();
      this.isApproveOkLoading = false;
      this.isApproveVisible = false;
    })
  }

  handleApproveCancel() {
    this.isApproveVisible = false;
  }

  resetAndSearch() {
    this.searchForm.setControl('equipment', new FormControl(''));
    this.searchForm.setControl('equipmentGroup', new FormControl(''))
    this.search();
  }

}
