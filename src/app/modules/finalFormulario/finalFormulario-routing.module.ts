import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinalFormularioComponent } from './finalFormulario.component';

const routes: Routes = [
  {

    path: '',
    component: FinalFormularioComponent,

  },
  {

    path: 'editar',
    component: FinalFormularioComponent,

  },
  {

    path: 'crear',
    component: FinalFormularioComponent,

  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalFormularioRoutingModule { }