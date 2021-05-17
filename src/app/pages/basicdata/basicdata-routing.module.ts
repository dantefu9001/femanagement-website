import {NgModule} from '@angular/core';
import {BasicdataConfigsComponent} from './basicdata-configs/basicdata-configs.component';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: '', component: BasicdataConfigsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicdataRoutingModule {
}
