import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../models/empleado.mdel';
import { PruebaService } from '../../services/prueba.service';
import { SelectItem,ConfirmationService,MessageService} from 'primeng/api';
import { IntlService } from "@progress/kendo-angular-intl";
import { LegendLabelsContentArgs } from '@progress/kendo-angular-charts';
import {ChartModule} from 'primeng/chart';
import { style } from '@angular/animations';
import { saveAs } from "@progress/kendo-file-saver";
import { geometry, fit, exportPDF, Group } from '@progress/kendo-drawing';



const products = [
  {
    ProductID: 1,
    ProductName: "Chai",
    UnitPrice: 18.0,
    Discontinued: true,
    code: "C1",
  },
  {
    ProductID: 2,
    ProductName: "Chang",
    UnitPrice: 19.0,
    Discontinued: false,
    code: "C2",
  }]


//   this.sales = [
//     { brand: 'Sin riesgo o riesgo despreciable', liderazgo: this.liderazgo[0], relaciones: this.relaciones[0], retroalimentacion: this.retroalimentacion[0], rela_colaboradores: this.rela_colaboradores[0],TotalDominio:'0' },
//     { brand: 'Riesgo bajo', liderazgo: this.liderazgo[1], relaciones: this.relaciones[1], retroalimentacion: this.retroalimentacion[1], rela_colaboradores: this.rela_colaboradores[1] ,TotalDominio:this.sinRiesgo},
//     { brand: 'Riesgo medio', liderazgo: this.liderazgo[2], relaciones: this.relaciones[2], retroalimentacion: this.retroalimentacion[2], rela_colaboradores: this.rela_colaboradores[2],TotalDominio:this.sinRiesgo },
//     { brand: 'Riesgo alto', liderazgo: this.liderazgo[3], relaciones: this.relaciones[3], retroalimentacion: this.retroalimentacion[3], rela_colaboradores: this.rela_colaboradores[3],TotalDominio:this.sinRiesgo },
//     { brand: 'Riesgo muy alto', liderazgo: this.liderazgo[4], relaciones: this.relaciones[4], retroalimentacion: this.retroalimentacion[4], rela_colaboradores: this.rela_colaboradores[4],TotalDominio:this.sinRiesgo },
//     { brand: 'TOTAL', liderazgo: this.liderazgo2[5], relaciones: this.relaciones2[5], retroalimentacion: this.retroalimentacion2[5], rela_colaboradores: this.rela_colaboradores2[5],TotalDominio:this.sinRiesgo },
// ];





@Component({
  selector: 'app-empleados',
  templateUrl: './TD_DOMDIM.component.html',
  styles: [
    `
      .k-pdf-export p {
        border: 2px dashed #aaa;
        padding: 10px;
      }

      kendo-pdf-export {
        font-family: "DejaVu Sans", "Arial", sans-serif;
        font-size: 12px;
      }
    `,
  ],
  
  styleUrls: ['./TD_DOMDIM.component.css']
})
export class TD_DOMDIMComponent implements OnInit {
  

  idEmpresa:any;
  idtemporal:any;
  usuario:any;
  nEmpresa:any;
  prueba: Empleado;

  pruebas: Empleado[] = [];

  sales: any[]= [];
  sales2: any[]= [];
  sales3: any[]= [];
  sales4: any[]= [];
  sales5: any[]= [];
  sales6: any[]= [];
  sales7: any[]= [];
  sales8: any[]= [];

  columns: any[];
  dataDona: any[];
  data: any;
  liderazgo:any[]= [];
  relaciones:any[]= [];
  retroalimentacion:any[]= [];
  rela_colaboradores:any[]= [];
  liderazgo2:any[] = [];
  relaciones2:any[] =[];
  retroalimentacion2:any[] =[];
  rela_colaboradores2:any[] =[];

  claridad:any[]= [];
  capacitacion:any[]= [];
  oportunidades:any[]= [];
  manejo:any[]= [];
  control:any[]= [];

  claridad2:any[] = [];
  capacitacion2:any[]= [];
  oportunidades2:any[]= [];
  manejo2:any[]= [];
  control2:any[]= [];

  demandas_ambientales :any[]= [];
  reponsabilidad :any[]= [];
  consistencia_rol :any[]= [];
  demandas_emocionales :any[]= [];
  demandas_jornada :any[]= [];
  influ_extralaboral :any[]= [];
  demandas_cuantitativas :any[]= [];
  demandas_mental :any[]= [];

