import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentsRoutingModule } from './equipments-routing.module';
import { EquipmentsComponent } from './equipments.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EquipmentGroupComponent } from './equipment-group/equipment-group.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@NgModule({
  declarations: [
    EquipmentsComponent,
    EquipmentSearchComponent,
    EquipmentGroupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzFormModule,
    NzListModule,
    NzLayoutModule,
    EquipmentsRoutingModule,
    NzMessageModule
  ]
})
export class EquipmentsModule {}
