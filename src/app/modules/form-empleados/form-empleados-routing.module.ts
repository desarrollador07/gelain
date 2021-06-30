import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormEmpleadosComponent } from '../form-empleados/form-empleados.component';

const routes: Routes = [
  {

    path: 'editar',
    component: FormEmpleadosComponent,

  },
  {

    path: 'crear',
    component: FormEmpleadosComponent,

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormEmpleadosRoutingModule { }