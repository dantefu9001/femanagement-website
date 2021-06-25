import {Component, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import {EquipmentEditUploadPicComponent} from "../../../equipments/equipment-edit/equipment-edit-upload-pic/equipment-edit-upload-pic.component";
import {EquipmentsMaintenanceSheet, Person} from "../../../../model/model";
import {EquipmentService} from "../../../../service/equipment.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-equipments-maintenance-job-booking-modal-form',
  templateUrl: './equipments-maintenance-job-booking-modal-form.component.html',

  styleUrls: ['./equipments-maintenance-job-booking-modal-form.component.scss']
})
export class EquipmentsMaintenanceJobBookingModalFormComponent {
  @ViewChild('uploadPicComponent1') upload1: EquipmentEditUploadPicComponent;
  @ViewChild('uploadPicComponent2') upload2: EquipmentEditUploadPicComponent;
  maintenance!: EquipmentsMaintenanceSheet;
  maintenanceForm: FormGroup;
  selectedMaintenanceCode!: number;
  maintenanceCodes!: Array<number>;
  malfunctionType!: string;
  malfunctionTypes!: Array<string>;
  personnel!: Array<Person>;
  selectedPerson!: Person;
  timeOfTroubleShooting!: number;
  timeOfMaintenance!: number;

  constructor(private fb: FormBuilder,
              upload1: EquipmentEditUploadPicComponent,
              upload2: EquipmentEditUploadPicComponent,
              public equipmentService: EquipmentService,
              public nzMsgService: NzMessageService) {
    this.upload1 = upload1;
    this.upload2 = upload2;
    this.maintenanceForm = this.fb.group({
      repairNumber: this.maintenance?.code!,
      selectedPerson: [''],
      malfunctionType: [''],
      troubleShootingTime: '',
      maintenanceTime: '',
      totalPauseTime: '',
      comment: '',
      precautions: '',
    });
  }

  ngOnInit(): void {
    this.fetchMalfunctionType();
    this.fetchPersonnel();
  }

  private fetchMalfunctionType() {
    const api = this.equipmentService.api + '/config';
    this.equipmentService.getData(api).then((result: any) => {
      this.malfunctionTypes = JSON.parse(result.data.malfunctionType).map((item: any) => {
        return item.name
      });
    });
  }

  fetchPersonnel(): void {
    const api = this.equipmentService.api + '/personnel/list';
    this.equipmentService.getData(api).then((result: any) => {
      this.personnel = result.data;
    })
  }

  addTime() {
    console.log("changed");
  }
}