  demandas_ambientales2 :any[]= [];
  reponsabilidad2 :any[]= [];
  consistencia_rol2 :any[]= [];
  demandas_emocionales2 :any[]= [];
  demandas_jornada2 :any[]= [];
  influ_extralaboral2 :any[]= [];
  demandas_cuantitativas2 :any[]= [];
  demandas_mental2 :any[]= [];

  recompensas_trabajo :any[]= [];
  reconocimiento :any[]= [];

  recompensas_trabajo2 :any[] = [];
  reconocimiento2 :any[] = [];


  tiempo_fuera :any[] = [];
  relaciones_familiares:any[] = [];
  com_relaciones_interperson:any[] = [];
  situacion_economica:any[] = [];
  caract_vivienda:any[] = [];
  influencia_extralaboral:any[] = [];
  desplaz_vivienda:any[] = [];

  tiempo_fuera2 :any[] = [];
  relaciones_familiares2:any[] = [];
  com_relaciones_interperson2:any[] = [];
  situacion_economica2:any[] = [];
  caract_vivienda2:any[] = [];
  influencia_extralaboral2:any[] = [];
  desplaz_vivienda2:any[] = [];

  FISIOLOGICAS :any[] = [];
  COMPORTAMIENTO_SOCIAL :any[] = [];
  INTEL_LABORA :any[] = [];
  PSICOEMOCIONALES :any[] = [];

  FISIOLOGICAS2 :any[] = [];
  COMPORTAMIENTO_SOCIAL2 :any[] = [];
  INTEL_LABORA2 :any[] = [];
  PSICOEMOCIONALES2 :any[] = [];

total_intralaboral :any[] = [];
total_extralaboral :any[] = [];
total_general :any[] = [];

total_intralaboral2 :any[] = [];
total_extralaboral2 :any[] = [];
total_general2 :any[] = [];


  sinRiesgo:any;
  sinRiesgoex:any[] = [];
  sinRiesgo2ex:any[] = [];
  Total:any;
  rojo:any;
  amarillo:any;
  verde:any;
  viche:any;
  naranja:any;
  r:any;
  a:any;
  v:any;
  vb:any;
  n:any;

  info1:any [] = [];
  info2:any [] = [];
  infopreF:any[] = [];
  infoF:any[] = [];
  donadata :any[] = [];
  tam:any;

  info11:any [] = [];
  info21:any [] = [];
  infopreF1:any[] = [];
  infoF1:any[] = [];
  tam1:any;

  info12:any [] = [];
  info22:any [] = [];
  infopreF2:any[] = [];
  infoF2:any[] = [];
  tam2:any;

  info13:any [] = [];
  info23:any [] = [];
  infopreF3:any[] = [];
  infoF3:any[] = [];
  tam3:any;

  info14:any [] = [];
  info24:any [] = [];
  infopreF4:any[] = [];
  infoF4:any[] = [];
  tam4:any;

  info15:any [] = [];
  info25:any [] = [];
  infopreF5:any[] = [];
  infoF5:any[] = [];
  tam5:any;

  Sin_riesgo_o_riesgo_despreciable :any;
  Riesgo_bajo:any;
  Riesgo_medio:any;
  Riesgo_alto :any;
  Riesgo_muy_alto:any;
  Sin_riesgo_o_riesgo_despreciableD :any;
  Riesgo_bajoD:any;
  Riesgo_medioD:any;
  Riesgo_altoD :any;
  Riesgo_muy_altoD:any;
  total :any;

  options2: any;

  fechaActual :Date;
  fecha :any;


  

  constructor(private pruebaServices:PruebaService,private router: Router,
              private _confirmationServices: ConfirmationService,
              private _messageService: MessageService,
               private intl: IntlService) {
                
                this.idEmpresa = localStorage.getItem("nameEmpresaEmp");
                this.usuario = localStorage.getItem("user");
                this.nEmpresa = localStorage.getItem("nombreEmpresa");
                this.idtemporal = 0;

                


                
                
   }

  async ngOnInit() {
    this.fechaActual = new Date();
    this.fecha=String(this.fechaActual);
    this.fnBuscarCatalogos();
      this.fnBuscarCatalogosControl();
    this.fnBuscarCatalogosDemandas();
    this.fnBuscarCatalogosRecompensas();
    this.fnBuscarCatalogosPsicoExtra();
    this.fnBuscarCatalogosPsicoEstresDetalles();
    this.fnBuscarCatalogosTotal();
    this.metodo();
  }
  public labelContent(args: LegendLabelsContentArgs): string {
    return `${args.dataItem.category} : ${args.dataItem.value}`;
}
  public fnBuscarCatalogos(): void {
    this.pruebaServices.getLiderazgoRA(this.idEmpresa).toPromise().then((data:any)=>{
      this.info1 = data;
      this.pruebaServices.getLiderazgoRB(this.idEmpresa).toPromise().then((data:any)=>{
        this.info2 = data;
        this.tam = data.length;
         for (let i = 0; i < this.tam; i++) {
          this.infopreF[i] = this.info1[i].map( (item, ix) => item + this.info2[i][ix] );
        } 
        console.log('result',this.infopreF);
        for (let j = 0; j < this.infopreF.length; j++) {
          this.fnAsisgnarDatosFiltros(this.infopreF[j],j);
        }
        this.liderasgoYRelacionesSociales(this.infopreF);
      })
    })

  }

