import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',

  styleUrls: ['./equipment-search.component.scss']
})
export class EquipmentSearchComponent implements OnInit {
  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? index < 6 : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    for (let i = 0; i < 3; i++) {
      this.controlArray.push({ index: i, show: i < 6 });
      this.validateForm.addControl(`field${i}`, new FormControl());
    }
  }

  search():any{
    console.log(this.validateForm.getRawValue())
  }

  private fetchEquipments(api: string): any {
    console.log("fetching equipments")
    return new Promise((resolve, reject) => {
      axios.get(api).then(function (response) {
        resolve(response);
      });
    });
  }
}
