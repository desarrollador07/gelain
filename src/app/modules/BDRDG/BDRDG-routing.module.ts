import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BDRDGComponent } from './BDRDG.component';

const routes: Routes = [{
  path: '',
  component: BDRDGComponent
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BDRDGRoutingModule { }