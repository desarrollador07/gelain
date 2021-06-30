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
import { FormatoA } from '../../models/formatoAmodel';


@Component({
  selector: 'app-formatoA',
  templateUrl: './formatoA.component.html',
  styleUrls: ['./formatoA.component.css'],
})
export class FormatoAComponent implements OnInit {
  localPrueba: FormatoA = {};
  userform: FormGroup;
  es: any;
  idd: any;
  a1: SelectItem[];
  idl:any;
  items: MenuItem[];
  activeIndex: number = 1;
 
  constructor(private pruebaservices: PruebaService,private fb: FormBuilder,private router: Router,
              private route: ActivatedRoute,private _messageService: MessageService) {  
 
  }

  ngOnInit() {

    this.localPrueba =JSON.parse(localStorage.getItem('prueba'));
    console.log('idl',this.idl);

    this.idl =JSON.parse(localStorage.getItem('IdEmpleado'));
    console.log('idl',this.idl);


    this.userform = this.fb.group({
      inaid: [''],
      inaidempleado: [Number(this.idl)],
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

    })

    this.a1 = [];
    this.a1.push({ label: 'Seleccione...', value: 'NR' });
    this.a1.push({ label: 'Siempre', value: '1' });
    this.a1.push({ label: 'Casi Siempre', value: '2' });
    this.a1.push({ label: 'Algunas Veces', value: '3' });
    this.a1.push({ label: 'Casi nunca', value: '4' });
    this.a1.push({ label: 'Nunca', value: '5' });



/*     if(this.localPrueba !==null){
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
      })
    } */
  };





 onSubmit(){
     if(this.userform.valid){
       console.log("validacion",this.localPrueba);
       
      if(this.localPrueba !== null){
        console.log("voy a actualizar");
        this.idd = this.localPrueba.inaid;
        this.pruebaservices.updateFormatoA(this.userform.value,this.idd)
        .subscribe((data: any) =>{
          console.log(data);
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/listarEmpresa"]);
        })
      }else{
        console.log("voy a crear");
        this.pruebaservices.createFormatoA(this.userform.value)
        .subscribe((data=>{
          console.log(data);
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/addExtralaboral/crear"]);
          
        }))
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/listarPrueba"]);
      
    } 
  }

}
