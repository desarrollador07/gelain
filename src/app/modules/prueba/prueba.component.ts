import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prueba } from '../../models/prueba.model';
import { PruebaService } from '../../services/prueba.service';
import { SelectItem,ConfirmationService,MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { Empresa } from '../../models/empresa.model';
@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  prueba: Empresa;

  pruebas: Empresa[] = [];

  items1: MenuItem[];

  items2: MenuItem[];

  activeItem: MenuItem;

  constructor(private pruebaServices:PruebaService,private router: Router,
              private _confirmationServices: ConfirmationService,
              private _messageService: MessageService) {

   }

  ngOnInit() {

    this.indexData();

    this.items1 = [
      {label: 'Empresas', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Areas', icon: 'fa fa-fw fa-book'},
      {label: 'Empleados', icon: 'fa fa-fw fa-user'},
  ];

  }

   deletePrueba(prueba: Empresa) {

    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este elemento?',
      header:'confirmacion',
      icon:'pi pi-exclamation-triangle',
      accept:() => {
        this.pruebaServices.deleteEmpresa(prueba)
        .toPromise().then(data => {
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento eliminado', life: 3000})
          this.indexData();
        });
      }
    });
        

      } 

      editPrueba(cpruebas:Empresa){
        localStorage.setItem('prueba',JSON.stringify(cpruebas));
        localStorage.setItem('Idempres',JSON.stringify(cpruebas.empid));
        
      }
    
      newcPrueba(){
        localStorage.removeItem('prueba');
        localStorage.removeItem('Idempres');
      }

      indexData(){
        this.pruebaServices
        .getEmpresa().subscribe((data: any)=>{
          this.pruebas = data;
          console.log('los datos son: ',this.pruebas);
        })
      }
  

}
