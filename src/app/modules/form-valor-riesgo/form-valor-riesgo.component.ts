import { DatePipe, Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Area } from 'src/app/models/area.model';
import { AreasService } from 'src/app/services/areas.service';
import { ValorRiesgoModel } from '../../models/valor-riesgo.model';
import { ValoracionRiesgosService } from '../../services/valoracion-riesgos.service';

@Component({
  selector: 'app-form-valor-riesgo',
  templateUrl: './form-valor-riesgo.component.html',
  styleUrls: ['./form-valor-riesgo.component.css']
})
export class FormValorRiesgoComponent implements OnInit {

  vrform:FormGroup;
  localVR: ValorRiesgoModel = {};
  fechaActual:string = '.';
  idEmpresa:any;
  userMod:any;
  areas: Area[] = [];
  area: SelectItem[] = [];
  selectRutina:SelectItem[] = [
    { label: 'SI', value: 'SI' },
    { label: 'NO', value: 'NO' }
  ];
  mobWidth: any;
  imgvalidator: boolean = true;
  constructor(private fb: FormBuilder,
              private _location: Location,
              private valoraRiesgoService: ValoracionRiesgosService,
              private areasServices: AreasService,
              private router: Router,
              private _messageService: MessageService,
              private datepipe: DatePipe) { 
                this.onResize();
                this.idEmpresa = Number(sessionStorage.getItem('idEmpresa')); 
                this.userMod = sessionStorage.getItem('user');
                this.fechaActual = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
              }

  ngOnInit() {
    this.localVR = JSON.parse(sessionStorage.getItem('valorRiesgo'));  
    this.formulario();
    /*Carga los datos en el modo editar para el formulario */
    this.modoEdicion();
    /*Consulta las areas de la empresa seleccionada */
    this.buscarArea();
  }

