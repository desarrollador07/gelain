import { Component, OnInit } from '@angular/core';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PruebaService } from '../../services/prueba.service';
import { ActivatedRoute } from "@angular/router";
import { Empresa } from '../../models/empresa.model';
import {MessageService, ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { routes } from '../../app.routes';
import { SelectItem } from 'primeng/api';
import { Estres } from '../../models/estres.nodel';


@Component({
  selector: 'app-estres',
  templateUrl: './finalFormulario.component.html',
  styleUrls: ['./finalFormulario.component.css'],
})
export class FinalFormularioComponent implements OnInit {

  constructor(private pruebaservices: PruebaService,
              private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService) {  

  }

  ngOnInit() {
  localStorage.clear();
  }



  salir(){
    localStorage.removeItem('prueba');
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
