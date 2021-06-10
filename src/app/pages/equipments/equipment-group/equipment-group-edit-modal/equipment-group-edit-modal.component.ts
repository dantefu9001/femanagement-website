import {Component, Input, OnInit} from '@angular/core';
import {EquipmentGroup} from "../../../../model/model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-equipment-group-edit-modal',
  templateUrl: './equipment-group-edit-modal.component.html'
})
export class EquipmentGroupEditModalComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  modalString: string = '新增';
  editType: string = 'add';
  @Input() selectedGroup!: EquipmentGroup;
  groupEditForm!: FormGroup;


  showModal(): void {
    switch (this.editType) {
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
        //add
        break;
      case 'edit':
        //edit
        break;
      case 'delete':
        //delete
        break;
    }

    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.groupEditForm = this.fb.group(
      {
        name: new FormControl('')
      }
    )
  }
}
