import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormatoBComponent } from './formatoB.component';

const routes: Routes = [
  {

    path: 'editar',
    component: FormatoBComponent,

  },
  {

    path: 'crear',
    component: FormatoBComponent,

  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormatoBRoutingModule { }