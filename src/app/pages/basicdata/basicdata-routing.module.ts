import {NgModule} from '@angular/core';
import {BasicDataConfigsComponent} from './basic-data-configs/basic-data-configs.component';
import {RouterModule, Routes} from "@angular/router";
import {BasicDataPlantLayoutComponent} from "./basic-data-plant-layout/basic-data-plant-layout.component";


const routes: Routes = [
  {path: 'basic', component: BasicDataConfigsComponent},
  {path: 'plant', component: BasicDataPlantLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicdataRoutingModule {
}
