import {Component, Input, OnInit} from '@angular/core';
import {EquipmentGroup} from "../../../../model/model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EquipmentService} from "../../../../service/equipment.service";
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";

@Component({
  selector: 'app-equipment-group-edit-modal',
  templateUrl: './equipment-group-edit-modal.component.html',
  styleUrls: ['./equipment-group-edit-modal.component.scss']
})
export class EquipmentGroupEditModalComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  modalString: string = '新增';
  editType: string = 'add';
  @Input() selectedGroup!: EquipmentGroup;
  groupEditForm!: FormGroup;
  equipmentGroups!: Array<EquipmentGroup>;


  showModal(editType: string): void {
    this.editType = editType;
    switch (editType) {
      case 'add':
        this.modalString = '新增'
        break;
      case 'edit':
        this.modalString = '更新'
        break;
      case 'delete':
        this.modalString = '删除'
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    switch (this.editType) {
      case 'add':
        this.saveNewGroup()
        break;
      case 'edit':
        this.updateGroup();
        break;
      case 'delete':
        this.deleteGroup();
        break;
    }

  }

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor(private fb: FormBuilder, private equipmentService: EquipmentService, private nzContextMenuService: NzContextMenuService,) {
  }

  ngOnInit(): void {
    this.groupEditForm = this.fb.group(
      {
        name: new FormControl('')
      }
    );
    this.getGroups();
  }

  getGroups(): void {
    const api = 'http://localhost:8080/equipment-groups';
    this.equipmentService.getData(api).then((result: any) => {
      this.equipmentGroups = result.data;
      this.selectedGroup = this.equipmentGroups[0]
    });
  }

  private saveNewGroup(): void {
    const api = 'http://localhost:8080/equipment-groups';
    let param = {
      name: this.groupEditForm.get('name')?.value
    }
    this.equipmentService.postData(api, param).then((result: any) => {
      this.getGroups();
      this.isOkLoading = false;
      this.isVisible = false;
    });
  }

  private updateGroup(): void {
    const api = 'http://localhost:8080/equipment-groups/update';
    let param = {
      id: this.selectedGroup?.id,
      name: this.groupEditForm.get('name')?.value
    }
    this.equipmentService.postData(api, param).then((result: any) => {
      this.getGroups();
      this.isOkLoading = false;
      this.isVisible = false;
    });
  }

  private deleteGroup(): void {
    const api = 'http://localhost:8080/equipment-groups/delete';
    let param = {
      id: this.selectedGroup?.id
    }
    this.equipmentService.postData(api, param).then((result: any) => {
      this.getGroups();
      this.isOkLoading = false;
      this.isVisible = false;
    });
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent) {
    this.nzContextMenuService.create($event, menu);
  }

  resetSelectedGroup() {
    this.selectedGroup = this.equipmentGroups[0];
  }

  selectGroup(item: EquipmentGroup) {
    console.log(item.name);
    this.selectedGroup.isSelected = false;
    this.selectedGroup = item;
    this.selectedGroup.isSelected = true;
  }
}
