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
import { Area } from '../../models/area.model';


@Component({
  selector: 'app-form-prueba',
  templateUrl: './form-prueba.component.html',
  styleUrls: ['./form-prueba.component.css']
})
export class FormPruebaComponent implements OnInit {
  localPrueba: Empresa = {};
  userform: FormGroup;
  userformArea: FormGroup;
  es: any;
  id: number;
  idd: any;
  estado: SelectItem[];
  values1: string[];
    areas: Area = {};
  values2: string[];
 
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService) { 
    this.id = Number(this.route.snapshot.paramMap.get("id"));  
    console.log(this.id);
  }

  ngOnInit() {
    this.localPrueba =JSON.parse(localStorage.getItem('prueba'));
    console.log('f',this.localPrueba);


    this.userform = this.fb.group({
      empid:[''],
      empnit: [''],
      empnombre: [''],
      emprepresentante: [''],
      empdepartamento: [''],
      empciudad: [''],
      empdireccion: [''],
      emptelefono: [''],
      empactiva: [''],
      empfechaini: [''],
      emparea:[''],

    })

    this.userformArea = this.fb.group({
      areid:[''],
      areempresa: [],
      arenombre: [''],
      arefechaini: [''],
      areactivo: [''],

  })

    this.estado = [];
    this.estado.push({ label: 'Estado', value: '' });
    this.estado.push({ label: 'Activo', value: '1' });
    this.estado.push({ label: 'Inactivo', value: '0' });


    if(this.localPrueba !==null){
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
    }
  }

 onSubmit(){
     if(this.userform.valid){
      if(this.localPrueba !== null){
        console.log("voy a actualizar");
        this.idd = this.localPrueba.empid;
        this.pruebaservices.updateEmpresa(this.userform.value,this.idd)
        .subscribe((data: any) =>{
          console.log(data);
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/listarEmpresa"]);
        })
      }else{
        console.log("voy a crear");
        
        this.pruebaservices.createEmpresa(this.userform.value)
        .subscribe((data=>{
          console.log(data);
          this.userform.value.emparea.map(res=>{
            this.areas = {};
            this.areas.arenombre = res;
            this.areas.areempresa = data.empid;
            this.areas.areactivo = "1";
            this.pruebaservices.createArea(this.areas)
            .subscribe();
          })
          
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/listarEmpresa"]);
          
        }))
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/listarPrueba"]);
      
    } 
  }

}
