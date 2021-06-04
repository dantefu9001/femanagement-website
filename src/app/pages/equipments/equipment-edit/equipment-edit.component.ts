import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EquipmentsComponent} from "../equipments.component";
import {EquipmentAttributesTableComponent} from "./equipment-attributes-table/equipment-attributes-table.component";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {EquipmentParamsComponent} from "../equipment-params/equipment-params.component";
import {Area, Equipment, EquipmentGroup, Person, Process, Station, Status, Workshop} from "../../../model/model";
import {EquipmentService} from "../../../service/equipment.service";
import {EquipmentEditUploadPicComponent} from "./equipment-edit-upload-pic/equipment-edit-upload-pic.component";

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
  @ViewChild('equipmentEditUploadPicComponent') equipmentEditUploadPicComponent!:EquipmentEditUploadPicComponent;
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
  productionDate!: Date;
  expirationDate!:Date;
  firstUseDate!:Date;
  installationDate!:Date;

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
      serialNumber: new FormControl(''),
      expiresYears: new FormControl(''),
      description: new FormControl(''),
      dateOfProduction: [null],
      dateOfInstallation:  [null],
      dateOfFirstUse:  [null],
      dateOfExpiration: [null],
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
      picture:this.equipmentEditUploadPicComponent.fileList[0]?.response?.data,
      name: this.equipmentEditForm.get('name')?.value,
      code: this.equipmentEditForm.get('code')?.value,
      dateOfProduction: this.productionDate,
      dateOfExpiration: this.expirationDate,
      dateOfFirstUse: this.firstUseDate,
      dateOfInstallation: this.installationDate,
      description: this.equipmentEditForm.get('description')?.value,
      expiresYears: this.equipmentEditForm.get('expiresYears')?.value,
      manufacturer: this.equipmentEditForm.get('manufacturer')?.value,
      model: this.equipmentEditForm.get('equipmentModel')?.value,
      serialNumber: this.equipmentEditForm.get('serialNumber')?.value,
      specification: this.equipmentEditForm.get('specification')?.value,
      equipmentGroup: this.selectedGroup?.name,
      process: this.selectedProcess?.name,
      station: this.selectedStation?.name,
      workshop: this.selectedWorkshops?.name,
      responsible: this.selectedPerson?.name,
      status: this.selectedStatus?.value,
      isSelected:false,
      isAutoDispatch: 0,
      isDelete: "0",
      customAttributes: "",
      enterprise: "",
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
    this.equipmentEditForm.setControl('dateOfExpiration', new FormControl(selectedEquipment.dateOfExpiration));
    this.equipmentEditForm.setControl('dateOfFirstUse', new FormControl(selectedEquipment.dateOfFirstUse));
    this.equipmentEditForm.setControl('dateOfInstallation', new FormControl(selectedEquipment.dateOfInstallation));
    this.equipmentEditForm.setControl('description', new FormControl(selectedEquipment.description));
    this.equipmentEditForm.setControl('expiresYears', new FormControl(selectedEquipment.expiresYears));
    this.equipmentEditForm.setControl('manufacturer', new FormControl(selectedEquipment.manufacturer));
    this.equipmentEditForm.setControl('equipmentModel', new FormControl(selectedEquipment.model));
    this.equipmentEditForm.setControl('serialNumber', new FormControl(selectedEquipment.serialNumber));
    this.equipmentEditForm.setControl('specification', new FormControl(selectedEquipment.specification));
    this.equipmentEditForm.setControl('equipmentGroup', new FormControl(selectedEquipment.equipmentGroup));
    this.equipmentEditForm.setControl('process', new FormControl(selectedEquipment.process));
    this.equipmentEditForm.setControl('station', new FormControl(selectedEquipment.station));
    this.equipmentEditForm.setControl('workshop', new FormControl(selectedEquipment.workshop));
    this.equipmentEditForm.setControl('responsible', new FormControl(selectedEquipment.responsible));
    this.equipmentEditForm.setControl('status', new FormControl(selectedEquipment.status));
    this.equipmentEditForm.setControl('workshop', new FormControl(selectedEquipment.workshop));

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
