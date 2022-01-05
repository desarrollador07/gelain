import { Component, OnInit} from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
/*Modulos */
import { Message, MessageService } from 'primeng/primeng';
/*Modelos */
import { ReporteDetallado } from '../../models/reporteDetallado';
/*Servicios */
import { PruebaService } from '../../services/prueba.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-empleados',
  templateUrl: './ReporteDetallado.component.html',
  styleUrls: ['./ReporteDetallado.component.css']
})
export class ReporteDetalladoComponent implements OnInit {

  idEmpresa:number;
  idtemporal:number = 0;
  rdEmpleado: ReporteDetallado[] = [];/*Reporte detallado por Empleado */
  buscarData:string;
  selectReporte: any;
  loading:boolean = true;
  msgs: Message[] = [];
  fechafinal: Date;
  rdSelect = [
    {label:'Seleccione Una Opción', value:null},
    {label:'Cédula', value:1},
    {label:'Nombre', value:2},
    {label:'Ciudad', value:3},
    {label:'Área', value:4},
    {label:'Sede', value:5},
    {label:'Reporte General', value:6},
    {label:'Reporte Global', value:7}
  ];
  cols = [
    { field: 'emdcedula', header: 'Cédula' },
    { field: 'emdnombres', header: 'Nombre' },
    { field: 'emdtraciudad', header: 'Ciudad' },
    { field: 'emdtelefono', header: 'Telefono' },
    { field: 'arenombre', header: 'Área' },
    { field: 'emdzona', header: 'Sede' }
  ];

  constructor(private pruebaServices:PruebaService,
              private _messageService: MessageService,
              private datepipe: DatePipe,
              private store: Store<AppState>
              ) {
                this.idEmpresa = Number(sessionStorage.getItem("idEmpresa"));  
                this.fechafinal = new Date() 
   }

  async ngOnInit() {
  
    this.store.select('empresas').subscribe(async res=>{
      var id:number;
      if (res.empresa !== undefined) {
        id = res.empresa.empid;
      }else{
        id = this.idEmpresa;
      }
      if (id !== undefined && id !== null) {
        this.limpiarData();
      /*Consulta de reportes por empleado */
      await this.consultarReportes(id);
      }

      if(sessionStorage.getItem('idEmpresa') === null){
        this.loading = false;
        this.showInfo();
      }
    });
    
  }

