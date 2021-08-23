import { Component, OnInit } from '@angular/core';
import {Validators,FormGroup,FormBuilder} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PruebaService } from '../../services/prueba.service';
import { ActivatedRoute } from "@angular/router";
import { Empleado } from '../../models/empleado.mdel';
import {MessageService, ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { routes } from '../../app.routes';
import { SelectItem } from 'primeng/api';
import { Empresa } from '../../models/empresa.model';
import { Area } from '../../models/area.model';
import { style } from '@angular/animations';
import { ValorFisico } from '../../models/valorFisico.model';



@Component({
  selector: 'app-form-prueba',
  templateUrl: './formValorFisico.component.html',
  styleUrls: ['./formValorFisico.component.css']
})
export class FormValorFisicoComponent implements OnInit {
  userform: FormGroup;
  empresa: SelectItem[] = [];
  empresas: Empresa[] = [];
  area: SelectItem[] = [];
  areas: Area[] = [];
  localPrueba: ValorFisico = {};
  idd: any;
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService,private datepipe: DatePipe) { 

    
  }

  async ngOnInit() {
    this.localPrueba =JSON.parse(localStorage.getItem('valorFisico'));
    this.formulario();

    await this.pruebaservices.getEmpresa().toPromise().then((data:any)=>{
      console.log(data);
      
      this.empresas = data;
      this.empresas.map(x=>{
        this.empresa.push({
          label:x.empnombre,
          value: x.empid
        }) 
      })
    })


    if(this.localPrueba !==null){
      
      this.userform.patchValue({
        vafidempresa:this.localPrueba.vafidempresa,
        vafidarea:this.localPrueba.vafidarea,
        vafidnombre:this.localPrueba.vafidnombre,
        vafsede:this.localPrueba.vafsede,
        vafpeso:this.localPrueba.vafpeso,
        vaftalla:this.localPrueba.vaftalla,
        vafimc:this.localPrueba.vafimc,
        vafperimetro:this.localPrueba.vafperimetro,
        vafp0:this.localPrueba.vafp0,
        vafp1:this.localPrueba.vafp1,
        vafp2:this.localPrueba.vafp2,
        vaftestbiering:this.localPrueba.vaftestbiering,
        vaftestpuenteder:this.localPrueba.vaftestpuenteder,
        vaftestpuenteizq:this.localPrueba.vaftestpuenteizq,
        vaftestresistronco:this.localPrueba.vaftestresistronco,
        vaftestflextronco:this.localPrueba.vaftestflextronco,
        vaftestmovhombder:this.localPrueba.vaftestmovhombder,
        vaftestmovhombizq:this.localPrueba.vaftestmovhombizq,
        vaftestmovartichomb:this.localPrueba.vaftestmovartichomb,
        vafobservaciones:this.localPrueba.vafobservaciones,
        vafcedula:this.localPrueba.vafcedula,

      })
    } 
  }

  get vafidempresa() {
    return this.userform.get('vafidempresa').invalid && this.userform.get('vafidempresa').touched
  }
  get vafidarea() {
    return this.userform.get('vafidarea').invalid && this.userform.get('vafidarea').touched
  }
  get vafidnombre() {
    return this.userform.get('vafidnombre').invalid && this.userform.get('vafidnombre').touched
  }
  get vafsede() {
    return this.userform.get('vafsede').invalid && this.userform.get('vafsede').touched
  }
  get vafpeso() {
    return this.userform.get('vafpeso').invalid && this.userform.get('vafpeso').touched
  }
  get vaftalla() {
    return this.userform.get('vaftalla').invalid && this.userform.get('vaftalla').touched
  }
  get vafimc() {
    return this.userform.get('vafimc').invalid && this.userform.get('vafimc').touched
  }
  get vafperimetro() {
    return this.userform.get('vafperimetro').invalid && this.userform.get('vafperimetro').touched
  }
  get vafp0() {
    return this.userform.get('vafp0').invalid && this.userform.get('vafp0').touched
  }
  get vafp1() {
    return this.userform.get('vafp1').invalid && this.userform.get('vafp1').touched
  }
  get vafp2() {
    return this.userform.get('vafp2').invalid && this.userform.get('vafp2').touched
  }
  get vaftestbiering() {
    return this.userform.get('vaftestbiering').invalid && this.userform.get('vaftestbiering').touched
  }
  get vaftestpuenteder() {
    return this.userform.get('vaftestpuenteder').invalid && this.userform.get('vaftestpuenteder').touched
  }
  get vaftestpuenteizq() {
    return this.userform.get('vaftestpuenteizq').invalid && this.userform.get('vaftestpuenteizq').touched
  }
  get vaftestresistronco() {
    return this.userform.get('vaftestresistronco').invalid && this.userform.get('vaftestresistronco').touched
  }
  get vaftestflextronco() {
    return this.userform.get('vaftestflextronco').invalid && this.userform.get('vaftestflextronco').touched
  }
  get vaftestmovhombder() {
    return this.userform.get('vaftestmovhombder').invalid && this.userform.get('vaftestmovhombder').touched
  }
  get vaftestmovhombizq() {
    return this.userform.get('vaftestmovhombizq').invalid && this.userform.get('vaftestmovhombizq').touched
  }
  get vaftestmovartichomb() {
    return this.userform.get('vaftestmovartichomb').invalid && this.userform.get('vaftestmovartichomb').touched
  }
  get vafobservaciones() {
    return this.userform.get('vafobservaciones').invalid && this.userform.get('vafobservaciones').touched
  }
  get vafcedula() {
    return this.userform.get('vafcedula').invalid && this.userform.get('vafcedula').touched
  }

  

  formulario(){
    this.userform = this.fb.group({
      vafid:[''],
      vafidempresa: ['', Validators.required],
      vafidarea: ['', Validators.required],
      vafidnombre: ['', Validators.required],
      vafsede: ['', Validators.required],
      vafpeso: ['', Validators.required],
      vaftalla: ['', Validators.required],
      vafimc: ['', Validators.required],
      vafperimetro: ['', Validators.required],
      vafp0: ['', Validators.required],
      vafp1: ['', Validators.required],
      vafp2: ['', Validators.required],
      vaftestbiering: ['',  Validators.required],
      vaftestpuenteder: ['', Validators.required],
      vaftestpuenteizq: ['', Validators.required],
      vaftestresistronco: ['', Validators.required],
      vaftestflextronco: ['', Validators.required],
      vaftestmovhombder: ['', Validators.required],
      vaftestmovhombizq: ['',  Validators.required],
      vaftestmovartichomb: ['', Validators.required],
      vafobservaciones: ['', Validators.required],
      vafcedula: ['', Validators.required],
    });
  }



 onSubmit(){
  if(this.userform.valid){
    if(this.localPrueba !== null){
      console.log("voy a actualizar");
      this.idd = this.localPrueba.vafid;
      this.pruebaservices.updatevalorFisico(this.userform.value,this.idd)
      .subscribe((data:any)=>{
        console.log(data);
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/ValorFisico"]);
      })
    }else{
      console.log("voy a crear");
      this.pruebaservices.createvalorFisico(this.userform.value).subscribe((data:any)=>{
        console.log(data);
        this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
              this.userform.reset();
              this.router.navigate(["/main/ValorFisico"]);
       })
    }
  }else{
    this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/ValorFisico"]);
  }

  }

  async buscarArea(){
    this.area =[];
      this.pruebaservices.buscarByArea(this.userform.value.vafidempresa).toPromise().then((data:any)=>{
        this.areas = data;
        this.areas.map(x=>{
          this.area.push({
            label:x.arenombre,
            value: x.areid
          });
        });
      });
  }
  


}
