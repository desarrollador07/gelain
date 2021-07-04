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
  localIDEmp: number;
  localIDEmp2: number;
  prueba: Area;

  pruebas: Area[] = [];

  items1: MenuItem[];

  items2: MenuItem[];

  activeItem: MenuItem;

  userformArea: FormGroup;
  localPrueba: Empresa = {};
  localPruebaA: Area = {};
  userform: FormGroup;

  es: any;
  id: number;
  idd: any;
  estado: SelectItem[];
    areas: Area = {};
  values2: string[] = [];
  values1: string[] = [];
  area:any[];
  bandera:Boolean;
 
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService,private _activatedRoute: ActivatedRoute,private _confirmationServices: ConfirmationService) { 
    this.id = Number(this.route.snapshot.paramMap.get("id"));  
    //console.log(this.id);
  }

  ngOnInit() {
    let today = new Date();
    this.localIDEmp =JSON.parse(localStorage.getItem('Idempres'));

    this.indexData();

    this.items1 = [
      {label: 'Empresas', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Areas', icon: 'fa fa-fw fa-book'},
      {label: 'Empleados', icon: 'fa fa-fw fa-user'},
  ];

    this.localPruebaA =JSON.parse(localStorage.getItem('pruebaArea'));
    this.localPrueba =JSON.parse(localStorage.getItem('prueba'));
    //console.log('f',this.localPrueba);


    this.userform = this.fb.group({
      empid:[''],
      empnit: ['', Validators.required],
      empnombre: ['', Validators.required],
      emprepresentante: ['', Validators.required],
      empdepartamento: ['', Validators.required],
      empciudad: ['', Validators.required],
      empdireccion: ['', Validators.required],
      emptelefono: ['',  [Validators.required, Validators.minLength(7),Validators.maxLength(10)]],
      empactiva: ['', Validators.required],
      empfechaini: [''],
      //emparea:['', Validators.required],

    })

    this.userformArea = this.fb.group({
      areid:[''],
      areempresa: [''],
      arenombre: ['', Validators.required],
      arefechaini: [today],
      areactivo: ['1'],

  })

  if(this.localPrueba !==null){
    this.userformArea.patchValue({
      areempresa:this.localPruebaA.areempresa,
      arenombre:this.localPruebaA.arenombre,
      arefechaini:this.localPruebaA.arefechaini,
      areactivo:this.localPruebaA.areactivo,
    })
  }

    this.estado = [];
    this.estado.push({ label: 'Estado', value: '' });
    this.estado.push({ label: 'Activo', value: '1' });
    this.estado.push({ label: 'Inactivo', value: '0' });

    
    if(this.localPrueba !==null){
      this.bandera = true;
      this.buscarArea();
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
        //emparea:this.localPrueba.emparea
      })
    }
  }

  get empNit() {
    return this.userform.get('empnit').invalid && this.userform.get('empnit').touched
  }
  get empNombre() {
    return this.userform.get('empnombre').invalid && this.userform.get('empnombre').touched
  }
  get empRepresentante() {
    return this.userform.get('emprepresentante').invalid && this.userform.get('emprepresentante').touched
  }
  get empDepartamento() {
    return this.userform.get('empdepartamento').invalid && this.userform.get('empdepartamento').touched
  }
  get empCiudad() {
    return this.userform.get('empciudad').invalid && this.userform.get('empciudad').touched
  }
  get empDireccion() {
    return this.userform.get('empdireccion').invalid && this.userform.get('empdireccion').touched
  }
  get empTelefono() {
    return this.userform.get('emptelefono').invalid && this.userform.get('emptelefono').touched
  }
  get empTelefonomin() {
    return this.userform.get('emptelefono').hasError('minlength') 
  }
  get empTelefonomax() {
    return this.userform.get('emptelefono').hasError('maxlength') 
  }
  get empActiva() {
    return this.userform.get('empactiva').invalid && this.userform.get('empactiva').touched
  }
  get empArea() {
    return this.userform.get('emparea').invalid && this.userform.get('emparea').touched
  }

  get areNombre() {
    return this.userform.get('arenombre').invalid && this.userform.get('arenombre').touched
  }


 onSubmit(){
     if(this.userform.valid){
      if(this.localPrueba !== null){
        console.log("voy a actualizar");
        this.idd = this.localPrueba.empid;
        this.pruebaservices.updateEmpresa(this.userform.value,this.idd)
        .subscribe((data: any) =>{
         //this.buscarArea2();
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
          localStorage.setItem('Idempres',JSON.stringify(data.empid));
          console.log("ide",data.empid);
          
          
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})        
        }))
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/listarPrueba"]);
      
    } 
  }

  onSubmit2(){
    this.localIDEmp2 =JSON.parse(localStorage.getItem('Idempres'));
    this.localIDEmp =JSON.parse(localStorage.getItem('Idempres'));
    if(this.userformArea.valid){
        console.log("voy a crear");
        console.log("localId2",this.localIDEmp2);
        
        this.userformArea.value.areempresa = this.localIDEmp2;
        this.pruebaservices.createArea(this.userformArea.value)
        .subscribe((data=>{
          console.log(data);
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
          this.userformArea.reset();
          this.indexData();
          
        }))
      
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/listarPrueba"]);
      
    } 
  }

  

  async buscarArea(){
    this.area =[];
    if (this.localPrueba !== null) {
     await this.pruebaservices.buscarByArea(this.localPrueba.empid).toPromise().then((data:any)=>{
        console.log("buscar editar",data);
        this.area = data;
        for (let i = 0; i < this.area.length; i++) {  
          this.values2.push(this.area[i].arenombre);
        }
      });
      this.userform.patchValue({
        emparea: this.values2
      });
    }
  }

  deletePrueba(prueba: Area) {

    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este elemento?',
      header:'confirmacion',
      icon:'pi pi-exclamation-triangle',
      accept:() => {
        this.pruebaservices.deleteArea(prueba)
        .toPromise().then(data => {
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento eliminado', life: 3000})
          this.indexData();
        });
      }
    });
  }
  editArea(){
    localStorage.setItem('Idempres',JSON.stringify(this.localPrueba.empid));
  }

  editPrueba(cpruebas:Area){
    localStorage.setItem('prueba',JSON.stringify(cpruebas));
  }

  newcPrueba(){
    localStorage.removeItem('prueba');
  }

  SalirPrueba(){
    localStorage.removeItem('prueba');
    localStorage.removeItem('pruebaArea');
    localStorage.removeItem('Idempres');
  }

  indexData(){
    this.pruebaservices
    .buscarByArea(this.localIDEmp).subscribe((data: any)=>{
      this.pruebas = [...data];
      console.log('los datos son: ',this.pruebas);
    })
  }


}
