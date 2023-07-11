import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
/*Modulos */
import { MessageService, MenuItem, SelectItem } from 'primeng/api';
/*Modelos */
import { Estres } from '../../models/estres.nodel';
/*Servicios */
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FormatoEstresService } from 'src/app/services/formato-estres.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-estres',
  templateUrl: './estresL.component.html',
  styleUrls: ['./estresL.component.css'],
})
export class EstresLComponent implements OnInit {

  apiUrl:string = environment.urlGlobal;
  localPrueba: Estres = {};
  userform: FormGroup;
  es: any;
  idd: any;
  a1: SelectItem[];
  a11: SelectItem[];
  a12: SelectItem[];
  idl:any;
  items: MenuItem[];
  activeIndex: number = 1;
  forrr:any[]=[];
  forrrEs:Estres;
  validSave:boolean = false;
  idem:number = 0;
  dataEmpleado:any;
  cedula:string;
  nombre:string;

  constructor(
              private empleadosService: EmpleadosService,
              private formatoEstresService: FormatoEstresService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private _messageService: MessageService) {  
                this.idem = Number(this.route.snapshot.paramMap.get("id"));
                this.dataEmpleado = JSON.parse(sessionStorage.getItem('empRegExt'));  
  }

 async ngOnInit() {
  this.cedula = this.dataEmpleado.emdcedula;
  this.nombre = `${this.dataEmpleado.emdnombres} ${this.dataEmpleado.emdapellidos}`;
  
    this.userform = this.fb.group({
      estid:[''],
      estidempleado:[Number(this.idl)],
      estdolorcuello:['', Validators.required],
      estprobgastrico:['', Validators.required],
      estprobrespira:['', Validators.required],
      estdolorcabeza:['', Validators.required],
      esttrastsueno:['', Validators.required],
      estpalpitacion:['', Validators.required],
      estcamapetito:['', Validators.required],
      estprobgenital:['', Validators.required],
      estdiffamiliar:['', Validators.required],
      estdifquieto:['', Validators.required],
      estdifpersonas:['', Validators.required],
      estsensaislami:['', Validators.required],
      estsobrecarga:['', Validators.required],
      estdifconcentrar:['', Validators.required],
      estaumentaccid:['', Validators.required],
      estsentfrustra:['', Validators.required],
      estcansancio:['', Validators.required],
      estdismrendimie:['', Validators.required],
      estdeseonotrab:['', Validators.required],
      estpocointeres:['', Validators.required],
      estdifdecisiones:['', Validators.required],
      estcambioempleo:['', Validators.required],
      estsentisoledad:['', Validators.required],
      estsentinegativo:['', Validators.required],
      estsetangpretris:['', Validators.required],
      estconsdrogas:['', Validators.required],
      estsentinosirve:['', Validators.required],
      estconsucigarri:['', Validators.required],
      estperdirazon:['', Validators.required],
      estcomprigido:['', Validators.required],
      estsensproblem:['', Validators.required],
/*       estfechareg:[''],
      estfechamod:[''], */
      estusuarioreg:['']

    })

    this.idl =JSON.parse(sessionStorage.getItem('IdEmpleado'));
    await  this.formatoEstresService.buscarByEstres(this.idl).toPromise().then((data:any)=>{
        this.localPrueba = data[0];
    });

    this.a1 = [];
    this.a1.push({ label: 'Seleccione una opción', value: '' });
    this.a1.push({ label: 'Siempre', value: '1' });
    this.a1.push({ label: 'Casi Siempre', value: '2' });
    this.a1.push({ label: 'Algunas Veces', value: '3' });
    this.a1.push({ label: 'Casi nunca', value: '4' });
    this.a1.push({ label: 'Nunca', value: '5' });

    this.a11 = [];
    this.a11.push({ label: 'Seleccione una opción', value: '' });
    this.a11.push({ label: 'Siempre', value: '6' });
    this.a11.push({ label: 'Casi Siempre', value: '4' });
    this.a11.push({ label: 'A Veces', value: '2' });
    this.a11.push({ label: 'Nunca', value: '0' });

    this.a12 = [];
    this.a12.push({ label: 'Seleccione una opción', value: '' });
    this.a12.push({ label: 'Siempre', value: '3' });
    this.a12.push({ label: 'Casi Siempre', value: '2' });
    this.a12.push({ label: 'A Veces', value: '1' });
    this.a12.push({ label: 'Nunca', value: '0' });


     if(this.localPrueba !== null){
      this.userform.patchValue({
        estidempleado:this.localPrueba.estidempleado,
        estdolorcuello:this.localPrueba.estdolorcuello,
        estprobgastrico:this.localPrueba.estprobgastrico,
        estprobrespira:this.localPrueba.estprobrespira,
        estdolorcabeza:this.localPrueba.estdolorcabeza,
        esttrastsueno:this.localPrueba.esttrastsueno,
        estpalpitacion:this.localPrueba.estpalpitacion,
        estcamapetito:this.localPrueba.estcamapetito,
        estprobgenital:this.localPrueba.estprobgenital,
        estdiffamiliar:this.localPrueba.estdiffamiliar,
        estdifquieto:this.localPrueba.estdifquieto,
        estdifpersonas:this.localPrueba.estdifpersonas,
        estsensaislami:this.localPrueba.estsensaislami,
        estsobrecarga:this.localPrueba.estsobrecarga,
        estdifconcentrar:this.localPrueba.estdifconcentrar,
        estaumentaccid:this.localPrueba.estaumentaccid,
        estsentfrustra:this.localPrueba.estsentfrustra,
        estcansancio:this.localPrueba.estcansancio,
        estdismrendimie:this.localPrueba.estdismrendimie,
        estdeseonotrab:this.localPrueba.estdeseonotrab,
        estpocointeres:this.localPrueba.estpocointeres,
        estdifdecisiones:this.localPrueba.estdifdecisiones,
        estcambioempleo:this.localPrueba.estcambioempleo,
        estsentisoledad:this.localPrueba.estsentisoledad,
        estsentinegativo:this.localPrueba.estsentinegativo,
        estsetangpretris:this.localPrueba.estsetangpretris,
        estconsdrogas:this.localPrueba.estconsdrogas,
        estsentinosirve:this.localPrueba.estsentinosirve,
        estconsucigarri:this.localPrueba.estconsucigarri,
        estperdirazon:this.localPrueba.estperdirazon,
        estcomprigido:this.localPrueba.estcomprigido,
        estsensproblem:this.localPrueba.estsensproblem,
        estusuarioreg:this.localPrueba.estusuarioreg
      })
    } 
  };

