import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup,FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
/*Modulos */
import { MessageService, SelectItem } from 'primeng/api';
/*Modelos */
import { Empresa } from '../../models/empresa.model';
import { Empleado } from '../../models/empleado.mdel';
import { Area } from '../../models/area.model';
/*Servicios */
import { EmpresaService } from 'src/app/services/empresa.service';
import { AreasService } from 'src/app/services/areas.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FormatoAService } from 'src/app/services/formato-a.service';
import { FormatoBService } from 'src/app/services/formato-b.service';
import { FormatoEstresService } from 'src/app/services/formato-estres.service';
import { FormatoExtraService } from 'src/app/services/formato-extra.service';


@Component({
  selector: 'app-form-prueba',
  templateUrl: './form-empleados.component.html',
  styleUrls: ['./form-empleados.component.css']
})
export class FormEmpleadosComponent implements OnInit {
  estado:SelectItem[];
  sexo: SelectItem[];
  civil: SelectItem[];
  estudio: SelectItem[];
  estrato: SelectItem[];
  tipovivi: SelectItem[];
  cargo: SelectItem[];
  tContrato: SelectItem[];
  tsalario: SelectItem[];
  empresa: SelectItem[] = [];
  empresas: Empresa[] = [];
  area: SelectItem[] = [];
  areas: Area[] = [];
  localEmpleados: Empleado = {};
  userform: FormGroup;
  userformFormaA: FormGroup;
  userformFormaB: FormGroup;
  userformExtra: FormGroup;
  userformEstres: FormGroup;
  tempEmpresa:Empresa = {};
  es: any = {
    firstDayOfWeek: 0,
    dayNames: ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"],
    dayNamesShort: ["Dom", "Lun", "Mart", "Mie", "Jue", "Vie", "Sab"],
    dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    monthNamesShort: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    today: "Hoy",
    clear: "Limpiar",
    dateFormat: "yy-mm-dd",
    weekHeader: "Wk",
  };
  id: number;
  idd: any;
  idem:string = "10";
  nombre:any;
  nummax:number = 0;
  nummaxpre:number = 0;
  bandera:boolean=false;
  idEmpresa:number;
  validSave:boolean = false;
  constructor(
              private empresaServices: EmpresaService,
              private formatoAService: FormatoAService,
              private formatoBService: FormatoBService,
              private empleadosService: EmpleadosService,
              private formatoEstresService: FormatoEstresService,
              private formatoExtraService: FormatoExtraService,
              private areasServices: AreasService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private _messageService: MessageService,
              private datepipe: DatePipe) { 
    this.id = Number(this.route.snapshot.paramMap.get("id"));  
    this.nombre = sessionStorage.getItem("user");
    this.idEmpresa = Number(sessionStorage.getItem('idEmpresa'));
  }

  async ngOnInit() {
   
    /*Formulario información principal del empleado*/
    this.form1User();
    /*Formulario Forma A */
    this.formFormaA();
    /*Formulario Forma B */
    this.formFormaB();
    /*Formulario Extra */
    this.formExtra();
    /*Formulario Estres */
    this.formEstres();

    this.localEmpleados =JSON.parse(sessionStorage.getItem('empEdit'));
 
    /*Consultar empresas */
    await this.consultarEmpresas();
    /*Carga los seleccionables */
    this.cargaSelect();

   
     if(this.localEmpleados !==null){
      
      this.userform.patchValue({
        /* emdid:this.localEmpleados.emdid, */
        emdcedula:this.localEmpleados.emdcedula,
        emdnombres:this.localEmpleados.emdnombres,
        emdapellidos:this.localEmpleados.emdapellidos,
        emdsexo:this.localEmpleados.emdsexo,
        emdfecnacido:this.localEmpleados.emdfecnacido,
        emdestcivil:this.localEmpleados.emdestcivil,
        emdnivelestudio:this.localEmpleados.emdnivelestudio,
        emdprofesion:this.localEmpleados.emdprofesion,
        emddepartamento:this.localEmpleados.emddepartamento,
        emdciudad:this.localEmpleados.emdciudad,
        emddireccion:this.localEmpleados.emddireccion,
        emdtelefono:this.localEmpleados.emdtelefono,
        emdemail:this.localEmpleados.emdemail,
        emdestracto:this.localEmpleados.emdestracto,
        emdtipovivienda:this.localEmpleados.emdtipovivienda,
        emdpersdepen:this.localEmpleados.emdpersdepen,
        emdempresa:this.localEmpleados.emdempresa,
        emdtiempolab:this.localEmpleados.emdtiempolab,
        emdcargo:this.localEmpleados.emdcargo,
        emdtipodecargo:this.localEmpleados.emdtipodecargo,
        emdtiemcargo:this.localEmpleados.emdtiemcargo,
        emdtipocontrato:this.localEmpleados.emdtipocontrato,
        emdhorasdia:this.localEmpleados.emdhorasdia,
        emdtiposalario:this.localEmpleados.emdtiposalario,
        emdusuarioreg:this.localEmpleados.emdusuarioreg,
        emdipreg:this.localEmpleados.emdipreg,
        emdactivo:this.localEmpleados.emdactivo,
        emdzona:this.localEmpleados.emdzona,
        emdtraciudad:this.localEmpleados.emdtraciudad,
        emdtradepartamento: this.localEmpleados.emdtradepartamento
      });
    }else{
      this.tempEmpresa = this.empresas.find(element => element.empid === this.idEmpresa);
      this.userform.patchValue({
        emdempresa: this.idEmpresa,
        emdtraciudad: this.tempEmpresa.empdepartamento,
        emdtradepartamento: this.tempEmpresa.empdepartamento
      });
    } 
  


  }

