import { Component, OnInit } from '@angular/core';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PruebaService } from '../../services/prueba.service';
import { ActivatedRoute } from "@angular/router";
import { Area } from '../../models/area.model';
import {MessageService, ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { routes } from '../../app.routes';


@Component({
  selector: 'app-form-prueba',
  templateUrl: './form-area.component.html',
  styleUrls: ['./form-area.component.css']
})
export class FormAreaComponent implements OnInit {
  localPrueba: Area = {};
  userform: FormGroup;
  es: any;
  id: number;
  idd: any;
 
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService) { 
    this.id = Number(this.route.snapshot.paramMap.get("id"));  
    console.log(this.id);
  }

  ngOnInit() {
    this.localPrueba =JSON.parse(localStorage.getItem('prueba'));
    console.log('f',this.localPrueba);


    this.userform = this.fb.group({
        areid:[''],
        areempresa: [''],
        arenombre: [''],
        arefechaini: [''],
        areactivo: [''],

    })

    if(this.localPrueba !==null){
      this.userform.patchValue({
        areempresa:this.localPrueba.areempresa,
        arenombre:this.localPrueba.arenombre,
        arefechaini:this.localPrueba.arefechaini,
        areactivo:this.localPrueba.areactivo,
      })
    }
  }

 onSubmit(){
     if(this.userform.valid){
      if(this.localPrueba !== null){
        console.log("voy a actualizar");
        this.idd = this.localPrueba.areid;
        this.pruebaservices.updateArea(this.userform.value,this.idd)
        .subscribe((data: any) =>{
          console.log(data);
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/area"]);
        })
      }else{
        console.log("voy a crear");
        this.pruebaservices.createArea(this.userform.value)
        .subscribe((data=>{
          console.log(data);
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/area"]);
          
        }))
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/listarPrueba"]);
      
    } 
  }

}
