import { Component, OnInit } from '@angular/core';
/*Modulos */
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
/*Modelos */
import { Area } from '../../models/area.model';
/*Servicios */
import { AreasService } from 'src/app/services/areas.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  localIDEmp: number;
  prueba: Area;
  pruebas: Area[] = [];
  items1: MenuItem[];
  items2: MenuItem[];
  activeItem: MenuItem;

  constructor(private areasServices:AreasService,
              private _confirmationServices: ConfirmationService,
              private _messageService: MessageService) {

   }

  ngOnInit() {
    this.localIDEmp =JSON.parse(localStorage.getItem('Idempres'));
    this.indexData();

    this.items1 = [
      {label: 'Empresas', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Areas', icon: 'fa fa-fw fa-book'},
      {label: 'Empleados', icon: 'fa fa-fw fa-user'},
  ];

  }

  deletePrueba(prueba: Area) {

    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este registro?',
      header:'Confirmación',
      icon:'pi pi-exclamation-triangle',
      accept:() => {
        this.areasServices.deleteArea(prueba).toPromise().then(data => {
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'Registro eliminado', life: 3000})
          this.indexData();
        });
      }
    });
        

      }

      editPrueba(cpruebas:Area){
        localStorage.setItem('prueba',JSON.stringify(cpruebas));
      }
    
      newcPrueba(){
        localStorage.removeItem('prueba');
      }

      indexData(){
        this.areasServices.buscarByArea(this.localIDEmp).subscribe((data: any)=>{
          this.pruebas = data;
        });
      }
  

}