 /*Apartado Validaciones */
  /* --------------------------------------------SECCION 1 --------------------------------- */
  get emdCedula() {
    return this.userform.get('emdcedula').invalid && this.userform.get('emdcedula').touched
  }
  get emdCedulaMarca(){
    return this.userform.get('emdcedula').invalid
  }
  get emdNombres() {
    return this.userform.get('emdnombres').invalid && this.userform.get('emdnombres').touched
  }
  get emdNombresMarca(){
    return this.userform.get('emdnombres').invalid
  }
  get emdApellidos() {
    return this.userform.get('emdapellidos').invalid && this.userform.get('emdapellidos').touched
  }
  get emdApellidosMarca(){
    return this.userform.get('emdapellidos').invalid
  }
  get emdSexo() {
    return this.userform.get('emdsexo').invalid && this.userform.get('emdsexo').touched
  }
  get emdSexoMarca(){
    return this.userform.get('emdsexo').untouched && this.userform.get('emdsexo').invalid
  }
  get emdFecnacido() {
    return this.userform.get('emdfecnacido').invalid && this.userform.get('emdfecnacido').touched
  }
  get emdFecnacidoMarca(){
    return this.userform.get('emdfecnacido').untouched && this.userform.get('emdfecnacido').invalid
  }
  get emdEstcivil() {
    return this.userform.get('emdestcivil').invalid && this.userform.get('emdestcivil').touched
  }
  get emdEstcivilMarca(){
    return this.userform.get('emdestcivil').untouched && this.userform.get('emdestcivil').invalid
  }
  get emdNivelestudio() {
    return this.userform.get('emdnivelestudio').invalid && this.userform.get('emdnivelestudio').touched
  }
  get emdNivelestudioMarca(){
    return this.userform.get('emdnivelestudio').untouched && this.userform.get('emdnivelestudio').invalid
  }
  get emdProfesion() {
    return this.userform.get('emdprofesion').invalid && this.userform.get('emdprofesion').touched
  }
  get emdProfesionMarca(){
    return this.userform.get('emdprofesion').invalid
  }
  get seccion1(){
    return this.userform.get('emdcedula').invalid || this.userform.get('emdnombres').invalid || this.userform.get('emdapellidos').invalid 
        || this.userform.get('emdsexo').invalid || this.userform.get('emdfecnacido').invalid || this.userform.get('emdestcivil').invalid 
        || this.userform.get('emdnivelestudio').invalid || this.userform.get('emdprofesion').invalid;
  }
  /* --------------------------------------------SECCION 2 --------------------------------- */
  get emDepartamento() {
    return this.userform.get('emddepartamento').invalid && this.userform.get('emddepartamento').touched
  }
  get emDepartamentoMarca(){
    return this.userform.get('emddepartamento').invalid
  }
  get emdCiudad() {
    return this.userform.get('emdciudad').invalid && this.userform.get('emdciudad').touched
  }
  get emdCiudadMarca(){
    return this.userform.get('emdciudad').invalid
  }
  get emdDireccion() {
    return this.userform.get('emddireccion').invalid && this.userform.get('emddireccion').touched
  }
  get emdDireccionMarca(){
    return this.userform.get('emddireccion').invalid
  }
  get emdTelefono() {
    return this.userform.get('emdtelefono').invalid && this.userform.get('emdtelefono').touched
  }
  get emdTelefonoMarca(){
    return this.userform.get('emdtelefono').invalid
  }
  get emdTelefonomin() {
    return this.userform.get('emdtelefono').hasError('minlength') 
  }
  get emdTelefonomax() {
    return this.userform.get('emdtelefono').hasError('maxlength') 
  }
  get emdEmail() {
    return this.userform.get('emdemail').invalid && this.userform.get('emdemail').touched
  }
  get emdEmailMarca(){
    return this.userform.get('emdemail').invalid
  }
  get emdEstracto() {
    return this.userform.get('emdestracto').invalid && this.userform.get('emdestracto').touched
  }
  get emdEstractoMarca(){
    return this.userform.get('emdestracto').untouched && this.userform.get('emdestracto').invalid
  }
  get emdTipovivienda() {
    return this.userform.get('emdtipovivienda').invalid && this.userform.get('emdtipovivienda').touched
  }
  get emdTipoviviendaMarca(){
    return this.userform.get('emdtipovivienda').untouched && this.userform.get('emdtipovivienda').invalid
  }
  get emdPersdepen() {
    return this.userform.get('emdpersdepen').invalid && this.userform.get('emdpersdepen').touched
  }
  get emdPersdepenMarca(){
    return this.userform.get('emdpersdepen').invalid
  }
  get seccion2(){
    return this.userform.get('emddepartamento').invalid || this.userform.get('emdciudad').invalid || this.userform.get('emddireccion').invalid 
        || this.userform.get('emdtelefono').invalid || this.userform.get('emdemail').invalid || this.userform.get('emdestracto').invalid
        || this.userform.get('emdtipovivienda').invalid || this.userform.get('emdpersdepen').invalid;
  }

  /* --------------------------------------------SECCION 3 --------------------------------- */
  get emdEmpresa() {
    return this.userform.get('emdempresa').invalid && this.userform.get('emdempresa').touched
  }
 
  get emdTiempolab() {
    return this.userform.get('emdtiempolab').invalid && this.userform.get('emdtiempolab').touched
  }
  get emdTiempolabMarca(){
    return this.userform.get('emdtiempolab').invalid
  }
  get emdCargo() {
    return this.userform.get('emdcargo').invalid && this.userform.get('emdcargo').touched
  }
  get emdCargoMarca(){
    return this.userform.get('emdcargo').invalid
  }
  get emdTipodecargo() {
    return this.userform.get('emdtipodecargo').invalid && this.userform.get('emdtipodecargo').touched
  }
  get emdTipodecargoMarca(){
    return this.userform.get('emdtipodecargo').invalid
  }
  get emdTiemcargo() {
    return this.userform.get('emdtiemcargo').invalid && this.userform.get('emdtiemcargo').touched
  }
  get emdTiemcargolabMarca(){
    return this.userform.get('emdtiemcargo').invalid
  }
  get emdArea() {
    return this.userform.get('emdarea').invalid && this.userform.get('emdarea').touched
  }
  get emdAreaMarca(){
    return this.userform.get('emdarea').untouched && this.userform.get('emdarea').invalid
  }
  get emdTipocontrato() {
    return this.userform.get('emdtipocontrato').invalid && this.userform.get('emdtipocontrato').touched
  }
  get emdTipocontratoMarca(){
    return this.userform.get('emdtipocontrato').untouched && this.userform.get('emdtipocontrato').invalid
  }
  get emdHorasdia() {
    return this.userform.get('emdhorasdia').invalid && this.userform.get('emdhorasdia').touched
  }
  get emdHorasdiaMarca(){
    return this.userform.get('emdhorasdia').invalid
  }
  get emdTiposalario() {
    return this.userform.get('emdtiposalario').invalid && this.userform.get('emdtiposalario').touched
  }
  get emdTiposalarioMarca(){
    return this.userform.get('emdtiposalario').untouched && this.userform.get('emdtiposalario').invalid
  }
  get emdUsuarioreg() {
    return this.userform.get('emdusuarioreg').invalid && this.userform.get('emdusuarioreg').touched
  }
  get emdIpreg() {
    return this.userform.get('emdipreg').invalid && this.userform.get('emdipreg').touched
  }
  get emdActivo() {
    return this.userform.get('emdactivo').invalid && this.userform.get('emdactivo').touched
  }

  get emdZona() {
    return this.userform.get('emdzona').invalid && this.userform.get('emdzona').touched
  }
  get emdZonaMarca(){
    return this.userform.get('emdzona').invalid
  }

  get emdTraCiudad() {
    return this.userform.get('emdtraciudad').invalid && this.userform.get('emdtraciudad').touched
  }

  get emdTraCiudadMarca(){
    return this.userform.get('emdtraciudad').invalid
  }
  get emdTraDepartamento() {
    return this.userform.get('emdtradepartamento').invalid && this.userform.get('emdtradepartamento').touched
  }
  get emdTraDepartamentoMarca(){
    return this.userform.get('emdtradepartamento').invalid
  }

  get seccion3(){
    return this.userform.get('emdempresa').invalid || this.userform.get('emdtiempolab').invalid || this.userform.get('emdcargo').invalid
        || this.userform.get('emdtipodecargo').invalid || this.userform.get('emdtiemcargo').invalid || this.userform.get('emdarea').invalid
        || this.userform.get('emdtipocontrato').invalid || this.userform.get('emdhorasdia').invalid || this.userform.get('emdtiposalario').invalid
        || this.userform.get('emdzona').invalid || this.userform.get('emdtraciudad').invalid || this.userform.get('emdtradepartamento').invalid
  }


