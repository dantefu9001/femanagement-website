import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {EquipmentGroup} from '../../../model/model';
import {EquipmentService} from '../../../service/equipment.service';

@Component({
  selector: 'app-equipment-group',
  templateUrl: './equipment-group.component.html',
  styleUrls: ['./equipment-group.component.scss']
})
export class EquipmentGroupComponent implements OnInit {
  equipmentGroups = Array<EquipmentGroup>();

  constructor(
    public msg: NzMessageService,
    public equipmentService: EquipmentService
  ) {
  }

  ngOnInit() {
    this.fetchEquipmentGroups();
  }

  fetchEquipmentGroups(): void {
    const api = this.equipmentService.api+'/equipment-groups';
    this.equipmentService.getData(api).then((result: any) => {
      this.equipmentGroups = result.data;
    });
  }

  onRightClick($event: MouseEvent, item: any) {
    console.log($event)
  }
}
