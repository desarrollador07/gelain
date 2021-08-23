import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValorfisicoComponent } from '../valorFisico/valorFisico.component';

const routes: Routes = [
  {

    path: '',
    component: ValorfisicoComponent,

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class valorFisicoRoutingModule { }