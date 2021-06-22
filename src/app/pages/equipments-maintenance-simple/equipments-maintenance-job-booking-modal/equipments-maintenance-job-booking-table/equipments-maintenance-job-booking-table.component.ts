import {Component, OnInit} from '@angular/core';
import {EquipmentsMaintenanceSheet, SparePart} from "../../../../model/model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EquipmentService} from "../../../../service/equipment.service";

@Component({
  selector: 'app-equipments-maintenance-job-booking-table',
  templateUrl: './equipments-maintenance-job-booking-table.component.html',
  styleUrls: ['./equipments-maintenance-job-booking-table.component.scss']
})
export class EquipmentsMaintenanceJobBookingTableComponent implements OnInit {
  maintenance!: EquipmentsMaintenanceSheet;

  listOfSelection: Array<SparePart> = [];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<SparePart> = [];
  listOfData: ReadonlyArray<SparePart> = [];
  setOfCheckedId = new Set<number>();
  scrollJson = {
    y: "280px"
  };
  isVisible: boolean = false;
  isOkLoading: boolean = false;
  spareParts: Array<SparePart> = [];
  sparePartsForm!: FormGroup;
  selectedSparePart!: SparePart;

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
      this.listOfSelection = [...this.listOfData.filter(d => d.id == id)]
    } else {
      this.setOfCheckedId.delete(id);
      this.listOfSelection = [...this.listOfData.filter(d => d.id !== id)]
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

  onCurrentPageDataChange($event: ReadonlyArray<SparePart>): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfSelection.length > 0 && this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  constructor(public fb: FormBuilder, public equipmentService: EquipmentService) {

  }

  ngOnInit(): void {
    this.sparePartsForm = this.fb.group({
      code: '',
      stock: '',
      unit: '',
      consumptionNumber: '',
      remark: '',
    })
    this.fetchSpareParts();
  }

  fetchSpareParts() {
    const api = this.equipmentService.api + '/spare-part'
    this.equipmentService.getData(api).then((result: any) => {
      this.spareParts = result.data
    })
  }

  showSpareParts() {
    this.isVisible = true;
  }

  deleteSelectedSpareParts() {
    this.listOfData = this.listOfData.filter(d => !this.setOfCheckedId.has(d.id))
  }

  handleCancel() {
    this.isVisible = false;
    this.resetForm();
  }

  handleOk() {
    this.selectedSparePart.consumption = this.sparePartsForm.get('consumptionNumber')?.value!
    this.selectedSparePart.remark = this.sparePartsForm.get('remark')?.value!
    this.listOfData = [...this.listOfData, this.selectedSparePart]
    this.isVisible = false;
    this.resetForm();
  }

  resetForm(){
    this.selectedSparePart = null!;
    this.sparePartsForm.reset();
  }
}