  formulario(){
    this.vrform = this.fb.group({
      /* ----------------------DATOS GENERALES------------------- */
      idp_id:[''],
      idpfecha:[this.fechaActual],
      idpempresa:[this.idEmpresa],
      idparea:[0],
      idpsede:['.'],
      idphorario:['.'],
      idpelemntoprot:['.'],
      idpactrutinarias:['.'],
      idpactnorutinarias:['.'],
      idpatpresentados:['.'],
      idpcedula:[0],
      idpnombre:['.'],
      idptelefono:['.'],
      idpprocesoactividad:['.'],
      idpampliarobservac:['.'],
      idpusuariocrea:[this.userMod],
      idpusuariomod:[this.userMod],
      idpestado:['a'],
      /*-------------------ULTIMOS CAMPOS AGREGADOS-------------------- */
      idpproceso:['.'],
      idpzona:['.'],
      idpactividades:['.'],
      idptareas:['.'],
      idprutinario:[''],
      /* ----------------------BIOLOGICO------------------- */
      /*Biologico - Derivados de origen animal */
      idpbioderani_efectos:['.'],
      idpbioderani_ctrlfuente:['.'],
      idpbioderani_ctrlmedio:['.'],
      idpbioderani_ctrlindividuo:['.'],
      idpbioderani_tb_nd:[0],
      idpbioderani_tb_ne:[0],
      idpbioderani_tb_np:[0],
      idpbioderani_interpreta:['.'],
      idpbioderani_tb_nc:[0],
      idpbioderani_intervencion:[0],
      idpbioderani_tb_nr:['.'],
      idpbioderani_numpuestos:[0],
      idpbioderani_observaciones:['.'],
      idpbioderani_peorconsecue:['.'],
      idpbioderani_existerequisito:['.'], 
      idpbioderani_elimina:['.'],  
      idpbioderani_sustitucion:['.'],  
      idpbioderani_ctrlingenieria:['.'], 
      idpbioderani_ctrladmin:['.'],
      idpbioderani_equipoeleme:['.'], 
      /*Biologico - Microorganismos tipo hongo */
      idpbiohongo_efectos:['.'],
      idpbiohongo_ctrlfuente:['.'],
      idpbiohongo_ctrlmedio:['.'],
      idpbiohongo_ctrlindividuo:['.'],
      idpbiohongo_tb_nd:[0],
      idpbiohongo_tb_ne:[0],
      idpbiohongo_tb_np:[0],
      idpbiohongo_interpreta:['.'],
      idpbiohongo_tb_nc:[0],
      idpbiohongo_intervencion:[0],
      idpbiohongo_tb_nr:['.'],
      idpbiohongo_numpuestos:[0],
      idpbiohongo_observaciones:['.'],
      idpbiohongo_peorconsecue:['.'],
      idpbiohongo_existerequisito:['.'],
      idpbiohongo_elimina:['.'],
      idpbiohongo_sustitucion:['.'],  
      idpbiohongo_ctrlingenieria:['.'],
      idpbiohongo_ctrladmin:['.'],
      idpbiohongo_equipoeleme:['.'],
      /*Biologico - Microorganismos tipo bacterias */
      idpbiobacterias_efectos:['.'],
      idpbiobacterias_ctrlfuente:['.'],
      idpbiobacterias_ctrlmedio:['.'],
      idpbiobacterias_ctrlindividuo:['.'],
      idpbiobacterias_tb_nd:[0],
      idpbiobacterias_tb_ne:[0],
      idpbiobacterias_tb_np:[0],
      idpbiobacterias_interpreta:['.'],
      idpbiobacterias_tb_nc:[0],
      idpbiobacterias_intervencion:[0],
      idpbiobacterias_tb_nr:['.'],
      idpbiobacterias_numpuestos:[0],
      idpbiobacterias_observaciones:['.'],
      idpbiobacterias_peorconsecue:['.'], 
      idpbiobacterias_existerequisito:['.'], 
      idpbiobacterias_elimina:['.'],    
      idpbiobacterias_sustitucion:['.'],   
      idpbiobacterias_ctrlingenieria:['.'], 
      idpbiobacterias_ctrladmin:['.'],  
      idpbiobacterias_equipoeleme:['.'],
      /*Biologico - Microorganismos tipo virus */
      idpbiovirus_efectos:['.'],
      idpbiovirus_ctrlfuente:['.'],
      idpbiovirus_ctrlmedio:['.'],
      idpbiovirus_ctrlindividuo:['.'],
      idpbiovirus_tb_nd:[0],
      idpbiovirus_tb_ne:[0],
      idpbiovirus_tb_np:[0],
      idpbiovirus_interpreta:['.'],
      idpbiovirus_tb_nc:[0],
      idpbiovirus_intervencion:[0],
      idpbiovirus_tb_nr:['.'],
      idpbiovirus_numpuestos:[0],
      idpbiovirus_observaciones:['.'],
      idpbiovirus_peorconsecue:['.'], 
      idpbiovirus_existerequisito:['.'], 
      idpbiovirus_elimina:['.'],    
      idpbiovirus_sustitucion:['.'],   
      idpbiovirus_ctrlingenieria:['.'], 
      idpbiovirus_ctrladmin:['.'],  
      idpbiovirus_equipoeleme:['.'], 
      /*Biologico - Parásitos */
      idpbioparasitos_efectos:['.'],
      idpbioparasitos_ctrlfuente:['.'],
      idpbioparasitos_ctrlmedio:['.'],
      idpbioparasitos_ctrlindividuo:['.'],
      idpbioparasitos_tb_nd:[0],
      idpbioparasitos_tb_ne:[0],
      idpbioparasitos_tb_np:[0],
      idpbioparasitos_interpreta:['.'],
      idpbioparasitos_tb_nc:[0],
      idpbioparasitos_intervencion:[0],
      idpbioparasitos_tb_nr:['.'],
      idpbioparasitos_numpuestos:[0],
      idpbioparasitos_observaciones:['.'],
      idpbioparasitos_peorconsecue:['.'], 
      idpbioparasitos_existerequisito:['.'], 
      idpbioparasitos_elimina:['.'],    
      idpbioparasitos_sustitucion:['.'],   
      idpbioparasitos_ctrlingenieria:['.'], 
      idpbioparasitos_ctrladmin:['.'],  
      idpbioparasitos_equipoeleme:['.'],
      /* ----------------------CARGA FÍSICA------------------- */
      /* Carga Física - Carga dinámica por esfuerzos */
      idpcargesfuerzos_efectos:['.'],
      idpcargesfuerzos_ctrlfuente:['.'],
      idpcargesfuerzos_ctrlmedio:['.'],
      idpcargesfuerzos_ctrlindividuo:['.'],
      idpcargesfuerzos_tb_nd:[0],
      idpcargesfuerzos_tb_ne:[0],
      idpcargesfuerzos_tb_np:[0],
      idpcargesfuerzos_interpreta:['.'],
      idpcargesfuerzos_tb_nc:[0],
      idpcargesfuerzos_intervencion:[0],
      idpcargesfuerzos_tb_nr:['.'],
      idpcargesfuerzos_numpuestos:[0],
      idpcargesfuerzos_observaciones:['.'],
      idpcargesfuerzos_peorconsecue:['.'], 
      idpcargesfuerzos_existerequisito:['.'], 
      idpcargesfuerzos_elimina:['.'],    
      idpcargesfuerzos_sustitucion:['.'],   
      idpcargesfuerzos_ctrlingenieria:['.'], 
      idpcargesfuerzos_ctrladmin:['.'],  
      idpcargesfuerzos_equipoeleme:['.'],
      /* Carga Física - Carga dinámica por movimientos repetitivos */
      idpcargmovimiento_efectos:['.'],
      idpcargmovimiento_ctrlfuente:['.'],
      idpcargmovimiento_ctrlmedio:['.'],
      idpcargmovimiento_ctrlindividuo:['.'],
      idpcargmovimiento_tb_nd:[0],
      idpcargmovimiento_tb_ne:[0],
      idpcargmovimiento_tb_np:[0],
      idpcargmovimiento_interpreta:['.'],
      idpcargmovimiento_tb_nc:[0],
      idpcargmovimiento_intervencion:[0],
      idpcargmovimiento_tb_nr:['.'],
      idpcargmovimiento_numpuestos:[0],
      idpcargmovimiento_observaciones:['.'],
      idpcargmovimiento_peorconsecue:['.'], 
      idpcargmovimiento_existerequisito:['.'], 
      idpcargmovimiento_elimina:['.'],    
      idpcargmovimiento_sustitucion:['.'],   
      idpcargmovimiento_ctrlingenieria:['.'], 
      idpcargmovimiento_ctrladmin:['.'],  
      idpcargmovimiento_equipoeleme:['.'],
      /* Carga Física - Carga dinámica por sobreesfuerzos de la voz */
      idpcargvoz_efectos:['.'],
      idpcargvoz_ctrlfuente:['.'],
      idpcargvoz_ctrlmedio:['.'],
      idpcargvoz_ctrlindividuo:['.'],
      idpcargvoz_tb_nd:[0],
      idpcargvoz_tb_ne:[0],
      idpcargvoz_tb_np:[0],
      idpcargvoz_interpreta:['.'],
      idpcargvoz_tb_nc:[0],
      idpcargvoz_intervencion:[0],
      idpcargvoz_tb_nr:['.'],
      idpcargvoz_numpuestos:[0],
      idpcargvoz_observaciones:['.'],
      idpcargvoz_peorconsecue:['.'], 
      idpcargvoz_existerequisito:['.'], 
      idpcargvoz_elimina:['.'],
      idpcargvoz_sustitucion:['.'],   
      idpcargvoz_ctrlingenieria:['.'], 
      idpcargvoz_ctrladmin:['.'],  
      idpcargvoz_equipoeleme:['.'],
      /* Carga Física - Carga estática de pie */
      idpcargpie_efectos:['.'],
      idpcargpie_ctrlfuente:['.'],
      idpcargpie_ctrlmedio:['.'],
      idpcargpie_ctrlindividuo:['.'],
      idpcargpie_tb_nd:[0],
      idpcargpie_tb_ne:[0],
      idpcargpie_tb_np:[0],
      idpcargpie_interpreta:['.'],
      idpcargpie_tb_nc:[0],
      idpcargpie_intervencion:[0],
      idpcargpie_tb_nr:['.'],
      idpcargpie_numpuestos:[0],
      idpcargpie_observaciones:['.'],
      idpcargpie_peorconsecue:['.'], 
      idpcargpie_existerequisito:['.'], 
      idpcargpie_elimina:['.'],    
      idpcargpie_sustitucion:['.'],   
      idpcargpie_ctrlingenieria:['.'], 
      idpcargpie_ctrladmin:['.'],  
      idpcargpie_equipoeleme:['.'],
      /* Carga Física - Posiciones prolongadas sentado */
      idpcargsentado_efectos:['.'],
      idpcargsentado_ctrlfuente:['.'],
      idpcargsentado_ctrlmedio:['.'],
      idpcargsentado_ctrlindividuo:['.'],
      idpcargsentado_tb_nd:[0],
      idpcargsentado_tb_ne:[0],
      idpcargsentado_tb_np:[0],
      idpcargsentado_interpreta:['.'],
      idpcargsentado_tb_nc:[0],
      idpcargsentado_intervencion:[0],
      idpcargsentado_tb_nr:['.'],
      idpcargsentado_numpuestos:[0],
      idpcargsentado_observaciones:['.'],
      idpcargsentado_peorconsecue:['.'], 
      idpcargsentado_existerequisito:['.'], 
      idpcargsentado_elimina:['.'],    
      idpcargsentado_sustitucion:['.'],   
      idpcargsentado_ctrlingenieria:['.'], 
      idpcargsentado_ctrladmin:['.'],  
      idpcargsentado_equipoeleme:['.'], 
      /* ----------------------ELÉCTRICO------------------- */
      /* Eléctrico - Energía eléctrica de baja */
      idpelectricobaja_efectos:['.'],
      idpelectricobaja_ctrlfuente:['.'],
      idpelectricobaja_ctrlmedio:['.'],
      idpelectricobaja_ctrlindividuo:['.'],
      idpelectricobaja_tb_nd:[0],
      idpelectricobaja_tb_ne:[0],
      idpelectricobaja_tb_np:[0],
      idpelectricobaja_interpreta:['.'],
      idpelectricobaja_tb_nc:[0],
      idpelectricobaja_intervencion:[0],
      idpelectricobaja_tb_nr:['.'],
      idpelectricobaja_numpuestos:[0],
      idpelectricobaja_observaciones:['.'],
      idpelectricobaja_peorconsecue:['.'], 
      idpelectricobaja_existerequisito:['.'], 
      idpelectricobaja_elimina:['.'],    
      idpelectricobaja_sustitucion:['.'],   
      idpelectricobaja_ctrlingenieria:['.'], 
      idpelectricobaja_ctrladmin:['.'],  
      idpelectricobaja_equipoeleme:['.'],
      /* Eléctrico - Energía eléctrica de alta */
      idpelectricoalta_efectos:['.'],
      idpelectricoalta_ctrlfuente:['.'],
      idpelectricoalta_ctrlmedio:['.'],
      idpelectricoalta_ctrlindividuo:['.'],
      idpelectricoalta_tb_nd:[0],
      idpelectricoalta_tb_ne:[0],
      idpelectricoalta_tb_np:[0],
      idpelectricoalta_interpreta:['.'],
      idpelectricoalta_tb_nc:[0],
      idpelectricoalta_intervencion:[0],
      idpelectricoalta_tb_nr:['.'],
      idpelectricoalta_numpuestos:[0],
      idpelectricoalta_observaciones:['.'],
      idpelectricoalta_peorconsecue:['.'], 
      idpelectricoalta_existerequisito:['.'], 
      idpelectricoalta_elimina:['.'],    
      idpelectricoalta_sustitucion:['.'],   
      idpelectricoalta_ctrlingenieria:['.'], 
      idpelectricoalta_ctrladmin:['.'],  
      idpelectricoalta_equipoeleme:['.'],
      /* Eléctrico - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados */
      idpelectricocables_efectos:['.'],
      idpelectricocables_ctrlfuente:['.'],
      idpelectricocables_ctrlmedio:['.'],
      idpelectricocables_ctrlindividuo:['.'],
      idpelectricocables_tb_nd:[0],
      idpelectricocables_tb_ne:[0],
      idpelectricocables_tb_np:[0],
      idpelectricocables_interpreta:['.'],
      idpelectricocables_tb_nc:[0],
      idpelectricocables_intervencion:[0],
      idpelectricocables_tb_nr:['.'],
      idpelectricocables_numpuestos:[0],
      idpelectricocables_observaciones:['.'],
      idpelectricocables_peorconsecue:['.'], 
      idpelectricocables_existerequisito:['.'], 
      idpelectricocables_elimina:['.'],    
      idpelectricocables_sustitucion:['.'],   
      idpelectricocables_ctrlingenieria:['.'], 
      idpelectricocables_ctrladmin:['.'],  
      idpelectricocables_equipoeleme:['.'],
      /* ----------------------FÍSICO------------------- */
      /* Físico - Iluminación deficiente */
      idpfisicoilumdef_efectos:['.'],
      idpfisicoilumdef_ctrlfuente:['.'],
      idpfisicoilumdef_ctrlmedio:['.'],
      idpfisicoilumdef_ctrlindividuo:['.'],
      idpfisicoilumdef_tb_nd:[0],
      idpfisicoilumdef_tb_ne:[0],
      idpfisicoilumdef_tb_np:[0],
      idpfisicoilumdef_interpreta:['.'],
      idpfisicoilumdef_tb_nc:[0],
      idpfisicoilumdef_intervencion:[0],
      idpfisicoilumdef_tb_nr:['.'],
      idpfisicoilumdef_numpuestos:[0],
      idpfisicoilumdef_observaciones:['.'],
      idpfisicoilumdef_peorconsecue:['.'], 
      idpfisicoilumdef_existerequisito:['.'], 
      idpfisicoilumdef_elimina:['.'],    
      idpfisicoilumdef_sustitucion:['.'],   
      idpfisicoilumdef_ctrlingenieria:['.'], 
      idpfisicoilumdef_ctrladmin:['.'],  
      idpfisicoilumdef_equipoeleme:['.'],
      /* Físico - Iluminación en exceso */
      idpfisicoilumexceso_efectos:['.'],
      idpfisicoilumexceso_ctrlfuente:['.'],
      idpfisicoilumexceso_ctrlmedio:['.'],
      idpfisicoilumexceso_ctrlindividuo:['.'],
      idpfisicoilumexceso_tb_nd:[0],
      idpfisicoilumexceso_tb_ne:[0],
      idpfisicoilumexceso_tb_np:[0],
      idpfisicoilumexceso_interpreta:['.'],
      idpfisicoilumexceso_tb_nc:[0],
      idpfisicoilumexceso_intervencion:[0],
      idpfisicoilumexceso_tb_nr:['.'],
      idpfisicoilumexceso_numpuestos:[0],
      idpfisicoilumexceso_observaciones:['.'],
      idpfisicoilumexceso_peorconsecue:['.'], 
      idpfisicoilumexceso_existerequisito:['.'], 
      idpfisicoilumexceso_elimina:['.'],    
      idpfisicoilumexceso_sustitucion:['.'],   
      idpfisicoilumexceso_ctrlingenieria:['.'], 
      idpfisicoilumexceso_ctrladmin:['.'],  
      idpfisicoilumexceso_equipoeleme:['.'],
      /* Físico - Radiaciones no ionizantes por ultravioleta */
      idpfisiconoradiaciones_efectos:['.'],
      idpfisiconoradiaciones_ctrlfuente:['.'],
      idpfisiconoradiaciones_ctrlmedio:['.'],
      idpfisiconoradiaciones_ctrlindividuo:['.'],
      idpfisiconoradiaciones_tb_nd:[0],
      idpfisiconoradiaciones_tb_ne:[0],
      idpfisiconoradiaciones_tb_np:[0],
      idpfisiconoradiaciones_interpreta:['.'],
      idpfisiconoradiaciones_tb_nc:[0],
      idpfisiconoradiaciones_intervencion:[0],
      idpfisiconoradiaciones_tb_nr:['.'],
      idpfisiconoradiaciones_numpuestos:[0],
      idpfisiconoradiaciones_observaciones:['.'],
      idpfisiconoradiaciones_peorconsecue:['.'], 
      idpfisiconoradiaciones_existerequisito:['.'], 
      idpfisiconoradiaciones_elimina:['.'],    
      idpfisiconoradiaciones_sustitucion:['.'],   
      idpfisiconoradiaciones_ctrlingenieria:['.'], 
      idpfisiconoradiaciones_ctrladmin:['.'],  
      idpfisiconoradiaciones_equipoeleme:['.'], 
      /* Físico - Radiaciones ionizantes */
      idpfisicoradiaciones_efectos:['.'],
      idpfisicoradiaciones_ctrlfuente:['.'],
      idpfisicoradiaciones_ctrlmedio:['.'],
      idpfisicoradiaciones_ctrlindividuo:['.'],
      idpfisicoradiaciones_tb_nd:[0],
      idpfisicoradiaciones_tb_ne:[0],
      idpfisicoradiaciones_tb_np:[0],
      idpfisicoradiaciones_interpreta:['.'],
      idpfisicoradiaciones_tb_nc:[0],
      idpfisicoradiaciones_intervencion:[0],
      idpfisicoradiaciones_tb_nr:['.'],
      idpfisicoradiaciones_numpuestos:[0],
      idpfisicoradiaciones_observaciones:['.'],
      idpfisicoradiaciones_peorconsecue:['.'], 
      idpfisicoradiaciones_existerequisito:['.'], 
      idpfisicoradiaciones_elimina:['.'],    
      idpfisicoradiaciones_sustitucion:['.'],   
      idpfisicoradiaciones_ctrlingenieria:['.'], 
      idpfisicoradiaciones_ctrladmin:['.'],  
      idpfisicoradiaciones_equipoeleme:['.'],
      /* Físico - Ruido */
      idpfisicoruido_efectos:['.'],
      idpfisicoruido_ctrlfuente:['.'],
      idpfisicoruido_ctrlmedio:['.'],
      idpfisicoruido_ctrlindividuo:['.'],
      idpfisicoruido_tb_nd:[0],
      idpfisicoruido_tb_ne:[0],
      idpfisicoruido_tb_np:[0],
      idpfisicoruido_interpreta:['.'],
      idpfisicoruido_tb_nc:[0],
      idpfisicoruido_intervencion:[0],
      idpfisicoruido_tb_nr:['.'],
      idpfisicoruido_numpuestos:[0],
      idpfisicoruido_observaciones:['.'],
      idpfisicoruido_peorconsecue:['.'], 
      idpfisicoruido_existerequisito:['.'], 
      idpfisicoruido_elimina:['.'],    
      idpfisicoruido_sustitucion:['.'],   
      idpfisicoruido_ctrlingenieria:['.'], 
      idpfisicoruido_ctrladmin:['.'],  
      idpfisicoruido_equipoeleme:['.'], 
      /* Físico - Vibraciones */
      idpfisicovibraciones_efectos:['.'],
      idpfisicovibraciones_ctrlfuente:['.'],
      idpfisicovibraciones_ctrlmedio:['.'],
      idpfisicovibraciones_ctrlindividuo:['.'],
      idpfisicovibraciones_tb_nd:[0],
      idpfisicovibraciones_tb_ne:[0],
      idpfisicovibraciones_tb_np:[0],
      idpfisicovibraciones_interpreta:['.'],
      idpfisicovibraciones_tb_nc:[0],
      idpfisicovibraciones_intervencion:[0],
      idpfisicovibraciones_tb_nr:['.'],
      idpfisicovibraciones_numpuestos:[0],
      idpfisicovibraciones_observaciones:['.'],
      idpfisicovibraciones_peorconsecue:['.'], 
      idpfisicovibraciones_existerequisito:['.'], 
      idpfisicovibraciones_elimina:['.'],    
      idpfisicovibraciones_sustitucion:['.'],   
      idpfisicovibraciones_ctrlingenieria:['.'], 
      idpfisicovibraciones_ctrladmin:['.'],  
      idpfisicovibraciones_equipoeleme:['.'], 
      /* Físico - Transferencias de temperaturas por calor */
      idpfisicocalor_efectos:['.'],
      idpfisicocalor_ctrlfuente:['.'],
      idpfisicocalor_ctrlmedio:['.'],
      idpfisicocalor_ctrlindividuo:['.'],
      idpfisicocalor_tb_nd:[0],
      idpfisicocalor_tb_ne:[0],
      idpfisicocalor_tb_np:[0],
      idpfisicocalor_interpreta:['.'],
      idpfisicocalor_tb_nc:[0],
      idpfisicocalor_intervencion:[0],
      idpfisicocalor_tb_nr:['.'],
      idpfisicocalor_numpuestos:[0],
      idpfisicocalor_observaciones:['.'],
      idpfisicocalor_peorconsecue:['.'], 
      idpfisicocalor_existerequisito:['.'], 
      idpfisicocalor_elimina:['.'],    
      idpfisicocalor_sustitucion:['.'],   
      idpfisicocalor_ctrlingenieria:['.'], 
      idpfisicocalor_ctrladmin:['.'],  
      idpfisicocalor_equipoeleme:['.'],
      /* Físico - Transferencias de temperaturas por frio */
      idpfisicofrio_efectos:['.'],
      idpfisicofrio_ctrlfuente:['.'],
      idpfisicofrio_ctrlmedio:['.'],
      idpfisicofrio_ctrlindividuo:['.'],
      idpfisicofrio_tb_nd:[0],
      idpfisicofrio_tb_ne:[0],
      idpfisicofrio_tb_np:[0],
      idpfisicofrio_interpreta:['.'],
      idpfisicofrio_tb_nc:[0],
      idpfisicofrio_intervencion:[0],
      idpfisicofrio_tb_nr:['.'],
      idpfisicofrio_numpuestos:[0],
      idpfisicofrio_observaciones:['.'],
      idpfisicofrio_peorconsecue:['.'], 
      idpfisicofrio_existerequisito:['.'], 
      idpfisicofrio_elimina:['.'],    
      idpfisicofrio_sustitucion:['.'],   
      idpfisicofrio_ctrlingenieria:['.'], 
      idpfisicofrio_ctrladmin:['.'],  
      idpfisicofrio_equipoeleme:['.'], 
      /* ----------------------INCENDIOS / EXPLOSIONES------------------- */
      /* Incendios / Explosiones - Materiales combustibles */
      idpincendioscombust_efectos:['.'],
      idpincendioscombust_ctrlfuente:['.'],
      idpincendioscombust_ctrlmedio:['.'],
      idpincendioscombust_ctrlindividuo:['.'],
      idpincendioscombust_tb_nd:[0],
      idpincendioscombust_tb_ne:[0],
      idpincendioscombust_tb_np:[0],
      idpincendioscombust_interpreta:['.'],
      idpincendioscombust_tb_nc:[0],
      idpincendioscombust_intervencion:[0],
      idpincendioscombust_tb_nr:['.'],
      idpincendioscombust_numpuestos:[0],
      idpincendioscombust_observaciones:['.'],
      idpincendioscombust_peorconsecue:['.'], 
      idpincendioscombust_existerequisito:['.'], 
      idpincendioscombust_elimina:['.'],    
      idpincendioscombust_sustitucion:['.'],   
      idpincendioscombust_ctrlingenieria:['.'], 
      idpincendioscombust_ctrladmin:['.'],  
      idpincendioscombust_equipoeleme:['.'],
      /* Incendios / Explosiones - Ausencia de equipo contra incendio */
      idpincendiosequipo_efectos:['.'],
      idpincendiosequipo_ctrlfuente:['.'],
      idpincendiosequipo_ctrlmedio:['.'],
      idpincendiosequipo_ctrlindividuo:['.'],
      idpincendiosequipo_tb_nd:[0],
      idpincendiosequipo_tb_ne:[0],
      idpincendiosequipo_tb_np:[0],
      idpincendiosequipo_interpreta:['.'],
      idpincendiosequipo_tb_nc:[0],
      idpincendiosequipo_intervencion:[0],
      idpincendiosequipo_tb_nr:['.'],
      idpincendiosequipo_numpuestos:[0],
      idpincendiosequipo_observaciones:['.'],
      idpincendiosequipo_peorconsecue:['.'], 
      idpincendiosequipo_existerequisito:['.'], 
      idpincendiosequipo_elimina:['.'],    
      idpincendiosequipo_sustitucion:['.'],   
      idpincendiosequipo_ctrlingenieria:['.'], 
      idpincendiosequipo_ctrladmin:['.'],  
      idpincendiosequipo_equipoeleme:['.'],
      /* Incendios / Explosiones - Sustancias inflamables */
      idpincendiossustancias_efectos:['.'],
      idpincendiossustancias_ctrlfuente:['.'],
      idpincendiossustancias_ctrlmedio:['.'],
      idpincendiossustancias_ctrlindividuo:['.'],
      idpincendiossustancias_tb_nd:[0],
      idpincendiossustancias_tb_ne:[0],
      idpincendiossustancias_tb_np:[0],
      idpincendiossustancias_interpreta:['.'],
      idpincendiossustancias_tb_nc:[0],
      idpincendiossustancias_intervencion:[0],
      idpincendiossustancias_tb_nr:['.'],
      idpincendiossustancias_numpuestos:[0],
      idpincendiossustancias_observaciones:['.'],
      idpincendiossustancias_peorconsecue:['.'], 
      idpincendiossustancias_existerequisito:['.'], 
      idpincendiossustancias_elimina:['.'],    
      idpincendiossustancias_sustitucion:['.'],   
      idpincendiossustancias_ctrlingenieria:['.'], 
      idpincendiossustancias_ctrladmin:['.'],  
      idpincendiossustancias_equipoeleme:['.'], 
      /* ----------------------LOCATIVOS------------------- */
      /* Locativos - Pisos defectuosos */
      idplocativospisos_efectos:['.'],
      idplocativospisos_ctrlfuente:['.'],
      idplocativospisos_ctrlmedio:['.'],
      idplocativospisos_ctrlindividuo:['.'],
      idplocativospisos_tb_nd:[0],
      idplocativospisos_tb_ne:[0],
      idplocativospisos_tb_np:[0],
      idplocativospisos_interpreta:['.'],
      idplocativospisos_tb_nc:[0],
      idplocativospisos_intervencion:[0],
      idplocativospisos_tb_nr:['.'],
      idplocativospisos_numpuestos:[0],
      idplocativospisos_observaciones:['.'],
      idplocativospisos_peorconsecue:['.'], 
      idplocativospisos_existerequisito:['.'], 
      idplocativospisos_elimina:['.'],    
      idplocativospisos_sustitucion:['.'],   
      idplocativospisos_ctrlingenieria:['.'], 
      idplocativospisos_ctrladmin:['.'],  
      idplocativospisos_equipoeleme:['.'],
      /* Locativos - Escaleras defectuosas */
      idplocativosescaleras_efectos:['.'],
      idplocativosescaleras_ctrlfuente:['.'],
      idplocativosescaleras_ctrlmedio:['.'],
      idplocativosescaleras_ctrlindividuo:['.'],
      idplocativosescaleras_tb_nd:[0],
      idplocativosescaleras_tb_ne:[0],
      idplocativosescaleras_tb_np:[0],
      idplocativosescaleras_interpreta:['.'],
      idplocativosescaleras_tb_nc:[0],
      idplocativosescaleras_intervencion:[0],
      idplocativosescaleras_tb_nr:['.'],
      idplocativosescaleras_numpuestos:[0],
      idplocativosescaleras_observaciones:['.'],
      idplocativosescaleras_peorconsecue:['.'], 
      idplocativosescaleras_existerequisito:['.'], 
      idplocativosescaleras_elimina:['.'],    
      idplocativosescaleras_sustitucion:['.'],   
      idplocativosescaleras_ctrlingenieria:['.'], 
      idplocativosescaleras_ctrladmin:['.'],  
      idplocativosescaleras_equipoeleme:['.'],
      /* Locativos - Almacenamiento, estanterías en mal estado */
      idplocativosestanterias_efectos:['.'],
      idplocativosestanterias_ctrlfuente:['.'],
      idplocativosestanterias_ctrlmedio:['.'],
      idplocativosestanterias_ctrlindividuo:['.'],
      idplocativosestanterias_tb_nd:[0],
      idplocativosestanterias_tb_ne:[0],
      idplocativosestanterias_tb_np:[0],
      idplocativosestanterias_interpreta:['.'],
      idplocativosestanterias_tb_nc:[0],
      idplocativosestanterias_intervencion:[0],
      idplocativosestanterias_tb_nr:['.'],
      idplocativosestanterias_numpuestos:[0],
      idplocativosestanterias_observaciones:['.'],
      idplocativosestanterias_peorconsecue:['.'], 
      idplocativosestanterias_existerequisito:['.'], 
      idplocativosestanterias_elimina:['.'],    
      idplocativosestanterias_sustitucion:['.'],   
      idplocativosestanterias_ctrlingenieria:['.'], 
      idplocativosestanterias_ctrladmin:['.'],  
      idplocativosestanterias_equipoeleme:['.'],
      /* Locativos - Almacenamiento, arrumes con altura inadecuada */
      idplocativosarrumes_efectos:['.'],
      idplocativosarrumes_ctrlfuente:['.'],
      idplocativosarrumes_ctrlmedio:['.'],
      idplocativosarrumes_ctrlindividuo:['.'],
      idplocativosarrumes_tb_nd:[0],
      idplocativosarrumes_tb_ne:[0],
      idplocativosarrumes_tb_np:[0],
      idplocativosarrumes_interpreta:['.'],
      idplocativosarrumes_tb_nc:[0],
      idplocativosarrumes_intervencion:[0],
      idplocativosarrumes_tb_nr:['.'],
      idplocativosarrumes_numpuestos:[0],
      idplocativosarrumes_observaciones:['.'],
      idplocativosarrumes_peorconsecue:['.'], 
      idplocativosarrumes_existerequisito:['.'], 
      idplocativosarrumes_elimina:['.'],    
      idplocativosarrumes_sustitucion:['.'],   
      idplocativosarrumes_ctrlingenieria:['.'], 
      idplocativosarrumes_ctrladmin:['.'],  
      idplocativosarrumes_equipoeleme:['.'],
      /* Locativos - Señalización y demarcación deficiente, inexistente o inadecuada */
      idplocativosenalizacion_efectos:['.'],
      idplocativosenalizacion_ctrlfuente:['.'],
      idplocativosenalizacion_ctrlmedio:['.'],
      idplocativosenalizacion_ctrlindividuo:['.'],
      idplocativosenalizacion_tb_nd:[0],
      idplocativosenalizacion_tb_ne:[0],
      idplocativosenalizacion_tb_np:[0],
      idplocativosenalizacion_interpreta:['.'],
      idplocativosenalizacion_tb_nc:[0],
      idplocativosenalizacion_intervencion:[0],
      idplocativosenalizacion_tb_nr:['.'],
      idplocativosenalizacion_numpuestos:[0],
      idplocativosenalizacion_observaciones:['.'],
      idplocativosenalizacion_peorconsecue:['.'], 
      idplocativosenalizacion_existerequisito:['.'], 
      idplocativosenalizacion_elimina:['.'],    
      idplocativosenalizacion_sustitucion:['.'],   
      idplocativosenalizacion_ctrlingenieria:['.'], 
      idplocativosenalizacion_ctrladmin:['.'],  
      idplocativosenalizacion_equipoeleme:['.'],
      /* Locativos - Falta de orden y aseo */
      idplocativosaseo_efectos:['.'],
      idplocativosaseo_ctrlfuente:['.'],
      idplocativosaseo_ctrlmedio:['.'],
      idplocativosaseo_ctrlindividuo:['.'],
      idplocativosaseo_tb_nd:[0],
      idplocativosaseo_tb_ne:[0],
      idplocativosaseo_tb_np:[0],
      idplocativosaseo_interpreta:['.'],
      idplocativosaseo_tb_nc:[0],
      idplocativosaseo_intervencion:[0],
      idplocativosaseo_tb_nr:['.'],
      idplocativosaseo_numpuestos:[0],
      idplocativosaseo_observaciones:['.'],
      idplocativosaseo_peorconsecue:['.'], 
      idplocativosaseo_existerequisito:['.'], 
      idplocativosaseo_elimina:['.'],    
      idplocativosaseo_sustitucion:['.'],   
      idplocativosaseo_ctrlingenieria:['.'], 
      idplocativosaseo_ctrladmin:['.'],  
      idplocativosaseo_equipoeleme:['.'],
      /* ----------------------MECÁNICOS------------------- */
      /* Mecánicos - Utilización de herramientas manuales */
      idpmecanicoherramient_efectos:['.'],
      idpmecanicoherramient_ctrlfuente:['.'],
      idpmecanicoherramient_ctrlmedio:['.'],
      idpmecanicoherramient_ctrlindividuo:['.'],
      idpmecanicoherramient_tb_nd:[0],
      idpmecanicoherramient_tb_ne:[0],
      idpmecanicoherramient_tb_np:[0],
      idpmecanicoherramient_interpreta:['.'],
      idpmecanicoherramient_tb_nc:[0],
      idpmecanicoherramient_intervencion:[0],
      idpmecanicoherramient_tb_nr:['.'],
      idpmecanicoherramient_numpuestos:[0],
      idpmecanicoherramient_observaciones:['.'],
      idpmecanicoherramient_peorconsecue:['.'], 
      idpmecanicoherramient_existerequisito:['.'], 
      idpmecanicoherramient_elimina:['.'],    
      idpmecanicoherramient_sustitucion:['.'],   
      idpmecanicoherramient_ctrlingenieria:['.'], 
      idpmecanicoherramient_ctrladmin:['.'],  
      idpmecanicoherramient_equipoeleme:['.'], 
      /* Mecánicos - Superficies cortantes */
      idpmecanicocortante_efectos:['.'],
      idpmecanicocortante_ctrlfuente:['.'],
      idpmecanicocortante_ctrlmedio:['.'],
      idpmecanicocortante_ctrlindividuo:['.'],
      idpmecanicocortante_tb_nd:[0],
      idpmecanicocortante_tb_ne:[0],
      idpmecanicocortante_tb_np:[0],
      idpmecanicocortante_interpreta:['.'],
      idpmecanicocortante_tb_nc:[0],
      idpmecanicocortante_intervencion:[0],
      idpmecanicocortante_tb_nr:['.'],
      idpmecanicocortante_numpuestos:[0],
      idpmecanicocortante_observaciones:['.'],
      idpmecanicocortante_peorconsecue:['.'], 
      idpmecanicocortante_existerequisito:['.'], 
      idpmecanicocortante_elimina:['.'],    
      idpmecanicocortante_sustitucion:['.'],   
      idpmecanicocortante_ctrlingenieria:['.'], 
      idpmecanicocortante_ctrladmin:['.'],  
      idpmecanicocortante_equipoeleme:['.'], 
      /* Mecánicos - Contacto con elementos cortopunzantes */
      idpmecanicocortopunz_efectos:['.'],
      idpmecanicocortopunz_ctrlfuente:['.'],
      idpmecanicocortopunz_ctrlmedio:['.'],
      idpmecanicocortopunz_ctrlindividuo:['.'],
      idpmecanicocortopunz_tb_nd:[0],
      idpmecanicocortopunz_tb_ne:[0],
      idpmecanicocortopunz_tb_np:[0],
      idpmecanicocortopunz_interpreta:['.'],
      idpmecanicocortopunz_tb_nc:[0],
      idpmecanicocortopunz_intervencion:[0],
      idpmecanicocortopunz_tb_nr:['.'],
      idpmecanicocortopunz_numpuestos:[0],
      idpmecanicocortopunz_observaciones:['.'],
      idpmecanicocortopunz_peorconsecue:['.'], 
      idpmecanicocortopunz_existerequisito:['.'], 
      idpmecanicocortopunz_elimina:['.'],    
      idpmecanicocortopunz_sustitucion:['.'],   
      idpmecanicocortopunz_ctrlingenieria:['.'], 
      idpmecanicocortopunz_ctrladmin:['.'],  
      idpmecanicocortopunz_equipoeleme:['.'],
      /* Mecánicos - Materiales proyectados sólidos o fluidos */
      idpmecanicomateriales_efectos:['.'],
      idpmecanicomateriales_ctrlfuente:['.'],
      idpmecanicomateriales_ctrlmedio:['.'],
      idpmecanicomateriales_ctrlindividuo:['.'],
      idpmecanicomateriales_tb_nd:[0],
      idpmecanicomateriales_tb_ne:[0],
      idpmecanicomateriales_tb_np:[0],
      idpmecanicomateriales_interpreta:['.'],
      idpmecanicomateriales_tb_nc:[0],
      idpmecanicomateriales_intervencion:[0],
      idpmecanicomateriales_tb_nr:['.'],
      idpmecanicomateriales_numpuestos:[0],
      idpmecanicomateriales_observaciones:['.'],
      idpmecanicomateriales_peorconsecue:['.'], 
      idpmecanicomateriales_existerequisito:['.'], 
      idpmecanicomateriales_elimina:['.'],    
      idpmecanicomateriales_sustitucion:['.'],   
      idpmecanicomateriales_ctrlingenieria:['.'], 
      idpmecanicomateriales_ctrladmin:['.'],  
      idpmecanicomateriales_equipoeleme:['.'],
      /* ----------------------PSICOSOCIAL------------------- */
      /* Psicosocial - Sobrecarga de trabajo */
      idppsicosobrecarga_efectos:['.'],
      idppsicosobrecarga_ctrlfuente:['.'],
      idppsicosobrecarga_ctrlmedio:['.'],
      idppsicosobrecarga_ctrlindividuo:['.'],
      idppsicosobrecarga_tb_nd:[0],
      idppsicosobrecarga_tb_ne:[0],
      idppsicosobrecarga_tb_np:[0],
      idppsicosobrecarga_interpreta:['.'],
      idppsicosobrecarga_tb_nc:[0],
      idppsicosobrecarga_intervencion:[0],
      idppsicosobrecarga_tb_nr:['.'],
      idppsicosobrecarga_numpuestos:[0],
      idppsicosobrecarga_observaciones:['.'],
      idppsicosobrecarga_peorconsecue:['.'], 
      idppsicosobrecarga_existerequisito:['.'], 
      idppsicosobrecarga_elimina:['.'],    
      idppsicosobrecarga_sustitucion:['.'],   
      idppsicosobrecarga_ctrlingenieria:['.'], 
      idppsicosobrecarga_ctrladmin:['.'],  
      idppsicosobrecarga_equipoeleme:['.'], 
      /* Psicosocial - Resposanbilidad en el cargo/ manejo de personal */
      idppsicoresponsabilidad_efectos:['.'],
      idppsicoresponsabilidad_ctrlfuente:['.'],
      idppsicoresponsabilidad_ctrlmedio:['.'],
      idppsicoresponsabilidad_ctrlindividuo:['.'],
      idppsicoresponsabilidad_tb_nd:[0],
      idppsicoresponsabilidad_tb_ne:[0],
      idppsicoresponsabilidad_tb_np:[0],
      idppsicoresponsabilidad_interpreta:['.'],
      idppsicoresponsabilidad_tb_nc:[0],
      idppsicoresponsabilidad_intervencion:[0],
      idppsicoresponsabilidad_tb_nr:['.'],
      idppsicoresponsabilidad_numpuestos:[0],
      idppsicoresponsabilidad_observaciones:['.'],
      idppsicoresponsabilidad_peorconsecue:['.'], 
      idppsicoresponsabilidad_existerequisito:['.'], 
      idppsicoresponsabilidad_elimina:['.'],    
      idppsicoresponsabilidad_sustitucion:['.'],   
      idppsicoresponsabilidad_ctrlingenieria:['.'], 
      idppsicoresponsabilidad_ctrladmin:['.'],  
      idppsicoresponsabilidad_equipoeleme:['.'],
      /* Psicosocial - Trabajo repetitivo */
      idppsicorepetitivo_efectos:['.'],
      idppsicorepetitivo_ctrlfuente:['.'],
      idppsicorepetitivo_ctrlmedio:['.'],
      idppsicorepetitivo_ctrlindividuo:['.'],
      idppsicorepetitivo_tb_nd:[0],
      idppsicorepetitivo_tb_ne:[0],
      idppsicorepetitivo_tb_np:[0],
      idppsicorepetitivo_interpreta:['.'],
      idppsicorepetitivo_tb_nc:[0],
      idppsicorepetitivo_intervencion:[0],
      idppsicorepetitivo_tb_nr:['.'],
      idppsicorepetitivo_numpuestos:[0],
      idppsicorepetitivo_observaciones:['.'],
      idppsicorepetitivo_peorconsecue:['.'], 
      idppsicorepetitivo_existerequisito:['.'], 
      idppsicorepetitivo_elimina:['.'],    
      idppsicorepetitivo_sustitucion:['.'],   
      idppsicorepetitivo_ctrlingenieria:['.'], 
      idppsicorepetitivo_ctrladmin:['.'],  
      idppsicorepetitivo_equipoeleme:['.'],
      /* ----------------------PÚBLICOS------------------- */
      /* Públicos - Situación de atraco o robo */
      idppublicorobo_efectos:['.'],
      idppublicorobo_ctrlfuente:['.'],
      idppublicorobo_ctrlmedio:['.'],
      idppublicorobo_ctrlindividuo:['.'],
      idppublicorobo_tb_nd:[0],
      idppublicorobo_tb_ne:[0],
      idppublicorobo_tb_np:[0],
      idppublicorobo_interpreta:['.'],
      idppublicorobo_tb_nc:[0],
      idppublicorobo_intervencion:[0],
      idppublicorobo_tb_nr:['.'],
      idppublicorobo_numpuestos:[0],
      idppublicorobo_observaciones:['.'],
      idppublicorobo_peorconsecue:['.'], 
      idppublicorobo_existerequisito:['.'], 
      idppublicorobo_elimina:['.'],    
      idppublicorobo_sustitucion:['.'],   
      idppublicorobo_ctrlingenieria:['.'], 
      idppublicorobo_ctrladmin:['.'],  
      idppublicorobo_equipoeleme:['.'],
      /* Públicos - Terrorismo */
      idppublicoterrorismo_efectos:['.'],
      idppublicoterrorismo_ctrlfuente:['.'],
      idppublicoterrorismo_ctrlmedio:['.'],
      idppublicoterrorismo_ctrlindividuo:['.'],
      idppublicoterrorismo_tb_nd:[0],
      idppublicoterrorismo_tb_ne:[0],
      idppublicoterrorismo_tb_np:[0],
      idppublicoterrorismo_interpreta:['.'],
      idppublicoterrorismo_tb_nc:[0],
      idppublicoterrorismo_intervencion:[0],
      idppublicoterrorismo_tb_nr:['.'],
      idppublicoterrorismo_numpuestos:[0],
      idppublicoterrorismo_observaciones:['.'],
      idppublicoterrorismo_peorconsecue:['.'], 
      idppublicoterrorismo_existerequisito:['.'], 
      idppublicoterrorismo_elimina:['.'],    
      idppublicoterrorismo_sustitucion:['.'],   
      idppublicoterrorismo_ctrlingenieria:['.'], 
      idppublicoterrorismo_ctrladmin:['.'],  
      idppublicoterrorismo_equipoeleme:['.'],
      /* Públicos - Situación de Agresión fisica */
      idppublicoagresion_efectos:['.'],
      idppublicoagresion_ctrlfuente:['.'],
      idppublicoagresion_ctrlmedio:['.'],
      idppublicoagresion_ctrlindividuo:['.'],
      idppublicoagresion_tb_nd:[0],
      idppublicoagresion_tb_ne:[0],
      idppublicoagresion_tb_np:[0],
      idppublicoagresion_interpreta:['.'],
      idppublicoagresion_tb_nc:[0],
      idppublicoagresion_intervencion:[0],
      idppublicoagresion_tb_nr:['.'],
      idppublicoagresion_numpuestos:[0],
      idppublicoagresion_observaciones:['.'],
      idppublicoagresion_peorconsecue:['.'], 
      idppublicoagresion_existerequisito:['.'], 
      idppublicoagresion_elimina:['.'],    
      idppublicoagresion_sustitucion:['.'],   
      idppublicoagresion_ctrlingenieria:['.'], 
      idppublicoagresion_ctrladmin:['.'],  
      idppublicoagresion_equipoeleme:['.'], 
      /* Públicos - Situación de asonada */
      idppublicoasonada_efectos:['.'],
      idppublicoasonada_ctrlfuente:['.'],
      idppublicoasonada_ctrlmedio:['.'],
      idppublicoasonada_ctrlindividuo:['.'],
      idppublicoasonada_tb_nd:[0],
      idppublicoasonada_tb_ne:[0],
      idppublicoasonada_tb_np:[0],
      idppublicoasonada_interpreta:['.'],
      idppublicoasonada_tb_nc:[0],
      idppublicoasonada_intervencion:[0],
      idppublicoasonada_tb_nr:['.'],
      idppublicoasonada_numpuestos:[0],
      idppublicoasonada_observaciones:['.'],
      idppublicoasonada_peorconsecue:['.'], 
      idppublicoasonada_existerequisito:['.'], 
      idppublicoasonada_elimina:['.'],    
      idppublicoasonada_sustitucion:['.'],   
      idppublicoasonada_ctrlingenieria:['.'], 
      idppublicoasonada_ctrladmin:['.'],  
      idppublicoasonada_equipoeleme:['.'],
      /* ----------------------TRANSITO------------------- */
      /* Transito - Transporte motocicleta */
      idptransitomoto_efectos:['.'],
      idptransitomoto_ctrlfuente:['.'],
      idptransitomoto_ctrlmedio:['.'],
      idptransitomoto_ctrlindividuo:['.'],
      idptransitomoto_tb_nd:[0],
      idptransitomoto_tb_ne:[0],
      idptransitomoto_tb_np:[0],
      idptransitomoto_interpreta:['.'],
      idptransitomoto_tb_nc:[0],
      idptransitomoto_intervencion:[0],
      idptransitomoto_tb_nr:['.'],
      idptransitomoto_numpuestos:[0],
      idptransitomoto_observaciones:['.'],
      idptransitomoto_peorconsecue:['.'], 
      idptransitomoto_existerequisito:['.'],
      idptransitomoto_elimina:['.'],    
      idptransitomoto_sustitucion:['.'],   
      idptransitomoto_ctrlingenieria:['.'], 
      idptransitomoto_ctrladmin:['.'],  
      idptransitomoto_equipoeleme:['.'],
      /* Transito - Transporte carro / ambulancia */
      idptransitocarro_efectos:['.'],
      idptransitocarro_ctrlfuente:['.'],
      idptransitocarro_ctrlmedio:['.'],
      idptransitocarro_ctrlindividuo:['.'],
      idptransitocarro_tb_nd:[0],
      idptransitocarro_tb_ne:[0],
      idptransitocarro_tb_np:[0],
      idptransitocarro_interpreta:['.'],
      idptransitocarro_tb_nc:[0],
      idptransitocarro_intervencion:[0],
      idptransitocarro_tb_nr:['.'],
      idptransitocarro_numpuestos:[0],
      idptransitocarro_observaciones:['.'],
      idptransitocarro_peorconsecue:['.'], 
      idptransitocarro_existerequisito:['.'], 
      idptransitocarro_elimina:['.'],    
      idptransitocarro_sustitucion:['.'],   
      idptransitocarro_ctrlingenieria:['.'], 
      idptransitocarro_ctrladmin:['.'],  
      idptransitocarro_equipoeleme:['.'], 
      /* ----------------------QUÍMICOS-------------------- */
      /* Químicos - Aerosoles, líquidos, rocíos */
      idpquimicosaerosol_efectos:['.'],
      idpquimicosaerosol_ctrlfuente:['.'],
      idpquimicosaerosol_ctrlmedio:['.'],
      idpquimicosaerosol_ctrlindividuo:['.'],
      idpquimicosaerosol_tb_nd:[0],
      idpquimicosaerosol_tb_ne:[0],
      idpquimicosaerosol_tb_np:[0],
      idpquimicosaerosol_interpreta:['.'],
      idpquimicosaerosol_tb_nc:[0],
      idpquimicosaerosol_intervencion:[0],
      idpquimicosaerosol_tb_nr:['.'],
      idpquimicosaerosol_numpuestos:[0],
      idpquimicosaerosol_observaciones:['.'],
      idpquimicosaerosol_peorconsecue:['.'], 
      idpquimicosaerosol_existerequisito:['.'], 
      idpquimicosaerosol_elimina:['.'],    
      idpquimicosaerosol_sustitucion:['.'],   
      idpquimicosaerosol_ctrlingenieria:['.'], 
      idpquimicosaerosol_ctrladmin:['.'],  
      idpquimicosaerosol_equipoeleme:['.'],
      /* Químicos - Gases y vapores */
      idpquimicosgases_efectos:['.'],
      idpquimicosgases_ctrlfuente:['.'],
      idpquimicosgases_ctrlmedio:['.'],
      idpquimicosgases_ctrlindividuo:['.'],
      idpquimicosgases_tb_nd:[0],
      idpquimicosgases_tb_ne:[0],
      idpquimicosgases_tb_np:[0],
      idpquimicosgases_interpreta:['.'],
      idpquimicosgases_tb_nc:[0],
      idpquimicosgases_intervencion:[0],
      idpquimicosgases_tb_nr:['.'],
      idpquimicosgases_numpuestos:[0],
      idpquimicosgases_observaciones:['.'],
      idpquimicosgases_peorconsecue:['.'], 
      idpquimicosgases_existerequisito:['.'], 
      idpquimicosgases_elimina:['.'],    
      idpquimicosgases_sustitucion:['.'],   
      idpquimicosgases_ctrlingenieria:['.'], 
      idpquimicosgases_ctrladmin:['.'],  
      idpquimicosgases_equipoeleme:['.'],
      /* Químicos - Sustancias sólidas (polvos) */
      idpquimicossustanc_efectos:['.'],
      idpquimicossustanc_ctrlfuente:['.'],
      idpquimicossustanc_ctrlmedio:['.'],
      idpquimicossustanc_ctrlindividuo:['.'],
      idpquimicossustanc_tb_nd:[0],
      idpquimicossustanc_tb_ne:[0],
      idpquimicossustanc_tb_np:[0],
      idpquimicossustanc_interpreta:['.'],
      idpquimicossustanc_tb_nc:[0],
      idpquimicossustanc_intervencion:[0],
      idpquimicossustanc_tb_nr:['.'],
      idpquimicossustanc_numpuestos:[0],
      idpquimicossustanc_observaciones:['.'],
      idpquimicossustanc_peorconsecue:['.'], 
      idpquimicossustanc_existerequisito:['.'], 
      idpquimicossustanc_elimina:['.'],    
      idpquimicossustanc_sustitucion:['.'],   
      idpquimicossustanc_ctrlingenieria:['.'], 
      idpquimicossustanc_ctrladmin:['.'],  
      idpquimicossustanc_equipoeleme:['.'],
      /* Químicos - Contacto y/o salpicadura de químicos */
      idpquimicoscontacto_efectos:['.'],
      idpquimicoscontacto_ctrlfuente:['.'],
      idpquimicoscontacto_ctrlmedio:['.'],
      idpquimicoscontacto_ctrlindividuo:['.'],
      idpquimicoscontacto_tb_nd:[0],
      idpquimicoscontacto_tb_ne:[0],
      idpquimicoscontacto_tb_np:[0],
      idpquimicoscontacto_interpreta:['.'],
      idpquimicoscontacto_tb_nc:[0],
      idpquimicoscontacto_intervencion:[0],
      idpquimicoscontacto_tb_nr:['.'],
      idpquimicoscontacto_numpuestos:[0],
      idpquimicoscontacto_observaciones:['.'],
      idpquimicoscontacto_peorconsecue:['.'], 
      idpquimicoscontacto_existerequisito:['.'], 
      idpquimicoscontacto_elimina:['.'],    
      idpquimicoscontacto_sustitucion:['.'],   
      idpquimicoscontacto_ctrlingenieria:['.'], 
      idpquimicoscontacto_ctrladmin:['.'],  
      idpquimicoscontacto_equipoeleme:['.'],
      /* ----------------------TAREAS DE ALTO RIESGO------------------- */
      /* Tareas de alto riesgo - Trabajo en alturas por encima de 1.50 metros */
      idptareasalturas_efectos:['.'],
      idptareasalturas_ctrlfuente:['.'],
      idptareasalturas_ctrlmedio:['.'],
      idptareasalturas_ctrlindividuo:['.'],
      idptareasalturas_tb_nd:[0],
      idptareasalturas_tb_ne:[0],
      idptareasalturas_tb_np:[0],
      idptareasalturas_interpreta:['.'],
      idptareasalturas_tb_nc:[0],
      idptareasalturas_intervencion:[0],
      idptareasalturas_tb_nr:['.'],
      idptareasalturas_numpuestos:[0],
      idptareasalturas_observaciones:['.'],
      idptareasalturas_peorconsecue:['.'], 
      idptareasalturas_existerequisito:['.'], 
      idptareasalturas_elimina:['.'],    
      idptareasalturas_sustitucion:['.'],   
      idptareasalturas_ctrlingenieria:['.'], 
      idptareasalturas_ctrladmin:['.'],  
      idptareasalturas_equipoeleme:['.'], 
      /* Tareas de alto riesgo - Trabajo en espacios confinados */
      idptareasconfinados_efectos:['.'],
      idptareasconfinados_ctrlfuente:['.'],
      idptareasconfinados_ctrlmedio:['.'],
      idptareasconfinados_ctrlindividuo:['.'],
      idptareasconfinados_tb_nd:[0],
      idptareasconfinados_tb_ne:[0],
      idptareasconfinados_tb_np:[0],
      idptareasconfinados_interpreta:['.'],
      idptareasconfinados_tb_nc:[0],
      idptareasconfinados_intervencion:[0],
      idptareasconfinados_tb_nr:['.'],
      idptareasconfinados_numpuestos:[0],
      idptareasconfinados_observaciones:['.'],
      idptareasconfinados_peorconsecue:['.'], 
      idptareasconfinados_existerequisito:['.'], 
      idptareasconfinados_elimina:['.'],    
      idptareasconfinados_sustitucion:['.'],   
      idptareasconfinados_ctrlingenieria:['.'], 
      idptareasconfinados_ctrladmin:['.'],  
      idptareasconfinados_equipoeleme:['.'],
      /* Tareas de alto riesgo - Trabajo en caliente corte y soldadura */
      idptareassoldadura_efectos:['.'],
      idptareassoldadura_ctrlfuente:['.'],
      idptareassoldadura_ctrlmedio:['.'],
      idptareassoldadura_ctrlindividuo:['.'],
      idptareassoldadura_tb_nd:[0],
      idptareassoldadura_tb_ne:[0],
      idptareassoldadura_tb_np:[0],
      idptareassoldadura_interpreta:['.'],
      idptareassoldadura_tb_nc:[0],
      idptareassoldadura_intervencion:[0],
      idptareassoldadura_tb_nr:['.'],
      idptareassoldadura_numpuestos:[0],
      idptareassoldadura_observaciones:['.'],
      idptareassoldadura_peorconsecue:['.'], 
      idptareassoldadura_existerequisito:['.'], 
      idptareassoldadura_elimina:['.'],    
      idptareassoldadura_sustitucion:['.'],   
      idptareassoldadura_ctrlingenieria:['.'], 
      idptareassoldadura_ctrladmin:['.'],  
      idptareassoldadura_equipoeleme:['.'],
    })
  }

  async onSubmit(){

    if(this.vrform.valid){

      if(this.localVR !== null){
        const id = this.localVR.idp_id;
        this.vrform.value.idpusuariomod = this.userMod;
        this.valoraRiesgoService.updatevalorRiesgo(this.vrform.value,id).toPromise().then((data:any)=>{
          if(data){
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'El registro se ha actualizado exitosamente', life: 5000});
          }
          setTimeout(() => {
            this.limpiarForm();
          }, 500);
        }, err => {
          console.log(err);
          this._messageService.add({severity: 'error',summary: 'Fallido',detail: 'Surgio un error al actualizar el registro', life: 5000});
        });
      }else{
        await this.valoraRiesgoService.createvalorRiesgo(this.vrform.value).toPromise().then((data:ValorRiesgoModel)=>{
          
          if(data.idp_id !== 0){
            this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'El registro se ha creado exitosamente', life: 5000});
          }
          setTimeout(() => {
            this.limpiarForm();
          }, 500);
        }, err => {
          console.log(err);
          this._messageService.add({severity: 'error',summary: 'Fallido',detail: 'Surgio un error al crear el registro', life: 5000});
        });
      }
    }else{
      this._messageService.add({severity: 'error',summary: 'fallido',detail: 'Surgio un error', life: 3000});
    }

  }

  limpiarForm(){
    this.vrform.reset();
    this.router.navigate(["/main/valor-riesgo"]);
  }

  async buscarArea(){

    let id:number =  0;
    if (this.localVR !== null) {
      id = this.localVR.idpempresa;
    }else{
      id = this.idEmpresa;
    }
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

    if(this.localVR !== null){
      this.vrform.patchValue({
        idparea:this.localVR.idparea
      });
    }
    
  }

  modoEdicion(){
    if(this.localVR !== null){

      this.vrform.patchValue({
        /* ----------------------DATOS GENERALES------------------- */
        idpfecha:this.localVR.idpfecha,
        idpempresa:this.localVR.idpempresa,
        idpsede:this.localVR.idpsede,
        idphorario:this.localVR.idphorario,
        idpelemntoprot:this.localVR.idpelemntoprot,
        idpactrutinarias:this.localVR.idpactrutinarias,
        idpactnorutinarias:this.localVR.idpactnorutinarias,
        idpatpresentados:this.localVR.idpatpresentados,
        idpcedula:this.localVR.idpcedula,
        idpnombre:this.localVR.idpnombre,
        idptelefono:this.localVR.idptelefono,
        idpprocesoactividad:this.localVR.idpprocesoactividad,
        idpampliarobservac:this.localVR.idpampliarobservac,
        idpusuariocrea:this.localVR.idpusuariocrea,
        idpusuariomod:this.localVR.idpusuariomod,
        idpestado:this.localVR.idpestado,
        /*-------------------ULTIMOS CAMPOS AGREGADOS-------------------- */
        idpproceso:this.localVR.idpproceso,
        idpzona:this.localVR.idpzona,
        idpactividades:this.localVR.idpactividades,
        idptareas:this.localVR.idptareas,
        idprutinario:this.localVR.idprutinario,
        /* ----------------------BIOLOGICO------------------- */
        /*Biologico - Derivados de origen animal */
        idpbioderani_efectos:this.localVR.idpbioderani_efectos,
        idpbioderani_ctrlfuente:this.localVR.idpbioderani_ctrlfuente,
        idpbioderani_ctrlmedio:this.localVR.idpbioderani_ctrlmedio,
        idpbioderani_ctrlindividuo:this.localVR.idpbioderani_ctrlindividuo,
        idpbioderani_tb_nd:this.localVR.idpbioderani_tb_nd,
        idpbioderani_tb_ne:this.localVR.idpbioderani_tb_ne,
        idpbioderani_tb_np:this.localVR.idpbioderani_tb_np,
        idpbioderani_interpreta:this.localVR.idpbioderani_interpreta,
        idpbioderani_tb_nc:this.localVR.idpbioderani_tb_nc,
        idpbioderani_intervencion:this.localVR.idpbioderani_intervencion,
        idpbioderani_tb_nr:this.localVR.idpbioderani_tb_nr,
        idpbioderani_numpuestos:this.localVR.idpbioderani_numpuestos,
        idpbioderani_observaciones:this.localVR.idpbioderani_observaciones,
        idpbioderani_peorconsecue:this.localVR.idpbioderani_peorconsecue,
        idpbioderani_existerequisito:this.localVR.idpbioderani_existerequisito, 
        idpbioderani_elimina:this.localVR.idpbioderani_elimina,  
        idpbioderani_sustitucion:this.localVR.idpbioderani_sustitucion,  
        idpbioderani_ctrlingenieria:this.localVR.idpbioderani_ctrlingenieria, 
        idpbioderani_ctrladmin:this.localVR.idpbioderani_ctrladmin,
        idpbioderani_equipoeleme:this.localVR.idpbioderani_equipoeleme,
        /*Biologico - Microorganismos tipo hongo */
        idpbiohongo_efectos:this.localVR.idpbiohongo_efectos,
        idpbiohongo_ctrlfuente:this.localVR.idpbiohongo_ctrlfuente,
        idpbiohongo_ctrlmedio:this.localVR.idpbiohongo_ctrlmedio,
        idpbiohongo_ctrlindividuo:this.localVR.idpbiohongo_ctrlindividuo,
        idpbiohongo_tb_nd:this.localVR.idpbiohongo_tb_nd,
        idpbiohongo_tb_ne:this.localVR.idpbiohongo_tb_ne,
        idpbiohongo_tb_np:this.localVR.idpbiohongo_tb_np,
        idpbiohongo_interpreta:this.localVR.idpbiohongo_interpreta,
        idpbiohongo_tb_nc:this.localVR.idpbiohongo_tb_nc,
        idpbiohongo_intervencion:this.localVR.idpbiohongo_intervencion,
        idpbiohongo_tb_nr:this.localVR.idpbiohongo_tb_nr,
        idpbiohongo_numpuestos:this.localVR.idpbiohongo_numpuestos,
        idpbiohongo_observaciones:this.localVR.idpbiohongo_observaciones,
        idpbiohongo_peorconsecue:this.localVR.idpbiohongo_peorconsecue,
        idpbiohongo_existerequisito:this.localVR.idpbiohongo_existerequisito,
        idpbiohongo_elimina:this.localVR.idpbiohongo_elimina,
        idpbiohongo_sustitucion:this.localVR.idpbiohongo_sustitucion,  
        idpbiohongo_ctrlingenieria:this.localVR.idpbiohongo_ctrlingenieria,
        idpbiohongo_ctrladmin:this.localVR.idpbiohongo_ctrladmin,
        idpbiohongo_equipoeleme:this.localVR.idpbiohongo_equipoeleme,
        /*Biologico - Microorganismos tipo bacterias */
        idpbiobacterias_efectos:this.localVR.idpbiobacterias_efectos,
        idpbiobacterias_ctrlfuente:this.localVR.idpbiobacterias_ctrlfuente,
        idpbiobacterias_ctrlmedio:this.localVR.idpbiobacterias_ctrlmedio,
        idpbiobacterias_ctrlindividuo:this.localVR.idpbiobacterias_ctrlindividuo,
        idpbiobacterias_tb_nd:this.localVR.idpbiobacterias_tb_nd,
        idpbiobacterias_tb_ne:this.localVR.idpbiobacterias_tb_ne,
        idpbiobacterias_tb_np:this.localVR.idpbiobacterias_tb_np,
        idpbiobacterias_interpreta:this.localVR.idpbiobacterias_interpreta,
        idpbiobacterias_tb_nc:this.localVR.idpbiobacterias_tb_nc,
        idpbiobacterias_intervencion:this.localVR.idpbiobacterias_intervencion,
        idpbiobacterias_tb_nr:this.localVR.idpbiobacterias_tb_nr,
        idpbiobacterias_numpuestos:this.localVR.idpbiobacterias_numpuestos,
        idpbiobacterias_observaciones:this.localVR.idpbiobacterias_observaciones,
        idpbiobacterias_peorconsecue:this.localVR.idpbiobacterias_peorconsecue, 
        idpbiobacterias_existerequisito:this.localVR.idpbiobacterias_existerequisito, 
        idpbiobacterias_elimina:this.localVR.idpbiobacterias_elimina,    
        idpbiobacterias_sustitucion:this.localVR.idpbiobacterias_sustitucion,   
        idpbiobacterias_ctrlingenieria:this.localVR.idpbiobacterias_ctrlingenieria, 
        idpbiobacterias_ctrladmin:this.localVR.idpbiobacterias_ctrladmin,  
        idpbiobacterias_equipoeleme:this.localVR.idpbiobacterias_equipoeleme,
        /*Biologico - Microorganismos tipo virus */
        idpbiovirus_efectos:this.localVR.idpbiovirus_efectos,
        idpbiovirus_ctrlfuente:this.localVR.idpbiovirus_ctrlfuente,
        idpbiovirus_ctrlmedio:this.localVR.idpbiovirus_ctrlmedio,
        idpbiovirus_ctrlindividuo:this.localVR.idpbiovirus_ctrlindividuo,
        idpbiovirus_tb_nd:this.localVR.idpbiovirus_tb_nd,
        idpbiovirus_tb_ne:this.localVR.idpbiovirus_tb_ne,
        idpbiovirus_tb_np:this.localVR.idpbiovirus_tb_np,
        idpbiovirus_interpreta:this.localVR.idpbiovirus_interpreta,
        idpbiovirus_tb_nc:this.localVR.idpbiovirus_tb_nc,
        idpbiovirus_intervencion:this.localVR.idpbiovirus_intervencion,
        idpbiovirus_tb_nr:this.localVR.idpbiovirus_tb_nr,
        idpbiovirus_numpuestos:this.localVR.idpbiovirus_numpuestos,
        idpbiovirus_observaciones:this.localVR.idpbiovirus_observaciones,
        idpbiovirus_peorconsecue:this.localVR.idpbiovirus_peorconsecue, 
        idpbiovirus_existerequisito:this.localVR.idpbiovirus_existerequisito, 
        idpbiovirus_elimina:this.localVR.idpbiovirus_elimina,    
        idpbiovirus_sustitucion:this.localVR.idpbiovirus_sustitucion,   
        idpbiovirus_ctrlingenieria:this.localVR.idpbiovirus_ctrlingenieria, 
        idpbiovirus_ctrladmin:this.localVR.idpbiovirus_ctrladmin,  
        idpbiovirus_equipoeleme:this.localVR.idpbiovirus_equipoeleme, 
        /*Biologico - Parásitos */
        idpbioparasitos_efectos:this.localVR.idpbioparasitos_efectos,
        idpbioparasitos_ctrlfuente:this.localVR.idpbioparasitos_ctrlfuente,
        idpbioparasitos_ctrlmedio:this.localVR.idpbioparasitos_ctrlmedio,
        idpbioparasitos_ctrlindividuo:this.localVR.idpbioparasitos_ctrlindividuo,
        idpbioparasitos_tb_nd:this.localVR.idpbioparasitos_tb_nd,
        idpbioparasitos_tb_ne:this.localVR.idpbioparasitos_tb_ne,
        idpbioparasitos_tb_np:this.localVR.idpbioparasitos_tb_np,
        idpbioparasitos_interpreta:this.localVR.idpbioparasitos_interpreta,
        idpbioparasitos_tb_nc:this.localVR.idpbioparasitos_tb_nc,
        idpbioparasitos_intervencion:this.localVR.idpbioparasitos_intervencion,
        idpbioparasitos_tb_nr:this.localVR.idpbioparasitos_tb_nr,
        idpbioparasitos_numpuestos:this.localVR.idpbioparasitos_numpuestos,
        idpbioparasitos_observaciones:this.localVR.idpbioparasitos_observaciones,
        idpbioparasitos_peorconsecue:this.localVR.idpbioparasitos_peorconsecue, 
        idpbioparasitos_existerequisito:this.localVR.idpbioparasitos_existerequisito, 
        idpbioparasitos_elimina:this.localVR.idpbioparasitos_elimina,    
        idpbioparasitos_sustitucion:this.localVR.idpbioparasitos_sustitucion,   
        idpbioparasitos_ctrlingenieria:this.localVR.idpbioparasitos_ctrlingenieria, 
        idpbioparasitos_ctrladmin:this.localVR.idpbioparasitos_ctrladmin,  
        idpbioparasitos_equipoeleme:this.localVR.idpbioparasitos_equipoeleme,
        /* ----------------------CARGA FÍSICA------------------- */
        /* Carga Física - Carga dinámica por esfuerzos */
        idpcargesfuerzos_efectos:this.localVR.idpcargesfuerzos_efectos,
        idpcargesfuerzos_ctrlfuente:this.localVR.idpcargesfuerzos_ctrlfuente,
        idpcargesfuerzos_ctrlmedio:this.localVR.idpcargesfuerzos_ctrlmedio,
        idpcargesfuerzos_ctrlindividuo:this.localVR.idpcargesfuerzos_ctrlindividuo,
        idpcargesfuerzos_tb_nd:this.localVR.idpcargesfuerzos_tb_nd,
        idpcargesfuerzos_tb_ne:this.localVR.idpcargesfuerzos_tb_ne,
        idpcargesfuerzos_tb_np:this.localVR.idpcargesfuerzos_tb_np,
        idpcargesfuerzos_interpreta:this.localVR.idpcargesfuerzos_interpreta,
        idpcargesfuerzos_tb_nc:this.localVR.idpcargesfuerzos_tb_nc,
        idpcargesfuerzos_intervencion:this.localVR.idpcargesfuerzos_intervencion,
        idpcargesfuerzos_tb_nr:this.localVR.idpcargesfuerzos_tb_nr,
        idpcargesfuerzos_numpuestos:this.localVR.idpcargesfuerzos_numpuestos,
        idpcargesfuerzos_observaciones:this.localVR.idpcargesfuerzos_observaciones,
        idpcargesfuerzos_peorconsecue:this.localVR.idpcargesfuerzos_peorconsecue, 
        idpcargesfuerzos_existerequisito:this.localVR.idpcargesfuerzos_existerequisito, 
        idpcargesfuerzos_elimina:this.localVR.idpcargesfuerzos_elimina,    
        idpcargesfuerzos_sustitucion:this.localVR.idpcargesfuerzos_sustitucion,   
        idpcargesfuerzos_ctrlingenieria:this.localVR.idpcargesfuerzos_ctrlingenieria, 
        idpcargesfuerzos_ctrladmin:this.localVR.idpcargesfuerzos_ctrladmin,  
        idpcargesfuerzos_equipoeleme:this.localVR.idpcargesfuerzos_equipoeleme, 
        /* Carga Física - Carga dinámica por movimientos repetitivos */
        idpcargmovimiento_efectos:this.localVR.idpcargmovimiento_efectos,
        idpcargmovimiento_ctrlfuente:this.localVR.idpcargmovimiento_ctrlfuente,
        idpcargmovimiento_ctrlmedio:this.localVR.idpcargmovimiento_ctrlmedio,
        idpcargmovimiento_ctrlindividuo:this.localVR.idpcargmovimiento_ctrlindividuo,
        idpcargmovimiento_tb_nd:this.localVR.idpcargmovimiento_tb_nd,
        idpcargmovimiento_tb_ne:this.localVR.idpcargmovimiento_tb_ne,
        idpcargmovimiento_tb_np:this.localVR.idpcargmovimiento_tb_np,
        idpcargmovimiento_interpreta:this.localVR.idpcargmovimiento_interpreta,
        idpcargmovimiento_tb_nc:this.localVR.idpcargmovimiento_tb_nc,
        idpcargmovimiento_intervencion:this.localVR.idpcargmovimiento_intervencion,
        idpcargmovimiento_tb_nr:this.localVR.idpcargmovimiento_tb_nr,
        idpcargmovimiento_numpuestos:this.localVR.idpcargmovimiento_numpuestos,
        idpcargmovimiento_observaciones:this.localVR.idpcargmovimiento_observaciones,
        idpcargmovimiento_peorconsecue:this.localVR.idpcargmovimiento_peorconsecue, 
        idpcargmovimiento_existerequisito:this.localVR.idpcargmovimiento_existerequisito, 
        idpcargmovimiento_elimina:this.localVR.idpcargmovimiento_elimina,    
        idpcargmovimiento_sustitucion:this.localVR.idpcargmovimiento_sustitucion,   
        idpcargmovimiento_ctrlingenieria:this.localVR.idpcargmovimiento_ctrlingenieria, 
        idpcargmovimiento_ctrladmin:this.localVR.idpcargmovimiento_ctrladmin,  
        idpcargmovimiento_equipoeleme:this.localVR.idpcargmovimiento_equipoeleme,
        /* Carga Física - Carga dinámica por sobreesfuerzos de la voz */
        idpcargvoz_efectos:this.localVR.idpcargvoz_efectos,
        idpcargvoz_ctrlfuente:this.localVR.idpcargvoz_ctrlfuente,
        idpcargvoz_ctrlmedio:this.localVR.idpcargvoz_ctrlmedio,
        idpcargvoz_ctrlindividuo:this.localVR.idpcargvoz_ctrlindividuo,
        idpcargvoz_tb_nd:this.localVR.idpcargvoz_tb_nd,
        idpcargvoz_tb_ne:this.localVR.idpcargvoz_tb_ne,
        idpcargvoz_tb_np:this.localVR.idpcargvoz_tb_np,
        idpcargvoz_interpreta:this.localVR.idpcargvoz_interpreta,
        idpcargvoz_tb_nc:this.localVR.idpcargvoz_tb_nc,
        idpcargvoz_intervencion:this.localVR.idpcargvoz_intervencion,
        idpcargvoz_tb_nr:this.localVR.idpcargvoz_tb_nr,
        idpcargvoz_numpuestos:this.localVR.idpcargvoz_numpuestos,
        idpcargvoz_observaciones:this.localVR.idpcargvoz_observaciones,
        idpcargvoz_peorconsecue:this.localVR.idpcargvoz_peorconsecue, 
        idpcargvoz_existerequisito:this.localVR.idpcargvoz_existerequisito, 
        idpcargvoz_elimina:this.localVR.idpcargvoz_elimina,
        idpcargvoz_sustitucion:this.localVR.idpcargvoz_sustitucion,   
        idpcargvoz_ctrlingenieria:this.localVR.idpcargvoz_ctrlingenieria, 
        idpcargvoz_ctrladmin:this.localVR.idpcargvoz_ctrladmin,  
        idpcargvoz_equipoeleme:this.localVR.idpcargvoz_equipoeleme,
        /* Carga Física - Carga estática de pie */
        idpcargpie_efectos:this.localVR.idpcargpie_efectos,
        idpcargpie_ctrlfuente:this.localVR.idpcargpie_ctrlfuente,
        idpcargpie_ctrlmedio:this.localVR.idpcargpie_ctrlmedio,
        idpcargpie_ctrlindividuo:this.localVR.idpcargpie_ctrlindividuo,
        idpcargpie_tb_nd:this.localVR.idpcargpie_tb_nd,
        idpcargpie_tb_ne:this.localVR.idpcargpie_tb_ne,
        idpcargpie_tb_np:this.localVR.idpcargpie_tb_np,
        idpcargpie_interpreta:this.localVR.idpcargpie_interpreta,
        idpcargpie_tb_nc:this.localVR.idpcargpie_tb_nc,
        idpcargpie_intervencion:this.localVR.idpcargpie_intervencion,
        idpcargpie_tb_nr:this.localVR.idpcargpie_tb_nr,
        idpcargpie_numpuestos:this.localVR.idpcargpie_numpuestos,
        idpcargpie_observaciones:this.localVR.idpcargpie_observaciones,
        idpcargpie_peorconsecue:this.localVR.idpcargpie_peorconsecue, 
        idpcargpie_existerequisito:this.localVR.idpcargpie_existerequisito, 
        idpcargpie_elimina:this.localVR.idpcargpie_elimina,    
        idpcargpie_sustitucion:this.localVR.idpcargpie_sustitucion,   
        idpcargpie_ctrlingenieria:this.localVR.idpcargpie_ctrlingenieria, 
        idpcargpie_ctrladmin:this.localVR.idpcargpie_ctrladmin,  
        idpcargpie_equipoeleme:this.localVR.idpcargpie_equipoeleme,
        /* Carga Física - Posiciones prolongadas sentado */
        idpcargsentado_efectos:this.localVR.idpcargsentado_efectos,
        idpcargsentado_ctrlfuente:this.localVR.idpcargsentado_ctrlfuente,
        idpcargsentado_ctrlmedio:this.localVR.idpcargsentado_ctrlmedio,
        idpcargsentado_ctrlindividuo:this.localVR.idpcargsentado_ctrlindividuo,
        idpcargsentado_tb_nd:this.localVR.idpcargsentado_tb_nd,
        idpcargsentado_tb_ne:this.localVR.idpcargsentado_tb_ne,
        idpcargsentado_tb_np:this.localVR.idpcargsentado_tb_np,
        idpcargsentado_interpreta:this.localVR.idpcargsentado_interpreta,
        idpcargsentado_tb_nc:this.localVR.idpcargsentado_tb_nc,
        idpcargsentado_intervencion:this.localVR.idpcargsentado_intervencion,
        idpcargsentado_tb_nr:this.localVR.idpcargsentado_tb_nr,
        idpcargsentado_numpuestos:this.localVR.idpcargsentado_numpuestos,
        idpcargsentado_observaciones:this.localVR.idpcargsentado_observaciones,
        idpcargsentado_peorconsecue:this.localVR.idpcargsentado_peorconsecue, 
        idpcargsentado_existerequisito:this.localVR.idpcargsentado_existerequisito, 
        idpcargsentado_elimina:this.localVR.idpcargsentado_elimina,    
        idpcargsentado_sustitucion:this.localVR.idpcargsentado_sustitucion,   
        idpcargsentado_ctrlingenieria:this.localVR.idpcargsentado_ctrlingenieria, 
        idpcargsentado_ctrladmin:this.localVR.idpcargsentado_ctrladmin,  
        idpcargsentado_equipoeleme:this.localVR.idpcargsentado_equipoeleme,
        /* ----------------------ELÉCTRICO------------------- */
        /* Eléctrico - Energía eléctrica de baja */
        idpelectricobaja_efectos:this.localVR.idpelectricobaja_efectos,
        idpelectricobaja_ctrlfuente:this.localVR.idpelectricobaja_ctrlfuente,
        idpelectricobaja_ctrlmedio:this.localVR.idpelectricobaja_ctrlmedio,
        idpelectricobaja_ctrlindividuo:this.localVR.idpelectricobaja_ctrlindividuo,
        idpelectricobaja_tb_nd:this.localVR.idpelectricobaja_tb_nd,
        idpelectricobaja_tb_ne:this.localVR.idpelectricobaja_tb_ne,
        idpelectricobaja_tb_np:this.localVR.idpelectricobaja_tb_np,
        idpelectricobaja_interpreta:this.localVR.idpelectricobaja_interpreta,
        idpelectricobaja_tb_nc:this.localVR.idpelectricobaja_tb_nc,
        idpelectricobaja_intervencion:this.localVR.idpelectricobaja_intervencion,
        idpelectricobaja_tb_nr:this.localVR.idpelectricobaja_tb_nr,
        idpelectricobaja_numpuestos:this.localVR.idpelectricobaja_numpuestos,
        idpelectricobaja_observaciones:this.localVR.idpelectricobaja_observaciones,
        idpelectricobaja_peorconsecue:this.localVR.idpelectricobaja_peorconsecue, 
        idpelectricobaja_existerequisito:this.localVR.idpelectricobaja_existerequisito, 
        idpelectricobaja_elimina:this.localVR.idpelectricobaja_elimina,    
        idpelectricobaja_sustitucion:this.localVR.idpelectricobaja_sustitucion,   
        idpelectricobaja_ctrlingenieria:this.localVR.idpelectricobaja_ctrlingenieria, 
        idpelectricobaja_ctrladmin:this.localVR.idpelectricobaja_ctrladmin,  
        idpelectricobaja_equipoeleme:this.localVR.idpelectricobaja_equipoeleme,
        /* Eléctrico - Energía eléctrica de alta */
        idpelectricoalta_efectos:this.localVR.idpelectricoalta_efectos,
        idpelectricoalta_ctrlfuente:this.localVR.idpelectricoalta_ctrlfuente,
        idpelectricoalta_ctrlmedio:this.localVR.idpelectricoalta_ctrlmedio,
        idpelectricoalta_ctrlindividuo:this.localVR.idpelectricoalta_ctrlindividuo,
        idpelectricoalta_tb_nd:this.localVR.idpelectricoalta_tb_nd,
        idpelectricoalta_tb_ne:this.localVR.idpelectricoalta_tb_ne,
        idpelectricoalta_tb_np:this.localVR.idpelectricoalta_tb_np,
        idpelectricoalta_interpreta:this.localVR.idpelectricoalta_interpreta,
        idpelectricoalta_tb_nc:this.localVR.idpelectricoalta_tb_nc,
        idpelectricoalta_intervencion:this.localVR.idpelectricoalta_intervencion,
        idpelectricoalta_tb_nr:this.localVR.idpelectricoalta_tb_nr,
        idpelectricoalta_numpuestos:this.localVR.idpelectricoalta_numpuestos,
        idpelectricoalta_observaciones:this.localVR.idpelectricoalta_observaciones,
        idpelectricoalta_peorconsecue:this.localVR.idpelectricoalta_peorconsecue, 
        idpelectricoalta_existerequisito:this.localVR.idpelectricoalta_existerequisito, 
        idpelectricoalta_elimina:this.localVR.idpelectricoalta_elimina,    
        idpelectricoalta_sustitucion:this.localVR.idpelectricoalta_sustitucion,   
        idpelectricoalta_ctrlingenieria:this.localVR.idpelectricoalta_ctrlingenieria, 
        idpelectricoalta_ctrladmin:this.localVR.idpelectricoalta_ctrladmin,  
        idpelectricoalta_equipoeleme:this.localVR.idpelectricoalta_equipoeleme,
        /* Eléctrico - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados */
        idpelectricocables_efectos:this.localVR.idpelectricocables_efectos,
        idpelectricocables_ctrlfuente:this.localVR.idpelectricocables_ctrlfuente,
        idpelectricocables_ctrlmedio:this.localVR.idpelectricocables_ctrlmedio,
        idpelectricocables_ctrlindividuo:this.localVR.idpelectricocables_ctrlindividuo,
        idpelectricocables_tb_nd:this.localVR.idpelectricocables_tb_nd,
        idpelectricocables_tb_ne:this.localVR.idpelectricocables_tb_ne,
        idpelectricocables_tb_np:this.localVR.idpelectricocables_tb_np,
        idpelectricocables_interpreta:this.localVR.idpelectricocables_interpreta,
        idpelectricocables_tb_nc:this.localVR.idpelectricocables_tb_nc,
        idpelectricocables_intervencion:this.localVR.idpelectricocables_intervencion,
        idpelectricocables_tb_nr:this.localVR.idpelectricocables_tb_nr,
        idpelectricocables_numpuestos:this.localVR.idpelectricocables_numpuestos,
        idpelectricocables_observaciones:this.localVR.idpelectricocables_observaciones,
        idpelectricocables_peorconsecue:this.localVR.idpelectricocables_peorconsecue, 
        idpelectricocables_existerequisito:this.localVR.idpelectricocables_existerequisito, 
        idpelectricocables_elimina:this.localVR.idpelectricocables_elimina,    
        idpelectricocables_sustitucion:this.localVR.idpelectricocables_sustitucion,   
        idpelectricocables_ctrlingenieria:this.localVR.idpelectricocables_ctrlingenieria, 
        idpelectricocables_ctrladmin:this.localVR.idpelectricocables_ctrladmin,  
        idpelectricocables_equipoeleme:this.localVR.idpelectricocables_equipoeleme,
        /* ----------------------FÍSICO------------------- */
        /* Físico - Iluminación deficiente */
        idpfisicoilumdef_efectos:this.localVR.idpfisicoilumdef_efectos,
        idpfisicoilumdef_ctrlfuente:this.localVR.idpfisicoilumdef_ctrlfuente,
        idpfisicoilumdef_ctrlmedio:this.localVR.idpfisicoilumdef_ctrlmedio,
        idpfisicoilumdef_ctrlindividuo:this.localVR.idpfisicoilumdef_ctrlindividuo,
        idpfisicoilumdef_tb_nd:this.localVR.idpfisicoilumdef_tb_nd,
        idpfisicoilumdef_tb_ne:this.localVR.idpfisicoilumdef_tb_ne,
        idpfisicoilumdef_tb_np:this.localVR.idpfisicoilumdef_tb_np,
        idpfisicoilumdef_interpreta:this.localVR.idpfisicoilumdef_interpreta,
        idpfisicoilumdef_tb_nc:this.localVR.idpfisicoilumdef_tb_nc,
        idpfisicoilumdef_intervencion:this.localVR.idpfisicoilumdef_intervencion,
        idpfisicoilumdef_tb_nr:this.localVR.idpfisicoilumdef_tb_nr,
        idpfisicoilumdef_numpuestos:this.localVR.idpfisicoilumdef_numpuestos,
        idpfisicoilumdef_observaciones:this.localVR.idpfisicoilumdef_observaciones,
        idpfisicoilumdef_peorconsecue:this.localVR.idpfisicoilumdef_peorconsecue, 
        idpfisicoilumdef_existerequisito:this.localVR.idpfisicoilumdef_existerequisito, 
        idpfisicoilumdef_elimina:this.localVR.idpfisicoilumdef_elimina,    
        idpfisicoilumdef_sustitucion:this.localVR.idpfisicoilumdef_sustitucion,   
        idpfisicoilumdef_ctrlingenieria:this.localVR.idpfisicoilumdef_ctrlingenieria, 
        idpfisicoilumdef_ctrladmin:this.localVR.idpfisicoilumdef_ctrladmin,  
        idpfisicoilumdef_equipoeleme:this.localVR.idpfisicoilumdef_equipoeleme,
        /* Físico - Iluminación en exceso */
        idpfisicoilumexceso_efectos:this.localVR.idpfisicoilumexceso_efectos,
        idpfisicoilumexceso_ctrlfuente:this.localVR.idpfisicoilumexceso_ctrlfuente,
        idpfisicoilumexceso_ctrlmedio:this.localVR.idpfisicoilumexceso_ctrlmedio,
        idpfisicoilumexceso_ctrlindividuo:this.localVR.idpfisicoilumexceso_ctrlindividuo,
        idpfisicoilumexceso_tb_nd:this.localVR.idpfisicoilumexceso_tb_nd,
        idpfisicoilumexceso_tb_ne:this.localVR.idpfisicoilumexceso_tb_ne,
        idpfisicoilumexceso_tb_np:this.localVR.idpfisicoilumexceso_tb_np,
        idpfisicoilumexceso_interpreta:this.localVR.idpfisicoilumexceso_interpreta,
        idpfisicoilumexceso_tb_nc:this.localVR.idpfisicoilumexceso_tb_nc,
        idpfisicoilumexceso_intervencion:this.localVR.idpfisicoilumexceso_intervencion,
        idpfisicoilumexceso_tb_nr:this.localVR.idpfisicoilumexceso_tb_nr,
        idpfisicoilumexceso_numpuestos:this.localVR.idpfisicoilumexceso_numpuestos,
        idpfisicoilumexceso_observaciones:this.localVR.idpfisicoilumexceso_observaciones,
        idpfisicoilumexceso_peorconsecue:this.localVR.idpfisicoilumexceso_peorconsecue, 
        idpfisicoilumexceso_existerequisito:this.localVR.idpfisicoilumexceso_existerequisito, 
        idpfisicoilumexceso_elimina:this.localVR.idpfisicoilumexceso_elimina,    
        idpfisicoilumexceso_sustitucion:this.localVR.idpfisicoilumexceso_sustitucion,   
        idpfisicoilumexceso_ctrlingenieria:this.localVR.idpfisicoilumexceso_ctrlingenieria, 
        idpfisicoilumexceso_ctrladmin:this.localVR.idpfisicoilumexceso_ctrladmin,  
        idpfisicoilumexceso_equipoeleme:this.localVR.idpfisicoilumexceso_equipoeleme, 
        /* Físico - Radiaciones no ionizantes por ultravioleta */
        idpfisiconoradiaciones_efectos:this.localVR.idpfisiconoradiaciones_efectos,
        idpfisiconoradiaciones_ctrlfuente:this.localVR.idpfisiconoradiaciones_ctrlfuente,
        idpfisiconoradiaciones_ctrlmedio:this.localVR.idpfisiconoradiaciones_ctrlmedio,
        idpfisiconoradiaciones_ctrlindividuo:this.localVR.idpfisiconoradiaciones_ctrlindividuo,
        idpfisiconoradiaciones_tb_nd:this.localVR.idpfisiconoradiaciones_tb_nd,
        idpfisiconoradiaciones_tb_ne:this.localVR.idpfisiconoradiaciones_tb_ne,
        idpfisiconoradiaciones_tb_np:this.localVR.idpfisiconoradiaciones_tb_np,
        idpfisiconoradiaciones_interpreta:this.localVR.idpfisiconoradiaciones_interpreta,
        idpfisiconoradiaciones_tb_nc:this.localVR.idpfisiconoradiaciones_tb_nc,
        idpfisiconoradiaciones_intervencion:this.localVR.idpfisiconoradiaciones_intervencion,
        idpfisiconoradiaciones_tb_nr:this.localVR.idpfisiconoradiaciones_tb_nr,
        idpfisiconoradiaciones_numpuestos:this.localVR.idpfisiconoradiaciones_numpuestos,
        idpfisiconoradiaciones_observaciones:this.localVR.idpfisiconoradiaciones_observaciones,
        idpfisiconoradiaciones_peorconsecue:this.localVR.idpfisiconoradiaciones_peorconsecue, 
        idpfisiconoradiaciones_existerequisito:this.localVR.idpfisiconoradiaciones_existerequisito, 
        idpfisiconoradiaciones_elimina:this.localVR.idpfisiconoradiaciones_elimina,    
        idpfisiconoradiaciones_sustitucion:this.localVR.idpfisiconoradiaciones_sustitucion,   
        idpfisiconoradiaciones_ctrlingenieria:this.localVR.idpfisiconoradiaciones_ctrlingenieria, 
        idpfisiconoradiaciones_ctrladmin:this.localVR.idpfisiconoradiaciones_ctrladmin,  
        idpfisiconoradiaciones_equipoeleme:this.localVR.idpfisiconoradiaciones_equipoeleme,
        /* Físico - Radiaciones ionizantes */
        idpfisicoradiaciones_efectos:this.localVR.idpfisicoradiaciones_efectos,
        idpfisicoradiaciones_ctrlfuente:this.localVR.idpfisicoradiaciones_ctrlfuente,
        idpfisicoradiaciones_ctrlmedio:this.localVR.idpfisicoradiaciones_ctrlmedio,
        idpfisicoradiaciones_ctrlindividuo:this.localVR.idpfisicoradiaciones_ctrlindividuo,
        idpfisicoradiaciones_tb_nd:this.localVR.idpfisicoradiaciones_tb_nd,
        idpfisicoradiaciones_tb_ne:this.localVR.idpfisicoradiaciones_tb_ne,
        idpfisicoradiaciones_tb_np:this.localVR.idpfisicoradiaciones_tb_np,
        idpfisicoradiaciones_interpreta:this.localVR.idpfisicoradiaciones_interpreta,
        idpfisicoradiaciones_tb_nc:this.localVR.idpfisicoradiaciones_tb_nc,
        idpfisicoradiaciones_intervencion:this.localVR.idpfisicoradiaciones_intervencion,
        idpfisicoradiaciones_tb_nr:this.localVR.idpfisicoradiaciones_tb_nr,
        idpfisicoradiaciones_numpuestos:this.localVR.idpfisicoradiaciones_numpuestos,
        idpfisicoradiaciones_observaciones:this.localVR.idpfisicoradiaciones_observaciones,
        idpfisicoradiaciones_peorconsecue:this.localVR.idpfisicoradiaciones_peorconsecue, 
        idpfisicoradiaciones_existerequisito:this.localVR.idpfisicoradiaciones_existerequisito, 
        idpfisicoradiaciones_elimina:this.localVR.idpfisicoradiaciones_elimina,    
        idpfisicoradiaciones_sustitucion:this.localVR.idpfisicoradiaciones_sustitucion,   
        idpfisicoradiaciones_ctrlingenieria:this.localVR.idpfisicoradiaciones_ctrlingenieria, 
        idpfisicoradiaciones_ctrladmin:this.localVR.idpfisicoradiaciones_ctrladmin,  
        idpfisicoradiaciones_equipoeleme:this.localVR.idpfisicoradiaciones_equipoeleme,  
        /* Físico - Ruido */
        idpfisicoruido_efectos:this.localVR.idpfisicoruido_efectos,
        idpfisicoruido_ctrlfuente:this.localVR.idpfisicoruido_ctrlfuente,
        idpfisicoruido_ctrlmedio:this.localVR.idpfisicoruido_ctrlmedio,
        idpfisicoruido_ctrlindividuo:this.localVR.idpfisicoruido_ctrlindividuo,
        idpfisicoruido_tb_nd:this.localVR.idpfisicoruido_tb_nd,
        idpfisicoruido_tb_ne:this.localVR.idpfisicoruido_tb_ne,
        idpfisicoruido_tb_np:this.localVR.idpfisicoruido_tb_np,
        idpfisicoruido_interpreta:this.localVR.idpfisicoruido_interpreta,
        idpfisicoruido_tb_nc:this.localVR.idpfisicoruido_tb_nc,
        idpfisicoruido_intervencion:this.localVR.idpfisicoruido_intervencion,
        idpfisicoruido_tb_nr:this.localVR.idpfisicoruido_tb_nr,
        idpfisicoruido_numpuestos:this.localVR.idpfisicoruido_numpuestos,
        idpfisicoruido_observaciones:this.localVR.idpfisicoruido_observaciones,
        idpfisicoruido_peorconsecue:this.localVR.idpfisicoruido_peorconsecue, 
        idpfisicoruido_existerequisito:this.localVR.idpfisicoruido_existerequisito, 
        idpfisicoruido_elimina:this.localVR.idpfisicoruido_elimina,    
        idpfisicoruido_sustitucion:this.localVR.idpfisicoruido_sustitucion,   
        idpfisicoruido_ctrlingenieria:this.localVR.idpfisicoruido_ctrlingenieria, 
        idpfisicoruido_ctrladmin:this.localVR.idpfisicoruido_ctrladmin,  
        idpfisicoruido_equipoeleme:this.localVR.idpfisicoruido_equipoeleme, 
        /* Físico - Vibraciones */
        idpfisicovibraciones_efectos:this.localVR.idpfisicovibraciones_efectos,
        idpfisicovibraciones_ctrlfuente:this.localVR.idpfisicovibraciones_ctrlfuente,
        idpfisicovibraciones_ctrlmedio:this.localVR.idpfisicovibraciones_ctrlmedio,
        idpfisicovibraciones_ctrlindividuo:this.localVR.idpfisicovibraciones_ctrlindividuo,
        idpfisicovibraciones_tb_nd:this.localVR.idpfisicovibraciones_tb_nd,
        idpfisicovibraciones_tb_ne:this.localVR.idpfisicovibraciones_tb_ne,
        idpfisicovibraciones_tb_np:this.localVR.idpfisicovibraciones_tb_np,
        idpfisicovibraciones_interpreta:this.localVR.idpfisicovibraciones_interpreta,
        idpfisicovibraciones_tb_nc:this.localVR.idpfisicovibraciones_tb_nc,
        idpfisicovibraciones_intervencion:this.localVR.idpfisicovibraciones_intervencion,
        idpfisicovibraciones_tb_nr:this.localVR.idpfisicovibraciones_tb_nr,
        idpfisicovibraciones_numpuestos:this.localVR.idpfisicovibraciones_numpuestos,
        idpfisicovibraciones_observaciones:this.localVR.idpfisicovibraciones_observaciones,
        idpfisicovibraciones_peorconsecue:this.localVR.idpfisicovibraciones_peorconsecue, 
        idpfisicovibraciones_existerequisito:this.localVR.idpfisicovibraciones_existerequisito, 
        idpfisicovibraciones_elimina:this.localVR.idpfisicovibraciones_elimina,    
        idpfisicovibraciones_sustitucion:this.localVR.idpfisicovibraciones_sustitucion,   
        idpfisicovibraciones_ctrlingenieria:this.localVR.idpfisicovibraciones_ctrlingenieria, 
        idpfisicovibraciones_ctrladmin:this.localVR.idpfisicovibraciones_ctrladmin,  
        idpfisicovibraciones_equipoeleme:this.localVR.idpfisicovibraciones_equipoeleme,
        /* Físico - Transferencias de temperaturas por calor */
        idpfisicocalor_efectos:this.localVR.idpfisicocalor_efectos,
        idpfisicocalor_ctrlfuente:this.localVR.idpfisicocalor_ctrlfuente,
        idpfisicocalor_ctrlmedio:this.localVR.idpfisicocalor_ctrlmedio,
        idpfisicocalor_ctrlindividuo:this.localVR.idpfisicocalor_ctrlindividuo,
        idpfisicocalor_tb_nd:this.localVR.idpfisicocalor_tb_nd,
        idpfisicocalor_tb_ne:this.localVR.idpfisicocalor_tb_ne,
        idpfisicocalor_tb_np:this.localVR.idpfisicocalor_tb_np,
        idpfisicocalor_interpreta:this.localVR.idpfisicocalor_interpreta,
        idpfisicocalor_tb_nc:this.localVR.idpfisicocalor_tb_nc,
        idpfisicocalor_intervencion:this.localVR.idpfisicocalor_intervencion,
        idpfisicocalor_tb_nr:this.localVR.idpfisicocalor_tb_nr,
        idpfisicocalor_numpuestos:this.localVR.idpfisicocalor_numpuestos,
        idpfisicocalor_observaciones:this.localVR.idpfisicocalor_observaciones,
        idpfisicocalor_peorconsecue:this.localVR.idpfisicocalor_peorconsecue, 
        idpfisicocalor_existerequisito:this.localVR.idpfisicocalor_existerequisito, 
        idpfisicocalor_elimina:this.localVR.idpfisicocalor_elimina,    
        idpfisicocalor_sustitucion:this.localVR.idpfisicocalor_sustitucion,   
        idpfisicocalor_ctrlingenieria:this.localVR.idpfisicocalor_ctrlingenieria, 
        idpfisicocalor_ctrladmin:this.localVR.idpfisicocalor_ctrladmin,  
        idpfisicocalor_equipoeleme:this.localVR.idpfisicocalor_equipoeleme,
        /* Físico - Transferencias de temperaturas por frio */
        idpfisicofrio_efectos:this.localVR.idpfisicofrio_efectos,
        idpfisicofrio_ctrlfuente:this.localVR.idpfisicofrio_ctrlfuente,
        idpfisicofrio_ctrlmedio:this.localVR.idpfisicofrio_ctrlmedio,
        idpfisicofrio_ctrlindividuo:this.localVR.idpfisicofrio_ctrlindividuo,
        idpfisicofrio_tb_nd:this.localVR.idpfisicofrio_tb_nd,
        idpfisicofrio_tb_ne:this.localVR.idpfisicofrio_tb_ne,
        idpfisicofrio_tb_np:this.localVR.idpfisicofrio_tb_np,
        idpfisicofrio_interpreta:this.localVR.idpfisicofrio_interpreta,
        idpfisicofrio_tb_nc:this.localVR.idpfisicofrio_tb_nc,
        idpfisicofrio_intervencion:this.localVR.idpfisicofrio_intervencion,
        idpfisicofrio_tb_nr:this.localVR.idpfisicofrio_tb_nr,
        idpfisicofrio_numpuestos:this.localVR.idpfisicofrio_numpuestos,
        idpfisicofrio_observaciones:this.localVR.idpfisicofrio_observaciones,
        idpfisicofrio_peorconsecue:this.localVR.idpfisicofrio_peorconsecue, 
        idpfisicofrio_existerequisito:this.localVR.idpfisicofrio_existerequisito, 
        idpfisicofrio_elimina:this.localVR.idpfisicofrio_elimina,    
        idpfisicofrio_sustitucion:this.localVR.idpfisicofrio_sustitucion,   
        idpfisicofrio_ctrlingenieria:this.localVR.idpfisicofrio_ctrlingenieria, 
        idpfisicofrio_ctrladmin:this.localVR.idpfisicofrio_ctrladmin,  
        idpfisicofrio_equipoeleme:this.localVR.idpfisicofrio_equipoeleme, 
        /* ----------------------INCENDIOS / EXPLOSIONES------------------- */
        /* Incendios / Explosiones - Materiales combustibles */
        idpincendioscombust_efectos:this.localVR.idpincendioscombust_efectos,
        idpincendioscombust_ctrlfuente:this.localVR.idpincendioscombust_ctrlfuente,
        idpincendioscombust_ctrlmedio:this.localVR.idpincendioscombust_ctrlmedio,
        idpincendioscombust_ctrlindividuo:this.localVR.idpincendioscombust_ctrlindividuo,
        idpincendioscombust_tb_nd:this.localVR.idpincendioscombust_tb_nd,
        idpincendioscombust_tb_ne:this.localVR.idpincendioscombust_tb_ne,
        idpincendioscombust_tb_np:this.localVR.idpincendioscombust_tb_np,
        idpincendioscombust_interpreta:this.localVR.idpincendioscombust_interpreta,
        idpincendioscombust_tb_nc:this.localVR.idpincendioscombust_tb_nc,
        idpincendioscombust_intervencion:this.localVR.idpincendioscombust_intervencion,
        idpincendioscombust_tb_nr:this.localVR.idpincendioscombust_tb_nr,
        idpincendioscombust_numpuestos:this.localVR.idpincendioscombust_numpuestos,
        idpincendioscombust_observaciones:this.localVR.idpincendioscombust_observaciones,
        idpincendioscombust_peorconsecue:this.localVR.idpincendioscombust_peorconsecue, 
        idpincendioscombust_existerequisito:this.localVR.idpincendioscombust_existerequisito, 
        idpincendioscombust_elimina:this.localVR.idpincendioscombust_elimina,    
        idpincendioscombust_sustitucion:this.localVR.idpincendioscombust_sustitucion,   
        idpincendioscombust_ctrlingenieria:this.localVR.idpincendioscombust_ctrlingenieria, 
        idpincendioscombust_ctrladmin:this.localVR.idpincendioscombust_ctrladmin,  
        idpincendioscombust_equipoeleme:this.localVR.idpincendioscombust_equipoeleme, 
        /* Incendios / Explosiones - Ausencia de equipo contra incendio */
        idpincendiosequipo_efectos:this.localVR.idpincendiosequipo_efectos,
        idpincendiosequipo_ctrlfuente:this.localVR.idpincendiosequipo_ctrlfuente,
        idpincendiosequipo_ctrlmedio:this.localVR.idpincendiosequipo_ctrlmedio,
        idpincendiosequipo_ctrlindividuo:this.localVR.idpincendiosequipo_ctrlindividuo,
        idpincendiosequipo_tb_nd:this.localVR.idpincendiosequipo_tb_nd,
        idpincendiosequipo_tb_ne:this.localVR.idpincendiosequipo_tb_ne,
        idpincendiosequipo_tb_np:this.localVR.idpincendiosequipo_tb_np,
        idpincendiosequipo_interpreta:this.localVR.idpincendiosequipo_interpreta,
        idpincendiosequipo_tb_nc:this.localVR.idpincendiosequipo_tb_nc,
        idpincendiosequipo_intervencion:this.localVR.idpincendiosequipo_intervencion,
        idpincendiosequipo_tb_nr:this.localVR.idpincendiosequipo_tb_nr,
        idpincendiosequipo_numpuestos:this.localVR.idpincendiosequipo_numpuestos,
        idpincendiosequipo_observaciones:this.localVR.idpincendiosequipo_observaciones,
        idpincendiosequipo_peorconsecue:this.localVR.idpincendiosequipo_peorconsecue, 
        idpincendiosequipo_existerequisito:this.localVR.idpincendiosequipo_existerequisito, 
        idpincendiosequipo_elimina:this.localVR.idpincendiosequipo_elimina,    
        idpincendiosequipo_sustitucion:this.localVR.idpincendiosequipo_sustitucion,   
        idpincendiosequipo_ctrlingenieria:this.localVR.idpincendiosequipo_ctrlingenieria, 
        idpincendiosequipo_ctrladmin:this.localVR.idpincendiosequipo_ctrladmin,  
        idpincendiosequipo_equipoeleme:this.localVR.idpincendiosequipo_equipoeleme,
        /* Incendios / Explosiones - Sustancias inflamables */
        idpincendiossustancias_efectos:this.localVR.idpincendiossustancias_efectos,
        idpincendiossustancias_ctrlfuente:this.localVR.idpincendiossustancias_ctrlfuente,
        idpincendiossustancias_ctrlmedio:this.localVR.idpincendiossustancias_ctrlmedio,
        idpincendiossustancias_ctrlindividuo:this.localVR.idpincendiossustancias_ctrlindividuo,
        idpincendiossustancias_tb_nd:this.localVR.idpincendiossustancias_tb_nd,
        idpincendiossustancias_tb_ne:this.localVR.idpincendiossustancias_tb_ne,
        idpincendiossustancias_tb_np:this.localVR.idpincendiossustancias_tb_np,
        idpincendiossustancias_interpreta:this.localVR.idpincendiossustancias_interpreta,
        idpincendiossustancias_tb_nc:this.localVR.idpincendiossustancias_tb_nc,
        idpincendiossustancias_intervencion:this.localVR.idpincendiossustancias_intervencion,
        idpincendiossustancias_tb_nr:this.localVR.idpincendiossustancias_tb_nr,
        idpincendiossustancias_numpuestos:this.localVR.idpincendiossustancias_numpuestos,
        idpincendiossustancias_observaciones:this.localVR.idpincendiossustancias_observaciones,
        idpincendiossustancias_peorconsecue:this.localVR.idpincendiossustancias_peorconsecue, 
        idpincendiossustancias_existerequisito:this.localVR.idpincendiossustancias_existerequisito, 
        idpincendiossustancias_elimina:this.localVR.idpincendiossustancias_elimina,    
        idpincendiossustancias_sustitucion:this.localVR.idpincendiossustancias_sustitucion,   
        idpincendiossustancias_ctrlingenieria:this.localVR.idpincendiossustancias_ctrlingenieria, 
        idpincendiossustancias_ctrladmin:this.localVR.idpincendiossustancias_ctrladmin,  
        idpincendiossustancias_equipoeleme:this.localVR.idpincendiossustancias_equipoeleme,
        /* ----------------------LOCATIVOS------------------- */
        /* Locativos - Pisos defectuosos */
        idplocativospisos_efectos:this.localVR.idplocativospisos_efectos,
        idplocativospisos_ctrlfuente:this.localVR.idplocativospisos_ctrlfuente,
        idplocativospisos_ctrlmedio:this.localVR.idplocativospisos_ctrlmedio,
        idplocativospisos_ctrlindividuo:this.localVR.idplocativospisos_ctrlindividuo,
        idplocativospisos_tb_nd:this.localVR.idplocativospisos_tb_nd,
        idplocativospisos_tb_ne:this.localVR.idplocativospisos_tb_ne,
        idplocativospisos_tb_np:this.localVR.idplocativospisos_tb_np,
        idplocativospisos_interpreta:this.localVR.idplocativospisos_interpreta,
        idplocativospisos_tb_nc:this.localVR.idplocativospisos_tb_nc,
        idplocativospisos_intervencion:this.localVR.idplocativospisos_intervencion,
        idplocativospisos_tb_nr:this.localVR.idplocativospisos_tb_nr,
        idplocativospisos_numpuestos:this.localVR.idplocativospisos_numpuestos,
        idplocativospisos_observaciones:this.localVR.idplocativospisos_observaciones,
        idplocativospisos_peorconsecue:this.localVR.idplocativospisos_peorconsecue, 
        idplocativospisos_existerequisito:this.localVR.idplocativospisos_existerequisito, 
        idplocativospisos_elimina:this.localVR.idplocativospisos_elimina,    
        idplocativospisos_sustitucion:this.localVR.idplocativospisos_sustitucion,   
        idplocativospisos_ctrlingenieria:this.localVR.idplocativospisos_ctrlingenieria, 
        idplocativospisos_ctrladmin:this.localVR.idplocativospisos_ctrladmin,  
        idplocativospisos_equipoeleme:this.localVR.idplocativospisos_equipoeleme, 
        /* Locativos - Escaleras defectuosas */
        idplocativosescaleras_efectos:this.localVR.idplocativosescaleras_efectos,
        idplocativosescaleras_ctrlfuente:this.localVR.idplocativosescaleras_ctrlfuente,
        idplocativosescaleras_ctrlmedio:this.localVR.idplocativosescaleras_ctrlmedio,
        idplocativosescaleras_ctrlindividuo:this.localVR.idplocativosescaleras_ctrlindividuo,
        idplocativosescaleras_tb_nd:this.localVR.idplocativosescaleras_tb_nd,
        idplocativosescaleras_tb_ne:this.localVR.idplocativosescaleras_tb_ne,
        idplocativosescaleras_tb_np:this.localVR.idplocativosescaleras_tb_np,
        idplocativosescaleras_interpreta:this.localVR.idplocativosescaleras_interpreta,
        idplocativosescaleras_tb_nc:this.localVR.idplocativosescaleras_tb_nc,
        idplocativosescaleras_intervencion:this.localVR.idplocativosescaleras_intervencion,
        idplocativosescaleras_tb_nr:this.localVR.idplocativosescaleras_tb_nr,
        idplocativosescaleras_numpuestos:this.localVR.idplocativosescaleras_numpuestos,
        idplocativosescaleras_observaciones:this.localVR.idplocativosescaleras_observaciones,
        idplocativosescaleras_peorconsecue:this.localVR.idplocativosescaleras_peorconsecue, 
        idplocativosescaleras_existerequisito:this.localVR.idplocativosescaleras_existerequisito, 
        idplocativosescaleras_elimina:this.localVR.idplocativosescaleras_elimina,    
        idplocativosescaleras_sustitucion:this.localVR.idplocativosescaleras_sustitucion,   
        idplocativosescaleras_ctrlingenieria:this.localVR.idplocativosescaleras_ctrlingenieria, 
        idplocativosescaleras_ctrladmin:this.localVR.idplocativosescaleras_ctrladmin,  
        idplocativosescaleras_equipoeleme:this.localVR.idplocativosescaleras_equipoeleme, 
        /* Locativos - Almacenamiento, estanterías en mal estado */
        idplocativosestanterias_efectos:this.localVR.idplocativosestanterias_efectos,
        idplocativosestanterias_ctrlfuente:this.localVR.idplocativosestanterias_ctrlfuente,
        idplocativosestanterias_ctrlmedio:this.localVR.idplocativosestanterias_ctrlmedio,
        idplocativosestanterias_ctrlindividuo:this.localVR.idplocativosestanterias_ctrlindividuo,
        idplocativosestanterias_tb_nd:this.localVR.idplocativosestanterias_tb_nd,
        idplocativosestanterias_tb_ne:this.localVR.idplocativosestanterias_tb_ne,
        idplocativosestanterias_tb_np:this.localVR.idplocativosestanterias_tb_np,
        idplocativosestanterias_interpreta:this.localVR.idplocativosestanterias_interpreta,
        idplocativosestanterias_tb_nc:this.localVR.idplocativosestanterias_tb_nc,
        idplocativosestanterias_intervencion:this.localVR.idplocativosestanterias_intervencion,
        idplocativosestanterias_tb_nr:this.localVR.idplocativosestanterias_tb_nr,
        idplocativosestanterias_numpuestos:this.localVR.idplocativosestanterias_numpuestos,
        idplocativosestanterias_observaciones:this.localVR.idplocativosestanterias_observaciones,
        idplocativosestanterias_peorconsecue:this.localVR.idplocativosestanterias_peorconsecue, 
        idplocativosestanterias_existerequisito:this.localVR.idplocativosestanterias_existerequisito, 
        idplocativosestanterias_elimina:this.localVR.idplocativosestanterias_elimina,    
        idplocativosestanterias_sustitucion:this.localVR.idplocativosestanterias_sustitucion,   
        idplocativosestanterias_ctrlingenieria:this.localVR.idplocativosestanterias_ctrlingenieria, 
        idplocativosestanterias_ctrladmin:this.localVR.idplocativosestanterias_ctrladmin,  
        idplocativosestanterias_equipoeleme:this.localVR.idplocativosestanterias_equipoeleme,
        /* Locativos - Almacenamiento, arrumes con altura inadecuada */
        idplocativosarrumes_efectos:this.localVR.idplocativosarrumes_efectos,
        idplocativosarrumes_ctrlfuente:this.localVR.idplocativosarrumes_ctrlfuente,
        idplocativosarrumes_ctrlmedio:this.localVR.idplocativosarrumes_ctrlmedio,
        idplocativosarrumes_ctrlindividuo:this.localVR.idplocativosarrumes_ctrlindividuo,
        idplocativosarrumes_tb_nd:this.localVR.idplocativosarrumes_tb_nd,
        idplocativosarrumes_tb_ne:this.localVR.idplocativosarrumes_tb_ne,
        idplocativosarrumes_tb_np:this.localVR.idplocativosarrumes_tb_np,
        idplocativosarrumes_interpreta:this.localVR.idplocativosarrumes_interpreta,
        idplocativosarrumes_tb_nc:this.localVR.idplocativosarrumes_tb_nc,
        idplocativosarrumes_intervencion:this.localVR.idplocativosarrumes_intervencion,
        idplocativosarrumes_tb_nr:this.localVR.idplocativosarrumes_tb_nr,
        idplocativosarrumes_numpuestos:this.localVR.idplocativosarrumes_numpuestos,
        idplocativosarrumes_observaciones:this.localVR.idplocativosarrumes_observaciones,
        idplocativosarrumes_peorconsecue:this.localVR.idplocativosarrumes_peorconsecue, 
        idplocativosarrumes_existerequisito:this.localVR.idplocativosarrumes_existerequisito, 
        idplocativosarrumes_elimina:this.localVR.idplocativosarrumes_elimina,    
        idplocativosarrumes_sustitucion:this.localVR.idplocativosarrumes_sustitucion,   
        idplocativosarrumes_ctrlingenieria:this.localVR.idplocativosarrumes_ctrlingenieria, 
        idplocativosarrumes_ctrladmin:this.localVR.idplocativosarrumes_ctrladmin,  
        idplocativosarrumes_equipoeleme:this.localVR.idplocativosarrumes_equipoeleme, 
        /* Locativos - Señalización y demarcación deficiente, inexistente o inadecuada */
        idplocativosenalizacion_efectos:this.localVR.idplocativosenalizacion_efectos,
        idplocativosenalizacion_ctrlfuente:this.localVR.idplocativosenalizacion_ctrlfuente,
        idplocativosenalizacion_ctrlmedio:this.localVR.idplocativosenalizacion_ctrlmedio,
        idplocativosenalizacion_ctrlindividuo:this.localVR.idplocativosenalizacion_ctrlindividuo,
        idplocativosenalizacion_tb_nd:this.localVR.idplocativosenalizacion_tb_nd,
        idplocativosenalizacion_tb_ne:this.localVR.idplocativosenalizacion_tb_ne,
        idplocativosenalizacion_tb_np:this.localVR.idplocativosenalizacion_tb_np,
        idplocativosenalizacion_interpreta:this.localVR.idplocativosenalizacion_interpreta,
        idplocativosenalizacion_tb_nc:this.localVR.idplocativosenalizacion_tb_nc,
        idplocativosenalizacion_intervencion:this.localVR.idplocativosenalizacion_intervencion,
        idplocativosenalizacion_tb_nr:this.localVR.idplocativosenalizacion_tb_nr,
        idplocativosenalizacion_numpuestos:this.localVR.idplocativosenalizacion_numpuestos,
        idplocativosenalizacion_observaciones:this.localVR.idplocativosenalizacion_observaciones,
        idplocativosenalizacion_peorconsecue:this.localVR.idplocativosenalizacion_peorconsecue, 
        idplocativosenalizacion_existerequisito:this.localVR.idplocativosenalizacion_existerequisito, 
        idplocativosenalizacion_elimina:this.localVR.idplocativosenalizacion_elimina,    
        idplocativosenalizacion_sustitucion:this.localVR.idplocativosenalizacion_sustitucion,   
        idplocativosenalizacion_ctrlingenieria:this.localVR.idplocativosenalizacion_ctrlingenieria, 
        idplocativosenalizacion_ctrladmin:this.localVR.idplocativosenalizacion_ctrladmin,  
        idplocativosenalizacion_equipoeleme:this.localVR.idplocativosenalizacion_equipoeleme, 
        /* Locativos - Falta de orden y aseo */
        idplocativosaseo_efectos:this.localVR.idplocativosaseo_efectos,
        idplocativosaseo_ctrlfuente:this.localVR.idplocativosaseo_ctrlfuente,
        idplocativosaseo_ctrlmedio:this.localVR.idplocativosaseo_ctrlmedio,
        idplocativosaseo_ctrlindividuo:this.localVR.idplocativosaseo_ctrlindividuo,
        idplocativosaseo_tb_nd:this.localVR.idplocativosaseo_tb_nd,
        idplocativosaseo_tb_ne:this.localVR.idplocativosaseo_tb_ne,
        idplocativosaseo_tb_np:this.localVR.idplocativosaseo_tb_np,
        idplocativosaseo_interpreta:this.localVR.idplocativosaseo_interpreta,
        idplocativosaseo_tb_nc:this.localVR.idplocativosaseo_tb_nc,
        idplocativosaseo_intervencion:this.localVR.idplocativosaseo_intervencion,
        idplocativosaseo_tb_nr:this.localVR.idplocativosaseo_tb_nr,
        idplocativosaseo_numpuestos:this.localVR.idplocativosaseo_numpuestos,
        idplocativosaseo_observaciones:this.localVR.idplocativosaseo_observaciones,
        idplocativosaseo_peorconsecue:this.localVR.idplocativosaseo_peorconsecue, 
        idplocativosaseo_existerequisito:this.localVR.idplocativosaseo_existerequisito, 
        idplocativosaseo_elimina:this.localVR.idplocativosaseo_elimina,    
        idplocativosaseo_sustitucion:this.localVR.idplocativosaseo_sustitucion,   
        idplocativosaseo_ctrlingenieria:this.localVR.idplocativosaseo_ctrlingenieria, 
        idplocativosaseo_ctrladmin:this.localVR.idplocativosaseo_ctrladmin,  
        idplocativosaseo_equipoeleme:this.localVR.idplocativosaseo_equipoeleme,
        /* ----------------------MECÁNICOS------------------- */
        /* Mecánicos - Utilización de herramientas manuales */
        idpmecanicoherramient_efectos:this.localVR.idpmecanicoherramient_efectos,
        idpmecanicoherramient_ctrlfuente:this.localVR.idpmecanicoherramient_ctrlfuente,
        idpmecanicoherramient_ctrlmedio:this.localVR.idpmecanicoherramient_ctrlmedio,
        idpmecanicoherramient_ctrlindividuo:this.localVR.idpmecanicoherramient_ctrlindividuo,
        idpmecanicoherramient_tb_nd:this.localVR.idpmecanicoherramient_tb_nd,
        idpmecanicoherramient_tb_ne:this.localVR.idpmecanicoherramient_tb_ne,
        idpmecanicoherramient_tb_np:this.localVR.idpmecanicoherramient_tb_np,
        idpmecanicoherramient_interpreta:this.localVR.idpmecanicoherramient_interpreta,
        idpmecanicoherramient_tb_nc:this.localVR.idpmecanicoherramient_tb_nc,
        idpmecanicoherramient_intervencion:this.localVR.idpmecanicoherramient_intervencion,
        idpmecanicoherramient_tb_nr:this.localVR.idpmecanicoherramient_tb_nr,
        idpmecanicoherramient_numpuestos:this.localVR.idpmecanicoherramient_numpuestos,
        idpmecanicoherramient_observaciones:this.localVR.idpmecanicoherramient_observaciones,
        idpmecanicoherramient_peorconsecue:this.localVR.idpmecanicoherramient_peorconsecue, 
        idpmecanicoherramient_existerequisito:this.localVR.idpmecanicoherramient_existerequisito, 
        idpmecanicoherramient_elimina:this.localVR.idpmecanicoherramient_elimina,    
        idpmecanicoherramient_sustitucion:this.localVR.idpmecanicoherramient_sustitucion,   
        idpmecanicoherramient_ctrlingenieria:this.localVR.idpmecanicoherramient_ctrlingenieria, 
        idpmecanicoherramient_ctrladmin:this.localVR.idpmecanicoherramient_ctrladmin,  
        idpmecanicoherramient_equipoeleme:this.localVR.idpmecanicoherramient_equipoeleme,
        /* Mecánicos - Superficies cortantes */
        idpmecanicocortante_efectos:this.localVR.idpmecanicocortante_efectos,
        idpmecanicocortante_ctrlfuente:this.localVR.idpmecanicocortante_ctrlfuente,
        idpmecanicocortante_ctrlmedio:this.localVR.idpmecanicocortante_ctrlmedio,
        idpmecanicocortante_ctrlindividuo:this.localVR.idpmecanicocortante_ctrlindividuo,
        idpmecanicocortante_tb_nd:this.localVR.idpmecanicocortante_tb_nd,
        idpmecanicocortante_tb_ne:this.localVR.idpmecanicocortante_tb_ne,
        idpmecanicocortante_tb_np:this.localVR.idpmecanicocortante_tb_np,
        idpmecanicocortante_interpreta:this.localVR.idpmecanicocortante_interpreta,
        idpmecanicocortante_tb_nc:this.localVR.idpmecanicocortante_tb_nc,
        idpmecanicocortante_intervencion:this.localVR.idpmecanicocortante_intervencion,
        idpmecanicocortante_tb_nr:this.localVR.idpmecanicocortante_tb_nr,
        idpmecanicocortante_numpuestos:this.localVR.idpmecanicocortante_numpuestos,
        idpmecanicocortante_observaciones:this.localVR.idpmecanicocortante_observaciones,
        idpmecanicocortante_peorconsecue:this.localVR.idpmecanicocortante_peorconsecue, 
        idpmecanicocortante_existerequisito:this.localVR.idpmecanicocortante_existerequisito, 
        idpmecanicocortante_elimina:this.localVR.idpmecanicocortante_elimina,    
        idpmecanicocortante_sustitucion:this.localVR.idpmecanicocortante_sustitucion,   
        idpmecanicocortante_ctrlingenieria:this.localVR.idpmecanicocortante_ctrlingenieria, 
        idpmecanicocortante_ctrladmin:this.localVR.idpmecanicocortante_ctrladmin,  
        idpmecanicocortante_equipoeleme:this.localVR.idpmecanicocortante_equipoeleme,
        /* Mecánicos - Contacto con elementos cortopunzantes */
        idpmecanicocortopunz_efectos:this.localVR.idpmecanicocortopunz_efectos,
        idpmecanicocortopunz_ctrlfuente:this.localVR.idpmecanicocortopunz_ctrlfuente,
        idpmecanicocortopunz_ctrlmedio:this.localVR.idpmecanicocortopunz_ctrlmedio,
        idpmecanicocortopunz_ctrlindividuo:this.localVR.idpmecanicocortopunz_ctrlindividuo,
        idpmecanicocortopunz_tb_nd:this.localVR.idpmecanicocortopunz_tb_nd,
        idpmecanicocortopunz_tb_ne:this.localVR.idpmecanicocortopunz_tb_ne,
        idpmecanicocortopunz_tb_np:this.localVR.idpmecanicocortopunz_tb_np,
        idpmecanicocortopunz_interpreta:this.localVR.idpmecanicocortopunz_interpreta,
        idpmecanicocortopunz_tb_nc:this.localVR.idpmecanicocortopunz_tb_nc,
        idpmecanicocortopunz_intervencion:this.localVR.idpmecanicocortopunz_intervencion,
        idpmecanicocortopunz_tb_nr:this.localVR.idpmecanicocortopunz_tb_nr,
        idpmecanicocortopunz_numpuestos:this.localVR.idpmecanicocortopunz_numpuestos,
        idpmecanicocortopunz_observaciones:this.localVR.idpmecanicocortopunz_observaciones,
        idpmecanicocortopunz_peorconsecue:this.localVR.idpmecanicocortopunz_peorconsecue, 
        idpmecanicocortopunz_existerequisito:this.localVR.idpmecanicocortopunz_existerequisito, 
        idpmecanicocortopunz_elimina:this.localVR.idpmecanicocortopunz_elimina,    
        idpmecanicocortopunz_sustitucion:this.localVR.idpmecanicocortopunz_sustitucion,   
        idpmecanicocortopunz_ctrlingenieria:this.localVR.idpmecanicocortopunz_ctrlingenieria, 
        idpmecanicocortopunz_ctrladmin:this.localVR.idpmecanicocortopunz_ctrladmin,  
        idpmecanicocortopunz_equipoeleme:this.localVR.idpmecanicocortopunz_equipoeleme,
        /* Mecánicos - Materiales proyectados sólidos o fluidos */
        idpmecanicomateriales_efectos:this.localVR.idpmecanicomateriales_efectos,
        idpmecanicomateriales_ctrlfuente:this.localVR.idpmecanicomateriales_ctrlfuente,
        idpmecanicomateriales_ctrlmedio:this.localVR.idpmecanicomateriales_ctrlmedio,
        idpmecanicomateriales_ctrlindividuo:this.localVR.idpmecanicomateriales_ctrlindividuo,
        idpmecanicomateriales_tb_nd:this.localVR.idpmecanicomateriales_tb_nd,
        idpmecanicomateriales_tb_ne:this.localVR.idpmecanicomateriales_tb_ne,
        idpmecanicomateriales_tb_np:this.localVR.idpmecanicomateriales_tb_np,
        idpmecanicomateriales_interpreta:this.localVR.idpmecanicomateriales_interpreta,
        idpmecanicomateriales_tb_nc:this.localVR.idpmecanicomateriales_tb_nc,
        idpmecanicomateriales_intervencion:this.localVR.idpmecanicomateriales_intervencion,
        idpmecanicomateriales_tb_nr:this.localVR.idpmecanicomateriales_tb_nr,
        idpmecanicomateriales_numpuestos:this.localVR.idpmecanicomateriales_numpuestos,
        idpmecanicomateriales_observaciones:this.localVR.idpmecanicomateriales_observaciones,
        idpmecanicomateriales_peorconsecue:this.localVR.idpmecanicomateriales_peorconsecue, 
        idpmecanicomateriales_existerequisito:this.localVR.idpmecanicomateriales_existerequisito, 
        idpmecanicomateriales_elimina:this.localVR.idpmecanicomateriales_elimina,    
        idpmecanicomateriales_sustitucion:this.localVR.idpmecanicomateriales_sustitucion,   
        idpmecanicomateriales_ctrlingenieria:this.localVR.idpmecanicomateriales_ctrlingenieria, 
        idpmecanicomateriales_ctrladmin:this.localVR.idpmecanicomateriales_ctrladmin,  
        idpmecanicomateriales_equipoeleme:this.localVR.idpmecanicomateriales_equipoeleme,
        /* ----------------------PSICOSOCIAL------------------- */
        /* Psicosocial - Sobrecarga de trabajo */
        idppsicosobrecarga_efectos:this.localVR.idppsicosobrecarga_efectos,
        idppsicosobrecarga_ctrlfuente:this.localVR.idppsicosobrecarga_ctrlfuente,
        idppsicosobrecarga_ctrlmedio:this.localVR.idppsicosobrecarga_ctrlmedio,
        idppsicosobrecarga_ctrlindividuo:this.localVR.idppsicosobrecarga_ctrlindividuo,
        idppsicosobrecarga_tb_nd:this.localVR.idppsicosobrecarga_tb_nd,
        idppsicosobrecarga_tb_ne:this.localVR.idppsicosobrecarga_tb_ne,
        idppsicosobrecarga_tb_np:this.localVR.idppsicosobrecarga_tb_np,
        idppsicosobrecarga_interpreta:this.localVR.idppsicosobrecarga_interpreta,
        idppsicosobrecarga_tb_nc:this.localVR.idppsicosobrecarga_tb_nc,
        idppsicosobrecarga_intervencion:this.localVR.idppsicosobrecarga_intervencion,
        idppsicosobrecarga_tb_nr:this.localVR.idppsicosobrecarga_tb_nr,
        idppsicosobrecarga_numpuestos:this.localVR.idppsicosobrecarga_numpuestos,
        idppsicosobrecarga_observaciones:this.localVR.idppsicosobrecarga_observaciones,
        idppsicosobrecarga_peorconsecue:this.localVR.idppsicosobrecarga_peorconsecue, 
        idppsicosobrecarga_existerequisito:this.localVR.idppsicosobrecarga_existerequisito, 
        idppsicosobrecarga_elimina:this.localVR.idppsicosobrecarga_elimina,    
        idppsicosobrecarga_sustitucion:this.localVR.idppsicosobrecarga_sustitucion,   
        idppsicosobrecarga_ctrlingenieria:this.localVR.idppsicosobrecarga_ctrlingenieria, 
        idppsicosobrecarga_ctrladmin:this.localVR.idppsicosobrecarga_ctrladmin,  
        idppsicosobrecarga_equipoeleme:this.localVR.idppsicosobrecarga_equipoeleme,
        /* Psicosocial - Resposanbilidad en el cargo/ manejo de personal */
        idppsicoresponsabilidad_efectos:this.localVR.idppsicoresponsabilidad_efectos,
        idppsicoresponsabilidad_ctrlfuente:this.localVR.idppsicoresponsabilidad_ctrlfuente,
        idppsicoresponsabilidad_ctrlmedio:this.localVR.idppsicoresponsabilidad_ctrlmedio,
        idppsicoresponsabilidad_ctrlindividuo:this.localVR.idppsicoresponsabilidad_ctrlindividuo,
        idppsicoresponsabilidad_tb_nd:this.localVR.idppsicoresponsabilidad_tb_nd,
        idppsicoresponsabilidad_tb_ne:this.localVR.idppsicoresponsabilidad_tb_ne,
        idppsicoresponsabilidad_tb_np:this.localVR.idppsicoresponsabilidad_tb_np,
        idppsicoresponsabilidad_interpreta:this.localVR.idppsicoresponsabilidad_interpreta,
        idppsicoresponsabilidad_tb_nc:this.localVR.idppsicoresponsabilidad_tb_nc,
        idppsicoresponsabilidad_intervencion:this.localVR.idppsicoresponsabilidad_intervencion,
        idppsicoresponsabilidad_tb_nr:this.localVR.idppsicoresponsabilidad_tb_nr,
        idppsicoresponsabilidad_numpuestos:this.localVR.idppsicoresponsabilidad_numpuestos,
        idppsicoresponsabilidad_observaciones:this.localVR.idppsicoresponsabilidad_observaciones,
        idppsicoresponsabilidad_peorconsecue:this.localVR.idppsicoresponsabilidad_peorconsecue, 
        idppsicoresponsabilidad_existerequisito:this.localVR.idppsicoresponsabilidad_existerequisito, 
        idppsicoresponsabilidad_elimina:this.localVR.idppsicoresponsabilidad_elimina,    
        idppsicoresponsabilidad_sustitucion:this.localVR.idppsicoresponsabilidad_sustitucion,   
        idppsicoresponsabilidad_ctrlingenieria:this.localVR.idppsicoresponsabilidad_ctrlingenieria, 
        idppsicoresponsabilidad_ctrladmin:this.localVR.idppsicoresponsabilidad_ctrladmin,  
        idppsicoresponsabilidad_equipoeleme:this.localVR.idppsicoresponsabilidad_equipoeleme,
        /* Psicosocial - Trabajo repetitivo */
        idppsicorepetitivo_efectos:this.localVR.idppsicorepetitivo_efectos,
        idppsicorepetitivo_ctrlfuente:this.localVR.idppsicorepetitivo_ctrlfuente,
        idppsicorepetitivo_ctrlmedio:this.localVR.idppsicorepetitivo_ctrlmedio,
        idppsicorepetitivo_ctrlindividuo:this.localVR.idppsicorepetitivo_ctrlindividuo,
        idppsicorepetitivo_tb_nd:this.localVR.idppsicorepetitivo_tb_nd,
        idppsicorepetitivo_tb_ne:this.localVR.idppsicorepetitivo_tb_ne,
        idppsicorepetitivo_tb_np:this.localVR.idppsicorepetitivo_tb_np,
        idppsicorepetitivo_interpreta:this.localVR.idppsicorepetitivo_interpreta,
        idppsicorepetitivo_tb_nc:this.localVR.idppsicorepetitivo_tb_nc,
        idppsicorepetitivo_intervencion:this.localVR.idppsicorepetitivo_intervencion,
        idppsicorepetitivo_tb_nr:this.localVR.idppsicorepetitivo_tb_nr,
        idppsicorepetitivo_numpuestos:this.localVR.idppsicorepetitivo_numpuestos,
        idppsicorepetitivo_observaciones:this.localVR.idppsicorepetitivo_observaciones,
        idppsicorepetitivo_peorconsecue:this.localVR.idppsicorepetitivo_peorconsecue, 
        idppsicorepetitivo_existerequisito:this.localVR.idppsicorepetitivo_existerequisito, 
        idppsicorepetitivo_elimina:this.localVR.idppsicorepetitivo_elimina,    
        idppsicorepetitivo_sustitucion:this.localVR.idppsicorepetitivo_sustitucion,   
        idppsicorepetitivo_ctrlingenieria:this.localVR.idppsicorepetitivo_ctrlingenieria, 
        idppsicorepetitivo_ctrladmin:this.localVR.idppsicorepetitivo_ctrladmin,  
        idppsicorepetitivo_equipoeleme:this.localVR.idppsicorepetitivo_equipoeleme, 
        /* ----------------------PÚBLICOS------------------- */
        /* Públicos - Situación de atraco o robo */
        idppublicorobo_efectos:this.localVR.idppublicorobo_efectos,
        idppublicorobo_ctrlfuente:this.localVR.idppublicorobo_ctrlfuente,
        idppublicorobo_ctrlmedio:this.localVR.idppublicorobo_ctrlmedio,
        idppublicorobo_ctrlindividuo:this.localVR.idppublicorobo_ctrlindividuo,
        idppublicorobo_tb_nd:this.localVR.idppublicorobo_tb_nd,
        idppublicorobo_tb_ne:this.localVR.idppublicorobo_tb_ne,
        idppublicorobo_tb_np:this.localVR.idppublicorobo_tb_np,
        idppublicorobo_interpreta:this.localVR.idppublicorobo_interpreta,
        idppublicorobo_tb_nc:this.localVR.idppublicorobo_tb_nc,
        idppublicorobo_intervencion:this.localVR.idppublicorobo_intervencion,
        idppublicorobo_tb_nr:this.localVR.idppublicorobo_tb_nr,
        idppublicorobo_numpuestos:this.localVR.idppublicorobo_numpuestos,
        idppublicorobo_observaciones:this.localVR.idppublicorobo_observaciones,
        idppublicorobo_peorconsecue:this.localVR.idppublicorobo_peorconsecue, 
        idppublicorobo_existerequisito:this.localVR.idppublicorobo_existerequisito, 
        idppublicorobo_elimina:this.localVR.idppublicorobo_elimina,    
        idppublicorobo_sustitucion:this.localVR.idppublicorobo_sustitucion,   
        idppublicorobo_ctrlingenieria:this.localVR.idppublicorobo_ctrlingenieria, 
        idppublicorobo_ctrladmin:this.localVR.idppublicorobo_ctrladmin,  
        idppublicorobo_equipoeleme:this.localVR.idppublicorobo_equipoeleme,
        /* Públicos - Terrorismo */
        idppublicoterrorismo_efectos:this.localVR.idppublicoterrorismo_efectos,
        idppublicoterrorismo_ctrlfuente:this.localVR.idppublicoterrorismo_ctrlfuente,
        idppublicoterrorismo_ctrlmedio:this.localVR.idppublicoterrorismo_ctrlmedio,
        idppublicoterrorismo_ctrlindividuo:this.localVR.idppublicoterrorismo_ctrlindividuo,
        idppublicoterrorismo_tb_nd:this.localVR.idppublicoterrorismo_tb_nd,
        idppublicoterrorismo_tb_ne:this.localVR.idppublicoterrorismo_tb_ne,
        idppublicoterrorismo_tb_np:this.localVR.idppublicoterrorismo_tb_np,
        idppublicoterrorismo_interpreta:this.localVR.idppublicoterrorismo_interpreta,
        idppublicoterrorismo_tb_nc:this.localVR.idppublicoterrorismo_tb_nc,
        idppublicoterrorismo_intervencion:this.localVR.idppublicoterrorismo_intervencion,
        idppublicoterrorismo_tb_nr:this.localVR.idppublicoterrorismo_tb_nr,
        idppublicoterrorismo_numpuestos:this.localVR.idppublicoterrorismo_numpuestos,
        idppublicoterrorismo_observaciones:this.localVR.idppublicoterrorismo_observaciones,
        idppublicoterrorismo_peorconsecue:this.localVR.idppublicoterrorismo_peorconsecue, 
        idppublicoterrorismo_existerequisito:this.localVR.idppublicoterrorismo_existerequisito, 
        idppublicoterrorismo_elimina:this.localVR.idppublicoterrorismo_elimina,    
        idppublicoterrorismo_sustitucion:this.localVR.idppublicoterrorismo_sustitucion,   
        idppublicoterrorismo_ctrlingenieria:this.localVR.idppublicoterrorismo_ctrlingenieria, 
        idppublicoterrorismo_ctrladmin:this.localVR.idppublicoterrorismo_ctrladmin,  
        idppublicoterrorismo_equipoeleme:this.localVR.idppublicoterrorismo_equipoeleme,
        /* Públicos - Situación de Agresión fisica */
        idppublicoagresion_efectos:this.localVR.idppublicoagresion_efectos,
        idppublicoagresion_ctrlfuente:this.localVR.idppublicoagresion_ctrlfuente,
        idppublicoagresion_ctrlmedio:this.localVR.idppublicoagresion_ctrlmedio,
        idppublicoagresion_ctrlindividuo:this.localVR.idppublicoagresion_ctrlindividuo,
        idppublicoagresion_tb_nd:this.localVR.idppublicoagresion_tb_nd,
        idppublicoagresion_tb_ne:this.localVR.idppublicoagresion_tb_ne,
        idppublicoagresion_tb_np:this.localVR.idppublicoagresion_tb_np,
        idppublicoagresion_interpreta:this.localVR.idppublicoagresion_interpreta,
        idppublicoagresion_tb_nc:this.localVR.idppublicoagresion_tb_nc,
        idppublicoagresion_intervencion:this.localVR.idppublicoagresion_intervencion,
        idppublicoagresion_tb_nr:this.localVR.idppublicoagresion_tb_nr,
        idppublicoagresion_numpuestos:this.localVR.idppublicoagresion_numpuestos,
        idppublicoagresion_observaciones:this.localVR.idppublicoagresion_observaciones,
        idppublicoagresion_peorconsecue:this.localVR.idppublicoagresion_peorconsecue, 
        idppublicoagresion_existerequisito:this.localVR.idppublicoagresion_existerequisito, 
        idppublicoagresion_elimina:this.localVR.idppublicoagresion_elimina,    
        idppublicoagresion_sustitucion:this.localVR.idppublicoagresion_sustitucion,   
        idppublicoagresion_ctrlingenieria:this.localVR.idppublicoagresion_ctrlingenieria, 
        idppublicoagresion_ctrladmin:this.localVR.idppublicoagresion_ctrladmin,  
        idppublicoagresion_equipoeleme:this.localVR.idppublicoagresion_equipoeleme, 
        /* Públicos - Situación de asonada */
        idppublicoasonada_efectos:this.localVR.idppublicoasonada_efectos,
        idppublicoasonada_ctrlfuente:this.localVR.idppublicoasonada_ctrlfuente,
        idppublicoasonada_ctrlmedio:this.localVR.idppublicoasonada_ctrlmedio,
        idppublicoasonada_ctrlindividuo:this.localVR.idppublicoasonada_ctrlindividuo,
        idppublicoasonada_tb_nd:this.localVR.idppublicoasonada_tb_nd,
        idppublicoasonada_tb_ne:this.localVR.idppublicoasonada_tb_ne,
        idppublicoasonada_tb_np:this.localVR.idppublicoasonada_tb_np,
        idppublicoasonada_interpreta:this.localVR.idppublicoasonada_interpreta,
        idppublicoasonada_tb_nc:this.localVR.idppublicoasonada_tb_nc,
        idppublicoasonada_intervencion:this.localVR.idppublicoasonada_intervencion,
        idppublicoasonada_tb_nr:this.localVR.idppublicoasonada_tb_nr,
        idppublicoasonada_numpuestos:this.localVR.idppublicoasonada_numpuestos,
        idppublicoasonada_observaciones:this.localVR.idppublicoasonada_observaciones,
        idppublicoasonada_peorconsecue:this.localVR.idppublicoasonada_peorconsecue, 
        idppublicoasonada_existerequisito:this.localVR.idppublicoasonada_existerequisito, 
        idppublicoasonada_elimina:this.localVR.idppublicoasonada_elimina,    
        idppublicoasonada_sustitucion:this.localVR.idppublicoasonada_sustitucion,   
        idppublicoasonada_ctrlingenieria:this.localVR.idppublicoasonada_ctrlingenieria, 
        idppublicoasonada_ctrladmin:this.localVR.idppublicoasonada_ctrladmin,  
        idppublicoasonada_equipoeleme:this.localVR.idppublicoasonada_equipoeleme,
        /* ----------------------TRANSITO------------------- */
        /* Transito - Transporte motocicleta */
        idptransitomoto_efectos:this.localVR.idptransitomoto_efectos,
        idptransitomoto_ctrlfuente:this.localVR.idptransitomoto_ctrlfuente,
        idptransitomoto_ctrlmedio:this.localVR.idptransitomoto_ctrlmedio,
        idptransitomoto_ctrlindividuo:this.localVR.idptransitomoto_ctrlindividuo,
        idptransitomoto_tb_nd:this.localVR.idptransitomoto_tb_nd,
        idptransitomoto_tb_ne:this.localVR.idptransitomoto_tb_ne,
        idptransitomoto_tb_np:this.localVR.idptransitomoto_tb_np,
        idptransitomoto_interpreta:this.localVR.idptransitomoto_interpreta,
        idptransitomoto_tb_nc:this.localVR.idptransitomoto_tb_nc,
        idptransitomoto_intervencion:this.localVR.idptransitomoto_intervencion,
        idptransitomoto_tb_nr:this.localVR.idptransitomoto_tb_nr,
        idptransitomoto_numpuestos:this.localVR.idptransitomoto_numpuestos,
        idptransitomoto_observaciones:this.localVR.idptransitomoto_observaciones,
        idptransitomoto_peorconsecue:this.localVR.idptransitomoto_peorconsecue, 
        idptransitomoto_existerequisito:this.localVR.idptransitomoto_existerequisito,
        idptransitomoto_elimina:this.localVR.idptransitomoto_elimina,    
        idptransitomoto_sustitucion:this.localVR.idptransitomoto_sustitucion,   
        idptransitomoto_ctrlingenieria:this.localVR.idptransitomoto_ctrlingenieria, 
        idptransitomoto_ctrladmin:this.localVR.idptransitomoto_ctrladmin,  
        idptransitomoto_equipoeleme:this.localVR.idptransitomoto_equipoeleme,
        /* Transito - Transporte carro / ambulancia */
        idptransitocarro_efectos:this.localVR.idptransitocarro_efectos,
        idptransitocarro_ctrlfuente:this.localVR.idptransitocarro_ctrlfuente,
        idptransitocarro_ctrlmedio:this.localVR.idptransitocarro_ctrlmedio,
        idptransitocarro_ctrlindividuo:this.localVR.idptransitocarro_ctrlindividuo,
        idptransitocarro_tb_nd:this.localVR.idptransitocarro_tb_nd,
        idptransitocarro_tb_ne:this.localVR.idptransitocarro_tb_ne,
        idptransitocarro_tb_np:this.localVR.idptransitocarro_tb_np,
        idptransitocarro_interpreta:this.localVR.idptransitocarro_interpreta,
        idptransitocarro_tb_nc:this.localVR.idptransitocarro_tb_nc,
        idptransitocarro_intervencion:this.localVR.idptransitocarro_intervencion,
        idptransitocarro_tb_nr:this.localVR.idptransitocarro_tb_nr,
        idptransitocarro_numpuestos:this.localVR.idptransitocarro_numpuestos,
        idptransitocarro_observaciones:this.localVR.idptransitocarro_observaciones,
        idptransitocarro_peorconsecue:this.localVR.idptransitocarro_peorconsecue, 
        idptransitocarro_existerequisito:this.localVR.idptransitocarro_existerequisito, 
        idptransitocarro_elimina:this.localVR.idptransitocarro_elimina,    
        idptransitocarro_sustitucion:this.localVR.idptransitocarro_sustitucion,   
        idptransitocarro_ctrlingenieria:this.localVR.idptransitocarro_ctrlingenieria, 
        idptransitocarro_ctrladmin:this.localVR.idptransitocarro_ctrladmin,  
        idptransitocarro_equipoeleme:this.localVR.idptransitocarro_equipoeleme,
        /* ----------------------QUÍMICOS-------------------- */
        /* Químicos - Aerosoles, líquidos, rocíos */
        idpquimicosaerosol_efectos:this.localVR.idpquimicosaerosol_efectos,
        idpquimicosaerosol_ctrlfuente:this.localVR.idpquimicosaerosol_ctrlfuente,
        idpquimicosaerosol_ctrlmedio:this.localVR.idpquimicosaerosol_ctrlmedio,
        idpquimicosaerosol_ctrlindividuo:this.localVR.idpquimicosaerosol_ctrlindividuo,
        idpquimicosaerosol_tb_nd:this.localVR.idpquimicosaerosol_tb_nd,
        idpquimicosaerosol_tb_ne:this.localVR.idpquimicosaerosol_tb_ne,
        idpquimicosaerosol_tb_np:this.localVR.idpquimicosaerosol_tb_np,
        idpquimicosaerosol_interpreta:this.localVR.idpquimicosaerosol_interpreta,
        idpquimicosaerosol_tb_nc:this.localVR.idpquimicosaerosol_tb_nc,
        idpquimicosaerosol_intervencion:this.localVR.idpquimicosaerosol_intervencion,
        idpquimicosaerosol_tb_nr:this.localVR.idpquimicosaerosol_tb_nr,
        idpquimicosaerosol_numpuestos:this.localVR.idpquimicosaerosol_numpuestos,
        idpquimicosaerosol_observaciones:this.localVR.idpquimicosaerosol_observaciones,
        idpquimicosaerosol_peorconsecue:this.localVR.idpquimicosaerosol_peorconsecue, 
        idpquimicosaerosol_existerequisito:this.localVR.idpquimicosaerosol_existerequisito, 
        idpquimicosaerosol_elimina:this.localVR.idpquimicosaerosol_elimina,    
        idpquimicosaerosol_sustitucion:this.localVR.idpquimicosaerosol_sustitucion,   
        idpquimicosaerosol_ctrlingenieria:this.localVR.idpquimicosaerosol_ctrlingenieria, 
        idpquimicosaerosol_ctrladmin:this.localVR.idpquimicosaerosol_ctrladmin,  
        idpquimicosaerosol_equipoeleme:this.localVR.idpquimicosaerosol_equipoeleme,
        /* Químicos - Gases y vapores */
        idpquimicosgases_efectos:this.localVR.idpquimicosgases_efectos,
        idpquimicosgases_ctrlfuente:this.localVR.idpquimicosgases_ctrlfuente,
        idpquimicosgases_ctrlmedio:this.localVR.idpquimicosgases_ctrlmedio,
        idpquimicosgases_ctrlindividuo:this.localVR.idpquimicosgases_ctrlindividuo,
        idpquimicosgases_tb_nd:this.localVR.idpquimicosgases_tb_nd,
        idpquimicosgases_tb_ne:this.localVR.idpquimicosgases_tb_ne,
        idpquimicosgases_tb_np:this.localVR.idpquimicosgases_tb_np,
        idpquimicosgases_interpreta:this.localVR.idpquimicosgases_interpreta,
        idpquimicosgases_tb_nc:this.localVR.idpquimicosgases_tb_nc,
        idpquimicosgases_intervencion:this.localVR.idpquimicosgases_intervencion,
        idpquimicosgases_tb_nr:this.localVR.idpquimicosgases_tb_nr,
        idpquimicosgases_numpuestos:this.localVR.idpquimicosgases_numpuestos,
        idpquimicosgases_observaciones:this.localVR.idpquimicosgases_observaciones,
        idpquimicosgases_peorconsecue:this.localVR.idpquimicosgases_peorconsecue, 
        idpquimicosgases_existerequisito:this.localVR.idpquimicosgases_existerequisito, 
        idpquimicosgases_elimina:this.localVR.idpquimicosgases_elimina,    
        idpquimicosgases_sustitucion:this.localVR.idpquimicosgases_sustitucion,   
        idpquimicosgases_ctrlingenieria:this.localVR.idpquimicosgases_ctrlingenieria, 
        idpquimicosgases_ctrladmin:this.localVR.idpquimicosgases_ctrladmin,  
        idpquimicosgases_equipoeleme:this.localVR.idpquimicosgases_equipoeleme,
        /* Químicos - Sustancias sólidas (polvos) */
        idpquimicossustanc_efectos:this.localVR.idpquimicossustanc_efectos,
        idpquimicossustanc_ctrlfuente:this.localVR.idpquimicossustanc_ctrlfuente,
        idpquimicossustanc_ctrlmedio:this.localVR.idpquimicossustanc_ctrlmedio,
        idpquimicossustanc_ctrlindividuo:this.localVR.idpquimicossustanc_ctrlindividuo,
        idpquimicossustanc_tb_nd:this.localVR.idpquimicossustanc_tb_nd,
        idpquimicossustanc_tb_ne:this.localVR.idpquimicossustanc_tb_ne,
        idpquimicossustanc_tb_np:this.localVR.idpquimicossustanc_tb_np,
        idpquimicossustanc_interpreta:this.localVR.idpquimicossustanc_interpreta,
        idpquimicossustanc_tb_nc:this.localVR.idpquimicossustanc_tb_nc,
        idpquimicossustanc_intervencion:this.localVR.idpquimicossustanc_intervencion,
        idpquimicossustanc_tb_nr:this.localVR.idpquimicossustanc_tb_nr,
        idpquimicossustanc_numpuestos:this.localVR.idpquimicossustanc_numpuestos,
        idpquimicossustanc_observaciones:this.localVR.idpquimicossustanc_observaciones,
        idpquimicossustanc_peorconsecue:this.localVR.idpquimicossustanc_peorconsecue, 
        idpquimicossustanc_existerequisito:this.localVR.idpquimicossustanc_existerequisito, 
        idpquimicossustanc_elimina:this.localVR.idpquimicossustanc_elimina,    
        idpquimicossustanc_sustitucion:this.localVR.idpquimicossustanc_sustitucion,   
        idpquimicossustanc_ctrlingenieria:this.localVR.idpquimicossustanc_ctrlingenieria, 
        idpquimicossustanc_ctrladmin:this.localVR.idpquimicossustanc_ctrladmin,  
        idpquimicossustanc_equipoeleme:this.localVR.idpquimicossustanc_equipoeleme, 
        /* Químicos - Contacto y/o salpicadura de químicos */
        idpquimicoscontacto_efectos:this.localVR.idpquimicoscontacto_efectos,
        idpquimicoscontacto_ctrlfuente:this.localVR.idpquimicoscontacto_ctrlfuente,
        idpquimicoscontacto_ctrlmedio:this.localVR.idpquimicoscontacto_ctrlmedio,
        idpquimicoscontacto_ctrlindividuo:this.localVR.idpquimicoscontacto_ctrlindividuo,
        idpquimicoscontacto_tb_nd:this.localVR.idpquimicoscontacto_tb_nd,
        idpquimicoscontacto_tb_ne:this.localVR.idpquimicoscontacto_tb_ne,
        idpquimicoscontacto_tb_np:this.localVR.idpquimicoscontacto_tb_np,
        idpquimicoscontacto_interpreta:this.localVR.idpquimicoscontacto_interpreta,
        idpquimicoscontacto_tb_nc:this.localVR.idpquimicoscontacto_tb_nc,
        idpquimicoscontacto_intervencion:this.localVR.idpquimicoscontacto_intervencion,
        idpquimicoscontacto_tb_nr:this.localVR.idpquimicoscontacto_tb_nr,
        idpquimicoscontacto_numpuestos:this.localVR.idpquimicoscontacto_numpuestos,
        idpquimicoscontacto_observaciones:this.localVR.idpquimicoscontacto_observaciones,
        idpquimicoscontacto_peorconsecue:this.localVR.idpquimicoscontacto_peorconsecue, 
        idpquimicoscontacto_existerequisito:this.localVR.idpquimicoscontacto_existerequisito, 
        idpquimicoscontacto_elimina:this.localVR.idpquimicoscontacto_elimina,    
        idpquimicoscontacto_sustitucion:this.localVR.idpquimicoscontacto_sustitucion,   
        idpquimicoscontacto_ctrlingenieria:this.localVR.idpquimicoscontacto_ctrlingenieria, 
        idpquimicoscontacto_ctrladmin:this.localVR.idpquimicoscontacto_ctrladmin,  
        idpquimicoscontacto_equipoeleme:this.localVR.idpquimicoscontacto_equipoeleme,
        /* ----------------------TAREAS DE ALTO RIESGO------------------- */
        /* Tareas de alto riesgo - Trabajo en alturas por encima de 1.50 metros */
        idptareasalturas_efectos:this.localVR.idptareasalturas_efectos,
        idptareasalturas_ctrlfuente:this.localVR.idptareasalturas_ctrlfuente,
        idptareasalturas_ctrlmedio:this.localVR.idptareasalturas_ctrlmedio,
        idptareasalturas_ctrlindividuo:this.localVR.idptareasalturas_ctrlindividuo,
        idptareasalturas_tb_nd:this.localVR.idptareasalturas_tb_nd,
        idptareasalturas_tb_ne:this.localVR.idptareasalturas_tb_ne,
        idptareasalturas_tb_np:this.localVR.idptareasalturas_tb_np,
        idptareasalturas_interpreta:this.localVR.idptareasalturas_interpreta,
        idptareasalturas_tb_nc:this.localVR.idptareasalturas_tb_nc,
        idptareasalturas_intervencion:this.localVR.idptareasalturas_intervencion,
        idptareasalturas_tb_nr:this.localVR.idptareasalturas_tb_nr,
        idptareasalturas_numpuestos:this.localVR.idptareasalturas_numpuestos,
        idptareasalturas_observaciones:this.localVR.idptareasalturas_observaciones,
        idptareasalturas_peorconsecue:this.localVR.idptareasalturas_peorconsecue, 
        idptareasalturas_existerequisito:this.localVR.idptareasalturas_existerequisito, 
        idptareasalturas_elimina:this.localVR.idptareasalturas_elimina,    
        idptareasalturas_sustitucion:this.localVR.idptareasalturas_sustitucion,   
        idptareasalturas_ctrlingenieria:this.localVR.idptareasalturas_ctrlingenieria, 
        idptareasalturas_ctrladmin:this.localVR.idptareasalturas_ctrladmin,  
        idptareasalturas_equipoeleme:this.localVR.idptareasalturas_equipoeleme,
        /* Tareas de alto riesgo - Trabajo en espacios confinados */
        idptareasconfinados_efectos:this.localVR.idptareasconfinados_efectos,
        idptareasconfinados_ctrlfuente:this.localVR.idptareasconfinados_ctrlfuente,
        idptareasconfinados_ctrlmedio:this.localVR.idptareasconfinados_ctrlmedio,
        idptareasconfinados_ctrlindividuo:this.localVR.idptareasconfinados_ctrlindividuo,
        idptareasconfinados_tb_nd:this.localVR.idptareasconfinados_tb_nd,
        idptareasconfinados_tb_ne:this.localVR.idptareasconfinados_tb_ne,
        idptareasconfinados_tb_np:this.localVR.idptareasconfinados_tb_np,
        idptareasconfinados_interpreta:this.localVR.idptareasconfinados_interpreta,
        idptareasconfinados_tb_nc:this.localVR.idptareasconfinados_tb_nc,
        idptareasconfinados_intervencion:this.localVR.idptareasconfinados_intervencion,
        idptareasconfinados_tb_nr:this.localVR.idptareasconfinados_tb_nr,
        idptareasconfinados_numpuestos:this.localVR.idptareasconfinados_numpuestos,
        idptareasconfinados_observaciones:this.localVR.idptareasconfinados_observaciones,
        idptareasconfinados_peorconsecue:this.localVR.idptareasconfinados_peorconsecue, 
        idptareasconfinados_existerequisito:this.localVR.idptareasconfinados_existerequisito, 
        idptareasconfinados_elimina:this.localVR.idptareasconfinados_elimina,    
        idptareasconfinados_sustitucion:this.localVR.idptareasconfinados_sustitucion,   
        idptareasconfinados_ctrlingenieria:this.localVR.idptareasconfinados_ctrlingenieria, 
        idptareasconfinados_ctrladmin:this.localVR.idptareasconfinados_ctrladmin,  
        idptareasconfinados_equipoeleme:this.localVR.idptareasconfinados_equipoeleme, 
        /* Tareas de alto riesgo - Trabajo en caliente corte y soldadura */
        idptareassoldadura_efectos:this.localVR.idptareassoldadura_efectos,
        idptareassoldadura_ctrlfuente:this.localVR.idptareassoldadura_ctrlfuente,
        idptareassoldadura_ctrlmedio:this.localVR.idptareassoldadura_ctrlmedio,
        idptareassoldadura_ctrlindividuo:this.localVR.idptareassoldadura_ctrlindividuo,
        idptareassoldadura_tb_nd:this.localVR.idptareassoldadura_tb_nd,
        idptareassoldadura_tb_ne:this.localVR.idptareassoldadura_tb_ne,
        idptareassoldadura_tb_np:this.localVR.idptareassoldadura_tb_np,
        idptareassoldadura_interpreta:this.localVR.idptareassoldadura_interpreta,
        idptareassoldadura_tb_nc:this.localVR.idptareassoldadura_tb_nc,
        idptareassoldadura_intervencion:this.localVR.idptareassoldadura_intervencion,
        idptareassoldadura_tb_nr:this.localVR.idptareassoldadura_tb_nr,
        idptareassoldadura_numpuestos:this.localVR.idptareassoldadura_numpuestos,
        idptareassoldadura_observaciones:this.localVR.idptareassoldadura_observaciones,
        idptareassoldadura_peorconsecue:this.localVR.idptareassoldadura_peorconsecue, 
        idptareassoldadura_existerequisito:this.localVR.idptareassoldadura_existerequisito, 
        idptareassoldadura_elimina:this.localVR.idptareassoldadura_elimina,    
        idptareassoldadura_sustitucion:this.localVR.idptareassoldadura_sustitucion,   
        idptareassoldadura_ctrlingenieria:this.localVR.idptareassoldadura_ctrlingenieria, 
        idptareassoldadura_ctrladmin:this.localVR.idptareassoldadura_ctrladmin,  
        idptareassoldadura_equipoeleme:this.localVR.idptareassoldadura_equipoeleme 
      });

    }
  }

  /*----------------------------------      METODOS  -  BIOLOGICO     ------------------------------------------------ */
  /*Biologico - Derivados de origen animal NP */
  fnCalculoBioPart1NP(){
      var num:number = 0;
      var inter:string = '';
      if (this.vrform.value.idpbioderani_tb_nd !== 0 && this.vrform.value.idpbioderani_tb_nd !== '' && 
          this.vrform.value.idpbioderani_tb_ne !== 0 && this.vrform.value.idpbioderani_tb_ne !== '') {
          num =  this.vrform.value.idpbioderani_tb_nd * this.vrform.value.idpbioderani_tb_ne;
            
          this.vrform.patchValue({
            idpbioderani_tb_np:num
          })

          if (num <= 40 && num >= 24) {
            inter = 'MUY ALTO';
          }

          if (num <= 20 && num >= 10) {
            inter = 'ALTO';
          }

          if (num <= 8 && num >= 6) {
            inter = 'MEDIO';
          }

          if (num <= 4 && num >= 2) {
            inter = 'BAJO';
          }

          this.vrform.patchValue({
            idpbioderani_interpreta:inter
          })
      }
  }
  /*Biologico - Derivados de origen animal NR*/
  fnCalculoBioPart1NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpbioderani_tb_np !== 0 && this.vrform.value.idpbioderani_tb_np !== '' && 
        this.vrform.value.idpbioderani_tb_nc !== 0 && this.vrform.value.idpbioderani_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpbioderani_tb_nc)) * Math.abs(Number(this.vrform.value.idpbioderani_tb_np));
          
      this.vrform.patchValue({
        idpbioderani_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpbioderani_tb_nr: result
      })
    }
  }
  /*Biologico - Microorganismos tipo hongo NP*/
  fnCalculoBioPart2NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpbiohongo_tb_nd !== 0 && this.vrform.value.idpbiohongo_tb_nd !== '' && 
        this.vrform.value.idpbiohongo_tb_ne !== 0 && this.vrform.value.idpbiohongo_tb_ne !== '') {
        num =  this.vrform.value.idpbiohongo_tb_nd * this.vrform.value.idpbiohongo_tb_ne;

        this.vrform.patchValue({
          idpbiohongo_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpbiohongo_interpreta:inter
        })
    }
  }
  /*Biologico - Microorganismos tipo hongo NR*/
  fnCalculoBioPart2NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpbiohongo_tb_np !== 0 && this.vrform.value.idpbiohongo_tb_np !== '' && 
        this.vrform.value.idpbiohongo_tb_nc !== 0 && this.vrform.value.idpbiohongo_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpbiohongo_tb_nc)) * Math.abs(Number(this.vrform.value.idpbiohongo_tb_np));
          
      this.vrform.patchValue({
        idpbiohongo_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpbiohongo_tb_nr: result
      })
    }
  }
  /*Biologico - Microorganismos tipo bacterias NP*/
  fnCalculoBioPart3NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpbiobacterias_tb_nd !== 0 && this.vrform.value.idpbiobacterias_tb_nd !== '' && 
        this.vrform.value.idpbiobacterias_tb_ne !== 0 && this.vrform.value.idpbiobacterias_tb_ne !== '') {
        num =  this.vrform.value.idpbiobacterias_tb_nd * this.vrform.value.idpbiobacterias_tb_ne;

        this.vrform.patchValue({
          idpbiobacterias_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpbiobacterias_interpreta:inter
        })
    }
  }
  /*Biologico - Microorganismos tipo bacterias NR*/
  fnCalculoBioPart3NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpbiobacterias_tb_np !== 0 && this.vrform.value.idpbiobacterias_tb_np !== '' && 
        this.vrform.value.idpbiobacterias_tb_nc !== 0 && this.vrform.value.idpbiobacterias_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpbiobacterias_tb_nc)) * Math.abs(Number(this.vrform.value.idpbiobacterias_tb_np));
          
      this.vrform.patchValue({
        idpbiobacterias_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpbiobacterias_tb_nr: result
      })
    }
  }
  /*Biologico - Microorganismos tipo virus NP*/
  fnCalculoBioPart4NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpbiovirus_tb_nd !== 0 && this.vrform.value.idpbiovirus_tb_nd !== '' && 
        this.vrform.value.idpbiovirus_tb_ne !== 0 && this.vrform.value.idpbiovirus_tb_ne !== '') {
        num =  this.vrform.value.idpbiovirus_tb_nd * this.vrform.value.idpbiovirus_tb_ne;

        this.vrform.patchValue({
          idpbiovirus_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpbiovirus_interpreta:inter
        })
    }
  }
  /*Biologico - Microorganismos tipo virus NR*/
  fnCalculoBioPart4NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpbiovirus_tb_np !== 0 && this.vrform.value.idpbiovirus_tb_np !== '' && 
        this.vrform.value.idpbiovirus_tb_nc !== 0 && this.vrform.value.idpbiovirus_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpbiovirus_tb_nc)) * Math.abs(Number(this.vrform.value.idpbiovirus_tb_np));
          
      this.vrform.patchValue({
        idpbiovirus_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpbiovirus_tb_nr: result
      })
    }
  }
  /*Biologico - Parásitos NP*/
  fnCalculoBioPart5NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpbioparasitos_tb_nd !== 0 && this.vrform.value.idpbioparasitos_tb_nd !== '' && 
        this.vrform.value.idpbioparasitos_tb_ne !== 0 && this.vrform.value.idpbioparasitos_tb_ne !== '') {
        num =  this.vrform.value.idpbioparasitos_tb_nd * this.vrform.value.idpbioparasitos_tb_ne;

        this.vrform.patchValue({
          idpbioparasitos_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpbioparasitos_interpreta:inter
        })
    }
  }
  /*Biologico - Parásitos NR*/
  fnCalculoBioPart5NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpbioparasitos_tb_np !== 0 && this.vrform.value.idpbioparasitos_tb_np !== '' && 
        this.vrform.value.idpbioparasitos_tb_nc !== 0 && this.vrform.value.idpbioparasitos_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpbioparasitos_tb_nc)) * Math.abs(Number(this.vrform.value.idpbioparasitos_tb_np));
          
      this.vrform.patchValue({
        idpbioparasitos_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpbioparasitos_tb_nr: result
      })
    }
  }

  /*----------------------------------      METODOS  -  CARGA FÍSICA     ------------------------------------------------ */
  /* Carga Física - Carga dinámica por esfuerzos NP */
  fnCalculoCarFPart1NP(){
      var num:number = 0;
      var inter:string = '';
      if (this.vrform.value.idpcargesfuerzos_tb_nd !== 0 && this.vrform.value.idpcargesfuerzos_tb_nd !== '' && 
          this.vrform.value.idpcargesfuerzos_tb_ne !== 0 && this.vrform.value.idpcargesfuerzos_tb_ne !== '') {
          num =  this.vrform.value.idpcargesfuerzos_tb_nd * this.vrform.value.idpcargesfuerzos_tb_ne;

          this.vrform.patchValue({
            idpcargesfuerzos_tb_np:num
          })

          if (num <= 40 && num >= 24) {
            inter = 'MUY ALTO';
          }

          if (num <= 20 && num >= 10) {
            inter = 'ALTO';
          }

          if (num <= 8 && num >= 6) {
            inter = 'MEDIO';
          }

          if (num <= 4 && num >= 2) {
            inter = 'BAJO';
          }

          this.vrform.patchValue({
            idpcargesfuerzos_interpreta:inter
          })
      }
  }
  /* Carga Física - Carga dinámica por esfuerzos NR */
  fnCalculoCarFPart1NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpcargesfuerzos_tb_np !== 0 && this.vrform.value.idpcargesfuerzos_tb_np !== '' && 
        this.vrform.value.idpcargesfuerzos_tb_nc !== 0 && this.vrform.value.idpcargesfuerzos_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpcargesfuerzos_tb_nc)) * Math.abs(Number(this.vrform.value.idpcargesfuerzos_tb_np));
          
      this.vrform.patchValue({
        idpcargesfuerzos_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpcargesfuerzos_tb_nr: result
      })
    }
  }
  /* Carga Física - Carga dinámica por movimientos repetitivos NP*/
  fnCalculoCarFPart2NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpcargmovimiento_tb_nd !== 0 && this.vrform.value.idpcargmovimiento_tb_nd !== '' && 
        this.vrform.value.idpcargmovimiento_tb_ne !== 0 && this.vrform.value.idpcargmovimiento_tb_ne !== '') {
        num =  this.vrform.value.idpcargmovimiento_tb_nd * this.vrform.value.idpcargmovimiento_tb_ne;

        this.vrform.patchValue({
          idpcargmovimiento_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpcargmovimiento_interpreta:inter
        })
    }
  }
  /* Carga Física - Carga dinámica por movimientos repetitivos NR*/
  fnCalculoCarFPart2NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpcargmovimiento_tb_np !== 0 && this.vrform.value.idpcargmovimiento_tb_np !== '' && 
        this.vrform.value.idpcargmovimiento_tb_nc !== 0 && this.vrform.value.idpcargmovimiento_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpcargmovimiento_tb_nc)) * Math.abs(Number(this.vrform.value.idpcargmovimiento_tb_np));
          
      this.vrform.patchValue({
        idpcargmovimiento_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpcargmovimiento_tb_nr: result
      })
    }
  }
  /* Carga Física - Carga dinámica por sobreesfuerzos de la voz NP*/
  fnCalculoCarFPart3NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpcargvoz_tb_nd !== 0 && this.vrform.value.idpcargvoz_tb_nd !== '' && 
        this.vrform.value.idpcargvoz_tb_ne !== 0 && this.vrform.value.idpcargvoz_tb_ne !== '') {
        num =  this.vrform.value.idpcargvoz_tb_nd * this.vrform.value.idpcargvoz_tb_ne;

        this.vrform.patchValue({
          idpcargvoz_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpcargvoz_interpreta:inter
        })
    }
  }
  /* Carga Física - Carga dinámica por sobreesfuerzos de la voz NR*/
  fnCalculoCarFPart3NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpcargvoz_tb_np !== 0 && this.vrform.value.idpcargvoz_tb_np !== '' && 
        this.vrform.value.idpcargvoz_tb_nc !== 0 && this.vrform.value.idpcargvoz_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpcargvoz_tb_nc)) * Math.abs(Number(this.vrform.value.idpcargvoz_tb_np));
          
      this.vrform.patchValue({
        idpcargvoz_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpcargvoz_tb_nr: result
      })
    }
  }
  /* Carga Física - Carga estática de pie NP*/
  fnCalculoCarFPart4NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpcargpie_tb_nd !== 0 && this.vrform.value.idpcargpie_tb_nd !== '' && 
        this.vrform.value.idpcargpie_tb_ne !== 0 && this.vrform.value.idpcargpie_tb_ne !== '') {
        num =  this.vrform.value.idpcargpie_tb_nd * this.vrform.value.idpcargpie_tb_ne;

        this.vrform.patchValue({
          idpcargpie_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpcargpie_interpreta:inter
        })
    }
  }
  /* Carga Física - Carga estática de pie NR*/
  fnCalculoCarFPart4NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpcargpie_tb_np !== 0 && this.vrform.value.idpcargpie_tb_np !== '' && 
        this.vrform.value.idpcargpie_tb_nc !== 0 && this.vrform.value.idpcargpie_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpcargpie_tb_nc)) * Math.abs(Number(this.vrform.value.idpcargpie_tb_np));
          
      this.vrform.patchValue({
        idpcargpie_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpcargpie_tb_nr: result
      })
    }
  }
  /* Carga Física - Posiciones prolongadas sentado NP*/
  fnCalculoCarFPart5NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpcargsentado_tb_nd !== 0 && this.vrform.value.idpcargsentado_tb_nd !== '' && 
        this.vrform.value.idpcargsentado_tb_ne !== 0 && this.vrform.value.idpcargsentado_tb_ne !== '') {
        num =  this.vrform.value.idpcargsentado_tb_nd * this.vrform.value.idpcargsentado_tb_ne;

        this.vrform.patchValue({
          idpcargsentado_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpcargsentado_interpreta:inter
        })
    }
  }
  /* Carga Física - Posiciones prolongadas sentado NR*/
  fnCalculoCarFPart5NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpcargsentado_tb_np !== 0 && this.vrform.value.idpcargsentado_tb_np !== '' && 
        this.vrform.value.idpcargsentado_tb_nc !== 0 && this.vrform.value.idpcargsentado_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpcargsentado_tb_nc)) * Math.abs(Number(this.vrform.value.idpcargsentado_tb_np));
          
      this.vrform.patchValue({
        idpcargsentado_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpcargsentado_tb_nr: result
      })
    }
  }

  /*----------------------------------      METODOS  -  ELÉCTRICO     ------------------------------------------------ */
  /* Eléctrico - Energía eléctrica de baja  NP*/
  fnCalculoElecPart1NP(){
      var num:number = 0;
      var inter:string = '';
      if (this.vrform.value.idpelectricobaja_tb_nd !== 0 && this.vrform.value.idpelectricobaja_tb_nd !== '' && 
          this.vrform.value.idpelectricobaja_tb_ne !== 0 && this.vrform.value.idpelectricobaja_tb_ne !== '') {
          num =  this.vrform.value.idpelectricobaja_tb_nd * this.vrform.value.idpelectricobaja_tb_ne;

          this.vrform.patchValue({
            idpelectricobaja_tb_np:num
          })

          if (num <= 40 && num >= 24) {
            inter = 'MUY ALTO';
          }

          if (num <= 20 && num >= 10) {
            inter = 'ALTO';
          }

          if (num <= 8 && num >= 6) {
            inter = 'MEDIO';
          }

          if (num <= 4 && num >= 2) {
            inter = 'BAJO';
          }

          this.vrform.patchValue({
            idpelectricobaja_interpreta:inter
          })
      }
  }
  /* Eléctrico - Energía eléctrica de baja  NR*/
  fnCalculoElecPart1NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpelectricobaja_tb_np !== 0 && this.vrform.value.idpelectricobaja_tb_np !== '' && 
        this.vrform.value.idpelectricobaja_tb_nc !== 0 && this.vrform.value.idpelectricobaja_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpelectricobaja_tb_nc)) * Math.abs(Number(this.vrform.value.idpelectricobaja_tb_np));
          
      this.vrform.patchValue({
        idpelectricobaja_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpelectricobaja_tb_nr: result
      })
    }
  }
  /* Eléctrico - Energía eléctrica de alta NP*/
  fnCalculoElecPart2NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpelectricoalta_tb_nd !== 0 && this.vrform.value.idpelectricoalta_tb_nd !== '' && 
        this.vrform.value.idpelectricoalta_tb_ne !== 0 && this.vrform.value.idpelectricoalta_tb_ne !== '') {
        num =  this.vrform.value.idpelectricoalta_tb_nd * this.vrform.value.idpelectricoalta_tb_ne;

        this.vrform.patchValue({
          idpelectricoalta_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpelectricoalta_interpreta:inter
        })
    }
  }
  /* Eléctrico - Energía eléctrica de alta NR*/
  fnCalculoElecPart2NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpelectricoalta_tb_np !== 0 && this.vrform.value.idpelectricoalta_tb_np !== '' && 
        this.vrform.value.idpelectricoalta_tb_nc !== 0 && this.vrform.value.idpelectricoalta_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpelectricoalta_tb_nc)) * Math.abs(Number(this.vrform.value.idpelectricoalta_tb_np));
          
      this.vrform.patchValue({
        idpelectricoalta_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpelectricoalta_tb_nr: result
      })
    }
  }
  /* Eléctrico - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados NP*/
  fnCalculoElecPart3NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpelectricocables_tb_nd !== 0 && this.vrform.value.idpelectricocables_tb_nd !== '' && 
        this.vrform.value.idpelectricocables_tb_ne !== 0 && this.vrform.value.idpelectricocables_tb_ne !== '') {
        num =  this.vrform.value.idpelectricocables_tb_nd * this.vrform.value.idpelectricocables_tb_ne;

        this.vrform.patchValue({
          idpelectricocables_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpelectricocables_interpreta:inter
        })
    }
  }
  /* Eléctrico - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados NR*/
  fnCalculoElecPart3NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpelectricocables_tb_np !== 0 && this.vrform.value.idpelectricocables_tb_np !== '' && 
        this.vrform.value.idpelectricocables_tb_nc !== 0 && this.vrform.value.idpelectricocables_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpelectricocables_tb_nc)) * Math.abs(Number(this.vrform.value.idpelectricocables_tb_np));
          
      this.vrform.patchValue({
        idpelectricocables_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpelectricocables_tb_nr: result
      })
    }
  }

  /*----------------------------------      METODOS  -  FÍSICO    ------------------------------------------------ */
   /* Físico - Iluminación deficiente NP*/
  fnCalculoFPart1NP(){
      var num:number = 0;
      var inter:string = '';
      if (this.vrform.value.idpfisicoilumdef_tb_nd !== 0 && this.vrform.value.idpfisicoilumdef_tb_nd !== '' && 
          this.vrform.value.idpfisicoilumdef_tb_ne !== 0 && this.vrform.value.idpfisicoilumdef_tb_ne !== '') {
          num =  this.vrform.value.idpfisicoilumdef_tb_nd * this.vrform.value.idpfisicoilumdef_tb_ne;

          this.vrform.patchValue({
            idpfisicoilumdef_tb_np:num
          })

          if (num <= 40 && num >= 24) {
            inter = 'MUY ALTO';
          }

          if (num <= 20 && num >= 10) {
            inter = 'ALTO';
          }

          if (num <= 8 && num >= 6) {
            inter = 'MEDIO';
          }

          if (num <= 4 && num >= 2) {
            inter = 'BAJO';
          }

          this.vrform.patchValue({
            idpfisicoilumdef_interpreta:inter
          })
      }
  }
   /* Físico - Iluminación deficiente NR*/
  fnCalculoFPart1NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpfisicoilumdef_tb_np !== 0 && this.vrform.value.idpfisicoilumdef_tb_np !== '' && 
        this.vrform.value.idpfisicoilumdef_tb_nc !== 0 && this.vrform.value.idpfisicoilumdef_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpfisicoilumdef_tb_nc)) * Math.abs(Number(this.vrform.value.idpfisicoilumdef_tb_np));
          
      this.vrform.patchValue({
        idpfisicoilumdef_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpfisicoilumdef_tb_nr: result
      })
    }
  }
  /* Físico - Iluminación en exceso NP*/
  fnCalculoFPart2NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpfisicoilumexceso_tb_nd !== 0 && this.vrform.value.idpfisicoilumexceso_tb_nd !== '' && 
        this.vrform.value.idpfisicoilumexceso_tb_ne !== 0 && this.vrform.value.idpfisicoilumexceso_tb_ne !== '') {
        num =  this.vrform.value.idpfisicoilumexceso_tb_nd * this.vrform.value.idpfisicoilumexceso_tb_ne;

        this.vrform.patchValue({
          idpfisicoilumexceso_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpfisicoilumexceso_interpreta:inter
        })
    }
  }
  /* Físico - Iluminación en exceso NR*/
  fnCalculoFPart2NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpfisicoilumexceso_tb_np !== 0 && this.vrform.value.idpfisicoilumexceso_tb_np !== '' && 
        this.vrform.value.idpfisicoilumexceso_tb_nc !== 0 && this.vrform.value.idpfisicoilumexceso_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpfisicoilumexceso_tb_nc)) * Math.abs(Number(this.vrform.value.idpfisicoilumexceso_tb_np));
          
      this.vrform.patchValue({
        idpfisicoilumexceso_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpfisicoilumexceso_tb_nr: result
      })
    }
  }
  /* Físico - Radiaciones ionizantes NP*/
  fnCalculoFPart3NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpfisicoradiaciones_tb_nd !== 0 && this.vrform.value.idpfisicoradiaciones_tb_nd !== '' && 
        this.vrform.value.idpfisicoradiaciones_tb_ne !== 0 && this.vrform.value.idpfisicoradiaciones_tb_ne !== '') {
        num =  this.vrform.value.idpfisicoradiaciones_tb_nd * this.vrform.value.idpfisicoradiaciones_tb_ne;

        this.vrform.patchValue({
          idpfisicoradiaciones_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpfisicoradiaciones_interpreta:inter
        })
    }
  }
  /* Físico - Radiaciones ionizantes NR*/
  fnCalculoFPart3NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpfisicoradiaciones_tb_np !== 0 && this.vrform.value.idpfisicoradiaciones_tb_np !== '' && 
        this.vrform.value.idpfisicoradiaciones_tb_nc !== 0 && this.vrform.value.idpfisicoradiaciones_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpfisicoradiaciones_tb_nc)) * Math.abs(Number(this.vrform.value.idpfisicoradiaciones_tb_np));
          
      this.vrform.patchValue({
        idpfisicoradiaciones_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpfisicoradiaciones_tb_nr: result
      })
    }
  }
  /* Físico - Ruido NP*/
  fnCalculoFPart4NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpfisicoruido_tb_nd !== 0 && this.vrform.value.idpfisicoruido_tb_nd !== '' && 
        this.vrform.value.idpfisicoruido_tb_ne !== 0 && this.vrform.value.idpfisicoruido_tb_ne !== '') {
        num =  this.vrform.value.idpfisicoruido_tb_nd * this.vrform.value.idpfisicoruido_tb_ne;

        this.vrform.patchValue({
          idpfisicoruido_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpfisicoruido_interpreta:inter
        })
    }
  }
  /* Físico - Ruido NR*/
  fnCalculoFPart4NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpfisicoruido_tb_np !== 0 && this.vrform.value.idpfisicoruido_tb_np !== '' && 
        this.vrform.value.idpfisicoruido_tb_nc !== 0 && this.vrform.value.idpfisicoruido_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpfisicoruido_tb_nc)) * Math.abs(Number(this.vrform.value.idpfisicoruido_tb_np));
          
      this.vrform.patchValue({
        idpfisicoruido_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpfisicoruido_tb_nr: result
      })
    }
  }
  /* Físico - Vibraciones NP*/
  fnCalculoFPart5NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpfisicovibraciones_tb_nd !== 0 && this.vrform.value.idpfisicovibraciones_tb_nd !== '' && 
        this.vrform.value.idpfisicovibraciones_tb_ne !== 0 && this.vrform.value.idpfisicovibraciones_tb_ne !== '') {
        num =  this.vrform.value.idpfisicovibraciones_tb_nd * this.vrform.value.idpfisicovibraciones_tb_ne;

        this.vrform.patchValue({
          idpfisicovibraciones_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpfisicovibraciones_interpreta:inter
        })
    }
  }
  /* Físico - Vibraciones NR*/
  fnCalculoFPart5NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpfisicovibraciones_tb_np !== 0 && this.vrform.value.idpfisicovibraciones_tb_np !== '' && 
        this.vrform.value.idpfisicovibraciones_tb_nc !== 0 && this.vrform.value.idpfisicovibraciones_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpfisicovibraciones_tb_nc)) * Math.abs(Number(this.vrform.value.idpfisicovibraciones_tb_np));
          
      this.vrform.patchValue({
        idpfisicovibraciones_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpfisicovibraciones_tb_nr: result
      })
    }
  }
  /* Físico - Transferencias de temperaturas por calor NP*/
  fnCalculoFPart6NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpfisicocalor_tb_nd !== 0 && this.vrform.value.idpfisicocalor_tb_nd !== '' && 
        this.vrform.value.idpfisicocalor_tb_ne !== 0 && this.vrform.value.idpfisicocalor_tb_ne !== '') {
        num =  this.vrform.value.idpfisicocalor_tb_nd * this.vrform.value.idpfisicocalor_tb_ne;

        this.vrform.patchValue({
          idpfisicocalor_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpfisicocalor_interpreta:inter
        })
    }
  }
  /* Físico - Transferencias de temperaturas por calor NR*/
  fnCalculoFPart6NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpfisicocalor_tb_np !== 0 && this.vrform.value.idpfisicocalor_tb_np !== '' && 
        this.vrform.value.idpfisicocalor_tb_nc !== 0 && this.vrform.value.idpfisicocalor_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpfisicocalor_tb_nc)) * Math.abs(Number(this.vrform.value.idpfisicocalor_tb_np));
          
      this.vrform.patchValue({
        idpfisicocalor_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpfisicocalor_tb_nr: result
      })
    }
  }
  /* Físico - Transferencias de temperaturas por frio NP*/
  fnCalculoFPart7NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpfisicofrio_tb_nd !== 0 && this.vrform.value.idpfisicofrio_tb_nd !== '' && 
        this.vrform.value.idpfisicofrio_tb_ne !== 0 && this.vrform.value.idpfisicofrio_tb_ne !== '') {
        num =  this.vrform.value.idpfisicofrio_tb_nd * this.vrform.value.idpfisicofrio_tb_ne;

        this.vrform.patchValue({
          idpfisicofrio_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpfisicofrio_interpreta:inter
        })
    }
  }
  /* Físico - Transferencias de temperaturas por frio NR*/
  fnCalculoFPart7NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpfisicofrio_tb_np !== 0 && this.vrform.value.idpfisicofrio_tb_np !== '' && 
        this.vrform.value.idpfisicofrio_tb_nc !== 0 && this.vrform.value.idpfisicofrio_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpfisicofrio_tb_nc)) * Math.abs(Number(this.vrform.value.idpfisicofrio_tb_np));
          
      this.vrform.patchValue({
        idpfisicofrio_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpfisicofrio_tb_nr: result
      })
    }
  }
  /* Físico - Radiaciones no ionizantes por ultravioleta NP*/
  fnCalculoFPart8NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpfisiconoradiaciones_tb_nd !== 0 && this.vrform.value.idpfisiconoradiaciones_tb_nd !== '' && 
        this.vrform.value.idpfisiconoradiaciones_tb_ne !== 0 && this.vrform.value.idpfisiconoradiaciones_tb_ne !== '') {
        num =  this.vrform.value.idpfisiconoradiaciones_tb_nd * this.vrform.value.idpfisiconoradiaciones_tb_ne;

        this.vrform.patchValue({
          idpfisiconoradiaciones_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpfisiconoradiaciones_interpreta:inter
        })
    }
  }
  /* Físico - Radiaciones no ionizantes por ultravioleta NR*/
  fnCalculoFPart8NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpfisiconoradiaciones_tb_np !== 0 && this.vrform.value.idpfisiconoradiaciones_tb_np !== '' && 
        this.vrform.value.idpfisiconoradiaciones_tb_nc !== 0 && this.vrform.value.idpfisiconoradiaciones_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpfisiconoradiaciones_tb_nc)) * Math.abs(Number(this.vrform.value.idpfisiconoradiaciones_tb_np));
          
      this.vrform.patchValue({
        idpfisiconoradiaciones_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpfisiconoradiaciones_tb_nr: result
      })
    }
  }

  /*----------------------------------      METODOS  -  INCENDIOS / EXPLOSIONES    ------------------------------------------------ */
  /* Incendios / Explosiones - Materiales combustibles NP*/
  fnCalculoIEPart1NP(){
      var num:number = 0;
      var inter:string = '';
      if (this.vrform.value.idpincendioscombust_tb_nd !== 0 && this.vrform.value.idpincendioscombust_tb_nd !== '' && 
          this.vrform.value.idpincendioscombust_tb_ne !== 0 && this.vrform.value.idpincendioscombust_tb_ne !== '') {
          num =  this.vrform.value.idpincendioscombust_tb_nd * this.vrform.value.idpincendioscombust_tb_ne;

          this.vrform.patchValue({
            idpincendioscombust_tb_np:num
          })

          if (num <= 40 && num >= 24) {
            inter = 'MUY ALTO';
          }

          if (num <= 20 && num >= 10) {
            inter = 'ALTO';
          }

          if (num <= 8 && num >= 6) {
            inter = 'MEDIO';
          }

          if (num <= 4 && num >= 2) {
            inter = 'BAJO';
          }

          this.vrform.patchValue({
            idpincendioscombust_interpreta:inter
          })
      }
  }
  /* Incendios / Explosiones - Materiales combustibles NR*/
  fnCalculoIEPart1NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpincendioscombust_tb_np !== 0 && this.vrform.value.idpincendioscombust_tb_np !== '' && 
        this.vrform.value.idpincendioscombust_tb_nc !== 0 && this.vrform.value.idpincendioscombust_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpincendioscombust_tb_nc)) * Math.abs(Number(this.vrform.value.idpincendioscombust_tb_np));
          
      this.vrform.patchValue({
        idpincendioscombust_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpincendioscombust_tb_nr: result
      })
    }
  }
  /* Incendios / Explosiones - Ausencia de equipo contra incendio NP*/
  fnCalculoIEPart2NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpincendiosequipo_tb_nd !== 0 && this.vrform.value.idpincendiosequipo_tb_nd !== '' && 
        this.vrform.value.idpincendiosequipo_tb_ne !== 0 && this.vrform.value.idpincendiosequipo_tb_ne !== '') {
        num =  this.vrform.value.idpincendiosequipo_tb_nd * this.vrform.value.idpincendiosequipo_tb_ne;

        this.vrform.patchValue({
          idpincendiosequipo_tb_np:num
        })

        if (num >= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpincendiosequipo_interpreta:inter
        })
    }
  }
  /* Incendios / Explosiones - Ausencia de equipo contra incendio NR*/
  fnCalculoIEPart2NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpincendiosequipo_tb_np !== 0 && this.vrform.value.idpincendiosequipo_tb_np !== '' && 
        this.vrform.value.idpincendiosequipo_tb_nc !== 0 && this.vrform.value.idpincendiosequipo_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpincendiosequipo_tb_nc)) * Math.abs(Number(this.vrform.value.idpincendiosequipo_tb_np));
          
      this.vrform.patchValue({
        idpincendiosequipo_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpincendiosequipo_tb_nr: result
      })
    }
  }
  /* Incendios / Explosiones - Sustancias inflamables NP*/
  fnCalculoIEPart3NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpincendiossustancias_tb_nd !== 0 && this.vrform.value.idpincendiossustancias_tb_nd !== '' && 
        this.vrform.value.idpincendiossustancias_tb_ne !== 0 && this.vrform.value.idpincendiossustancias_tb_ne !== '') {
        num =  this.vrform.value.idpincendiossustancias_tb_nd * this.vrform.value.idpincendiossustancias_tb_ne;

        this.vrform.patchValue({
          idpincendiossustancias_tb_np:num
        })

        if (num >= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpincendiossustancias_interpreta:inter
        })
    }
  }
  /* Incendios / Explosiones - Sustancias inflamables NR*/
  fnCalculoIEPart3NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpincendiossustancias_tb_np !== 0 && this.vrform.value.idpincendiossustancias_tb_np !== '' && 
        this.vrform.value.idpincendiossustancias_tb_nc !== 0 && this.vrform.value.idpincendiossustancias_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpincendiossustancias_tb_nc)) * Math.abs(Number(this.vrform.value.idpincendiossustancias_tb_np));
          
      this.vrform.patchValue({
        idpincendiossustancias_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpincendiossustancias_tb_nr: result
      })
    }
  }

  /*----------------------------------      METODOS  -  LOCATIVOS   ------------------------------------------------ */
  /* Locativos - Pisos defectuosos NP*/
  fnCalculoLocPart1NP(){
      var num:number = 0;
      var inter:string = '';
      if (this.vrform.value.idplocativospisos_tb_nd !== 0 && this.vrform.value.idplocativospisos_tb_nd !== '' && 
          this.vrform.value.idplocativospisos_tb_ne !== 0 && this.vrform.value.idplocativospisos_tb_ne !== '') {
          num =  this.vrform.value.idplocativospisos_tb_nd * this.vrform.value.idplocativospisos_tb_ne;

          this.vrform.patchValue({
            idplocativospisos_tb_np:num
          })

          if (num >= 40 && num >= 24) {
            inter = 'MUY ALTO';
          }

          if (num <= 20 && num >= 10) {
            inter = 'ALTO';
          }

          if (num <= 8 && num >= 6) {
            inter = 'MEDIO';
          }

          if (num <= 4 && num >= 2) {
            inter = 'BAJO';
          }

          this.vrform.patchValue({
            idplocativospisos_interpreta:inter
          })
      }
  }
  /* Locativos - Pisos defectuosos NR*/
  fnCalculoLocPart1NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idplocativospisos_tb_np !== 0 && this.vrform.value.idplocativospisos_tb_np !== '' && 
        this.vrform.value.idplocativospisos_tb_nc !== 0 && this.vrform.value.idplocativospisos_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idplocativospisos_tb_nc)) * Math.abs(Number(this.vrform.value.idplocativospisos_tb_np));
          
      this.vrform.patchValue({
        idplocativospisos_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idplocativospisos_tb_nr: result
      })
    }
  }
  /* Locativos - Escaleras defectuosas NP*/
  fnCalculoLocPart2NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idplocativosescaleras_tb_nd !== 0 && this.vrform.value.idplocativosescaleras_tb_nd !== '' && 
        this.vrform.value.idplocativosescaleras_tb_ne !== 0 && this.vrform.value.idplocativosescaleras_tb_ne !== '') {
        num =  this.vrform.value.idplocativosescaleras_tb_nd * this.vrform.value.idplocativosescaleras_tb_ne;

        this.vrform.patchValue({
          idplocativosescaleras_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idplocativosescaleras_interpreta:inter
        })
    }
  }
  /* Locativos - Escaleras defectuosas NR*/
  fnCalculoLocPart2NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idplocativosescaleras_tb_np !== 0 && this.vrform.value.idplocativosescaleras_tb_np !== '' && 
        this.vrform.value.idplocativosescaleras_tb_nc !== 0 && this.vrform.value.idplocativosescaleras_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idplocativosescaleras_tb_nc)) * Math.abs(Number(this.vrform.value.idplocativosescaleras_tb_np));
          
      this.vrform.patchValue({
        idplocativosescaleras_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idplocativosescaleras_tb_nr: result
      })
    }
  }
  /* Locativos - Almacenamiento, estanterías en mal estado NP*/
  fnCalculoLocPart3NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idplocativosestanterias_tb_nd !== 0 && this.vrform.value.idplocativosestanterias_tb_nd !== '' && 
        this.vrform.value.idplocativosestanterias_tb_ne !== 0 && this.vrform.value.idplocativosestanterias_tb_ne !== '') {
        num =  this.vrform.value.idplocativosestanterias_tb_nd * this.vrform.value.idplocativosestanterias_tb_ne;

        this.vrform.patchValue({
          idplocativosestanterias_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idplocativosestanterias_interpreta:inter
        })
    }
  }
  /* Locativos - Almacenamiento, estanterías en mal estado NR*/
  fnCalculoLocPart3NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idplocativosestanterias_tb_np !== 0 && this.vrform.value.idplocativosestanterias_tb_np !== '' && 
        this.vrform.value.idplocativosestanterias_tb_nc !== 0 && this.vrform.value.idplocativosestanterias_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idplocativosestanterias_tb_nc)) * Math.abs(Number(this.vrform.value.idplocativosestanterias_tb_np));
          
      this.vrform.patchValue({
        idplocativosestanterias_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idplocativosestanterias_tb_nr: result
      })
    }
  }
  /* Locativos - Almacenamiento, arrumes con altura inadecuada NP*/
  fnCalculoLocPart4NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idplocativosarrumes_tb_nd !== 0 && this.vrform.value.idplocativosarrumes_tb_nd !== '' && 
        this.vrform.value.idplocativosarrumes_tb_ne !== 0 && this.vrform.value.idplocativosarrumes_tb_ne !== '') {
        num =  this.vrform.value.idplocativosarrumes_tb_nd * this.vrform.value.idplocativosarrumes_tb_ne;

        this.vrform.patchValue({
          idplocativosarrumes_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idplocativosarrumes_interpreta:inter
        })
    }
  }
  /* Locativos - Almacenamiento, arrumes con altura inadecuada NR*/
  fnCalculoLocPart4NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idplocativosarrumes_tb_np !== 0 && this.vrform.value.idplocativosarrumes_tb_np !== '' && 
        this.vrform.value.idplocativosarrumes_tb_nc !== 0 && this.vrform.value.idplocativosarrumes_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idplocativosarrumes_tb_nc)) * Math.abs(Number(this.vrform.value.idplocativosarrumes_tb_np));
          
      this.vrform.patchValue({
        idplocativosarrumes_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idplocativosarrumes_tb_nr: result
      })
    }
  }
  /* Locativos - Señalización y demarcación deficiente, inexistente o inadecuada NP*/
  fnCalculoLocPart5NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idplocativosenalizacion_tb_nd !== 0 && this.vrform.value.idplocativosenalizacion_tb_nd !== '' && 
        this.vrform.value.idplocativosenalizacion_tb_ne !== 0 && this.vrform.value.idplocativosenalizacion_tb_ne !== '') {
        num =  this.vrform.value.idplocativosenalizacion_tb_nd * this.vrform.value.idplocativosenalizacion_tb_ne;

        this.vrform.patchValue({
          idplocativosenalizacion_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idplocativosenalizacion_interpreta:inter
        })
    }
  }
  /* Locativos - Señalización y demarcación deficiente, inexistente o inadecuada NR*/
  fnCalculoLocPart5NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idplocativosenalizacion_tb_np !== 0 && this.vrform.value.idplocativosenalizacion_tb_np !== '' && 
        this.vrform.value.idplocativosenalizacion_tb_nc !== 0 && this.vrform.value.idplocativosenalizacion_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idplocativosenalizacion_tb_nc)) * Math.abs(Number(this.vrform.value.idplocativosenalizacion_tb_np));
          
      this.vrform.patchValue({
        idplocativosenalizacion_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idplocativosenalizacion_tb_nr: result
      })
    }
  }
  /* Locativos - Falta de orden y aseo NP*/
  fnCalculoLocPart6NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idplocativosaseo_tb_nd !== 0 && this.vrform.value.idplocativosaseo_tb_nd !== '' && 
        this.vrform.value.idplocativosaseo_tb_ne !== 0 && this.vrform.value.idplocativosaseo_tb_ne !== '') {
        num =  this.vrform.value.idplocativosaseo_tb_nd * this.vrform.value.idplocativosaseo_tb_ne;

        this.vrform.patchValue({
          idplocativosaseo_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idplocativosaseo_interpreta:inter
        })
    }
  }
  /* Locativos - Falta de orden y aseo NR*/
  fnCalculoLocPart6NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idplocativosaseo_tb_np !== 0 && this.vrform.value.idplocativosaseo_tb_np !== '' && 
        this.vrform.value.idplocativosaseo_tb_nc !== 0 && this.vrform.value.idplocativosaseo_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idplocativosaseo_tb_nc)) * Math.abs(Number(this.vrform.value.idplocativosaseo_tb_np));
          
      this.vrform.patchValue({
        idplocativosaseo_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idplocativosaseo_tb_nr: result
      })
    }
  }

  /*----------------------------------      METODOS  -  MECÁNICOS   ------------------------------------------------ */
  /* Mecánicos - Utilización de herramientas manuales NP*/
  fnCalculoMecPart1NP(){
      var num:number = 0;
      var inter:string = '';
      if (this.vrform.value.idpmecanicoherramient_tb_nd !== 0 && this.vrform.value.idpmecanicoherramient_tb_nd !== '' && 
          this.vrform.value.idpmecanicoherramient_tb_ne !== 0 && this.vrform.value.idpmecanicoherramient_tb_ne !== '') {
          num =  this.vrform.value.idpmecanicoherramient_tb_nd * this.vrform.value.idpmecanicoherramient_tb_ne;

          this.vrform.patchValue({
            idpmecanicoherramient_tb_np:num
          })

          if (num <= 40 && num >= 24) {
            inter = 'MUY ALTO';
          }

          if (num <= 20 && num >= 10) {
            inter = 'ALTO';
          }

          if (num <= 8 && num >= 6) {
            inter = 'MEDIO';
          }

          if (num <= 4 && num >= 2) {
            inter = 'BAJO';
          }

          this.vrform.patchValue({
            idpmecanicoherramient_interpreta:inter
          })
      }
  }
  /* Mecánicos - Utilización de herramientas manuales NR*/
  fnCalculoMecPart1NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpmecanicoherramient_tb_np !== 0 && this.vrform.value.idpmecanicoherramient_tb_np !== '' && 
        this.vrform.value.idpmecanicoherramient_tb_nc !== 0 && this.vrform.value.idpmecanicoherramient_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpmecanicoherramient_tb_nc)) * Math.abs(Number(this.vrform.value.idpmecanicoherramient_tb_np));
          
      this.vrform.patchValue({
        idpmecanicoherramient_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpmecanicoherramient_tb_nr: result
      })
    }
  }
  /* Mecánicos - Superficies cortantes NP*/
  fnCalculoMecPart2NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpmecanicocortante_tb_nd !== 0 && this.vrform.value.idpmecanicocortante_tb_nd !== '' && 
        this.vrform.value.idpmecanicocortante_tb_ne !== 0 && this.vrform.value.idpmecanicocortante_tb_ne !== '') {
        num =  this.vrform.value.idpmecanicocortante_tb_nd * this.vrform.value.idpmecanicocortante_tb_ne;

        this.vrform.patchValue({
          idpmecanicocortante_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpmecanicocortante_interpreta:inter
        })
    }
  }
  /* Mecánicos - Superficies cortantes NR*/
  fnCalculoMecPart2NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpmecanicocortante_tb_np !== 0 && this.vrform.value.idpmecanicocortante_tb_np !== '' && 
        this.vrform.value.idpmecanicocortante_tb_nc !== 0 && this.vrform.value.idpmecanicocortante_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpmecanicocortante_tb_nc)) * Math.abs(Number(this.vrform.value.idpmecanicocortante_tb_np));
          
      this.vrform.patchValue({
        idpmecanicocortante_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpmecanicocortante_tb_nr: result
      })
    }
  }
  /* Mecánicos - Contacto con elementos cortopunzantes NP*/
  fnCalculoMecPart3NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpmecanicocortopunz_tb_nd !== 0 && this.vrform.value.idpmecanicocortopunz_tb_nd !== '' && 
        this.vrform.value.idpmecanicocortopunz_tb_ne !== 0 && this.vrform.value.idpmecanicocortopunz_tb_ne !== '') {
        num =  this.vrform.value.idpmecanicocortopunz_tb_nd * this.vrform.value.idpmecanicocortopunz_tb_ne;

        this.vrform.patchValue({
          idpmecanicocortopunz_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpmecanicocortopunz_interpreta:inter
        })
    }
  }
  /* Mecánicos - Contacto con elementos cortopunzantes NR*/
  fnCalculoMecPart3NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpmecanicocortopunz_tb_np !== 0 && this.vrform.value.idpmecanicocortopunz_tb_np !== '' && 
        this.vrform.value.idpmecanicocortopunz_tb_nc !== 0 && this.vrform.value.idpmecanicocortopunz_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpmecanicocortopunz_tb_nc)) * Math.abs(Number(this.vrform.value.idpmecanicocortopunz_tb_np));
          
      this.vrform.patchValue({
        idpmecanicocortopunz_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpmecanicocortopunz_tb_nr: result
      })
    }
  }
  /* Mecánicos - Materiales proyectados sólidos o fluidos NP*/
  fnCalculoMecPart4NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpmecanicomateriales_tb_nd !== 0 && this.vrform.value.idpmecanicomateriales_tb_nd !== '' && 
        this.vrform.value.idpmecanicomateriales_tb_ne !== 0 && this.vrform.value.idpmecanicomateriales_tb_ne !== '') {
        num =  this.vrform.value.idpmecanicomateriales_tb_nd * this.vrform.value.idpmecanicomateriales_tb_ne;

        this.vrform.patchValue({
          idpmecanicomateriales_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpmecanicomateriales_interpreta:inter
        })
    }
  }
  /* Mecánicos - Materiales proyectados sólidos o fluidos NR*/
  fnCalculoMecPart4NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpmecanicomateriales_tb_np !== 0 && this.vrform.value.idpmecanicomateriales_tb_np !== '' && 
        this.vrform.value.idpmecanicomateriales_tb_nc !== 0 && this.vrform.value.idpmecanicomateriales_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpmecanicomateriales_tb_nc)) * Math.abs(Number(this.vrform.value.idpmecanicomateriales_tb_np));
          
      this.vrform.patchValue({
        idpmecanicomateriales_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpmecanicomateriales_tb_nr: result
      })
    }
  }

  /*----------------------------------      METODOS  -  PSICOSOCIAL   ------------------------------------------------ */
  /* Psicosocial - Sobrecarga de trabajo NP*/
  fnCalculoPsicoPart1NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idppsicosobrecarga_tb_nd !== 0 && this.vrform.value.idppsicosobrecarga_tb_nd !== '' && 
        this.vrform.value.idppsicosobrecarga_tb_ne !== 0 && this.vrform.value.idppsicosobrecarga_tb_ne !== '') {
        num =  this.vrform.value.idppsicosobrecarga_tb_nd * this.vrform.value.idppsicosobrecarga_tb_ne;

        this.vrform.patchValue({
          idppsicosobrecarga_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idppsicosobrecarga_interpreta:inter
        })
    }
  }
  /* Psicosocial - Sobrecarga de trabajo NR*/
  fnCalculoPsicoPart1NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idppsicosobrecarga_tb_np !== 0 && this.vrform.value.idppsicosobrecarga_tb_np !== '' && 
        this.vrform.value.idppsicosobrecarga_tb_nc !== 0 && this.vrform.value.idppsicosobrecarga_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idppsicosobrecarga_tb_nc)) * Math.abs(Number(this.vrform.value.idppsicosobrecarga_tb_np));
          
      this.vrform.patchValue({
        idppsicosobrecarga_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idppsicosobrecarga_tb_nr: result
      })
    }
  }
  /* Psicosocial - Resposanbilidad en el cargo/ manejo de personal NP*/
  fnCalculoPsicoPart2NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idppsicoresponsabilidad_tb_nd !== 0 && this.vrform.value.idppsicoresponsabilidad_tb_nd !== '' && 
        this.vrform.value.idppsicoresponsabilidad_tb_ne !== 0 && this.vrform.value.idppsicoresponsabilidad_tb_ne !== '') {
        num =  this.vrform.value.idppsicoresponsabilidad_tb_nd * this.vrform.value.idppsicoresponsabilidad_tb_ne;

        this.vrform.patchValue({
          idppsicoresponsabilidad_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idppsicoresponsabilidad_interpreta:inter
        })
    }
  }
  /* Psicosocial - Resposanbilidad en el cargo/ manejo de personal NR*/
  fnCalculoPsicoPart2NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idppsicoresponsabilidad_tb_np !== 0 && this.vrform.value.idppsicoresponsabilidad_tb_np !== '' && 
        this.vrform.value.idppsicoresponsabilidad_tb_nc !== 0 && this.vrform.value.idppsicoresponsabilidad_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idppsicoresponsabilidad_tb_nc)) * Math.abs(Number(this.vrform.value.idppsicoresponsabilidad_tb_np));
          
      this.vrform.patchValue({
        idppsicoresponsabilidad_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idppsicoresponsabilidad_tb_nr: result
      })
    }
  }
  /* Psicosocial - Trabajo repetitivo NP*/
  fnCalculoPsicoPart3NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idppsicorepetitivo_tb_nd !== 0 && this.vrform.value.idppsicorepetitivo_tb_nd !== '' && 
        this.vrform.value.idppsicorepetitivo_tb_ne !== 0 && this.vrform.value.idppsicorepetitivo_tb_ne !== '') {
        num =  this.vrform.value.idppsicorepetitivo_tb_nd * this.vrform.value.idppsicorepetitivo_tb_ne;

        this.vrform.patchValue({
          idppsicorepetitivo_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idppsicorepetitivo_interpreta:inter
        })
    }
  }
  /* Psicosocial - Trabajo repetitivo NR*/
  fnCalculoPsicoPart3NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idppsicorepetitivo_tb_np !== 0 && this.vrform.value.idppsicorepetitivo_tb_np !== '' && 
        this.vrform.value.idppsicorepetitivo_tb_nc !== 0 && this.vrform.value.idppsicorepetitivo_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idppsicorepetitivo_tb_nc)) * Math.abs(Number(this.vrform.value.idppsicorepetitivo_tb_np));
          
      this.vrform.patchValue({
        idppsicorepetitivo_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idppsicorepetitivo_tb_nr: result
      })
    }
  }

  /*----------------------------------      METODOS  -  PÚBLICOS   ------------------------------------------------ */
  /* Públicos - Situación de atraco o robo NP*/
  fnCalculoPubliPart1NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idppublicorobo_tb_nd !== 0 && this.vrform.value.idppublicorobo_tb_nd !== '' && 
        this.vrform.value.idppublicorobo_tb_ne !== 0 && this.vrform.value.idppublicorobo_tb_ne !== '') {
        num =  this.vrform.value.idppublicorobo_tb_nd * this.vrform.value.idppublicorobo_tb_ne;

        this.vrform.patchValue({
          idppublicorobo_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idppublicorobo_interpreta:inter
        })
    }
  }
  /* Públicos - Situación de atraco o robo NR*/
  fnCalculoPubliPart1NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idppublicorobo_tb_np !== 0 && this.vrform.value.idppublicorobo_tb_np !== '' && 
        this.vrform.value.idppublicorobo_tb_nc !== 0 && this.vrform.value.idppublicorobo_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idppublicorobo_tb_nc)) * Math.abs(Number(this.vrform.value.idppublicorobo_tb_np));
          
      this.vrform.patchValue({
        idppublicorobo_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idppublicorobo_tb_nr: result
      })
    }
  }
  /* Públicos - Terrorismo NP*/
  fnCalculoPubliPart2NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idppublicoterrorismo_tb_nd !== 0 && this.vrform.value.idppublicoterrorismo_tb_nd !== '' && 
        this.vrform.value.idppublicoterrorismo_tb_ne !== 0 && this.vrform.value.idppublicoterrorismo_tb_ne !== '') {
        num =  this.vrform.value.idppublicoterrorismo_tb_nd * this.vrform.value.idppublicoterrorismo_tb_ne;

        this.vrform.patchValue({
          idppublicoterrorismo_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idppublicoterrorismo_interpreta:inter
        })
    }
  }
  /* Públicos - Terrorismo NR*/
  fnCalculoPubliPart2NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idppublicoterrorismo_tb_np !== 0 && this.vrform.value.idppublicoterrorismo_tb_np !== '' && 
        this.vrform.value.idppublicoterrorismo_tb_nc !== 0 && this.vrform.value.idppublicoterrorismo_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idppublicoterrorismo_tb_nc)) * Math.abs(Number(this.vrform.value.idppublicoterrorismo_tb_np));
          
      this.vrform.patchValue({
        idppublicoterrorismo_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idppublicoterrorismo_tb_nr: result
      })
    }
  }
  /* Públicos - Situación de Agresión fisica NP*/
  fnCalculoPubliPart3NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idppublicoagresion_tb_nd !== 0 && this.vrform.value.idppublicoagresion_tb_nd !== '' && 
        this.vrform.value.idppublicoagresion_tb_ne !== 0 && this.vrform.value.idppublicoagresion_tb_ne !== '') {
        num =  this.vrform.value.idppublicoagresion_tb_nd * this.vrform.value.idppublicoagresion_tb_ne;

        this.vrform.patchValue({
          idppublicoagresion_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idppublicoagresion_interpreta:inter
        })
    }
  }
  /* Públicos - Situación de Agresión fisica NR*/
  fnCalculoPubliPart3NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idppublicoagresion_tb_np !== 0 && this.vrform.value.idppublicoagresion_tb_np !== '' && 
        this.vrform.value.idppublicoagresion_tb_nc !== 0 && this.vrform.value.idppublicoagresion_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idppublicoagresion_tb_nc)) * Math.abs(Number(this.vrform.value.idppublicoagresion_tb_np));
          
      this.vrform.patchValue({
        idppublicoagresion_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idppublicoagresion_tb_nr: result
      })
    }
  }
  /* Públicos - Situación de asonada NP*/
  fnCalculoPubliPart4NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idppublicoasonada_tb_nd !== 0 && this.vrform.value.idppublicoasonada_tb_nd !== '' && 
        this.vrform.value.idppublicoasonada_tb_ne !== 0 && this.vrform.value.idppublicoasonada_tb_ne !== '') {
        num =  this.vrform.value.idppublicoasonada_tb_nd * this.vrform.value.idppublicoasonada_tb_ne;

        this.vrform.patchValue({
          idppublicoasonada_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idppublicoasonada_interpreta:inter
        })
    }
  }
  /* Públicos - Situación de asonada NR*/
  fnCalculoPubliPart4NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idppublicoasonada_tb_np !== 0 && this.vrform.value.idppublicoasonada_tb_np !== '' && 
        this.vrform.value.idppublicoasonada_tb_nc !== 0 && this.vrform.value.idppublicoasonada_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idppublicoasonada_tb_nc)) * Math.abs(Number(this.vrform.value.idppublicoasonada_tb_np));
          
      this.vrform.patchValue({
        idppublicoasonada_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idppublicoasonada_tb_nr: result
      })
    }
  }

  /*----------------------------------      METODOS  -  TRANSITO   ------------------------------------------------ */
  /* Transito - Transporte motocicleta NP*/
  fnCalculoTransiPart1NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idptransitomoto_tb_nd !== 0 && this.vrform.value.idptransitomoto_tb_nd !== '' && 
        this.vrform.value.idptransitomoto_tb_ne !== 0 && this.vrform.value.idptransitomoto_tb_ne !== '') {
        num =  this.vrform.value.idptransitomoto_tb_nd * this.vrform.value.idptransitomoto_tb_ne;

        this.vrform.patchValue({
          idptransitomoto_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idptransitomoto_interpreta:inter
        })
    }
  }
  /* Transito - Transporte motocicleta NR*/
  fnCalculoTransiPart1NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idptransitomoto_tb_np !== 0 && this.vrform.value.idptransitomoto_tb_np !== '' && 
        this.vrform.value.idptransitomoto_tb_nc !== 0 && this.vrform.value.idptransitomoto_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idptransitomoto_tb_nc)) * Math.abs(Number(this.vrform.value.idptransitomoto_tb_np));
          
      this.vrform.patchValue({
        idptransitomoto_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idptransitomoto_tb_nr: result
      })
    }
  }
  /* Transito - Transporte carro / ambulancia NP*/
  fnCalculoTransiPart2NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idptransitocarro_tb_nd !== 0 && this.vrform.value.idptransitocarro_tb_nd !== '' && 
        this.vrform.value.idptransitocarro_tb_ne !== 0 && this.vrform.value.idptransitocarro_tb_ne !== '') {
        num =  this.vrform.value.idptransitocarro_tb_nd * this.vrform.value.idptransitocarro_tb_ne;

        this.vrform.patchValue({
          idptransitocarro_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idptransitocarro_interpreta:inter
        })
    }
  }
  /* Transito - Transporte carro / ambulancia NR*/
  fnCalculoTransiPart2NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idptransitocarro_tb_np !== 0 && this.vrform.value.idptransitocarro_tb_np !== '' && 
        this.vrform.value.idptransitocarro_tb_nc !== 0 && this.vrform.value.idptransitocarro_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idptransitocarro_tb_nc)) * Math.abs(Number(this.vrform.value.idptransitocarro_tb_np));
          
      this.vrform.patchValue({
        idptransitocarro_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idptransitocarro_tb_nr: result
      })
    }
  }

  /*----------------------------------      METODOS  -  QUÍMICOS   ------------------------------------------------ */
  /* Químicos - Aerosoles, líquidos, rocíos NP*/
  fnCalculoQuimiPart1NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpquimicosaerosol_tb_nd !== 0 && this.vrform.value.idpquimicosaerosol_tb_nd !== '' && 
        this.vrform.value.idpquimicosaerosol_tb_ne !== 0 && this.vrform.value.idpquimicosaerosol_tb_ne !== '') {
        num =  this.vrform.value.idpquimicosaerosol_tb_nd * this.vrform.value.idpquimicosaerosol_tb_ne;

        this.vrform.patchValue({
          idpquimicosaerosol_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'BAJO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
        }

        this.vrform.patchValue({
          idpquimicosaerosol_interpreta:inter
        })
    }
  }
  /* Químicos - Aerosoles, líquidos, rocíos NR*/
  fnCalculoQuimiPart1NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpquimicosaerosol_tb_np !== 0 && this.vrform.value.idpquimicosaerosol_tb_np !== '' && 
        this.vrform.value.idpquimicosaerosol_tb_nc !== 0 && this.vrform.value.idpquimicosaerosol_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpquimicosaerosol_tb_nc)) * Math.abs(Number(this.vrform.value.idpquimicosaerosol_tb_np));
          
      this.vrform.patchValue({
        idpquimicosaerosol_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpquimicosaerosol_tb_nr: result
      })
    }
  }
  /* Químicos - Gases y vapores NP*/
  fnCalculoQuimiPart2NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpquimicosgases_tb_nd !== 0 && this.vrform.value.idpquimicosgases_tb_nd !== '' && 
        this.vrform.value.idpquimicosgases_tb_ne !== 0 && this.vrform.value.idpquimicosgases_tb_ne !== '') {
        num =  this.vrform.value.idpquimicosgases_tb_nd * this.vrform.value.idpquimicosgases_tb_ne;

        this.vrform.patchValue({
          idpquimicosgases_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpquimicosgases_interpreta:inter
        })
    }
  }
  /* Químicos - Gases y vapores NR*/
  fnCalculoQuimiPart2NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpquimicosgases_tb_np !== 0 && this.vrform.value.idpquimicosgases_tb_np !== '' && 
        this.vrform.value.idpquimicosgases_tb_nc !== 0 && this.vrform.value.idpquimicosgases_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpquimicosgases_tb_nc)) * Math.abs(Number(this.vrform.value.idpquimicosgases_tb_np));
          
      this.vrform.patchValue({
        idpquimicosgases_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpquimicosgases_tb_nr: result
      })
    }
  }
  /* Químicos - Sustancias sólidas (polvos) NP*/
  fnCalculoQuimiPart3NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpquimicossustanc_tb_nd !== 0 && this.vrform.value.idpquimicossustanc_tb_nd !== '' && 
        this.vrform.value.idpquimicossustanc_tb_ne !== 0 && this.vrform.value.idpquimicossustanc_tb_ne !== '') {
        num =  this.vrform.value.idpquimicossustanc_tb_nd * this.vrform.value.idpquimicossustanc_tb_ne;

        this.vrform.patchValue({
          idpquimicossustanc_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpquimicossustanc_interpreta:inter
        })
    }
  }
  /* Químicos - Sustancias sólidas (polvos) NR*/
  fnCalculoQuimiPart3NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpquimicossustanc_tb_np !== 0 && this.vrform.value.idpquimicossustanc_tb_np !== '' && 
        this.vrform.value.idpquimicossustanc_tb_nc !== 0 && this.vrform.value.idpquimicossustanc_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpquimicossustanc_tb_nc)) * Math.abs(Number(this.vrform.value.idpquimicossustanc_tb_np));
          
      this.vrform.patchValue({
        idpquimicossustanc_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpquimicossustanc_tb_nr: result
      })
    }
  }
  /* Químicos - Contacto y/o salpicadura de químicos NP*/
  fnCalculoQuimiPart4NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idpquimicoscontacto_tb_nd !== 0 && this.vrform.value.idpquimicoscontacto_tb_nd !== '' && 
        this.vrform.value.idpquimicoscontacto_tb_ne !== 0 && this.vrform.value.idpquimicoscontacto_tb_ne !== '') {
        num =  this.vrform.value.idpquimicoscontacto_tb_nd * this.vrform.value.idpquimicoscontacto_tb_ne;

        this.vrform.patchValue({
          idpquimicoscontacto_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idpquimicoscontacto_interpreta:inter
        })
    }
  }
  /* Químicos - Contacto y/o salpicadura de químicos NR*/
  fnCalculoQuimiPart4NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idpquimicoscontacto_tb_np !== 0 && this.vrform.value.idpquimicoscontacto_tb_np !== '' && 
        this.vrform.value.idpquimicoscontacto_tb_nc !== 0 && this.vrform.value.idpquimicoscontacto_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idpquimicoscontacto_tb_nc)) * Math.abs(Number(this.vrform.value.idpquimicoscontacto_tb_np));
          
      this.vrform.patchValue({
        idpquimicoscontacto_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpquimicoscontacto_tb_nr: result
      })
    }
  }

  /*----------------------------------      METODOS  -  TAREAS DE ALTO RIESGO   ------------------------------------------------ */
  /* Tareas de alto riesgo - Trabajo en alturas por encima de 1.50 metros NP*/
  fnCalculoTARPart1NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idptareasalturas_tb_nd !== 0 && this.vrform.value.idptareasalturas_tb_nd !== '' && 
        this.vrform.value.idptareasalturas_tb_ne !== 0 && this.vrform.value.idptareasalturas_tb_ne !== '') {
        num =  this.vrform.value.idptareasalturas_tb_nd * this.vrform.value.idptareasalturas_tb_ne;

        this.vrform.patchValue({
          idptareasalturas_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idptareasalturas_interpreta:inter
        })
    }
  }
  /* Tareas de alto riesgo - Trabajo en alturas por encima de 1.50 metros NR*/
  fnCalculoTARPart1NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idptareasalturas_tb_np !== 0 && this.vrform.value.idptareasalturas_tb_np !== '' && 
        this.vrform.value.idptareasalturas_tb_nc !== 0 && this.vrform.value.idptareasalturas_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idptareasalturas_tb_nc)) * Math.abs(Number(this.vrform.value.idptareasalturas_tb_np));
          
      this.vrform.patchValue({
        idptareasalturas_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idptareasalturas_tb_nr: result
      })
    }
  }
  /* Tareas de alto riesgo - Trabajo en espacios confinados NP*/
  fnCalculoTARPart2NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idptareasconfinados_tb_nd !== 0 && this.vrform.value.idptareasconfinados_tb_nd !== '' && 
        this.vrform.value.idptareasconfinados_tb_ne !== 0 && this.vrform.value.idptareasconfinados_tb_ne !== '') {
        num =  this.vrform.value.idptareasconfinados_tb_nd * this.vrform.value.idptareasconfinados_tb_ne;

        this.vrform.patchValue({
          idptareasconfinados_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idptareasconfinados_interpreta:inter
        })
    }
  }
  /* Tareas de alto riesgo - Trabajo en espacios confinados NR*/
  fnCalculoTARPart2NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idptareasconfinados_tb_np !== 0 && this.vrform.value.idptareasconfinados_tb_np !== '' && 
        this.vrform.value.idptareasconfinados_tb_nc !== 0 && this.vrform.value.idptareasconfinados_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idptareasconfinados_tb_nc)) * Math.abs(Number(this.vrform.value.idptareasconfinados_tb_np));
          
      this.vrform.patchValue({
        idptareasconfinados_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idptareasconfinados_tb_nr: result
      })
    }
  }
  /* Tareas de alto riesgo - Trabajo en caliente corte y soldadura NP*/
  fnCalculoTARPart3NP(){
    var num:number = 0;
    var inter:string = '';
    if (this.vrform.value.idptareassoldadura_tb_nd !== 0 && this.vrform.value.idptareassoldadura_tb_nd !== '' && 
        this.vrform.value.idptareassoldadura_tb_ne !== 0 && this.vrform.value.idptareassoldadura_tb_ne !== '') {
        num =  this.vrform.value.idptareassoldadura_tb_nd * this.vrform.value.idptareassoldadura_tb_ne;

        this.vrform.patchValue({
          idptareassoldadura_tb_np:num
        })

        if (num <= 40 && num >= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'BAJO';
        }

        this.vrform.patchValue({
          idptareassoldadura_interpreta:inter
        })
    }
  }
  /* Tareas de alto riesgo - Trabajo en caliente corte y soldadura NR*/
  fnCalculoTARPart3NR(){
    var num:number = 0;
    var result:string = '';
    if (this.vrform.value.idptareassoldadura_tb_np !== 0 && this.vrform.value.idptareassoldadura_tb_np !== '' && 
        this.vrform.value.idptareassoldadura_tb_nc !== 0 && this.vrform.value.idptareassoldadura_tb_nc !== '') {
      num = Math.abs(Number(this.vrform.value.idptareassoldadura_tb_nc)) * Math.abs(Number(this.vrform.value.idptareassoldadura_tb_np));
          
      this.vrform.patchValue({
        idptareassoldadura_intervencion:num
      })

      if (num <= 4000 && num >= 600) {
        result = 'I';
      }

      if (num <= 500 && num >= 150) {
        result = 'II';
      }

      if (num <= 120 && num >= 40) {
        result = 'III';
      }

      if (num < 40 && num >= 0) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idptareassoldadura_tb_nr: result
      })
    }
  }
  backClicked() {
    this._location.back();
  }

  validaNumericos(event) {
    if(event.charCode >= 48 && event.charCode <= 57){
      return true;
     }
    return false;        
  }

  @HostListener("window:resize", ["$event"])
    onResize() {
    this.mobWidth = window.innerWidth;
    if (this.mobWidth <= 1024) {
        this.imgvalidator = false;
    } else {
        this.imgvalidator = true;
    }  
  }

}
