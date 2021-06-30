import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstresComponent } from './estres.component';

const routes: Routes = [
  {

    path: 'editar',
    component: EstresComponent,

  },
  {

    path: 'crear',
    component: EstresComponent,

  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstresRoutingModule { }