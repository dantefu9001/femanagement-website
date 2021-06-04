import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import {EquipmentParamsTableComponent, Param} from "./equipment-params-table/equipment-params-table.component";

@Component({
  selector: 'app-equipment-params',
  templateUrl: './equipment-params.component.html',

  styleUrls: ['./equipment-params.component.scss']
})
export class EquipmentParamsComponent implements OnInit {
  @Input() isEdit = false;
  @Input() equipmentId! :number;
  @ViewChild("equipmentParamsTableComponent") equipmentParamsTableComponent!: EquipmentParamsTableComponent;
  equipmentParamTypes: string[] = [
    '振动', '电压', '电流'
  ];
  isVisible = false;
  isOkLoading = false;
  paramsForm!: FormGroup;
  counter = 0;
  selectedEquipmentType: string = this.equipmentParamTypes[0];

  ngOnInit(): void {
    this.paramsForm = this.fb.group({
      code: '',
      param: '',
      type: this.selectedEquipmentType,
      unit: '',
      max: '',
      min: '',
    });
  }

  constructor(public fb: FormBuilder) {
  }

  handleOk(): void {
    //save
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
  }

  showModal(): void {
    this.isVisible = true;
  }

  addParam() {
    let param = {
      id:this.counter ++,
      equipmentId:this.equipmentId,
      code: this.paramsForm.get('code')?.value,
      param: this.paramsForm.get('param')?.value,
      type: this.paramsForm.get('type')?.value,
      max: this.paramsForm.get('max')?.value,
      min:this.paramsForm.get('min')?.value,
      unit:this.paramsForm.get('unit')?.value,
      defaultValue:'',
      disabled:false
    } as Param
    this.equipmentParamsTableComponent.addRow(param)
  }

  resetForm() {
    this.paramsForm.reset();
    this.selectedEquipmentType = this.equipmentParamTypes[0];
  }
}
