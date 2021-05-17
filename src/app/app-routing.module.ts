import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/equipments' },
  { path: 'equipments', loadChildren: () => import('./pages/equipments/equipments.module').then(m => m.EquipmentsModule) },
  { path: 'basic-data', loadChildren: () => import('./pages/basicdata/basicdata.module').then(m => m.BasicdataModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
