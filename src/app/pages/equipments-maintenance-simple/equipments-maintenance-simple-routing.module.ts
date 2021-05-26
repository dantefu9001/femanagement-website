import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EquipmentsMaintenanceRecordComponent} from "./equipments-maintenance-record/equipments-maintenance-record.component";

const routes: Routes = [
  {path: '', component: EquipmentsMaintenanceRecordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentsMaintenanceSimpleRoutingModule {
}
