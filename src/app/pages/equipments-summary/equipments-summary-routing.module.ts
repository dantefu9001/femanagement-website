import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {EquipmentsSummaryComponent} from "./equipments-summary.component";


const routes: Routes = [
  {path: '', component: EquipmentsSummaryComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentsSummaryRoutingModule {
}
