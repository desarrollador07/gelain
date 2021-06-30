import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtralaboralComponent } from './extralaboral.component';

const routes: Routes = [
  {

    path: 'editar',
    component: ExtralaboralComponent,

  },
  {

    path: 'crear',
    component: ExtralaboralComponent,

  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtralaboralRoutingModule { }