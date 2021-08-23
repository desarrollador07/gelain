import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormValorFisicoComponent } from '../Form-valorFisico/formValorFisico.component';

const routes: Routes = [
  {

    path: 'editar',
    component: FormValorFisicoComponent,

  },
  {

    path: 'crear',
    component: FormValorFisicoComponent,

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormValorFisicoRoutingModule { }