import { Component, Input, OnInit } from '@angular/core';
import { Equipment } from './model/model';
import { EquipmentService } from './service/equipment.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss'],
})
export class EquipmentsComponent implements OnInit {
  equipments = Array<Equipment>();

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.search('', '');
  }

  search(name: string, code: string): void {
    const api = 'http://localhost:8080/equipments';
    const params = {
      equipmentName: name,
      equipmentCode: code,
    };
    this.equipmentService.fetchEquipments(api, params).then((result: any) => {
      this.equipments = result.data;
    });
  }
}
