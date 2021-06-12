import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {EquipmentsSummaryRoutingModule} from "./equipments-summary-routing.module";
import { EquipmentsSummaryComponent } from './equipments-summary.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {EquipmentsSummaryAddComponent} from "./equipments-summary-add/equipments-summary-add.component";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
  declarations: [
    EquipmentsSummaryComponent,
    EquipmentsSummaryAddComponent,
  ],
  imports: [
    CommonModule,
    EquipmentsSummaryRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzIconModule,
    FormsModule,
    NzSelectModule,
    NzDatePickerModule,
    NzSpaceModule,
    NzModalModule,
  ],
  providers:[
  ]
})
export class EquipmentsSummaryModule {
}