  async consultarReportes(id:number){

    await this.pruebaServices
    .getReporteExcelDetallado(id).toPromise().then((data: any)=>{
      this.rdEmpleado = data;
      if (this.rdEmpleado.length > 0) {
        this.loading = false;
      }else{
        this.loading = false;
      }
    });

  }
  /* Función para exportar los registros de los empleados en Excel */
  exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.reporteDetalladoEmpleado());
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, `EMPLEADOS_RD_${this.datepipe.transform(this.fechafinal, "yyyy-MM-dd")}`);
      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      import("file-saver").then(FileSaver => {
          let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          let EXCEL_EXTENSION = '.xlsx';
          const data: Blob = new Blob([buffer], {
              type: EXCEL_TYPE
          });
          FileSaver.saveAs(data, fileName  + EXCEL_EXTENSION);
      });
  }

  reporteDetalladoEmpleado() {
      let rDETemp = [];
      let dataReporte :any;

      for(let rDE of this.rdEmpleado) {
          rDE.emdnombres = rDE.emdnombres.toString()+" "+rDE.emdapellidos.toString();
          rDETemp.push(rDE);
      }
      
      dataReporte = rDETemp.map( item => { 
        /*TODO: Falta asignar campo fecha de registro en la exportación, Novedad: Campo no creado en la tabla */
        return {
          'CEDULA': item.emdcedula,
          'NOMBRE': item.emdnombres,
          'CIUDAD':item.emdtraciudad,
          'SEXO':item.emdsexo,
          'FECHA NACIMIENTO':item.emdfecnacido,
          'CARGO':item.emdcargo,
          'PROFESION':item.emdprofesion,
          'TELEFONO':item.emdtelefono,
          'CORREO':item.emdemail,
          'SEDES':item.emdzona,
          'AREA':item.arenombre,
          'TIPO FORMATO':item.formato,
          'TOTAL LIDERAZGO':item.Resintr_total_liderazgo_rela,
          'LIDERAZGO': item.Resintr_lider_liderazgo,
          'RELACIONES': item.Resintr_lider_relaciones,
          'RETROALIMENTACION': item.Resintr_lider_retroalimenta,
          'COLABORA': item.Resintr_lider_rela_colabora,
          'TOTAL LIDERAZGO VALOR':item.intr_total_liderazgo_rela_val,
          'LIDERAZGO VALOR': item.intr_lider_liderazgo_val,
          'RELACIONES VALOR':item.intr_lider_relaciones_val,
          'RETROALIMENTACION VALOR': item.intr_lider_retroalimenta_val,
          'COLABORA VALOR': item.intr_lider_rela_colabora_val,

          'CONTROL TRABAJO':item.Resintr_total_ctrl,
          'ROL': item.Resintr_ctrl_rol,
          'CAPACITA': item.Resintr_ctrl_capacita,
          'OPORTUNIDADES': item.Resintr_ctrl_oportunidades,
          'PARTICIPACION': item.Resintr_ctrl_cambio,
          'AUTONOMIA': item.Resintr_ctrl_autonomia,
          'CONTROL TABAJO VALOR':item.intr_total_ctrl_val,
          'ROL VALOR':item.intr_ctrl_rol_val,
          'CAPACITA VALOR':item.intr_ctrl_capacita_val,
          'OPORTUNIDADES VALOR': item.intr_ctrl_oportunidades_val,
          'PARTICIPACION VALOR':item.intr_ctrl_cambio_val,
          'AUTONOMIA VALOR':item.intr_ctrl_autonomia_val,

          'DEMANDAS':item.Resintr_total_deman,
          'AMBIENTE':  item.Resintr_deman_ambiental,
          'RESPONSABLE':  item.Resintr_deman_responsa,
          'CONSISTENCIA':  item.Resintr_deman_consistencia,
          'EMOCIONALES': item.Resintr_deman_emocionales,
          'JORNADA': item.Resintr_deman_jornada,
          'INFLUENCIA': item.Resintr_deman_influencia,
          'CUANTITATIVA': item.Resintr_deman_cuantitativas,
          'MENTAL': item.Resintr_deman_carmental,
          'TOTAL DEMANDAS':item.intr_total_deman_val,
          'AMBIENTE VALOR':item.intr_deman_ambientales_val,
          'RESPONSABLE VALOR':item.intr_deman_responsa_val,
          'CONSISTENCIA VALOR':item.intr_deman_consistencia_val,
          'EMOCIONALES VALOR':item.intr_deman_emocionales_val,
          'JORNADA VALOR':item.intr_deman_jornada_val,
          'INFLUENCIA VALOR':item.intr_deman_influencia_val,
          'CUANTITATIVA VALOR':item.intr_deman_cuantitativas_val,
          'MENTAL VALOR':item.intr_deman_carmental_val,

          'RECOMPENSAS':item.Resintr_total_recompensas,
          'RECONOCIMIENTO': item.Resintr_recom_reconocimiento,
          'RECOMPENSAS DERIVADAS': item.Resintr_recom_recompensas,
          'RECOMPENSAS VALOR':item.intr_total_recompensas_val,
          'RECONOCIMIENTO VALOR':item.intr_recom_reconocimiento_val,
          'RECOMPENSAS DERIVADAS VALOR':item.intr_recom_recompensas_val,

          'EXTRALABORAL':item.Resextralab_total,
          'TIEMPOF':  item.Resextralab_tiempof,
          'RELACION FAMILIA':  item.Resextralab_relafami,
          'COMUNICACION':  item.Resextralab_comunicacion,
          'SITUACION ECONOMICA': item.Resextralab_situacion_econo,
          'VIVIENDA': item.Resextralab_carvivienda,
          'INFLUENCIAENT': item.Resextralab_influenciaent,
          'DESPLAZAMIENTO': item.Resextralab_desplazamiento,
          'EXTRALABORAL VALOR':item.extralab_total_val,
          'TIEMPOF VALOR':item.extralab_tiempof_val,
          'RELACION FAMILIA VALOR':item.extralab_relafami_val,
          'COMUNICACION VALOR':item.extralab_comunicacion_val,
          'SITUACION ECONOMICA VALOR':item.extralab_situacion_econo_val,
          'VIVIENDA VALOR':item.extralab_carvivienda_val,
          'INFLUENCIAENT VALOR':item.extralab_influenciaent_val,
          'DESPLAZAMIENTO VALOR':item.extralab_desplazamiento_val,

          'ESTRES':item.Resestres_total,
          'FISIOLO': item.Resestres_fisiolo,
          'CORPORAL': item.Resestres_comportamiento,
          'INTELECTUAL': item.Resestres_intelectuales,
          'PSICOEMOCIONAL': item.Resestres_psicoemocionales,
          'ESTRES VALOR':item.estres_total_val,
          'FISIOLO VALOR':item.estres_fisiolo_val,
          'CORPORAL VALOR':item.estres_comportamiento_val,
          'INTELECTUAL VALOR':item.estres_intelectuales_val,
          'PSICOEMOCIONAL VALOR':item.psicoemocionales_val,

          'TOTAL GENERAL':item.total_general,
          'INTRALABORAL FIN':item.Restotal_intralaboral_fin,
          'EXTRALABORAL FIN':item.Restotal_extralaboral_fin,
          'TOTAL GENERAL VALOR':item.total_general_val,
          'INTRALABORAL FIN VALOR':item.total_intralaboral_fin_val,
          'EXTRALABORAL FIN VALOR':item.total_extralaboral_fin_val,
          'FECHA DE MODICACIÓN':item.emdfechamod
        }; 
      });

      return dataReporte;
  }

  async consultaAll(){
    await this.pruebaServices
    .getAllReporteDetallado().toPromise().then((data: any)=>{
      this.rdEmpleado = data;
      if (this.rdEmpleado.length > 0) {
        this.loading = false;
      }else{
        this.loading = false;
      }
    });
  }

  /*Función de la busqueda avanzada */
  async buscador(){
    this.loading = true;
      /*Validación del desplegable que nos identifica si en una busqueda no eligen el tipo de busqueda */
      if (this.selectReporte === null || this.selectReporte === undefined) {
          this._messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Debe seleccionar el tipo dato a buscar', life: 3000 });
          this.loading = false;
          return;
      }
      /*Validación del desplegable  que  permite traer todos los datos */
      if (this.selectReporte === 6) {
        this.rdEmpleado = [];
        this.buscarData = '';
        await this.consultarReportes(this.idEmpresa);
        return;
      }
      if (this.selectReporte === 7) {
        this.rdEmpleado = [];
        await this.consultaAll();
      }
      /*Valida que el input  tenga data para buscar */
      if (this.buscarData !== undefined && this.buscarData !== null && this.buscarData !== '') {
        const data = this.buscarData.trim();
        await this.pruebaServices.getBuscardorData(this.idEmpresa,data,this.selectReporte).toPromise().then((res:any) => {
            
            if (res !== null) {
              this.rdEmpleado = [];
              this.rdEmpleado = res;
            }

            if (res.length === 0) {
              this._messageService.add({ severity: 'info', summary: 'Sin Resultados', detail: 'No se encontraron resultados para el tipo de busqueda', life: 3000 });
            }

            if (res.length > 0) {
              this.loading = false;
            }else{
              this.loading = false;
            }
            
        },err => console.log(err));
      }
     
  }

   /*Mensaje Informativo cuando esta seleccionada la empresa */
   showInfo() {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Info', detail:'SELECCIONE UNA EMPRESA'});
  }

  limpiarData(){
    this.msgs = [];
  }

}
