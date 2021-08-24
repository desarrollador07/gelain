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
  idEmpresa:any;
  idtemporal:any;
  prueba: Empleado;
  pruebas: Empleado[] = [];
  pruebas2: Empleado[] = [];
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
    this.pruebas2 = this.pruebas;

    await this.pruebaServices.getEmpresa().toPromise().then((data:any)=>{
      this.empresas = data;
    });

    await this.pruebaServices.buscarByEmpleados(this.idEmpresa).toPromise().then((data: Empleado[])=>{

      this.pruebas = data;
      console.log('Get empleados',this.pruebas);
      
      this.pruebas.map(res=>{
        this.empresas.map(x=>{
          if (res.emdempresa === x.empid) {
            res.nomempresa = x.empnombre;
          }
        });
      });

    });


    this.items1 = [
      {label: 'Empresas', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Areas', icon: 'fa fa-fw fa-book'},
      {label: 'Empleados', icon: 'fa fa-fw fa-user'},
  ];


  }

  ngOnChanges() {
    this.pruebas;

  }
  

  deletePrueba(prueba: Empleado) {

    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este registro?',
      header:'confirmacion',
      icon:'pi pi-exclamation-triangle',
      accept:() => {

        this.pruebaServices.deletePrueba(prueba).toPromise().then(data => {
              this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'El registro se ha eliminado', life: 3000})
              this.pruebaServices.buscarByEmpleados(this.idEmpresa).toPromise().then((data: any)=>{

                this.pruebas = [...data];
                this.pruebas.map(res=>{
                  this.empresas.map(x=>{
                    if (res.emdempresa === x.empid) {
                      res.nomempresa = x.empnombre;
                    }
                  });
                });               
              });
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
        localStorage.removeItem('ForAA');
        localStorage.removeItem('ForB');
        localStorage.removeItem('Extra');
        localStorage.removeItem('estres');
        localStorage.removeItem('estresEs');
      }

      buscarArea(cpruebas:Empleado){
        this.area =[];
        this.pruebaServices.buscarByArea(cpruebas.emdid).toPromise().then((data:any)=>{
   
          this.areas = data;
          this.areas.map(x=>{
            this.area.push({
              label:x.arenombre,
              value: x.areid
            });
          });
        });
      }

    indexData(){

      this.pruebaServices.getEmpresa().toPromise().then((data:any)=>{
        this.empresas = data;
      });
    
      this.pruebaServices.getPrueba().toPromise().then((data: any)=>{
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




}
