import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormatoAComponent } from './formatoA.component';

const routes: Routes = [
  {

    path: 'editar',
    component: FormatoAComponent,

  },
  {

    path: 'crear',
    component: FormatoAComponent,

  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormatoARoutingModule { }