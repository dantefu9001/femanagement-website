import { Component, OnInit } from '@angular/core';
import axios from 'axios';
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
    var api = 'http://localhost:8080/equipments';
    this.fetchEquipments(api).then((result: any) => {
      this.equipments = result.data;
    })
  }

  fetchEquipments(api: string): any {
    return new Promise((resolve, reject) => {
      axios.get(api).then(function (response) {
        resolve(response);
      });
    });
  }

}
