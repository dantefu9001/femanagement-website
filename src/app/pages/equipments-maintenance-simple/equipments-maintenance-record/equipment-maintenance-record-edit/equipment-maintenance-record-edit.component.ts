import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Equipment, EquipmentsMaintenanceSheet, Person, Process, ProductionLine} from "../../../../model/model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EquipmentsMaintenanceRecordComponent} from "../equipments-maintenance-record.component";
import {EquipmentEditUploadPicComponent} from "../../../equipments/equipment-edit/equipment-edit-upload-pic/equipment-edit-upload-pic.component";
import {EquipmentService} from "../../../../service/equipment.service";

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

  code!: string;
  selectedPerson!: Person;
  personnel!: Array<Person>;
  selectedProductionLine!: ProductionLine;
  productionLines!: Array<ProductionLine>;
  selectedProcess!: Process;
  process!: Array<Process>;
  description!: string;
  equipmentMaintenanceEditForm!: FormGroup;
  selectedEquipmentMaintenanceSheet!: EquipmentsMaintenanceSheet;
  selectedEquipment!: Equipment;
  equipments!: Array<Equipment>;

  showModal(): void {
    if (!this.editable) {
      this.view();
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    if (this.editable) {
      this.add();
    }
    this.isVisible = false;
    this.isOkLoading = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor(public fb: FormBuilder,
              public equipmentService:EquipmentService,
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
      malfunctionTime: [null],
      description: new FormControl('')
    });
    this.fetchPersonnel();
    this.fetchProductionLine();
  }


  add() {
    this.equipmentMaintenanceComponent.listOfData = [
      ...this.equipmentMaintenanceComponent.listOfData,
      {
        id: this.equipmentMaintenanceComponent.listOfData.length + 1,
        code: `Edward King ${this.equipmentMaintenanceComponent.listOfData.length + 1}`,
        productionLine: 'test',
        equipment: 'test',
        nonEquipment: true,
        malfunctionTime: '2021-04-01',
        description: 'test',
        maintenancePerson: 'me',
        malfunctionType: 'broken',
        ratingOfMaintenance: 'good',
        status: 'finished',
        picUrls: [this.uploadPicComponent.url, this.uploadPicComponent2.url]
      }
    ];
  }

  view() {
    if (this.equipmentMaintenanceComponent.setOfCheckedId.size !== 1) {
      alert("请选择一条数据查看");
    } else {
      let selectedId = this.equipmentMaintenanceComponent.setOfCheckedId.values().next().value;
      this.selectedEquipmentMaintenanceSheet = this.equipmentMaintenanceComponent.listOfData.filter(d => d.id === selectedId)[0]
      this.equipmentMaintenanceEditForm.setControl('code', new FormControl(this.selectedEquipmentMaintenanceSheet.code));
      this.equipmentMaintenanceEditForm.setControl('description', new FormControl(this.selectedEquipmentMaintenanceSheet.description));

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
      parentId:this.selectedProductionLine?.id,
    }
    this.equipmentService.getDataWithParams(api,param).then((result: any) => {
      this.process = result.data;
    })
  }

  fetchEquipments() {
    const api = this.equipmentService.api+'/equipments/process='+this.selectedProcess!.id;

    this.equipmentService.getData(api).then((result: any) => {
      this.equipments = result.data;
    });
  }
}
