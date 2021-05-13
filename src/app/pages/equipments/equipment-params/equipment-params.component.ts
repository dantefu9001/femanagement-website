import {Component, Input} from '@angular/core';

import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-equipment-params',
  templateUrl: './equipment-params.component.html',

  styleUrls: ['./equipment-params.component.scss']
})
export class EquipmentParamsComponent {
  @Input() isEdit = false;
  isVisible = false;
  isOkLoading = false;
  paramsForm: FormGroup;
  equipmentParamTypes: string[] = [
    '振动', '电压', '电流'
  ];
  selectedEquipmentType: string = this.equipmentParamTypes[0];

  constructor(private fb: FormBuilder) {
    this.paramsForm = this.fb.group({
      // userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      // email: ['', [Validators.email, Validators.required]],
      // password: ['', [Validators.required]],
      // confirm: ['', [this.confirmValidator]],
      // comment: ['', [Validators.required]]
      code: '',
      param: '',
      type: this.selectedEquipmentType,
      unit: '',
      max: '',
      min: '',
    });
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }

  addParam() {

  }

  deleteParams() {

  }
}
