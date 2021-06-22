import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Equipment, EquipmentsMaintenanceSheet, Person, Process, ProductionLine} from "../../../../model/model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EquipmentsMaintenanceRecordComponent} from "../equipments-maintenance-record.component";
import {EquipmentEditUploadPicComponent} from "../../../equipments/equipment-edit/equipment-edit-upload-pic/equipment-edit-upload-pic.component";
import {EquipmentService} from "../../../../service/equipment.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-equipment-maintenance-record-edit',
  templateUrl: './equipment-maintenance-record-edit.component.html',
  styleUrls: ['./equipment-maintenance-record-edit.component.scss']
})
export class EquipmentMaintenanceRecordEditComponent implements OnInit {

  @ViewChild('uploadPicComponent1') uploadPicComponent: EquipmentEditUploadPicComponent;
  @ViewChild('uploadPicComponent2') uploadPicComponent2: EquipmentEditUploadPicComponent;
  @Input() editable: boolean = false;
  @Input() equipmentMaintenanceComponent: EquipmentsMaintenanceRecordComponent;
  isVisible = false;
  isOkLoading = false;

  randomCode!: string;
  selectedPerson!: Person;
  personnel!: Array<Person>;
  selectedProductionLine!: ProductionLine;
  productionLines!: Array<ProductionLine>;
  selectedProcess!: Process;
  process!: Array<Process>;
  equipmentMaintenanceEditForm!: FormGroup;
  selectedEquipmentMaintenanceSheet!: EquipmentsMaintenanceSheet;
  selectedEquipment!: Equipment;
  equipments!: Array<Equipment>;
  malfunctionDate!: Date;

  showModal(): void {
    this.initData();
    if (!this.editable) {
      this.view();
    } else {
      this.equipmentMaintenanceEditForm.setControl('code', new FormControl(Date.now().toString()));
      this.isVisible = true;
    }

  }

  private initData() {
    this.fetchPersonnel();
    this.fetchProductionLine();
  }

  handleOk(): void {
    this.isOkLoading = true;
    if (this.editable) {
      this.add();
    } else {
      this.isVisible = false;
      this.isOkLoading = false;
      this.clearForm();
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.clearForm();
  }

  private clearForm() {
    this.equipmentMaintenanceEditForm.reset();
    this.selectedPerson = null!;
    this.selectedProductionLine = null!;
    this.selectedProcess = null!;
    this.selectedEquipment = null!;
    this.productionLines = [];
    this.personnel = [];
    this.process = [];
    this.equipments = [];
    this.randomCode = '';
  }

  constructor(public fb: FormBuilder,
              public equipmentService: EquipmentService,
              public nzMsgService: NzMessageService,
              equipmentEditUploadPicComponent1: EquipmentEditUploadPicComponent,
              equipmentEditUploadPicComponent2: EquipmentEditUploadPicComponent,
              public equipmentsMaintenanceRecordComponent: EquipmentsMaintenanceRecordComponent) {
    this.equipmentMaintenanceComponent = equipmentsMaintenanceRecordComponent;
    this.uploadPicComponent = equipmentEditUploadPicComponent1;
    this.uploadPicComponent2 = equipmentEditUploadPicComponent2;
  }

  ngOnInit(): void {
    this.equipmentMaintenanceEditForm = this.fb.group({
      code: new FormControl(''),
      personnel: new FormControl(''),
      workshop: new FormControl(''),
      area: new FormControl(''),
      process: new FormControl(''),
      equipment: new FormControl(''),
      dateOfMalfunction: new FormControl(''),
      description: new FormControl('')
    });
  }


  add() {
    let param =
      {
        code: this.randomCode,
        productionLine: this.selectedProductionLine,
        process: this.selectedProcess,
        equipment: this.selectedEquipment,
        submitter: this.selectedPerson,
        nonEquipment: true,
        malfunctionTime: this.malfunctionDate,
        description: this.equipmentMaintenanceEditForm.get('description')?.value,
        picUrls: [this.uploadPicComponent.url, this.uploadPicComponent2.url]
      } as EquipmentsMaintenanceSheet;
    const api = this.equipmentService.api + '/maintenance/submitter';
    this.equipmentService.postData(api, param).then((result: any) => {
      console.log(result.code);
      this.isVisible = false;
      this.isOkLoading = false;
      this.clearForm();
      this.equipmentsMaintenanceRecordComponent.resetAndSearch();
    })

  }

  view() {
    if (this.equipmentMaintenanceComponent.setOfCheckedId.size !== 1) {
      this.nzMsgService.error("请选择一条数据查看");
    } else {
      let selectedId = this.equipmentMaintenanceComponent.setOfCheckedId.values().next().value;
      this.selectedEquipmentMaintenanceSheet = this.equipmentMaintenanceComponent.listOfData.filter(d => d.id === selectedId)[0]
      this.equipmentMaintenanceEditForm.setControl('code', new FormControl(this.selectedEquipmentMaintenanceSheet.code));
      this.equipmentMaintenanceEditForm.setControl('description', new FormControl(this.selectedEquipmentMaintenanceSheet.description));

      this.selectedPerson = this.selectedEquipmentMaintenanceSheet.submitter!;
      this.personnel = [...[this.selectedPerson]];

      this.selectedProcess = this.selectedEquipmentMaintenanceSheet.process!;
      this.process = [...[this.selectedProcess]]

      this.selectedProductionLine = this.selectedEquipmentMaintenanceSheet.productionLine;
      this.productionLines = [...[this.selectedProductionLine]];

      this.selectedEquipment = this.selectedEquipmentMaintenanceSheet.equipment;
      this.equipments = [...[this.selectedEquipment]]

      this.uploadPicComponent.url = this.selectedEquipmentMaintenanceSheet.picUrls?.pop()!
      this.uploadPicComponent2.url = this.selectedEquipmentMaintenanceSheet.picUrls?.pop()!
      this.equipmentMaintenanceEditForm.setControl('malfunctionTime', new FormControl(this.selectedEquipmentMaintenanceSheet.malfunctionTime))
      this.isVisible = true;
    }
  }

  private fetchPersonnel(): void {
    const api = this.equipmentService.api + '/personnel/list';
    this.equipmentService.getData(api).then((result: any) => {
      this.personnel = result.data;
    })
  }

  private fetchProductionLine() {
    const api = this.equipmentService.api + '/production-line/list';
    this.equipmentService.getData(api).then((result: any) => {
      this.productionLines = result.data;
    })
  }

  fetchProcess(): void {
    const api = this.equipmentService.api + '/plant/process/list';
    let param = {
      parentId: this.selectedProductionLine?.id,
    }
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.process = result.data;
    })
  }

  fetchEquipments() {
    const api = this.equipmentService.api + '/equipments/process=' + this.selectedProcess!.id;

    this.equipmentService.getData(api).then((result: any) => {
      this.equipments = result.data;
    });
  }
}
