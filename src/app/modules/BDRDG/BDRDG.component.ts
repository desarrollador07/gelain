import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
/*Modulos */
import { SelectItem, MenuItem } from 'primeng/api';
/*Modelos */
import { Empleado } from '../../models/empleado.mdel';
import { Empresa } from 'src/app/models/empresa.model';
import { Area } from '../../models/area.model';
/*Servicios */
import { EmpresaService } from 'src/app/services/empresa.service';
import { AreasService } from 'src/app/services/areas.service';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './BDRDG.component.html',
  styleUrls: ['./BDRDG.component.css']
})
export class BDRDGComponent implements OnInit {
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
  areaExp:Area;
  area: SelectItem[] = [];
  areas: Area[] = [];
  columns: any[];
  nombre:any;
  image = new Image();
  loading:boolean = true;
  cols:any[] = [];
  frozenCols: any[] = [];
  

  constructor(
              private empleadosService: EmpleadosService,
              private empresaServices:EmpresaService,
              private areasServices:AreasService,
              private store: Store<AppState>) {
                this.idEmpresa = localStorage.getItem("idEmpresa");
                this.idtemporal = 0;
                this.image.src = "https://gelainbienestarlaboral.com/GELAIN/img/logo_gelain.jpg";      
   }

  async ngOnInit() {
    this.pruebas2 = this.pruebas;
    this.datosGenerales();
    await this.empresaServices.getEmpresa().toPromise().then((data:any)=>{
      this.empresas = data;
    });
    this.store.select('empresas').subscribe(async res=>{
      var id:number;
      if (res.empresa !== undefined) {
        id = res.empresa.empid;
      }else{
        id = this.idEmpresa;
      }
      if (id !== undefined && id !== null) {
        await this.consultaEmpleados(id);
      }
     
    });
    
   
  }

  async consultaEmpleados(id:number){

      await this.empleadosService
      .buscarByEmpleadosRepor(id).toPromise().then((data: any)=>{
       
        this.pruebas = data;
        this.makeRowsSameHeight();
        this.pruebas.map(res=>{
          this.empresas.map(x=>{
          if (res.emdempresa === x.empid) {
            res.nomempresa = x.empnombre;
            res.ciudadEmpresa = x.empciudad;
            res.DepartamentoEmpresa = x.empdepartamento;
          }
          });
        });
        if (this.pruebas.length > 0) {
          this.loading = false;
        }else{
          this.loading = false;
        }
      }); 

  }


      buscarArea(cpruebas:Empleado){
        this.area =[];
        this.areasServices.buscarByArea(cpruebas.emdid).toPromise().then((data:any)=>{
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
         this.empresaServices.getEmpresa().toPromise().then((data:any)=>{
          this.empresas = data;
        });
    
         this.empleadosService.getPrueba().toPromise().then((data: any)=>{
          this.pruebas = data;
          this.pruebas.map(res=>{
            this.empresas.map(x=>{
            if (res.emdempresa === x.empid) {
              res.nomempresa = x.empnombre;
              res.ciudadEmpresa = x.empciudad;
              res.DepartamentoEmpresa = x.empdepartamento;
            }
            });
          });
      });
    }


    exportPdf() {
      import("jspdf").then(jsPDF => {
          import("jspdf-autotable").then(x => {
              const doc = new jsPDF.default();
              //doc.autoTable(this.columns, this.pruebas);
              doc.save('empleados.pdf');
          })
      })
  }
  
  exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getCars());
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "EMPLEADOS");
      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      import("file-saver").then(FileSaver => {
          let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          let EXCEL_EXTENSION = '.xlsx';
          const data: Blob = new Blob([buffer], {
              type: EXCEL_TYPE
          });
          FileSaver.saveAs(data, fileName  + EXCEL_EXTENSION);
      });
  }

  getCars() {
      let pruebass = [];
      let arreglado :any;
      let fecha:Date;
      
      for(let car of this.pruebas) {
        /* this.pruebaServices.buscarByAreaExpecifica(car.emdempresa,car.emdarea).toPromise().then((data:any)=>{
          console.log(data);
          this.areaExp = data[0];
          this.nombre = this.areaExp.arenombre;
          console.log(this.nombre);
          
      }) */
          car.emdnombres = car.emdnombres.toUpperCase()+" "+car.emdapellidos.toUpperCase();
          console.log("car.emdnombres",car.emdnombres);
          
          fecha = new Date(car.emdfecnacido);
          var year = fecha.getFullYear();
          car.emdfecnacidoRepor = year;
          pruebass.push(car);
         
      }
  arreglado = pruebass.map( item => { 
    return {
      'ID' : item.emdid,
      'CEDULA': item.emdcedula,
      'NOMBRE: 1': item.emdnombres,
      'SEXO: 2': item.emdsexo,
      'AÑO DE NACIMIENTO: 3': item.emdfecnacidoRepor,
      'ESTADO CIVIL: 4': item.emdestcivil,
      'NIVEL DE ESTUDIOS: 5': item.emdnivelestudio,
      'PROFECIÓN: 6': item.emdprofesion,
      'CIUDAD: 7A': item.emdciudad,
      'DEAPARTAMENTO: 7B': item.emddepartamento,
      'ESTRATO: 8': item.emdestracto,
      'TIPO DE VIVIVIENDA: 9': item.emdtipovivienda,
      'PERSONAS DEPENDIENTES: 10': item.emdpersdepen,
      'EMPRESA: 11':  item.nomempresa,
      'CIUDAD: 11A':  item.ciudadEmpresa,
      'DEPARTAMENTO: 11B':  item.DepartamentoEmpresa,
      'TIEMPO EN LA EMPRESA: 12': item.emdtiempolab,
      'CARGO: 13': item.emdcargo,
      'TIPO DE CARGO: 14': item.emdtipodecargo,
      'TIEMPO EN EL CARGO: 15': item.emdtiemcargo,
      /* AREA: item.areaNom, */
      'TIPO DE CONTRATO: 17': item.emdtipocontrato,
      'HORAS DE TRABAJO: 18': item.emdhorasdia,
      'USUARIO QUE REGISTRO': item.emdusuarioreg,

              }; 
  });  
      return arreglado;
  }

  datosGenerales(){
    this.frozenCols = [
      { field: 'emdcedula', header: 'Cédula', width: '180px' }
    ];

    this.cols = [
      { field: 'emdnombres', header: 'Nombre', width: '400px' },
      { field: 'emddepartamento', header: 'Departamento', width: '250px' },
      { field: 'emdciudad', header: 'Ciudad', width: '200px' },
      { field: 'emdfecnacido', header: 'Año de Nacimiento', width: '200px' },
      { field: 'nomempresa', header: 'Empresa', width: '300px' },
      { field: 'emdfechareg', header: 'Fecha Registro', width: '250px' },
    ];
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
