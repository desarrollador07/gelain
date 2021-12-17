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
  localStorage.clear();
  }



  salir(){
    localStorage.removeItem('empRegExt');
    localStorage.removeItem('IdEmpleado');
    localStorage.removeItem('ForA');
    localStorage.removeItem('ForAA');
    localStorage.removeItem('ForB');
    localStorage.removeItem('Extra');
    localStorage.removeItem('ExtraE');
    localStorage.removeItem('estresEs');
    localStorage.removeItem('estres');
  }

}
