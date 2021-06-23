import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EquipmentsMaintenanceRecordComponent} from "../equipments-maintenance-simple/equipments-maintenance-record/equipments-maintenance-record.component";
import {EquipmentMaintenanceValidateJudgementComponent} from "./equipment-maintenance-validate-judgement/equipment-maintenance-validate-judgement.component";
import {EquipmentsMaintenanceValidateTabComponent} from "./equipments-maintenance-validate-tab/equipments-maintenance-validate-tab.component";

const routes: Routes = [
  {path: 'record-standard', component: EquipmentsMaintenanceRecordComponent},
  {path: 'rating', component: EquipmentMaintenanceValidateJudgementComponent},
  {path: 'validate', component: EquipmentsMaintenanceValidateTabComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentsMaintenanceStandardRoutingModule {
}
