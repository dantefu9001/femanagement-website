import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EquipmentsMaintenanceRecordComponent} from "../equipments-maintenance-simple/equipments-maintenance-record/equipments-maintenance-record.component";

const routes: Routes = [
  {path:'record-standard',component:EquipmentsMaintenanceRecordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentsMaintenanceStandardRoutingModule { }
