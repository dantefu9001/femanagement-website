import { Injectable } from '@angular/core';
import axios from 'axios';

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
}
