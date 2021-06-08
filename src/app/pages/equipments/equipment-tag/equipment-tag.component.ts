import {Component, Input} from '@angular/core';
import {EquipmentsComponent} from "../equipments.component";
import {Equipment} from "../../../model/model";

@Component({
  selector: 'app-equipment-tag',
  templateUrl: './equipment-tag.component.html',
  styleUrls: ['./equipment-tag.component.scss'],
})
export class EquipmentTagComponent {
  @Input() equipmentComponent!: EquipmentsComponent;
  selectedEquipment!: Equipment;
  isVisible = false;
  name!: string;
  model!: string;
  location!: string;
  activateTime!: Date;
  equipmentCode!: string;
  qrCodeInfo!: string;

  constructor(public equipmentsComponent: EquipmentsComponent) {
    this.equipmentComponent = equipmentsComponent;
  }

  showModal(): void {
    if(undefined !== this.equipmentComponent.selectedEquipment){
      this.selectedEquipment = this.equipmentsComponent.selectedEquipment;
      this.name = this.selectedEquipment.name!;
      this.model = this.selectedEquipment.specification + this.selectedEquipment.model;
      this.location = this.selectedEquipment.productionLine?.name + this.selectedEquipment.process?.name;
      this.activateTime = this.selectedEquipment.dateOfFirstUse;
      this.equipmentCode = this.selectedEquipment.code;
      this.qrCodeInfo = JSON.stringify({
        "equipmentCode": this.equipmentCode,
        "name": this.name,
        "responsible": this.selectedEquipment.responsible!
      });
      this.isVisible = true;
    }
    else{
      alert("请选择设备")
    }
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
