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
import { DatePipe } from '@angular/common';

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
  id:any;

  constructor(
              private empleadosService: EmpleadosService,
              private formatoAService: FormatoAService,
              private formatoBService: FormatoBService,
              private formatoEstresService: FormatoEstresService,
              private formatoExtraService: FormatoExtraService,
              private empresaServices:EmpresaService,
              private router: Router,
              private datepipe: DatePipe,
              private _confirmationServices: ConfirmationService,
              private _messageService: MessageService,
              private store: Store<AppState>) {
                this.idEmpresa = localStorage.getItem("idEmpresa");
                
   }

  async ngOnInit() {

    /*Consulta Empresas */
    await this.consultaEmpresas();
    
    this.store.select('empresas').subscribe(async res=>{
  
      if (res.empresa !== undefined) {
        this.id = res.empresa.empid;
      }else{
        this.id = this.idEmpresa;
      }
      if (this.id !== undefined && this.id !== null) {
          /*Consulta de Empleados */
        await this.consultaEmpleados(this.id);
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
        { field: 'emdnombres', header: 'Nombre', width: '500px' },
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

    async getEmpleadoByFiltro(){

      this.loading = true;
      // if (this.selectBuscar !== 1  && this.buscarData === '') {
      //   this.loading = false;
      //   this._messageService.add({ severity: 'info', summary: 'Informativo', detail: 'Digite el dato a buscar', life: 3000 });
      //   return;
      // }

      if (this.fechafinal === null || this.fechainicial === null ) {
        this.loading = false;
        this._messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Los campos de las fechas deben ir asignados.', life: 3000 });
        return;
      }

      var dateinicio = this.datepipe.transform(this.fechainicial, "yyyy-MM-dd");
      var datefinal = this.datepipe.transform(this.fechafinal, "yyyy-MM-dd");
      if (dateinicio > datefinal) {
        this.loading = false;
        this._messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'La fecha inicial debe ser menor a la fecha final.', life: 3000 });
        return;
      }

      // var valor = this.buscarData.trim();
      // if (this.selectBuscar === 1) {
      //   // valor = 'valor';
      // //  await this.fnSearchByFecha(this.selectBuscar,valor,checkTemp,dateinicio,datefinal);
      // }else{
      // //  await this.fnSearchByFecha(this.selectBuscar,valor,checkTemp,dateinicio,datefinal);
      // }

      await this.buscarEmpleadosByFechas(this.id,dateinicio,datefinal);

    }

    async buscarEmpleadosByFechas(id:number,fechaInicial:string,fechaFinal:string){
      this.empleadoData = [];
      await this.empleadosService.buscarEmpleadosByFechas(id,fechaInicial,fechaFinal).toPromise().then((resp:Empleado[]) => {
        this.empleadoData = resp;

        if (this.empleadoData.length === 0) {
          this._messageService.add({ severity: 'info', summary: 'Informativo', detail: 'No hay registros para el tipo de busqueda.', life: 3000 });
        }
        this.loading = false;

      });
    }

}
