import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from 'src/app/layout/main/main.component';
import { LoginComponent } from './login.component';

 
const routes: Routes = [
  {
  path:"",
  component: LoginComponent,

},
{
  path:"main/dashboard",
  component: MainComponent

},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }