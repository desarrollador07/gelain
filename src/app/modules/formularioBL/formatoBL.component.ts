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
import { FormatoB } from '../../models/formatoB.model';


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
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
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
      inbruido :[''],
      inbfrio :[''],
      inbcalor :[''],
      inbairefresco :[''],
      inbluz :[''],
      inbcomodo :[''],
      inbsustanquimicas :[''],
      inbesfuerzofisico :[''],
      inbequiposcomodos :[''],
      inbanimalesplantas :[''],
      inbpreoaccidente :[''],
      inblugarlimpio :[''],
      inbtiempoadicional :[''],
      inbalcanzatiempo :[''],
      inbtrabajasinparar :[''],
      inbesfuerzomental :[''],
      inbexigeconcentrado :[''],
      inbexigememoria :[''],
      inbhacercalculos :[''],
      inbpqnosdetalles :[''],
      inbtrabajonoche :[''],
      inbtomarpausas :[''],
      inbtrabajodiadesca :[''],
      inbfinsemdesc :[''],
      inbencasapiensotra :[''],
      inbdiscutofamilia :[''],
      inbasuntosencasa :[''],
      inbpocotiempofami :[''],
      inbhacercosasnuevas :[''],
      inbpermitehabilidad :[''],
      inbpermiteconocimi :[''],
      inbpermiteaprender :[''],
      inbpausasnecesito :[''],
      inbtrabajodiario :[''],
      inbdecivelocidad :[''],
      inbcambiarordenact :[''],
      inbatenderasunpers :[''],
      inbexplicancambios :[''],
      inbpuedodarsugeren :[''],
      inbencuentamisideas :[''],
      inbclaridadfunciones :[''],
      inbdecisionesatomar :[''],
      inbresultadoslograr :[''],
      inbexplicanobjetivos :[''],
      inbinfquienresolver :[''],
      inbasiscapacitacion :[''],
      inbrecibocapacitaci :[''],
      inbrecibocapaciayuda :[''],
      inbjefeayudaorganiz :[''],
      inbjefemispuntosvist :[''],
      inbjefeanima :[''],
      inbjefedistribuye :[''],
      inbjefecomunica :[''],
      inbjefeorienracion :[''],
      inbjefeayudaprogres :[''],
      inbjefeayudasentime :[''],
      inbjefesolucionar :[''],
      inbjeferespeto :[''],
      inbjefeconfio :[''],
      inbjefeescucha :[''],
      inbjefeapoyo :[''],
      inbagradaambiente :[''],
      inbgruporespeto :[''],
      inbconfiocompaneros :[''],
      inbagustocompaneros :[''],
      inbgrupomaltrata :[''],
      inbsolucionacompa :[''],
      inbgrupounido :[''],
      inbtrabajogrupo :[''],
      inbgrupodeacuerdo :[''],
      inbgrupoayuda :[''],
      inbapoyounootros :[''],
      inbescuchanproble :[''],
      inbinfhagobien :[''],
      inbinfmejorar :[''],
      inbinfrendimiento :[''],
      inbevaluantrabajo :[''],
      inbinfatiempomejora :[''],
      inbemppaganatiempo :[''],
      inbpagoofrecido :[''],
      inbpagomerezco :[''],
      inbposibprogresar :[''],
      inbhacerbienprog :[''],
      inbempbienestartrab :[''],
      inbtrabajoestable :[''],
      inbtrabsentirbien :[''],
      inbsientoorgullo :[''],
      inbhablobienempres :[''],
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
    this.a1.push({ label: 'Seleccione...', value: 'NR' });
    this.a1.push({ label: 'Siempre', value: '0' });
    this.a1.push({ label: 'Casi Siempre', value: '1' });
    this.a1.push({ label: 'Algunas Veces', value: '2' });
    this.a1.push({ label: 'Casi nunca', value: '3' });
    this.a1.push({ label: 'Nunca', value: '4' });

    this.a11 = [];
    this.a11.push({ label: 'Seleccione...', value: 'NR' });
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





  onSubmit(){
    if(this.userform.valid){       
     if(this.localPrueba !== null){
 
       if(this.forrr.length !== 0  || this.forrr !== null){
                 
       console.log("voy a actualizar");
       this.idd = this.localPrueba.inbid;
       this.pruebaservices.updateFormatoB(this.userform.value,this.idd)
       .subscribe((data: any) =>{
         this.pruebaservices.buscarByFb(this.localPrueba.inbidempleado)
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
        this.pruebaservices.updateFormatoB(this.userform.value,this.idd)
        .subscribe((data: any) =>{
          this.pruebaservices.buscarByFb(this.localPrueba.inbidempleado)
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
       console.log("voy a crear");
       this.pruebaservices.createFormatoB(this.userform.value)
       .subscribe((data=>{
        localStorage.setItem('ForBB',JSON.stringify(data));
         this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
         this.userform.reset();
         this.router.navigate(["/ExtralaboralL"]);
         
       }))
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
