import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EquipmentsComponent } from '../equipments.component';
import {Equipment} from "../../../model/model";

@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.scss'],
})
export class EquipmentSearchComponent implements OnInit {
  validateForm!: FormGroup;
  @Input() equipmentsComponent: EquipmentsComponent;

  resetForm(): void {
    this.validateForm.reset();
  }

  constructor(private fb: FormBuilder, equipment: EquipmentsComponent) {
    this.equipmentsComponent = equipment;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      workshop: new FormControl(),
      responsible: new FormControl(),
      name: new FormControl(),
    });
  }

  search(): any {
    console.log(this.validateForm.get('name')?.value);
    const name: string = this.validateForm.get('name')?.value;
    const workshop: string = this.validateForm.get('workshop')?.value;
    const responsible: string = this.validateForm.get('responsible')?.value
    this.equipmentsComponent.search(name, workshop);
  }

  deleteRow(): void {
    this.equipmentsComponent.deleteEquipmentById();
  }
}
