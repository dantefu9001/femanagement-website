import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent {

  equipments = Array<any>();

  constructor() {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // var api = 'http://localhost:8080/equipments';
    // this.fetchEquipments(api).then((result: any) => {
    //   this.equipments = result.data;
    // });
  }

  getSearchData():any{

  }

}
