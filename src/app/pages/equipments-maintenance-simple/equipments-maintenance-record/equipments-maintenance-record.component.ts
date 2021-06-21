import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EquipmentsMaintenanceSheet} from "../../../model/model";

@Component({
  selector: 'app-equipments-maintenance-record',
  templateUrl: './equipments-maintenance-record.component.html',
  styleUrls: ['./equipments-maintenance-record.component.scss']
})
export class EquipmentsMaintenanceRecordComponent implements OnInit {
  listOfSelection = [];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  listOfData: Array<EquipmentsMaintenanceSheet> = [];
  setOfCheckedId = new Set<number>();
  searchForm!: FormGroup;

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
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  constructor(public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      "equipmentGroup": new FormControl(''),
      "equipment": new FormControl(''),
      "startDate": [null],
      "endDate": [null]
    })

    this.listOfData = new Array(20).fill(0).map((_, index) => {
      return {
        id: index,
        code: `Edward King ${index}`,
        productionLine: 'test',
        equipment: 'test',
        nonEquipment: true,
        malfunctionTime: '2021-04-01',
        description: 'test',
        maintenancePerson: 'me',
        malfunctionType: 'broken',
        ratingOfMaintenance: 'good',
        status: 'finished',
      } as EquipmentsMaintenanceSheet;
    });
  }

  search() {

  }

  deleteRow() {
    this.listOfData = this.listOfData.filter(sheet => !this.setOfCheckedId.has(sheet.id))
  }
}
