import { Component, OnInit } from '@angular/core';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PruebaService } from '../../services/prueba.service';
import { ActivatedRoute } from "@angular/router";
import {MessageService, ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';
import { ValorFisico } from '../../models/valorFisico.model';


@Component({
  selector: 'app-form-prueba',
  templateUrl: './valorFisico.component.html',
  styleUrls: ['./valorFisico.component.css']
})
export class ValorfisicoComponent implements OnInit {
  pruebas: ValorFisico[] = [];
  idEmpres:any;

  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService,private datepipe: DatePipe,
              private _confirmationServices: ConfirmationService) {
               this.idEmpres = localStorage.getItem('idEmpresa');   
  }

  async ngOnInit() {
      this.indexData();
  }

  deletePrueba(prueba: ValorFisico) {
    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este elemento?',
      header:'confirmacion',
      icon:'pi pi-exclamation-triangle',
      accept:() => {
        this.pruebaservices.deletevalorFisico(prueba)
        .toPromise().then(data => {
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento eliminado', life: 3000})
          this.indexData();
        });
      }
    });
      }

      editPrueba(cpruebas:ValorFisico){
        localStorage.setItem('valorFisico',JSON.stringify(cpruebas));
      }
    
      newcPrueba(){
        localStorage.removeItem('valorFisico');
        localStorage.removeItem('prueba');
        localStorage.removeItem('IdEmpleado');
        localStorage.removeItem('ForA');
        localStorage.removeItem('ForAA');
        localStorage.removeItem('ForB');
        localStorage.removeItem('Extra');
        localStorage.removeItem('estres');
        localStorage.removeItem('estresEs');
      }

      indexData(){
        this.pruebaservices.getvalorFisicoId(this.idEmpres).subscribe((data:any)=>{
          console.log('valoresFisicos',data);
          this.pruebas = [...data];
        })
      }



}
