import {Component, OnInit} from '@angular/core';
import {EquipmentsSummary} from "../../model/model";
import {EquipmentService} from "../../service/equipment.service";

export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}

@Component({
  selector: 'app-equipments-summary',
  templateUrl: './equipments-summary.component.html',
  styleUrls: ['./equipments-summary.component.scss']
})
export class EquipmentsSummaryComponent implements OnInit {
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: ReadonlyArray<Data> = [];
  listOfCurrentPageData: ReadonlyArray<Data> = [];
  setOfCheckedId = new Set<number>();

  summaryList!: Array<EquipmentsSummary>
  summary!: string;
  summaryType = 'weekly';
  scrollJson = {
    y: "320px"
  };


  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<Data>): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({disabled}) => !disabled);
    this.checked = listOfEnabledData.every(({id}) => this.setOfCheckedId.has(id));
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

  constructor(public equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    this.getEquipmentSummary();
  }

  getEquipmentSummary(): void {
    const api = 'http://localhost:8080/equipments-summary';
    this.loading = true;
    let param = {
      type: this.summaryType,
      summary: this.summary
    }
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.summaryList = result.data;
      this.loading = false;
    });
  }

  search(type: string): void {
    this.summaryType = type;
    this.getEquipmentSummary();
  }

  edit() {

  }

  delete() {

  }
}
