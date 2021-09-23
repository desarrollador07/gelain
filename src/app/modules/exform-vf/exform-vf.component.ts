import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem, MessageService } from 'primeng/api';
import { Area } from 'src/app/models/area.model';
import { Empresa } from 'src/app/models/empresa.model';
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-exform-vf',
  templateUrl: './exform-vf.component.html',
  styleUrls: ['./exform-vf.component.css']
})
export class ExformVfComponent implements OnInit {

  userform: FormGroup;
  empresa: SelectItem[] = [];
  empresas: Empresa[] = [];
  area: SelectItem[] = [];
  areas: Area[] = [];
  sexo: SelectItem[] = [];
  selectvafc1: SelectItem[] = [];
  
  constructor(private pruebaservices: PruebaService,
              private fb: FormBuilder,
              private router: Router,
              private _messageService: MessageService) { 

    
  }

  async ngOnInit() {

    this.formulario();
    this.selectData();
    await this.pruebaservices.getEmpresa().toPromise().then((data:any)=>{
      this.empresas = data;
      this.empresas.map(x=>{
        this.empresa.push({
          label:x.empnombre,
          value: x.empid
        }); 
      });
    });

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
      vafcargo:['',Validators.required],
      vafsexo:['',Validators.required],
      vaffecha:['',Validators.required],
      vaftelefono:['',Validators.required],
      vafciudad:['',Validators.required],
      vafedad:['',Validators.required],
      vafc1:['',Validators.required],

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
      this.pruebaservices.createvalorFisico(this.userform.value).subscribe((data:any)=>{
        console.log(data);
        this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'El registro se ha guardado exitosamente', life: 3000})
        this.userform.reset();
        // this.router.navigate(["/main/ValorFisico"]);
      });
  }else{
    this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      // this.router.navigate(["/main/ValorFisico"]);
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
  
  selectData(){
    this.sexo.push({ label: 'Sexo', value: ''});
    this.sexo.push({ label: 'Masculino', value: 'M' });
    this.sexo.push({ label: 'Femenino', value: 'F' });

    this.selectvafc1.push({ label: 'Seleccione una opción', value: ''});
    this.selectvafc1.push({ label: 'SI', value: '1' });
    this.selectvafc1.push({ label: 'NO', value: '0' });
  }

}
