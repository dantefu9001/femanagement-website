import {Component} from '@angular/core';

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
  selector: 'app-basicdata-configs',
  templateUrl: './basicdata-configs.component.html',

  styleUrls: ['./basicdata-configs.component.scss']
})
export class BasicdataConfigsComponent {

  isEasyMode: boolean = false;
  isDisabled: boolean = false;
  isAutoDispatch: boolean = false;
  enableValidate: boolean = false;
  enableAlarm: boolean = false;
  malfunctionTypes: Array<MalfunctionType> = [{
    name: '操作不当',
    hideButton: true
  }];

  malfunctionLevels: Array<MalfunctionLevel> = [{
    name: '一级故障',
    hideButton: true,
    desc: '很严重的故障'
  }]
  newMalfunctionType!: string;
  waitTime!: string;
  pauseTime!: string;
  dispatchTime!: string;
  newMalfunctionLevel!: string;
  enableEquipmentManagement: boolean = false;


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
}
