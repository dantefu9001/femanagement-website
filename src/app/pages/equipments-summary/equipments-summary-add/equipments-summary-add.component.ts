import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Person} from "../../equipments/model/model";

interface Group {
  name: string,
  id: number
}

@Component({
  selector: 'app-equipments-summary-add',
  templateUrl: './equipments-summary-add.component.html',

  styleUrls: ['./equipments-summary-add.component.scss']
})
export class EquipmentsSummaryAddComponent implements OnInit {
  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  selectedGroup!: Group;
  groups: Array<Group> = [
    {id: 1, name: '设备组1'},
    {id: 2, name: '设备组2'}
  ];
  summaryTypes = [{
    name: '月总结',
    value: 'monthly'
  }, {
    name: '周总结',
    value: 'weekly'
  }];
  selectedType = this.summaryTypes[0];
  personnel: Person= {
    id:'0',
    name:'张三'
  };
  summary!: string;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    for (let i = 0; i < 10; i++) {
      this.controlArray.push({index: i, show: i < 6});
      this.validateForm.addControl(`field${i}`, new FormControl());
    }
  }
}