  get seccion1(){
    return this.userform.get('estdolorcuello').invalid || this.userform.get('estprobgastrico').invalid || this.userform.get('estprobrespira').invalid
        || this.userform.get('estdolorcabeza').invalid || this.userform.get('esttrastsueno').invalid || this.userform.get('estpalpitacion').invalid 
        || this.userform.get('estcamapetito').invalid || this.userform.get('estprobgenital').invalid || this.userform.get('estdiffamiliar').invalid
        || this.userform.get('estdifquieto').invalid || this.userform.get('estdifpersonas').invalid || this.userform.get('estsensaislami').invalid
        || this.userform.get('estsobrecarga').invalid || this.userform.get('estdifconcentrar').invalid || this.userform.get('estaumentaccid').invalid
        || this.userform.get('estsentfrustra').invalid || this.userform.get('estcansancio').invalid || this.userform.get('estdismrendimie').invalid
        || this.userform.get('estdeseonotrab').invalid || this.userform.get('estpocointeres').invalid || this.userform.get('estdifdecisiones').invalid
        || this.userform.get('estcambioempleo').invalid || this.userform.get('estsentisoledad').invalid || this.userform.get('estsentinegativo').invalid
        || this.userform.get('estsetangpretris').invalid || this.userform.get('estconsdrogas').invalid || this.userform.get('estsentinosirve').invalid
        || this.userform.get('estconsucigarri').invalid || this.userform.get('estperdirazon').invalid || this.userform.get('estcomprigido').invalid 
        || this.userform.get('estsensproblem').invalid; 
  }

  get estdolorcuelloMarca(){
    return this.userform.get('estdolorcuello').invalid
  }
  get estdolorcuello() {
    return this.userform.get('estdolorcuello').invalid && this.userform.get('estdolorcuello').touched
  }
  get estprobgastricoMarca(){
    return this.userform.get('estprobgastrico').invalid
  }
  get estprobgastrico() {
    return this.userform.get('estprobgastrico').invalid && this.userform.get('estprobgastrico').touched
  }
  get estprobrespiraMarca(){
    return this.userform.get('estprobrespira').invalid
  }
  get estprobrespira() {
    return this.userform.get('estprobrespira').invalid && this.userform.get('estprobrespira').touched
  }
  get estdolorcabezaMarca(){
    return this.userform.get('estdolorcabeza').invalid
  }
  get estdolorcabeza() {
    return this.userform.get('estdolorcabeza').invalid && this.userform.get('estdolorcabeza').touched
  }
  get esttrastsuenoMarca(){
    return this.userform.get('esttrastsueno').invalid
  }
  get esttrastsueno() {
    return this.userform.get('esttrastsueno').invalid && this.userform.get('esttrastsueno').touched
  }
  get estpalpitacionMarca(){
    return this.userform.get('estpalpitacion').invalid
  }
  get estpalpitacion() {
    return this.userform.get('estpalpitacion').invalid && this.userform.get('estpalpitacion').touched
  }
  get estcamapetitoMarca(){
    return this.userform.get('estcamapetito').invalid
  }
  get estcamapetito() {
    return this.userform.get('estcamapetito').invalid && this.userform.get('estcamapetito').touched
  }
  get estprobgenitalMarca(){
    return this.userform.get('estprobgenital').invalid
  }
  get estprobgenital() {
    return this.userform.get('estprobgenital').invalid && this.userform.get('estprobgenital').touched
  }
  get estdiffamiliarMarca(){
    return this.userform.get('estdiffamiliar').invalid
  }
  get estdiffamiliar() {
    return this.userform.get('estdiffamiliar').invalid && this.userform.get('estdiffamiliar').touched
  }
  get estdifquietoMarca(){
    return this.userform.get('estdifquieto').invalid
  }
  get estdifquieto() {
    return this.userform.get('estdifquieto').invalid && this.userform.get('estdifquieto').touched
  }
  get estdifpersonasMarca(){
    return this.userform.get('estdifpersonas').invalid
  }
  get estdifpersonas() {
    return this.userform.get('estdifpersonas').invalid && this.userform.get('estdifpersonas').touched
  }
  get estsensaislamiMarca(){
    return this.userform.get('estsensaislami').invalid
  }
  get estsensaislami() {
    return this.userform.get('estsensaislami').invalid && this.userform.get('estsensaislami').touched
  }
  get estsobrecargaMarca(){
    return this.userform.get('estsobrecarga').invalid
  }
  get estsobrecarga() {
    return this.userform.get('estsobrecarga').invalid && this.userform.get('estsobrecarga').touched
  }
  get estdifconcentrarMarca(){
    return this.userform.get('estdifconcentrar').invalid
  }
  get estdifconcentrar() {
    return this.userform.get('estdifconcentrar').invalid && this.userform.get('estdifconcentrar').touched
  }
  get estaumentaccidMarca(){
    return this.userform.get('estaumentaccid').invalid
  }
  get estaumentaccid() {
    return this.userform.get('estaumentaccid').invalid && this.userform.get('estaumentaccid').touched
  }
  get estsentfrustraMarca(){
    return this.userform.get('estsentfrustra').invalid
  }
  get estsentfrustra() {
    return this.userform.get('estsentfrustra').invalid && this.userform.get('estsentfrustra').touched
  }
  get estcansancioMarca(){
    return this.userform.get('estcansancio').invalid
  }
  get estcansancio() {
    return this.userform.get('estcansancio').invalid && this.userform.get('estcansancio').touched
  }
  get estdismrendimieMarca(){
    return this.userform.get('estdismrendimie').invalid
  }
  get estdismrendimie() {
    return this.userform.get('estdismrendimie').invalid && this.userform.get('estdismrendimie').touched
  }
  get estdeseonotrabMarca(){
    return this.userform.get('estdeseonotrab').invalid
  }
  get estdeseonotrab() {
    return this.userform.get('estdeseonotrab').invalid && this.userform.get('estdeseonotrab').touched
  }
  get estpocointeresMarca(){
    return this.userform.get('estpocointeres').invalid
  }
  get estpocointeres() {
    return this.userform.get('estpocointeres').invalid && this.userform.get('estpocointeres').touched
  }
  get estdifdecisionesMarca(){
    return this.userform.get('estdifdecisiones').invalid
  }
  get estdifdecisiones() {
    return this.userform.get('estdifdecisiones').invalid && this.userform.get('estdifdecisiones').touched
  }
  get estcambioempleoMarca(){
    return this.userform.get('estcambioempleo').invalid
  }
  get estcambioempleo() {
    return this.userform.get('estcambioempleo').invalid && this.userform.get('estcambioempleo').touched
  }
  get estsentisoledadMarca(){
    return this.userform.get('estsentisoledad').invalid
  }
  get estsentisoledad() {
    return this.userform.get('estsentisoledad').invalid && this.userform.get('estsentisoledad').touched
  }
  get estsentinegativoMarca(){
    return this.userform.get('estsentinegativo').invalid
  }
  get estsentinegativo() {
    return this.userform.get('estsentinegativo').invalid && this.userform.get('estsentinegativo').touched
  }
  get estsetangpretrisMarca(){
    return this.userform.get('estsetangpretris').invalid
  }
  get estsetangpretris() {
    return this.userform.get('estsetangpretris').invalid && this.userform.get('estsetangpretris').touched
  }
  get estconsdrogasMarca(){
    return this.userform.get('estconsdrogas').invalid
  }
  get estconsdrogas() {
    return this.userform.get('estconsdrogas').invalid && this.userform.get('estconsdrogas').touched
  }
  get estsentinosirveMarca(){
    return this.userform.get('estsentinosirve').invalid
  }
  get estsentinosirve() {
    return this.userform.get('estsentinosirve').invalid && this.userform.get('estsentinosirve').touched
  }
  get estconsucigarriMarca(){
    return this.userform.get('estconsucigarri').invalid
  }
  get estconsucigarri() {
    return this.userform.get('estconsucigarri').invalid && this.userform.get('estconsucigarri').touched
  }
  get estperdirazonMarca(){
    return this.userform.get('estperdirazon').invalid
  }
  get estperdirazon() {
    return this.userform.get('estperdirazon').invalid && this.userform.get('estperdirazon').touched
  }
  get estcomprigidoMarca(){
    return this.userform.get('estcomprigido').invalid
  }
  get estcomprigido() {
    return this.userform.get('estcomprigido').invalid && this.userform.get('estcomprigido').touched
  }
  get estsensproblemMarca(){
    return this.userform.get('estsensproblem').invalid
  }
  get estsensproblem() {
    return this.userform.get('estsensproblem').invalid && this.userform.get('estsensproblem').touched
  }





 onSubmit(){
     if(this.userform.valid){
       this.validSave = true;
      if(this.localPrueba !== null){
          this.idd = this.localPrueba.estid;
          this.formatoEstresService.updateEstres(this.userform.value,this.idd)
          .subscribe((data: any) =>{
            this.empleadosService.updateEstado(this.idl).subscribe((data=>{  
            }));
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'Registro Actualizado', life: 3000})
            this.userform.reset();
            this.router.navigate(['FinalFormularios']);
          })

      }
      
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
      this.userform.reset();
      this.router.navigate(['FinalFormularios']);
      
    } 
  }

  salir(){
    sessionStorage.removeItem('empRegExt');
    sessionStorage.removeItem('IdEmpleado');
  }

  volver(){
    this.router.navigate(["ExtralaboralL/"+this.idem]);
  }

}
