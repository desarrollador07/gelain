import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../models/empleado.mdel';
import { PruebaService } from '../../services/prueba.service';
import { SelectItem,ConfirmationService,MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { Empresa } from 'src/app/models/empresa.model';
import { Area } from '../../models/area.model';
import * as FileSaver from 'file-saver';
import { autoTable } from 'jspdf-autotable'; 
import { async } from 'rxjs/internal/scheduler/async';
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
    })

/*     await this.pruebaServices
    .buscarByEmpleados(this.idEmpresa).toPromise().then((data: any)=>{
      console.log("verificando",data);
      this.pruebas = [...data];
      this.pruebas.map(res=>{
        this.empresas.map(x=>{
        if (res.emdempresa === x.empid) {
          res.nomempresa = x.empnombre;
        }
        })
      })
      console.log("estas son:",this.pruebas);
      
    })  */

    await this.pruebaServices
    .buscarByEmpleadosRepor(this.idEmpresa).toPromise().then((data: any)=>{
     
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



      buscarArea(cpruebas:Empleado){
        this.area =[];
        this.pruebaServices.buscarByArea(cpruebas.emdid).toPromise().then((data:any)=>{
          console.log(data);
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
          console.log(data);
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
          car.emdnombres = car.emdnombres.toString()+" "+car.emdapellidos.toString();
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
