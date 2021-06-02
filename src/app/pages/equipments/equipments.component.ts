import {Component, Input, OnInit} from '@angular/core';
import {Equipment} from '../../model/model';
import {EquipmentService} from '../../service/equipment.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss'],
})
export class EquipmentsComponent implements OnInit {
  equipments = Array<Equipment>();
  selectedEquipment!: Equipment;
  idOfSelectedRow = -1;

  constructor(private equipmentService: EquipmentService) {
  }

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
    this.equipmentService.getDataWithParams(api, params).then((result: any) => {
      this.equipments = result.data;
    });
  }

  selectData(data: Equipment): void {
    console.log(data.name);
    this.idOfSelectedRow = data.id;
    if (this.selectedEquipment !== undefined && data.id != this.selectedEquipment.id) {
      this.selectedEquipment.isSelected = false;
    }
    this.selectedEquipment = data;
    data.isSelected = !data.isSelected;
  }

  deleteEquipmentById(): void {
    if (this.idOfSelectedRow === -1) {
      console.log('no data');
    } else {
      console.log('id:', this.idOfSelectedRow);
      alert('是否删除？');
    }
  }
}
