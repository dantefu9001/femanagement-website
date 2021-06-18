import {Component, OnInit} from '@angular/core';
import {EquipmentService} from "../../../service/equipment.service";

class MalfunctionType {
  name: string;
  hideButton: boolean;

  constructor(name: string, hideButton: boolean) {
    this.name = name;
    this.hideButton = hideButton;
  }
}

class MalfunctionLevel extends MalfunctionType {
  desc: string;

  constructor(name: string, hideButton: boolean, desc: string) {
    super(name, hideButton);
    this.desc = desc;
  }
}

@Component({
  selector: 'app-basic-data-configs',
  templateUrl: './basic-data-configs.component.html',
  styleUrls: ['./basic-data-configs.component.scss']
})
export class BasicDataConfigsComponent implements OnInit {

  isEasyMode: boolean = false;
  isDisabled: boolean = false;
  isAutoDispatch: boolean = false;
  enableValidate: boolean = false;
  enableAlarm: boolean = false;
  malfunctionTypes: Array<MalfunctionType> = [];
  malfunctionLevels: Array<MalfunctionLevel> = []
  newMalfunctionType!: string;
  waitTime!: string;
  pauseTime!: string;
  dispatchTime!: string;
  newMalfunctionLevel!: string;
  enableEquipmentManagement: boolean = false;
  enableSparePartsManagement!: boolean;


  unableAutoDispatchAndValidate() {
    this.isAutoDispatch = false;
    this.enableValidate = false;
  }

  addNewMalfunctionType($event: KeyboardEvent) {
    if ($event.code == 'Enter') {
      console.log(this.newMalfunctionType);
      this.malfunctionTypes.push(new MalfunctionType(this.newMalfunctionType, true));
      this.newMalfunctionType = '';
    }
  }

  addNewMalfunctionLevel($event: KeyboardEvent) {
    if ($event.code == 'Enter') {
      console.log(this.newMalfunctionLevel);
      this.malfunctionLevels.push(new MalfunctionLevel(this.newMalfunctionLevel, true, ''));
      this.newMalfunctionLevel = '';
    }
  }

  showIcon(item: MalfunctionType) {
    item.hideButton = false;
  }

  hideIcon(item: MalfunctionType) {
    item.hideButton = true;
  }

  deleteType(item: MalfunctionType) {
    console.log("delete");
    this.malfunctionTypes = this.malfunctionTypes.filter(p => p.name != item.name);
  }

  deleteLevel(item: MalfunctionLevel) {
    this.malfunctionLevels = this.malfunctionLevels.filter(p => p.name != item.name);
  }


  ngOnInit(): void {
    this.fetchData();
  }

  constructor(private equipmentService: EquipmentService) {
  }

  saveConfigs() {
    let api = this.equipmentService.api + "/config";
    let param = {
      easyMode: this.isEasyMode,
      autoDispatch: this.isAutoDispatch,
      enableValidation: this.enableValidate,
      maintenanceAlarm: this.enableAlarm,
      waitTime: this.waitTime,
      downTime: this.pauseTime,
      dispatchTime: this.dispatchTime,
      malfunctionType: JSON.stringify(this.malfunctionTypes),
      malfunctionLevel: JSON.stringify(this.malfunctionLevels),
      equipmentSummary: this.enableEquipmentManagement,
      sparePartManagement: this.enableSparePartsManagement
    }
    this.equipmentService.postData(api, param).then(()=>{
      this.fetchData();
    })
  }



  private fetchData() {
    let api = this.equipmentService.api + '/config';
    this.equipmentService.getData(api).then((result:any)=>{
      let resultData = result.data;
      if (result.data !== undefined) {
        this.isEasyMode = resultData.easyMode;
        this.isAutoDispatch = resultData.autoDispatch;
        this.enableValidate = resultData.enableValidation;
        this.enableAlarm = resultData.maintenanceAlarm;
        this.waitTime = resultData.waitTime;
        this.pauseTime = resultData.downTime;
        this.dispatchTime = resultData.dispatchTime;
        this.malfunctionTypes = JSON.parse(resultData.malfunctionType);
        this.malfunctionLevels = JSON.parse(resultData.malfunctionLevel);
        this.enableEquipmentManagement = resultData.equipmentSummary;
        this.enableSparePartsManagement = resultData.sparePartManagement;
      }
    }).catch((e:Error)=>{
      console.error(e.message);
    })
  }
}
