import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import {EquipmentService} from "../../../../service/equipment.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {EquipmentEditUploadPicComponent} from "../../../equipments/equipment-edit/equipment-edit-upload-pic/equipment-edit-upload-pic.component";
import {EquipmentsMaintenanceSheet} from "../../../../model/model";
import {MalfunctionType} from "../../../basicdata/basic-data-configs/basic-data-configs.component";

@Component({
  selector: 'app-equipments-maintenance-job-booking-form',
  templateUrl: './equipments-maintenance-job-booking-form.component.html',
  styleUrls: ['./equipments-maintenance-job-booking-form.component.scss']
})
export class EquipmentsMaintenanceJobBookingFormComponent implements OnInit {
  @ViewChild('uploadPicComponent1') upload1: EquipmentEditUploadPicComponent;
  @ViewChild('uploadPicComponent2') upload2: EquipmentEditUploadPicComponent;
  maintenance!:EquipmentsMaintenanceSheet;
  maintenanceForm: FormGroup;
  selectedMaintenanceCode!: string;
  maintenanceCodes!: Array<string>;
  malfunctionType!: string;
  malfunctionTypes!: Array<string>;
  @Input() cannotEdit: boolean=false;

  constructor(private fb: FormBuilder,
              upload1: EquipmentEditUploadPicComponent,
              upload2: EquipmentEditUploadPicComponent,
              public equipmentService: EquipmentService,
              public nzMsgService: NzMessageService) {
    this.upload1 = upload1;
    this.upload2 = upload2;
    this.maintenanceForm = this.fb.group({
      repairNumber: this.maintenance?.code!,
      malfunctionType: [''],
      time: '',
      comment: ''
    });
  }

  ngOnInit(): void {
    this.fetchMalfunctionType();
  }

  private fetchMalfunctionType() {
    const api = this.equipmentService.api + '/config';
    this.equipmentService.getData(api).then((result: any) => {
      this.malfunctionTypes = JSON.parse(result.data.malfunctionType).map((item: any) => {
        return item.name
      });
    });
  }
}
