import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup,FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Empresa } from '../../models/empresa.model';
import { Area } from '../../models/area.model';
import { ValorFisico } from '../../models/valorFisico.model';
import { ValoracionFisicaService } from 'src/app/services/valoracion-fisica.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { AreasService } from 'src/app/services/areas.service';



@Component({
  selector: 'app-form-prueba',
  templateUrl: './formValorFisico.component.html',
  styleUrls: ['./formValorFisico.component.css']
})
export class FormValorFisicoComponent implements OnInit {
  userform: FormGroup;
  empresa: SelectItem[] = [];
  empresas: Empresa[] = [];
  area: SelectItem[] = [];
  areas: Area[] = [];
  localPrueba: ValorFisico = {};
  tempValorF: ValorFisico = {};
  sexo: SelectItem[] = [];
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
  idEmpresa:number;
 
  
  constructor(private areasServices: AreasService,
              private empresaServices: EmpresaService,
              private vfService: ValoracionFisicaService,
              private fb: FormBuilder,
              private router: Router,
              private _messageService: MessageService) { 
                this.idEmpresa = Number(localStorage.getItem("idEmpresa"));
    
  }

  async ngOnInit() {
    this.localPrueba = JSON.parse(localStorage.getItem('valorFisico'));
    this.formulario();
    this.selectData();
    await this.empresaServices.getEmpresa().toPromise().then((data:any)=>{
      this.empresas = data;
      this.empresas.map(x=>{
        this.empresa.push({
          label:x.empnombre,
          value: x.empid
        }); 
      });
    });

    this.arrFamSelect = [
      { label: "Mamá", value: "Mamá" },
      { label: "Papá", value: "Papá" },
      { label: "Tíos", value: "Tíos" },
      { label: "Abuelos", value: "Abuelos" },
      { label: "Primos", value: "Primos" },
      { label: "Hermanos", value: "Hermanos" }
    ];
    
    if(this.localPrueba !== null){
      
      this.userform.patchValue({
        vafidempresa:this.localPrueba.vafidempresa,
        vafidarea:this.localPrueba.vafidarea,
        vafidnombre:this.localPrueba.vafidnombre,
        vafsede:this.localPrueba.vafsede,
        vafpeso:this.localPrueba.vafpeso,
        vaftalla:this.localPrueba.vaftalla,
        vafimc:this.localPrueba.vafimc,
        vafperimetro:this.localPrueba.vafperimetro,
        vafp0:this.localPrueba.vafp0,
        vafp1:this.localPrueba.vafp1,
        vafp2:this.localPrueba.vafp2,
        vaftestbiering:this.localPrueba.vaftestbiering,
        vaftestpuenteder:this.localPrueba.vaftestpuenteder,
        vaftestpuenteizq:this.localPrueba.vaftestpuenteizq,
        vaftestresistronco:this.localPrueba.vaftestresistronco,
        vaftestflextronco:this.localPrueba.vaftestflextronco,
        vaftestmovhombder:this.localPrueba.vaftestmovhombder,
        vaftestmovhombizq:this.localPrueba.vaftestmovhombizq,
        vaftestmovartichomb:this.localPrueba.vaftestmovartichomb,
        vafobservaciones:this.localPrueba.vafobservaciones,
        vafcedula:this.localPrueba.vafcedula,
        vafsexo: this.localPrueba.vafsexo,
        vafgruposanguineo: this.localPrueba.vafgruposanguineo,
        vafrh: this.localPrueba.vafrh,
        vaftelefono: this.localPrueba.vaftelefono,
        vafciudad: this.localPrueba.vafciudad,
        vafedad: this.localPrueba.vafedad,
        vafcorreo: this.localPrueba.vafcorreo,
        vafcargo: this.localPrueba.vafcargo,
        vaffecha: this.localPrueba.vaffecha,
        vafcs01: this.localPrueba.vafcs01,
        vafcs02: this.localPrueba.vafcs02,
        vafcs03: this.localPrueba.vafcs03,
        vafcs04: this.localPrueba.vafcs04,
        vafcs05: this.localPrueba.vafcs05,
        vafcs06: this.localPrueba.vafcs06,
        vafcs07: this.localPrueba.vafcs07,
        vafcs08: this.localPrueba.vafcs08,
        vafcs09: this.localPrueba.vafcs09,
        vafcs10: this.localPrueba.vafcs10,
        vafcs11: this.localPrueba.vafcs11,
        vafcs12: this.localPrueba.vafcs12,
        vafcs13: this.localPrueba.vafcs13,
        vafcs14: this.localPrueba.vafcs14,
        vafcs15: this.localPrueba.vafcs15,
        vafcs16: this.localPrueba.vafcs16,
        vafcs17: this.localPrueba.vafcs17,
        vafcs18: this.localPrueba.vafcs18,
        vafcs19: this.localPrueba.vafcs19,
        vafcs20: this.localPrueba.vafcs20,
        vafcs21: this.localPrueba.vafcs21,
        vafcancer_opc: this.localPrueba.vafcancer_opc,
        vafcancer_var: this.localPrueba.vafcancer_var,
        vafhiper_arte_opc: this.localPrueba.vafhiper_arte_opc,
        vafhiper_arte_var: this.localPrueba.vafhiper_arte_var,
        vafasma_opc: this.localPrueba.vafasma_opc,
        vafasma_var: this.localPrueba.vafasma_var,
        vafcardio_opc: this.localPrueba.vafcardio_opc,
        vafcardio_var: this.localPrueba.vafcardio_var,
        vafdiabet_opc: this.localPrueba.vafdiabet_opc,
        vafdiabet_var: this.localPrueba.vafdiabet_var,
        vafalergia_opc: this.localPrueba.vafalergia_opc,
        vafalergia_var: this.localPrueba.vafalergia_var,
        vafartritis_opc: this.localPrueba.vafartritis_opc,
        vafartritis_var: this.localPrueba.vafartritis_var,
        vafem_opc: this.localPrueba.vafem_opc,
        vafem_var: this.localPrueba.vafem_var,
        vafer_opc: this.localPrueba.vafer_opc,
        vafer_var: this.localPrueba.vafer_var,
        vafmujer40_opc: this.localPrueba.vafmujer40_opc,
        vafmujer40_var: this.localPrueba.vafmujer40_var,
        vafhombre40_opc: this.localPrueba.vafhombre40_opc,
        vafhombre40_var: this.localPrueba.vafhombre40_var,
        vafdiscapacidad_opc: this.localPrueba.vafdiscapacidad_opc,
        vafdiscapacidad_var: this.localPrueba.vafdiscapacidad_var,
        vaf_familiap01_opc: this.localPrueba.vaf_familiap01_opc,
        vaf_familiap02_opc: this.localPrueba.vaf_familiap02_opc,
        vaf_familia_num: this.localPrueba.vaf_familia_num,
        vaf_actifisip01_opc: this.localPrueba.vaf_actifisip01_opc,
        vaf_actifisip02_opc: this.localPrueba.vaf_actifisip02_opc,
        vaf_actifisi_num: this.localPrueba.vaf_actifisi_num,
        vaf_nutricionp01_opc: this.localPrueba.vaf_nutricionp01_opc,
        vaf_nutricionp02_opc: this.localPrueba.vaf_nutricionp02_opc,
        vaf_nutricionp03_opc: this.localPrueba.vaf_nutricionp03_opc,
        vaf_nutricionp03_var: this.localPrueba.vaf_nutricionp03_var,
        vaf_tabacop01_opc: this.localPrueba.vaf_tabacop01_opc,
        vaf_tabacop02_opc: this.localPrueba.vaf_tabacop02_opc,
        vaf_tabacop02_var: this.localPrueba.vaf_tabacop02_var,
        vaf_alcoholp01_opc: this.localPrueba.vaf_alcoholp01_opc,
        vaf_alcoholp02_opc: this.localPrueba.vaf_alcoholp02_opc,
        vaf_alcoholp03_opc: this.localPrueba.vaf_alcoholp03_opc,
        vaf_suenop01_opc: this.localPrueba.vaf_suenop01_opc,
        vaf_suenop02_opc: this.localPrueba.vaf_suenop02_opc,
        vaf_suenop03_opc: this.localPrueba.vaf_suenop03_opc,
        vaf_tipop01_opc: this.localPrueba.vaf_tipop01_opc,
        vaf_tipop02_opc: this.localPrueba.vaf_tipop02_opc,
        vaf_introspep01_opc: this.localPrueba.vaf_introspep01_opc,
        vaf_introspep02_opc: this.localPrueba.vaf_introspep02_opc,
        vaf_introspep03_opc: this.localPrueba.vaf_introspep03_opc,
        vaf_condup01_opc: this.localPrueba.vaf_condup01_opc,
        vaf_condup02_opc: this.localPrueba.vaf_condup02_opc,
        vaf_otrasdp01_opc: this.localPrueba.vaf_otrasdp01_opc,
        vaf_otrasdp02_opc: this.localPrueba.vaf_otrasdp02_opc,
        vaf_otrasdp03_opc: this.localPrueba.vaf_otrasdp03_opc,
        vaf_nutricion_num: this.localPrueba.vaf_nutricion_num,
        vaf_tabaco_num: this.localPrueba.vaf_tabaco_num,
        vaf_alcohol_num: this.localPrueba.vaf_alcohol_num,
        vaf_sueno_num: this.localPrueba.vaf_sueno_num,
        vaf_tipo_num: this.localPrueba.vaf_tipo_num,
        vaf_introspe_num: this.localPrueba.vaf_introspe_num,
        vaf_condu_num: this.localPrueba.vaf_condu_num,
        vaf_otrasd_num: this.localPrueba.vaf_otrasd_num,
        vaf_fantastico_total: this.localPrueba.vaf_fantastico_total
      });
    } 
  }
  /*Apartado de Validaciones */
  get vafidempresa() {
    return this.userform.get('vafidempresa').invalid && this.userform.get('vafidempresa').touched
  }
  get vafidarea() {
    return this.userform.get('vafidarea').invalid && this.userform.get('vafidarea').touched
  }
  get vafidnombre() {
    return this.userform.get('vafidnombre').invalid && this.userform.get('vafidnombre').touched
  }
  get vafsede() {
    return this.userform.get('vafsede').invalid && this.userform.get('vafsede').touched
  }
  get vafpeso() {
    return this.userform.get('vafpeso').invalid && this.userform.get('vafpeso').touched
  }
  get vaftalla() {
    return this.userform.get('vaftalla').invalid && this.userform.get('vaftalla').touched
  }
  get vafimc() {
    return this.userform.get('vafimc').invalid && this.userform.get('vafimc').touched
  }
  get vafperimetro() {
    return this.userform.get('vafperimetro').invalid && this.userform.get('vafperimetro').touched
  }
  get vafp0() {
    return this.userform.get('vafp0').invalid && this.userform.get('vafp0').touched
  }
  get vafp1() {
    return this.userform.get('vafp1').invalid && this.userform.get('vafp1').touched
  }
  get vafp2() {
    return this.userform.get('vafp2').invalid && this.userform.get('vafp2').touched
  }
  get vaftestbiering() {
    return this.userform.get('vaftestbiering').invalid && this.userform.get('vaftestbiering').touched
  }
  get vaftestpuenteder() {
    return this.userform.get('vaftestpuenteder').invalid && this.userform.get('vaftestpuenteder').touched
  }
  get vaftestpuenteizq() {
    return this.userform.get('vaftestpuenteizq').invalid && this.userform.get('vaftestpuenteizq').touched
  }
  get vaftestresistronco() {
    return this.userform.get('vaftestresistronco').invalid && this.userform.get('vaftestresistronco').touched
  }
  get vaftestflextronco() {
    return this.userform.get('vaftestflextronco').invalid && this.userform.get('vaftestflextronco').touched
  }
  get vaftestmovhombder() {
    return this.userform.get('vaftestmovhombder').invalid && this.userform.get('vaftestmovhombder').touched
  }
  get vaftestmovhombizq() {
    return this.userform.get('vaftestmovhombizq').invalid && this.userform.get('vaftestmovhombizq').touched
  }
  get vaftestmovartichomb() {
    return this.userform.get('vaftestmovartichomb').invalid && this.userform.get('vaftestmovartichomb').touched
  }
  get vafobservaciones() {
    return this.userform.get('vafobservaciones').invalid && this.userform.get('vafobservaciones').touched
  }
  get vafcedula() {
    return this.userform.get('vafcedula').invalid && this.userform.get('vafcedula').touched
  }

