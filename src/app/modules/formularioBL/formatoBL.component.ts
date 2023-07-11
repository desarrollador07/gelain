import { Component, OnInit } from '@angular/core';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
/*Modulos */
import { MessageService, MenuItem, SelectItem } from 'primeng/api';
/*Modelos */
import { FormatoB } from '../../models/formatoB.model';
/*Servicios */
import { FormatoBService } from 'src/app/services/formato-b.service';
import { PruebaService } from '../../services/prueba.service';


@Component({
  selector: 'app-formatoB',
  templateUrl: './formatoBL.component.html',
  styleUrls: ['./formatoBL.component.css'],
})
export class FormatoBLComponent implements OnInit {
  localPrueba: FormatoB = {};
  forrr:any[]=[];
  userform: FormGroup;
  es: any;
  idd: any;
  a1: SelectItem[];
  a11: SelectItem[];
  a2: SelectItem[];
  idl:any;
  items: MenuItem[];
  activeIndex: number = 1;
  vart : boolean;
  forrrB:FormatoB;
  idem:number = 0;
  validSave:boolean = false;
  dataEmpleado:any;
  cedula:string;
  nombre:string;

  constructor(private formatoBService: FormatoBService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private _messageService: MessageService) {  
      this.idem = Number(this.route.snapshot.paramMap.get("id")); 
      this.idl = JSON.parse(sessionStorage.getItem('IdEmpleado'));
      this.dataEmpleado = JSON.parse(sessionStorage.getItem('empRegExt'));
  }

  async ngOnInit() {
    this.cedula = this.dataEmpleado.emdcedula;
    this.nombre = `${this.dataEmpleado.emdnombres} ${this.dataEmpleado.emdapellidos}`;
    this.vart=false;

    this.userform = this.fb.group({
      inbid: [''],
      inbidempleado: [Number(this.idl)],
      inbruido :['', Validators.required],
      inbfrio :['', Validators.required],
      inbcalor :['', Validators.required],
      inbairefresco :['', Validators.required],
      inbluz :['', Validators.required],
      inbcomodo :['', Validators.required],
      inbsustanquimicas :['', Validators.required],
      inbesfuerzofisico :['', Validators.required],
      inbequiposcomodos :['', Validators.required],
      inbanimalesplantas :['', Validators.required],
      inbpreoaccidente :['', Validators.required],
      inblugarlimpio :['', Validators.required],
      inbtiempoadicional :['', Validators.required],
      inbalcanzatiempo :['', Validators.required],
      inbtrabajasinparar :['', Validators.required],
      inbesfuerzomental :['', Validators.required],
      inbexigeconcentrado :['', Validators.required],
      inbexigememoria :['', Validators.required],
      inbhacercalculos :['', Validators.required],
      inbpqnosdetalles :['', Validators.required],
      inbtrabajonoche :['', Validators.required],
      inbtomarpausas :['', Validators.required],
      inbtrabajodiadesca :['', Validators.required],
      inbfinsemdesc :['', Validators.required],
      inbencasapiensotra :['', Validators.required],
      inbdiscutofamilia :['', Validators.required],
      inbasuntosencasa :['', Validators.required],
      inbpocotiempofami :['', Validators.required],
      inbhacercosasnuevas :['', Validators.required],
      inbpermitehabilidad :['', Validators.required],
      inbpermiteconocimi :['', Validators.required],
      inbpermiteaprender :['', Validators.required],
      inbpausasnecesito :['', Validators.required],
      inbtrabajodiario :['', Validators.required],
      inbdecivelocidad :['', Validators.required],
      inbcambiarordenact :['', Validators.required],
      inbatenderasunpers :['', Validators.required],
      inbexplicancambios :['', Validators.required],
      inbpuedodarsugeren :['', Validators.required],
      inbencuentamisideas :['', Validators.required],
      inbclaridadfunciones :['', Validators.required],
      inbdecisionesatomar :['', Validators.required],
      inbresultadoslograr :['', Validators.required],
      inbexplicanobjetivos :['', Validators.required],
      inbinfquienresolver :['', Validators.required],
      inbasiscapacitacion :['', Validators.required],
      inbrecibocapacitaci :['', Validators.required],
      inbrecibocapaciayuda :['', Validators.required],
      inbjefeayudaorganiz :['', Validators.required],
      inbjefemispuntosvist :['', Validators.required],
      inbjefeanima :['', Validators.required],
      inbjefedistribuye :['', Validators.required],
      inbjefecomunica :['', Validators.required],
      inbjefeorienracion :['', Validators.required],
      inbjefeayudaprogres :['', Validators.required],
      inbjefeayudasentime :['', Validators.required],
      inbjefesolucionar :['', Validators.required],
      inbjeferespeto :['', Validators.required],
      inbjefeconfio :['', Validators.required],
      inbjefeescucha :['', Validators.required],
      inbjefeapoyo :['', Validators.required],
      inbagradaambiente :['', Validators.required],
      inbgruporespeto :['', Validators.required],
      inbconfiocompaneros :['', Validators.required],
      inbagustocompaneros :['', Validators.required],
      inbgrupomaltrata :['', Validators.required],
      inbsolucionacompa :['', Validators.required],
      inbgrupounido :['', Validators.required],
      inbtrabajogrupo :['', Validators.required],
      inbgrupodeacuerdo :['', Validators.required],
      inbgrupoayuda :['', Validators.required],
      inbapoyounootros :['', Validators.required],
      inbescuchanproble :['', Validators.required],
      inbinfhagobien :['', Validators.required],
      inbinfmejorar :['', Validators.required],
      inbinfrendimiento :['', Validators.required],
      inbevaluantrabajo :['', Validators.required],
      inbinfatiempomejora :['', Validators.required],
      inbemppaganatiempo :['', Validators.required],
      inbpagoofrecido :['', Validators.required],
      inbpagomerezco :['', Validators.required],
      inbposibprogresar :['', Validators.required],
      inbhacerbienprog :['', Validators.required],
      inbempbienestartrab :['', Validators.required],
      inbtrabajoestable :['', Validators.required],
      inbtrabsentirbien :['', Validators.required],
      inbsientoorgullo :['', Validators.required],
      inbhablobienempres :['', Validators.required],

      inbatencionausuarios :['', Validators.required],
      inbusuenojados :['0'],
      inbusupreocupados :['0'],
      inbusutristes :['0'],
      inbusuenfermos :['0'],
      inbusuneceayuda :['0'],
      inbusumemaltratan :['0'],
      inbsituaviolencia :['0'],
      inbexigedolorosas :['0'],
      inbexpretristeza :['0'] 

    })


    await  this.formatoBService.buscarByFb(this.idl).toPromise().then((data:any)=>{
      this.localPrueba = data[0]; 
    })

    this.a1 = [];
    this.a1.push({ label: 'Seleccione una opción', value: '' });
    this.a1.push({ label: 'Siempre', value: '0' });
    this.a1.push({ label: 'Casi Siempre', value: '1' });
    this.a1.push({ label: 'Algunas Veces', value: '2' });
    this.a1.push({ label: 'Casi nunca', value: '3' });
    this.a1.push({ label: 'Nunca', value: '4' });

    this.a11 = [];
    this.a11.push({ label: 'Seleccione una opción', value: '0' });
    this.a11.push({ label: 'Siempre', value: '4' });
    this.a11.push({ label: 'Casi Siempre', value: '3' });
    this.a11.push({ label: 'Algunas Veces', value: '2' });
    this.a11.push({ label: 'Casi nunca', value: '1' });
    this.a11.push({ label: 'Nunca', value: '0' });

    this.a2 = [];
    this.a2.push({ label: 'Seleccione una opción', value: '' });
    this.a2.push({ label: 'Si', value: '1' });
    this.a2.push({ label: 'No', value: '2' });



     if(this.localPrueba !==null){
      if (this.localPrueba.inbatencionausuarios == "1") {
        this.vart=true;
       }else{
        this.vart=false;
       }
      this.userform.patchValue({
        inbidempleado:this.localPrueba.inbidempleado,
        inbruido:this.localPrueba.inbruido,
        inbfrio:this.localPrueba.inbfrio,
        inbcalor:this.localPrueba.inbcalor,
        inbairefresco:this.localPrueba.inbairefresco,
        inbluz:this.localPrueba.inbluz,
        inbcomodo:this.localPrueba.inbcomodo,
        inbsustanquimicas:this.localPrueba.inbsustanquimicas,
        inbesfuerzofisico:this.localPrueba.inbesfuerzofisico,
        inbequiposcomodos:this.localPrueba.inbequiposcomodos,
        inbanimalesplantas:this.localPrueba.inbanimalesplantas,
        inbpreoaccidente:this.localPrueba.inbpreoaccidente,
        inblugarlimpio:this.localPrueba.inblugarlimpio,
        inbtiempoadicional:this.localPrueba.inbtiempoadicional,
        inbalcanzatiempo:this.localPrueba.inbalcanzatiempo,
        inbtrabajasinparar:this.localPrueba.inbtrabajasinparar,
        inbesfuerzomental:this.localPrueba.inbesfuerzomental,
        inbexigeconcentrado:this.localPrueba.inbexigeconcentrado,
        inbexigememoria:this.localPrueba.inbexigememoria,
        inbhacercalculos:this.localPrueba.inbhacercalculos,
        inbpqnosdetalles:this.localPrueba.inbpqnosdetalles,
        inbtrabajonoche:this.localPrueba.inbtrabajonoche,
        inbtomarpausas:this.localPrueba.inbtomarpausas,
        inbtrabajodiadesca:this.localPrueba.inbtrabajodiadesca,
        inbfinsemdesc:this.localPrueba.inbfinsemdesc,
        inbencasapiensotra:this.localPrueba.inbencasapiensotra,
        inbdiscutofamilia:this.localPrueba.inbdiscutofamilia,
        inbasuntosencasa:this.localPrueba.inbasuntosencasa,
        inbpocotiempofami:this.localPrueba.inbpocotiempofami,
        inbhacercosasnuevas:this.localPrueba.inbhacercosasnuevas,
        inbpermitehabilidad:this.localPrueba.inbpermitehabilidad,
        inbpermiteconocimi:this.localPrueba.inbpermiteconocimi,
        inbpermiteaprender:this.localPrueba.inbpermiteaprender,
        inbpausasnecesito:this.localPrueba.inbpausasnecesito,
        inbtrabajodiario:this.localPrueba.inbtrabajodiario,
        inbdecivelocidad:this.localPrueba.inbdecivelocidad,
        inbcambiarordenact:this.localPrueba.inbcambiarordenact,
        inbatenderasunpers:this.localPrueba.inbatenderasunpers,
        inbexplicancambios:this.localPrueba.inbexplicancambios,
        inbpuedodarsugeren:this.localPrueba.inbpuedodarsugeren,
        inbencuentamisideas:this.localPrueba.inbencuentamisideas,
        inbclaridadfunciones:this.localPrueba.inbclaridadfunciones,
        inbdecisionesatomar:this.localPrueba.inbdecisionesatomar,
        inbresultadoslograr:this.localPrueba.inbresultadoslograr,
        inbexplicanobjetivos:this.localPrueba.inbexplicanobjetivos,
        inbinfquienresolver:this.localPrueba.inbinfquienresolver,
        inbasiscapacitacion:this.localPrueba.inbasiscapacitacion,
        inbrecibocapacitaci:this.localPrueba.inbrecibocapacitaci,
        inbrecibocapaciayuda:this.localPrueba.inbrecibocapaciayuda,
        inbjefeayudaorganiz:this.localPrueba.inbjefeayudaorganiz,
        inbjefemispuntosvist:this.localPrueba.inbjefemispuntosvist,
        inbjefeanima:this.localPrueba.inbjefeanima,
        inbjefedistribuye:this.localPrueba.inbjefedistribuye,
        inbjefecomunica:this.localPrueba.inbjefecomunica,
        inbjefeorienracion:this.localPrueba.inbjefeorienracion,
        inbjefeayudaprogres:this.localPrueba.inbjefeayudaprogres,
        inbjefeayudasentime:this.localPrueba.inbjefeayudasentime,
        inbjefesolucionar:this.localPrueba.inbjefesolucionar,
        inbjeferespeto:this.localPrueba.inbjeferespeto,
        inbjefeconfio:this.localPrueba.inbjefeconfio,
        inbjefeescucha:this.localPrueba.inbjefeescucha,
        inbjefeapoyo:this.localPrueba.inbjefeapoyo,
        inbagradaambiente:this.localPrueba.inbagradaambiente,
        inbgruporespeto:this.localPrueba.inbgruporespeto,
        inbconfiocompaneros:this.localPrueba.inbconfiocompaneros,
        inbagustocompaneros:this.localPrueba.inbagustocompaneros,
        inbgrupomaltrata:this.localPrueba.inbgrupomaltrata,
        inbsolucionacompa:this.localPrueba.inbsolucionacompa,
        inbgrupounido:this.localPrueba.inbgrupounido,
        inbtrabajogrupo:this.localPrueba.inbtrabajogrupo,
        inbgrupodeacuerdo:this.localPrueba.inbgrupodeacuerdo,
        inbgrupoayuda:this.localPrueba.inbgrupoayuda,
        inbapoyounootros:this.localPrueba.inbapoyounootros,
        inbescuchanproble:this.localPrueba.inbescuchanproble,
        inbinfhagobien:this.localPrueba.inbinfhagobien,
        inbinfmejorar:this.localPrueba.inbinfmejorar,
        inbinfrendimiento:this.localPrueba.inbinfrendimiento,
        inbevaluantrabajo:this.localPrueba.inbevaluantrabajo,
        inbinfatiempomejora:this.localPrueba.inbinfatiempomejora,
        inbemppaganatiempo:this.localPrueba.inbemppaganatiempo,
        inbpagoofrecido:this.localPrueba.inbpagoofrecido,
        inbpagomerezco:this.localPrueba.inbpagomerezco,
        inbposibprogresar:this.localPrueba.inbposibprogresar,
        inbhacerbienprog:this.localPrueba.inbhacerbienprog,
        inbempbienestartrab:this.localPrueba.inbempbienestartrab,
        inbtrabajoestable:this.localPrueba.inbtrabajoestable,
        inbtrabsentirbien:this.localPrueba.inbtrabsentirbien,
        inbsientoorgullo:this.localPrueba.inbsientoorgullo,
        inbhablobienempres:this.localPrueba.inbhablobienempres,
        inbatencionausuarios:this.localPrueba.inbatencionausuarios,
        inbusuenojados: this.localPrueba.inbusuenojados ? this.localPrueba.inbusuenojados : "0",
        inbusupreocupados: this.localPrueba.inbusupreocupados ? this.localPrueba.inbusupreocupados : "0",
        inbusutristes: this.localPrueba.inbusutristes ? this.localPrueba.inbusutristes : "0",
        inbusuenfermos: this.localPrueba.inbusuenfermos ? this.localPrueba.inbusuenfermos : "0",
        inbusuneceayuda: this.localPrueba.inbusuneceayuda ? this.localPrueba.inbusuneceayuda : "0",
        inbusumemaltratan: this.localPrueba.inbusumemaltratan ? this.localPrueba.inbusumemaltratan : "0",
        inbsituaviolencia: this.localPrueba.inbsituaviolencia ? this.localPrueba.inbsituaviolencia : "0",
        inbexigedolorosas: this.localPrueba.inbexigedolorosas ? this.localPrueba.inbexigedolorosas : "0",
        inbexpretristeza: this.localPrueba.inbexpretristeza ? this.localPrueba.inbexpretristeza : "0"
      })
    } 
  };
  /*Apartado de Validaciones */
  /* --------------------------------------------SECCIÓN 1 --------------------------------- */
  get seccion1(){
    return this.userform.get('inbruido').invalid || this.userform.get('inbfrio').invalid || this.userform.get('inbcalor').invalid
        || this.userform.get('inbairefresco').invalid || this.userform.get('inbluz').invalid || this.userform.get('inbcomodo').invalid
        || this.userform.get('inbsustanquimicas').invalid || this.userform.get('inbesfuerzofisico').invalid || this.userform.get('inbequiposcomodos').invalid
        || this.userform.get('inbanimalesplantas').invalid || this.userform.get('inbpreoaccidente').invalid || this.userform.get('inblugarlimpio').invalid;
  }
  get inbruidoMarca(){
    return this.userform.get('inbruido').invalid
  }
  get inbruido() {
    return this.userform.get('inbruido').invalid && this.userform.get('inbruido').touched
  }
  get inbfrioMarca(){
    return this.userform.get('inbfrio').invalid
  }
  get inbfrio() {
    return this.userform.get('inbfrio').invalid && this.userform.get('inbfrio').touched
  }
  get inbcalorMarca(){
    return this.userform.get('inbcalor').invalid
  }
  get inbcalor() {
    return this.userform.get('inbcalor').invalid && this.userform.get('inbcalor').touched
  }
  get inbairefrescoMarca(){
    return this.userform.get('inbairefresco').invalid
  }
  get inbairefresco() {
    return this.userform.get('inbairefresco').invalid && this.userform.get('inbairefresco').touched
  }
  get inbluzMarca(){
    return this.userform.get('inbluz').invalid
  }
  get inbluz() {
    return this.userform.get('inbluz').invalid && this.userform.get('inbluz').touched
  }
  get inbcomodoMarca(){
    return this.userform.get('inbcomodo').invalid
  }
  get inbcomodo() {
    return this.userform.get('inbcomodo').invalid && this.userform.get('inbcomodo').touched
  }
  get inbsustanquimicasMarca(){
    return this.userform.get('inbsustanquimicas').invalid
  }
  get inbsustanquimicas() {
    return this.userform.get('inbsustanquimicas').invalid && this.userform.get('inbsustanquimicas').touched
  }
  get inbesfuerzofisicoMarca(){
    return this.userform.get('inbesfuerzofisico').invalid
  }
  get inbesfuerzofisico() {
    return this.userform.get('inbesfuerzofisico').invalid && this.userform.get('inbesfuerzofisico').touched
  }
  get inbequiposcomodosMarca(){
    return this.userform.get('inbequiposcomodos').invalid
  }
  get inbequiposcomodos() {
    return this.userform.get('inbequiposcomodos').invalid && this.userform.get('inbequiposcomodos').touched
  }
  get inbanimalesplantasMarca(){
    return this.userform.get('inbanimalesplantas').invalid
  }
  get inbanimalesplantas() {
    return this.userform.get('inbanimalesplantas').invalid && this.userform.get('inbanimalesplantas').touched
  }
  get inbpreoaccidenteMarca(){
    return this.userform.get('inbpreoaccidente').invalid
  }
  get inbpreoaccidente() {
    return this.userform.get('inbpreoaccidente').invalid && this.userform.get('inbpreoaccidente').touched
  }
  get inblugarlimpioMarca(){
    return this.userform.get('inblugarlimpio').invalid
  }
  get inblugarlimpio() {
    return this.userform.get('inblugarlimpio').invalid && this.userform.get('inblugarlimpio').touched
  }

  /* --------------------------------------------SECCIÓN 2 --------------------------------- */
  get seccion2(){
    return this.userform.get('inbtiempoadicional').invalid || this.userform.get('inbalcanzatiempo').invalid || this.userform.get('inbtrabajasinparar').invalid;
  }
  get inbtiempoadicionalMarca(){
    return this.userform.get('inbtiempoadicional').invalid
  }
  get inbtiempoadicional() {
    return this.userform.get('inbtiempoadicional').invalid && this.userform.get('inbtiempoadicional').touched
  }
  get inbalcanzatiempoMarca(){
    return this.userform.get('inbalcanzatiempo').invalid
  }
  get inbalcanzatiempo() {
    return this.userform.get('inbalcanzatiempo').invalid && this.userform.get('inbalcanzatiempo').touched
  }
  get inbtrabajasinpararMarca(){
    return this.userform.get('inbtrabajasinparar').invalid
  }
  get inbtrabajasinparar() {
    return this.userform.get('inbtrabajasinparar').invalid && this.userform.get('inbtrabajasinparar').touched
  }

  /* --------------------------------------------SECCIÓN 3 --------------------------------- */
  get seccion3(){
    return this.userform.get('inbesfuerzomental').invalid || this.userform.get('inbexigeconcentrado').invalid || this.userform.get('inbexigememoria').invalid
        || this.userform.get('inbhacercalculos').invalid || this.userform.get('inbpqnosdetalles').invalid;
  }
  get inbesfuerzomentalMarca(){
    return this.userform.get('inbesfuerzomental').invalid
  }
  get inbesfuerzomental() {
    return this.userform.get('inbesfuerzomental').invalid && this.userform.get('inbesfuerzomental').touched
  }
  get inbexigeconcentradoMarca(){
    return this.userform.get('inbexigeconcentrado').invalid
  }
  get inbexigeconcentrado() {
    return this.userform.get('inbexigeconcentrado').invalid && this.userform.get('inbexigeconcentrado').touched
  }
  get inbexigememoriaMarca(){
    return this.userform.get('inbexigememoria').invalid
  }
  get inbexigememoria() {
    return this.userform.get('inbexigememoria').invalid && this.userform.get('inbexigememoria').touched
  }
  get inbhacercalculosMarca(){
    return this.userform.get('inbhacercalculos').invalid
  }
  get inbhacercalculos() {
    return this.userform.get('inbhacercalculos').invalid && this.userform.get('inbhacercalculos').touched
  }
  get inbpqnosdetallesMarca(){
    return this.userform.get('inbpqnosdetalles').invalid
  }
  get inbpqnosdetalles() {
    return this.userform.get('inbpqnosdetalles').invalid && this.userform.get('inbpqnosdetalles').touched
  }

  /* --------------------------------------------SECCIÓN 4 --------------------------------- */
  get seccion4(){
    return this.userform.get('inbtrabajonoche').invalid || this.userform.get('inbtomarpausas').invalid || this.userform.get('inbtrabajodiadesca').invalid
        || this.userform.get('inbfinsemdesc').invalid || this.userform.get('inbencasapiensotra').invalid || this.userform.get('inbdiscutofamilia').invalid
        || this.userform.get('inbasuntosencasa').invalid || this.userform.get('inbpocotiempofami').invalid;
  }
  get inbtrabajonocheMarca(){
    return this.userform.get('inbtrabajonoche').invalid
  }
  get inbtrabajonoche() {
    return this.userform.get('inbtrabajonoche').invalid && this.userform.get('inbtrabajonoche').touched
  }
  get inbtomarpausasMarca(){
    return this.userform.get('inbtomarpausas').invalid
  }
  get inbtomarpausas() {
    return this.userform.get('inbtomarpausas').invalid && this.userform.get('inbtomarpausas').touched
  }
  get inbtrabajodiadescaMarca(){
    return this.userform.get('inbtrabajodiadesca').invalid
  }
  get inbtrabajodiadesca() {
    return this.userform.get('inbtrabajodiadesca').invalid && this.userform.get('inbtrabajodiadesca').touched
  }
  get inbfinsemdescMarca(){
    return this.userform.get('inbfinsemdesc').invalid
  }
  get inbfinsemdesc() {
    return this.userform.get('inbfinsemdesc').invalid && this.userform.get('inbfinsemdesc').touched
  }
  get inbencasapiensotraMarca(){
    return this.userform.get('inbencasapiensotra').invalid
  }
  get inbencasapiensotra() {
    return this.userform.get('inbencasapiensotra').invalid && this.userform.get('inbencasapiensotra').touched
  }
  get inbdiscutofamiliaMarca(){
    return this.userform.get('inbdiscutofamilia').invalid
  }
  get inbdiscutofamilia() {
    return this.userform.get('inbdiscutofamilia').invalid && this.userform.get('inbdiscutofamilia').touched
  }
  get inbasuntosencasaMarca(){
    return this.userform.get('inbasuntosencasa').invalid
  }
  get inbasuntosencasa() {
    return this.userform.get('inbasuntosencasa').invalid && this.userform.get('inbasuntosencasa').touched
  }
  get inbpocotiempofamiMarca(){
    return this.userform.get('inbpocotiempofami').invalid
  }
  get inbpocotiempofami() {
    return this.userform.get('inbpocotiempofami').invalid && this.userform.get('inbpocotiempofami').touched
  }

