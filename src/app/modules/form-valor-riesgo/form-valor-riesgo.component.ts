import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  
  constructor(private fb: FormBuilder,
              private valoraRiesgoService: ValoracionRiesgosService,
              private areasServices: AreasService,
              private router: Router,
              private _messageService: MessageService,
              private datepipe: DatePipe) { 
                this.idEmpresa = Number(localStorage.getItem('idEmpresa')); 
                this.userMod = localStorage.getItem('user');
                this.fechaActual = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
              }

  ngOnInit() {
    this.localVR = JSON.parse(localStorage.getItem('valorRiesgo'));  
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
      idptareassoldadura_observaciones:['.']
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
        idptareassoldadura_observaciones:this.localVR.idptareassoldadura_observaciones
      })

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

          if (num >= 40 && num <= 24) {
            inter = 'MUY ALTO';
          }

          if (num <= 20 && num >= 10) {
            inter = 'ALTO';
          }

          if (num <= 8 && num >= 6) {
            inter = 'MEDIO';
          }

          if (num <= 4 && num >= 2) {
            inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

          if (num >= 40 && num <= 24) {
            inter = 'MUY ALTO';
          }

          if (num <= 20 && num >= 10) {
            inter = 'ALTO';
          }

          if (num <= 8 && num >= 6) {
            inter = 'MEDIO';
          }

          if (num <= 4 && num >= 2) {
            inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

          if (num >= 40 && num <= 24) {
            inter = 'MUY ALTO';
          }

          if (num <= 20 && num >= 10) {
            inter = 'ALTO';
          }

          if (num <= 8 && num >= 6) {
            inter = 'MEDIO';
          }

          if (num <= 4 && num >= 2) {
            inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

          if (num >= 40 && num <= 24) {
            inter = 'MUY ALTO';
          }

          if (num <= 20 && num >= 10) {
            inter = 'ALTO';
          }

          if (num <= 8 && num >= 6) {
            inter = 'MEDIO';
          }

          if (num <= 4 && num >= 2) {
            inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpfisicofrio_tb_nr: result
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

          if (num >= 40 && num <= 24) {
            inter = 'MUY ALTO';
          }

          if (num <= 20 && num >= 10) {
            inter = 'ALTO';
          }

          if (num <= 8 && num >= 6) {
            inter = 'MEDIO';
          }

          if (num <= 4 && num >= 2) {
            inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
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

        if (num >= 40 && num <= 24) {
          inter = 'MUY ALTO';
        }

        if (num <= 20 && num >= 10) {
          inter = 'ALTO';
        }

        if (num <= 8 && num >= 6) {
          inter = 'MEDIO';
        }

        if (num <= 4 && num >= 2) {
          inter = 'MEDIO';
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

      if (num < 40 && num >= 20) {
        result = 'IV';
      }

      this.vrform.patchValue({
        idpincendiossustancias_tb_nr: result
      })
    }
  }

}
