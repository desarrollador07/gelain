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
import { FormatoB } from '../../models/formatoB.model';


@Component({
  selector: 'app-formatoB',
  templateUrl: './formatoB.component.html',
  styleUrls: ['./formatoB.component.css'],
})
export class FormatoBComponent implements OnInit {
  localPrueba: FormatoB = {};
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
      aux1:[''],
      aux2:[''],
      aux3:[''],
      aux4:[''],
      aux5:[''],
      aux6:[''],
      aux7:[''],
      aux8:[''],
      aux9:[''],
      aux10:[''],
      aux11:[''],
      aux12:[''],
      aux13:[''],
      aux14:[''],
      aux15:[''],
      aux16:[''],
      aux17:[''],
      aux18:[''],
      aux19:[''],
      aux20:[''],
      aux21:[''],
      aux22:[''],
      aux23:[''],
      aux24:[''],
      aux25:[''],
      aux26:[''],
      aux27:[''],
      aux28:[''],
      aux29:[''],
      aux30:[''],
      aux31:[''],
      aux32:[''],
      aux33:[''],
      aux34:[''],
      aux35:[''],
      aux36:[''],
      aux37:[''],
      aux38:[''],
      aux39:[''],
      aux40:[''],
      aux41:[''],
      aux42:[''],
      aux43:[''],
      aux44:[''],
      aux45:[''],
      aux46:[''],
      aux47:[''],
      aux48:[''],
      aux49:[''],
      aux50:[''],
      aux51:[''],
      aux52:[''],
      aux53:[''],
      aux54:[''],
      aux55:[''],
      aux56:[''],
      aux57:[''],
      aux58:[''],
      aux59:[''],
      aux60:[''],
      aux61:[''],
      aux62:[''],
      aux63:[''],
      aux64:[''],
      aux65:[''],
      aux66:[''],
      aux67:[''],
      aux68:[''],
      aux69:[''],
      aux70:[''],
      aux71:[''],
      aux72:[''],
      aux73:[''],
      aux74:[''],
      aux75:[''],
      aux76:[''],
      aux77:[''],
      aux78:[''],
      aux79:[''],
      aux80:[''],
      aux81:[''],
      aux82:[''],
      aux83:[''],
      aux84:[''],
      aux85:[''],
      aux86:[''],
      aux87:[''],
      aux88:[''],
      aux89:[''],
      aux90:[''],
      aux91:[''],
      aux92:[''],
      aux93:[''],
      aux94:[''],
      aux95:[''],
      aux96:[''],
      aux97:[''], 

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
