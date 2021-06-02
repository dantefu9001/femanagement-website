import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {getBase64} from "../../../../common/utils";

@Component({
  selector: 'app-equipment-edit-upload-pic',
  templateUrl: './equipment-edit-upload-pic.component.html',
  styleUrls: ['./equipment-edit-upload-pic.component.scss']
})
export class EquipmentEditUploadPicComponent {
  fileList: NzUploadFile[] = [

  ];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };
}
