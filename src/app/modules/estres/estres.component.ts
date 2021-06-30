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
  idl:any;
  items: MenuItem[];
  activeIndex: number = 1;
 
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService) {  
 
  }

  ngOnInit() {

    this.localPrueba =JSON.parse(localStorage.getItem('prueba'));
    console.log('idl',this.idl);

    this.idl =JSON.parse(localStorage.getItem('IdEmpleado'));
    console.log('idl',this.idl);


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
    this.a1.push({ label: 'Siempre', value: '1' });
    this.a1.push({ label: 'Casi Siempre', value: '2' });
    this.a1.push({ label: 'Algunas Veces', value: '3' });
    this.a1.push({ label: 'Casi nunca', value: '4' });
    this.a1.push({ label: 'Nunca', value: '5' });



/*     if(this.localPrueba !==null){
      this.userform.patchValue({
        empnit:this.localPrueba.empnit,
        empnombre:this.localPrueba.empnombre,
        emprepresentante:this.localPrueba.emprepresentante,
        empdepartamento:this.localPrueba.empdepartamento,
        empciudad:this.localPrueba.empciudad,
        empdireccion:this.localPrueba.empdireccion,
        emptelefono:this.localPrueba.emptelefono,
        empactiva:this.localPrueba.empactiva,
        empfechaini:this.localPrueba.empfechaini,
      })
    } */
  };





 onSubmit(){
     if(this.userform.valid){
      if(this.localPrueba !== null){
        console.log("voy a actualizar");
        this.idd = this.localPrueba.estid;
        this.pruebaservices.updateEstres(this.userform.value,this.idd)
        .subscribe((data: any) =>{
          console.log(data);
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
          this.userform.reset();
          this.router.navigate(['/main/empleado']);
        })
      }else{
        console.log("voy a crear");
        this.pruebaservices.createEstres(this.userform.value)
        .subscribe((data=>{
          console.log(data);
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

}
