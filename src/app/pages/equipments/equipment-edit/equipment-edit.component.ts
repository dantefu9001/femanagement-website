import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EquipmentsComponent} from "../equipments.component";
import {EquipmentAttributesTableComponent} from "./equipment-attributes-table/equipment-attributes-table.component";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {EquipmentParamsComponent} from "../equipment-params/equipment-params.component";
import {
  Area,
  Asset,
  Equipment,
  EquipmentGroup,
  Person,
  Process,
  ProductionLine,
  SelfDefinedAttribute,
  Status
} from "../../../model/model";
import {EquipmentService} from "../../../service/equipment.service";
import {EquipmentEditUploadPicComponent} from "./equipment-edit-upload-pic/equipment-edit-upload-pic.component";
import {NzMessageService} from "ng-zorro-antd/message";
import {EquipmentEditUploadFileComponent} from "./equipment-edit-upload-file/equipment-edit-upload-file.component";

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
  @ViewChild('equipmentEditUploadPicComponent') equipmentEditUploadPicComponent!: EquipmentEditUploadPicComponent;
  @ViewChild('equipmentManifest') equipmentManifest!:EquipmentEditUploadFileComponent;
  @ViewChild('maintenanceManifest') maintenanceManifest!:EquipmentEditUploadFileComponent;
  confirmModal?: NzModalRef;
  isVisible = false;
  isOkLoading = false;
  equipmentEditForm!: FormGroup
  equipmentGroups = Array<EquipmentGroup>();
  responsibilities = Array<Person>();
  productionLine = Array<ProductionLine>();
  areas = Array<Area>();
  process = Array<Process>();
  asset = Array<Asset>();
  status: Array<Status> = [
    {
      id: '1',
      value: '?????????'
    }
  ];

  //???????????????
  selectedGroup!: EquipmentGroup;
  selectedPerson!: Person;
  selectedProductionLine!: ProductionLine;
  selectedArea!: Area;
  selectedProcess!: Process;
  selectedAsset!: Asset;
  selectedStatus!: Status;
  selectedEquipment!: Equipment;
  productionDate!: Date;
  expirationDate!: Date;
  firstUseDate!: Date;
  installationDate!: Date;

  //???????????????:
  selfDefinedAttributes!: SelfDefinedAttribute[];

  ngOnInit(): void {
    this.getDropDowns();
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
      dateOfInstallation: [null],
      dateOfFirstUse: [null],
      dateOfExpiration: [null],
    });
  }

  constructor(private fb: FormBuilder,
              private modal: NzModalService,
              public nzMsgService:NzMessageService,
              public equipmentService: EquipmentService,
              equipmentsComponent: EquipmentsComponent) {
    this.equipmentsComponent = equipmentsComponent;
  }

  saveEquipments(equipment: Equipment) {
    if (this.isEdit) {
      const api = this.equipmentService.api+'/equipments/update';
      this.equipmentService.postData(api, equipment).then((result: any) => {
        console.log(result);
        this.isVisible = false;
        this.isOkLoading = false;
        this.equipmentsComponent.search(null!, null!, null!, this.equipmentsComponent.selectedGroup?.id);
      })
    } else {
      const api = this.equipmentService.api+'/equipments';
      this.equipmentService.postData(api, equipment).then((result: any) => {
        console.log(result);
        this.isVisible = false;
        this.isOkLoading = false;
        this.equipmentsComponent.search(null!, null!, null!, this.equipmentsComponent.selectedGroup?.id);
      })
    }

  }

  showModal(): void {
    this.selectedEquipment = this.equipmentsComponent.selectedEquipment;
    if (this.isEdit) {
      if (undefined === this.selectedEquipment) {
        this.nzMsgService.error("???????????????");
      }
      this.setupEquipment(this.selectedEquipment)
    }
    this.isVisible = true;
    console.log(this.equipmentsComponent.selectedEquipment);
  }

  private getDropDowns() {
    this.fetchEquipmentGroups();
    this.fetchPersonnel();
    this.fetchWorkshop();
    this.fetchProcess();
    this.fetchAsset();
  }

  handleOk(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '??????',
      nzContent: '?????????????????????????????????',
      nzOkText: '????????????',
      nzOnOk: () => {
        this.equipmentParamsComponent.showModal();
      },
      nzCancelText: '????????????',
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

  clearSelectedData(): void {
  }

  fetchEquipmentGroups(): void {
    const api = this.equipmentService.api+'/equipment-groups';
    this.equipmentService.getData(api).then((result: any) => {
      this.equipmentGroups = result.data;
    });
  }

  fetchPersonnel(): void {
    const api = this.equipmentService.api+'/personnel/list';
    this.equipmentService.getData(api).then((result: any) => {
      this.responsibilities = result.data;
    })
  }

  fetchWorkshop(): void {
    const api = this.equipmentService.api+'/production-line/list';
    this.equipmentService.getData(api).then((result: any) => {
      this.productionLine = result.data;
    })
  }

  fetchProcess(): void {
    const api = this.equipmentService.api+'/process/list';
    this.equipmentService.getData(api).then((result: any) => {
      this.process = result.data;
    })
  }

  fetchAsset(): void {
    const api = this.equipmentService.api+'/asset/list';
    this.equipmentService.getData(api).then((result: any) => {
      this.asset = result.data;
    })
  }

  buildEquipment(): Equipment {
    return {
      id: this.isEdit ? this.selectedEquipment.id : -1,
      picture: this.equipmentEditUploadPicComponent.url!,
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
      equipmentGroup: this.selectedGroup,
      process: this.selectedProcess,
      asset: this.selectedAsset,
      productionLine: this.selectedProductionLine,
      responsible: this.selectedPerson,
      status: this.selectedStatus?.value,
      isSelected: false,
      isAutoDispatch: 0,
      isDelete: "0",
      customAttributes: JSON.stringify(this.attributesTableComponent.selfDefinedAttributes),
      enterprise: "",
      equipmentManifest:this.equipmentManifest.url!,
      maintenanceManifest:this.maintenanceManifest.url!
    };
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
    this.selectedGroup = this.equipmentGroups.find(g => g.id == selectedEquipment.equipmentGroup?.id)!;
    this.selectedProductionLine = this.productionLine.find(a => a.id == selectedEquipment.productionLine?.id)!;
    this.selectedPerson = this.responsibilities.find(p => p.id == selectedEquipment.responsible?.id)!;
    this.selectedProcess = this.process.find(p => p.id == selectedEquipment.process?.id)!;
    this.selectedAsset = this.asset.find(a => a.id == selectedEquipment.asset?.id)!
    this.selectedStatus = this.status.find(s => s.id == selectedEquipment.status)!;
    this.attributesTableComponent.selfDefinedAttributes = JSON.parse(selectedEquipment.customAttributes) as SelfDefinedAttribute[]
    this.equipmentEditUploadPicComponent.url = this.selectedEquipment.picture!;
  }
}
