import { Component, OnInit } from '@angular/core';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PruebaService } from '../../services/prueba.service';
import { ActivatedRoute } from "@angular/router";
import { Empresa } from '../../models/empresa.model';
import {MessageService, ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { routes } from '../../app.routes';
import { SelectItem } from 'primeng/api';
import { FormatoA } from '../../models/formatoAmodel';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-formatoA',
  templateUrl: './formatoA.component.html',
  styleUrls: ['./formatoA.component.css'],
})
export class FormatoAComponent implements OnInit {
  forrr:any[]=[];
  localPrueba: FormatoA = {};
  userform: FormGroup;
  es: any;
  idd: any;
  a1: SelectItem[];
  a2: SelectItem[];
  idl:any;
  items: MenuItem[];
  activeIndex: number = 1;
  vart : boolean;
  vart2 : boolean;
 
 
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService) {  
                this.forrr =JSON.parse(localStorage.getItem('ForA'));
                
            if (this.forrr !== null) {
              this.localPrueba = this.forrr[0];
            }else{
              this.localPrueba = null;
            }
            console.log("lo",this.localPrueba);
            
                
            
                
                
            
                this.idl =JSON.parse(localStorage.getItem('IdEmpleado'));
  }

  ngOnInit() {

    this.vart=false;
    this.vart2=false;


    this.userform = this.fb.group({
      inaid: [''],
      inaidempleado: [Number(this.idl)],
      inaruido: [''],
      inafrio: [''],
      inacalor: [''],
      inaairefresco: [''],
      inaluz: [''],
      inacomodo: [''],
      inasustanquimicas: [''],
      inaesfuerzofisico: [''],
      inaequiposcomodos: [''],
      inaanimalesplantas: [''],
      inapreoaccidente: [''],
      inalugarlimpio: [''],
      inatiempoadicional: [''],
      inaalcanzatiempo: [''],
      inatrabajasinparar: [''],
      inaesfuerzomental: [''],
      inaexigeconcentrado: [''],
      inaexigememoria: [''],
       inadesiciondificiles: [''],
      inaexigeasuntos: [''],
      inapqnosdetalles: [''],
      inaresponcosasvalor: [''],
      inarespondinero: [''],
      inareponderotros: [''],
      inaresponarea: [''],
      inareponsalud: [''],
      inaordecontradic: [''],
      inahacerinnecesaria: [''],
      inapasarnormas: [''],
      inamaspracticas: [''],
      inatrabajodenoche: [''],
      inapausas: [''],
      inatrabajodiadesca: [''],
      inafinsemdesc:[''],
      inaencasapiensotra: [''],
      inadiscutofamilia: [''],
      inaasuntosencasa: [''],
      inapocotiempofami: [''],
      inapermitehabilidad: [''],
      inapermiteconocimi: [''],
      inapermiteaprender: [''],
      inamiscapacidades: [''],
      inapausasnecesito: [''],
      inatrabajodiario: [''],
      inadecivelocidad: [''],
      inacambiarordenact: [''],
      inaatenderasunpers: [''], 

      inacambiosbeneficio: [''],
      inaexplicancambios: [''],
      inapuedodarsugeren: [''],
      inaencuentamisideas: [''],
      inacambiosdificultan: [''],
      inaclaridadfunciones: [''],
      inadecisionesatomar: [''],
      inaresultadoslograr: [''],
      inaefectoenempresa: [''],
      inaexplicanobjetivos: [''],
      inaorientaciontraba: [''],
      inaresolverasuntos: [''],
      inaasiscapacitacion: [''],
      inarecibocapacitaci: [''],
      inarecibocapaciayuda: [''],
      inajefeintrucciones: [''],
      inajefeayudaorganiz: [''],
      inajefemispuntosvist: [''],
      inajefeanima: [''],
      inajefedistribuye: [''],
      inajefecomunica: [''],
      inajefeorienracion: [''],
      inajefeayudaprogres: [''],
      inajefeayudasentime: [''],
      inajefesolucionar: [''],
      inajefeconfio: [''],
      inajefeescucha: [''],
      inajefeapoyo: [''],
      inaagradaambiente: [''],
      inagruporespeto: [''],
      inaconfiocompaneros: [''],
      inaagustocompaneros: [''],
      inagrupomaltrata: [''],
      inasolucionacompa: [''],
      inaintegraciongrp: [''],
      inagrupounido: [''],
      inasentirpartegrupo: [''],
      inatrabajogrupo: [''],
      inagrupodeacuerdo: [''],
      inagrupoayuda: [''],
      inaapoyounootros: [''],
      inaescuchanproble: [''],
      inainfhagobien: [''],
      inainfmejorar: [''],
      inainfrendimiento: [''],
      inaevaluantrabajo: [''],
      inainfatiempomejora: [''],
      inaempconfiantrab: [''],
      inaemppaganatiempo: [''],
      inapagoofrecido: [''],
      inapagomerezco: [''],
      inaposibprogresar: [''],
      inahacerbienprog: [''],
      inaempbienestartrab: [''],
      inatrabajoestable: [''],
      inatrabsentirbien: [''],
      inasientoorgullo: [''],
      inahablobienempres: [''],
      inaatencionausuarios : [''],
      inausuenojados: [''],
      inausupreocupados: [''],
      inausutristes: [''],
      inausuenfermos: [''],
      inausuneceayuda: [''],
      inausumemaltratan: [''],
      inaususentimidistin: [''],
      inasituaviolencia: [''],
      inaexigedolorosas: [''],
      inasoyjefe : [''],
      inacomuntarde: [''],
      inairrespetuosos: [''],
      inadificorganiza: [''],
      inaguardansilencio: [''],
      inadificlogro: [''],
      inainforirrespet: [''],
      inapocacooperacio: [''],
      inapocodesempeno: [''],
      inacolabignoran: ['']

    })
    

  




    this.a1 = [];
    this.a1.push({ label: 'Seleccione...', value: 'NR' });
    this.a1.push({ label: 'Siempre', value: '1' });
    this.a1.push({ label: 'Casi Siempre', value: '2' });
    this.a1.push({ label: 'Algunas Veces', value: '3' });
    this.a1.push({ label: 'Casi nunca', value: '4' });
    this.a1.push({ label: 'Nunca', value: '5' });

    this.a2 = [];
    this.a2.push({ label: 'Seleccione...', value: '' });
    this.a2.push({ label: 'Si', value: '1' });
    this.a2.push({ label: 'No', value: '2' });



     if(this.localPrueba !==null){
       console.log("hi");
       
      this.userform.patchValue({
        inaidempleado:this.localPrueba.inaidempleado,
        inaruido:this.localPrueba.inaruido,
        inafrio:this.localPrueba.inafrio,
        inacalor:this.localPrueba.inacalor,
        inaairefresco:this.localPrueba.inaairefresco,
        inaluz:this.localPrueba.inaluz,
        inacomodo:this.localPrueba.inacomodo,
        inasustanquimicas:this.localPrueba.inasustanquimicas,
        inaesfuerzofisico:this.localPrueba.inaesfuerzofisico,
        inaequiposcomodos:this.localPrueba.inaequiposcomodos,
        inaanimalesplantas:this.localPrueba.inaanimalesplantas,
        inapreoaccidente:this.localPrueba.inapreoaccidente,
        inalugarlimpio:this.localPrueba.inalugarlimpio,
        inatiempoadicional:this.localPrueba.inatiempoadicional,
        inaalcanzatiempo:this.localPrueba.inaalcanzatiempo,
        inatrabajasinparar:this.localPrueba.inatrabajasinparar,
        inaesfuerzomental:this.localPrueba.inaesfuerzomental,
        inaexigeconcentrado:this.localPrueba.inaexigeconcentrado,
        inaexigememoria:this.localPrueba.inaexigememoria,
         inadesiciondificiles:this.localPrueba.inadesiciondificiles,
        inaexigeasuntos:this.localPrueba.inaexigeasuntos,
        inapqnosdetalles:this.localPrueba.inapqnosdetalles,
        inaresponcosasvalor:this.localPrueba.inaresponcosasvalor,
        inarespondinero:this.localPrueba.inarespondinero,
        inareponderotros:this.localPrueba.inareponderotros,
        inaresponarea:this.localPrueba.inaresponarea,
        inareponsalud:this.localPrueba.inareponsalud,
        inaordecontradic:this.localPrueba.inaordecontradic,
        inahacerinnecesaria:this.localPrueba.inahacerinnecesaria,
        inapasarnormas:this.localPrueba.inapasarnormas,
        inamaspracticas:this.localPrueba.inamaspracticas,
        inatrabajodenoche:this.localPrueba.inatrabajodenoche,
        inapausas:this.localPrueba.inapausas,
        inatrabajodiadesca:this.localPrueba.inatrabajodiadesca,
        inafinsemdesc:this.localPrueba.inafinsemdesc,
        inaencasapiensotra:this.localPrueba.inaencasapiensotra,
        inadiscutofamilia:this.localPrueba.inadiscutofamilia,
        inaasuntosencasa:this.localPrueba.inaasuntosencasa,
        inapocotiempofami:this.localPrueba.inapocotiempofami,
        inapermitehabilidad:this.localPrueba.inapermitehabilidad,
        inapermiteconocimi:this.localPrueba.inapermiteconocimi,
        inapermiteaprender:this.localPrueba.inapermiteaprender,
        inamiscapacidades:this.localPrueba.inamiscapacidades,
        inapausasnecesito:this.localPrueba.inapausasnecesito,
        inatrabajodiario:this.localPrueba.inatrabajodiario,
        inadecivelocidad:this.localPrueba.inadecivelocidad,
        inacambiarordenact:this.localPrueba.inacambiarordenact,
        inaatenderasunpers:this.localPrueba.inaatenderasunpers,
        inacambiosbeneficio:this.localPrueba.inacambiosbeneficio,
        inaexplicancambios:this.localPrueba.inaexplicancambios,
        inapuedodarsugeren:this.localPrueba.inapuedodarsugeren,
        inaencuentamisideas:this.localPrueba.inaencuentamisideas,
        inacambiosdificultan:this.localPrueba.inacambiosdificultan,
        inaclaridadfunciones:this.localPrueba.inaclaridadfunciones,
        inadecisionesatomar:this.localPrueba.inadecisionesatomar,
        inaresultadoslograr:this.localPrueba.inaresultadoslograr,
        inaefectoenempresa:this.localPrueba.inaefectoenempresa,
        inaexplicanobjetivos:this.localPrueba.inaexplicanobjetivos,
        inaorientaciontraba:this.localPrueba.inaorientaciontraba,
        inaresolverasuntos:this.localPrueba.inaresolverasuntos,
        inaasiscapacitacion:this.localPrueba.inaasiscapacitacion,
        inarecibocapacitaci:this.localPrueba.inarecibocapacitaci,
        inarecibocapaciayuda:this.localPrueba.inarecibocapaciayuda,
        inajefeintrucciones:this.localPrueba.inajefeintrucciones,
        inajefeayudaorganiz:this.localPrueba.inajefeayudaorganiz,
        inajefemispuntosvist:this.localPrueba.inajefemispuntosvist,
        inajefeanima:this.localPrueba.inajefeanima,
        inajefedistribuye:this.localPrueba.inajefedistribuye,
        inajefecomunica:this.localPrueba.inajefecomunica,
        inajefeorienracion:this.localPrueba.inajefeorienracion,
        inajefeayudaprogres:this.localPrueba.inajefeayudaprogres,
        inajefeayudasentime:this.localPrueba.inajefeayudasentime,
        inajefesolucionar:this.localPrueba.inajefesolucionar,
        inajefeconfio:this.localPrueba.inajefeconfio,
        inajefeescucha:this.localPrueba.inajefeescucha,
        inajefeapoyo:this.localPrueba.inajefeapoyo,
        inaagradaambiente:this.localPrueba.inaagradaambiente,
        inagruporespeto:this.localPrueba.inagruporespeto,
        inaconfiocompaneros:this.localPrueba.inaconfiocompaneros,
        inaagustocompaneros:this.localPrueba.inaagustocompaneros,
        inagrupomaltrata:this.localPrueba.inagrupomaltrata,
        inasolucionacompa:this.localPrueba.inasolucionacompa,
        inaintegraciongrp:this.localPrueba.inaintegraciongrp,
        inagrupounido:this.localPrueba.inagrupounido,
        inasentirpartegrupo:this.localPrueba.inasentirpartegrupo,
        inatrabajogrupo:this.localPrueba.inatrabajogrupo,
        inagrupodeacuerdo:this.localPrueba.inagrupodeacuerdo,
        inagrupoayuda:this.localPrueba.inagrupoayuda,
        inaapoyounootros:this.localPrueba.inaapoyounootros,
        inaescuchanproble:this.localPrueba.inaescuchanproble,
        inainfhagobien:this.localPrueba.inainfhagobien,
        inainfmejorar:this.localPrueba.inainfmejorar,
        inainfrendimiento:this.localPrueba.inainfrendimiento,
        inaevaluantrabajo:this.localPrueba.inaevaluantrabajo,
        inainfatiempomejora:this.localPrueba.inainfatiempomejora,
        inaempconfiantrab:this.localPrueba.inaempconfiantrab,
        inaemppaganatiempo:this.localPrueba.inaemppaganatiempo,
        inapagoofrecido:this.localPrueba.inapagoofrecido,
        inapagomerezco:this.localPrueba.inapagomerezco,
        inaposibprogresar:this.localPrueba.inaposibprogresar,
        inahacerbienprog:this.localPrueba.inahacerbienprog,
        inaempbienestartrab:this.localPrueba.inaempbienestartrab,
        inatrabajoestable:this.localPrueba.inatrabajoestable,
        inatrabsentirbien:this.localPrueba.inatrabsentirbien,
        inasientoorgullo:this.localPrueba.inasientoorgullo,
        inahablobienempres:this.localPrueba.inahablobienempres,
        inaatencionausuarios :this.localPrueba.inaatencionausuarios,
        inausuenojados:this.localPrueba.inausuenojados,
        inausupreocupados:this.localPrueba.inausupreocupados,
        inausutristes:this.localPrueba.inausutristes,
        inausuenfermos:this.localPrueba.inausuenfermos,
        inausuneceayuda:this.localPrueba.inausuneceayuda,
        inausumemaltratan:this.localPrueba.inausumemaltratan,
        inaususentimidistin:this.localPrueba.inaususentimidistin,
        inasituaviolencia:this.localPrueba.inasituaviolencia,
        inaexigedolorosas:this.localPrueba.inaexigedolorosas,
        inasoyjefe :this.localPrueba.inasoyjefe,
        inacomuntarde:this.localPrueba.inacomuntarde,
        inairrespetuosos:this.localPrueba.inairrespetuosos,
        inadificorganiza:this.localPrueba.inadificorganiza,
        inaguardansilencio:this.localPrueba.inaguardansilencio,
        inadificlogro:this.localPrueba.inadificlogro,
        inainforirrespet:this.localPrueba.inainforirrespet,
        inapocacooperacio:this.localPrueba.inapocacooperacio,
        inapocodesempeno:this.localPrueba.inapocodesempeno,
        inacolabignoran:this.localPrueba.inacolabignoran

      })
    } 
  };





 onSubmit(){
     if(this.userform.valid){       
      if(this.localPrueba !== null){
  
        if(this.forrr.length !== 0  || this.forrr !== null){
                  
        console.log("voy a actualizar");
        this.idd = this.localPrueba.inaid;
        this.pruebaservices.updateFormatoA(this.userform.value,this.idd)
        .subscribe((data: any) =>{
          console.log(data);
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
          this.userform.reset();
          console.log("idd",this.idd);
          

          this.router.navigate(["/main/addExtralaboral/editar"]);
        })
        }else{
          console.log("voy a crear");
          this.pruebaservices.createFormatoA(this.userform.value)
          .subscribe((data=>{
            console.log(data);
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
            this.userform.reset();
            this.router.navigate(["/main/addExtralaboral/crear"]);
            
          }))
        }

      }else{
        console.log("voy a crear");
        this.pruebaservices.createFormatoA(this.userform.value)
        .subscribe((data=>{
          console.log(data);
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/addExtralaboral/crear"]);
          
        }))
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/listarPrueba"]);
      
    } 
  }

  vlaidar(){
    if (this.userform.value.inaatencionausuarios == 1) {
      this.vart = true;
    }else{
      this.vart = false;
    }
    
    }

    vlaidar2(){
      if (this.userform.value.inasoyjefe == 1) {
        this.vart2 = true;
      }else{
        this.vart2 = false;
      }
    }

}
