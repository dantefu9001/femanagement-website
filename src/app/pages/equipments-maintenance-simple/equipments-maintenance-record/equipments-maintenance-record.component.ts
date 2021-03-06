import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EquipmentsMaintenanceSheet} from "../../../model/model";
import {EquipmentService} from "../../../service/equipment.service";

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

  constructor(public fb: FormBuilder, public equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      "equipmentGroup": new FormControl(''),
      "equipment": new FormControl(''),
      "startDate": [null],
      "endDate": [null]
    })
    this.search();
  }

  resetAndSearch() {
    this.searchForm.setControl('equipment', new FormControl(''));
    this.searchForm.setControl('equipmentGroup', new FormControl(''))
    this.search();
  }

  search() {
    const api = this.equipmentService.api + '/maintenance/submitter';
    let param = {
      startDate: this.searchForm.get('startDate')!.value,
      endDate: this.searchForm.get('endDate')!.value,
      equipment: this.searchForm.get('equipment')?.value,
      equipmentGroup: this.searchForm.get('equipmentGroup')?.value
    };
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.listOfData = result.data
    });
  }


  deleteRow() {
    const api = this.equipmentService.api + '/maintenance/submitter/delete';
    let param = {
      "ids": Array.from(this.setOfCheckedId),
    }
    this.equipmentService.postData(api, param).then(() => {
      this.search();
    })
  }
}
