import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html'
})
export class TerminosCondicionesComponent implements OnInit {
  id: number;
  checked:boolean = false;
  constructor(private route: ActivatedRoute,
              private _router: Router) { 
    this.id = Number(this.route.snapshot.paramMap.get("id")); 
  }

  ngOnInit() {
  }

  ingForm(){
    this._router.navigate([`FormularioEmpleado/${this.id}`])
  }

  cancelarRegistro(){
    window.open('https://www.google.com','_self');
  }
}
