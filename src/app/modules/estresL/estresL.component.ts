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


@Component({
  selector: 'app-estres',
  templateUrl: './estresL.component.html',
  styleUrls: ['./estresL.component.css'],
})
export class EstresLComponent implements OnInit {
  localPrueba: Estres = {};
  userform: FormGroup;
  es: any;
  idd: any;
  a1: SelectItem[];
  a11: SelectItem[];
  a12: SelectItem[];
  idl:any;
  items: MenuItem[];
  activeIndex: number = 1;
  forrr:any[]=[];
  forrrEs:Estres;
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService) {  
                this.forrr =JSON.parse(localStorage.getItem('estres'));
                this.forrrEs =JSON.parse(localStorage.getItem('estresEs'));
                console.log("estresEs",this.forrrEs);
                console.log("estres",this.forrr);

                if (this.forrr !== null) {
                  console.log("ina");
                  
                  this.localPrueba = this.forrr[0];
                }if (this.forrrEs !== null) {
                  console.log("inb");
                  this.forrr = [];
                  this.localPrueba = this.forrrEs;
                }
                if(this.forrr == null && this.forrrEs == null){
                  console.log("inc");
                  
                  this.localPrueba = null;
                }
                console.log("lo",this.localPrueba);
              
            
                this.idl =JSON.parse(localStorage.getItem('IdEmpleado'));
  }

  ngOnInit() {





    this.userform = this.fb.group({
      estid:[''],
      estidempleado:[Number(this.idl)],
      estdolorcuello:['', Validators.required],
      estprobgastrico:['', Validators.required],
      estprobrespira:['', Validators.required],
      estdolorcabeza:['', Validators.required],
      esttrastsueno:['', Validators.required],
      estpalpitacion:['', Validators.required],
      estcamapetito:['', Validators.required],
      estprobgenital:['', Validators.required],
      estdiffamiliar:['', Validators.required],
      estdifquieto:['', Validators.required],
      estdifpersonas:['', Validators.required],
      estsensaislami:['', Validators.required],
      estsobrecarga:['', Validators.required],
      estdifconcentrar:['', Validators.required],
      estaumentaccid:['', Validators.required],
      estsentfrustra:['', Validators.required],
      estcansancio:['', Validators.required],
      estdismrendimie:['', Validators.required],
      estdeseonotrab:['', Validators.required],
      estpocointeres:['', Validators.required],
      estdifdecisiones:['', Validators.required],
      estcambioempleo:['', Validators.required],
      estsentisoledad:['', Validators.required],
      estsentinegativo:['', Validators.required],
      estsetangpretris:['', Validators.required],
      estconsdrogas:['', Validators.required],
      estsentinosirve:['', Validators.required],
      estconsucigarri:['', Validators.required],
      estperdirazon:['', Validators.required],
      estcomprigido:['', Validators.required],
      estsensproblem:['', Validators.required],
/*       estfechareg:[''],
      estfechamod:[''], */
      estusuarioreg:['']

    })

    this.a1 = [];
    this.a1.push({ label: 'Seleccione...', value: '' });
    this.a1.push({ label: 'Siempre', value: '1' });
    this.a1.push({ label: 'Casi Siempre', value: '2' });
    this.a1.push({ label: 'Algunas Veces', value: '3' });
    this.a1.push({ label: 'Casi nunca', value: '4' });
    this.a1.push({ label: 'Nunca', value: '5' });

    this.a11 = [];
    this.a11.push({ label: 'Seleccione...', value: '' });
    this.a11.push({ label: 'Siempre', value: '6' });
    this.a11.push({ label: 'Casi Siempre', value: '4' });
    this.a11.push({ label: 'A Veces', value: '2' });
    this.a11.push({ label: 'Nunca', value: '0' });

    this.a12 = [];
    this.a12.push({ label: 'Seleccione...', value: '' });
    this.a12.push({ label: 'Siempre', value: '3' });
    this.a12.push({ label: 'Casi Siempre', value: '2' });
    this.a12.push({ label: 'A Veces', value: '1' });
    this.a12.push({ label: 'Nunca', value: '0' });


     if(this.localPrueba !==null){
      this.userform.patchValue({
        estidempleado:this.idl,
        estdolorcuello:this.localPrueba.estdolorcuello,
        estprobgastrico:this.localPrueba.estprobgastrico,
        estprobrespira:this.localPrueba.estprobrespira,
        estdolorcabeza:this.localPrueba.estdolorcabeza,
        esttrastsueno:this.localPrueba.esttrastsueno,
        estpalpitacion:this.localPrueba.estpalpitacion,
        estcamapetito:this.localPrueba.estcamapetito,
        estprobgenital:this.localPrueba.estprobgenital,
        estdiffamiliar:this.localPrueba.estdiffamiliar,
        estdifquieto:this.localPrueba.estdifquieto,
        estdifpersonas:this.localPrueba.estdifpersonas,
        estsensaislami:this.localPrueba.estsensaislami,
        estsobrecarga:this.localPrueba.estsobrecarga,
        estdifconcentrar:this.localPrueba.estdifconcentrar,
        estaumentaccid:this.localPrueba.estaumentaccid,
        estsentfrustra:this.localPrueba.estsentfrustra,
        estcansancio:this.localPrueba.estcansancio,
        estdismrendimie:this.localPrueba.estdismrendimie,
        estdeseonotrab:this.localPrueba.estdeseonotrab,
        estpocointeres:this.localPrueba.estpocointeres,
        estdifdecisiones:this.localPrueba.estdifdecisiones,
        estcambioempleo:this.localPrueba.estcambioempleo,
        estsentisoledad:this.localPrueba.estsentisoledad,
        estsentinegativo:this.localPrueba.estsentinegativo,
        estsetangpretris:this.localPrueba.estsetangpretris,
        estconsdrogas:this.localPrueba.estconsdrogas,
        estsentinosirve:this.localPrueba.estsentinosirve,
        estconsucigarri:this.localPrueba.estconsucigarri,
        estperdirazon:this.localPrueba.estperdirazon,
        estcomprigido:this.localPrueba.estcomprigido,
        estsensproblem:this.localPrueba.estsensproblem,
        estusuarioreg:this.localPrueba.estusuarioreg
      })
    } 
  };

  get estdolorcuello() {
    return this.userform.get('estdolorcuello').invalid && this.userform.get('estdolorcuello').touched
  }
  get estprobgastrico() {
    return this.userform.get('estprobgastrico').invalid && this.userform.get('estprobgastrico').touched
  }
  get estprobrespira() {
    return this.userform.get('estprobrespira').invalid && this.userform.get('estprobrespira').touched
  }
  get estdolorcabeza() {
    return this.userform.get('estdolorcabeza').invalid && this.userform.get('estdolorcabeza').touched
  }
  get esttrastsueno() {
    return this.userform.get('esttrastsueno').invalid && this.userform.get('esttrastsueno').touched
  }
  get estpalpitacion() {
    return this.userform.get('estpalpitacion').invalid && this.userform.get('estpalpitacion').touched
  }
  get estcamapetito() {
    return this.userform.get('estcamapetito').invalid && this.userform.get('estcamapetito').touched
  }
  get estprobgenital() {
    return this.userform.get('estprobgenital').invalid && this.userform.get('estprobgenital').touched
  }
  get estdiffamiliar() {
    return this.userform.get('estdiffamiliar').invalid && this.userform.get('estdiffamiliar').touched
  }
  get estdifquieto() {
    return this.userform.get('estdifquieto').invalid && this.userform.get('estdifquieto').touched
  }
  get estdifpersonas() {
    return this.userform.get('estdifpersonas').invalid && this.userform.get('estdifpersonas').touched
  }
  get estsensaislami() {
    return this.userform.get('estsensaislami').invalid && this.userform.get('estsensaislami').touched
  }
  get estsobrecarga() {
    return this.userform.get('estsobrecarga').invalid && this.userform.get('estsobrecarga').touched
  }
  get estdifconcentrar() {
    return this.userform.get('estdifconcentrar').invalid && this.userform.get('estdifconcentrar').touched
  }
  get estaumentaccid() {
    return this.userform.get('estaumentaccid').invalid && this.userform.get('estaumentaccid').touched
  }
  get estsentfrustra() {
    return this.userform.get('estsentfrustra').invalid && this.userform.get('estsentfrustra').touched
  }
  get estcansancio() {
    return this.userform.get('estcansancio').invalid && this.userform.get('estcansancio').touched
  }
  get estdismrendimie() {
    return this.userform.get('estdismrendimie').invalid && this.userform.get('estdismrendimie').touched
  }
  get estdeseonotrab() {
    return this.userform.get('estdeseonotrab').invalid && this.userform.get('estdeseonotrab').touched
  }
  get estpocointeres() {
    return this.userform.get('estpocointeres').invalid && this.userform.get('estpocointeres').touched
  }
  get estdifdecisiones() {
    return this.userform.get('estdifdecisiones').invalid && this.userform.get('estdifdecisiones').touched
  }
  get estcambioempleo() {
    return this.userform.get('estcambioempleo').invalid && this.userform.get('estcambioempleo').touched
  }
  get estsentisoledad() {
    return this.userform.get('estsentisoledad').invalid && this.userform.get('estsentisoledad').touched
  }
  get estsentinegativo() {
    return this.userform.get('estsentinegativo').invalid && this.userform.get('estsentinegativo').touched
  }
  get estsetangpretris() {
    return this.userform.get('estsetangpretris').invalid && this.userform.get('estsetangpretris').touched
  }
  get estconsdrogas() {
    return this.userform.get('estconsdrogas').invalid && this.userform.get('estconsdrogas').touched
  }
  get estsentinosirve() {
    return this.userform.get('estsentinosirve').invalid && this.userform.get('estsentinosirve').touched
  }
  get estconsucigarri() {
    return this.userform.get('estconsucigarri').invalid && this.userform.get('estconsucigarri').touched
  }
  get estperdirazon() {
    return this.userform.get('estperdirazon').invalid && this.userform.get('estperdirazon').touched
  }
  get estcomprigido() {
    return this.userform.get('estcomprigido').invalid && this.userform.get('estcomprigido').touched
  }
  get estsensproblem() {
    return this.userform.get('estsensproblem').invalid && this.userform.get('estsensproblem').touched
  }





 onSubmit(){
     if(this.userform.valid){
      if(this.localPrueba !== null){

        if(this.forrr.length !== 0 || this.forrr !== null){
          console.log("voy a actualizar");
          this.idd = this.localPrueba.estid;
          this.pruebaservices.updateEstres(this.userform.value,this.idd)
          .subscribe((data: any) =>{
            this.pruebaservices.buscarByEstres(this.localPrueba.estidempleado)
        .subscribe((data:any)=>{
          console.log("estres",data);
          localStorage.setItem('estres',JSON.stringify(data));
        })
            console.log(data);
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
            this.userform.reset();
            this.router.navigate(['FinalFormularios']);
          })
        }
        if (this.forrrEs !== null) {
          console.log("voy a actualizar");
          this.idd = this.localPrueba.estid;
          this.pruebaservices.updateEstres(this.userform.value,this.idd)
          .subscribe((data: any) =>{
            this.pruebaservices.buscarByEstres(this.localPrueba.estidempleado)
        .subscribe((data:any)=>{
          console.log("estres",data);
          localStorage.setItem('estres',JSON.stringify(data));
          localStorage.removeItem('estresEs');
        })
            console.log(data);
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
            this.userform.reset();
            this.router.navigate(['FinalFormularios']);
          })
        }
/*         else{
          console.log("voy a crear");
          this.pruebaservices.createEstres(this.userform.value)
          .subscribe((data=>{
            console.log(data);
            localStorage.setItem('estresEs',JSON.stringify(data));
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
            this.userform.reset();
            this.router.navigate(['/main/empleado']);
            
          }))
        } */

      }else{
        console.log("voy a crear");
        this.pruebaservices.createEstres(this.userform.value)
        .subscribe((data=>{
          console.log(data);
          localStorage.setItem('estresEs',JSON.stringify(data));
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
          this.userform.reset();
          this.router.navigate(['FinalFormularios']);
          
        }))
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(['FinalFormularios']);
      
    } 
  }

  salir(){
    localStorage.removeItem('prueba');
    localStorage.removeItem('IdEmpleado');
    localStorage.removeItem('ForA');
    localStorage.removeItem('ForAA');
    localStorage.removeItem('ForB');
    localStorage.removeItem('Extra');
    localStorage.removeItem('ExtraE');
    localStorage.removeItem('estresEs');
    localStorage.removeItem('estres');
  }

  volver(){
    this.router.navigate(["ExtralaboralL"]);
  }

}
