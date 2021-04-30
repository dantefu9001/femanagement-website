import { Injectable } from '@angular/core';
import axios from 'axios';
import { EquipmentGroup } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {

  constructor() {}

  getDataWithParams(api: string, args: any): any {
    console.log('fetching equipments');
    return new Promise((resolve) => {
      axios.get(api, { params: args }).then((response) => {
        resolve(response);
      });
    });
  }

  getData(api: string): any {
    console.log('fetching equipments');
    return new Promise((resolve) => {
      axios.get(api).then((response) => {
        resolve(response);
      });
    });
  }

  fetchEquipmentGroups(): Array<EquipmentGroup> {
    const api = 'http://localhost:8080/equipment-groups';
    let equipmentGroups = Array<EquipmentGroup>();

    this.getData(api).then((result: any) => {
      equipmentGroups = result.data;
    });
    return equipmentGroups;
  }
}
