import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Area } from '../../models/area.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AreasService } from 'src/app/services/areas.service';


@Component({
  selector: 'app-form-prueba',
  templateUrl: './form-area.component.html',
  styleUrls: ['./form-area.component.css']
})
export class FormAreaComponent implements OnInit {
  localPrueba: Area = {};
  localIDEmp:number;
  userform: FormGroup;
  es: any;
  id: number;
  idd: any;
 

 
  constructor(
              private areasServices: AreasService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private _messageService: MessageService) { 
    this.id = Number(this.route.snapshot.paramMap.get("id"));  
    console.log(this.id);
  }

  ngOnInit() {
    let today = new Date();
    this.localPrueba =JSON.parse(localStorage.getItem('prueba'));
    this.localIDEmp =JSON.parse(localStorage.getItem('idempre'));
    console.log('f',this.localPrueba);


    this.userform = this.fb.group({
        areid:[''],
        areempresa: [''],
        arenombre: [''],
        arefechaini: [today],
        areactivo: ['1'],

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
        this.idd = this.localPrueba.areid;
        this.areasServices.updateArea(this.userform.value,this.idd).subscribe((data: any) =>{
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/listarEmpresa"]);
        });
      }else{
        this.userform.value.areempresa = this.localIDEmp;
        this.areasServices.createArea(this.userform.value).subscribe((data=>{
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/listarEmpresa"]);
          
        }));
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/listarPrueba"]);
      
    } 
  }

}
