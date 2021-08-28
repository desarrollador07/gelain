import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../models/empleado.mdel';
import { PruebaService } from '../../services/prueba.service';
import { SelectItem,ConfirmationService,MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { Empresa } from 'src/app/models/empresa.model';
import { Area } from '../../models/area.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  idEmpresa:any;
  idtemporal:any;
  prueba: Empleado;
  pruebas: Empleado[] = [];
  items1: MenuItem[];
  items2: MenuItem[];
  activeItem: MenuItem;
  empresas: Empresa[] = [];
  nomempresa:String;
  area: SelectItem[] = [];
  areas: Area[] = [];

  public  async actualizarData(id:any){
      
   await this.pruebaServices.buscarByEmpleados(id).toPromise().then((data: any)=>{

     this.pruebas = data;
     this.pruebas.map(res=>{
       this.empresas.map(x=>{
          if (res.emdempresa === x.empid) {
            res.nomempresa = x.empnombre;
          }
       });
     });
  
   }); 
  }


  constructor(private pruebaServices:PruebaService,private router: Router,
              private _confirmationServices: ConfirmationService,
              private _messageService: MessageService) {
                this.idEmpresa = localStorage.getItem("nameEmpresaEmp");
                this.idtemporal = 0;
                
   }

  async ngOnInit() {

    /*Consulta Empresas */
    await this.consultaEmpresas();
    /*Consulta de Empleados */
    await this.consultaEmpleados();

    this.items1 = [
      {label: 'Empresas', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Areas', icon: 'fa fa-fw fa-book'},
      {label: 'Empleados', icon: 'fa fa-fw fa-user'},
    ];


  }

  
  deletePrueba(prueba: Empleado) {

    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este registro?',
      header:'Eliminar',
      icon:'pi pi-exclamation-triangle',
      accept:async() => {

        await this.pruebaServices.deletePrueba(prueba).toPromise().then(data => {

          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'El registro se ha eliminado', life: 3000});
          this.pruebas = this.pruebas.filter(r => r !== prueba);
  
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
    
    async consultaEmpleados(){

      await this.pruebaServices.buscarByEmpleados(this.idEmpresa).toPromise().then((data: Empleado[])=>{
        this.pruebas = data;
        this.pruebas.map(res=>{
          this.empresas.map(x=>{
            if (res.emdempresa === x.empid) {
              res.nomempresa = x.empnombre;
            }
          });
        });
  
      });
    }

    async consultaEmpresas(){
      await this.pruebaServices.getEmpresa().toPromise().then((data:any)=>{
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
