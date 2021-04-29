import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EquipmentsComponent } from '../equipments.component';

@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.scss'],
})
export class EquipmentSearchComponent implements OnInit {
  validateForm!: FormGroup;
  @Input() equipment: EquipmentsComponent;
  isCollapse = true;

  resetForm(): void {
    this.validateForm.reset();
  }

  constructor(private fb: FormBuilder, equipment: EquipmentsComponent) {
    this.equipment = equipment;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: new FormControl(),
      code: new FormControl(),
      id: new FormControl(),
    });
  }

  search(): any {
    console.log(this.validateForm.get('name')?.value);
    const name: string = this.validateForm.get('name')?.value;
    const code: string = this.validateForm.get('code')?.value;
    this.equipment.search(name, code);
  }

  deleteRow(): void {
    this.equipment.deleteEquipmentById();
  }
}
