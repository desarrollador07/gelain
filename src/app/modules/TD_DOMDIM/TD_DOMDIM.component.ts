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

  sales: any[];
  sales2: any[];
  sales3: any[];
  sales4: any[];

  columns: any[];

  data: any;
  liderazgo:any[];
  relaciones:any[];
  retroalimentacion:any[];
  rela_colaboradores:any[];
  liderazgo2:any[] = [];
  relaciones2:any[] =[];
  retroalimentacion2:any[] =[];
  rela_colaboradores2:any[] =[];

  claridad:any[];
  capacitacion:any[];
  oportunidades:any[];
  manejo:any[];
  control:any[];

  claridad2:any[] = [];
  capacitacion2:any[]= [];
  oportunidades2:any[]= [];
  manejo2:any[]= [];
  control2:any[]= [];

  demandas_ambientales :any[];
  reponsabilidad :any[];
  consistencia_rol :any[];
  demandas_emocionales :any[];
  demandas_jornada :any[];
  influ_extralaboral :any[];
  demandas_cuantitativas :any[];
  demandas_mental :any[];

  demandas_ambientales2 :any[]= [];
  reponsabilidad2 :any[]= [];
  consistencia_rol2 :any[]= [];
  demandas_emocionales2 :any[]= [];
  demandas_jornada2 :any[]= [];
  influ_extralaboral2 :any[]= [];
  demandas_cuantitativas2 :any[]= [];
  demandas_mental2 :any[]= [];

  recompensas_trabajo :any[];
  reconocimiento :any[];

  recompensas_trabajo2 :any[] = [];
  reconocimiento2 :any[] = [];

  sinRiesgo:any;
  Total:any;
  rojo:any;
  amarillo:any;
  verde:any;

  constructor(private pruebaServices:PruebaService,private router: Router,
              private _confirmationServices: ConfirmationService,
              private _messageService: MessageService) {
                this.idEmpresa = localStorage.getItem("nameEmpresaEmp");
                this.idtemporal = 0;
                
   }

  async ngOnInit() {
    this.fnBuscarCatalogos();
    this.liderasgoYRelacionesSociales();
    this.fnBuscarCatalogosControl();
    this.controlSobreRol();
    this.fnBuscarCatalogosDemandas();
    this.Demandas();
    this.fnBuscarCatalogosRecompensas();
    this.Recompensas();
  }

  public fnBuscarCatalogos(): void {
    this.pruebaServices.getLiderazgoRA().toPromise().then((data:any)=>{
      for (let i = 0; i < data.length; i++) {
        this.fnAsisgnarDatosFiltros(data[i],i);
      }
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

  liderasgoYRelacionesSociales(){
    this.pruebaServices.getLiderazgoRA().toPromise().then((data:any)=>{
      this.liderazgo = data[0];
      this.relaciones = data[1];
      this.retroalimentacion = data[2];
      this.rela_colaboradores = data[3];
      this.sinRiesgo = 0;
      this.sales = [
        { brand: 'Sin riesgo o riesgo despreciable', liderazgo: this.liderazgo[0], relaciones: this.relaciones[0], retroalimentacion: this.retroalimentacion[0], rela_colaboradores: this.rela_colaboradores[0],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo bajo', liderazgo: this.liderazgo[1], relaciones: this.relaciones[1], retroalimentacion: this.retroalimentacion[1], rela_colaboradores: this.rela_colaboradores[1] ,TotalDominio:this.sinRiesgo},
        { brand: 'Riesgo medio', liderazgo: this.liderazgo[2], relaciones: this.relaciones[2], retroalimentacion: this.retroalimentacion[2], rela_colaboradores: this.rela_colaboradores[2],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo alto', liderazgo: this.liderazgo[3], relaciones: this.relaciones[3], retroalimentacion: this.retroalimentacion[3], rela_colaboradores: this.rela_colaboradores[3],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo muy alto', liderazgo: this.liderazgo[4], relaciones: this.relaciones[4], retroalimentacion: this.retroalimentacion[4], rela_colaboradores: this.rela_colaboradores[4],TotalDominio:this.sinRiesgo },
        { brand: 'TOTAL', liderazgo: this.liderazgo2[3], relaciones: this.relaciones2[3], retroalimentacion: this.retroalimentacion2[3], rela_colaboradores: this.rela_colaboradores2[3],TotalDominio:this.sinRiesgo },
    ];
      
    })
  }

  public fnBuscarCatalogosControl(): void {
    this.pruebaServices.getcontrolSobreRol().toPromise().then((data:any)=>{
      for (let i = 0; i < data.length; i++) {
        this.fnAsisgnarDatosFiltrosControl(data[i],i);
      }
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

  controlSobreRol(){
    this.pruebaServices.getcontrolSobreRol().toPromise().then((data:any)=>{
      this.claridad = data[0];
      this.capacitacion = data[1];
      this.oportunidades = data[3];
      this.manejo = data[2];
      this.control = data[0];
      this.sinRiesgo = 0;
      this.sales2 = [
        { brand: 'Sin riesgo o riesgo despreciable', claridad: this.claridad[0], capacitacion: this.capacitacion[0], oportunidades: this.oportunidades[0], manejo: this.manejo[0], control: this.control[0],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo bajo', claridad: this.claridad[1], capacitacion: this.capacitacion[1], oportunidades: this.oportunidades[1], manejo: this.manejo[1] ,control: this.control[1],TotalDominio:this.sinRiesgo},
        { brand: 'Riesgo medio', claridad: this.claridad[2], capacitacion: this.capacitacion[2], oportunidades: this.oportunidades[2], manejo: this.manejo[2],control: this.control[2],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo alto', claridad: this.claridad[3], capacitacion: this.capacitacion[3], oportunidades: this.oportunidades[3], manejo: this.manejo[3],control: this.control[3],TotalDominio:this.sinRiesgo },
        { brand: 'Riesgo muy alto', claridad: this.claridad[4], capacitacion: this.capacitacion[4], oportunidades: this.oportunidades[4], manejo: this.manejo[4],control: this.control[4],TotalDominio:this.sinRiesgo },
        { brand: 'TOTAL', claridad: this.claridad2[3], capacitacion: this.capacitacion2[3], oportunidades: this.oportunidades2[3], manejo: this.manejo2[3],control: this.control2[3],TotalDominio:this.sinRiesgo },
    ];
      
    })
  }

  public fnBuscarCatalogosDemandas(): void {
    this.pruebaServices.getDemandasTrabajo().toPromise().then((data:any)=>{
      for (let i = 0; i < data.length; i++) {
        this.fnAsisgnarDatosFiltrosDemandas(data[i],i);
      }
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

  Demandas(){
    this.pruebaServices.getDemandasTrabajo().toPromise().then((data:any)=>{
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
        { brand: 'TOTAL',                            demandas_ambientales: this.demandas_ambientales2[3],reponsabilidad: this.reponsabilidad2[3],consistencia_rol: this.consistencia_rol2[3],demandas_emocionales: this.demandas_emocionales2[3],demandas_jornada: this.demandas_jornada2[3],influ_extralaboral: this.influ_extralaboral2[3],demandas_cuantitativas: this.demandas_cuantitativas2[3],demandas_mental: this.demandas_mental2[3],TotalDominio:this.sinRiesgo },
    ];
      
    })
  }

  public fnBuscarCatalogosRecompensas(): void {
    this.pruebaServices.getRecompensas().toPromise().then((data:any)=>{
      for (let i = 0; i < data.length; i++) {
        this.fnAsisgnarDatosFiltrosRecompensas(data[i],i);
      }
    })

  }

  public fnAsisgnarDatosFiltrosRecompensas(data, tamaño:number): void {
    switch (tamaño) {
      case 0:
        this.Total =  data[0] + data[1] + data[2]+ data[3]+ data[4];
        this.rojo =  data[0] + data[1];
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

  Recompensas(){
    this.pruebaServices.getRecompensas().toPromise().then((data:any)=>{
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
      
    })
  }

}
