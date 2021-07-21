import {Injectable} from '@angular/core';
import axios from 'axios';
import {EquipmentGroup, Person} from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {

  get api(): string {
    return this._api;
  }

  private _api = "api";
  // private _api = "http://localhost:8091/api";

  constructor() {
  }

  getDataWithParams(api: string, args: any): any {
    return new Promise((resolve) => {
      axios.get(api, {params: args}).then((response) => {
        resolve(response);
      });
    });
  }

  getData(api: string): any {
    return new Promise((resolve) => {
      axios.get(api).then((response) => {
        resolve(response);
      });
    });
  }

  exportData(api:string, args:any, responseType:any):any{
    return new Promise((resolve) => {
      axios.get(api, {params: args, responseType:responseType}).then((response) => {
        resolve(response);
      });
    });
  }

  postData(api: string, arg: any): any {
    return new Promise((resolve => {
      axios.post(api, arg).then((response) => {
        resolve(response);
      })
    }))
  }

  deleteData(api: string): any {
    return new Promise((resolve => {
      axios.delete(api).then((response) => {
        resolve(response);
      })
    }))
  }
}
