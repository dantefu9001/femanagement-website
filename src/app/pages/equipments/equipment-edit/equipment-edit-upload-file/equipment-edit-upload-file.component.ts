import {Component, Input} from '@angular/core';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {EquipmentService} from "../../../../service/equipment.service";

@Component({
  selector: 'app-equipment-edit-upload-file',
  templateUrl: './equipment-edit-upload-file.component.html'
})
export class EquipmentEditUploadFileComponent {
  url!: string;
  loading = false;
  equipmentService: EquipmentService;
  @Input() title!: string;

  constructor(equipmentService: EquipmentService) {
    this.equipmentService = equipmentService;
  }

  handleChange(info: { file: NzUploadFile }) {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.loading = false;
        this.url = this.equipmentService.api + "/equipments/file/" + info.file.response.data;
        break;
      case 'error':
        this.loading = false;
        break;
    }
  }
}
