import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-estres',
  templateUrl: './finalFormulario.component.html',
  styleUrls: ['./finalFormulario.component.css'],
})
export class FinalFormularioComponent implements OnInit {

  constructor() {  

  }

  ngOnInit() {
  sessionStorage.clear();
  localStorage.clear();
  }



  salir(){
    sessionStorage.removeItem('empRegExt');
    sessionStorage.removeItem('IdEmpleado');
    sessionStorage.removeItem('ForA');
    sessionStorage.removeItem('ForAA');
    sessionStorage.removeItem('ForB');
    sessionStorage.removeItem('Extra');
    sessionStorage.removeItem('ExtraE');
    sessionStorage.removeItem('estresEs');
    sessionStorage.removeItem('estres');
  }

}
