import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor() { }

  fetchEquipments(api: string): any {
    console.log("fetching equipments")
    return new Promise((resolve) => {
      axios.get(api).then(function (response) {
        resolve(response);
      });
    });
  }
}
