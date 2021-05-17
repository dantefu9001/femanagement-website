import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicdataConfigsComponent} from './basicdata-configs/basicdata-configs.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzListModule} from "ng-zorro-antd/list";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {BasicdataRoutingModule} from "./basicdata-routing.module";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  declarations: [
    BasicdataConfigsComponent,
  ],
  imports: [
    CommonModule,
    BasicdataRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzFormModule,
    NzListModule,
    NzLayoutModule,
    NzModalModule,
    NzMessageModule,
    NzSelectModule,
    NzDatePickerModule,
    NzUploadModule,
    NzCheckboxModule,
    NzSwitchModule,
    NzCardModule,
    NzIconModule
  ]
})
export class BasicdataModule { }
