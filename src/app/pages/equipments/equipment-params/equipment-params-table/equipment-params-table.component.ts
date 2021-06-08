import {Component, Input, OnInit} from '@angular/core';
import {EquipmentService} from "../../../../service/equipment.service";

export interface Param {
  id: number;
  equipmentId: number;
  code: string;
  param: string;
  type: string;
  max: string;
  min: string;
  defaultValue: string;
  unit: string;
  disabled: boolean;
}

@Component({
  selector: 'app-equipment-params-table',
  templateUrl: './equipment-params-table.component.html',
  styleUrls: ['./equipment-params-table.component.scss']
})
export class EquipmentParamsTableComponent implements OnInit {
  @Input() equipmentId!: number;
  checked = false;
  indeterminate = false;
  listOfData: Array<Param> = [];
  listOfCurrentPageData: ReadonlyArray<Param> = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<Param>): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({disabled}) => !disabled);
    this.checked = this.listOfData.length > 0 && listOfEnabledData.every(({id}) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({id}) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.filter(({disabled}) => !disabled).forEach(({id}) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  deleteRows(): void {
    const api = 'http://localhost:8080/equipment-params/delete';
    let params = {
      "ids":Array.from(this.setOfCheckedId),
      "equipmentId": this.equipmentId
    }
    this.equipmentService.postData(api, params).then(() => {
      this.search(this.equipmentId);
      this.checked = false;
    })
  }

  ngOnInit(): void {
  }

  constructor(public equipmentService: EquipmentService) {
  }

  search(equipmentId: number): void {
    let param = {
      "equipmentId":equipmentId
    }
    const api = 'http://localhost:8080/equipment-params/list';
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.listOfData = result.data;
      this.checked=false;
    })
  }
}
