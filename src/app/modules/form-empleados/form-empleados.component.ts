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
  userform: FormGroup;
  es: any;
  id: number;
  idd: any;
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService) { 
    this.id = Number(this.route.snapshot.paramMap.get("id"));  
    console.log(this.id);
  }

  async ngOnInit() {
    this.userform = this.fb.group({
      emdid:[''],
      emdcedula: [''],
      emdnombres: [''],
      emdapellidos: [''],
      emdsexo: [''],
      emdfecnacido: [''],
      emdestcivil: [''],
      emdnivelestudio: [''],
      emdprofesion: [''],
      emddepartamento: [''],
      emdciudad: [''],
      emddireccion: [''],
      emdtelefono: [''],
      emdemail: [''],
      emdestracto: [''],
      emdtipovivienda: [''],
      emdpersdepen: [''],
      emdempresa: [''],
      emdtiempolab: [''],
      emdcargo: [''],
      emdtipodecargo: [''],
      emdtiemcargo: [''],
      emdarea: [''],
      emdtipocontrato: [''],
      emdtiposalario: [''],
      emdusuarioreg: [''],
      emdipreg: [''],
    });

    this.localPrueba =JSON.parse(localStorage.getItem('prueba'));
    console.log('f',this.localPrueba);

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


    

    this.userform = this.fb.group({
      emdid:[''],
      emdcedula: [''],
      emdnombres: [''],
      emdapellidos: [''],
      emdsexo: [''],
      emdfecnacido: [''],
      emdestcivil: [''],
      emdnivelestudio: [''],
      emdprofesion: [''],
      emddepartamento: [''],
      emdciudad: [''],
      emddireccion: [''],
      emdtelefono: [''],
      emdemail: [''],
      emdestracto: [''],
      emdtipovivienda: [''],
      emdpersdepen: [''],
      emdempresa: [''],
      emdtiempolab: [''],
      emdcargo: [''],
      emdtipodecargo: [''],
      emdtiemcargo: [''],
      emdarea: [''],
      emdtipocontrato: [''],
      emdtiposalario: [''],
      emdusuarioreg: [''],
      emdipreg: [''],
    });

    this.sexo = [];
    this.sexo.push({ label: 'Sexo', value: 'NR'});
    this.sexo.push({ label: 'Masculino', value: 'M' });
    this.sexo.push({ label: 'Femenino', value: 'F' });
    this.sexo.push({ label: 'No Responde', value: 'NR' });

    this.civil = [];
    this.civil.push({ label: 'Estado Civil', value: 'NR' });
    this.civil.push({ label: 'Soltero(a)', value: '1' });
    this.civil.push({ label: 'Casado(a)', value: '2' });
    this.civil.push({ label: 'Union libre', value: '3' });
    this.civil.push({ label: 'Separado(a)', value: '4' });
    this.civil.push({ label: 'Divorciado(a)', value: '5' });
    this.civil.push({ label: 'Viudo(a)', value: '6' });
    this.civil.push({ label: 'Sacerdote/Monja', value:' 7' });
    this.civil.push({ label: 'No Responde', value: 'NR' });

    this.estudio = [];
    this.estudio.push({ label: 'Ultimos niveles de estudio', value: 'NR' });
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
    this.estudio.push({ label: 'No Responde', value: 'NR' });

    this.estrato = [];
    this.estrato.push({ label: 'Estrato de su vivienda', value: 'NR' });
    this.estrato.push({ label: '1', value: '1' });
    this.estrato.push({ label: '2', value: '2' });
    this.estrato.push({ label: '3', value: '3' });
    this.estrato.push({ label: '4', value: '4' });
    this.estrato.push({ label: '5', value: '5' });
    this.estrato.push({ label: '6', value: '6' });
    this.estrato.push({ label: 'Finca', value:'7' });
    this.estrato.push({ label: 'No se', value:'8' });
    this.estrato.push({ label: 'No Responde', value: 'NR' });

    this.tipovivi = [];
    this.tipovivi.push({ label: 'Tipo de Vivienda', value: 'NR' });
    this.tipovivi.push({ label: 'Propia', value: '1' });
    this.tipovivi.push({ label: 'En arriendo', value: '2' });
    this.tipovivi.push({ label: 'Familiar', value: '3' });
    this.tipovivi.push({ label: 'No Responde', value: 'NR' });

    this.cargo = [];
    this.cargo.push({ label: 'Tipo de Cargo', value: 'NR' });
    this.cargo.push({ label: 'Jefatura - tiene personal a cargo', value: '1' });
    this.cargo.push({ label: 'Profesional - analista - técnico - tecnólogo', value: '2' });
    this.cargo.push({ label: 'Auxiliar - asistente administrativo - asistente técnico', value: '3' });
    this.cargo.push({ label: 'Operario, operador, ayudante, servicios generales', value: '4' });
    this.cargo.push({ label: 'No Responde', value: 'NR' });

    this.tContrato = [];
    this.tContrato.push({ label: 'Tipo de Contrato', value: 'NR' });
    this.tContrato.push({ label: 'Temporal de menos de 1 año', value: '1' });
    this.tContrato.push({ label: 'Temporal de 1 año o mas', value: '2' });
    this.tContrato.push({ label: 'Termino indefinido', value: '3' });
    this.tContrato.push({ label: 'Cooperado (cooperativa)', value: '4' });
    this.tContrato.push({ label: 'Prestacion de servicios', value: '5' });
    this.tContrato.push({ label: 'No se', value: '6' });
    this.tContrato.push({ label: 'No Responde', value: 'NR' });

    this.tsalario = [];
    this.tsalario.push({ label: 'Tipo de salario', value: 'NR' });
    this.tsalario.push({ label: 'Fijo', value: '1' });
    this.tsalario.push({ label: 'Una parte fija y otra variable', value: '2' });
    this.tsalario.push({ label: 'Todo variable', value: '3' });
    this.tsalario.push({ label: 'No Responde', value: 'NR' });

    this.area = [];
    this.area.push({ label: 'Areas', value: 'NR' });
    this.area.push({ label: 'Sistemas', value: '4' });
    this.area.push({ label: 'Contable', value: '5' });
    this.area.push({ label: 'Comercial', value: '6' });

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
        emdarea:this.localPrueba.emdarea,
        emdtipocontrato:this.localPrueba.emdtipocontrato,
        emdtiposalario:this.localPrueba.emdtiposalario,
        emdusuarioreg:this.localPrueba.emdusuarioreg,
        emdipreg:this.localPrueba.emdipreg,
      })
    } 
  }




 onSubmit(){
    if(this.userform.valid){
      if(this.localPrueba !== null){
        console.log("voy a actualizar");
        this.idd = this.localPrueba.emdid;
        this.pruebaservices.updatePrueba(this.userform.value,this.idd)
        .subscribe((data: any) =>{
          console.log(data);
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/empleado"]);
        })
      }else{
        console.log("voy a crear");
        this.pruebaservices.createPrueba(this.userform.value)
        .subscribe((data=>{
          console.log(data);
          console.log("tipo cargo",data.emdtipodecargo);
          localStorage.setItem('IdEmpleado',JSON.stringify(data.emdid));
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
          this.userform.reset();
          if (Number(data.emdtipodecargo)==1) {
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

}