  get vafSexoValid() {
    return this.userform.get('vafsexo').invalid && this.userform.get('vafsexo').touched
  }

  get vafGrupoSanguineoValid() {
    return this.userform.get('vafgruposanguineo').invalid && this.userform.get('vafgruposanguineo').touched
  }

  get vafRHValid() {
    return this.userform.get('vafrh').invalid && this.userform.get('vafrh').touched
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
    return this.userform.get('vaffecha').invalid && this.userform.get('vaffecha').touched
  }

  get vafCargoValid() {
    return this.userform.get('vafcargo').invalid && this.userform.get('vafcargo').touched
  }

  get vafcs01Valid() {
    return this.userform.get('vafcs01').invalid && this.userform.get('vafcs01').touched
  }

  get vafcs02Valid() {
    return this.userform.get('vafcs02').invalid && this.userform.get('vafcs02').touched
  }

  get vafcs03Valid() {
    return this.userform.get('vafcs03').invalid && this.userform.get('vafcs03').touched
  }

  get vafcs04Valid() {
    return this.userform.get('vafcs04').invalid && this.userform.get('vafcs04').touched
  }

  get vafcs05Valid() {
    return this.userform.get('vafcs05').invalid && this.userform.get('vafcs05').touched
  }

  get vafcs06Valid() {
    return this.userform.get('vafcs06').invalid && this.userform.get('vafcs06').touched
  }

  get vafcs07Valid() {
    return this.userform.get('vafcs07').invalid && this.userform.get('vafcs07').touched
  }

  get vafcs08Valid() {
    return this.userform.get('vafcs08').invalid && this.userform.get('vafcs08').touched
  }

  get vafcs09Valid() {
    return this.userform.get('vafcs09').invalid && this.userform.get('vafcs09').touched
  }

  get vafcs10Valid() {
    return this.userform.get('vafcs10').invalid && this.userform.get('vafcs10').touched
  }

  get vafcs11Valid() {
    return this.userform.get('vafcs11').invalid && this.userform.get('vafcs11').touched
  }

  get vafcs12Valid() {
    return this.userform.get('vafcs12').invalid && this.userform.get('vafcs12').touched
  }

  get vafcs13Valid() {
    return this.userform.get('vafcs13').invalid && this.userform.get('vafcs13').touched
  }

  get vafcs14Valid() {
    return this.userform.get('vafcs14').invalid && this.userform.get('vafcs14').touched
  }

  get vafcs16Valid() {
    return this.userform.get('vafcs16').invalid && this.userform.get('vafcs16').touched
  }

  get vafcs17Valid() {
    return this.userform.get('vafcs17').invalid && this.userform.get('vafcs17').touched
  }

  get vafcs18Valid() {
    return this.userform.get('vafcs18').invalid && this.userform.get('vafcs18').touched
  }

  get vafcs19Valid() {
    return this.userform.get('vafcs19').invalid && this.userform.get('vafcs19').touched
  }

  get vafcs20Valid() {
    return this.userform.get('vafcs20').invalid && this.userform.get('vafcs20').touched
  }

  get vafcancer_opcValid() {
    return this.userform.get('vafcancer_opc').invalid && this.userform.get('vafcancer_opc').touched
  }

  get vafhiper_arte_opcValid() {
    return this.userform.get('vafhiper_arte_opc').invalid && this.userform.get('vafhiper_arte_opc').touched
  }

  get vafasma_opcValid() {
    return this.userform.get('vafasma_opc').invalid && this.userform.get('vafasma_opc').touched
  }

  get vafcardio_opcValid() {
    return this.userform.get('vafcardio_opc').invalid && this.userform.get('vafcardio_opc').touched
  }

  get vafdiabet_opcValid() {
    return this.userform.get('vafdiabet_opc').invalid && this.userform.get('vafdiabet_opc').touched
  }

  get vafalergia_opcValid() {
    return this.userform.get('vafalergia_opc').invalid && this.userform.get('vafalergia_opc').touched
  }

  get vafartritis_opcValid() {
    return this.userform.get('vafartritis_opc').invalid && this.userform.get('vafartritis_opc').touched
  }

  get vafem_opcValid() {
    return this.userform.get('vafem_opc').invalid && this.userform.get('vafem_opc').touched
  }

  get vafer_opcValid() {
    return this.userform.get('vafer_opc').invalid && this.userform.get('vafer_opc').touched
  }

  get vafmujer40_opcValid() {
    return this.userform.get('vafmujer40_opc').invalid && this.userform.get('vafmujer40_opc').touched
  }

  get vafhombre40_opcValid() {
    return this.userform.get('vafhombre40_opc').invalid && this.userform.get('vafhombre40_opc').touched
  }

  get vafdiscapacidad_opcValid() {
    return this.userform.get('vafdiscapacidad_opc').invalid && this.userform.get('vafdiscapacidad_opc').touched
  }

  get vaf_familiap01_opcValid() {
    return this.userform.get('vaf_familiap01_opc').invalid && this.userform.get('vaf_familiap01_opc').touched
  }

  get vaf_familiap02_opcValid() {
    return this.userform.get('vaf_familiap02_opc').invalid && this.userform.get('vaf_familiap02_opc').touched
  }

  get vaf_actifisip01_opcValid() {
    return this.userform.get('vaf_actifisip01_opc').invalid && this.userform.get('vaf_actifisip01_opc').touched
  }

  get vaf_actifisip02_opcValid() {
    return this.userform.get('vaf_actifisip02_opc').invalid && this.userform.get('vaf_actifisip02_opc').touched
  }

  get vaf_nutricionp01_opcValid() {
    return this.userform.get('vaf_nutricionp01_opc').invalid && this.userform.get('vaf_nutricionp01_opc').touched
  }

  get vaf_nutricionp02_opcValid() {
    return this.userform.get('vaf_nutricionp02_opc').invalid && this.userform.get('vaf_nutricionp02_opc').touched
  }

  get vaf_nutricionp03_opcValid() {
    return this.userform.get('vaf_nutricionp03_opc').invalid && this.userform.get('vaf_nutricionp03_opc').touched
  }

  get vaf_tabacop01_opcValid() {
    return this.userform.get('vaf_tabacop01_opc').invalid && this.userform.get('vaf_tabacop01_opc').touched
  }

  get vaf_tabacop02_opcValid() {
    return this.userform.get('vaf_tabacop02_opc').invalid && this.userform.get('vaf_tabacop02_opc').touched
  }

  get vaf_alcoholp01_opcValid() {
    return this.userform.get('vaf_alcoholp01_opc').invalid && this.userform.get('vaf_alcoholp01_opc').touched
  }

  get vaf_alcoholp02_opcValid() {
    return this.userform.get('vaf_alcoholp02_opc').invalid && this.userform.get('vaf_alcoholp02_opc').touched
  }

  get vaf_alcoholp03_opcValid() {
    return this.userform.get('vaf_alcoholp03_opc').invalid && this.userform.get('vaf_alcoholp03_opc').touched
  }

  get vaf_suenop01_opcValid() {
    return this.userform.get('vaf_suenop01_opc').invalid && this.userform.get('vaf_suenop01_opc').touched
  }

  get vaf_suenop02_opcValid() {
    return this.userform.get('vaf_suenop02_opc').invalid && this.userform.get('vaf_suenop02_opc').touched
  }

  get vaf_suenop03_opcValid() {
    return this.userform.get('vaf_suenop03_opc').invalid && this.userform.get('vaf_suenop03_opc').touched
  }

  get vaf_tipop01_opcValid() {
    return this.userform.get('vaf_tipop01_opc').invalid && this.userform.get('vaf_tipop01_opc').touched
  }

  get vaf_tipop02_opcValid() {
    return this.userform.get('vaf_tipop02_opc').invalid && this.userform.get('vaf_tipop02_opc').touched
  }

  get vaf_introspep01_opcValid() {
    return this.userform.get('vaf_introspep01_opc').invalid && this.userform.get('vaf_introspep01_opc').touched
  }

  get vaf_introspep02_opcValid() {
    return this.userform.get('vaf_introspep02_opc').invalid && this.userform.get('vaf_introspep02_opc').touched
  }

  get vaf_introspep03_opcValid() {
    return this.userform.get('vaf_introspep03_opc').invalid && this.userform.get('vaf_introspep03_opc').touched
  }

  get vaf_condup01_opcValid() {
    return this.userform.get('vaf_condup01_opc').invalid && this.userform.get('vaf_condup01_opc').touched
  }

  get vaf_condup02_opcValid() {
    return this.userform.get('vaf_condup02_opc').invalid && this.userform.get('vaf_condup02_opc').touched
  }

  get vaf_otrasdp01_opcValid() {
    return this.userform.get('vaf_otrasdp01_opc').invalid && this.userform.get('vaf_otrasdp01_opc').touched
  }

  get vaf_otrasdp02_opcValid() {
    return this.userform.get('vaf_otrasdp02_opc').invalid && this.userform.get('vaf_otrasdp02_opc').touched
  }

  get vaf_otrasdp03_opcValid() {
    return this.userform.get('vaf_otrasdp03_opc').invalid && this.userform.get('vaf_otrasdp03_opc').touched
  }

  formulario(){
    this.userform = this.fb.group({
      vafid:[''],
      vafidempresa: ['', Validators.required],
      vafidarea: ['', Validators.required],
      vafidnombre: ['', Validators.required],
      vafsede: ['', Validators.required],
      vafpeso: ['', Validators.required],
      vaftalla: ['', Validators.required],
      vafimc: ['', Validators.required],
      vafperimetro: ['', Validators.required],
      vafp0: ['', Validators.required],
      vafp1: ['', Validators.required],
      vafp2: ['', Validators.required],
      vaftestbiering: ['',  Validators.required],
      vaftestpuenteder: ['', Validators.required],
      vaftestpuenteizq: ['', Validators.required],
      vaftestresistronco: ['', Validators.required],
      vaftestflextronco: ['', Validators.required],
      vaftestmovhombder: ['', Validators.required],
      vaftestmovhombizq: ['',  Validators.required],
      vaftestmovartichomb: ['', Validators.required],
      vafobservaciones: ['', Validators.required],
      vafcedula: ['', Validators.required],
      vafsexo: ['', Validators.required],
      vafgruposanguineo: ['', Validators.required],
      vafrh: ['', Validators.required],
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
      vafcs15: [''],
      vafcs16: ['', Validators.required],
      vafcs17: ['', Validators.required],
      vafcs18: ['', Validators.required],
      vafcs19: ['', Validators.required],
      vafcs20: ['', Validators.required],
      vafcs21: [''],
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
      vafmujer40_opc: ['', Validators.required],
      vafmujer40_var: [''],
      vafhombre40_opc: ['', Validators.required],
      vafhombre40_var: [''],
      vafdiscapacidad_opc: ['', Validators.required],
      vafdiscapacidad_var: [''],
      vaf_familiap01_opc: ['', Validators.required],
      vaf_familiap02_opc: ['', Validators.required],
      vaf_familia_num: [''],
      vaf_actifisip01_opc: ['', Validators.required],
      vaf_actifisip02_opc: ['', Validators.required],
      vaf_actifisi_num: [''],
      vaf_nutricionp01_opc: ['', Validators.required],
      vaf_nutricionp02_opc: ['', Validators.required],
      vaf_nutricionp03_opc: ['', Validators.required],
      vaf_nutricionp03_var: [''],
      vaf_tabacop01_opc: ['', Validators.required],
      vaf_tabacop02_opc: ['', Validators.required],
      vaf_tabacop02_var: [''],
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
      vaf_fantastico_total: ['']
    });
  }

  validCS(){
    this.tempValorF = this.userform.value;
    
    if (this.tempValorF.vafcancer_opc === 1 &&  this.tempValorF.vafcancer_var !== '') {
      this.tempValorF.vafcancer_var = this.tempValorF.vafcancer_var.join(';'); 
    }

    if (this.tempValorF.vafhiper_arte_opc === 1 && this.tempValorF.vafhiper_arte_var !== ''){
      this.tempValorF.vafhiper_arte_var = this.tempValorF.vafhiper_arte_var.join(';'); 
    }
    
    if (this.tempValorF.vafasma_opc === 1 && this.tempValorF.vafasma_var !== ''){
      this.tempValorF.vafasma_var = this.tempValorF.vafasma_var.join(';'); 
    }
    
    if (this.tempValorF.vafcardio_opc === 1 && this.tempValorF.vafcardio_var !== ''){
      this.tempValorF.vafcardio_var = this.tempValorF.vafcardio_var.join(';'); 
    }

    if (this.tempValorF.vafdiabet_opc === 1 && this.tempValorF.vafdiabet_var !== ''){
      this.tempValorF.vafdiabet_var = this.tempValorF.vafdiabet_var.join(';'); 
    }

    if (this.tempValorF.vafalergia_opc === 1 && this.tempValorF.vafalergia_var !== ''){
      this.tempValorF.vafalergia_var = this.tempValorF.vafalergia_var.join(';'); 
    }

    if (this.tempValorF.vafartritis_opc === 1 && this.tempValorF.vafartritis_var !== ''){
      this.tempValorF.vafartritis_var = this.tempValorF.vafartritis_var.join(';'); 
    }

    if (this.tempValorF.vafem_opc === 1 && this.tempValorF.vafem_var !== ''){
      this.tempValorF.vafem_var = this.tempValorF.vafem_var.join(';'); 
    }

    if (this.tempValorF.vafer_opc === 1 && this.tempValorF.vafer_var !== ''){
      this.tempValorF.vafer_var = this.tempValorF.vafer_var.join(';'); 
    }

    console.log(this.tempValorF);
    
  }

  onSubmit(){

    if(this.userform.valid){
      

      if(this.localPrueba !== null){
        this.idd = this.localPrueba.vafid;
        this.vfService.updatevalorFisico(this.userform.value,this.idd).subscribe((data:any)=>{
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento Actualizado', life: 3000})
            this.userform.reset();
            this.router.navigate(["/main/ValorFisico"]);
        });
      }else{

        this.vfService.createvalorFisico(this.userform.value).subscribe((data:any)=>{
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento creado', life: 3000})
          this.userform.reset();
          this.router.navigate(["/main/ValorFisico"]);
        });
      }
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'surgio un error', life: 3000})
        this.userform.reset();
        this.router.navigate(["/main/ValorFisico"]);
    }

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
    if (this.userform.value.vaf_familia_num !== '' && 
        this.userform.value.vaf_actifisi_num !== '' &&
        this.userform.value.vaf_nutricion_num !== '' &&
        this.userform.value.vaf_tabaco_num !== '' &&
        this.userform.value.vaf_alcohol_num !== '' &&
        this.userform.value.vaf_sueno_num !== '' &&
        this.userform.value.vaf_tipo_num !== '' &&
        this.userform.value.vaf_introspe_num !== '' &&
        this.userform.value.vaf_condu_num !== '' &&
        this.userform.value.vaf_otrasd_num !== '') {
      
      total = this.userform.value.vaf_familia_num + 
              this.userform.value.vaf_actifisi_num +
              this.userform.value.vaf_nutricion_num +
              this.userform.value.vaf_tabaco_num +
              this.userform.value.vaf_alcohol_num +
              this.userform.value.vaf_sueno_num +
              this.userform.value.vaf_tipo_num +
              this.userform.value.vaf_introspe_num +
              this.userform.value.vaf_condu_num +
              this.userform.value.vaf_otrasd_num;
      if (total === 0) {
        this.userform.patchValue({
          vaf_fantastico_total: 0
        });
      }else{
        total = total * 2;
        this.userform.patchValue({
          vaf_fantastico_total: total
        });
      }
    }
  }

  async buscarArea(){
    const id = this.userform.value.vafidempresa;
    this.area =[];
      this.areasServices.buscarByArea(id).toPromise().then((data:any)=>{
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
    this.sexo.push({ label: 'Sexo', value: ''});
    this.sexo.push({ label: 'Masculino', value: 'M' });
    this.sexo.push({ label: 'Femenino', value: 'F' });

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
  }
}
