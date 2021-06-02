import {Injectable} from '@angular/core';
import axios from 'axios';
import {EquipmentGroup} from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {

  constructor() {
  }

  getDataWithParams(api: string, args: any): any {
    console.log('fetching equipments');
    return new Promise((resolve) => {
      axios.get(api, {params: args}).then((response) => {
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

  postData(api: string, arg: any): any {
    console.log('posting data' + arg);
    return new Promise((resolve => {
      axios.post(api, arg).then((response) => {
        resolve(response);
      })
    }))
  }
}