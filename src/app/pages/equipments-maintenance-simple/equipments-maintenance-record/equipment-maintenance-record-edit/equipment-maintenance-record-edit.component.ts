import {Component, Input, OnInit} from '@angular/core';
import {EquipmentsMaintenanceSheet, Person, Process, ProductionLine} from "../../../../model/model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EquipmentsMaintenanceRecordComponent} from "../equipments-maintenance-record.component";

@Component({
  selector: 'app-equipment-maintenance-record-edit',
  templateUrl: './equipment-maintenance-record-edit.component.html',
  styleUrls: ['./equipment-maintenance-record-edit.component.scss']
})
export class EquipmentMaintenanceRecordEditComponent implements OnInit {
  @Input() editable: boolean = false;
  @Input() equipmentMaintenanceComponent: EquipmentsMaintenanceRecordComponent;
  isVisible = false;
  isOkLoading = false;

  code!: string;
  selectedPerson!: Person;
  personnel!: Array<Person>;
  selectedWorkshops!: ProductionLine;
  workshops!: Array<ProductionLine>;
  selectedProcess!: Process;
  process!: Array<Process>;
  description!: string;
  equipmentMaintenanceEditForm!: FormGroup;
  selectedEquipmentMaintenanceSheet!: EquipmentsMaintenanceSheet;

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

  constructor(public fb: FormBuilder, public equipmentsMaintenanceRecordComponent: EquipmentsMaintenanceRecordComponent) {
    this.equipmentMaintenanceComponent = equipmentsMaintenanceRecordComponent;
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
    })
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
        status: 'finished'
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
}