  public fnAsisgnarDatosFiltros(data, tamaño:number): void {
    switch (tamaño) {
      case 0:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        console.log('pos v',this.v);
        console.log('pos vb',this.vb);
        this.liderazgo2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
       
        break;
      case 1:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.relaciones2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        console.log('pos 1',this.relaciones2);
        break;
      case 2:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.retroalimentacion2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        console.log('pos 2',this.retroalimentacion2);
        break;
      case 3:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.rela_colaboradores2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        console.log('pos 3',this.rela_colaboradores2);
        break;
      default:
        break;
    }
  }

  liderasgoYRelacionesSociales(data){

     
      console.log('resulttabla',data);
      this.liderazgo = data[0];
      this.relaciones = data[1];
      this.retroalimentacion = data[2];
      this.rela_colaboradores = data[3];
      this.sinRiesgo = 0;
      this.sales = [
        { brand: 'Sin riesgo o riesgo despreciable', liderazgo: this.liderazgo[0], relaciones: this.relaciones[0], retroalimentacion: this.retroalimentacion[0], rela_colaboradores: this.rela_colaboradores[0],TotalDominio:'0' },
        { brand: 'Riesgo bajo', liderazgo: this.liderazgo[1], relaciones: this.relaciones[1], retroalimentacion: this.retroalimentacion[1], rela_colaboradores: this.rela_colaboradores[1] ,TotalDominio:this.sinRiesgo},
        { brand: 'Riesgo medio', liderazgo: this.liderazgo[2], relaciones: this.relaciones[2], retroalimentacion: this.retroalimentacion[2], rela_colaboradores: this.rela_colaboradores[2],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo alto', liderazgo: this.liderazgo[3], relaciones: this.relaciones[3], retroalimentacion: this.retroalimentacion[3], rela_colaboradores: this.rela_colaboradores[3],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo muy alto', liderazgo: this.liderazgo[4], relaciones: this.relaciones[4], retroalimentacion: this.retroalimentacion[4], rela_colaboradores: this.rela_colaboradores[4],TotalDominio:this.sinRiesgo },
        { brand: 'TOTAL', liderazgo: this.liderazgo2[5], relaciones: this.relaciones2[5], retroalimentacion: this.retroalimentacion2[5], rela_colaboradores: this.rela_colaboradores2[5],TotalDominio:this.sinRiesgo },
    ];
      
    
  }

  public fnBuscarCatalogosControl(): void {
    this.pruebaServices.getcontrolSobreRol(this.idEmpresa).toPromise().then((data:any)=>{
      this.info11 = data;
      this.pruebaServices.getcontrolSobreRolB(this.idEmpresa).toPromise().then((data:any)=>{
        this.info21 = data;
        this.tam1 = data.length;
         for (let i = 0; i < this.tam1; i++) {
          this.infopreF1[i] = this.info11[i].map( (item, ix) => item + this.info21[i][ix] );
        } 
        console.log('result',this.infopreF1);
        for (let j = 0; j < this.infopreF1.length; j++) {
          this.fnAsisgnarDatosFiltrosControl(this.infopreF1[j],j);
        }
        this.controlSobreRol(this.infopreF1);
      }) 
    })

  }

  public fnAsisgnarDatosFiltrosControl(data, tamaño:number): void {
    switch (tamaño) {
      case 0:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.claridad2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        console.log('pos 0',this.liderazgo2);
        break;
      case 1:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.capacitacion2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        console.log('pos 1',this.relaciones2);
        break;
      case 2:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.manejo2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        console.log('pos 2',this.retroalimentacion2);
        break;
      case 3:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.oportunidades2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        console.log('pos 3',this.rela_colaboradores2);
        break;
        case 4:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.control2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        console.log('pos 3',this.rela_colaboradores2);
        break;
      default:
        break;
    }
  }

