import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstresLComponent } from './estresL.component';

const routes: Routes = [
  {

    path: '',
    component: EstresLComponent,

  },
  {

    path: 'editar',
    component: EstresLComponent,

  },
  {

    path: 'crear',
    component: EstresLComponent,

  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstresLRoutingModule { }