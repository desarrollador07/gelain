import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
/*Modulos */
import { SelectItem, MessageService } from 'primeng/api';
/*Modelos */
import { Area } from 'src/app/models/area.model';
import { Empresa } from 'src/app/models/empresa.model';
import { ValorFisico } from 'src/app/models/valorFisico.model';
/*Servicios */
import { AreasService } from 'src/app/services/areas.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ValoracionFisicaService } from 'src/app/services/valoracion-fisica.service';

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
  tempValorF: ValorFisico = {};
  sexo: SelectItem[] = [];
  selectvafc0:SelectItem[] = [];
  selectvafc1:SelectItem[] = [];
  selectvafc2:SelectItem[] = [];
  selectvafc3:SelectItem[] = [];
  selectvafc4:SelectItem[] = [];
  selectvafc5:SelectItem[] = [];
  selectvafc6:SelectItem[] = [];
  selectvafc7:SelectItem[] = [];
  selectvafc8:SelectItem[] = [];
  selectvafc9:SelectItem[] = [];
  selectvafc10:SelectItem[] = [];
  selectvafc11:SelectItem[] = [];
  selectvafc12:SelectItem[] = [];
  selectvafc13:SelectItem[] = [];
  selectvafc14:SelectItem[] = [];
  selectvafc15:SelectItem[] = [];
  selectvafc16:SelectItem[] = [];
  cancerSelect: string[] = [];
  haSelect: string[] = [];
  asmaSelect: string[] = [];
  cardioSelect: string[] = [];
  diabetesSelect: string[] = [];
  alergiaSelect: string[] = [];
  artritisSelect: string[] = [];
  emSelect: string[] = [];
  erSelect: string[] = [];
  arrFamSelect: SelectItem[];
  idd: any;
  respEstado:string;
  es: any;
  imagenIcon:string = '';
  imagenIcon1:string = '';
  imgValid:boolean = false;
  imgValid1:boolean = false;
  totalCR:number = 0;
  validMsj:boolean = false;
  msjCR:string = '';
  colorMsj:string = '';
  colorMsj1:string = '';
  ocultarSecciones:boolean = false;
  id:number;
  validSexoFem:boolean = false;
  validSexoMas:boolean = false;
  
  constructor(private areasServices: AreasService,
              private empresaServices: EmpresaService,
              private vfService: ValoracionFisicaService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private _messageService: MessageService) {
                this.id = Number(this.route.snapshot.paramMap.get("id"));  
              }
  
              
  async ngOnInit() {

    this.formulario();
    this.selectData();
    await this.consultarEmpresas();
    this.userform.patchValue({
      vafidempresa: this.id
    })
    await this.buscarArea();
  }

  /*Apartado de Validaciones */
  get vafidempresa() {
    return this.userform.get('vafidempresa').invalid && this.userform.get('vafidempresa').dirty
  }
  get vafidarea() {
    return this.userform.get('vafidarea').invalid && this.userform.get('vafidarea').dirty
  }
  get vafidnombre() {
    return this.userform.get('vafidnombre').invalid && this.userform.get('vafidnombre').touched
  }
  get vafsede() {
    return this.userform.get('vafsede').invalid && this.userform.get('vafsede').touched
  }
  get vafcedula() {
    return this.userform.get('vafcedula').invalid && this.userform.get('vafcedula').touched
  }
  get vafSexoValid() {
    return this.userform.get('vafsexo').invalid && this.userform.get('vafsexo').dirty
  }
  get vafGrupoSanguineoValid() {
    return this.userform.get('vafgruposanguineo').invalid && this.userform.get('vafgruposanguineo').touched
  }
  get vafTelefonoValid() {
    return this.userform.get('vaftelefono').invalid && this.userform.get('vaftelefono').touched
  }
  get vafCiudadValid() {
    return this.userform.get('vafciudad').invalid && this.userform.get('vafciudad').touched
  }
  get vafEdadValid() {
    return this.userform.get('vafedad').invalid && this.userform.get('vafedad').touched
  }
  get vafCorreoValid() {
    return this.userform.get('vafcorreo').invalid && this.userform.get('vafcorreo').touched
  }
  get vafFechaValid() {
    return this.userform.get('vaffecha').invalid && this.userform.get('vaffecha').dirty
  }
  get vafCargoValid() {
    return this.userform.get('vafcargo').invalid && this.userform.get('vafcargo').touched
  }

  get vafcs01Valid() {
    return this.userform.get('vafcs01').invalid && this.userform.get('vafcs01').dirty
  }

  get vafcs02Valid() {
    return this.userform.get('vafcs02').invalid && this.userform.get('vafcs02').dirty
  }

  get vafcs03Valid() {
    return this.userform.get('vafcs03').invalid && this.userform.get('vafcs03').dirty
  }

  get vafcs04Valid() {
    return this.userform.get('vafcs04').invalid && this.userform.get('vafcs04').dirty
  }

  get vafcs05Valid() {
    return this.userform.get('vafcs05').invalid && this.userform.get('vafcs05').dirty
  }

  get vafcs06Valid() {
    return this.userform.get('vafcs06').invalid && this.userform.get('vafcs06').dirty
  }

  get vafcs07Valid() {
    return this.userform.get('vafcs07').invalid && this.userform.get('vafcs07').dirty
  }

  get vafcs08Valid() {
    return this.userform.get('vafcs08').invalid && this.userform.get('vafcs08').dirty
  }

  get vafcs09Valid() {
    return this.userform.get('vafcs09').invalid && this.userform.get('vafcs09').dirty
  }

  get vafcs10Valid() {
    return this.userform.get('vafcs10').invalid && this.userform.get('vafcs10').dirty
  }

  get vafcs11Valid() {
    return this.userform.get('vafcs11').invalid && this.userform.get('vafcs11').dirty
  }

  get vafcs12Valid() {
    return this.userform.get('vafcs12').invalid && this.userform.get('vafcs12').dirty
  }

  get vafcs13Valid() {
    return this.userform.get('vafcs13').invalid && this.userform.get('vafcs13').dirty
  }

  get vafcs14Valid() {
    return this.userform.get('vafcs14').invalid && this.userform.get('vafcs14').dirty
  }

  get vafcs16Valid() {
    return this.userform.get('vafcs16').invalid && this.userform.get('vafcs16').dirty
  }

  get vafcs17Valid() {
    return this.userform.get('vafcs17').invalid && this.userform.get('vafcs17').dirty
  }

  get vafcs18Valid() {
    return this.userform.get('vafcs18').invalid && this.userform.get('vafcs18').dirty
  }

  get vafcs19Valid() {
    return this.userform.get('vafcs19').invalid && this.userform.get('vafcs19').dirty
  }

  get vafcs20Valid() {
    return this.userform.get('vafcs20').invalid && this.userform.get('vafcs20').dirty
  }

  get vafcancer_opcValid() {
    return this.userform.get('vafcancer_opc').invalid && this.userform.get('vafcancer_opc').dirty
  }

  get vafhiper_arte_opcValid() {
    return this.userform.get('vafhiper_arte_opc').invalid && this.userform.get('vafhiper_arte_opc').dirty
  }

  get vafasma_opcValid() {
    return this.userform.get('vafasma_opc').invalid && this.userform.get('vafasma_opc').dirty
  }

  get vafcardio_opcValid() {
    return this.userform.get('vafcardio_opc').invalid && this.userform.get('vafcardio_opc').dirty
  }

  get vafdiabet_opcValid() {
    return this.userform.get('vafdiabet_opc').invalid && this.userform.get('vafdiabet_opc').dirty
  }

  get vafalergia_opcValid() {
    return this.userform.get('vafalergia_opc').invalid && this.userform.get('vafalergia_opc').dirty
  }

  get vafartritis_opcValid() {
    return this.userform.get('vafartritis_opc').invalid && this.userform.get('vafartritis_opc').dirty
  }

  get vafem_opcValid() {
    return this.userform.get('vafem_opc').invalid && this.userform.get('vafem_opc').dirty
  }

  get vafer_opcValid() {
    return this.userform.get('vafer_opc').invalid && this.userform.get('vafer_opc').dirty
  }

  get vafmujer40_opcValid() {
    return this.validSexoFem === true && this.userform.value.vafmujer40_opc === '';
  }

  get vafhombre40_opcValid() {
    return this.validSexoMas === true && this.userform.value.vafhombre40_opc === ''
  }

  get vafdiscapacidad_opcValid() {
    return this.userform.get('vafdiscapacidad_opc').invalid && this.userform.get('vafdiscapacidad_opc').dirty
  }

  get vaf_familiap01_opcValid() {
    return this.userform.get('vaf_familiap01_opc').invalid && this.userform.get('vaf_familiap01_opc').dirty
  }

  get vaf_familiap02_opcValid() {
    return this.userform.get('vaf_familiap02_opc').invalid && this.userform.get('vaf_familiap02_opc').dirty
  }

  get vaf_actifisip01_opcValid() {
    return this.userform.get('vaf_actifisip01_opc').invalid && this.userform.get('vaf_actifisip01_opc').dirty
  }

  get vaf_actifisip02_opcValid() {
    return this.userform.get('vaf_actifisip02_opc').invalid && this.userform.get('vaf_actifisip02_opc').dirty
  }

  get vaf_nutricionp01_opcValid() {
    return this.userform.get('vaf_nutricionp01_opc').invalid && this.userform.get('vaf_nutricionp01_opc').dirty
  }

  get vaf_nutricionp02_opcValid() {
    return this.userform.get('vaf_nutricionp02_opc').invalid && this.userform.get('vaf_nutricionp02_opc').dirty
  }

  get vaf_nutricionp03_opcValid() {
    return this.userform.get('vaf_nutricionp03_opc').invalid && this.userform.get('vaf_nutricionp03_opc').dirty
  }

  get vaf_tabacop01_opcValid() {
    return this.userform.get('vaf_tabacop01_opc').invalid && this.userform.get('vaf_tabacop01_opc').dirty
  }

  get vaf_tabacop02_opcValid() {
    return this.userform.get('vaf_tabacop02_opc').invalid && this.userform.get('vaf_tabacop02_opc').dirty
  }

  get vaf_alcoholp01_opcValid() {
    return this.userform.get('vaf_alcoholp01_opc').invalid && this.userform.get('vaf_alcoholp01_opc').dirty
  }

  get vaf_alcoholp02_opcValid() {
    return this.userform.get('vaf_alcoholp02_opc').invalid && this.userform.get('vaf_alcoholp02_opc').dirty
  }

  get vaf_alcoholp03_opcValid() {
    return this.userform.get('vaf_alcoholp03_opc').invalid && this.userform.get('vaf_alcoholp03_opc').dirty
  }

  get vaf_suenop01_opcValid() {
    return this.userform.get('vaf_suenop01_opc').invalid && this.userform.get('vaf_suenop01_opc').dirty
  }

  get vaf_suenop02_opcValid() {
    return this.userform.get('vaf_suenop02_opc').invalid && this.userform.get('vaf_suenop02_opc').dirty
  }

  get vaf_suenop03_opcValid() {
    return this.userform.get('vaf_suenop03_opc').invalid && this.userform.get('vaf_suenop03_opc').dirty
  }

  get vaf_tipop01_opcValid() {
    return this.userform.get('vaf_tipop01_opc').invalid && this.userform.get('vaf_tipop01_opc').dirty
  }

  get vaf_tipop02_opcValid() {
    return this.userform.get('vaf_tipop02_opc').invalid && this.userform.get('vaf_tipop02_opc').dirty
  }

  get vaf_introspep01_opcValid() {
    return this.userform.get('vaf_introspep01_opc').invalid && this.userform.get('vaf_introspep01_opc').dirty
  }

  get vaf_introspep02_opcValid() {
    return this.userform.get('vaf_introspep02_opc').invalid && this.userform.get('vaf_introspep02_opc').dirty
  }

  get vaf_introspep03_opcValid() {
    return this.userform.get('vaf_introspep03_opc').invalid && this.userform.get('vaf_introspep03_opc').dirty
  }

  get vaf_condup01_opcValid() {
    return this.userform.get('vaf_condup01_opc').invalid && this.userform.get('vaf_condup01_opc').dirty
  }

  get vaf_condup02_opcValid() {
    return this.userform.get('vaf_condup02_opc').invalid && this.userform.get('vaf_condup02_opc').dirty
  }

  get vaf_otrasdp01_opcValid() {
    return this.userform.get('vaf_otrasdp01_opc').invalid && this.userform.get('vaf_otrasdp01_opc').dirty
  }

  get vaf_otrasdp02_opcValid() {
    return this.userform.get('vaf_otrasdp02_opc').invalid && this.userform.get('vaf_otrasdp02_opc').dirty
  }

  get vaf_otrasdp03_opcValid() {
    return this.userform.get('vaf_otrasdp03_opc').invalid && this.userform.get('vaf_otrasdp03_opc').dirty
  }

  get vafcs15Valid(){
    return this.userform.get('vafcs14').value === 1 && this.userform.get('vafcs15').value.length <= 1
  }

  get vafcs21Valid(){
    return this.userform.get('vafcs20').value === 1 && this.userform.get('vafcs21').value.length <= 1
  }

  get cancerValidAprob(){
    return this.userform.get('vafcancer_opc').value === 1 && this.userform.get('vafcancer_var').value.length <= 0
  }

  get hiper_arteValidAprob(){
    return this.userform.get('vafhiper_arte_opc').value === 1 && this.userform.get('vafhiper_arte_var').value.length <= 0
  }

  get asmaValidAprob(){
    return this.userform.get('vafasma_opc').value === 1 && this.userform.get('vafasma_var').value.length <= 0
  }

  get cardioValidAprob(){
    return this.userform.get('vafcardio_opc').value === 1 && this.userform.get('vafcardio_var').value.length <= 0
  }

  get diabetValidAprob(){
    return this.userform.get('vafdiabet_opc').value === 1 && this.userform.get('vafdiabet_var').value.length <= 0
  }

  get alergiaValidAprob(){
    return this.userform.get('vafalergia_opc').value === 1 && this.userform.get('vafalergia_var').value.length <= 0
  }

  get artritisValidAprob(){
    return this.userform.get('vafartritis_opc').value === 1 && this.userform.get('vafartritis_var').value.length <= 0
  }

  get emValidAprob(){
    return this.userform.get('vafem_opc').value === 1 && this.userform.get('vafem_var').value.length <= 0
  }

  get erValidAprob(){
    return this.userform.get('vafer_opc').value === 1 && this.userform.get('vafer_var').value.length <= 0
  }

  get mujer40ValidAprob(){
    return this.userform.get('vafmujer40_opc').value === 1 && this.userform.get('vafmujer40_var').value === '.'
  }

  get hombre40ValidAprob(){
    return this.userform.get('vafhombre40_opc').value === 1 && this.userform.get('vafhombre40_var').value === '.'
  }

  get discapacidadValidAprob(){
    return this.userform.get('vafdiscapacidad_opc').value === 1 && this.userform.get('vafdiscapacidad_var').value.length <= 1
  }

  get aprobForm (){
    return this.userform.invalid || this.vafcs15Valid || this.vafcs21Valid || this.cancerValidAprob || this.hiper_arteValidAprob || 
           this.asmaValidAprob || this.cardioValidAprob || this.diabetValidAprob || this.alergiaValidAprob || this.artritisValidAprob || 
           this.emValidAprob || this.erValidAprob || this.mujer40ValidAprob || this.hombre40ValidAprob || this.discapacidadValidAprob ||
           this.vafmujer40_opcValid || this.vafhombre40_opcValid;
  }

  get vafAF_p01Valid() {
    return this.userform.get('vafAF_p01').invalid && this.userform.get('vafAF_p01').dirty
  }

  get vafAF_p02Valid() {
    return this.userform.get('vafAF_p02').invalid && this.userform.get('vafAF_p02').dirty
  }


  formulario(){
    this.userform = this.fb.group({
      vafid:[''],
      vafidempresa: ['', Validators.required],
      vafidarea: ['', Validators.required],
      vafidnombre: ['', Validators.required],
      vafsede: ['', Validators.required],
      vafpeso: [''],
      vaftalla: [''],
      vafimc: [''],
      vafperimetro: [''],
      vafp0: [''],
      vafp1: [''],
      vafp2: [''],
      vaftestbiering: [''],
      vaftestpuenteder: [''],
      vaftestpuenteizq: [''],
      vaftestresistronco: [''],
      vaftestflextronco: [''],
      vaftestmovhombder: [''],
      vaftestmovhombizq: [''],
      vafcedula: ['', Validators.required],
      vafsexo: ['', Validators.required],
      vafgruposanguineo: ['', Validators.required],
      vaftelefono: ['', Validators.required],
      vafciudad: ['', Validators.required],
      vafedad: ['', Validators.required],
      vafcorreo: ['', [ Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      vafcargo: ['', Validators.required],
      vaffecha: ['', Validators.required],
      vafcs01: ['', Validators.required],
      vafcs02: ['', Validators.required],
      vafcs03: ['', Validators.required],
      vafcs04: ['', Validators.required],
      vafcs05: ['', Validators.required],
      vafcs06: ['', Validators.required],
      vafcs07: ['', Validators.required],
      vafcs08: ['', Validators.required],
      vafcs09: ['', Validators.required],
      vafcs10: ['', Validators.required],
      vafcs11: ['', Validators.required],
      vafcs12: ['', Validators.required],
      vafcs13: ['', Validators.required],
      vafcs14: ['', Validators.required],
      vafcs15: ['.'],
      vafcs16: ['', Validators.required],
      vafcs17: ['', Validators.required],
      vafcs18: ['', Validators.required],
      vafcs19: ['', Validators.required],
      vafcs20: ['', Validators.required],
      vafcs21: ['.'],
      vafcancer_opc: ['',Validators.required],
      vafcancer_var: [''],
      vafhiper_arte_opc: ['',Validators.required],
      vafhiper_arte_var: [''],
      vafasma_opc: ['',Validators.required],
      vafasma_var: [''],
      vafcardio_opc: ['',Validators.required],
      vafcardio_var: [''],
      vafdiabet_opc: ['',Validators.required],
      vafdiabet_var: [''],
      vafalergia_opc: ['',Validators.required],
      vafalergia_var: [''],
      vafartritis_opc: ['',Validators.required],
      vafartritis_var: [''],
      vafem_opc: ['',Validators.required],
      vafem_var: [''],
      vafer_opc: ['',Validators.required],
      vafer_var: [''],
      vafmujer40_opc: [''],
      vafmujer40_var: ['.'],
      vafhombre40_opc: [''],
      vafhombre40_var: ['.'],
      vafdiscapacidad_opc: ['', Validators.required],
      vafdiscapacidad_var: ['.'],
      vaf_familiap01_opc: ['', Validators.required],
      vaf_familiap02_opc: ['', Validators.required],
      vaf_familia_num: [''],
      vaf_actifisip01_opc: ['', Validators.required],
      vaf_actifisip02_opc: ['', Validators.required],
      vaf_actifisi_num: [''],
      vaf_nutricionp01_opc: ['', Validators.required],
      vaf_nutricionp02_opc: ['', Validators.required],
      vaf_nutricionp03_opc: ['', Validators.required],
      vaf_nutricionp03_var: ['.'],
      vaf_tabacop01_opc: ['', Validators.required],
      vaf_tabacop02_opc: ['', Validators.required],
      vaf_tabacop02_var: ['.'],
      vaf_alcoholp01_opc: ['', Validators.required],
      vaf_alcoholp02_opc: ['', Validators.required],
      vaf_alcoholp03_opc: ['', Validators.required],
      vaf_suenop01_opc: ['', Validators.required],
      vaf_suenop02_opc: ['', Validators.required],
      vaf_suenop03_opc: ['', Validators.required],
      vaf_tipop01_opc: ['', Validators.required],
      vaf_tipop02_opc: ['', Validators.required],
      vaf_introspep01_opc: ['', Validators.required],
      vaf_introspep02_opc: ['', Validators.required],
      vaf_introspep03_opc: ['', Validators.required],
      vaf_condup01_opc: ['', Validators.required],
      vaf_condup02_opc: ['', Validators.required],
      vaf_otrasdp01_opc:['', Validators.required],
      vaf_otrasdp02_opc: ['', Validators.required],
      vaf_otrasdp03_opc: ['', Validators.required],
      vaf_nutricion_num: [''],
      vaf_tabaco_num: [''],
      vaf_alcohol_num: [''],
      vaf_sueno_num: [''],
      vaf_tipo_num: [''],
      vaf_introspe_num: [''],
      vaf_condu_num: [''],
      vaf_otrasd_num: [''],
      vaf_fantastico_total: [''],
      vafAF_p01: ['', Validators.required],
      vafAF_p02: ['', Validators.required]
    });
  }
 /*Función que valida la Ecuación  Cardio Respiratoria, 
    según el resultado propuesto se le asignara un icono */
    validCardioRes(){

      this.totalCR = 0;
      this.imagenIcon1 = '';
      this.msjCR = '';
      this.imgValid1 = true;
      this.validMsj = false;
      var p0:number = 0;
      var p1:number = 0;
      var p2:number = 0;
      p0 = Number(this.userform.value.vafp0);
      p1 = Number(this.userform.value.vafp1);
      p2 = Number(this.userform.value.vafp2);
  
      if (this.userform.value.vafp0 !== '' && p0 < 500 && 
          this.userform.value.vafp1 !== '' && p1 < 500 && 
          this.userform.value.vafp2 !== '' && p2 < 500) {
  
          this.totalCR = ((p0 + p1 + p2) - 200) / 10;
          
          if(this.totalCR < 0 || this.totalCR > 20){
            this.imgValid1 = false;
            return;
          }else{
            this.validMsj = true;
          }
          
          if (this.totalCR === 0) {
            this.msjCR = '"(CV) Excelente (Propio de Atletas)."';
            this.colorMsj = '#1bba00';
            this.imagenIcon1 = 'https://gelainbienestarlaboral.com/GELAIN/img/Excelente.png';
          }
      
          if (this.totalCR >= 0.1 && this.totalCR <= 5) {
            this.msjCR = '"(CV) Bueno."';
            this.colorMsj = '#4340ff';
            this.imagenIcon1 = 'https://gelainbienestarlaboral.com/GELAIN/img/Bueno.png';
          }
      
          if (this.totalCR >= 5.1 && this.totalCR <= 10) {
            this.msjCR = '"(CV) Medio"';
            this.colorMsj = '#eff100';
            this.imagenIcon1 = 'https://gelainbienestarlaboral.com/GELAIN/img/medio_insuf.png';
          }
      
          if (this.totalCR >= 10.1 && this.totalCR <= 15) {
            this.msjCR = '"(CV) Insuficiente"';
            this.colorMsj = '#ffb420';
            this.imagenIcon1 = 'https://gelainbienestarlaboral.com/GELAIN/img/malo2.png';
          }
      
          if (this.totalCR >= 15.1 && this.totalCR <= 20) {
            this.msjCR = '"(CV) Malo (Requiere Evalución Médica)."';
            this.colorMsj = '#ff220b';
            this.imagenIcon1 = 'https://gelainbienestarlaboral.com/GELAIN/img/malo.png';
          }
      }else{
        this.imgValid1 = false;
      }
  
    }
  
    validCS(){
      this.tempValorF = this.userform.value;
      
      if (this.tempValorF.vafcancer_opc === 1 &&  this.tempValorF.vafcancer_var !== '') {
        this.tempValorF.vafcancer_var = this.tempValorF.vafcancer_var.join(';'); 
      }else{
        this.tempValorF.vafcancer_var = '.';
      }
  
      if (this.tempValorF.vafhiper_arte_opc === 1 && this.tempValorF.vafhiper_arte_var !== ''){
        this.tempValorF.vafhiper_arte_var = this.tempValorF.vafhiper_arte_var.join(';'); 
      }else{
        this.tempValorF.vafhiper_arte_var = '.';
      }
      
      if (this.tempValorF.vafasma_opc === 1 && this.tempValorF.vafasma_var !== ''){
        this.tempValorF.vafasma_var = this.tempValorF.vafasma_var.join(';'); 
      }else{
        this.tempValorF.vafasma_var = '.';
      }
      
      if (this.tempValorF.vafcardio_opc === 1 && this.tempValorF.vafcardio_var !== ''){
        this.tempValorF.vafcardio_var = this.tempValorF.vafcardio_var.join(';'); 
      }else{
        this.tempValorF.vafcardio_var = '.';
      }
  
      if (this.tempValorF.vafdiabet_opc === 1 && this.tempValorF.vafdiabet_var !== ''){
        this.tempValorF.vafdiabet_var = this.tempValorF.vafdiabet_var.join(';'); 
      }else{
        this.tempValorF.vafdiabet_var = '.';
      }
  
      if (this.tempValorF.vafalergia_opc === 1 && this.tempValorF.vafalergia_var !== ''){
        this.tempValorF.vafalergia_var = this.tempValorF.vafalergia_var.join(';'); 
      }else{
        this.tempValorF.vafalergia_var = '.';
      }
  
      if (this.tempValorF.vafartritis_opc === 1 && this.tempValorF.vafartritis_var !== ''){
        this.tempValorF.vafartritis_var = this.tempValorF.vafartritis_var.join(';'); 
      }else{
        this.tempValorF.vafartritis_var = '.';
      }
  
      if (this.tempValorF.vafem_opc === 1 && this.tempValorF.vafem_var !== ''){
        this.tempValorF.vafem_var = this.tempValorF.vafem_var.join(';'); 
      }else{
        this.tempValorF.vafem_var = '.';
      }
  
      if (this.tempValorF.vafer_opc === 1 && this.tempValorF.vafer_var !== ''){
        this.tempValorF.vafer_var = this.tempValorF.vafer_var.join(';'); 
      }else{
        this.tempValorF.vafer_var = '.';
      }
  
    }

async onSubmit(){

  if(this.userform.valid){

    this.validCS();

      await this.vfService.createvalorFisico(this.tempValorF).toPromise().then((data:any)=>{
        if(data){
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'El registro se ha creado exitosamente', life: 5000});
        }
        setTimeout(() => {
          this.limpiarForm();
        }, 1000);
      }, err => {
        console.log(err);
        this._messageService.add({severity: 'error',summary: 'Fallido',detail: 'Surgio un error al crear el registro', life: 5000});
      });

  }else{
    this._messageService.add({severity: 'error',summary: 'fallido',detail: 'Surgio un error', life: 3000});
  }

}

limpiarForm(){
  this.userform.reset();
  this.cancelar();
}

  fnSumatoriaFamiliaTF(){
    /*Familia y Amigos */
    if(this.userform.value.vaf_familiap01_opc !== '' &&  this.userform.value.vaf_familiap02_opc !== ''){
      let familia_total:number = 0;
      familia_total = this.userform.value.vaf_familiap01_opc + this.userform.value.vaf_familiap02_opc;
      this.userform.patchValue({
        vaf_familia_num: familia_total
      });
    }
    this.fnSumatoriaTotal();
  }

  fnSumatoriaActividadTF(){
    /*Actividad Física */
    if(this.userform.value.vaf_actifisip01_opc !== '' &&  this.userform.value.vaf_actifisip02_opc !== ''){
      let actividad_total:number = 0;
      actividad_total = this.userform.value.vaf_actifisip01_opc + this.userform.value.vaf_actifisip02_opc;
      this.userform.patchValue({
        vaf_actifisi_num: actividad_total
      });
    }
    this.fnSumatoriaTotal();
  }

  fnSumatoriaNutricionTF(){
    /*Nutrición */
    if(this.userform.value.vaf_nutricionp01_opc !== '' &&  this.userform.value.vaf_nutricionp02_opc !== '' &&  this.userform.value.vaf_nutricionp03_opc !== '' ){
      let nutricion_total:number = 0;
      nutricion_total = this.userform.value.vaf_nutricionp01_opc + this.userform.value.vaf_nutricionp02_opc + this.userform.value.vaf_nutricionp03_opc;
      this.userform.patchValue({
        vaf_nutricion_num: nutricion_total
      });
    }
    this.fnSumatoriaTotal();
  }

  fnSumatoriaTabacoTF(){
    /*Tabaco */
    if(this.userform.value.vaf_tabacop01_opc !== '' &&  this.userform.value.vaf_tabacop02_opc !== ''){
      let tabaco_total:number = 0;
      tabaco_total = this.userform.value.vaf_tabacop01_opc + this.userform.value.vaf_tabacop02_opc;
      this.userform.patchValue({
        vaf_tabaco_num: tabaco_total
      });
    }
  }

  fnSumatoriaAlcoholTF(){
    /*Alcohol */
    if(this.userform.value.vaf_alcoholp01_opc !== '' &&  this.userform.value.vaf_alcoholp02_opc !== '' &&  this.userform.value.vaf_alcoholp03_opc !== ''){
      let alcohol_total:number = 0;
      alcohol_total = this.userform.value.vaf_alcoholp01_opc + this.userform.value.vaf_alcoholp02_opc + this.userform.value.vaf_alcoholp03_opc;
      this.userform.patchValue({
        vaf_alcohol_num: alcohol_total
      });
    }
    this.fnSumatoriaTotal();
  }

  fnSumatoriaSuenoTF(){
    /*Sueño y Estrés */
    if(this.userform.value.vaf_suenop01_opc !== '' &&  this.userform.value.vaf_suenop02_opc !== '' &&  this.userform.value.vaf_suenop03_opc !== ''){
      let sueno_total:number = 0;
      sueno_total = this.userform.value.vaf_suenop01_opc + this.userform.value.vaf_suenop02_opc + this.userform.value.vaf_suenop03_opc;
      this.userform.patchValue({
        vaf_sueno_num: sueno_total
      });
    }
    this.fnSumatoriaTotal();
  }

  fnSumatoriaTipoTF(){
    /*Tipo Personalidad */
    if(this.userform.value.vaf_tipop01_opc !== '' &&  this.userform.value.vaf_tipop02_opc !== ''){
      let tipo_total:number = 0;
      tipo_total = this.userform.value.vaf_tipop01_opc + this.userform.value.vaf_tipop02_opc;
      this.userform.patchValue({
        vaf_tipo_num: tipo_total
      });
    }
    this.fnSumatoriaTotal();
  }

  fnSumatoriaIntrospeTF(){
    /*Introspección */
    if(this.userform.value.vaf_introspep01_opc !== '' &&  this.userform.value.vaf_introspep02_opc !== '' &&  this.userform.value.vaf_introspep03_opc !== ''){
      let introspe_total:number = 0;
      introspe_total = this.userform.value.vaf_introspep01_opc + this.userform.value.vaf_introspep02_opc + this.userform.value.vaf_introspep03_opc;
      this.userform.patchValue({
        vaf_introspe_num: introspe_total
      });
    }
    this.fnSumatoriaTotal();
  }

  fnSumatoriaConduccionTF(){
    /*Conducción Trabajo*/
    if(this.userform.value.vaf_condup01_opc !== '' &&  this.userform.value.vaf_condup02_opc !== ''){
      let conduccion_total:number = 0;
      conduccion_total = this.userform.value.vaf_condup01_opc + this.userform.value.vaf_condup02_opc;
      this.userform.patchValue({
        vaf_condu_num: conduccion_total
      });
    }
    this.fnSumatoriaTotal();
  }

  fnSumatoriaOtrasDTF(){
    /*Otras Drogas*/
    if(this.userform.value.vaf_otrasdp01_opc !== '' &&  this.userform.value.vaf_otrasdp02_opc !== '' &&  this.userform.value.vaf_otrasdp03_opc !== ''){
      let otrasd_total:number = 0;
      otrasd_total = this.userform.value.vaf_otrasdp01_opc + this.userform.value.vaf_otrasdp02_opc + this.userform.value.vaf_otrasdp03_opc;
      this.userform.patchValue({
        vaf_otrasd_num: otrasd_total
      });
    }
    this.fnSumatoriaTotal();
  }

  fnSumatoriaTotal(){
    var total:number = 0;
    var value:number = 0;
    this.userform.value.vaf_fantastico_total = 0;

    if (this.userform.value.vaf_familia_num !== '' &&
        this.userform.value.vaf_actifisi_num  !== '' &&
        this.userform.value.vaf_nutricion_num !== '' &&
        this.userform.value.vaf_tabaco_num !== '' &&
        this.userform.value.vaf_alcohol_num !== '' &&
        this.userform.value.vaf_sueno_num !== '' &&
        this.userform.value.vaf_tipo_num !== '' &&
        this.userform.value.vaf_introspe_num !== '' &&
        this.userform.value.vaf_condu_num !== '' &&
        this.userform.value.vaf_otrasd_num !== '') {

      total = Number(this.userform.value.vaf_familia_num) + 
              Number(this.userform.value.vaf_actifisi_num) +
              Number(this.userform.value.vaf_nutricion_num) +
              Number(this.userform.value.vaf_tabaco_num) +
              Number(this.userform.value.vaf_alcohol_num) +
              Number(this.userform.value.vaf_sueno_num) +
              Number(this.userform.value.vaf_tipo_num) +
              Number(this.userform.value.vaf_introspe_num) +
              Number(this.userform.value.vaf_condu_num) +
              Number(this.userform.value.vaf_otrasd_num); 
    }
    
    if (total === 0) {
      this.userform.patchValue({
        vaf_fantastico_total: 0
      });
    }else{
      total = total * 2;
      this.userform.patchValue({
        vaf_fantastico_total: total
      });
      value = this.userform.value.vaf_fantastico_total;
      this.validEstado(value);
    }
  }

  fnFormulaIMC(){
    var imc:number = 0;
    var num:number = 0;
    var denom:number = 0;
    if (this.userform.value.vafpeso !== "" && this.userform.value.vaftalla !== "") {
      num =  Math.abs(this.userform.value.vafpeso);
      denom = Math.pow(Math.abs(this.userform.value.vaftalla),2);
      imc = num / denom;
      this.userform.patchValue({
        vafimc:imc
      })
    }
  }

  validEstado(value:number){
    this.imagenIcon = '';
    this.imgValid = true;
    this.colorMsj1 = '';

    if( value > 0  && value <= 46){
      this.respEstado = '"Estas en zona de peligro"';
      this.colorMsj1 = '#ff0000';
      this.imagenIcon = 'https://gelainbienestarlaboral.com/GELAIN/img/malo.png';
    }
    if( value > 47 && value <= 72){
      this.respEstado = '"Algo bajo, podrías mejorar"';
      this.colorMsj1 = '#ff8000';
      this.imagenIcon = 'https://gelainbienestarlaboral.com/GELAIN/img/medio_insuf.png';
    }
    if( value > 73 && value <= 84){
      this.respEstado = '"Adecuado, estas bien"';
      this.colorMsj1 = '#0000ff';
      this.imagenIcon = 'https://gelainbienestarlaboral.com/GELAIN/img/Bueno.png';
    }
    if( value > 85 && value <= 100){
      this.respEstado = '"Buen trabajo, estas en el camino correcto"';
      this.colorMsj1 = '#16520a';
      this.imagenIcon = 'https://gelainbienestarlaboral.com/GELAIN/img/Excelente.png';
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

  async buscarArea(){

    let id:number =  0;
  
    id = this.userform.value.vafidempresa;
    
    this.area =[];
    await this.areasServices.buscarByArea(id).toPromise().then((data:any)=>{
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
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado" ],
      dayNamesShort: [ "Dom","Lun","Mar","Mié","Jue","Vie","Sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
      monthNamesShort: [ "Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    }

    this.arrFamSelect = [
      { label: "Mamá", value: "Mamá" },
      { label: "Papá", value: "Papá" },
      { label: "Tíos", value: "Tíos" },
      { label: "Abuelos", value: "Abuelos" },
      { label: "Primos", value: "Primos" },
      { label: "Hermanos", value: "Hermanos" }
    ];
    this.sexo.push({ label: 'Sexo', value: ''},
                  { label: 'Masculino', value: 'M' },
                  { label: 'Femenino', value: 'F' });

    this.selectvafc0.push({ label: 'Seleccione una opción', value: '.'},
                          { label: 'No.', value: '0' },
                          { label: 'Si.', value: '1' });

    this.selectvafc1.push({ label: 'Seleccione una opción', value: ''},
                          { label: 'No.', value: 0 },
                          { label: 'Si.', value: 1 });

    this.selectvafc2.push({ label: 'Seleccione una opción', value: ''},
                          { label: 'Casi siempre.', value: 2 },
                          { label: 'A veces.', value: 1 },
                          { label: 'Casi nunca.', value: 0 });

    this.selectvafc3.push({ label: 'Seleccione una opción', value: ''},
                          { label: '4 o más veces por semana.', value: 2 },
                          { label: '1 a 3 veces por semana.', value: 1 },
                          { label: 'Menos de 1 vez por semana.', value: 0 });
                        
  this.selectvafc4.push( { label: 'Seleccione una opción', value: ''},
                          { label: 'Ninguna de estas.', value: 2 },
                          { label: 'Algunas de estas.', value: 1 },
                          { label: 'Todas estas.', value: 0 }); 

  this.selectvafc5.push( { label: 'Seleccione una opción', value: ''},
                          { label: 'Normal o hasta 4 kilos de más.', value: 2 },
                          { label: '5 a 8 kilos  de más.', value: 1 },
                          { label: 'Más de 8 kilos.', value: 0 });

  this.selectvafc6.push( { label: 'Seleccione una opción', value: ''},
                          { label: 'No en los últimos 5 años.', value: 2 },
                          { label: 'No en el último año.', value: 1 },
                          { label: 'He fumado en este año.', value: 0 });

  this.selectvafc7.push( { label: 'Seleccione una opción', value: ''},
                          { label: 'Ninguno.', value: 2 },
                          { label: '0 a 10.', value: 1 },
                          { label: 'Más de 10.', value: 0 });

  this.selectvafc8.push( { label: 'Seleccione una opción', value: ''},
                          { label: '0 a 7 tragos.', value: 2 },
                          { label: '8 a 12 tragos.', value: 1 },
                          { label: 'Más de 12 tragos.', value: 0 });

  this.selectvafc9.push( { label: 'Seleccione una opción', value: ''},
                          { label: 'Nunca.', value: 2 },
                          { label: 'Ocasionalmente.', value: 1 },
                          { label: 'A menudo.', value: 0 });


  this.selectvafc10.push( { label: 'Seleccione una opción', value: ''},
                          { label: 'Nunca.', value: 2 },
                          { label: 'Solo  rara vez.', value: 1 },
                          { label: 'A menudo.', value: 0 });

  this.selectvafc11.push( { label: 'Seleccione una opción', value: ''},
                          { label: 'Casi nunca.', value: 2 },
                          { label: 'Algunas veces.', value: 1 },
                          { label: 'A menudo.', value: 0 });

  this.selectvafc12.push( { label: 'Seleccione una opción', value: ''},
                          { label: 'Siempre.', value: 2 },
                          { label: 'A veces.', value: 1 },
                          { label: 'A menudo.', value: 0 });

  this.selectvafc13.push( { label: 'Seleccione una opción', value: ''},
                          { label: 'Menos de 3 por día.', value: 2 },
                          { label: '3 a 6 por día.', value: 1 },
                          { label: 'Más de 6 por día.', value: 0 });


  this.selectvafc14.push({ label: 'Seleccione una opción', value: ''},
                          { label: 'No.', value: 0 },
                          { label: 'Si.', value: 1 },
                          { label: 'No Sabe.', value: 2 });
  
  this.selectvafc15.push({ label: 'Seleccione una opción', value: ''},
                         { label: 'Casi siempre.', value: 2 },
                         { label: 'A veces.', value: 1 },
                         { label: 'Casi nunca.', value: 0 },
                         { label: 'No Aplica.', value: 2 });

  this.selectvafc16.push({ label: 'Seleccione una opción', value: ''},
                         { label: 'No.', value: 0 },
                         { label: 'Si.', value: 1 },
                         { label: 'No Aplica.', value: 2 });

  }

  cancelar(){
    window.open('https://www.google.com','_self');
  }

  changeSexo(){
    if (this.userform.value.vafsexo === 'F') {
      this.validSexoFem = true;
      this.validSexoMas = false;
      this.userform.patchValue({
        vafhombre40_opc: "",
        vafhombre40_var: "."
      });
    }else{
      this.validSexoMas = true;
      this.validSexoFem = false;
      this.userform.patchValue({
        vafmujer40_opc: "",
        vafmujer40_var: ".",
      });
    }
  }

}
