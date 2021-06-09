import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPruebaComponent } from '../form-prueba/form-prueba.component';

const routes: Routes = [
  {

    path: 'editar',
    component: FormPruebaComponent,

  },
  {

    path: 'crear',
    component: FormPruebaComponent,

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormPruebaRoutingModule { }