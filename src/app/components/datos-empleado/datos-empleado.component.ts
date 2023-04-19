import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-datos-empleado',
  templateUrl: './datos-empleado.component.html',
  styleUrls: ['./datos-empleado.component.css']
})
export class DatosEmpleadoComponent implements OnInit {
  
  apiUrl:string = environment.urlGlobal;
  @Input() cedula:string;
  @Input() nombre:string;
  @Input() backColor:string;
  @Input() colorLetra:string;
  @Input() imgValid:boolean;
  @Input() nomImg:string;
  
  dataImagen:string = `${this.apiUrl}/img/`;
  backSolidBorder:string;

  constructor() { }

  ngOnInit() {
    this.dataImagen = this.dataImagen + this.nomImg;
    this.backSolidBorder = `2px solid ${this.backColor}`;
  }

}