 onSubmit(){
   if(this.userform.valid){
      this.validSave = true;
      
      if(this.localEmpleados !== null){
        /*Edición*/
        let date = this.datepipe.transform(this.userform.value.emdfecnacido,'yyyy-MM-dd');
        this.userform.value.emdfecnacido = date;
        this.idd = this.localEmpleados.emdid;
        this.empleadosService.updatePrueba(this.userform.value,this.idd).subscribe((data: any) =>{
          sessionStorage.setItem('empEdit',JSON.stringify(data));
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'Registro Actualizado', life: 3000})
          this.userform.reset();
          if (Number(data.emdtipodecargo)==1 || Number(data.emdtipodecargo)==2) {
            this.router.navigate(["/main/addFormatoA/editar"]);
          }else{
            this.router.navigate(["/main/addFormatoB/crear"]);
          }
        });

      }else{
        /*Creación*/
        let date = this.datepipe.transform(this.userform.value.emdfecnacido,'yyyy-MM-dd');
        this.userform.value.emdfecnacido = date;
        this.empleadosService.createPrueba(this.userform.value).subscribe( async data=>{
          
          sessionStorage.setItem('IdEmpleado',JSON.stringify(data.emdid));
          sessionStorage.setItem('empEdit',JSON.stringify(data));
          this.userformExtra.value.extidempleado = data.emdid;
          this.userformEstres.value.estidempleado = data.emdid;
          if (Number(data.emdtipodecargo)==1 || Number(data.emdtipodecargo)==2) {
            this.userformFormaA.value.inaidempleado = data.emdid;
            this.userformFormaA.value.inaatencionausuarios = 2;
            this.userformFormaA.value.inasoyjefe = 2;
            await this.formatoAService.buscarByFa(data.emdid).toPromise().then((data:any)=>{
              if (data.length  === 0) {
                this.formatoAService.createFormatoA(this.userformFormaA.value).subscribe((data:any)=>{});
              }else{
                this._messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ya se cuenta con un registro creado para Intralaboral A', life: 5000 });
              }
            });
            
          }else{
            this.userformFormaB.value.inbidempleado = data.emdid;
            this.userformFormaB.value.inbatencionausuarios = 2;
            await  this.formatoBService.buscarByFb(data.emdid).toPromise().then((data:any)=>{
              if (data.length  === 0) {
                this.formatoBService.createFormatoB(this.userformFormaB.value).subscribe((data:any)=>{});
              }else{
                this._messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ya se cuenta con un registro creado para Intralaboral B', life: 5000 });
              }
            })
            
          }

          await this.formatoExtraService.buscarExtra(data.emdid).toPromise().then((data:any)=>{
            if (data.length  === 0) {
              this.formatoExtraService.createExtra(this.userformExtra.value).subscribe((data:any)=>{});
            }else{
              this._messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ya se cuenta con un registro creado para Extralaboral', life: 5000 });
            }
          });

          await  this.formatoEstresService.buscarByEstres(data.emdid).toPromise().then((data:any)=>{
            if (data.length  === 0) {
              this.formatoEstresService.createEstres(this.userformEstres.value).subscribe((data:any)=>{});
            }else{
              this._messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Ya se cuenta con un registro creado para Formulario Estres', life: 5000 });
            }
          });
          
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'Registro creado', life: 3000})
          this.userform.reset();
          if (Number(data.emdtipodecargo)==1 || Number(data.emdtipodecargo)==2) {

            setTimeout(() => {
              this.router.navigate(["/main/addFormatoA/crear"]);
            }, 1000);
          }else{
            setTimeout(() => {
              this.router.navigate(["/main/addFormatoB/crear"]);
            }, 1000);
           
          }
          
          
        })
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/addFormatoA/crear"]);
      
    }
  }

  async buscarArea(id:number){
 
    this.area =[];
    if (this.localEmpleados !== null) {
      if (id !== null) {
        await this.areasServices.buscarByArea(id).toPromise().then((data:any)=>{
          this.areas = data;
          this.areas.map(x=>{    
            this.area.push({
              label:x.arenombre,
              value: x.areid
            });
          });
        });
        this.userform.patchValue({
          emdarea: this.localEmpleados.emdarea
        });
      }
    }else{
      this.empresas.map(res => {
        if (res.empid === this.userform.value.emdempresa) {
          this.userform.patchValue({
            emdtraciudad:res.empciudad,
            emdtradepartamento: res.empdepartamento
          });
        }
      });
      if (id !== null) {
        await this.areasServices.buscarByArea(id).toPromise().then((data:any)=>{
          this.areas = data;
          this.areas.map(x=>{
            this.area.push({
              label:x.arenombre,
              value: x.areid
            });
          });
  
          if (this.areas.length === 1) {
            this.userform.patchValue({
              emdarea:this.areas[0].areid
            });
          }
        });
      }
      
    }


  }

  async consultarEmpresas(){

    await this.empresaServices.getEmpresa().toPromise().then((data:any)=>{

      this.empresas = data;

      this.empresas.map(x=>{
        this.empresa.push({
          label:x.empnombre,
          value: x.empid
        }); 
      });
    });
  }

  numeromax(){
    if(this.localEmpleados !==null){
      this.nummaxpre = Number(this.localEmpleados.emdtiempolab);
      this.nummax = this.userform.value.emdtiempolab;
      
    }else{
      this.nummax = this.userform.value.emdtiempolab;
     
    }
  }

  validaciontiempos(){

      if (this.userform.value.emdtiemcargo > this.userform.value.emdtiempolab) {
        this.bandera = true;
      }else{
        this.bandera = false;
      }
  
  }

  /*Formulario 1  datos principales */
  form1User(){
    this.userform = this.fb.group({
      emdid:[''],
      emdcedula: ['', Validators.required],
      emdnombres: ['', Validators.required],
      emdapellidos: ['', Validators.required],
      emdsexo: ['', Validators.required],
      emdfecnacido: ['', Validators.required],
      emdestcivil: ['', Validators.required],
      emdnivelestudio: ['', Validators.required],
      emdprofesion: ['', Validators.required],
      emddepartamento: ['', Validators.required],
      emdciudad: ['', Validators.required],
      emddireccion: ['', Validators.required],
      emdtelefono: ['',  [Validators.required, Validators.minLength(7),Validators.maxLength(10)]],
      emdemail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      emdestracto: ['', Validators.required],
      emdtipovivienda: ['', Validators.required],
      emdpersdepen: ['', [Validators.required,Validators.pattern('^[0-9]+')]],
      emdempresa: ['', Validators.required],
      emdtiempolab: ['',  Validators.required],
      emdcargo: ['', Validators.required],
      emdtipodecargo: ['', Validators.required],
      emdtiemcargo: ['', Validators.required],
      emdarea: ['', Validators.required],
      emdtipocontrato: ['', Validators.required],
      emdhorasdia:['', [Validators.required,Validators.pattern('^[0-9]+')]],
      emdtiposalario: ['', Validators.required],
      emdusuarioreg: [this.nombre],
      emdipreg: ['127.0.0.1'],
      emdactivo:['P'],
      emdzona:['',Validators.required],
      emdtraciudad:['',Validators.required],
      emdtradepartamento:['',Validators.required]
    });
  }
  /*Formulario Formato A */
  formFormaA(){
    this.userformFormaA = this.fb.group({
      inaid: [''],
      inaidempleado: [''],
      inaruido: [''],
      inafrio: [''],
      inacalor: [''],
      inaairefresco: [''],
      inaluz: [''],
      inacomodo: [''],
      inasustanquimicas: [''],
      inaesfuerzofisico: [''],
      inaequiposcomodos: [''],
      inaanimalesplantas: [''],
      inapreoaccidente: [''],
      inalugarlimpio: [''],
      inatiempoadicional: [''],
      inaalcanzatiempo: [''],
      inatrabajasinparar: [''],
      inaesfuerzomental: [''],
      inaexigeconcentrado: [''],
      inaexigememoria: [''],
       inadesiciondificiles: [''],
      inaexigeasuntos: [''],
      inapqnosdetalles: [''],
      inaresponcosasvalor: [''],
      inarespondinero: [''],
      inareponderotros: [''],
      inaresponarea: [''],
      inareponsalud: [''],
      inaordecontradic: [''],
      inahacerinnecesaria: [''],
      inapasarnormas: [''],
      inamaspracticas: [''],
      inatrabajodenoche: [''],
      inapausas: [''],
      inatrabajodiadesca: [''],
      inafinsemdesc:[''],
      inaencasapiensotra: [''],
      inadiscutofamilia: [''],
      inaasuntosencasa: [''],
      inapocotiempofami: [''],
      inapermitehabilidad: [''],
      inapermiteconocimi: [''],
      inapermiteaprender: [''],
      inamiscapacidades: [''],
      inapausasnecesito: [''],
      inatrabajodiario: [''],
      inadecivelocidad: [''],
      inacambiarordenact: [''],
      inaatenderasunpers: [''], 

      inacambiosbeneficio: [''],
      inaexplicancambios: [''],
      inapuedodarsugeren: [''],
      inaencuentamisideas: [''],
      inacambiosdificultan: [''],
      inaclaridadfunciones: [''],
      inadecisionesatomar: [''],
      inaresultadoslograr: [''],
      inaefectoenempresa: [''],
      inaexplicanobjetivos: [''],
      inaorientaciontraba: [''],
      inaresolverasuntos: [''],
      inaasiscapacitacion: [''],
      inarecibocapacitaci: [''],
      inarecibocapaciayuda: [''],
      inajefeintrucciones: [''],
      inajefeayudaorganiz: [''],
      inajefemispuntosvist: [''],
      inajefeanima: [''],
      inajefedistribuye: [''],
      inajefecomunica: [''],
      inajefeorienracion: [''],
      inajefeayudaprogres: [''],
      inajefeayudasentime: [''],
      inajefesolucionar: [''],
      inajefeconfio: [''],
      inajefeescucha: [''],
      inajefeapoyo: [''],
      inaagradaambiente: [''],
      inagruporespeto: [''],
      inaconfiocompaneros: [''],
      inaagustocompaneros: [''],
      inagrupomaltrata: [''],
      inasolucionacompa: [''],
      inaintegraciongrp: [''],
      inagrupounido: [''],
      inasentirpartegrupo: [''],
      inatrabajogrupo: [''],
      inagrupodeacuerdo: [''],
      inagrupoayuda: [''],
      inaapoyounootros: [''],
      inaescuchanproble: [''],
      inainfhagobien: [''],
      inainfmejorar: [''],
      inainfrendimiento: [''],
      inaevaluantrabajo: [''],
      inainfatiempomejora: [''],
      inaempconfiantrab: [''],
      inaemppaganatiempo: [''],
      inapagoofrecido: [''],
      inapagomerezco: [''],
      inaposibprogresar: [''],
      inahacerbienprog: [''],
      inaempbienestartrab: [''],
      inatrabajoestable: [''],
      inatrabsentirbien: [''],
      inasientoorgullo: [''],
      inahablobienempres: [''],

      inaatencionausuarios : [''],
      inausuenojados: [''],
      inausupreocupados: [''],
      inausutristes: [''],
      inausuenfermos: [''],
      inausuneceayuda: [''],
      inausumemaltratan: [''],
      inaususentimidistin: [''],
      inasituaviolencia: [''],
      inaexigedolorosas: [''],
      inasoyjefe : [''],
      inacomuntarde: [''],
      inairrespetuosos: [''],
      inadificorganiza: [''],
      inaguardansilencio: [''],
      inadificlogro: [''],
      inainforirrespet: [''],
      inapocacooperacio: [''],
      inapocodesempeno: [''],
      inacolabignoran: ['']

    });
  }
  /*Formulario Formato B */
  formFormaB(){
    this.userformFormaB = this.fb.group({
      inbid: [''],
      inbidempleado: [''],
      inbruido :[''],
      inbfrio :[''],
      inbcalor :[''],
      inbairefresco :[''],
      inbluz :[''],
      inbcomodo :[''],
      inbsustanquimicas :[''],
      inbesfuerzofisico :[''],
      inbequiposcomodos :[''],
      inbanimalesplantas :[''],
      inbpreoaccidente :[''],
      inblugarlimpio :[''],
      inbtiempoadicional :[''],
      inbalcanzatiempo :[''],
      inbtrabajasinparar :[''],
      inbesfuerzomental :[''],
      inbexigeconcentrado :[''],
      inbexigememoria :[''],
      inbhacercalculos :[''],
      inbpqnosdetalles :[''],
      inbtrabajonoche :[''],
      inbtomarpausas :[''],
      inbtrabajodiadesca :[''],
      inbfinsemdesc :[''],
      inbencasapiensotra :[''],
      inbdiscutofamilia :[''],
      inbasuntosencasa :[''],
      inbpocotiempofami :[''],
      inbhacercosasnuevas :[''],
      inbpermitehabilidad :[''],
      inbpermiteconocimi :[''],
      inbpermiteaprender :[''],
      inbpausasnecesito :[''],
      inbtrabajodiario :[''],
      inbdecivelocidad :[''],
      inbcambiarordenact :[''],
      inbatenderasunpers :[''],
      inbexplicancambios :[''],
      inbpuedodarsugeren :[''],
      inbencuentamisideas :[''],
      inbclaridadfunciones :[''],
      inbdecisionesatomar :[''],
      inbresultadoslograr :[''],
      inbexplicanobjetivos :[''],
      inbinfquienresolver :[''],
      inbasiscapacitacion :[''],
      inbrecibocapacitaci :[''],
      inbrecibocapaciayuda :[''],
      inbjefeayudaorganiz :[''],
      inbjefemispuntosvist :[''],
      inbjefeanima :[''],
      inbjefedistribuye :[''],
      inbjefecomunica :[''],
      inbjefeorienracion :[''],
      inbjefeayudaprogres :[''],
      inbjefeayudasentime :[''],
      inbjefesolucionar :[''],
      inbjeferespeto :[''],
      inbjefeconfio :[''],
      inbjefeescucha :[''],
      inbjefeapoyo :[''],
      inbagradaambiente :[''],
      inbgruporespeto :[''],
      inbconfiocompaneros :[''],
      inbagustocompaneros :[''],
      inbgrupomaltrata :[''],
      inbsolucionacompa :[''],
      inbgrupounido :[''],
      inbtrabajogrupo :[''],
      inbgrupodeacuerdo :[''],
      inbgrupoayuda :[''],
      inbapoyounootros :[''],
      inbescuchanproble :[''],
      inbinfhagobien :[''],
      inbinfmejorar :[''],
      inbinfrendimiento :[''],
      inbevaluantrabajo :[''],
      inbinfatiempomejora :[''],
      inbemppaganatiempo :[''],
      inbpagoofrecido :[''],
      inbpagomerezco :[''],
      inbposibprogresar :[''],
      inbhacerbienprog :[''],
      inbempbienestartrab :[''],
      inbtrabajoestable :[''],
      inbtrabsentirbien :[''],
      inbsientoorgullo :[''],
      inbhablobienempres :[''],

      inbatencionausuarios :[''],
      inbusuenojados :[''],
      inbusupreocupados :[''],
      inbusutristes :[''],
      inbusuenfermos :[''],
      inbusuneceayuda :[''],
      inbusumemaltratan :[''],
      inbsituaviolencia :[''],
      inbexigedolorosas :[''],
      inbexpretristeza :[''] 

    });
  }
  /*Formulario Extra */
  formExtra(){
    this.userformExtra = this.fb.group({
      extid:[''],
      extidempleado:[''],
      extfaciltransporte:[''],
      extvariostransporte:[''],
      extmuchotiemviaje:[''],
      exttranscomodo:[''],
      extzonasegura:[''],
      extzonadelincuencia:[''],
      extfacilcmedico:[''],
      extbuenasvias:[''],
      extcercatransporte:[''],
      extcondicvivienda:[''],
      extagualuz:[''],
      extpermdescanzar:[''],
      extviviendacomoda:[''],
      exttiemporecreo:[''],
      exttiempodescanzo:[''],
      exttiempopersonal:[''],
      exttiempofamilia:[''],
      extbuenacomunica:[''],
      extrelacionamigos:[''],
      extconversoperson:[''],
      extamigosescuchan:[''],
      extapoyofamiliar:[''],
      exthabloconperso:[''],
      extproblemfamiliar:[''],
      extrelacionfamiliar:[''],
      extquitanenergia:[''],
      extresolveamistosa:[''],
      extafectrelacionestra:[''],
      extdineroalcanza:[''],
      extpresupuesfamilia:[''],
      extdeudashogar:[''],
      extfechareg:[''],
      extfechamod:[''],
      extusuarioreg:[''] 

    });
  }
  /*Formulario Estres*/
  formEstres(){
    this.userformEstres = this.fb.group({
      estid:[''],
      estidempleado:[''],
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
      estusuarioreg:['']

    });
  }

  cargaSelect(){

    this.estado = [];
    this.estado.push({ label: 'Estado', value: '' });
    this.estado.push({ label: 'Activo', value: '1' });
    this.estado.push({ label: 'Inactivo', value: '0' });
    this.estado.push({ label: 'Pendiente', value: 'P' });

    this.sexo = [];
    this.sexo.push({ label: 'Masculino', value: 'M' });
    this.sexo.push({ label: 'Femenino', value: 'F' });

    this.civil = [];
    this.civil.push({ label: 'Soltero(a)', value: '1' });
    this.civil.push({ label: 'Casado(a)', value: '2' });
    this.civil.push({ label: 'Union libre', value: '3' });
    this.civil.push({ label: 'Separado(a)', value: '4' });
    this.civil.push({ label: 'Divorciado(a)', value: '5' });
    this.civil.push({ label: 'Viudo(a)', value: '6' });
    this.civil.push({ label: 'Sacerdote/Monja', value:' 7' });

    this.estudio = [];
    this.estudio.push({ label: 'Ninguno', value: '1' });
    this.estudio.push({ label: 'Primaria incompleta', value: '2' });
    this.estudio.push({ label: 'Primaria completa', value: '3' });
    this.estudio.push({ label: 'Bachillerato incompleto', value: '4' });
    this.estudio.push({ label: 'Bachillerato completo', value: '5' });
    this.estudio.push({ label: 'Tecnico - tecnologo incompleto', value: '6' });
    this.estudio.push({ label: 'Tecnico - tecnologo completo', value:'7' });
    this.estudio.push({ label: 'Profesional incompleto', value:'8' });
    this.estudio.push({ label: 'Profesional completo', value:'9' });
    this.estudio.push({ label: 'Carrera militar / policia', value:'10' });
    this.estudio.push({ label: 'Post-grado incompleto', value:'11' });
    this.estudio.push({ label: 'Post-grado completo', value:'12' });

    this.estrato = [];
    this.estrato.push({ label: '1', value: '1' });
    this.estrato.push({ label: '2', value: '2' });
    this.estrato.push({ label: '3', value: '3' });
    this.estrato.push({ label: '4', value: '4' });
    this.estrato.push({ label: '5', value: '5' });
    this.estrato.push({ label: '6', value: '6' });
    this.estrato.push({ label: 'Finca', value:'7' });
    this.estrato.push({ label: 'No se', value:'8' });

    this.tipovivi = [];
    this.tipovivi.push({ label: 'Propia', value: '1' });
    this.tipovivi.push({ label: 'En arriendo', value: '2' });
    this.tipovivi.push({ label: 'Familiar', value: '3' });

    this.cargo = [];
    this.cargo.push({ label: 'Jefatura - tiene personal a cargo', value: '1' });
    this.cargo.push({ label: 'Manejo de dinero - Información confidencial - Salud y seguridad de otras personas', value: '2' });
    this.cargo.push({ label: 'Auxiliar - asistente administrativo - asistente técnico', value: '3' });
    this.cargo.push({ label: 'Operario, operador, ayudante, servicios generales', value: '4' });
 
    this.tContrato = [];
    this.tContrato.push({ label: 'Temporal de menos de 1 año', value: '1' });
    this.tContrato.push({ label: 'Temporal de 1 año o mas', value: '2' });
    this.tContrato.push({ label: 'Termino indefinido', value: '3' });
    this.tContrato.push({ label: 'Cooperado (cooperativa)', value: '4' });
    this.tContrato.push({ label: 'Prestacion de servicios', value: '5' });
    this.tContrato.push({ label: 'No se', value: '6' });
  
    this.tsalario = [];
    this.tsalario.push({ label: 'Fijo', value: '1' });
    this.tsalario.push({ label: 'Una parte fija y otra variable', value: '2' });
    this.tsalario.push({ label: 'Todo variable', value: '3' });
  }
}
