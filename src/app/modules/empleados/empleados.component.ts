import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
/*Modulos */
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
/*Modelos */
import { Empleado } from '../../models/empleado.mdel';
import { Empresa } from 'src/app/models/empresa.model';
/*Servicios */
import { EmpresaService } from 'src/app/services/empresa.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FormatoAService } from 'src/app/services/formato-a.service';
import { FormatoBService } from 'src/app/services/formato-b.service';
import { FormatoEstresService } from 'src/app/services/formato-estres.service';
import { FormatoExtraService } from 'src/app/services/formato-extra.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  es: any = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"],
    dayNamesShort: ["Dom", "Lun", "Mart", "Mie", "Jue", "Vie", "Sab"],
    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    monthNamesShort: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    today: "Hoy",
    clear: "Limpiar",
    dateFormat: "yy-mm-dd",
    weekHeader: "Wk",
  };
  fechainicial: Date;
  fechafinal: Date;
  idEmpresa:any;
  empleadoData: Empleado[] = [];
  items1: MenuItem[];
  empresas: Empresa[] = [];
  loading:boolean = true;
  cols:any[] = [];
  frozenCols: any[] = [];
  tipoSelect = [
    {label:'Todos los registros', value:1},
    {label:'NIT', value:2},
    {label:'Nombre', value:3},
    {label:'Prefijo', value:4},
    {label:'Número', value:5}
  ];
  buscarData:string = '';
  selectBuscar:any = 1;
  

  constructor(
              private empleadosService: EmpleadosService,
              private formatoAService: FormatoAService,
              private formatoBService: FormatoBService,
              private formatoEstresService: FormatoEstresService,
              private formatoExtraService: FormatoExtraService,
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
     
    this.dataGeneral();

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
        this.formatoExtraService.buscarExtra(cpruebas.emdid)
        .subscribe((data:any)=>{
          localStorage.setItem('Extra',JSON.stringify(data));
        })
        this.formatoEstresService.buscarByEstres(cpruebas.emdid)
        .subscribe((data:any)=>{
          localStorage.setItem('estres',JSON.stringify(data));
        })
        this.formatoBService.buscarByFb(cpruebas.emdid)
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
        if (this.empleadoData.length > 0) {
          this.loading = false;
        }else{
          this.loading = false;
        }
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

    dataGeneral(){
      
      
      this.items1 = [
        {label: 'Empresas', icon: 'fa fa-fw fa-bar-chart'},
        {label: 'Areas', icon: 'fa fa-fw fa-book'},
        {label: 'Empleados', icon: 'fa fa-fw fa-user'},
      ];

      this.frozenCols = [
        { field: 'emdcedula', header: 'Cédula', width: '160px' }
      ];
  
      this.cols = [
        { field: 'emdnombres', header: 'Nombre', width: '400px' },
        { field: 'emdtraciudad', header: 'Ciudad', width: '250px' },
        { field: 'emdtelefono', header: 'Telefono', width: '230px' },
        { field: 'nomempresa', header: 'Empresa', width: '400px' },
        { field: 'emdfechareg', header: 'Fecha Registro', width: '250px' },
        { field: 'emdactivo', header: 'Estado', width: '140px' }
      ];

      this.es = {
        firstDayOfWeek: 0,
        dayNames: ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"],
        dayNamesShort: ["Dom", "Lun", "Mart", "Mie", "Jue", "Vie", "Sab"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
        monthNamesShort: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
        today: "Hoy",
        clear: "Limpiar",
        dateFormat: "yy-mm-dd",
        weekHeader: "Wk",
      };

      const fecini = new Date();
      this.fechainicial = new Date(fecini.getFullYear(), fecini.getMonth()-1, 1);
      this.fechafinal = new Date();
    }

    getEmpleadoByFiltro(){

    }

}
