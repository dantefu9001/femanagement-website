import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/equipments'},
  {
    path: 'equipments',
    loadChildren: () => import('./pages/equipments/equipments.module').then(m => m.EquipmentsModule)
  },
  {
    path: 'equipments-summary',
    loadChildren: () => import('./pages/equipments-summary/equipments-summary.module').then(m => m.EquipmentsSummaryModule)
  },
  {path: 'basic-data', loadChildren: () => import('./pages/basicdata/basicdata.module').then(m => m.BasicdataModule)},
  {
    path: 'equipments-maintenance',
    loadChildren: () => import('./pages/equipments-maintenance-simple/equipments-maintenance-simple.module').then(m => m.EquipmentsMaintenanceSimpleModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
