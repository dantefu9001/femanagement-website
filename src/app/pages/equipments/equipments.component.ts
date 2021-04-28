import { Component, Input, OnInit } from '@angular/core';
import { EquipmentService } from './service/equipment.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent {

  equipments = Array<any>();

  constructor(private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.search();
  }

  search(): void {
    var api = 'http://localhost:8080/equipments';
    this.equipmentService.fetchEquipments(api)
      .then((result: any) => {
        this.equipments = result.data
      });
  }
}
