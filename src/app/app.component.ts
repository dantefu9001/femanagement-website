import {Component, Input, OnInit} from '@angular/core';
import {BasicDataConfigsComponent} from "./pages/basicdata/basic-data-configs/basic-data-configs.component";
import {EquipmentService} from "./service/equipment.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @Input()  basicDataConfigsComponent: BasicDataConfigsComponent;
  isEasyMode = false;
  isCollapsed = false;
  isAutoDispatch = false;
  enableEquipmentManagement = false;

  constructor(private equipmentService: EquipmentService, basicDataConfigsComponent: BasicDataConfigsComponent) {
    this.basicDataConfigsComponent = basicDataConfigsComponent;
  }

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData() {
    let api = this.equipmentService.api + '/config';
    this.equipmentService.getData(api).then((result: any) => {
      let resultData = result.data;
      if (result.data !== undefined) {
        this.isEasyMode = resultData.easyMode;
        this.isAutoDispatch = resultData.autoDispatch;
        // this.enableValidate = resultData.enableValidation;
        // this.enableAlarm = resultData.maintenanceAlarm;
        // this.waitTime = resultData.waitTime;
        // this.pauseTime = resultData.downTime;
        // this.dispatchTime = resultData.dispatchTime;
        // this.malfunctionTypes = JSON.parse(resultData.malfunctionType);
        // this.malfunctionLevels = JSON.parse(resultData.malfunctionLevel);
        this.enableEquipmentManagement = resultData.equipmentSummary;
        // this.enableSparePartsManagement = resultData.sparePartManagement;
      }
    }).catch((e: Error) => {
      console.error(e.message);
    })
  }


}