  controlSobreRol(data){
      this.claridad = data[0]
      this.capacitacion = data[1];
      this.oportunidades = data[3];
      this.manejo = data[2];
      this.control = data[4];
      this.sinRiesgo = 0;
      this.sales2 = [
        { brand: 'Sin riesgo o riesgo despreciable', claridad: this.claridad[0], capacitacion: this.capacitacion[0], oportunidades: this.oportunidades[0], manejo: this.manejo[0], control: this.control[0],TotalDominio:'0' },
        { brand: 'Riesgo bajo', claridad: this.claridad[1], capacitacion: this.capacitacion[1], oportunidades: this.oportunidades[1], manejo: this.manejo[1] ,control: this.control[1],TotalDominio:this.sinRiesgo},
        { brand: 'Riesgo medio', claridad: this.claridad[2], capacitacion: this.capacitacion[2], oportunidades: this.oportunidades[2], manejo: this.manejo[2],control: this.control[2],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo alto', claridad: this.claridad[3], capacitacion: this.capacitacion[3], oportunidades: this.oportunidades[3], manejo: this.manejo[3],control: this.control[3],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo muy alto', claridad: this.claridad[4], capacitacion: this.capacitacion[4], oportunidades: this.oportunidades[4], manejo: this.manejo[4],control: this.control[4],TotalDominio:this.sinRiesgo },
        { brand: 'TOTAL', claridad: this.claridad2[5], capacitacion: this.capacitacion2[5], oportunidades: this.oportunidades2[5], manejo: this.manejo2[5],control: this.manejo2[5],TotalDominio:this.sinRiesgo },
    ];
 
  }

  public fnBuscarCatalogosDemandas(): void {
    this.pruebaServices.getDemandasTrabajo(this.idEmpresa).toPromise().then((data:any)=>{
      this.info13 = data;
      this.pruebaServices.getDemandasTrabajoB(this.idEmpresa).toPromise().then((data:any)=>{
        this.info23 = data;
        this.tam3 = data.length;
         for (let i = 0; i < this.tam3; i++) {
          this.infopreF3[i] = this.info13[i].map( (item, ix) => item + this.info23[i][ix] );
        } 
        console.log('result',this.infopreF3);
        for (let j = 0; j < this.infopreF3.length; j++) {
          this.fnAsisgnarDatosFiltrosDemandas(this.infopreF3[j],j);
        }
          this.Demandas(this.infopreF3);
    })
  })

  }

  public fnAsisgnarDatosFiltrosDemandas(data, tamaño:number): void {
    switch (tamaño) {
      case 0:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.demandas_ambientales2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        break;
      case 1:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.reponsabilidad2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
      case 2:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.consistencia_rol2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
      case 3:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.demandas_emocionales2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
        case 4:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.demandas_jornada2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
        case 5:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.influ_extralaboral2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
        case 6:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.demandas_cuantitativas2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
        case 7:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.demandas_mental2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
      default:
        break;
    }
  }

  Demandas(data){
    console.log('resulttablaDemanada',data);
      this.demandas_ambientales = data[0];
      this.reponsabilidad = data[1];
      this.consistencia_rol = data[2];
      this.demandas_emocionales = data[3];
      this.demandas_jornada = data[4];
      this.influ_extralaboral = data[5];
      this.demandas_cuantitativas = data[6];
      this.demandas_mental= data[7];
      this.sinRiesgo = 0;
      this.sales3 = [
        { brand: 'Sin riesgo o riesgo despreciable', demandas_ambientales: this.demandas_ambientales[0], reponsabilidad: this.reponsabilidad[0], consistencia_rol: this.consistencia_rol[0], demandas_emocionales: this.demandas_emocionales[0], demandas_jornada: this.demandas_jornada[0],influ_extralaboral: this.influ_extralaboral[0],demandas_cuantitativas: this.demandas_cuantitativas[0],demandas_mental: this.demandas_mental[0],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo bajo',                      demandas_ambientales: this.demandas_ambientales[1], reponsabilidad: this.reponsabilidad[1], consistencia_rol: this.consistencia_rol[1], demandas_emocionales: this.demandas_emocionales[1], demandas_jornada: this.demandas_jornada[1],influ_extralaboral: this.influ_extralaboral[1],demandas_cuantitativas: this.demandas_cuantitativas[1],demandas_mental: this.demandas_mental[1],TotalDominio:this.sinRiesgo},
        { brand: 'Riesgo medio',                     demandas_ambientales: this.demandas_ambientales[2], reponsabilidad: this.reponsabilidad[2], consistencia_rol: this.consistencia_rol[2], demandas_emocionales: this.demandas_emocionales[2], demandas_jornada: this.demandas_jornada[2],influ_extralaboral: this.influ_extralaboral[2],demandas_cuantitativas: this.demandas_cuantitativas[2],demandas_mental: this.demandas_mental[2],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo alto',                      demandas_ambientales: this.demandas_ambientales[3], reponsabilidad: this.reponsabilidad[3], consistencia_rol: this.consistencia_rol[3], demandas_emocionales: this.demandas_emocionales[3], demandas_jornada: this.demandas_jornada[3],influ_extralaboral: this.influ_extralaboral[3],demandas_cuantitativas: this.demandas_cuantitativas[3],demandas_mental: this.demandas_mental[3],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo muy alto',                  demandas_ambientales: this.demandas_ambientales[4], reponsabilidad: this.reponsabilidad[4], consistencia_rol: this.consistencia_rol[4], demandas_emocionales: this.demandas_emocionales[4], demandas_jornada: this.demandas_jornada[4],influ_extralaboral: this.influ_extralaboral[4],demandas_cuantitativas: this.demandas_cuantitativas[4],demandas_mental: this.demandas_mental[4],TotalDominio:this.sinRiesgo },
        { brand: 'No evaluado',                      demandas_ambientales:'0', reponsabilidad:this.demandas_ambientales2[3] - this.reponsabilidad2[3], consistencia_rol:this.demandas_ambientales2[3] - this.consistencia_rol2[3], demandas_emocionales:'0', demandas_jornada: '0',influ_extralaboral: '0',demandas_cuantitativas: '0',demandas_mental: '0',TotalDominio:this.sinRiesgo },
        { brand: 'TOTAL',                            demandas_ambientales: this.demandas_ambientales2[5],reponsabilidad: this.demandas_ambientales2[5],consistencia_rol: this.demandas_ambientales2[5],demandas_emocionales: this.demandas_emocionales2[5],demandas_jornada: this.demandas_jornada2[5],influ_extralaboral: this.influ_extralaboral2[5],demandas_cuantitativas: this.demandas_cuantitativas2[5],demandas_mental: this.demandas_mental2[5],TotalDominio:this.sinRiesgo },
    ];
  }

  public fnBuscarCatalogosRecompensas(): void {
    this.pruebaServices.getRecompensas(this.idEmpresa).toPromise().then((data:any)=>{
      this.info12 = data;
      this.pruebaServices.getRecompensasB(this.idEmpresa).toPromise().then((data:any)=>{
        this.info22 = data;
        this.tam2 = data.length;
        for (let i = 0; i < this.tam2; i++) {
          this.infopreF2[i] = this.info12[i].map( (item, ix) => item + this.info22[i][ix] );
        } 
        console.log('result',this.infopreF2);
        for (let j = 0; j < this.infopreF2.length; j++) {
          this.fnAsisgnarDatosFiltrosRecompensas(this.infopreF2[j],j);
        }
        this.Recompensas(this.infopreF2);
    })
  })
  }

  public fnAsisgnarDatosFiltrosRecompensas(data, tamaño:number): void {
    switch (tamaño) {
      case 0:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.recompensas_trabajo2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        break;
      case 1:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.reconocimiento2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        break;
      default:
        break;
    }
  }

  Recompensas(data){
    console.log('resulttablarec',data);
      this.recompensas_trabajo = data[0];
      this.reconocimiento = data[1];
      this.sinRiesgo = 0;
      this.sales4 = [
        { brand: 'Sin riesgo o riesgo despreciable', recompensas_trabajo: this.recompensas_trabajo[0], reconocimiento: this.reconocimiento[0],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo bajo',                      recompensas_trabajo: this.recompensas_trabajo[1], reconocimiento: this.reconocimiento[1],TotalDominio:this.sinRiesgo},
        { brand: 'Riesgo medio',                     recompensas_trabajo: this.recompensas_trabajo[2], reconocimiento: this.reconocimiento[2],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo alto',                      recompensas_trabajo: this.recompensas_trabajo[3], reconocimiento: this.reconocimiento[3],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo muy alto',                  recompensas_trabajo: this.recompensas_trabajo[4], reconocimiento: this.reconocimiento[4],TotalDominio:this.sinRiesgo },
        { brand: 'TOTAL',                            recompensas_trabajo: this.recompensas_trabajo2[5],reconocimiento: this.reconocimiento2[5],TotalDominio:this.sinRiesgo },
    ];
      
    
  }




  public fnBuscarCatalogosPsicoExtra(): void {
    this.pruebaServices.getPSICOSOCIAL_EXTRALABORAL(this.idEmpresa).toPromise().then((data:any)=>{
      this.info14 = data;
      console.log('wwww',this.info14);
      
        for (let j = 0; j < this.info14.length; j++) {
          this.fnAsisgnarDatosFiltrosPsicoExtra(this.info14[j],j);
        }
          this.PsicoExtra(this.info14);
    })
  

  }

  public fnAsisgnarDatosFiltrosPsicoExtra(data, tamaño:number): void {
    switch (tamaño) {
      case 0:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.tiempo_fuera2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        break;
      case 1:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.relaciones_familiares2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
      case 2:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.com_relaciones_interperson2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
      case 3:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.situacion_economica2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
        case 4:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.caract_vivienda2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
        case 5:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.influencia_extralaboral2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
        case 6:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.desplaz_vivienda2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
        case 7:
          this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
          this.sinRiesgo2ex.push(this.Total);
  
          break;
      default:
        break;
    }
  }

  PsicoExtra(data){
    console.log('resulttablaDemanada',data);
      this.tiempo_fuera  = data[0];
      this.relaciones_familiares = data[1];
      this.com_relaciones_interperson = data[2];
      this.situacion_economica = data[3];
      this.caract_vivienda = data[4];
      this.influencia_extralaboral = data[5];
      this.desplaz_vivienda = data[6];
      this.sinRiesgoex = data[7];
      this.sales5 = [
        { brand: 'Sin riesgo o riesgo despreciable', tiempo_fuera: this.tiempo_fuera[0], relaciones_familiares: this.relaciones_familiares[0], com_relaciones_interperson: this.com_relaciones_interperson[0], situacion_economica: this.situacion_economica[0], caract_vivienda: this.caract_vivienda[0],influencia_extralaboral: this.influencia_extralaboral[0],desplaz_vivienda: this.desplaz_vivienda[0],TotalDominio:this.sinRiesgoex[0] },
        { brand: 'Riesgo bajo',                      tiempo_fuera: this.tiempo_fuera[1], relaciones_familiares: this.relaciones_familiares[1], com_relaciones_interperson: this.com_relaciones_interperson[1], situacion_economica: this.situacion_economica[1], caract_vivienda: this.caract_vivienda[1],influencia_extralaboral: this.influencia_extralaboral[1],desplaz_vivienda: this.desplaz_vivienda[1],TotalDominio:this.sinRiesgoex[1]},
        { brand: 'Riesgo medio',                     tiempo_fuera: this.tiempo_fuera[2], relaciones_familiares: this.relaciones_familiares[2], com_relaciones_interperson: this.com_relaciones_interperson[2], situacion_economica: this.situacion_economica[2], caract_vivienda: this.caract_vivienda[2],influencia_extralaboral: this.influencia_extralaboral[2],desplaz_vivienda: this.desplaz_vivienda[2],TotalDominio:this.sinRiesgoex[2] },
        { brand: 'Riesgo alto',                      tiempo_fuera: this.tiempo_fuera[3], relaciones_familiares: this.relaciones_familiares[3], com_relaciones_interperson: this.com_relaciones_interperson[3], situacion_economica: this.situacion_economica[3], caract_vivienda: this.caract_vivienda[3],influencia_extralaboral: this.influencia_extralaboral[3],desplaz_vivienda: this.desplaz_vivienda[3],TotalDominio:this.sinRiesgoex[3] },
        { brand: 'Riesgo muy alto',                  tiempo_fuera: this.tiempo_fuera[4], relaciones_familiares: this.relaciones_familiares[4], com_relaciones_interperson: this.com_relaciones_interperson[4], situacion_economica: this.situacion_economica[4], caract_vivienda: this.caract_vivienda[4],influencia_extralaboral: this.influencia_extralaboral[4],desplaz_vivienda: this.desplaz_vivienda[4],TotalDominio:this.sinRiesgoex[4] },
        { brand: 'TOTAL',                            tiempo_fuera: this.tiempo_fuera2[5],relaciones_familiares: this.relaciones_familiares2[5],com_relaciones_interperson: this.com_relaciones_interperson2[5],situacion_economica: this.situacion_economica2[5],caract_vivienda: this.caract_vivienda2[5],influencia_extralaboral: this.influencia_extralaboral2[5],desplaz_vivienda: this.desplaz_vivienda2[5],TotalDominio:this.sinRiesgo2ex[0] },
    ];
  }

  

  public fnBuscarCatalogosPsicoEstresDetalles(): void {
    this.pruebaServices.getESTRES_DETALLES(this.idEmpresa).toPromise().then((data:any)=>{
      this.info14 = data;
  
      
        for (let j = 0; j < this.info14.length; j++) {
          this.fnAsisgnarDatosFiltrosESTRES_DETALLES(this.info14[j],j);
        }
          this.ESTRES_DETALLES(this.info14);
    })
  

  }

  public fnAsisgnarDatosFiltrosESTRES_DETALLES(data, tamaño:number): void {
    switch (tamaño) {
      case 0:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.FISIOLOGICAS2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        break;
      case 1:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.COMPORTAMIENTO_SOCIAL2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
      case 2:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.INTEL_LABORA2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
        case 3:
          this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
          this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
          this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
          this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
          this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
          this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
          this.PSICOEMOCIONALES2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
      default:
        break;
    }
  }

  ESTRES_DETALLES(data){
    
      this.FISIOLOGICAS  = data[0];
      this.COMPORTAMIENTO_SOCIAL = data[1];
      this.INTEL_LABORA = data[2];
      this.	PSICOEMOCIONALES = data[3];
      this.sinRiesgo = 0;
      this.sales6 = [
        { brand: 'Sin riesgo o riesgo despreciable', FISIOLOGICAS: this.FISIOLOGICAS[0], COMPORTAMIENTO_SOCIAL: this.COMPORTAMIENTO_SOCIAL[0], INTEL_LABORA: this.INTEL_LABORA[0], PSICOEMOCIONALES: this.PSICOEMOCIONALES[0], TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo bajo',                      FISIOLOGICAS: this.FISIOLOGICAS[1], COMPORTAMIENTO_SOCIAL: this.COMPORTAMIENTO_SOCIAL[1], INTEL_LABORA: this.INTEL_LABORA[1], PSICOEMOCIONALES: this.PSICOEMOCIONALES[1], TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo medio',                     FISIOLOGICAS: this.FISIOLOGICAS[2], COMPORTAMIENTO_SOCIAL: this.COMPORTAMIENTO_SOCIAL[2], INTEL_LABORA: this.INTEL_LABORA[2], PSICOEMOCIONALES: this.PSICOEMOCIONALES[2], TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo alto',                      FISIOLOGICAS: this.FISIOLOGICAS[3], COMPORTAMIENTO_SOCIAL: this.COMPORTAMIENTO_SOCIAL[3], INTEL_LABORA: this.INTEL_LABORA[3], PSICOEMOCIONALES: this.PSICOEMOCIONALES[3], TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo muy alto',                  FISIOLOGICAS: this.FISIOLOGICAS[4], COMPORTAMIENTO_SOCIAL: this.COMPORTAMIENTO_SOCIAL[4], INTEL_LABORA: this.INTEL_LABORA[4], PSICOEMOCIONALES: this.PSICOEMOCIONALES[4], TotalDominio:this.sinRiesgo },
        { brand: 'TOTAL',                            FISIOLOGICAS: this.FISIOLOGICAS2[5],COMPORTAMIENTO_SOCIAL: this.COMPORTAMIENTO_SOCIAL2[5],INTEL_LABORA: this.INTEL_LABORA2[5],PSICOEMOCIONALES: this.PSICOEMOCIONALES2[5],TotalDominio:this.sinRiesgo },
    ];
  }

  public fnBuscarCatalogosTotal(): void {
    this.pruebaServices.getTotalGeneral(this.idEmpresa).toPromise().then((data:any)=>{
      this.info15 = data;
  
      
        for (let j = 0; j < this.info15.length; j++) {
          this.fnAsisgnarDatosFiltrosTotalGeneral(this.info15[j],j);
        }
          this.TotalGeneral(this.info15);
    })
  

  }

  public fnAsisgnarDatosFiltrosTotalGeneral(data, tamaño:number): void {
    switch (tamaño) {
      case 0:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.total_intralaboral2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);
        break;
      case 1:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.total_extralaboral2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
      case 2:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.v = Number((((data[0] *100)/this.Total)).toFixed(1));
        this.vb = Number((((data[1] *100)/this.Total)).toFixed(1));
        this.a = Number((((data[2] *100)/this.Total)).toFixed(1));
        this.n = Number((((data[3] *100)/this.Total)).toFixed(1));
        this.r = Number((((data[4] *100)/this.Total)).toFixed(1));
        this.total_general2.push(this.v, this.vb , this.a, this.n, this.r,this.Total);

        break;
      default:
        break;
    }
  }

  TotalGeneral(data){
    
      this.total_intralaboral  = data[0];
      this.total_extralaboral = data[1];
      this.total_general = data[2];
      this.sales8 = [
        { brand: 'Sin riesgo o riesgo despreciable', total_intralaboral: this.total_intralaboral[0], total_extralaboral: this.total_extralaboral[0], total_general: this.total_general[0] },
        { brand: 'Riesgo bajo',                      total_intralaboral: this.total_intralaboral[1], total_extralaboral: this.total_extralaboral[1], total_general: this.total_general[1] },
        { brand: 'Riesgo medio',                     total_intralaboral: this.total_intralaboral[2], total_extralaboral: this.total_extralaboral[2], total_general: this.total_general[2] },
        { brand: 'Riesgo alto',                      total_intralaboral: this.total_intralaboral[3], total_extralaboral: this.total_extralaboral[3], total_general: this.total_general[3] },
        { brand: 'Riesgo muy alto',                  total_intralaboral: this.total_intralaboral[4], total_extralaboral: this.total_extralaboral[4], total_general: this.total_general[4] },
        { brand: 'TOTAL',                            total_intralaboral: this.total_intralaboral2[5],total_extralaboral: this.total_extralaboral2[5],total_general: this.total_general2[5] },
    ];
  }

  metodo(){
    this.pruebaServices.getESTRESTOTAL(this.idEmpresa).subscribe((data) => {
      console.log("donaDATA",data);
      this.donadata = data[0]
      this.total = this.donadata[0] + this.donadata[1] + this.donadata[2] + this.donadata[3] + this.donadata[4];
      this.Sin_riesgo_o_riesgo_despreciable = this.donadata[0];
      this.Riesgo_bajo =this.donadata[1];
      this.Riesgo_medio =this.donadata[2];
      this.Riesgo_alto =this.donadata[3];
      this.Riesgo_muy_alto = this.donadata[4];
      

      this.sales7 = [
        { brand: 'Sin riesgo o riesgo despreciable', TOTAL_ESTRES: this.Sin_riesgo_o_riesgo_despreciable },
        { brand: 'Riesgo bajo',                      TOTAL_ESTRES: this.Riesgo_bajo },
        { brand: 'Riesgo medio',                     TOTAL_ESTRES: this.Riesgo_medio },
        { brand: 'Riesgo alto',                      TOTAL_ESTRES: this.Riesgo_alto },
        { brand: 'Riesgo muy alto',                  TOTAL_ESTRES: this.Riesgo_muy_alto },
        { brand: 'TOTAL',                            TOTAL_ESTRES: this.total },
    ];

    this.Sin_riesgo_o_riesgo_despreciableD = Number((((this.donadata[0] *100)/this.total)).toFixed(1));
    this.Riesgo_bajoD =Number((((this.donadata[1] *100)/this.total)));
    this.Riesgo_medioD =Number((((this.donadata[2] *100)/this.total)));
    this.Riesgo_altoD =((this.donadata[3] *100)/this.total);
    this.Riesgo_muy_altoD = Number((((this.donadata[4] *100)/this.total)));


      console.log("S",this.Sin_riesgo_o_riesgo_despreciableD);
      console.log("B", this.Riesgo_bajoD);
      console.log("M",this.Riesgo_medioD);
      console.log("A",this.Riesgo_altoD);
      console.log("mA",this.Riesgo_muy_altoD);
      console.log("T",this.total);
      this.dataDona = [{ category: 'Riesgo_muy_alto', value: (new Intl.NumberFormat().format(this.Riesgo_muy_altoD ))},
      { category: 'Riesgo_bajo', value: (new Intl.NumberFormat().format(this.Riesgo_bajoD ))  },
      { category: 'Riesgo_medio', value: (new Intl.NumberFormat().format(this.Riesgo_medioD ))  },
      { category: 'Riesgo_alto', value: (new Intl.NumberFormat().format(this.Riesgo_altoD ))  },
      { category: 'Riesgo_muy_alto', value: (new Intl.NumberFormat().format(this.Riesgo_muy_altoD ))   },
      { category: 'Sin_riesgo_o_riesgo_despreciable', value: (new Intl.NumberFormat().format(this.Sin_riesgo_o_riesgo_despreciableD)) }];

      this.options2 = {
          title: {
              display: true,
              // text: "Facturación Mensual",
              fontSize: 16,
          },
          legend: {
              position: "bottom",
          },
      };
         

    });      
  }

  notes = {
    icon: { background:'#eee', border: { color: '#999', dashType: 'solid', width: 1 }, size: undefined, type: 'sqaure' },
    label: { color: '#000', position: 'inside', rotation: 0 },
    position: 'top',
    line: { color: '#999', dashType: 'dash', length: 10, width: 1 }
  }


}
