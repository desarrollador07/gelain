import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
/*Modulos */
import { MessageService, SelectItem } from 'primeng/api';
import { Contactos } from 'src/app/models/contactos.model';
import { ContactosService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-form-contactos',
  templateUrl: './form-contactos.component.html',
  styleUrls: ['./form-contactos.component.css']
})
export class FormContactosComponent implements OnInit {

  contacto: Contactos = {};
  id: number;
  userform: FormGroup;
  estado: SelectItem[];
  optEstado:any = {};
  idd: any;
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

  constructor(private contactoService:ContactosService,
             private _location: Location,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private _messageService: MessageService) {
                this.id = Number(this.route.snapshot.paramMap.get("id"));  
                console.log(this.id);
               }

  async ngOnInit() {
    this.form();
    await  this.fnConsultEstados();
    
    this.contacto =JSON.parse(sessionStorage.getItem('contactos'));
    
    if(this.contacto !==null){
      
      this.userform.patchValue({
        con_id:this.contacto.con_id,
        connombre:this.contacto.connombre,
        contelefono:this.contacto.contelefono,
        condireccion:this.contacto.condireccion,
        concorreo:this.contacto.concorreo,
        conatendio:this.contacto.conatendio,
        conestado:this.contacto.conestado,
        confecha:this.contacto.confecha,
        connota:this.contacto.connota,
        confecultimocont:this.contacto.confecultimocont,
      });
    }

    this.userform.controls['confecha'].disable();
    this.userform.controls['confecultimocont'].disable();
  }

  form(){
    let today = new Date();
    this.userform = this.fb.group({
      con_id:[''],
      connombre: ['', Validators.required],
      contelefono: ['', [Validators.required, Validators.minLength(7),Validators.maxLength(10)]],
      condireccion: ['', Validators.required],
      concorreo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      conatendio: ['', Validators.required],
      conestado: ['', Validators.required],
      confecha: [today],
      connota: ['', Validators.required],
      confecultimocont: [today],
    });
  }

  get conNombre() {
    return this.userform.get('connombre').invalid && this.userform.get('connombre').touched
  }
  get conTelefono() {
    return this.userform.get('contelefono').invalid && this.userform.get('contelefono').touched
  }
  get conTelefonomin() {
    return this.userform.get('contelefono').hasError('minlength') 
  }
  get conTelefonomax() {
    return this.userform.get('contelefono').hasError('maxlength') 
  }
  get conDireccion() {
    return this.userform.get('condireccion').invalid && this.userform.get('condireccion').touched
  }
  get conCorreo() {
    return this.userform.get('concorreo').invalid && this.userform.get('concorreo').touched
  }
  get conAtendio() {
    return this.userform.get('conatendio').invalid && this.userform.get('conatendio').touched
  }
  get conEstado() {
    return this.userform.get('conestado').invalid && this.userform.get('conestado').touched
  }
  get conNota() {
    return this.userform.get('connota').invalid && this.userform.get('connota').touched
  }
  get conFecultimocont() {
    return this.userform.get('confecultimocont').invalid && this.userform.get('confecultimocont').touched
  }

   // Validaciones de campo obligatoria Grupal
  get seccion1(){
    return this.userform.get('connombre').invalid || this.userform.get('contelefono').invalid || this.userform.get('condireccion').invalid 
        || this.userform.get('concorreo').invalid || this.conatendioMarca || this.userform.get('conestado').invalid 
        || this.userform.get('connota').invalid || this.userform.get('confecultimocont').invalid;
  }

  // Validaciones de campo obligatoria individual
  get connombreMarca(){
    return  this.userform.get('connombre').invalid;
  }

  get contelefonoMarca(){
    return this.userform.get('contelefono').invalid
  }
  get condireccionMarca(){
    return this.userform.get('condireccion').invalid
  }
  get concorreoMarca(){
    return this.userform.get('concorreo').invalid
  }
  get conatendioMarca(){
    return this.userform.get('conatendio').invalid
  }
  get conestadoMarca(){
    return this.userform.get('conestado').invalid
  }
  get connotaMarca(){
    return this.userform.get('connota').invalid
  }
  get confecultimocontMarca(){
    return this.userform.get('confecultimocont').invalid
  }

  backClicked() {
    this._location.back();
  }

  async onSubmit(){
    if(this.userform.valid){
      if(this.contacto !== null){
        this.idd = this.contacto.con_id;
        await this.contactoService.updateContactos(this.userform.value,this.idd)
        .toPromise().then((data: any) =>{
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'Registro Actualizado', life: 3000})
        });
        this.userform.reset();
        this.router.navigate(["/main/contactos"]);
      }else{
        await this.contactoService.createContactos(this.userform.value)
        .toPromise().then((data=>{
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'Registro creado', life: 3000})        
        }));
        this.router.navigate(["/main/contactos"]);
      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'Fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(["/main/contactos"]);
      
    } 
  }

  async fnConsultEstados(){
    this.estado=[];
    await this.contactoService.getEstadoContactos().toPromise().then((res:any) => {
      res.data.map(x => {
        this.estado.push(
          {
            label: x.v_name,
            value: x.id
          }
        )
      })
      
    });
  }

}
