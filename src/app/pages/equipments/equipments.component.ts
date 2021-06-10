import {Component, OnInit, ViewChild} from '@angular/core';
import {Equipment, EquipmentGroup} from '../../model/model';
import {EquipmentService} from '../../service/equipment.service';
import {EquipmentParamsTableComponent} from "./equipment-params/equipment-params-table/equipment-params-table.component";
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {EquipmentGroupEditModalComponent} from "./equipment-group/equipment-group-edit-modal/equipment-group-edit-modal.component";

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss'],
})
export class EquipmentsComponent implements OnInit {
  @ViewChild('equipmentParamsTableComponent') equipmentParamsTableComponent: EquipmentParamsTableComponent;
  @ViewChild('equipmentGroupEditModalComponent') equipmentGroupEditModalComponent: EquipmentGroupEditModalComponent
  equipments = Array<Equipment>();
  selectedEquipment!: Equipment;
  idOfSelectedRow = -1;
  scrollJson = {
    y: "300px"
  };
  PARAM_TEXT: string = '请从上表中选择所要查看的数据';
  equipmentGroups!: Array<EquipmentGroup>;
  selectedGroup!: EquipmentGroup;

  constructor(private nzContextMenuService: NzContextMenuService,
              equipmentGroupEditModalComponent: EquipmentGroupEditModalComponent,
              private equipmentService: EquipmentService,
              equipmentParamsTableComponent: EquipmentParamsTableComponent) {
    this.equipmentParamsTableComponent = equipmentParamsTableComponent;
    this.equipmentGroupEditModalComponent = equipmentGroupEditModalComponent;
  }

  ngOnInit(): void {
    this.search('', '');
    this.fetchEquipmentGroups();
  }

  search(name: string, code: string): void {
    const api = 'http://localhost:8080/equipments';
    const params = {
      equipmentName: name,
      equipmentCode: code,
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
        this.search('', '');
      })
    }
  }

  fetchEquipmentGroups(): void {
    const api = 'http://localhost:8080/equipment-groups';
    this.equipmentService.getData(api).then((result: any) => {
      this.equipmentGroups = result.data;
      this.selectedGroup = this.equipmentGroups[0]
    });
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

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent) {
    this.nzContextMenuService.create($event, menu);
  }

  resetSelectedGroup() {
    this.selectedGroup = this.equipmentGroups[0];
  }

  addGroup() {
    this.equipmentGroupEditModalComponent.editType = 'add';
    this.equipmentGroupEditModalComponent.showModal();
  }

  deleteGroup() {
    this.equipmentGroupEditModalComponent.editType = 'delete';
    this.equipmentGroupEditModalComponent.showModal();
  }

  editGroup() {
    this.equipmentGroupEditModalComponent.editType = 'edit';
    this.equipmentGroupEditModalComponent.showModal();
  }

  selectGroup(item: EquipmentGroup) {
    console.log(item.name);
    this.selectedGroup.isSelected = false;
    this.selectedGroup = item;
    this.selectedGroup.isSelected = true;
  }
}
