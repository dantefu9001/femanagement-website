import {Component} from '@angular/core';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd/upload';
import {getBase64} from "../../../../common/utils";
import {EquipmentService} from "../../../../service/equipment.service";

@Component({
  selector: 'app-equipment-edit-upload-pic',
  templateUrl: './equipment-edit-upload-pic.component.html',
  styleUrls: ['./equipment-edit-upload-pic.component.scss']
})
export class EquipmentEditUploadPicComponent {

  url!: string;
  loading = false;
  equipmentService:EquipmentService;

  constructor(equipmentService:EquipmentService) {
    this.equipmentService = equipmentService;
  }

  handleChange(info: { file: NzUploadFile }) {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.loading = false;
        this.url = this.equipmentService.api+"/equipments/pic/" + info.file.response.data;
        break;
      case 'error':
        this.loading = false;
        break;
    }
  }
}
