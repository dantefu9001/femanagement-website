import {Component, OnInit, ViewChild} from '@angular/core';
import {Equipment, EquipmentGroup} from '../../model/model';
import {EquipmentService} from '../../service/equipment.service';
import {EquipmentParamsTableComponent} from "./equipment-params/equipment-params-table/equipment-params-table.component";

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss'],
})
export class EquipmentsComponent implements OnInit {
  @ViewChild('equipmentParamsTableComponent') equipmentParamsTableComponent: EquipmentParamsTableComponent;
  equipments = Array<Equipment>();
  selectedEquipment!: Equipment;
  idOfSelectedRow = -1;
  scrollJson = {
    y: "300px"
  };
  PARAM_TEXT: string = '请从上表中选择所要查看的数据';
  selectedGroup!: EquipmentGroup;

  constructor(
    private equipmentService: EquipmentService,
    equipmentParamsTableComponent: EquipmentParamsTableComponent) {
    this.equipmentParamsTableComponent = equipmentParamsTableComponent;
  }

  ngOnInit(): void {
  }

  search(name: string, responsible: string, workshop: string, group: number): void {
    const api = 'http://localhost:8080/equipments';
    const params = {
      name: name,
      responsible: responsible,
      workshop: workshop,
      group: group
    };
    this.equipmentService.getDataWithParams(api, params).then((result: any) => {
      this.equipments = result.data;
    });
  }

  deleteEquipmentById(): void {
    let api = 'http://localhost:8080/equipments/';
    if (this.idOfSelectedRow === -1) {
      console.log('no data');
    } else {
      console.log('id:', this.idOfSelectedRow);
      api += this.idOfSelectedRow
      this.equipmentService.deleteData(api).then((result: any) => {
        this.search('', '', '', this.selectedGroup?.id);
      })
    }
  }


  selectData(data: Equipment): void {
    this.idOfSelectedRow = data.id;
    if (this.selectedEquipment !== undefined && data.id != this.selectedEquipment.id) {
      this.selectedEquipment.isSelected = false;
    }
    data.isSelected = !data.isSelected;
    if (data.isSelected) {
      this.selectedEquipment = data;
      this.equipmentParamsTableComponent.search(this.selectedEquipment.id);
      this.PARAM_TEXT = this.selectedEquipment.name + "参数配置"
    } else {
      this.selectedEquipment = undefined!
      this.equipmentParamsTableComponent.search(-1);
      this.PARAM_TEXT = '请从上表中选择所要查看的数据';
    }
  }
}
