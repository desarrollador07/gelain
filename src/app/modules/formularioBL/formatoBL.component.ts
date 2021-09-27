import { Component, OnInit } from '@angular/core';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import { PruebaService } from '../../services/prueba.service';
import { ActivatedRoute } from "@angular/router";
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MenuItem} from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { FormatoB } from '../../models/formatoB.model';
import { FormatoBService } from 'src/app/services/formato-b.service';


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
  constructor(private pruebaservices: PruebaService,private formatoBService: FormatoBService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService) {  
                this.idem = Number(this.route.snapshot.paramMap.get("id")); 
                this.forrr =JSON.parse(localStorage.getItem('ForB'));
                this.forrrB =JSON.parse(localStorage.getItem('ForBB'));
                console.log("forBB",this.forrrB);
                console.log("forB",this.forrr);
                
            if (this.forrr !== null) {
              console.log("ina");
              
              this.localPrueba = this.forrr[0];
            }if (this.forrrB !== null) {
              console.log("inb");
              this.forrr = [];
              this.localPrueba = this.forrrB;
            }
            if(this.forrr == null && this.forrrB == null){
              console.log("inc");
              
              this.localPrueba = null;
            }
            console.log("lo",this.localPrueba);

                this.idl =JSON.parse(localStorage.getItem('IdEmpleado'));
  }

  ngOnInit() {
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

      inbatencionausuarios :[''],
      inbusuenojados :[''],
      inbusupreocupados :[''],
      inbusutristes :[''],
      inbusuenfermos :[''],
      inbusuneceayuda :[''],
      inbusumemaltratan :[''],
      inbsituaviolencia :[''],
      inbexigedolorosas :[''],
      inbexpretristeza :[''] 

    })

    this.a1 = [];
    this.a1.push({ label: 'Seleccione...', value: '' });
    this.a1.push({ label: 'Siempre', value: '0' });
    this.a1.push({ label: 'Casi Siempre', value: '1' });
    this.a1.push({ label: 'Algunas Veces', value: '2' });
    this.a1.push({ label: 'Casi nunca', value: '3' });
    this.a1.push({ label: 'Nunca', value: '4' });

    this.a11 = [];
    this.a11.push({ label: 'Seleccione...', value: '' });
    this.a11.push({ label: 'Siempre', value: '4' });
    this.a11.push({ label: 'Casi Siempre', value: '3' });
    this.a11.push({ label: 'Algunas Veces', value: '2' });
    this.a11.push({ label: 'Casi nunca', value: '1' });
    this.a11.push({ label: 'Nunca', value: '0' });

    this.a2 = [];
    this.a2.push({ label: 'Seleccione...', value: '' });
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
        inbusuenojados:this.localPrueba.inbusuenojados,
        inbusupreocupados:this.localPrueba.inbusupreocupados,
        inbusutristes:this.localPrueba.inbusutristes,
        inbusuenfermos:this.localPrueba.inbusuenfermos,
        inbusuneceayuda:this.localPrueba.inbusuneceayuda,
        inbusumemaltratan:this.localPrueba.inbusumemaltratan,
        inbsituaviolencia:this.localPrueba.inbsituaviolencia,
        inbexigedolorosas:this.localPrueba.inbexigedolorosas,
        inbexpretristeza:this.localPrueba.inbexpretristeza,  
      })
    } 
  };

  get inbruido() {
    return this.userform.get('inbruido').invalid && this.userform.get('inbruido').touched
  }
  get inbfrio() {
    return this.userform.get('inbfrio').invalid && this.userform.get('inbfrio').touched
  }
  get inbcalor() {
    return this.userform.get('inbcalor').invalid && this.userform.get('inbcalor').touched
  }
  get inbairefresco() {
    return this.userform.get('inbairefresco').invalid && this.userform.get('inbairefresco').touched
  }
  get inbluz() {
    return this.userform.get('inbluz').invalid && this.userform.get('inbluz').touched
  }
  get inbcomodo() {
    return this.userform.get('inbcomodo').invalid && this.userform.get('inbcomodo').touched
  }
  get inbsustanquimicas() {
    return this.userform.get('inbsustanquimicas').invalid && this.userform.get('inbsustanquimicas').touched
  }
  get inbesfuerzofisico() {
    return this.userform.get('inbesfuerzofisico').invalid && this.userform.get('inbesfuerzofisico').touched
  }
  get inbequiposcomodos() {
    return this.userform.get('inbequiposcomodos').invalid && this.userform.get('inbequiposcomodos').touched
  }
  get inbanimalesplantas() {
    return this.userform.get('inbanimalesplantas').invalid && this.userform.get('inbanimalesplantas').touched
  }
  get inbpreoaccidente() {
    return this.userform.get('inbpreoaccidente').invalid && this.userform.get('inbpreoaccidente').touched
  }
  get inblugarlimpio() {
    return this.userform.get('inblugarlimpio').invalid && this.userform.get('inblugarlimpio').touched
  }
  get inbtiempoadicional() {
    return this.userform.get('inbtiempoadicional').invalid && this.userform.get('inbtiempoadicional').touched
  }
  get inbalcanzatiempo() {
    return this.userform.get('inbalcanzatiempo').invalid && this.userform.get('inbalcanzatiempo').touched
  }
  get inbtrabajasinparar() {
    return this.userform.get('inbtrabajasinparar').invalid && this.userform.get('inbtrabajasinparar').touched
  }
  get inbesfuerzomental() {
    return this.userform.get('inbesfuerzomental').invalid && this.userform.get('inbesfuerzomental').touched
  }
  get inbexigeconcentrado() {
    return this.userform.get('inbexigeconcentrado').invalid && this.userform.get('inbexigeconcentrado').touched
  }
  get inbexigememoria() {
    return this.userform.get('inbexigememoria').invalid && this.userform.get('inbexigememoria').touched
  }
  get inbhacercalculos() {
    return this.userform.get('inbhacercalculos').invalid && this.userform.get('inbhacercalculos').touched
  }
  get inbpqnosdetalles() {
    return this.userform.get('inbpqnosdetalles').invalid && this.userform.get('inbpqnosdetalles').touched
  }
  get inbtrabajonoche() {
    return this.userform.get('inbtrabajonoche').invalid && this.userform.get('inbtrabajonoche').touched
  }
  get inbtomarpausas() {
    return this.userform.get('inbtomarpausas').invalid && this.userform.get('inbtomarpausas').touched
  }
  get inbtrabajodiadesca() {
    return this.userform.get('inbtrabajodiadesca').invalid && this.userform.get('inbtrabajodiadesca').touched
  }
  get inbfinsemdesc() {
    return this.userform.get('inbfinsemdesc').invalid && this.userform.get('inbfinsemdesc').touched
  }
  get inbencasapiensotra() {
    return this.userform.get('inbencasapiensotra').invalid && this.userform.get('inbencasapiensotra').touched
  }
  get inbdiscutofamilia() {
    return this.userform.get('inbdiscutofamilia').invalid && this.userform.get('inbdiscutofamilia').touched
  }
  get inbasuntosencasa() {
    return this.userform.get('inbasuntosencasa').invalid && this.userform.get('inbasuntosencasa').touched
  }
  get inbpocotiempofami() {
    return this.userform.get('inbpocotiempofami').invalid && this.userform.get('inbpocotiempofami').touched
  }
  get inbhacercosasnuevas() {
    return this.userform.get('inbhacercosasnuevas').invalid && this.userform.get('inbhacercosasnuevas').touched
  }
  get inbpermitehabilidad() {
    return this.userform.get('inbpermitehabilidad').invalid && this.userform.get('inbpermitehabilidad').touched
  }
  get inbpermiteconocimi() {
    return this.userform.get('inbpermiteconocimi').invalid && this.userform.get('inbpermiteconocimi').touched
  }
  get inbpermiteaprender() {
    return this.userform.get('inbpermiteaprender').invalid && this.userform.get('inbpermiteaprender').touched
  }
  get inbpausasnecesito() {
    return this.userform.get('inbpausasnecesito').invalid && this.userform.get('inbpausasnecesito').touched
  }
  get inbtrabajodiario() {
    return this.userform.get('inbtrabajodiario').invalid && this.userform.get('inbtrabajodiario').touched
  }
  get inbdecivelocidad() {
    return this.userform.get('inbdecivelocidad').invalid && this.userform.get('inbdecivelocidad').touched
  }
  get inbcambiarordenact() {
    return this.userform.get('inbcambiarordenact').invalid && this.userform.get('inbcambiarordenact').touched
  }
  get inbatenderasunpers() {
    return this.userform.get('inbatenderasunpers').invalid && this.userform.get('inbatenderasunpers').touched
  }
  get inbexplicancambios() {
    return this.userform.get('inbexplicancambios').invalid && this.userform.get('inbexplicancambios').touched
  }
  get inbpuedodarsugeren() {
    return this.userform.get('inbpuedodarsugeren').invalid && this.userform.get('inbpuedodarsugeren').touched
  }
  get inbencuentamisideas() {
    return this.userform.get('inbencuentamisideas').invalid && this.userform.get('inbencuentamisideas').touched
  }
  get inbclaridadfunciones() {
    return this.userform.get('inbclaridadfunciones').invalid && this.userform.get('inbclaridadfunciones').touched
  }
  get inbdecisionesatomar() {
    return this.userform.get('inbdecisionesatomar').invalid && this.userform.get('inbdecisionesatomar').touched
  }
  get inbresultadoslograr() {
    return this.userform.get('inbresultadoslograr').invalid && this.userform.get('inbresultadoslograr').touched
  }
  get inbexplicanobjetivos() {
    return this.userform.get('inbexplicanobjetivos').invalid && this.userform.get('inbexplicanobjetivos').touched
  }
  get inbinfquienresolver() {
    return this.userform.get('inbinfquienresolver').invalid && this.userform.get('inbinfquienresolver').touched
  }
  get inbasiscapacitacion() {
    return this.userform.get('inbasiscapacitacion').invalid && this.userform.get('inbasiscapacitacion').touched
  }
  get inbrecibocapacitaci() {
    return this.userform.get('inbrecibocapacitaci').invalid && this.userform.get('inbrecibocapacitaci').touched
  }
  get inbrecibocapaciayuda() {
    return this.userform.get('inbrecibocapaciayuda').invalid && this.userform.get('inbrecibocapaciayuda').touched
  }
  get inbjefeayudaorganiz() {
    return this.userform.get('inbjefeayudaorganiz').invalid && this.userform.get('inbjefeayudaorganiz').touched
  }
  get inbjefemispuntosvist() {
    return this.userform.get('inbjefemispuntosvist').invalid && this.userform.get('inbjefemispuntosvist').touched
  }
  get inbjefeanima() {
    return this.userform.get('inbjefeanima').invalid && this.userform.get('inbjefeanima').touched
  }
  get inbjefedistribuye() {
    return this.userform.get('inbjefedistribuye').invalid && this.userform.get('inbjefedistribuye').touched
  }
  get inbjefecomunica() {
    return this.userform.get('inbjefecomunica').invalid && this.userform.get('inbjefecomunica').touched
  }
  get inbjefeorienracion() {
    return this.userform.get('inbjefeorienracion').invalid && this.userform.get('inbjefeorienracion').touched
  }
  get inbjefeayudaprogres() {
    return this.userform.get('inbjefeayudaprogres').invalid && this.userform.get('inbjefeayudaprogres').touched
  }
  get inbjefeayudasentime() {
    return this.userform.get('inbjefeayudasentime').invalid && this.userform.get('inbjefeayudasentime').touched
  }
  get inbjefesolucionar() {
    return this.userform.get('inbjefesolucionar').invalid && this.userform.get('inbjefesolucionar').touched
  }
  get inbjeferespeto() {
    return this.userform.get('inbjeferespeto').invalid && this.userform.get('inbjeferespeto').touched
  }
  get inbjefeconfio() {
    return this.userform.get('inbjefeconfio').invalid && this.userform.get('inbjefeconfio').touched
  }
  get inbjefeescucha() {
    return this.userform.get('inbjefeescucha').invalid && this.userform.get('inbjefeescucha').touched
  }
  get inbjefeapoyo() {
    return this.userform.get('inbjefeapoyo').invalid && this.userform.get('inbjefeapoyo').touched
  }
  get inbagradaambiente() {
    return this.userform.get('inbagradaambiente').invalid && this.userform.get('inbagradaambiente').touched
  }
  get inbgruporespeto() {
    return this.userform.get('inbgruporespeto').invalid && this.userform.get('inbgruporespeto').touched
  }
  get inbconfiocompaneros() {
    return this.userform.get('inbconfiocompaneros').invalid && this.userform.get('inbconfiocompaneros').touched
  }
  get inbagustocompaneros() {
    return this.userform.get('inbagustocompaneros').invalid && this.userform.get('inbagustocompaneros').touched
  }
  get inbgrupomaltrata() {
    return this.userform.get('inbgrupomaltrata').invalid && this.userform.get('inbgrupomaltrata').touched
  }
  get inbsolucionacompa() {
    return this.userform.get('inbsolucionacompa').invalid && this.userform.get('inbsolucionacompa').touched
  }
  get inbgrupounido() {
    return this.userform.get('inbgrupounido').invalid && this.userform.get('inbgrupounido').touched
  }
  get inbtrabajogrupo() {
    return this.userform.get('inbtrabajogrupo').invalid && this.userform.get('inbtrabajogrupo').touched
  }
  get inbgrupodeacuerdo() {
    return this.userform.get('inbgrupodeacuerdo').invalid && this.userform.get('inbgrupodeacuerdo').touched
  }
  get inbgrupoayuda() {
    return this.userform.get('inbgrupoayuda').invalid && this.userform.get('inbgrupoayuda').touched
  }
  get inbapoyounootros() {
    return this.userform.get('inbapoyounootros').invalid && this.userform.get('inbapoyounootros').touched
  }
  get inbescuchanproble() {
    return this.userform.get('inbescuchanproble').invalid && this.userform.get('inbescuchanproble').touched
  }
  get inbinfhagobien() {
    return this.userform.get('inbinfhagobien').invalid && this.userform.get('inbinfhagobien').touched
  }
  get inbinfmejorar() {
    return this.userform.get('inbinfmejorar').invalid && this.userform.get('inbinfmejorar').touched
  }
  get inbinfrendimiento() {
    return this.userform.get('inbinfrendimiento').invalid && this.userform.get('inbinfrendimiento').touched
  }
  get inbevaluantrabajo() {
    return this.userform.get('inbevaluantrabajo').invalid && this.userform.get('inbevaluantrabajo').touched
  }
  get inbinfatiempomejora() {
    return this.userform.get('inbinfatiempomejora').invalid && this.userform.get('inbinfatiempomejora').touched
  }
  get inbemppaganatiempo() {
    return this.userform.get('inbemppaganatiempo').invalid && this.userform.get('inbemppaganatiempo').touched
  }
  get inbpagoofrecido() {
    return this.userform.get('inbpagoofrecido').invalid && this.userform.get('inbpagoofrecido').touched
  }
  get inbpagomerezco() {
    return this.userform.get('inbpagomerezco').invalid && this.userform.get('inbpagomerezco').touched
  }
  get inbposibprogresar() {
    return this.userform.get('inbposibprogresar').invalid && this.userform.get('inbposibprogresar').touched
  }
  get inbhacerbienprog() {
    return this.userform.get('inbhacerbienprog').invalid && this.userform.get('inbhacerbienprog').touched
  }
  get inbempbienestartrab() {
    return this.userform.get('inbempbienestartrab').invalid && this.userform.get('inbempbienestartrab').touched
  }
  get inbtrabajoestable() {
    return this.userform.get('inbtrabajoestable').invalid && this.userform.get('inbtrabajoestable').touched
  }
  get inbtrabsentirbien() {
    return this.userform.get('inbtrabsentirbien').invalid && this.userform.get('inbtrabsentirbien').touched
  }
  get inbsientoorgullo() {
    return this.userform.get('inbsientoorgullo').invalid && this.userform.get('inbsientoorgullo').touched
  }
  get inbhablobienempres() {
    return this.userform.get('inbhablobienempres').invalid && this.userform.get('inbhablobienempres').touched
  }





  onSubmit(){
    if(this.userform.valid){       
     if(this.localPrueba !== null){
 
       if(this.forrr.length !== 0  || this.forrr !== null){
                 
       console.log("voy a actualizar");
       this.idd = this.localPrueba.inbid;
       this.formatoBService.updateFormatoB(this.userform.value,this.idd)
       .subscribe((data: any) =>{
         this.formatoBService.buscarByFb(this.localPrueba.inbidempleado)
         .subscribe((data:any)=>{
           localStorage.setItem('ForB',JSON.stringify(data));
         })
         this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
         this.userform.reset();
         console.log("idd",this.idd);
         

         this.router.navigate(["/ExtralaboralL"]);
       })
       }
       if (this.forrrB !== null) {
        console.log("voy a actualizarA");
        this.idd = this.localPrueba.inbid;
        this.formatoBService.updateFormatoB(this.userform.value,this.idd)
        .subscribe((data: any) =>{
          this.formatoBService.buscarByFb(this.localPrueba.inbidempleado)
        .subscribe((data:any)=>{
          localStorage.setItem('ForB',JSON.stringify(data));
          localStorage.removeItem('ForBB');
        })

          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
          this.userform.reset();
          console.log("idd",this.idd);
          

          this.router.navigate(["/ExtralaboralL"]);
        })
      }
       
/*        else{
         console.log("voy a crear");
         this.pruebaservices.createFormatoB(this.userform.value)
         .subscribe((data=>{
           console.log(data);
           this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
           this.userform.reset();
           this.router.navigate(["/main/addExtralaboral/crear"]);
           
         }))
       } */

     }else{
       this.formatoBService.createFormatoB(this.userform.value)
       .subscribe((data=>{
        localStorage.setItem('ForBB',JSON.stringify(data));
         this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
         this.userform.reset();
         this.router.navigate(["/ExtralaboralL"]);
         
       }));
     }
     
   }else{
     this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
     this.userform.reset();
     this.router.navigate(["FinalFormularios"]);
     
   } 
 }

  vlaidar(){
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
