import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import {EquipmentParamsTableComponent, Param} from "./equipment-params-table/equipment-params-table.component";
import {EquipmentsComponent} from "../equipments.component";
import {EquipmentService} from "../../../service/equipment.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-equipment-params',
  templateUrl: './equipment-params.component.html',

  styleUrls: ['./equipment-params.component.scss']
})
export class EquipmentParamsComponent implements OnInit {
  @Input() isEdit = false;
  @Input() equipmentsComponent: EquipmentsComponent
  @ViewChild("equipmentParamsTableComponent") equipmentParamsTableComponent!: EquipmentParamsTableComponent;

  equipmentId!: number;
  equipmentParamTypes: string[] = [
    '振动', '电压', '电流'
  ];
  isVisible = false;
  isOkLoading = false;
  paramsForm!: FormGroup;
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

  constructor(
    equipmentsComponent: EquipmentsComponent,
    public fb: FormBuilder,
    public nzMsgService: NzMessageService,
    public equipmentService: EquipmentService) {
    this.equipmentsComponent = equipmentsComponent;
  }

  handleOk(): void {
    this.isVisible = false;
  }


  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
  }

  showModal(): void {
    if (undefined !== this.equipmentsComponent.selectedEquipment) {
      this.equipmentId = this.equipmentsComponent.selectedEquipment.id;
      this.equipmentParamsTableComponent.search(this.equipmentId);
      this.isVisible = true;
    } else {
      this.nzMsgService.error("请选择设备")
    }
  }

  addParam() {
    let param = {
      id: this.equipmentParamsTableComponent.listOfData.length,
      equipmentId: this.equipmentsComponent.selectedEquipment.id,
      code: this.paramsForm.get('code')?.value,
      param: this.paramsForm.get('param')?.value,
      type: this.paramsForm.get('type')?.value,
      max: this.paramsForm.get('max')?.value,
      min: this.paramsForm.get('min')?.value,
      unit: this.paramsForm.get('unit')?.value,
      defaultValue: '',
      disabled: false
    } as Param
    this.saveParams(param);
  }

  private saveParams(param: Param) {
    const api = this.equipmentService.api + '/equipment-params';
    this.equipmentService.postData(api, param).then(() => {
      this.equipmentParamsTableComponent.search(this.equipmentId);
    });
  }

  resetForm() {
    this.paramsForm.reset();
    this.selectedEquipmentType = this.equipmentParamTypes[0];
  }
}
