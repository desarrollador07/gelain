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
  templateUrl: './estres.component.html',
  styleUrls: ['./estres.component.css'],
})
export class EstresComponent implements OnInit {
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
      estdolorcuello:[''],
      estprobgastrico:[''],
      estprobrespira:[''],
      estdolorcabeza:[''],
      esttrastsueno:[''],
      estpalpitacion:[''],
      estcamapetito:[''],
      estprobgenital:[''],
      estdiffamiliar:[''],
      estdifquieto:[''],
      estdifpersonas:[''],
      estsensaislami:[''],
      estsobrecarga:[''],
      estdifconcentrar:[''],
      estaumentaccid:[''],
      estsentfrustra:[''],
      estcansancio:[''],
      estdismrendimie:[''],
      estdeseonotrab:[''],
      estpocointeres:[''],
      estdifdecisiones:[''],
      estcambioempleo:[''],
      estsentisoledad:[''],
      estsentinegativo:[''],
      estsetangpretris:[''],
      estconsdrogas:[''],
      estsentinosirve:[''],
      estconsucigarri:[''],
      estperdirazon:[''],
      estcomprigido:[''],
      estsensproblem:[''],
/*       estfechareg:[''],
      estfechamod:[''], */
      estusuarioreg:['']

    })

    this.a1 = [];
    this.a1.push({ label: 'Seleccione...', value: 'NR' });
    this.a1.push({ label: 'Siempre', value: '9' });
    this.a1.push({ label: 'Casi Siempre', value: '6' });
    this.a1.push({ label: 'A Veces', value: '3' });
    this.a1.push({ label: 'Nunca', value: '0' });

    this.a11 = [];
    this.a11.push({ label: 'Seleccione...', value: 'NR' });
    this.a11.push({ label: 'Siempre', value: '6' });
    this.a11.push({ label: 'Casi Siempre', value: '4' });
    this.a11.push({ label: 'A Veces', value: '2' });
    this.a11.push({ label: 'Nunca', value: '0' });

    this.a12 = [];
    this.a12.push({ label: 'Seleccione...', value: 'NR' });
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
            this.router.navigate(['/main/empleado']);
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
            this.router.navigate(['/main/empleado']);
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
          this.router.navigate(['/main/empleado']);
          
        }))
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(['/main/empleado']);
      
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

}
