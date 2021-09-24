import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../../models/empleado.mdel';
import { PruebaService } from '../../services/prueba.service';
import { ConfirmationService,MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { Empresa } from 'src/app/models/empresa.model';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FormatoAService } from 'src/app/services/formato-a.service';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  idEmpresa:any;
  empleadoData: Empleado[] = [];
  items1: MenuItem[];
  empresas: Empresa[] = [];

  constructor(private pruebaServices:PruebaService,
              private empleadosService: EmpleadosService,
              private formatoAService: FormatoAService,
              private empresaServices:EmpresaService,
              private router: Router,
              private _confirmationServices: ConfirmationService,
              private _messageService: MessageService,
              private store: Store<AppState>) {
                this.idEmpresa = localStorage.getItem("idEmpresa");
                
   }

  async ngOnInit() {

    /*Consulta Empresas */
    await this.consultaEmpresas();
    
    this.store.select('empresas').subscribe(async res=>{
      var id:number;
      if (res.empresa !== undefined) {
        id = res.empresa.empid;
      }else{
        id = this.idEmpresa;
      }
      if (id !== undefined && id !== null) {
          /*Consulta de Empleados */
        await this.consultaEmpleados(id);
      }
     
    });
     
    this.items1 = [
      {label: 'Empresas', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Areas', icon: 'fa fa-fw fa-book'},
      {label: 'Empleados', icon: 'fa fa-fw fa-user'},
    ];

  }

  
  deletePrueba(empleado: Empleado) {

    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este registro?',
      header:'Eliminar',
      icon:'pi pi-exclamation-triangle',
      accept:async() => {

        await this.empleadosService.deletePrueba(empleado).toPromise().then(data => {

          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'El registro se ha eliminado', life: 3000});
          this.empleadoData = this.empleadoData.filter(r => r !== empleado);
  
        });

      }
    });
        
  }

      editPrueba(cpruebas:Empleado){
        localStorage.setItem('prueba',JSON.stringify(cpruebas));
        localStorage.setItem('IdEmpleado',JSON.stringify(cpruebas.emdid));
        this.formatoAService.buscarByFa(cpruebas.emdid)
        .subscribe((data:any)=>{
          localStorage.setItem('ForA',JSON.stringify(data));
        })
        this.pruebaServices.buscarExtra(cpruebas.emdid)
        .subscribe((data:any)=>{
          localStorage.setItem('Extra',JSON.stringify(data));
        })
        this.pruebaServices.buscarByEstres(cpruebas.emdid)
        .subscribe((data:any)=>{
          localStorage.setItem('estres',JSON.stringify(data));
        })
        this.pruebaServices.buscarByFb(cpruebas.emdid)
        .subscribe((data:any)=>{
          localStorage.setItem('ForB',JSON.stringify(data));
        })
      }
    
    async consultaEmpleados(id:number){
      await this.empleadosService.buscarByEmpleados(id).toPromise().then((data: Empleado[])=>{
        this.empleadoData = data;
        this.empleadoData.map(res=>{
          this.empresas.map(x=>{
            if (res.emdempresa === x.empid) {
              res.nomempresa = x.empnombre;
            }
          });
        });
      });
    }

    async consultaEmpresas(){
      await this.empresaServices.getEmpresa().toPromise().then((data:any)=>{
        this.empresas = data;
      });
    }

    confirmationForm(){
      localStorage.removeItem('prueba');
      localStorage.removeItem('IdEmpleado');
      localStorage.removeItem('ForA');
      localStorage.removeItem('ForAA');
      localStorage.removeItem('ForB');
      localStorage.removeItem('Extra');
      localStorage.removeItem('estres');
      localStorage.removeItem('estresEs');
      this.router.navigate(["/main/addempleado/crear"]);
    }


}
