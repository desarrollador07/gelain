import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-empleado',
  templateUrl: './datos-empleado.component.html',
  styleUrls: ['./datos-empleado.component.css']
})
export class DatosEmpleadoComponent implements OnInit {

  @Input() cedula:string;
  @Input() nombre:string;
  @Input() backColor:string;
  @Input() colorLetra:string;
  backSolidBorder:string;

  constructor() { }

  ngOnInit() {
    this.backSolidBorder = `2px solid ${this.backColor}`;
  }

}
