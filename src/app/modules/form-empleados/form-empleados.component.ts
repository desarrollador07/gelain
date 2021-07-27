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
  localPrueba: Empleado = {};
/*   localArea: Area = {}; */
  userform: FormGroup;
  es: any;
  id: number;
  idd: any;
  idem:string = "10";
  nombre:any;
nummax:number = 0;
nummaxpre:number = 0;
bandera:boolean=false;
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService,private datepipe: DatePipe) { 
    this.id = Number(this.route.snapshot.paramMap.get("id"));  
    this.nombre = localStorage.getItem("user");
    
  }

  async ngOnInit() {
   
    this.calendarEspañol();
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
    });


    this.localPrueba =JSON.parse(localStorage.getItem('prueba'));
    console.log('f',this.localPrueba);

/*     this.localArea =JSON.parse(localStorage.getItem('Areas'));
    console.log('Are',this.localArea); */

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


    this.estado = [];
    this.estado.push({ label: 'Estado', value: '' });
    this.estado.push({ label: 'Activo', value: '1' });
    this.estado.push({ label: 'Inactivo', value: '0' });



    this.sexo = [];
    this.sexo.push({ label: 'Sexo', value: ''});
    this.sexo.push({ label: 'Masculino', value: 'M' });
    this.sexo.push({ label: 'Femenino', value: 'F' });

    this.civil = [];
    this.civil.push({ label: 'Estado Civil', value: '' });
    this.civil.push({ label: 'Soltero(a)', value: '1' });
    this.civil.push({ label: 'Casado(a)', value: '2' });
    this.civil.push({ label: 'Union libre', value: '3' });
    this.civil.push({ label: 'Separado(a)', value: '4' });
    this.civil.push({ label: 'Divorciado(a)', value: '5' });
    this.civil.push({ label: 'Viudo(a)', value: '6' });
    this.civil.push({ label: 'Sacerdote/Monja', value:' 7' });

    this.estudio = [];
    this.estudio.push({ label: 'Ultimos niveles de estudio', value: '' });
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
    this.estrato.push({ label: 'Estrato de su vivienda', value: '' });
    this.estrato.push({ label: '1', value: '1' });
    this.estrato.push({ label: '2', value: '2' });
    this.estrato.push({ label: '3', value: '3' });
    this.estrato.push({ label: '4', value: '4' });
    this.estrato.push({ label: '5', value: '5' });
    this.estrato.push({ label: '6', value: '6' });
    this.estrato.push({ label: 'Finca', value:'7' });
    this.estrato.push({ label: 'No se', value:'8' });

    this.tipovivi = [];
    this.tipovivi.push({ label: 'Tipo de Vivienda', value: '' });
    this.tipovivi.push({ label: 'Propia', value: '1' });
    this.tipovivi.push({ label: 'En arriendo', value: '2' });
    this.tipovivi.push({ label: 'Familiar', value: '3' });

    this.cargo = [];
    this.cargo.push({ label: 'Tipo de Cargo', value: '' });
    this.cargo.push({ label: 'Jefatura - tiene personal a cargo', value: '1' });
    this.cargo.push({ label: 'Profesional - analista - técnico - tecnólogo - Manejo de dinero - Información confidencial - Salud y seguridad de otras personas', value: '2' });
    this.cargo.push({ label: 'Auxiliar - asistente administrativo - asistente técnico', value: '3' });
    this.cargo.push({ label: 'Operario, operador, ayudante, servicios generales', value: '4' });

    this.tContrato = [];
    this.tContrato.push({ label: 'Tipo de Contrato', value: '' });
    this.tContrato.push({ label: 'Temporal de menos de 1 año', value: '1' });
    this.tContrato.push({ label: 'Temporal de 1 año o mas', value: '2' });
    this.tContrato.push({ label: 'Termino indefinido', value: '3' });
    this.tContrato.push({ label: 'Cooperado (cooperativa)', value: '4' });
    this.tContrato.push({ label: 'Prestacion de servicios', value: '5' });
    this.tContrato.push({ label: 'No se', value: '6' });

    this.tsalario = [];
    this.tsalario.push({ label: 'Tipo de salario', value: '' });
    this.tsalario.push({ label: 'Fijo', value: '1' });
    this.tsalario.push({ label: 'Una parte fija y otra variable', value: '2' });
    this.tsalario.push({ label: 'Todo variable', value: '3' });



     if(this.localPrueba !==null){
      
      this.userform.patchValue({
        /* emdid:this.localPrueba.emdid, */
        emdcedula:this.localPrueba.emdcedula,
        emdnombres:this.localPrueba.emdnombres,
        emdapellidos:this.localPrueba.emdapellidos,
        emdsexo:this.localPrueba.emdsexo,
        emdfecnacido:this.localPrueba.emdfecnacido,
        emdestcivil:this.localPrueba.emdestcivil,
        emdnivelestudio:this.localPrueba.emdnivelestudio,
        emdprofesion:this.localPrueba.emdprofesion,
        emddepartamento:this.localPrueba.emddepartamento,
        emdciudad:this.localPrueba.emdciudad,
        emddireccion:this.localPrueba.emddireccion,
        emdtelefono:this.localPrueba.emdtelefono,
        emdemail:this.localPrueba.emdemail,
        emdestracto:this.localPrueba.emdestracto,
        emdtipovivienda:this.localPrueba.emdtipovivienda,
        emdpersdepen:this.localPrueba.emdpersdepen,
        emdempresa:this.localPrueba.emdempresa,
        emdtiempolab:this.localPrueba.emdtiempolab,
        emdcargo:this.localPrueba.emdcargo,
        emdtipodecargo:this.localPrueba.emdtipodecargo,
        emdtiemcargo:this.localPrueba.emdtiemcargo,
        emdtipocontrato:this.localPrueba.emdtipocontrato,
        emdhorasdia:this.localPrueba.emdhorasdia,
        emdtiposalario:this.localPrueba.emdtiposalario,
        emdusuarioreg:this.localPrueba.emdusuarioreg,
        emdipreg:this.localPrueba.emdipreg,
        emdactivo:this.localPrueba.emdactivo,
      })
    } 
  


  }


  get emdCedula() {
    return this.userform.get('emdcedula').invalid && this.userform.get('emdcedula').touched
  }

  get emdNombres() {
    return this.userform.get('emdnombres').invalid && this.userform.get('emdnombres').touched
  }
  get emdApellidos() {
    return this.userform.get('emdapellidos').invalid && this.userform.get('emdapellidos').touched
  }
  get emdSexo() {
    return this.userform.get('emdsexo').invalid && this.userform.get('emdsexo').touched
  }
  get emdFecnacido() {
    return this.userform.get('emdfecnacido').invalid && this.userform.get('emdfecnacido').touched
  }
  get emdEstcivil() {
    return this.userform.get('emdestcivil').invalid && this.userform.get('emdestcivil').touched
  }
  get emdNivelestudio() {
    return this.userform.get('emdnivelestudio').invalid && this.userform.get('emdnivelestudio').touched
  }
  get emdProfesion() {
    return this.userform.get('emdprofesion').invalid && this.userform.get('emdprofesion').touched
  }
  get emDepartamento() {
    return this.userform.get('emddepartamento').invalid && this.userform.get('emddepartamento').touched
  }
  get emdCiudad() {
    return this.userform.get('emdciudad').invalid && this.userform.get('emdciudad').touched
  }
  get emdDireccion() {
    return this.userform.get('emddireccion').invalid && this.userform.get('emddireccion').touched
  }
  get emdTelefono() {
    return this.userform.get('emdtelefono').invalid && this.userform.get('emdtelefono').touched
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
  get emdEstracto() {
    return this.userform.get('emdestracto').invalid && this.userform.get('emdestracto').touched
  }
  get emdTipovivienda() {
    return this.userform.get('emdtipovivienda').invalid && this.userform.get('emdtipovivienda').touched
  }
  get emdPersdepen() {
    return this.userform.get('emdpersdepen').invalid && this.userform.get('emdpersdepen').touched
  }
  get emdEmpresa() {
    return this.userform.get('emdempresa').invalid && this.userform.get('emdempresa').touched
  }
  get emdTiempolab() {
    return this.userform.get('emdtiempolab').invalid && this.userform.get('emdtiempolab').touched
  }
  get emdCargo() {
    return this.userform.get('emdcargo').invalid && this.userform.get('emdcargo').touched
  }
  get emdTipodecargo() {
    return this.userform.get('emdtipodecargo').invalid && this.userform.get('emdtipodecargo').touched
  }
  get emdTiemcargo() {
    return this.userform.get('emdtiemcargo').invalid && this.userform.get('emdtiemcargo').touched
  }
  get emdTiemcargomax() {
    return this.userform.get('emdtiemcargo').invalid && this.userform.get('emdtiemcargo').touched
  }
  get emdArea() {
    return this.userform.get('emdarea').invalid && this.userform.get('emdarea').touched
  }
  get emdTipocontrato() {
    return this.userform.get('emdtipocontrato').invalid && this.userform.get('emdtipocontrato').touched
  }
  get emdHorasdia() {
    return this.userform.get('emdhorasdia').invalid && this.userform.get('emdhorasdia').touched
  }
  get emdTiposalario() {
    return this.userform.get('emdtiposalario').invalid && this.userform.get('emdtiposalario').touched
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



 onSubmit(){
    if(this.userform.valid){
      if(this.localPrueba !== null){
        console.log("voy a actualizar");
        let date = this.datepipe.transform(this.userform.value.emdfecnacido,'yyyy-MM-dd');
        this.userform.value.emdfecnacido = date;
        this.idd = this.localPrueba.emdid;
        this.pruebaservices.updatePrueba(this.userform.value,this.idd)
        .subscribe((data: any) =>{
          console.log(data);
          localStorage.setItem('prueba',JSON.stringify(data));
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
          this.userform.reset();
          if (Number(data.emdtipodecargo)==1 || Number(data.emdtipodecargo)==2) {
            this.router.navigate(["/main/addFormatoA/crear"]);
          }else{
            this.router.navigate(["/main/addFormatoB/crear"]);
          }
        })
      }else{
        console.log("voy a crear");
        let date = this.datepipe.transform(this.userform.value.emdfecnacido,'yyyy-MM-dd');
        this.userform.value.emdfecnacido = date;
        this.pruebaservices.createPrueba(this.userform.value)
        .subscribe((data=>{
          console.log(data);
          console.log("tipo cargo",data.emdtipodecargo);
          localStorage.setItem('IdEmpleado',JSON.stringify(data.emdid));
          localStorage.setItem('prueba',JSON.stringify(data));
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
          this.userform.reset();
          if (Number(data.emdtipodecargo)==1 || Number(data.emdtipodecargo)==2) {
            console.log("ingreso");
            this.router.navigate(["/main/addFormatoA/crear"]);
          }else{
            this.router.navigate(["/main/addFormatoB/crear"]);
          }
          
          
        }))
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/addFormatoA/crear"]);
      
    }
  }

  async buscarArea(){
    console.log("verficando");
    
    this.area =[];
    if (this.localPrueba !== null) {
     await this.pruebaservices.buscarByArea(this.localPrueba.emdempresa).toPromise().then((data:any)=>{
        this.areas = data;
        this.areas.map(x=>{    
          this.area.push({
            label:x.arenombre,
            value: x.areid
          });
        });
      });
      this.userform.patchValue({
        emdarea: this.localPrueba.emdarea
      });
    }else{
      this.pruebaservices.buscarByArea(this.userform.value.emdempresa).toPromise().then((data:any)=>{
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

  numeromax(){
    if(this.localPrueba !==null){
      this.nummaxpre = Number(this.localPrueba.emdtiempolab);
      this.nummax = this.userform.value.emdtiempolab;
      
    }else{
      this.nummax = this.userform.value.emdtiempolab;
     
    }
  }
  validaciontiempos(){
      if (this.userform.value.emdtiemcargo > this.userform.value.emdtiempolab) {
        //this.userform.value.emdtiemcargo = null;
        this.bandera = true;

      }else{
        this.bandera = false;
      }
  
  }

/*   validaciontiemposnegativos(){
    if (this.userform.value.emdtiemcargo < -1) {
      //this.userform.value.emdtiemcargo = null;
      this.bandera2 = true;

    }else{
      this.bandera2 = false;
    }

} */
  calendarEspañol(){
    this.es = {
        firstDayOfWeek: 1,
        dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        dayNamesShort: ["Dom", "Lun", "Mart", "Mie", "Jue", "Vie", "Sab"],
        dayNamesMin: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
        monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
        monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
        today: 'Hoy',
        clear: 'Borrar',
        dateFormat: 'yy-mm-dd',
        weekHeader: 'SM'
    };
}



}
