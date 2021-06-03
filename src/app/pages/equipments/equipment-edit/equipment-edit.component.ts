import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EquipmentsComponent} from "../equipments.component";
import {EquipmentAttributesTableComponent} from "./equipment-attributes-table/equipment-attributes-table.component";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {EquipmentParamsComponent} from "../equipment-params/equipment-params.component";
import {Area, Equipment, EquipmentGroup, Person, Process, Station, Status, Workshop} from "../../../model/model";
import {EquipmentService} from "../../../service/equipment.service";

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.scss']
})
export class EquipmentEditComponent implements OnInit {
  @Input() title: any;
  @Input() isEdit = false;
  @Input() equipmentsComponent: EquipmentsComponent;
  @ViewChild('attributesTableComponent') attributesTableComponent!: EquipmentAttributesTableComponent;
  @ViewChild('equipmentParamsComponent') equipmentParamsComponent!: EquipmentParamsComponent;
  confirmModal?: NzModalRef;
  isVisible = false;
  isOkLoading = false;
  equipmentEditForm!: FormGroup
  equipmentGroups = Array<EquipmentGroup>();

  //mock data
  responsibilities = [{name: 'alan'}];
  workshops = [{name: 'shop1'}];
  areas = [{name: 'area1'}];
  process = [{name: '焊接'}];
  stations = [{name: '焊接'}];
  status = [{name: '待投入'}];

  //选中的对象
  selectedGroup!: EquipmentGroup;
  selectedPerson!: Person;
  selectedWorkshops!: Workshop;
  selectedArea!: Area;
  selectedProcess!: Process;
  selectedStation!: Station;
  selectedStatus!: Status;
  selectedEquipment!: Equipment;
  dateOfProduction!: Date;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchEquipmentGroups();
    this.equipmentEditForm = this.fb.group({
      name: new FormControl(''),
      code: new FormControl(''),
      equipmentModel: new FormControl(''),
      specification: new FormControl(''),
      manufacturer: new FormControl(''),
      dateOfProduction: [null],
      serialNumber: new FormControl(''),
      dateOfInstallation:  [null],
      dateOfFirstUse:  [null],
      expireYears: new FormControl(''),
      dateOfExpiration: [null],
      description: new FormControl('')
    });
  }

  constructor(private fb: FormBuilder,
              private modal: NzModalService,
              public equipmentService: EquipmentService,
              equipmentsComponent: EquipmentsComponent) {
    this.equipmentsComponent = equipmentsComponent;
  }

  fetchEquipmentGroups(): void {
    const api = 'http://localhost:8080/equipment-groups';
    this.equipmentService.getData(api).then((result: any) => {
      this.equipmentGroups = result.data;
    });
  }

  saveEquipments(equipment: Equipment) {
    if (this.isEdit) {
      const api = 'http://localhost:8080/equipments/update';
      this.equipmentService.postData(api, equipment).then((result: any) => {
        console.log(result);
        this.isVisible = false;
        this.isOkLoading = false;
        this.equipmentsComponent.search('', '');
      })
    }else{
      const api = 'http://localhost:8080/equipments';
      this.equipmentService.postData(api, equipment).then((result: any) => {
        console.log(result);
        this.isVisible = false;
        this.isOkLoading = false;
        this.equipmentsComponent.search('', '');
      })
    }

  }

  buildEquipment(): Equipment {
    return {
      id: this.isEdit ? this.selectedEquipment.id : -1,
      name: this.equipmentEditForm.get('name')?.value,
      code: this.equipmentEditForm.get('code')?.value,
      isSelected:false,
      asset: "",
      customAttributes: "",
      dateOfProduction: this.dateOfProduction,
      dateOfExpiration: this.equipmentEditForm.get('dateOfExpiration')?.value?.toISOString(),
      dateOfFirstUse: this.equipmentEditForm.get('dateOfFirstUse')?.value?.toISOString(),
      dateOfInstallation: this.equipmentEditForm.get('dateOfInstallation')?.value?.toISOString(),
      description: this.equipmentEditForm.get('name')?.value,
      enterprise: "",
      equipmentGroup: this.selectedGroup?.name,
      expireYears: this.equipmentEditForm.get('expireYears')?.value,
      isAutoDispatch: 0,
      isDelete: "0",
      manufacturer: this.equipmentEditForm.get('manufacturer')?.value,
      model: this.equipmentEditForm.get('model')?.value,
      process: this.selectedProcess?.name,
      productionLine: "",
      responsible: this.selectedPerson?.name,
      serialNumber: this.equipmentEditForm.get('serialNumber')?.value,
      specification: this.equipmentEditForm.get('specification')?.value,
      status: this.selectedStatus?.value,
    };
  }

  showModal(): void {
    this.selectedEquipment = this.equipmentsComponent.selectedEquipment;
    if (this.isEdit) {
      if (undefined === this.selectedEquipment) {
        alert("请选择设备");
      }
      this.setupEquipment(this.selectedEquipment)
    }
      this.isVisible = true;
      console.log(this.equipmentsComponent.selectedEquipment);

  }

  private setupEquipment(selectedEquipment: Equipment) {
    this.equipmentEditForm.setControl('code', new FormControl(selectedEquipment.code));
    this.equipmentEditForm.setControl('name', new FormControl(selectedEquipment.name));
    this.equipmentEditForm.setControl('dateOfProduction', new FormControl(selectedEquipment.dateOfProduction));

  }

  handleOk(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '提示',
      nzContent: '是否配置设备能力和参数',
      nzOkText: '配置参数',
      nzOnOk: () => {
        this.equipmentParamsComponent.showModal();
      },
      nzCancelText: '直接保存',
      nzOnCancel: () => {
        console.log(this.equipmentEditForm.get('dateOfExpiration')?.value);
        this.isOkLoading = true;
        this.saveEquipments(this.buildEquipment());
        this.equipmentEditForm.reset();
      }
    });
    this.clearSelectedData();
  }

  handleCancel(): void {
    console.log(this.attributesTableComponent.selfDefinedAttributes)
    this.isVisible = false;
    this.equipmentEditForm.reset();
    this.clearSelectedData();
  }

  clearSelectedData(): void{
  }
}
