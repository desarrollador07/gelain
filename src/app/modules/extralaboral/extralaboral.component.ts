import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
/*Modulos */
import { MessageService, MenuItem, SelectItem } from 'primeng/api';
/*Modelos */
import { Extralaboral } from 'src/app/models/extralaboral.model';
import { Empleado } from '../../models/empleado.mdel';
/*Servicios */
import { PruebaService } from '../../services/prueba.service';
import { FormatoExtraService } from 'src/app/services/formato-extra.service';

@Component({
  selector: 'app-extralaboral',
  templateUrl: './extralaboral.component.html',
  styleUrls: ['./extralaboral.component.css'],
})
export class ExtralaboralComponent implements OnInit {
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
  forrr:Extralaboral;
  forrrEx:Extralaboral;
  datosEmpleado:any;
  cedula:any;
  nombre:any;
  validSave:boolean = false;
 
  constructor(private pruebaservices: PruebaService,
              private formatoExtraService: FormatoExtraService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private _messageService: MessageService) {  
                this.datosEmpleado = sessionStorage.getItem("IdEmpleado");
  }

  async ngOnInit() {

    this.pruebaservices.getEmpleadoId(this.datosEmpleado).subscribe((data:any)=>{
      this.cedula = data[0].emdcedula;
      this.nombre = data[0].emdnombres + " " +data[0].emdapellidos;
    });

    this.userform = this.fb.group({
      extid:[''],
      extidempleado:[Number(this.idl)],
      extfaciltransporte:['', Validators.required],
      extvariostransporte:['', Validators.required],
      extmuchotiemviaje:['', Validators.required],
      exttranscomodo:['', Validators.required],
      extzonasegura:['', Validators.required],
      extzonadelincuencia:['', Validators.required],
      extfacilcmedico:['', Validators.required],
      extbuenasvias:['', Validators.required],
      extcercatransporte:['', Validators.required],
      extcondicvivienda:['', Validators.required],
      extagualuz:['', Validators.required],
      extpermdescanzar:['', Validators.required],
      extviviendacomoda:['', Validators.required],
      exttiemporecreo:['', Validators.required],
      exttiempodescanzo:['', Validators.required],
      exttiempopersonal:['', Validators.required],
      exttiempofamilia:['', Validators.required],
      extbuenacomunica:['', Validators.required],
      extrelacionamigos:['', Validators.required],
      extconversoperson:['', Validators.required],
      extamigosescuchan:['', Validators.required],
      extapoyofamiliar:['', Validators.required],
      exthabloconperso:['', Validators.required],
      extproblemfamiliar:['', Validators.required],
      extrelacionfamiliar:['', Validators.required],
      extquitanenergia:['', Validators.required],
      extresolveamistosa:['', Validators.required],
      extafectrelacionestra:['', Validators.required],
      extdineroalcanza:['', Validators.required],
      extpresupuesfamilia:['', Validators.required],
      extdeudashogar:['', Validators.required],
      extfechareg:[''],
      extfechamod:[''],
      extusuarioreg:[''] 

    })


    this.idl =JSON.parse(sessionStorage.getItem('IdEmpleado'));
    
    await this.formatoExtraService.buscarExtra((this.idl)).toPromise().then((data:any)=>{
        this.localPrueba = data[0];   
    });

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



     if(this.localPrueba !==null){
      this.userform.patchValue({
        extidempleado:this.localPrueba.extidempleado,
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


  /*Apartado de Validaciones */
  /* -------------------------------------- Sección 1 -------------------------- */
  get seccion1(){
    return this.userform.get('extfaciltransporte').invalid || this.userform.get('extvariostransporte').invalid || this.userform.get('extmuchotiemviaje').invalid
        || this.userform.get('exttranscomodo').invalid || this.userform.get('extzonasegura').invalid || this.userform.get('extzonadelincuencia').invalid
        || this.userform.get('extfacilcmedico').invalid || this.userform.get('extbuenasvias').invalid || this.userform.get('extcercatransporte').invalid
        || this.userform.get('extcondicvivienda').invalid || this.userform.get('extagualuz').invalid || this.userform.get('extpermdescanzar').invalid
        || this.userform.get('extviviendacomoda').invalid; 
  }
  get extfaciltransporteMarca(){
    return this.userform.get('extfaciltransporte').invalid
  }
  get extfaciltransporte() {
    return this.userform.get('extfaciltransporte').invalid && this.userform.get('extfaciltransporte').touched
  }
  get extvariostransporteMarca(){
    return this.userform.get('extvariostransporte').invalid
  }
  get extvariostransporte() {
    return this.userform.get('extvariostransporte').invalid && this.userform.get('extvariostransporte').touched
  }
  get extmuchotiemviajeMarca(){
    return this.userform.get('extmuchotiemviaje').invalid
  }
  get extmuchotiemviaje() {
    return this.userform.get('extmuchotiemviaje').invalid && this.userform.get('extmuchotiemviaje').touched
  }
  get exttranscomodoMarca(){
    return this.userform.get('exttranscomodo').invalid
  }
  get exttranscomodo() {
    return this.userform.get('exttranscomodo').invalid && this.userform.get('exttranscomodo').touched
  }
  get extzonaseguraMarca(){
    return this.userform.get('extzonasegura').invalid
  }
  get extzonasegura() {
    return this.userform.get('extzonasegura').invalid && this.userform.get('extzonasegura').touched
  }
  get extzonadelincuenciaMarca(){
    return this.userform.get('extzonadelincuencia').invalid
  }
  get extzonadelincuencia() {
    return this.userform.get('extzonadelincuencia').invalid && this.userform.get('extzonadelincuencia').touched
  }
  get extfacilcmedicoMarca(){
    return this.userform.get('extfacilcmedico').invalid
  }
  get extfacilcmedico() {
    return this.userform.get('extfacilcmedico').invalid && this.userform.get('extfacilcmedico').touched
  }
  get extbuenasviasMarca(){
    return this.userform.get('extbuenasvias').invalid
  }
  get extbuenasvias() {
    return this.userform.get('extbuenasvias').invalid && this.userform.get('extbuenasvias').touched
  }
  get extcercatransporteMarca(){
    return this.userform.get('extcercatransporte').invalid
  }
  get extcercatransporte() {
    return this.userform.get('extcercatransporte').invalid && this.userform.get('extcercatransporte').touched
  }
  get extcondicviviendaMarca(){
    return this.userform.get('extcondicvivienda').invalid
  }
  get extcondicvivienda() {
    return this.userform.get('extcondicvivienda').invalid && this.userform.get('extcondicvivienda').touched
  }
  get extagualuzMarca(){
    return this.userform.get('extagualuz').invalid
  }
  get extagualuz() {
    return this.userform.get('extagualuz').invalid && this.userform.get('extagualuz').touched
  }
  get extpermdescanzarMarca(){
    return this.userform.get('extpermdescanzar').invalid
  }
  get extpermdescanzar() {
    return this.userform.get('extpermdescanzar').invalid && this.userform.get('extpermdescanzar').touched
  }
  get extviviendacomodaMarca(){
    return this.userform.get('extviviendacomoda').invalid
  }
  get extviviendacomoda() {
    return this.userform.get('extviviendacomoda').invalid && this.userform.get('extviviendacomoda').touched
  }

  /* -------------------------------------- Sección 2 -------------------------- */
  get seccion2(){
    return this.userform.get('exttiemporecreo').invalid || this.userform.get('exttiempodescanzo').invalid || this.userform.get('exttiempopersonal').invalid
        || this.userform.get('exttiempofamilia').invalid || this.userform.get('extbuenacomunica').invalid || this.userform.get('extrelacionamigos').invalid
        || this.userform.get('extconversoperson').invalid || this.userform.get('extamigosescuchan').invalid || this.userform.get('extapoyofamiliar').invalid
        || this.userform.get('exthabloconperso').invalid || this.userform.get('extproblemfamiliar').invalid || this.userform.get('extrelacionfamiliar').invalid 
        || this.userform.get('extquitanenergia').invalid || this.userform.get('extresolveamistosa').invalid || this.userform.get('extafectrelacionestra').invalid 
        || this.userform.get('extdineroalcanza').invalid || this.userform.get('extpresupuesfamilia').invalid || this.userform.get('extdeudashogar').invalid; 
  }
  get exttiemporecreoMarca(){
    return this.userform.get('exttiemporecreo').invalid
  }
  get exttiemporecreo() {
    return this.userform.get('exttiemporecreo').invalid && this.userform.get('exttiemporecreo').touched
  }
  get exttiempodescanzoMarca(){
    return this.userform.get('exttiempodescanzo').invalid
  }
  get exttiempodescanzo() {
    return this.userform.get('exttiempodescanzo').invalid && this.userform.get('exttiempodescanzo').touched
  }
  get exttiempopersonalMarca(){
    return this.userform.get('exttiempopersonal').invalid
  }
  get exttiempopersonal() {
    return this.userform.get('exttiempopersonal').invalid && this.userform.get('exttiempopersonal').touched
  }
  get exttiempofamiliaMarca(){
    return this.userform.get('exttiempofamilia').invalid
  }
  get exttiempofamilia() {
    return this.userform.get('exttiempofamilia').invalid && this.userform.get('exttiempofamilia').touched
  }
  get extbuenacomunicaMarca(){
    return this.userform.get('extbuenacomunica').invalid
  }
  get extbuenacomunica() {
    return this.userform.get('extbuenacomunica').invalid && this.userform.get('extbuenacomunica').touched
  }
  get extrelacionamigosMarca(){
    return this.userform.get('extrelacionamigos').invalid
  }
  get extrelacionamigos() {
    return this.userform.get('extrelacionamigos').invalid && this.userform.get('extrelacionamigos').touched
  }
  get extconversopersonMarca(){
    return this.userform.get('extconversoperson').invalid
  }
  get extconversoperson() {
    return this.userform.get('extconversoperson').invalid && this.userform.get('extconversoperson').touched
  }
  get extamigosescuchanMarca(){
    return this.userform.get('extamigosescuchan').invalid
  }
  get extamigosescuchan() {
    return this.userform.get('extamigosescuchan').invalid && this.userform.get('extamigosescuchan').touched
  }
  get extapoyofamiliarMarca(){
    return this.userform.get('extapoyofamiliar').invalid
  }
  get extapoyofamiliar() {
    return this.userform.get('extapoyofamiliar').invalid && this.userform.get('extapoyofamiliar').touched
  }
  get exthabloconpersoMarca(){
    return this.userform.get('exthabloconperso').invalid
  }
  get exthabloconperso() {
    return this.userform.get('exthabloconperso').invalid && this.userform.get('exthabloconperso').touched
  }
  get extproblemfamiliarMarca(){
    return this.userform.get('extproblemfamiliar').invalid
  }
  get extproblemfamiliar() {
    return this.userform.get('extproblemfamiliar').invalid && this.userform.get('extproblemfamiliar').touched
  }
  get extrelacionfamiliarMarca(){
    return this.userform.get('extrelacionfamiliar').invalid
  }
  get extrelacionfamiliar() {
    return this.userform.get('extrelacionfamiliar').invalid && this.userform.get('extrelacionfamiliar').touched
  }
  get extquitanenergiaMarca(){
    return this.userform.get('extquitanenergia').invalid
  }
  get extquitanenergia() {
    return this.userform.get('extquitanenergia').invalid && this.userform.get('extquitanenergia').touched
  }
  get extresolveamistosaMarca(){
    return this.userform.get('extresolveamistosa').invalid
  }
  get extresolveamistosa() {
    return this.userform.get('extresolveamistosa').invalid && this.userform.get('extresolveamistosa').touched
  }
  get extafectrelacionestraMarca(){
    return this.userform.get('extafectrelacionestra').invalid
  }
  get extafectrelacionestra() {
    return this.userform.get('extafectrelacionestra').invalid && this.userform.get('extafectrelacionestra').touched
  }
  get extdineroalcanzaMarca(){
    return this.userform.get('extdineroalcanza').invalid
  }
  get extdineroalcanza() {
    return this.userform.get('extdineroalcanza').invalid && this.userform.get('extdineroalcanza').touched
  }
  get extpresupuesfamiliaMarca(){
    return this.userform.get('extpresupuesfamilia').invalid
  }
  get extpresupuesfamilia() {
    return this.userform.get('extpresupuesfamilia').invalid && this.userform.get('extpresupuesfamilia').touched
  }
  get extdeudashogarMarca(){
    return this.userform.get('extdeudashogar').invalid
  }
  get extdeudashogar() {
    return this.userform.get('extdeudashogar').invalid && this.userform.get('extdeudashogar').touched
  }




 onSubmit(){
     if(this.userform.valid){
       this.validSave = true;
      if(this.localPrueba !== null){
          this.idd = this.localPrueba.extid; 
          this.formatoExtraService.updateExtra(this.userform.value,this.idd)
          .subscribe((data: any) =>{
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'Registro Actualizado', life: 3000})
            this.userform.reset();
            setTimeout(() => {
              this.router.navigate(["/main/addEstres/editar"]);
            }, 1000);
           
          })
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(['/main/empleado']);
      
    } 
  }

  volver(){
    this.localvalidaEmple = JSON.parse(sessionStorage.getItem('empEdit'));
    if (Number(this.localvalidaEmple.emdtipodecargo) == 1 || Number(this.localvalidaEmple.emdtipodecargo) == 2) {
      this.router.navigate(['/main/addFormatoA/editar']);
    }else{
      this.router.navigate(['/main/addFormatoB/editar']);
    }
     
    }



}
