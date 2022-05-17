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
  }

}
