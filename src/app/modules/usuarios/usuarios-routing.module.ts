import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { FormUsuariosComponent } from '../form-usuarios/form-usuarios.component';

const routes: Routes = [
  { path: '',component: UsuariosComponent },
  { path: 'form-usuarios',component: FormUsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
            CommonModule],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
