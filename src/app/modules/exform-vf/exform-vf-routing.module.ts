import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExformVfComponent } from './exform-vf.component';

const routes: Routes = [
  {
    path: ':id', component: ExformVfComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ExformVfRoutingModule { }
