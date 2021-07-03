import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../models/empleado.mdel';
import { PruebaService } from '../../services/prueba.service';
import { SelectItem,ConfirmationService,MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { Empresa } from 'src/app/models/empresa.model';
import { Area } from '../../models/area.model';
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

  area: SelectItem[] = [];
  areas: Area[] = [];

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
          this.indexData();
        });
      }
    });
        

      }

      editPrueba(cpruebas:Empleado){
        localStorage.setItem('prueba',JSON.stringify(cpruebas));
        localStorage.setItem('IdEmpleado',JSON.stringify(cpruebas.emdid));
        this.pruebaServices.buscarByFa(cpruebas.emdid)
        .subscribe((data:any)=>{
          console.log("forA",data);
          localStorage.setItem('ForA',JSON.stringify(data));
        })
        this.pruebaServices.buscarExtra(cpruebas.emdid)
        .subscribe((data:any)=>{
          console.log("Extra",data);
          localStorage.setItem('Extra',JSON.stringify(data));
        })
        this.pruebaServices.buscarByEstres(cpruebas.emdid)
        .subscribe((data:any)=>{
          console.log("estres",data);
          localStorage.setItem('estres',JSON.stringify(data));
        })
        this.pruebaServices.buscarByFb(cpruebas.emdid)
        .subscribe((data:any)=>{
          console.log("forB",data);
          localStorage.setItem('ForB',JSON.stringify(data));
        })
      }
    
      newcPrueba(){
        localStorage.removeItem('prueba');
        localStorage.removeItem('IdEmpleado');
        localStorage.removeItem('ForA');
        localStorage.removeItem('ForB');
        localStorage.removeItem('Extra');
        localStorage.removeItem('estres');
      }

      buscarArea(cpruebas:Empleado){
        this.area =[];
        this.pruebaServices.buscarByArea(cpruebas.emdid).toPromise().then((data:any)=>{
          console.log(data);
          this.areas = data;
          this.areas.map(x=>{
            this.area.push({
              label:x.arenombre,
              value: x.areid
            })
          })
        })
      }

      indexData(){
         this.pruebaServices.getEmpresa().toPromise().then((data:any)=>{
          console.log(data);
          this.empresas = data;
        })
    
         this.pruebaServices
        .getPrueba().toPromise().then((data: any)=>{
          this.pruebas = [...data];
          this.pruebas.map(res=>{
            this.empresas.map(x=>{
            if (res.emdempresa === x.empid) {
              res.nomempresa = x.empnombre;
            }
            })
          })
      })
    }
}
