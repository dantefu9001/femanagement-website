import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EquipmentsRoutingModule} from './equipments-routing.module';
import {EquipmentsComponent} from './equipments.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzListModule} from 'ng-zorro-antd/list';
import {EquipmentSearchComponent} from './equipment-search/equipment-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EquipmentGroupComponent} from './equipment-group/equipment-group.component';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {EquipmentEditComponent} from './equipment-edit/equipment-edit.component';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {EquipmentAttributesTableComponent} from './equipment-edit/equipment-attributes-table/equipment-attributes-table.component';
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzPopoverModule} from "ng-zorro-antd/popover";

@NgModule({
  declarations: [
    EquipmentsComponent,
    EquipmentSearchComponent,
    EquipmentGroupComponent,
    EquipmentEditComponent,
    EquipmentAttributesTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzFormModule,
    NzListModule,
    NzLayoutModule,
    NzModalModule,
    EquipmentsRoutingModule,
    NzMessageModule,
    NzSelectModule,
    NzDatePickerModule
  ],
  providers:[
    EquipmentGroupComponent
  ]
})
export class EquipmentsModule {}
