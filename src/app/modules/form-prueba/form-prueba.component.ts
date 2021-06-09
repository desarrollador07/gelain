import { Component, OnInit } from '@angular/core';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PruebaService } from '../../services/prueba.service';
import { ActivatedRoute } from "@angular/router";
import { Prueba } from '../../models/prueba.model';
import {MessageService, ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { routes } from '../../app.routes';


@Component({
  selector: 'app-form-prueba',
  templateUrl: './form-prueba.component.html',
  styleUrls: ['./form-prueba.component.css']
})
export class FormPruebaComponent implements OnInit {
  localPrueba: Prueba = {};
  userform: FormGroup;
  es: any;
  id: number;
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService) { 
    this.id = Number(this.route.snapshot.paramMap.get("id"));  
    console.log(this.id);
  }

  ngOnInit() {
    this.localPrueba =JSON.parse(localStorage.getItem('prueba'));
    console.log('f',this.localPrueba);
    

    this.userform = this.fb.group({
      pr_id:['', Validators.required],
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      confirmar: ['', Validators.required],
      edad: ['', Validators.required],
      tipo: ['FV00'],
      biginteger: ['',Validators.required],
      fecha: ['2021-03-17'],
      estado: ['1'],
      fecha2: ['2021-03-17'],
      lab_opa_id: ['1'],
    })

    if(this.localPrueba !==null){
      this.userform.patchValue({
        pr_id:this.localPrueba.pr_id,
        codigo:this.localPrueba.codigo,
        nombre:this.localPrueba.nombre,
        confirmar:this.localPrueba.confirmar,
        edad:this.localPrueba.edad,
        biginteger:this.localPrueba.biginteger,
      })
    }
  }

  get pr_id() {
    return this.userform.get('pr_id').invalid && this.userform.get('pr_id').touched
  }
  get codigo() {
    return this.userform.get('codigo').invalid && this.userform.get('codigo').touched
  }

  get nombre() {
    return this.userform.get('nombre').invalid && this.userform.get('nombre').touched
  }
  get confirmar() {
    return this.userform.get('confirmar').invalid && this.userform.get('confirmar').touched
  }
  get edad() {
    return this.userform.get('edad').invalid && this.userform.get('edad').touched
  }
  get biginteger() {
    return this.userform.get('biginteger').invalid && this.userform.get('biginteger').touched
  }


 onSubmit(){
    if(this.userform.valid){
      if(this.localPrueba !== null){
        console.log("voy a actualizar");
        this.pruebaservices.updatePrueba(this.userform.value)
        .subscribe((data: any) =>{
          console.log(data);
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/listarPrueba"]);
        })
      }else{
        console.log("voy a crear");
        this.pruebaservices.createPrueba(this.userform.value)
        .subscribe((data=>{
          console.log(data);
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/listarPrueba"]);
          
        }))
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/listarPrueba"]);
      
    }
  }

}
