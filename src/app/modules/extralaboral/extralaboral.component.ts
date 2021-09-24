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
 
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService) {  
                this.datosEmpleado = localStorage.getItem("IdEmpleado");
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


    this.idl =JSON.parse(localStorage.getItem('IdEmpleado'));
    console.log(this.idl);
    
    await this.pruebaservices.buscarExtra((this.idl)).toPromise().then((data:any)=>{
        console.log('buscando data:',data);
        this.localPrueba = data[0];
        console.log('localDataaaa',this.localPrueba);
        
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


  get extfaciltransporte() {
    return this.userform.get('extfaciltransporte').invalid && this.userform.get('extfaciltransporte').touched
  }
  get extvariostransporte() {
    return this.userform.get('extvariostransporte').invalid && this.userform.get('extvariostransporte').touched
  }
  get extmuchotiemviaje() {
    return this.userform.get('extmuchotiemviaje').invalid && this.userform.get('extmuchotiemviaje').touched
  }
  get exttranscomodo() {
    return this.userform.get('exttranscomodo').invalid && this.userform.get('exttranscomodo').touched
  }
  get extzonasegura() {
    return this.userform.get('extzonasegura').invalid && this.userform.get('extzonasegura').touched
  }
  get extzonadelincuencia() {
    return this.userform.get('extzonadelincuencia').invalid && this.userform.get('extzonadelincuencia').touched
  }
  get extfacilcmedico() {
    return this.userform.get('extfacilcmedico').invalid && this.userform.get('extfacilcmedico').touched
  }
  get extbuenasvias() {
    return this.userform.get('extbuenasvias').invalid && this.userform.get('extbuenasvias').touched
  }
  get extcercatransporte() {
    return this.userform.get('extcercatransporte').invalid && this.userform.get('extcercatransporte').touched
  }
  get extcondicvivienda() {
    return this.userform.get('extcondicvivienda').invalid && this.userform.get('extcondicvivienda').touched
  }
  get extagualuz() {
    return this.userform.get('extagualuz').invalid && this.userform.get('extagualuz').touched
  }
  get extpermdescanzar() {
    return this.userform.get('extpermdescanzar').invalid && this.userform.get('extpermdescanzar').touched
  }
  get extviviendacomoda() {
    return this.userform.get('extviviendacomoda').invalid && this.userform.get('extviviendacomoda').touched
  }
  get exttiemporecreo() {
    return this.userform.get('exttiemporecreo').invalid && this.userform.get('exttiemporecreo').touched
  }
  get exttiempodescanzo() {
    return this.userform.get('exttiempodescanzo').invalid && this.userform.get('exttiempodescanzo').touched
  }
  get exttiempopersonal() {
    return this.userform.get('exttiempopersonal').invalid && this.userform.get('exttiempopersonal').touched
  }
  get exttiempofamilia() {
    return this.userform.get('exttiempofamilia').invalid && this.userform.get('exttiempofamilia').touched
  }
  get extbuenacomunica() {
    return this.userform.get('extbuenacomunica').invalid && this.userform.get('extbuenacomunica').touched
  }
  get extrelacionamigos() {
    return this.userform.get('extrelacionamigos').invalid && this.userform.get('extrelacionamigos').touched
  }
  get extconversoperson() {
    return this.userform.get('extconversoperson').invalid && this.userform.get('extconversoperson').touched
  }
  get extamigosescuchan() {
    return this.userform.get('extamigosescuchan').invalid && this.userform.get('extamigosescuchan').touched
  }
  get extapoyofamiliar() {
    return this.userform.get('extapoyofamiliar').invalid && this.userform.get('extapoyofamiliar').touched
  }
  get exthabloconperso() {
    return this.userform.get('exthabloconperso').invalid && this.userform.get('exthabloconperso').touched
  }
  get extproblemfamiliar() {
    return this.userform.get('extproblemfamiliar').invalid && this.userform.get('extproblemfamiliar').touched
  }
  get extrelacionfamiliar() {
    return this.userform.get('extrelacionfamiliar').invalid && this.userform.get('extrelacionfamiliar').touched
  }
  get extquitanenergia() {
    return this.userform.get('extquitanenergia').invalid && this.userform.get('extquitanenergia').touched
  }
  get extresolveamistosa() {
    return this.userform.get('extresolveamistosa').invalid && this.userform.get('extresolveamistosa').touched
  }
  get extafectrelacionestra() {
    return this.userform.get('extafectrelacionestra').invalid && this.userform.get('extafectrelacionestra').touched
  }
  get extdineroalcanza() {
    return this.userform.get('extdineroalcanza').invalid && this.userform.get('extdineroalcanza').touched
  }
  get extpresupuesfamilia() {
    return this.userform.get('extpresupuesfamilia').invalid && this.userform.get('extpresupuesfamilia').touched
  }
  get extdeudashogar() {
    return this.userform.get('extdeudashogar').invalid && this.userform.get('extdeudashogar').touched
  }




 onSubmit(){
     if(this.userform.valid){
      if(this.localPrueba !== null){
          console.log("voy a actualizar");
          this.idd = this.localPrueba.extid; 
          this.pruebaservices.updateExtra(this.userform.value,this.idd)
          .subscribe((data: any) =>{
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
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
    this.localvalidaEmple = JSON.parse(localStorage.getItem('prueba'));
    if (Number(this.localvalidaEmple.emdtipodecargo) == 1 || Number(this.localvalidaEmple.emdtipodecargo) == 2) {
      this.router.navigate(['/main/addFormatoA/editar']);
    }else{
      this.router.navigate(['/main/addFormatoB/editar']);
    }
     
    }



}
