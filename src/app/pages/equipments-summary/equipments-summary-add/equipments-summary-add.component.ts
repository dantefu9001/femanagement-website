import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EquipmentsSummary, Group, Person, summaryType} from "../../../model/model";
import {EquipmentService} from "../../../service/equipment.service";
import {EquipmentsSummaryComponent} from "../equipments-summary.component";



@Component({
  selector: 'app-equipments-summary-add',
  templateUrl: './equipments-summary-add.component.html',
  styleUrls: ['./equipments-summary-add.component.scss']
})
export class EquipmentsSummaryAddComponent implements OnInit {
  @Input() equipmentsSummaryComponent: EquipmentsSummaryComponent;
  summaryForm!: FormGroup;
  summary!: string;

  selectedGroup!: Group;
  groups: Array<Group> = [
    {id: 1, name: '设备组1'},
    {id: 2, name: '设备组2'}
  ];

  selectedType!: summaryType;
  summaryTypes = [{
    name: '月总结',
    value: 'monthly'
  }, {
    name: '周总结',
    value: 'weekly'
  }];
  personnel: Person = {
    id: '0',
    name: '张三'
  };

  constructor(public fb: FormBuilder, public equipmentService: EquipmentService, equipmentsSummaryComponent: EquipmentsSummaryComponent) {
    this.equipmentsSummaryComponent = equipmentsSummaryComponent;
  }

  ngOnInit(): void {
    this.summaryForm = this.fb.group({
      "dateOfSummary": [null],
      "summary": new FormControl('')
    })
  }

  addEquipmentSummary(): void {
    let equipmentsSummary = {
      type: this.selectedType,
      group: this.selectedGroup,
      personnel: this.personnel.id,
      summaryTime: this.summaryForm.get('dateOfSummary')?.value,
      summary: this.summaryForm.get('summary')?.value
    }
    const api = this.equipmentService.api+'/equipments-summary';
    this.equipmentService.postData(api, equipmentsSummary).then((result: any) => {
      console.log(result);
      this.equipmentsSummaryComponent.getEquipmentSummary();
    })
  }
}
