import {Component, OnInit} from '@angular/core';
import {EquipmentsMaintenanceSheet, MaintenanceStatus, Person} from "../../../model/model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EquipmentService} from "../../../service/equipment.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-equipments-maintenance-dispatch',
  templateUrl: './equipments-maintenance-dispatch.component.html',

  styleUrls: ['./equipments-maintenance-dispatch.component.scss']
})
export class EquipmentsMaintenanceDispatchComponent implements OnInit {
  listOfSelection: Array<EquipmentsMaintenanceSheet> = [];

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  listOfData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  setOfCheckedId = new Set<number>();
  searchForm!: FormGroup;
  isConfirmVisible: boolean = false;
  isConfirmOkLoading: boolean = false;
  isDispatchVisible: boolean = false;
  isDispatchOkLoading: boolean = false;
  dispatchForm!: FormGroup;
  isDeleteVisible: boolean = false;
  isDeleteOkLoading: boolean = false;
  engineers!: Array<Person>;
  selectedEngineer!: Person;
  deadline!: Date;

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
    });
    this.dispatchForm = this.fb.group({
      'dispatchDeadline':'',
      "info": ''
    })
    this.fetchEngineers();
    this.search();
  }

  search() {
    const api = this.equipmentService.api + '/maintenance/submitter';
    let param = {
      startDate: this.searchForm.get('startDate')?.value,
      endDate: this.searchForm.get('endDate')?.value,
      equipment: this.searchForm.get('equipment')?.value,
      equipmentGroup: this.searchForm.get('equipmentGroup')?.value,
      status: MaintenanceStatus.SUBMITTED
    };
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.listOfData = result.data
    });
  }

  view() {

  }

  resetAndSearch() {
    this.searchForm.setControl('equipment', new FormControl(''));
    this.searchForm.setControl('equipmentGroup', new FormControl(''))
    this.search();
  }

  showDeleteModal() {
    if (this.listOfSelection.length !== 1) {
      this.nzMsgService.error("请选择至少一条数据")
    } else {
      this.isDeleteVisible = true;
    }
  }

  showDispatchModal() {
    if (this.listOfSelection.length !== 1) {
      this.nzMsgService.error("请选择一条数据")
    } else {
      this.isDispatchVisible = true;
    }
  }

  showConfirmModal() {
    if (this.listOfSelection.length < 1) {
      this.nzMsgService.error("请选择至少一条数据")
    } else {
      this.isConfirmVisible = true;
    }
  }


  handleConfirmOk() {
    //update rating numbers
    this.isConfirmOkLoading = true;
    this.confirmDispatch();
  }

  handleDispatchOk() {
    //update status to confirm
    this.isDispatchOkLoading = true;
    this.dispatchMaintenance()
  }

  handleDeleteOk() {
    this.isDeleteOkLoading = true;
    this.deleteMaintenance();
  }


  handleConfirmCancel() {
    this.isConfirmVisible = false;
  }

  handleDispatchCancel() {
    this.isDispatchVisible = false;
  }

  handleDeleteCancel() {
    this.isDeleteVisible = false;
  }

  dispatchMaintenance() {
    const api = this.equipmentService.api + '/maintenance/auditor/dispatch';
    let param = {
      id: this.listOfSelection[0]?.id,
      status: MaintenanceStatus.TO_BE_DISPATCHED,
      maintenancePerson: this.selectedEngineer,
      dispatchInfo:this.dispatchForm.get('info')?.value,
      deadLine:this.deadline.toISOString()
    }
    this.equipmentService.postData(api, param).then(() => {
      this.nzMsgService.success('已分派')
      this.resetAndSearch();
      this.isDispatchVisible = false;
      this.isDispatchOkLoading = false;
    });
  }


  confirmDispatch() {
    const api = this.equipmentService.api + '/maintenance/auditor/confirm';
    let param = {
      id: this.listOfSelection[0]?.id,
      status: MaintenanceStatus.DISPATCHED
    }
    this.equipmentService.postData(api, param).then(() => {
      this.nzMsgService.success('已审核')
      this.resetAndSearch()
      this.isConfirmVisible = false;
      this.isConfirmOkLoading = false;
    });
  }

  deleteMaintenance() {
    const api = this.equipmentService.api + '/maintenance/auditor/deprecate';
    let param = {
      ids: Array.from(this.setOfCheckedId),
    }
    this.equipmentService.postData(api, param).then(() => {
      this.nzMsgService.success("已删除")
      this.resetAndSearch();
      this.isDeleteOkLoading = false;
      this.isDeleteVisible = false;
    });
  }

  fetchEngineers() {
    const api = this.equipmentService.api+'/personnel/list';
    this.equipmentService.getData(api).then((result: any) => {
      this.engineers = result.data;
    })
  }
}
