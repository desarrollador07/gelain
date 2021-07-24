import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TD_DOMDIMComponent } from './TD_DOMDIM.component';

const routes: Routes = [{
  path: '',
  component: TD_DOMDIMComponent
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TD_DOMDIMRoutingModule { }