import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EquipmentsMaintenanceRecordComponent} from "../equipments-maintenance-simple/equipments-maintenance-record/equipments-maintenance-record.component";
import {EquipmentMaintenanceValidateJudgementComponent} from "./equipment-maintenance-validate-judgement/equipment-maintenance-validate-judgement.component";
import {EquipmentsMaintenanceValidateTabComponent} from "./equipments-maintenance-validate-tab/equipments-maintenance-validate-tab.component";
import {EquipmentsMaintenanceDispatchComponent} from "./equipments-maintenance-dispatch/equipments-maintenance-dispatch.component";
import {EquipmentsMaintenanceMyJobBookingsComponent} from "./equipments-maintenance-my-job-bookings/equipments-maintenance-my-job-bookings.component";

const routes: Routes = [
  {path: 'record-standard', component: EquipmentsMaintenanceRecordComponent},
  {path: 'dispatch', component: EquipmentsMaintenanceDispatchComponent},
  {path: 'booking', component: EquipmentsMaintenanceMyJobBookingsComponent},
  {path: 'rating', component: EquipmentMaintenanceValidateJudgementComponent},
  {path: 'validate', component: EquipmentsMaintenanceValidateTabComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentsMaintenanceStandardRoutingModule {
}
