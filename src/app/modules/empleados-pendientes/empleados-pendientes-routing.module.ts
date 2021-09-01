import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosPendientesComponent } from './empleados-pendientes.component';

const routes: Routes = [{
  path: '',
  component: EmpleadosPendientesComponent
},


];

@NgModule({
  imports: [RouterModule.forChild(routes),
            CommonModule],
  exports: [RouterModule]
})
export class EmpleadosPendientesRoutingModule { }
