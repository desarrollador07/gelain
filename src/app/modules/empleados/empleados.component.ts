import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../models/empleado.mdel';
import { PruebaService } from '../../services/prueba.service';
import { SelectItem,ConfirmationService,MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { Empresa } from 'src/app/models/empresa.model';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  prueba: Empleado;

  pruebas: Empleado[] = [];

  items1: MenuItem[];

  items2: MenuItem[];

  activeItem: MenuItem;

  empresas: Empresa[] = [];

  nomempresa:String;

  constructor(private pruebaServices:PruebaService,private router: Router,
              private _confirmationServices: ConfirmationService,
              private _messageService: MessageService) {

   }

  async ngOnInit() {

    await this.pruebaServices.getEmpresa().toPromise().then((data:any)=>{
      console.log(data);
      this.empresas = data;
    })

    await this.pruebaServices
    .getPrueba().toPromise().then((data: any)=>{
      this.pruebas = [...data];
      this.pruebas.map(res=>{
        this.empresas.map(x=>{
        if (res.emdempresa === x.empid) {
          res.nomempresa = x.empnombre;
        }
        })
      })

      console.log('los datos son: ',this.pruebas);
    })

    this.items1 = [
      {label: 'Empresas', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Areas', icon: 'fa fa-fw fa-book'},
      {label: 'Empleados', icon: 'fa fa-fw fa-user'},
  ];

 


  }

  deletePrueba(prueba: Empleado) {

    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este elemento?',
      header:'confirmacion',
      icon:'pi pi-exclamation-triangle',
      accept:() => {
        this.pruebaServices.deletePrueba(prueba)
        .toPromise().then(data => {
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento eliminado', life: 3000})
        });
      }
    });
        

      }

      editPrueba(cpruebas:Empleado){
        localStorage.setItem('prueba',JSON.stringify(cpruebas));
      }
    
      newcPrueba(){
        localStorage.removeItem('prueba');
      }
  

}
