import {Component, OnInit} from '@angular/core';
import {EquipmentsMaintenanceSheet} from "../../../../model/model";
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
  selector: 'app-equipments-maintenance-validated',
  templateUrl: './equipments-maintenance-validated.component.html',
  styleUrls: ['./equipments-maintenance-validated.component.scss']
})
export class EquipmentsMaintenanceValidatedComponent implements OnInit {
  listOfSelection = [];


  isVisible = false;
  isOkLoading = false;

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  listOfData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  setOfCheckedId = new Set<number>();
  searchForm!: FormGroup;
  status = [{
    name: '新增',
    value: 'new'
  }, {
    name: '待审核',
    value: 'toBeChecked'
  }];
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

  public fb: FormBuilder;

  constructor(fb: FormBuilder, public equipmentService: EquipmentService, public nzMsgService: NzMessageService) {
    this.fb = fb;
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
      status:"验证已审核"
    };
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.listOfData = result.data
    });
  }

  view() {

  }

}
