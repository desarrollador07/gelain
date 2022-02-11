import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Message, MessageService } from 'primeng/api';
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
  fechainicial: Date;
  fechafinal: Date;
  loading:boolean = true;
  dataCat:any [] = [];
  id:any;
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
  nombreGelain:any;
  nitGelain:any;
  correoGelain:any;
  telefono:any;
  fechaActual :Date;
  redGelain:any;
  nEmpresa:any;
  usuario:any;
  text:string;
  
  constructor(private pruebaServices:PruebaService,
              private _messageService: MessageService,
              private datepipe: DatePipe,
              private store: Store<AppState>) { 
    this.idEmpresa = sessionStorage.getItem("idEmpresa");
    this.usuario = sessionStorage.getItem("user");
    this.nEmpresa = sessionStorage.getItem("nombreEmpresa");
  }

  async ngOnInit() {
    this.store.select('empresas').subscribe(async res=>{

      if (res.empresa !== undefined) {
        this.id = res.empresa.empid;
      }else{
        this.id = this.idEmpresa;
      }
      this.limpiarData();
      if (this.id !== undefined && this.id !== null) {
        this.msgs = [];
      /*Consulta reporte áreas */
      await this.fnConsultarReporteAreas(this.id);
      }

      if(sessionStorage.getItem('idEmpresa') === null){
        this.showInfo();
        this.loading = false;
      }
    });
    this.datosGelain();
    const fecini = new Date();
    this.fechainicial = new Date(fecini.getFullYear(), fecini.getMonth()-1, 1);
    this.fechafinal = new Date();
    this.text = 'Reporte_Áreas_'+this.datepipe.transform(this.fechafinal, "yyyy-MM-dd");;
  }

  /*Consulta reportes áreas */
  async fnConsultarReporteAreas(id:number){
    
    await this.pruebaServices.getReporteAreas(id).toPromise().then((res:any) => {
      this.dataAreas = res;
      this.fnOrgPart1(); 
    });

    this.fnOrgPart2();
   
    this.loading = false;
  }

  /*Función que organiza la primer parte de la información de las areas */
  fnOrgPart1(){
    var nombreArea:string;
    var contador1:number = 0;
    var contador2:number = 0;
    var contador3:number = 0;
    var contador4:number = 0;
    var contador5:number = 0;
    var obj = {};
    var obj1 = {};

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
      this.dataCat.push(obj1);
      this.sales9.push(obj);
      contador1 = 0;
      contador2 = 0;
      contador3 = 0;
      contador4 = 0;
      contador5 = 0;
    });
  }
  /*Función que organiza la segunda parte de la información de las areas en el cual 
    organiza la información  como la necesita la grafica para su visualización */
  fnOrgPart2(){
     /*Proceso que permite eliminar todos los datos repetidos de un arreglo */
     var hash = {};
     this.sales9 = this.sales9.filter(function(current) {
       var exists = !hash[current.nombreArea];
       hash[current.nombreArea] = true;
       return exists;
     });
 
     var hash = {};
     this.dataCat = this.dataCat.filter(function(current) {
       var exists = !hash[current.label];
       hash[current.label] = true;
       return exists;
     });
 
     this.data = {
       labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
       datasets: this.dataCat
     }
  }

  limpiarData(){
    this.dataAreas = [];
    this.sales9 = [];
    this.data = [];
    this.dataCat = [];
  }

  generarLetra(){
    var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
    var numero = (Math.random()*15).toFixed(0);
    return letras[numero];
  }
  colorHEX(){
    var color = "";
    for(var i=0;i<6;i++){
      color = color + this.generarLetra() ;
    }
    return "#" + color;
  }

   /*Mensaje Informativo cuando esta seleccionada la empresa */
   showInfo() {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Info', detail:'SELECCIONE UNA EMPRESA'});
  }

  async getAreaByFiltro(){
    this.limpiarData();
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

    await this.buscarAreasByFechas(this.id,dateinicio,datefinal);

  }

  async buscarAreasByFechas(id:number,fechaInicial:string,fechaFinal:string){
    this.dataAreas = [];
    await this.pruebaServices.buscarAreasByFechas(id,fechaInicial,fechaFinal).toPromise().then((resp:any) => {
      this.dataAreas = resp;

      if (this.dataAreas.length === 0) {
        this._messageService.add({ severity: 'info', summary: 'Informativo', detail: 'No hay registros para el tipo de busqueda.', life: 3000 });
      }

      this.fnOrgPart1();
      
      this.loading = false;
    });

    this.fnOrgPart2();
  }

  datosGelain(){
    
    this.pruebaServices.getDatosEmpresaGelain().subscribe((data:any)=>{
      this.nombreGelain = data.nombre;
      this.nitGelain= data.nit;
      this.correoGelain= data.correo;
      this.telefono= data.telefono;
      this.redGelain= data.instagram;

    })
  }

}
