import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EquipmentGroupComponent } from '../equipment-group/equipment-group.component';
import { EquipmentGroup } from '../model/model';
import { EquipmentService } from '../service/equipment.service';

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html'
})
export class EquipmentEditComponent implements OnInit, AfterViewInit{
  isVisible = false;
  isOkLoading = false;
  equipmentGroups = Array<EquipmentGroup>();

  equipmentEdit = new FormGroup({
    name: new FormControl(''),
    code:  new FormControl(''),
    id:  new FormControl(''),
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchEquipmentGroups();

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  constructor(public equipmentService: EquipmentService){
  }

  fetchEquipmentGroups(): void {
    const api = 'http://localhost:8080/equipment-groups';
    this.equipmentService.getData(api).then((result: any) => {
      this.equipmentGroups = result.data;
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
