import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Message } from 'primeng/api';
import { AppState } from 'src/app/app.reducer';
/*Servicios */
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-reporte-areas',
  templateUrl: './reporte-areas.component.html',
  styleUrls: ['./reporte-areas.component.css']
})
export class ReporteAreasComponent implements OnInit {
  
  dataAreas:any [] = [];/*Arreglo data Áreas */
  tempGraficaArea:string [] = [];
  dataGrafica: any; /*Data que necesita la grafica de areas */
  sales9: any[] = [];/*Data de la tabla de Reporte Áreas con los datos procesados */
  idEmpresa:any;
  data: any;
  msgs: Message[] = [];
  
  constructor(private pruebaServices:PruebaService,
              private store: Store<AppState>) { 
    this.idEmpresa = sessionStorage.getItem("idEmpresa");
  }

  async ngOnInit() {
    this.store.select('empresas').subscribe(async res=>{
      var id:number;
      if (res.empresa !== undefined) {
        id = res.empresa.empid;
      }else{
        id = this.idEmpresa;
      }
      this.limpiarData();
      if (id !== undefined && id !== null) {
        this.msgs = [];
      /*Consulta reporte áreas */
      await this.fnConsultarReporteAreas(id);
      }

      if(sessionStorage.getItem('idEmpresa') === null){
        this.showInfo();
      }
    });
    
  }

  /*Consulta reportes áreas */
  async fnConsultarReporteAreas(id:number){
    var nombreArea:string;
    var contador1:number = 0;
    var contador2:number = 0;
    var contador3:number = 0;
    var contador4:number = 0;
    var contador5:number = 0;
    var obj = {};
    var obj1 = {};
    var dataCat:any [] = [];
    
  await this.pruebaServices.getReporteAreas(id).toPromise().then((res:any) => {

    this.dataAreas = res;
    
    this.dataAreas.map(datai => {
      nombreArea = datai.arenombre;
      this.dataAreas.map(dataj => {
        
        if (nombreArea === dataj.arenombre) {
          const categoria:number = Number(dataj.total_general);
          /*Categorias 1: Sin riego, 2: Riego bajo, 3: Riego medio, 4: Riego Alto, 5: Riego muy alto */
          switch (categoria) {
            case 1:
              contador1 += 1;
              break;
            case 2:
              contador2 += 1;
              break;
            case 3:
              contador3 += 1;
              break;
            case 4:
              contador4 += 1;
              break;
            case 5:
              contador5 += 1;
              break;      
            default:
              break;
          }
         
        } 
      });

      obj = {
        nombreArea,
        categorias: {
          cat1:contador1,
          cat2:contador2,
          cat3:contador3,
          cat4:contador4,
          cat5:contador5
        }
      }
      
      obj1 = {
        label:nombreArea,
            backgroundColor: this.colorHEX(),
            borderColor: '#464444',
            data:[
              contador1,
              contador2,
              contador3,
              contador4,
              contador5
            ]
      }
      dataCat.push(obj1);
      this.sales9.push(obj);
      contador1 = 0;
      contador2 = 0;
      contador3 = 0;
      contador4 = 0;
      contador5 = 0;
    });
       
  });
  
    /*Proceso que permite eliminar todos los datos repetidos de un arreglo */
    var hash = {};
    this.sales9 = this.sales9.filter(function(current) {
      var exists = !hash[current.nombreArea];
      hash[current.nombreArea] = true;
      return exists;
    });

    var hash = {};
    dataCat = dataCat.filter(function(current) {
      var exists = !hash[current.label];
      hash[current.label] = true;
      return exists;
    });

    this.data = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
      datasets: dataCat
    }

  }

  limpiarData(){
    this.dataAreas = [];
    this.sales9 = [];
    this.data = [];
  }

  generarLetra(){
    var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
    var numero = (Math.random()*15).toFixed(0);
    return letras[numero];
  }
  colorHEX(){
    var coolor = "";
    for(var i=0;i<6;i++){
      coolor = coolor + this.generarLetra() ;
    }
    return "#" + coolor;
  }

   /*Mensaje Informativo cuando esta seleccionada la empresa */
   showInfo() {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Info', detail:'SELECCIONE UNA EMPRESA'});
  }

}
