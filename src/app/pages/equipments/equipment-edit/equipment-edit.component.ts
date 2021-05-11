import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {
  Area,
  Equipment,
  EquipmentGroup,
  Person,
  Process,
  SelfDefinedAttribute,
  Station,
  Status,
  Workshop
} from '../model/model';
import {EquipmentService} from '../service/equipment.service';
import {EquipmentsComponent} from "../equipments.component";

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
})
export class EquipmentEditComponent implements OnInit {
  @Input() title:any;
  @Input() isEdit = false;
  @Input() equipmentsComponent :EquipmentsComponent;
  i = 0;
  editId: string | null = null;
  isVisible = false;
  isOkLoading = false;
  equipmentEditForm!: FormGroup
  selfDefinedAttributes : SelfDefinedAttribute[] = []
  equipmentGroups = Array<EquipmentGroup>();

  //mock data
  responsibilities = [{name: 'alan'}];
  workshops = [{name: 'shop1'}];
  areas = [{name: 'area1'}];
  process = [{name: '焊接'}];
  stations = [{name: '焊接'}];
  status = [{name: '待投入'}];

  //选中的对象
  selectedGroup!:EquipmentGroup;
  selectedPerson!: Person;
  selectedWorkshops!: Workshop;
  selectedArea!: Area;
  selectedProcess!: Process;
  selectedStation!: Station;
  selectedStatus!: Status;

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
      dateOfProduction: [null],
      serialNumber: new FormControl(''),
      dateOfInstallation: new FormControl(''),
      dateOfFirstUse: new FormControl(''),
      expireYears: new FormControl(''),
      dateOfExpiration: new FormControl(''),
    });
  }

  constructor(private fb: FormBuilder, public equipmentService: EquipmentService, equipmentsComponent: EquipmentsComponent) {
    this.equipmentsComponent = equipmentsComponent;
  }

  fetchEquipmentGroups(): void {
    const api = 'http://localhost:8080/equipment-groups';
    this.equipmentService.getData(api).then((result: any) => {
      this.equipmentGroups = result.data;
    });
  }

  saveEquipments(equipment: Equipment) {
    const api = 'http://localhost:8080/equipments';
    this.equipmentService.postData(api, equipment).then((result: any) => {
      console.log(result);
      this.isVisible = false;
      this.isOkLoading = false;
    })
  }

  buildEquipment(): Equipment {
    return {
      asset: "",
      customAttributes: "",
      dateOfProduction: this.equipmentEditForm.get('dateOfProduction')?.value?.toISOString(),
      dateOfExpiration: this.equipmentEditForm.get('dateOfExpiration')?.value?.toString(),
      dateOfFirstUse: this.equipmentEditForm.get('dateOfFirstUse')?.value?.toString(),
      dateOfInstallation: this.equipmentEditForm.get('dateOfInstallation')?.value?.toString(),
      description: "",
      enterprise: "",
      equipmentGroups: "",
      expireYears: "",
      isAutoDispatch: "",
      isDelete: "0",
      manufacturer: "",
      model: "",
      process: this.selectedProcess?.name,
      productionLine: "",
      responsible: this.selectedPerson?.name,
      serialNumber: "",
      specification: "",
      status: '',
      id: 18,
      name: '',
      code: this.equipmentEditForm.get('code')?.value
    };
  }

  showModal(): void {
    const selectedEquipment = this.equipmentsComponent.selectedEquipment;
    if(undefined===selectedEquipment && this.isEdit){
      alert("请选择设备")
    }else {
      this.isVisible = true;
      console.log(this.equipmentsComponent.selectedEquipment);
    }
  }

  handleOk(): void {
    console.log(this.equipmentEditForm.get('dateOfExpiration')?.value);
    this.isOkLoading = true;
    this.saveEquipments(this.buildEquipment());
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
    this.selfDefinedAttributes = [
      ...this.selfDefinedAttributes,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        value: '32',
        remark: `London, Park Lane no. ${this.i}`,
      },
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.selfDefinedAttributes = this.selfDefinedAttributes.filter(d => d.id !== id);
  }

  setGroup(value: EquipmentGroup): void {
    this.selectedGroup = value;
    console.log(this.selectedGroup);
  }

  setPerson(value: Person) {
    this.selectedPerson = value;
  }

  setWorkshops(value: Workshop) {
    this.selectedWorkshops = value;
  }

  setArea(value: Area) {
    this.selectedArea = value;
  }

  setProcess(value: Process) {
    this.selectedProcess = value;
  }

  setStation(value: Station) {
    this.selectedStation = value;
  }

  setStatus(value: Status) {
    this.selectedStatus = value;
  }
}
