import { Component, OnInit } from '@angular/core';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PruebaService } from '../../services/prueba.service';
import { ActivatedRoute } from "@angular/router";
import {MessageService, ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';
import { ValorFisico } from '../../models/valorFisico.model';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-form-prueba',
  templateUrl: './valorFisico.component.html',
  styleUrls: ['./valorFisico.component.css']
})
export class ValorfisicoComponent implements OnInit {
  pruebas: ValorFisico[] = [];
  idEmpresa:any;

  constructor(private pruebaservices: PruebaService,
              private _messageService: MessageService,
              private _confirmationServices: ConfirmationService,
              private store: Store<AppState>) {
               this.idEmpresa = localStorage.getItem('idEmpresa');   
  }

  async ngOnInit() {
    this.store.select('empresas').subscribe(async res=>{
      var id:number;
      if (res.empresa.empid === undefined) {
        id = this.idEmpresa;
      }else{
        id = res.empresa.empid;
      }
      this.indexData(id);
    });
      
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
          this.indexData(this.idEmpresa);
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

      indexData(id:number){
        this.pruebaservices.getvalorFisicoId(id).subscribe((data:any)=>{
          this.pruebas = [...data];
        })
      }



}
