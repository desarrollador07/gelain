import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtralaboralLComponent } from './extralaboralL.component';

const routes: Routes = [
  {

    path: ':id',
    component: ExtralaboralLComponent,

  },
  {

    path: 'editar',
    component: ExtralaboralLComponent,

  },
  {

    path: 'crear',
    component: ExtralaboralLComponent,

  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtralaboralLRoutingModule { }