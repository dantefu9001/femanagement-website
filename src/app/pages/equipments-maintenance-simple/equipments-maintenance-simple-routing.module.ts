import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EquipmentsMaintenanceRecordComponent} from "./equipments-maintenance-record/equipments-maintenance-record.component";
import {EquipmentsMaintenanceTabComponent} from "./equipments-maintenance-tab/equipments-maintenance-tab.component";

const routes: Routes = [
  {path: 'record', component: EquipmentsMaintenanceRecordComponent},
  {path: 'management', component: EquipmentsMaintenanceTabComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentsMaintenanceSimpleRoutingModule {
}
