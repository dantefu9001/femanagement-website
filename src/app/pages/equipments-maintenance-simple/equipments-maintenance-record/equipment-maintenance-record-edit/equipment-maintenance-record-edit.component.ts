import {Component, OnInit} from '@angular/core';
import {Area, Person, Process, Workshop} from "../../../../model/model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-equipment-maintenance-record-edit',
  templateUrl: './equipment-maintenance-record-edit.component.html'
})
export class EquipmentMaintenanceRecordEditComponent implements OnInit{
  isVisible = false;
  isOkLoading = false;
  selectedPerson!: Person;
  personnel!: Array<Person>;
  selectedWorkshops!: Workshop;
  workshops!: Array<Workshop>;
  selectedArea!: Area;
  areas!: Array<Area>;
  selectedProcess!: Process;
  process!: Array<Process>;
  description!: string;
  equipmentMaintenanceEditForm!: FormGroup;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor(public fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.equipmentMaintenanceEditForm = this.fb.group({
      code:new FormControl(''),
      personnel: new FormControl(''),
      workshop: new FormControl(''),
      area:new FormControl(''),
      process: new FormControl(''),
      equipment: new FormControl(''),
      malfunctionTime: [null],
      description: new FormControl('')
    })
  }
}
