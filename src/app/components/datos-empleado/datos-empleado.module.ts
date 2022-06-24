import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosEmpleadoComponent } from './datos-empleado.component';

@NgModule({
  declarations: [
    DatosEmpleadoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DatosEmpleadoComponent
  ]
})
export class DatosEmpleadoModule { }
