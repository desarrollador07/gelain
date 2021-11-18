import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormValorRiesgoComponent } from '../form-valor-riesgo/form-valor-riesgo.component';
import { ValorRiesgoComponent } from './valor-riesgo.component';

const routes: Routes = [
  {

    path: '',
    component: ValorRiesgoComponent,

  },
  {

    path: 'form-valor-riesgo',
    component: FormValorRiesgoComponent,

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValorRiesgoRoutingModule { }
