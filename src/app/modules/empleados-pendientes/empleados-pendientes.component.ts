import { Component, OnInit } from '@angular/core';
import { EmpleadosPendientesService } from '../../services/empleados-pendientes.service';
import { EmpleadoPendienteModel } from '../../models/empleado-pendiente.model';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-empleados-pendientes',
  templateUrl: './empleados-pendientes.component.html',
  styleUrls: ['./empleados-pendientes.component.css']
})
export class EmpleadosPendientesComponent implements OnInit {

  epData:EmpleadoPendienteModel[] = [];
  idEmpresa:number;
  cols = [
    { field: 'emdnombres', header: 'Nombres', width: '300px'},
    { field: 'emdapellidos', header: 'Apellidos', width: '300px' },
    { field: 'emdempresa', header: 'ID Empresa', width: '140px' },
    { field: 'empnombre', header: 'Nombre Empresa', width: '300px' },
    { field: 'formato', header: 'Formato', width: '120px' },
    { field: 'emdactivo', header: 'Estado', width: '120px' },
    { field: 'total_intralaboral', header: 'Intralaboral', width: '135px' },
    { field: 'total_extralaboral', header: 'Extralaboral', width: '136px' },
    { field: 'total_estres', header: 'Estres', width: '135px' }
  ];
  frozenCols = [
    { field: 'emdcedula', header: 'Cédula', width: '200px' }
  ];
  constructor(private epService: EmpleadosPendientesService,
              private store: Store<AppState>) { 
    this.idEmpresa = Number(localStorage.getItem("idEmpresa"));
  }

  async ngOnInit() {

    this.store.select('empresas').subscribe(async res=>{
      var id:number;
      if (res.empresa.empid === undefined) {
        id = this.idEmpresa;
      }else{
        id = res.empresa.empid;
      }
      /*Consulta Empleados Pendientes */
      await this.consultaEmpleadosPendientes(id);
    });

  }

  async consultaEmpleadosPendientes(id:number){
    this.epService.getEmpleadosPendientes(id).toPromise().then((res:EmpleadoPendienteModel[]) => {
      this.epData = res;
      console.log(res);
      this.makeRowsSameHeight();
    });
  }

  makeRowsSameHeight() {
     
    setTimeout(() => {

        if (document.getElementsByClassName('ui-table-scrollable-wrapper').length) {
         
            let wrapper = document.getElementsByClassName('ui-table-scrollable-wrapper');
            for (var i = 0; i < wrapper.length; i++) {
               let w = wrapper.item(i) as HTMLElement;
               let frozen_rows: any = w.querySelectorAll('.ui-table-frozen-view tr');
               let unfrozen_rows: any = w.querySelectorAll('.ui-table-unfrozen-view tr');
               for (let i = 0; i < frozen_rows.length; i++) {
                  if (frozen_rows[i].clientHeight > unfrozen_rows[i].clientHeight) {
                     unfrozen_rows[i].style.height = frozen_rows[i].clientHeight+"px";
                  } 
                  else if (frozen_rows[i].clientHeight < unfrozen_rows[i].clientHeight) 
                  {
                     frozen_rows[i].style.height = unfrozen_rows[i].clientHeight+"px";
                  }
                }
              }
        }
    },100);
  }
}
