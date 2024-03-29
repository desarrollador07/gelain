import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
/*Modulos */
import { MessageService, ConfirmationService, MenuItem, SelectItem } from 'primeng/api';
/*Modelos */
import { Area } from '../../models/area.model';
import { Empresa } from '../../models/empresa.model';
/*Servicios */
import { EmpresaService } from 'src/app/services/empresa.service';
import { AreasService } from 'src/app/services/areas.service';

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
  linkformulario:any;
  linkformulario2:any;
  base_Url:string = environment.localUrl;
  clonedAreas: { [s: string]: Area; } = {};
 
  constructor(
              private empresaServices: EmpresaService,
              private areasServices: AreasService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private _messageService: MessageService,
              private _confirmationServices: ConfirmationService) { 
    this.id = Number(this.route.snapshot.paramMap.get("id"));  
  }

  ngOnInit() {
     
    sessionStorage.removeItem('IdEmpleado');
    this.localIDEmp =JSON.parse(sessionStorage.getItem('Idempres'));
    this.linkformulario = `${this.base_Url}terminos-condiciones/${this.localIDEmp}`;
    this.linkformulario2 = `${this.base_Url}consentimiento-vf/${this.localIDEmp}`;
    
    if(this.localIDEmp !== null){
      this.indexData();
    }
    
    this.items1 = [
      {label: 'Empresas', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Areas', icon: 'fa fa-fw fa-book'},
      {label: 'Empleados', icon: 'fa fa-fw fa-user'},
    ];

    this.localPruebaA =JSON.parse(sessionStorage.getItem('pruebaArea'));
    this.localPrueba =JSON.parse(sessionStorage.getItem('prueba'));

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
    });

    this.userformArea = this.fb.group({
      areid:[''],
      areempresa: [''],
      arenombre: ['', Validators.required],
      arefechaini: [''],
      areactivo: ['1'],
    });

  if(this.localPrueba !==null){
    this.userformArea.patchValue({
      areempresa:this.localPruebaA.areempresa,
      arenombre:this.localPruebaA.arenombre,
      arefechaini:this.localPruebaA.arefechaini,
      areactivo:this.localPruebaA.areactivo,
    });
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
      });
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

        this.idd = this.localPrueba.empid;
        this.empresaServices.updateEmpresa(this.userform.value,this.idd)
        .subscribe((data: any) =>{
         //this.buscarArea2();
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/listarEmpresa"]);
        })
      }else{
        
        this.empresaServices.createEmpresa(this.userform.value)
        .subscribe((data=>{
          sessionStorage.setItem('Idempres',JSON.stringify(data.empid));
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})        
        }));
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/listarPrueba"]);
      
    } 
  }

  onSubmit2(){
    this.localIDEmp2 =JSON.parse(sessionStorage.getItem('Idempres'));
    this.localIDEmp =JSON.parse(sessionStorage.getItem('Idempres'));
    if(this.userformArea.valid){

        this.userformArea.value.areempresa = this.localIDEmp2;
        this.userformArea.value.areactivo = '1';
        
        
        this.areasServices.createArea(this.userformArea.value)
        .subscribe((data=>{
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'Registro Creado', life: 3000})
          this.userformArea.reset();
          this.indexData();
          
        }));
      
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'Surgio un error inesperado', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/listarPrueba"]);
      
    } 
  }

  

  async buscarArea(){
    this.area =[];
    if (this.localPrueba !== null) {
      await this.areasServices.buscarByArea(this.localPrueba.empid).toPromise().then((data:any)=>{
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

  async deletePrueba(objArea: Area) {

    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar esta área?',
      header:'Confirmación',
      icon:'pi pi-exclamation-triangle',
      accept: async () => {
        let arrTemp:any [] = [];
        await this.areasServices.buscarByAreaEmp(objArea.areempresa,objArea.areid).toPromise().then((res:any) => {
          res.map((data:any) => {
            arrTemp.push(data);
          })
        });
        await this.areasServices.buscarByAreaVR(objArea.areempresa,objArea.areid).toPromise().then((res:any) => {
          res.map((data:any) => {
            arrTemp.push(data);
          })
        });
        await this.areasServices.buscarByAreaVF(objArea.areempresa,objArea.areid).toPromise().then((res:any) => {
          res.map((data:any) => {
            arrTemp.push(data);
          })
        });

        if (arrTemp.length > 0) {
          this._messageService.add({severity: 'warn',summary: 'Advertencia',detail: 'El área ha eliminar tiene elementos relacionados, no podra continuar con esta operación.', life: 6000})
        }else{
          this.areasServices.deleteArea(objArea).toPromise().then(data => {
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'Registro Eiminado', life: 3000})
            this.indexData();
          });
        }
        
      }
    });
  }
  editArea(){
    sessionStorage.setItem('Idempres',JSON.stringify(this.localPrueba.empid));
  }

  editPrueba(cpruebas:Area){
    sessionStorage.setItem('prueba',JSON.stringify(cpruebas));
  }

  newcPrueba(){
    sessionStorage.removeItem('prueba');
  }

  SalirPrueba(){
    sessionStorage.removeItem('prueba');
    sessionStorage.removeItem('pruebaArea');
    sessionStorage.removeItem('Idempres');
  }

  indexData(){
    this.areasServices.buscarByArea(this.localIDEmp).subscribe((data: any)=>{
      this.pruebas = data;
    });
  }
  /*Copia links al portapapeles del SO */
  copyToClipBoard(idHtml) {
    var content:any = document.getElementById(idHtml);
    content.select();
    document.execCommand('copy');
    this._messageService.add({severity: 'info',summary: 'Informativo',detail: 'Link Copiado', life: 3000});
  } 

  onRowEditInit(area: Area) {
    this.clonedAreas[area.areid] = {...area};
  }

  async onRowEditSave(area: Area) {
      if (area.arenombre.length > 0) {
        await this.areasServices.editArea(area,area.areid).toPromise().then(res => {
          if (res) {
            delete this.clonedAreas[area.areid];
            this._messageService.add({severity:'success', summary: 'Exitoso', detail:'Área actualizada'});
          }else{
            this._messageService.add({severity:'error', summary: 'Fallo', detail:'Surgio un error inesperado al actualizar el área'});
          }
        },err => {
          console.log(err);
          this._messageService.add({severity:'error', summary: 'Fallo', detail:'Surgio un error inesperado al actualizar el área'});
        })

      }else {
          this._messageService.add({severity:'error', summary: 'Error', detail:'El nombre del área es requerida'});
      }
  }

  onRowEditCancel(area: Area, index: number) {
      this.pruebas[index] = this.clonedAreas[area.areid];
      delete this.clonedAreas[area.areid];
  }

}
