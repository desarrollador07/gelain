import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReporteDetalladoComponent } from './ReporteDetallado.component';

const routes: Routes = [{
  path: '',
  component: ReporteDetalladoComponent
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteDetalladoRoutingModule { }