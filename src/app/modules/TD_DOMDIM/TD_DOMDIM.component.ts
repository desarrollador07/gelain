import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../models/empleado.mdel';
import { PruebaService } from '../../services/prueba.service';
import { SelectItem,ConfirmationService,MessageService} from 'primeng/api';
import {ChartModule} from 'primeng/chart';
import { style } from '@angular/animations';
@Component({
  selector: 'app-empleados',
  templateUrl: './TD_DOMDIM.component.html',
  styleUrls: ['./TD_DOMDIM.component.css']
})
export class TD_DOMDIMComponent implements OnInit {
  idEmpresa:any;
  idtemporal:any;
  prueba: Empleado;

  pruebas: Empleado[] = [];

  sales: any[]= [];
  sales2: any[]= [];
  sales3: any[]= [];
  sales4: any[]= [];
  sales5: any[]= [];

  columns: any[];

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

  sinRiesgo:any;
  Total:any;
  rojo:any;
  amarillo:any;
  verde:any;
  r:any;
  a:any;
  v:any;

  info1:any [] = [];
  info2:any [] = [];
  infopreF:any[] = [];
  infoF:any[] = [];
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

  constructor(private pruebaServices:PruebaService,private router: Router,
              private _confirmationServices: ConfirmationService,
              private _messageService: MessageService) {
                this.idEmpresa = localStorage.getItem("nameEmpresaEmp");
                this.idtemporal = 0;
                
   }

  async ngOnInit() {
    this.fnBuscarCatalogos();
      this.fnBuscarCatalogosControl();
    this.fnBuscarCatalogosDemandas();
    this.fnBuscarCatalogosRecompensas();
    this.fnBuscarCatalogosPsicoExtra();
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
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.liderazgo2.push(this.rojo,this.amarillo,this.verde,this.Total);
        console.log('pos 0',this.liderazgo2);
        break;
      case 1:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.relaciones2.push(this.rojo,this.amarillo,this.verde,this.Total);
        console.log('pos 1',this.relaciones2);
        break;
      case 2:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.retroalimentacion2.push(this.rojo,this.amarillo,this.verde,this.Total);
        console.log('pos 2',this.retroalimentacion2);
        break;
      case 3:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.rela_colaboradores2.push(this.rojo,this.amarillo,this.verde,this.Total);
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
        { brand: 'TOTAL', liderazgo: this.liderazgo2[3], relaciones: this.relaciones2[3], retroalimentacion: this.retroalimentacion2[3], rela_colaboradores: this.rela_colaboradores2[3],TotalDominio:this.sinRiesgo },
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
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.claridad2.push(this.rojo,this.amarillo,this.verde,this.Total);
        console.log('pos 0',this.liderazgo2);
        break;
      case 1:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.capacitacion2.push(this.rojo,this.amarillo,this.verde,this.Total);
        console.log('pos 1',this.relaciones2);
        break;
      case 2:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.manejo2.push(this.rojo,this.amarillo,this.verde,this.Total);
        console.log('pos 2',this.retroalimentacion2);
        break;
      case 3:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.oportunidades2.push(this.rojo,this.amarillo,this.verde,this.Total);
        console.log('pos 3',this.rela_colaboradores2);
        break;
        case 4:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.control2.push(this.rojo,this.amarillo,this.verde,this.Total);
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
        { brand: 'TOTAL', claridad: this.claridad2[3], capacitacion: this.capacitacion2[3], oportunidades: this.oportunidades2[3], manejo: this.manejo2[3],control: this.manejo2[3],TotalDominio:this.sinRiesgo },
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
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.demandas_ambientales2.push(this.rojo,this.amarillo,this.verde,this.Total);
        break;
      case 1:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.reponsabilidad2.push(this.rojo,this.amarillo,this.verde,this.Total);

        break;
      case 2:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.consistencia_rol2.push(this.rojo,this.amarillo,this.verde,this.Total);

        break;
      case 3:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.demandas_emocionales2.push(this.rojo,this.amarillo,this.verde,this.Total);

        break;
        case 4:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.demandas_jornada2.push(this.rojo,this.amarillo,this.verde,this.Total);

        break;
        case 5:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.influ_extralaboral2.push(this.rojo,this.amarillo,this.verde,this.Total);

        break;
        case 6:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.demandas_cuantitativas2.push(this.rojo,this.amarillo,this.verde,this.Total);

        break;
        case 7:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.demandas_mental2.push(this.rojo,this.amarillo,this.verde,this.Total);

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
        { brand: 'TOTAL',                            demandas_ambientales: this.demandas_ambientales2[3],reponsabilidad: this.demandas_ambientales2[3],consistencia_rol: this.demandas_ambientales2[3],demandas_emocionales: this.demandas_emocionales2[3],demandas_jornada: this.demandas_jornada2[3],influ_extralaboral: this.influ_extralaboral2[3],demandas_cuantitativas: this.demandas_cuantitativas2[3],demandas_mental: this.demandas_mental2[3],TotalDominio:this.sinRiesgo },
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
        this.rojo =  data[0] + data[1];
        this.r = (((this.rojo *100)/this.Total).toFixed(1));
        this.a = (((this.amarillo *100)/this.Total).toFixed(1));
        this.v = (((this.verde *100)/this.Total).toFixed(1));
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.recompensas_trabajo2.push(this.rojo,this.amarillo,this.verde,this.Total);
        break;
      case 1:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.reconocimiento2.push(this.rojo,this.amarillo,this.verde,this.Total);
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
        { brand: 'TOTAL',                            recompensas_trabajo: this.recompensas_trabajo2[3],reconocimiento: this.reconocimiento2[3],TotalDominio:this.sinRiesgo },
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
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.tiempo_fuera2.push(this.rojo,this.amarillo,this.verde,this.Total);
        break;
      case 1:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.relaciones_familiares2.push(this.rojo,this.amarillo,this.verde,this.Total);

        break;
      case 2:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.com_relaciones_interperson2.push(this.rojo,this.amarillo,this.verde,this.Total);

        break;
      case 3:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.situacion_economica2.push(this.rojo,this.amarillo,this.verde,this.Total);

        break;
        case 4:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.caract_vivienda2.push(this.rojo,this.amarillo,this.verde,this.Total);

        break;
        case 5:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.influencia_extralaboral2.push(this.rojo,this.amarillo,this.verde,this.Total);

        break;
        case 6:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
        this.amarillo = data[2];
        this.verde =  data[3]+ data[4];
        this.desplaz_vivienda2.push(this.rojo,this.amarillo,this.verde,this.Total);

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
      this.sinRiesgo = 0;
      this.sales5 = [
        { brand: 'Sin riesgo o riesgo despreciable', tiempo_fuera: this.tiempo_fuera[0], relaciones_familiares: this.relaciones_familiares[0], com_relaciones_interperson: this.com_relaciones_interperson[0], situacion_economica: this.situacion_economica[0], caract_vivienda: this.caract_vivienda[0],influencia_extralaboral: this.influencia_extralaboral[0],desplaz_vivienda: this.desplaz_vivienda[0],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo bajo',                      tiempo_fuera: this.tiempo_fuera[1], relaciones_familiares: this.relaciones_familiares[1], com_relaciones_interperson: this.com_relaciones_interperson[1], situacion_economica: this.situacion_economica[1], caract_vivienda: this.caract_vivienda[1],influencia_extralaboral: this.influencia_extralaboral[1],desplaz_vivienda: this.desplaz_vivienda[1],TotalDominio:this.sinRiesgo},
        { brand: 'Riesgo medio',                     tiempo_fuera: this.tiempo_fuera[2], relaciones_familiares: this.relaciones_familiares[2], com_relaciones_interperson: this.com_relaciones_interperson[2], situacion_economica: this.situacion_economica[2], caract_vivienda: this.caract_vivienda[2],influencia_extralaboral: this.influencia_extralaboral[2],desplaz_vivienda: this.desplaz_vivienda[2],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo alto',                      tiempo_fuera: this.tiempo_fuera[3], relaciones_familiares: this.relaciones_familiares[3], com_relaciones_interperson: this.com_relaciones_interperson[3], situacion_economica: this.situacion_economica[3], caract_vivienda: this.caract_vivienda[3],influencia_extralaboral: this.influencia_extralaboral[3],desplaz_vivienda: this.desplaz_vivienda[3],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo muy alto',                  tiempo_fuera: this.tiempo_fuera[4], relaciones_familiares: this.relaciones_familiares[4], com_relaciones_interperson: this.com_relaciones_interperson[4], situacion_economica: this.situacion_economica[4], caract_vivienda: this.caract_vivienda[4],influencia_extralaboral: this.influencia_extralaboral[4],desplaz_vivienda: this.desplaz_vivienda[4],TotalDominio:this.sinRiesgo },
        { brand: 'TOTAL',                            tiempo_fuera: this.tiempo_fuera2[3],relaciones_familiares: this.relaciones_familiares2[3],com_relaciones_interperson: this.com_relaciones_interperson2[3],situacion_economica: this.situacion_economica2[3],caract_vivienda: this.caract_vivienda2[3],influencia_extralaboral: this.influencia_extralaboral2[3],desplaz_vivienda: this.desplaz_vivienda2[3],TotalDominio:this.sinRiesgo },
    ];
  }


}