  /* --------------------------------------------SECCIÓN 5 --------------------------------- */
  get seccion5(){
    return this.userform.get('inbhacercosasnuevas').invalid || this.userform.get('inbpermitehabilidad').invalid || this.userform.get('inbpermiteconocimi').invalid
        || this.userform.get('inbpermiteaprender').invalid || this.userform.get('inbpausasnecesito').invalid || this.userform.get('inbtrabajodiario').invalid
        || this.userform.get('inbdecivelocidad').invalid || this.userform.get('inbcambiarordenact').invalid || this.userform.get('inbatenderasunpers').invalid;
  }
  get inbhacercosasnuevasMarca(){
    return this.userform.get('inbhacercosasnuevas').invalid
  }
  get inbhacercosasnuevas() {
    return this.userform.get('inbhacercosasnuevas').invalid && this.userform.get('inbhacercosasnuevas').touched
  }
  get inbpermitehabilidadMarca(){
    return this.userform.get('inbpermitehabilidad').invalid
  }
  get inbpermitehabilidad() {
    return this.userform.get('inbpermitehabilidad').invalid && this.userform.get('inbpermitehabilidad').touched
  }
  get inbpermiteconocimiMarca(){
    return this.userform.get('inbpermiteconocimi').invalid
  }
  get inbpermiteconocimi() {
    return this.userform.get('inbpermiteconocimi').invalid && this.userform.get('inbpermiteconocimi').touched
  }
  get inbpermiteaprenderMarca(){
    return this.userform.get('inbpermiteaprender').invalid
  }
  get inbpermiteaprender() {
    return this.userform.get('inbpermiteaprender').invalid && this.userform.get('inbpermiteaprender').touched
  }
  get inbpausasnecesitoMarca(){
    return this.userform.get('inbpausasnecesito').invalid
  }
  get inbpausasnecesito() {
    return this.userform.get('inbpausasnecesito').invalid && this.userform.get('inbpausasnecesito').touched
  }
  get inbtrabajodiarioMarca(){
    return this.userform.get('inbtrabajodiario').invalid
  }
  get inbtrabajodiario() {
    return this.userform.get('inbtrabajodiario').invalid && this.userform.get('inbtrabajodiario').touched
  }
  get inbdecivelocidadMarca(){
    return this.userform.get('inbdecivelocidad').invalid
  }
  get inbdecivelocidad() {
    return this.userform.get('inbdecivelocidad').invalid && this.userform.get('inbdecivelocidad').touched
  }
  get inbcambiarordenactMarca(){
    return this.userform.get('inbcambiarordenact').invalid
  }
  get inbcambiarordenact() {
    return this.userform.get('inbcambiarordenact').invalid && this.userform.get('inbcambiarordenact').touched
  }
  get inbatenderasunpersMarca(){
    return this.userform.get('inbatenderasunpers').invalid
  }
  get inbatenderasunpers() {
    return this.userform.get('inbatenderasunpers').invalid && this.userform.get('inbatenderasunpers').touched
  }

  /* --------------------------------------------SECCIÓN 6 --------------------------------- */
  get seccion6(){
    return this.userform.get('inbexplicancambios').invalid || this.userform.get('inbpuedodarsugeren').invalid || this.userform.get('inbencuentamisideas').invalid;
  }
  get inbexplicancambiosMarca(){
    return this.userform.get('inbexplicancambios').invalid
  }
  get inbexplicancambios() {
    return this.userform.get('inbexplicancambios').invalid && this.userform.get('inbexplicancambios').touched
  }
  get inbpuedodarsugerenMarca(){
    return this.userform.get('inbpuedodarsugeren').invalid
  }
  get inbpuedodarsugeren() {
    return this.userform.get('inbpuedodarsugeren').invalid && this.userform.get('inbpuedodarsugeren').touched
  }
  get inbencuentamisideasMarca(){
    return this.userform.get('inbencuentamisideas').invalid
  }
  get inbencuentamisideas() {
    return this.userform.get('inbencuentamisideas').invalid && this.userform.get('inbencuentamisideas').touched
  }

  /* --------------------------------------------SECCIÓN 7 --------------------------------- */
  get seccion7(){
    return this.userform.get('inbclaridadfunciones').invalid || this.userform.get('inbdecisionesatomar').invalid || this.userform.get('inbresultadoslograr').invalid
        || this.userform.get('inbexplicanobjetivos').invalid || this.userform.get('inbinfquienresolver').invalid;
  }
  get inbclaridadfuncionesMarca(){
    return this.userform.get('inbclaridadfunciones').invalid
  }
  get inbclaridadfunciones() {
    return this.userform.get('inbclaridadfunciones').invalid && this.userform.get('inbclaridadfunciones').touched
  }
  get inbdecisionesatomarMarca(){
    return this.userform.get('inbdecisionesatomar').invalid
  }
  get inbdecisionesatomar() {
    return this.userform.get('inbdecisionesatomar').invalid && this.userform.get('inbdecisionesatomar').touched
  }
  get inbresultadoslograrMarca(){
    return this.userform.get('inbresultadoslograr').invalid
  }
  get inbresultadoslograr() {
    return this.userform.get('inbresultadoslograr').invalid && this.userform.get('inbresultadoslograr').touched
  }
  get inbexplicanobjetivosMarca(){
    return this.userform.get('inbexplicanobjetivos').invalid
  }
  get inbexplicanobjetivos() {
    return this.userform.get('inbexplicanobjetivos').invalid && this.userform.get('inbexplicanobjetivos').touched
  }
  get inbinfquienresolverMarca(){
    return this.userform.get('inbinfquienresolver').invalid
  }
  get inbinfquienresolver() {
    return this.userform.get('inbinfquienresolver').invalid && this.userform.get('inbinfquienresolver').touched
  }

  /* --------------------------------------------SECCIÓN 8 --------------------------------- */
  get seccion8(){
    return this.userform.get('inbasiscapacitacion').invalid || this.userform.get('inbrecibocapacitaci').invalid || this.userform.get('inbrecibocapaciayuda').invalid;
  }
  get inbasiscapacitacionMarca(){
    return this.userform.get('inbasiscapacitacion').invalid
  }
  get inbasiscapacitacion() {
    return this.userform.get('inbasiscapacitacion').invalid && this.userform.get('inbasiscapacitacion').touched
  }
  get inbrecibocapacitaciMarca(){
    return this.userform.get('inbrecibocapacitaci').invalid
  }
  get inbrecibocapacitaci() {
    return this.userform.get('inbrecibocapacitaci').invalid && this.userform.get('inbrecibocapacitaci').touched
  }
  get inbrecibocapaciayudaMarca(){
    return this.userform.get('inbrecibocapaciayuda').invalid
  }
  get inbrecibocapaciayuda() {
    return this.userform.get('inbrecibocapaciayuda').invalid && this.userform.get('inbrecibocapaciayuda').touched
  }

  /* --------------------------------------------SECCIÓN 9 --------------------------------- */
  get seccion9(){
    return this.userform.get('inbjefeayudaorganiz').invalid || this.userform.get('inbjefemispuntosvist').invalid || this.userform.get('inbjefeanima').invalid
        || this.userform.get('inbjefedistribuye').invalid || this.userform.get('inbjefecomunica').invalid || this.userform.get('inbjefeorienracion').invalid
        || this.userform.get('inbjefeayudaprogres').invalid || this.userform.get('inbjefeayudasentime').invalid || this.userform.get('inbjefesolucionar').invalid
        || this.userform.get('inbjeferespeto').invalid || this.userform.get('inbjefeconfio').invalid || this.userform.get('inbjefeescucha').invalid
        || this.userform.get('inbjefeapoyo').invalid;
  }
  get inbjefeayudaorganizMarca(){
    return this.userform.get('inbjefeayudaorganiz').invalid
  }
  get inbjefeayudaorganiz() {
    return this.userform.get('inbjefeayudaorganiz').invalid && this.userform.get('inbjefeayudaorganiz').touched
  }
  get inbjefemispuntosvistMarca(){
    return this.userform.get('inbjefemispuntosvist').invalid
  }
  get inbjefemispuntosvist() {
    return this.userform.get('inbjefemispuntosvist').invalid && this.userform.get('inbjefemispuntosvist').touched
  }
  get inbjefeanimaMarca(){
    return this.userform.get('inbjefeanima').invalid
  }
  get inbjefeanima() {
    return this.userform.get('inbjefeanima').invalid && this.userform.get('inbjefeanima').touched
  }
  get inbjefedistribuyeMarca(){
    return this.userform.get('inbjefedistribuye').invalid
  }
  get inbjefedistribuye() {
    return this.userform.get('inbjefedistribuye').invalid && this.userform.get('inbjefedistribuye').touched
  }
  get inbjefecomunicaMarca(){
    return this.userform.get('inbjefecomunica').invalid
  }
  get inbjefecomunica() {
    return this.userform.get('inbjefecomunica').invalid && this.userform.get('inbjefecomunica').touched
  }
  get inbjefeorienracionMarca(){
    return this.userform.get('inbjefeorienracion').invalid
  }
  get inbjefeorienracion() {
    return this.userform.get('inbjefeorienracion').invalid && this.userform.get('inbjefeorienracion').touched
  }
  get inbjefeayudaprogresMarca(){
    return this.userform.get('inbjefeayudaprogres').invalid
  }
  get inbjefeayudaprogres() {
    return this.userform.get('inbjefeayudaprogres').invalid && this.userform.get('inbjefeayudaprogres').touched
  }
  get inbjefeayudasentimeMarca(){
    return this.userform.get('inbjefeayudasentime').invalid
  }
  get inbjefeayudasentime() {
    return this.userform.get('inbjefeayudasentime').invalid && this.userform.get('inbjefeayudasentime').touched
  }
  get inbjefesolucionarMarca(){
    return this.userform.get('inbjefesolucionar').invalid
  }
  get inbjefesolucionar() {
    return this.userform.get('inbjefesolucionar').invalid && this.userform.get('inbjefesolucionar').touched
  }
  get inbjeferespetoMarca(){
    return this.userform.get('inbjeferespeto').invalid
  }
  get inbjeferespeto() {
    return this.userform.get('inbjeferespeto').invalid && this.userform.get('inbjeferespeto').touched
  }
  get inbjefeconfioMarca(){
    return this.userform.get('inbjefeconfio').invalid
  }
  get inbjefeconfio() {
    return this.userform.get('inbjefeconfio').invalid && this.userform.get('inbjefeconfio').touched
  }
  get inbjefeescuchaMarca(){
    return this.userform.get('inbjefeescucha').invalid
  }
  get inbjefeescucha() {
    return this.userform.get('inbjefeescucha').invalid && this.userform.get('inbjefeescucha').touched
  }
  get inbjefeapoyoMarca(){
    return this.userform.get('inbjefeapoyo').invalid
  }
  get inbjefeapoyo() {
    return this.userform.get('inbjefeapoyo').invalid && this.userform.get('inbjefeapoyo').touched
  }

  /* --------------------------------------------SECCIÓN 10 --------------------------------- */
  get seccion10(){
    return this.userform.get('inbagradaambiente').invalid || this.userform.get('inbgruporespeto').invalid || this.userform.get('inbconfiocompaneros').invalid
        || this.userform.get('inbagustocompaneros').invalid || this.userform.get('inbgrupomaltrata').invalid || this.userform.get('inbsolucionacompa').invalid
        || this.userform.get('inbgrupounido').invalid || this.userform.get('inbtrabajogrupo').invalid || this.userform.get('inbgrupodeacuerdo').invalid
        || this.userform.get('inbgrupoayuda').invalid || this.userform.get('inbapoyounootros').invalid || this.userform.get('inbescuchanproble').invalid;
  }
  get inbagradaambienteMarca(){
    return this.userform.get('inbagradaambiente').invalid
  }
  get inbagradaambiente() {
    return this.userform.get('inbagradaambiente').invalid && this.userform.get('inbagradaambiente').touched
  }
  get inbgruporespetoMarca(){
    return this.userform.get('inbgruporespeto').invalid
  }
  get inbgruporespeto() {
    return this.userform.get('inbgruporespeto').invalid && this.userform.get('inbgruporespeto').touched
  }
  get inbconfiocompanerosMarca(){
    return this.userform.get('inbconfiocompaneros').invalid
  }
  get inbconfiocompaneros() {
    return this.userform.get('inbconfiocompaneros').invalid && this.userform.get('inbconfiocompaneros').touched
  }
  get inbagustocompanerosMarca(){
    return this.userform.get('inbagustocompaneros').invalid
  }
  get inbagustocompaneros() {
    return this.userform.get('inbagustocompaneros').invalid && this.userform.get('inbagustocompaneros').touched
  }
  get inbgrupomaltrataMarca(){
    return this.userform.get('inbgrupomaltrata').invalid
  }
  get inbgrupomaltrata() {
    return this.userform.get('inbgrupomaltrata').invalid && this.userform.get('inbgrupomaltrata').touched
  }
  get inbsolucionacompaMarca(){
    return this.userform.get('inbsolucionacompa').invalid
  }
  get inbsolucionacompa() {
    return this.userform.get('inbsolucionacompa').invalid && this.userform.get('inbsolucionacompa').touched
  }
  get inbgrupounidoMarca(){
    return this.userform.get('inbgrupounido').invalid
  }
  get inbgrupounido() {
    return this.userform.get('inbgrupounido').invalid && this.userform.get('inbgrupounido').touched
  }
  get inbtrabajogrupoMarca(){
    return this.userform.get('inbtrabajogrupo').invalid
  }
  get inbtrabajogrupo() {
    return this.userform.get('inbtrabajogrupo').invalid && this.userform.get('inbtrabajogrupo').touched
  }
  get inbgrupodeacuerdoMarca(){
    return this.userform.get('inbgrupodeacuerdo').invalid
  }
  get inbgrupodeacuerdo() {
    return this.userform.get('inbgrupodeacuerdo').invalid && this.userform.get('inbgrupodeacuerdo').touched
  }
  get inbgrupoayudaMarca(){
    return this.userform.get('inbgrupoayuda').invalid
  }
  get inbgrupoayuda() {
    return this.userform.get('inbgrupoayuda').invalid && this.userform.get('inbgrupoayuda').touched
  }
  get inbapoyounootrosMarca(){
    return this.userform.get('inbapoyounootros').invalid
  }
  get inbapoyounootros() {
    return this.userform.get('inbapoyounootros').invalid && this.userform.get('inbapoyounootros').touched
  }
  get inbescuchanprobleMarca(){
    return this.userform.get('inbescuchanproble').invalid
  }
  get inbescuchanproble() {
    return this.userform.get('inbescuchanproble').invalid && this.userform.get('inbescuchanproble').touched
  }

  /* --------------------------------------------SECCIÓN 11 --------------------------------- */
  get seccion11(){
    return this.userform.get('inbinfhagobien').invalid || this.userform.get('inbinfmejorar').invalid || this.userform.get('inbinfrendimiento').invalid
        || this.userform.get('inbevaluantrabajo').invalid || this.userform.get('inbinfatiempomejora').invalid;
  }
  get inbinfhagobienMarca(){
    return this.userform.get('inbinfhagobien').invalid
  }
  get inbinfhagobien() {
    return this.userform.get('inbinfhagobien').invalid && this.userform.get('inbinfhagobien').touched
  }
  get inbinfmejorarMarca(){
    return this.userform.get('inbinfmejorar').invalid
  }
  get inbinfmejorar() {
    return this.userform.get('inbinfmejorar').invalid && this.userform.get('inbinfmejorar').touched
  }
  get inbinfrendimientoMarca(){
    return this.userform.get('inbinfrendimiento').invalid
  }
  get inbinfrendimiento() {
    return this.userform.get('inbinfrendimiento').invalid && this.userform.get('inbinfrendimiento').touched
  }
  get inbevaluantrabajoMarca(){
    return this.userform.get('inbevaluantrabajo').invalid
  }
  get inbevaluantrabajo() {
    return this.userform.get('inbevaluantrabajo').invalid && this.userform.get('inbevaluantrabajo').touched
  }
  get inbinfatiempomejoraMarca(){
    return this.userform.get('inbinfatiempomejora').invalid
  }
  get inbinfatiempomejora() {
    return this.userform.get('inbinfatiempomejora').invalid && this.userform.get('inbinfatiempomejora').touched
  }

  /* --------------------------------------------SECCIÓN 12 --------------------------------- */
  get seccion12(){
    return this.userform.get('inbemppaganatiempo').invalid || this.userform.get('inbpagoofrecido').invalid || this.userform.get('inbpagomerezco').invalid
        || this.userform.get('inbposibprogresar').invalid || this.userform.get('inbhacerbienprog').invalid || this.userform.get('inbempbienestartrab').invalid
        || this.userform.get('inbtrabajoestable').invalid || this.userform.get('inbtrabsentirbien').invalid || this.userform.get('inbsientoorgullo').invalid
        || this.userform.get('inbhablobienempres').invalid;
  }
  get inbemppaganatiempoMarca(){
    return this.userform.get('inbemppaganatiempo').invalid
  }
  get inbemppaganatiempo() {
    return this.userform.get('inbemppaganatiempo').invalid && this.userform.get('inbemppaganatiempo').touched
  }
  get inbpagoofrecidoMarca(){
    return this.userform.get('inbpagoofrecido').invalid
  }
  get inbpagoofrecido() {
    return this.userform.get('inbpagoofrecido').invalid && this.userform.get('inbpagoofrecido').touched
  }
  get inbpagomerezcoMarca(){
    return this.userform.get('inbpagomerezco').invalid
  }
  get inbpagomerezco() {
    return this.userform.get('inbpagomerezco').invalid && this.userform.get('inbpagomerezco').touched
  }
  get inbposibprogresarMarca(){
    return this.userform.get('inbposibprogresar').invalid
  }
  get inbposibprogresar() {
    return this.userform.get('inbposibprogresar').invalid && this.userform.get('inbposibprogresar').touched
  }
  get inbhacerbienprogMarca(){
    return this.userform.get('inbhacerbienprog').invalid
  }
  get inbhacerbienprog() {
    return this.userform.get('inbhacerbienprog').invalid && this.userform.get('inbhacerbienprog').touched
  }
  get inbempbienestartrabMarca(){
    return this.userform.get('inbempbienestartrab').invalid
  }
  get inbempbienestartrab() {
    return this.userform.get('inbempbienestartrab').invalid && this.userform.get('inbempbienestartrab').touched
  }
  get inbtrabajoestableMarca(){
    return this.userform.get('inbtrabajoestable').invalid
  }
  get inbtrabajoestable() {
    return this.userform.get('inbtrabajoestable').invalid && this.userform.get('inbtrabajoestable').touched
  }
  get inbtrabsentirbienMarca(){
    return this.userform.get('inbtrabsentirbien').invalid
  }
  get inbtrabsentirbien() {
    return this.userform.get('inbtrabsentirbien').invalid && this.userform.get('inbtrabsentirbien').touched
  }
  get inbsientoorgulloMarca(){
    return this.userform.get('inbsientoorgullo').invalid
  }
  get inbsientoorgullo() {
    return this.userform.get('inbsientoorgullo').invalid && this.userform.get('inbsientoorgullo').touched
  }
  get inbhablobienempresMarca(){
    return this.userform.get('inbhablobienempres').invalid
  }
  get inbhablobienempres() {
    return this.userform.get('inbhablobienempres').invalid && this.userform.get('inbhablobienempres').touched
  }

  /* --------------------------------------------SECCIÓN 13 --------------------------------- */
  get seccion13(){
    return this.userform.get('inbatencionausuarios').invalid;
  }
  get inbatencionausuariosMarca(){
    return this.userform.get('inbatencionausuarios').invalid
  }
  get inbatencionausuarios() {
    return this.userform.get('inbatencionausuarios').invalid && this.userform.get('inbatencionausuarios').touched
  }




  onSubmit(){
    if(this.userform.valid){  
      this.validSave = true;
      if(this.localPrueba !== null){
        this.idd = this.localPrueba.inbid;
        this.formatoBService.updateFormatoB(this.userform.value,this.idd).subscribe((data: any) =>{
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'Registro Actualizado', life: 3000})
          this.userform.reset();
          setTimeout(() => {
            this.router.navigate(["/ExtralaboralL/"+this.idem]);
          }, 1000); 
        })
      }
       
   }else{
     this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
     this.userform.reset();
     this.router.navigate(["FinalFormularios"]);
     
   } 
 }

  validar(){
    if (this.userform.value.inbatencionausuarios == 1) {
      this.vart = true;
    }else{
      this.vart = false;
    }
    
    }

    volver(){
      this.router.navigate(["/FormularioEmpleado/"+this.idem]);
    }

}
