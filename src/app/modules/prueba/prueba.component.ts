import { Component, OnInit } from '@angular/core';
/*Modulos */
import { ConfirmationService, MessageService, MenuItem} from 'primeng/api';
/*Modelos */
import { Empresa } from '../../models/empresa.model';
/*Servicios */
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  empresas: Empresa[] = [];
  items1: MenuItem[];
  items2: MenuItem[];
  activeItem: MenuItem;
  loading:boolean = true;

  constructor(private empresaServices:EmpresaService,
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

   deleteEmpresa(emp: Empresa) {

    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este registro?',
      header:'Confirmación',
      icon:'pi pi-exclamation-triangle',
      accept:() => {
        this.empresaServices.deleteEmpresa(emp)
        .toPromise().then(data => {

          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'Registro eliminado', life: 3000})
          this.indexData();
        });
      }
    });
        

      } 

      editEmpresa(emp:Empresa){
        sessionStorage.setItem('prueba',JSON.stringify(emp));
        sessionStorage.setItem('Idempres',JSON.stringify(emp.empid));
        sessionStorage.setItem('pruebaArea',JSON.stringify(emp));
        
      }
    
      newcPrueba(){
        sessionStorage.removeItem('prueba');
        sessionStorage.removeItem('Idempres');
      }

      indexData(){

        this.empresaServices.getEmpresa().subscribe((data: any)=>{
          this.empresas = data;
          if (this.empresas.length > 0) {
            this.loading = false;
          }else{
            this.loading = false;
          }
        });

      }
  

}
