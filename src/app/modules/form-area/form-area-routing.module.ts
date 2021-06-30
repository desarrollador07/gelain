import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormAreaComponent } from '../form-area/form-area.component';

const routes: Routes = [
  {

    path: 'editar',
    component: FormAreaComponent,

  },
  {

    path: 'crear',
    component: FormAreaComponent,

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormAreaRoutingModule { }