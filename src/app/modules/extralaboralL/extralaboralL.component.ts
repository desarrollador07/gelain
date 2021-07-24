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
import { Estres } from '../../models/estres.nodel';
import { Extralaboral } from 'src/app/models/extralaboral.model';
import { Empleado } from '../../models/empleado.mdel';


@Component({
  selector: 'app-extralaboral',
  templateUrl: './extralaboralL.component.html',
  styleUrls: ['./extralaboralL.component.css'],
})
export class ExtralaboralLComponent implements OnInit {
  localPrueba: Extralaboral = {};
  localvalidaEmple: Empleado = {};
  userform: FormGroup;
  es: any;
  idd: any;
  a1: SelectItem[];
  a11: SelectItem[];
  idl:any;
  items: MenuItem[];
  activeIndex: number = 1;
  forrr:any[]=[];
  forrrEx:Extralaboral;
  idem:number = 0;
 
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService) {  
                this.idem = Number(this.route.snapshot.paramMap.get("id"));  
                this.forrr =JSON.parse(localStorage.getItem('Extra'));
                this.forrrEx =JSON.parse(localStorage.getItem('ExtraE'));
                console.log("ExtraE",this.forrrEx);
                console.log("Extra",this.forrr);
                
            if (this.forrr !== null) {
              console.log("ina");
              
              this.localPrueba = this.forrr[0];
            }if (this.forrrEx !== null) {
              console.log("inb");
              this.forrr = [];
              this.localPrueba = this.forrrEx;
            }
            if(this.forrr == null && this.forrrEx == null){
              console.log("inc");
              
              this.localPrueba = null;
            }
            console.log("lo",this.localPrueba);
  }

  ngOnInit() {

/*     this.forrr =JSON.parse(localStorage.getItem('Extra'));


    if (this.forrr !== null) {
      this.localPrueba = this.forrr[0];
    }else{
      this.localPrueba = null;
    } */


    this.idl =JSON.parse(localStorage.getItem('IdEmpleado'));



    this.userform = this.fb.group({
      extid:[''],
      extidempleado:[Number(this.idl)],
      extfaciltransporte:[''],
      extvariostransporte:[''],
      extmuchotiemviaje:[''],
      exttranscomodo:[''],
      extzonasegura:[''],
      extzonadelincuencia:[''],
      extfacilcmedico:[''],
      extbuenasvias:[''],
      extcercatransporte:[''],
      extcondicvivienda:[''],
      extagualuz:[''],
      extpermdescanzar:[''],
      extviviendacomoda:[''],
      exttiemporecreo:[''],
      exttiempodescanzo:[''],
      exttiempopersonal:[''],
      exttiempofamilia:[''],
      extbuenacomunica:[''],
      extrelacionamigos:[''],
      extconversoperson:[''],
      extamigosescuchan:[''],
      extapoyofamiliar:[''],
      exthabloconperso:[''],
      extproblemfamiliar:[''],
      extrelacionfamiliar:[''],
      extquitanenergia:[''],
      extresolveamistosa:[''],
      extafectrelacionestra:[''],
      extdineroalcanza:[''],
      extpresupuesfamilia:[''],
      extdeudashogar:[''],
      extfechareg:[''],
      extfechamod:[''],
      extusuarioreg:[''] 

    })

    this.a1 = [];
    this.a1.push({ label: 'Seleccione...', value: 'NR' });
    this.a1.push({ label: 'Siempre', value: '1' });
    this.a1.push({ label: 'Casi Siempre', value: '2' });
    this.a1.push({ label: 'Algunas Veces', value: '3' });
    this.a1.push({ label: 'Casi nunca', value: '4' });
    this.a1.push({ label: 'Nunca', value: '5' });

    this.a11 = [];
    this.a11.push({ label: 'Seleccione...', value: 'NR' });
    this.a11.push({ label: 'Siempre', value: '4' });
    this.a11.push({ label: 'Casi Siempre', value: '3' });
    this.a11.push({ label: 'Algunas Veces', value: '2' });
    this.a11.push({ label: 'Casi nunca', value: '1' });
    this.a11.push({ label: 'Nunca', value: '0' });



     if(this.localPrueba !==null){
      this.userform.patchValue({
        /* extidempleado:this.idl, */
        extfaciltransporte:this.localPrueba.extfaciltransporte,
        extvariostransporte:this.localPrueba.extvariostransporte,
        extmuchotiemviaje:this.localPrueba.extmuchotiemviaje,
        exttranscomodo:this.localPrueba.exttranscomodo,
        extzonasegura:this.localPrueba.extzonasegura,
        extzonadelincuencia:this.localPrueba.extzonadelincuencia,
        extfacilcmedico:this.localPrueba.extfacilcmedico,
        extbuenasvias:this.localPrueba.extbuenasvias,
        extcercatransporte:this.localPrueba.extcercatransporte,
        extcondicvivienda:this.localPrueba.extcondicvivienda,
        extagualuz:this.localPrueba.extagualuz,
        extpermdescanzar:this.localPrueba.extpermdescanzar,
        extviviendacomoda:this.localPrueba.extviviendacomoda,
        exttiemporecreo:this.localPrueba.exttiemporecreo,
        exttiempodescanzo:this.localPrueba.exttiempodescanzo,
        exttiempopersonal:this.localPrueba.exttiempopersonal,
        exttiempofamilia:this.localPrueba.exttiempofamilia,
        extbuenacomunica:this.localPrueba.extbuenacomunica,
        extrelacionamigos:this.localPrueba.extrelacionamigos,
        extconversoperson:this.localPrueba.extconversoperson,
        extamigosescuchan:this.localPrueba.extamigosescuchan,
        extapoyofamiliar:this.localPrueba.extapoyofamiliar,
        exthabloconperso:this.localPrueba.exthabloconperso,
        extproblemfamiliar:this.localPrueba.extproblemfamiliar,
        extrelacionfamiliar:this.localPrueba.extrelacionfamiliar,
        extquitanenergia:this.localPrueba.extquitanenergia,
        extresolveamistosa:this.localPrueba.extresolveamistosa,
        extafectrelacionestra:this.localPrueba.extafectrelacionestra,
        extdineroalcanza:this.localPrueba.extdineroalcanza,
        extpresupuesfamilia:this.localPrueba.extpresupuesfamilia,
        extdeudashogar:this.localPrueba.extdeudashogar,
        extfechareg:this.localPrueba.extfechareg,
        extfechamod:this.localPrueba.extfechamod,
        extusuarioreg:this.localPrueba.extusuarioreg
      })
    } 
  };





 onSubmit(){
     if(this.userform.valid){
      if(this.localPrueba !== null){
        
        if(this.forrr.length !== 0 || this.forrr !== null){
          console.log("voy a actualizar");
          this.idd = this.localPrueba.extid; 
          this.pruebaservices.updateExtra(this.userform.value,this.idd)
          .subscribe((data: any) =>{


            this.pruebaservices.buscarExtra(this.localPrueba.extidempleado)
        .subscribe((data:any)=>{

          localStorage.setItem('Extra',JSON.stringify(data));
        })
            
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
            this.userform.reset();
            this.router.navigate(["EstresL"]);
          })
        }
        if (this.forrrEx !== null) {
          console.log("voy a actualizar");
          this.idd = this.localPrueba.extid; 
          this.pruebaservices.updateExtra(this.userform.value,this.idd)
          .subscribe((data: any) =>{


            this.pruebaservices.buscarExtra(this.localPrueba.extidempleado)
        .subscribe((data:any)=>{

          localStorage.setItem('Extra',JSON.stringify(data));
          localStorage.removeItem('ExtraE');

        })
            
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
            this.userform.reset();
            this.router.navigate(["EstresL"]);
          })
        }
  /*       else{
          console.log("voy a crear");
          this.pruebaservices.createExtra(this.userform.value)
          .subscribe((data:any)=>{
            localStorage.setItem('ExtraE',JSON.stringify(data));
            
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
            this.userform.reset();
            this.router.navigate(['/main/addEstres/crear']);
            
          })
        } */
      }else{
        console.log("voy a crear");
        this.pruebaservices.createExtra(this.userform.value)
        .subscribe((data:any)=>{
          localStorage.setItem('ExtraE',JSON.stringify(data));
          
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
          this.userform.reset();
          this.router.navigate(['EstresL']);
          
        })
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(['FinalFormularios']);
      
    } 
  }

  volver(){
  this.localvalidaEmple = JSON.parse(localStorage.getItem('prueba'));
  if (Number(this.localvalidaEmple.emdtipodecargo) == 1 || Number(this.localvalidaEmple.emdtipodecargo) == 2) {
    this.router.navigate(["FormularioAL/"+this.idem]);
  }else{
    this.router.navigate(["FormularioBL/"+this.idem]);
  }
   
  }

}
