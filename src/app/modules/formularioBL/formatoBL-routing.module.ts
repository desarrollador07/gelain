import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormatoBLComponent } from './formatoBL.component';

const routes: Routes = [
  {

    path: ':id',
    component: FormatoBLComponent,

  },
  {

    path: 'editar',
    component: FormatoBLComponent,

  },
  {

    path: 'crear',
    component: FormatoBLComponent,

  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormatoBLRoutingModule { }