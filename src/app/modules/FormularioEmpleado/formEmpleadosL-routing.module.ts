import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormEmpleadosLComponent } from '../FormularioEmpleado/formEmpleadosL.component';

const routes: Routes = [

   {

    path: ':id',
    component: FormEmpleadosLComponent,

  }, 
  {

    path: 'editar',
    component: FormEmpleadosLComponent,

  },
  {

    path: 'crear',
    component: FormEmpleadosLComponent,

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class formEmpleadosLRoutingModule { }