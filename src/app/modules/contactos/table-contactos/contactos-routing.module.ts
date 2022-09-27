import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableContactosComponent } from './table-contactos.component';
import { FormContactosComponent } from '../form-contactos/form-contactos.component';

const routes: Routes = [{
  path: '',
  component: TableContactosComponent
},
{
  path: 'formcontacto',
  component: FormContactosComponent
},
{
  path: 'editar',
  component: FormContactosComponent
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactosRoutingModule { }
