import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormatoALComponent } from './formatoAL.component';

const routes: Routes = [
  {

    path: ':id',
    component: FormatoALComponent,

  },
  {

    path: 'editar',
    component: FormatoALComponent,

  },
  {

    path: 'crear',
    component: FormatoALComponent,

  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormatoALRoutingModule { }