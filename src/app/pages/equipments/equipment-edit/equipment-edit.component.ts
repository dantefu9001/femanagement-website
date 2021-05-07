import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EquipmentGroup, SelfDefinedAttribute } from '../model/model';
import { EquipmentService } from '../service/equipment.service';

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html'
})
export class EquipmentEditComponent implements OnInit{
  i = 0;
  editId: string | null = null;
  isVisible = false;
  isOkLoading = false;
  equipmentEditForm!: FormGroup
  listOfData : SelfDefinedAttribute[] = []
  equipmentGroups = Array<EquipmentGroup>();
  selectedGroup!:EquipmentGroup;

  responsibilities = [
    { "name": "alan" }
  ];
  workshops = [
    { "name": "shop1" }
  ];
  areas = [
    {
      "name": "area1"
    }
  ];
  process = [
    { "name": "焊接" }
  ];
  stations = [
    { "name": "焊接" }
  ];
  status = [
    { "name": "待投入" }
  ]

  

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchEquipmentGroups();
    this.equipmentEditForm = this.fb.group({
      name: new FormControl(''),
      code: new FormControl(''),
      id: new FormControl(''),
      equipmentModel: new FormControl(''),
      specification: new FormControl(''),
      manufacturer: new FormControl(''),
      dateOfProduction: new FormControl(''),
      serialNumber: new FormControl(''),
      dateOfInstallation: new FormControl(''),
      dateOfFirstUse: new FormControl(''),
      expireYears: new FormControl(''),
      dateOfExpiration: new FormControl(''),
    });
  }

  constructor(private fb: FormBuilder, public equipmentService: EquipmentService) {
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
    console.log(this.equipmentEditForm.get('dateOfExpiration')?.value)
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
    this.equipmentEditForm.reset();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.equipmentEditForm.reset();
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        value: '32',
        remark: `London, Park Lane no. ${this.i}`
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  log(value:EquipmentGroup):void{
    console.log(value);
    this.selectedGroup = value;
  }
}
