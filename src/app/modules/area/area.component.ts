import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from '../../models/area.model';
import { PruebaService } from '../../services/prueba.service';
import { SelectItem,ConfirmationService,MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-empleados',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  prueba: Area;

  pruebas: Area[] = [];

  items1: MenuItem[];

  items2: MenuItem[];

  activeItem: MenuItem;

  constructor(private pruebaServices:PruebaService,private router: Router,
              private _confirmationServices: ConfirmationService,
              private _messageService: MessageService) {

   }

  ngOnInit() {

    this.pruebaServices
    .getArea().subscribe((data: any)=>{
      this.pruebas = [...data];
      console.log('los datos son: ',this.pruebas);
    })

    this.items1 = [
      {label: 'Empresas', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Areas', icon: 'fa fa-fw fa-book'},
      {label: 'Empleados', icon: 'fa fa-fw fa-user'},
  ];

  }

  deletePrueba(prueba: Area) {

    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este elemento?',
      header:'confirmacion',
      icon:'pi pi-exclamation-triangle',
      accept:() => {
        this.pruebaServices.deleteArea(prueba)
        .toPromise().then(data => {
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento eliminado', life: 3000})
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
  

}
