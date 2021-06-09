import {Component} from '@angular/core';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd/upload';
import {getBase64} from "../../../../common/utils";

@Component({
  selector: 'app-equipment-edit-upload-pic',
  templateUrl: './equipment-edit-upload-pic.component.html',
  styleUrls: ['./equipment-edit-upload-pic.component.scss']
})
export class EquipmentEditUploadPicComponent {

  url!: string;
  loading = false;

  handleChange(info: { file: NzUploadFile }) {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.loading = false;
        this.url = "http://localhost:8080/equipments/pic/" + info.file.response.data;
        break;
      case 'error':
        this.loading = false;
        break;
    }
  }
}
