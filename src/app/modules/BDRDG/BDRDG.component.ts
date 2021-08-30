import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../models/empleado.mdel';
import { PruebaService } from '../../services/prueba.service';
import { SelectItem} from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { Empresa } from 'src/app/models/empresa.model';
import { Area } from '../../models/area.model';

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
  

  constructor(private pruebaServices:PruebaService) {
                this.idEmpresa = localStorage.getItem("idEmpresa");
                this.idtemporal = 0;
                this.image.src = "https://gelainbienestarlaboral.com/GELAIN/img/logo_gelain.jpg";      
   }

  async ngOnInit() {
    this.pruebas2 = this.pruebas;

    await this.pruebaServices.getEmpresa().toPromise().then((data:any)=>{
     
      this.empresas = data;
    })

    await this.pruebaServices
    .buscarByEmpleadosRepor(this.idEmpresa).toPromise().then((data: any)=>{
     
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

    console.log('data', this.pruebas);
    


  }



      buscarArea(cpruebas:Empleado){
        this.area =[];
        this.pruebaServices.buscarByArea(cpruebas.emdid).toPromise().then((data:any)=>{
          this.areas = data;
          this.areas.map(x=>{
            this.area.push({
              label:x.arenombre,
              value: x.areid
            })
          })
        })
      }

      indexData(){
         this.pruebaServices.getEmpresa().toPromise().then((data:any)=>{
          this.empresas = data;
        })
    
         this.pruebaServices
        .getPrueba().toPromise().then((data: any)=>{
          this.pruebas = [...data];
          this.pruebas.map(res=>{
            this.empresas.map(x=>{
            if (res.emdempresa === x.empid) {
              res.nomempresa = x.empnombre;
              res.ciudadEmpresa = x.empciudad;
              res.DepartamentoEmpresa = x.empdepartamento;
            }
            })
          })
      })
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
  console.log('ver',arreglado);

      
      return arreglado;
  }



}
