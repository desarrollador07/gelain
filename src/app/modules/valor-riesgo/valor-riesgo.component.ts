import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppState } from 'src/app/app.reducer';
import { Area } from 'src/app/models/area.model';
import { ValorRiesgoModel } from 'src/app/models/valor-riesgo.model';
import { AreasService } from 'src/app/services/areas.service';
import { ValoracionRiesgosService } from '../../services/valoracion-riesgos.service';

@Component({
  selector: 'app-valor-riesgo',
  templateUrl: './valor-riesgo.component.html',
  styleUrls: ['./valor-riesgo.component.css']
})
export class ValorRiesgoComponent implements OnInit {

  vrData: ValorRiesgoModel[] = [];/*Arreglo VR */
  idEmpresa:any;
  loading:boolean = true;
  cols:any[] = [];
  frozenCols: any[] = [];
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
  fechainicial: Date;
  fechafinal: Date;
  tipoSelect = [
    {label:'Todos los registros', value:1},
    {label:'NIT', value:2},
    {label:'Nombre', value:3},
    {label:'Prefijo', value:4},
    {label:'Número', value:5}
  ];
  buscarData:string = '';
  selectBuscar:any = 1;
  id:any;
  areas: Area[] = [];

  constructor(private valoraRiesgoService: ValoracionRiesgosService,
              private _messageService: MessageService,
              private datepipe: DatePipe,
              private areasServices: AreasService,
              private _confirmationServices: ConfirmationService,
              private store: Store<AppState>) {
               this.idEmpresa = sessionStorage.getItem('idEmpresa');   
  }

  async ngOnInit() {
    this.consultaStore();
    this.datosGenerales();
  }
  /*Elimina los datos de los registros  de la tabla */
  deleteVR(id: number) {
    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este elemento?',
      header:'Confirmación',
      icon:'pi pi-exclamation-triangle',
      accept:() => {
        this.valoraRiesgoService.deletevalorRiesgo(id)
        .toPromise().then(data => {
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'El registro se ha eliminado', life: 3000})
          this.vrData = this.vrData.filter(r => r.idp_id !== id);
        });
      }
    });
  }
  /*Agrega el objeto selecionado de VF */
  editPrueba(vrData:ValorRiesgoModel){
    sessionStorage.setItem('valorRiesgo',JSON.stringify(vrData));
  }
  /*Remover items del sessionStorage */
  newVR(){
    sessionStorage.removeItem('valorRiesgo');
    sessionStorage.removeItem('prueba');
    sessionStorage.removeItem('IdEmpleado');
    sessionStorage.removeItem('ForA');
    sessionStorage.removeItem('ForAA');
    sessionStorage.removeItem('ForB');
    sessionStorage.removeItem('Extra');
    sessionStorage.removeItem('estres');
    sessionStorage.removeItem('estresEs');
  }
  /*Consulta los registros de la valoración Riesgos */
  async indexData(id:number){
    await this.valoraRiesgoService.getvalorRiesgoId(id).toPromise().then((data:ValorRiesgoModel[])=>{
      this.vrData = data;
      
      if (this.vrData.length > 0) {
        this.asignarNombArea();
        this.makeRowsSameHeight();
        this.loading = false;
      }else{
        this.loading = false;
      }
    });
  }

  makeRowsSameHeight() {
     
    setTimeout(() => {

        if (document.getElementsByClassName('ui-table-scrollable-wrapper').length) {
         
            let wrapper = document.getElementsByClassName('ui-table-scrollable-wrapper');
            for (var i = 0; i < wrapper.length; i++) {
               let w = wrapper.item(i) as HTMLElement;
               let frozen_rows: any = w.querySelectorAll('.ui-table-frozen-view tr');
               let unfrozen_rows: any = w.querySelectorAll('.ui-table-unfrozen-view tr');
               for (let i = 0; i < frozen_rows.length; i++) {
                  if (frozen_rows[i].clientHeight > unfrozen_rows[i].clientHeight) {
                     unfrozen_rows[i].style.height = frozen_rows[i].clientHeight+"px";
                  } 
                  else if (frozen_rows[i].clientHeight < unfrozen_rows[i].clientHeight) 
                  {
                     frozen_rows[i].style.height = unfrozen_rows[i].clientHeight+"px";
                  }
                }
              }
        }
    },100);
  }

  datosGenerales(){
    this.frozenCols = [
      { field: 'idpareanombre', header: 'Area', width: '300px' }
    ];

    this.cols = [
      { field: 'idpnombre', header: 'Nombre', width: '350px' },
      { field: 'idpfecha', header: 'Fecha', width: '160px' },
      { field: 'idpsede', header: 'Sede', width: '180px' },
      { field: 'idptelefono', header: 'Telefono', width: '200px' },
      { field: 'idpestado', header: 'Estado', width: '100px' },
      { field: 'idphorario', header: 'Horario', width: '150px' },
      { field: 'idpfechacrea', header: 'Fecha Registro', width: '250px' },

    ];

    const fecini = new Date();
    this.fechainicial = new Date(fecini.getFullYear(), fecini.getMonth()-1, 1);
    this.fechafinal = new Date();
  }

  consultaStore(){
    this.store.select('empresas').subscribe(async res=>{

      if (res.empresa !== undefined) {
        this.id = res.empresa.empid;
      }else{
        this.id = this.idEmpresa;
      }
      if (this.id !== undefined && this.id !== null) {
        await this.buscarArea(this.id);
        await this.indexData(this.id);
      }
     
    });
  }

  async getVRByFiltro(){

    this.loading = true;
    // if (this.selectBuscar !== 1  && this.buscarData === '') {
    //   this.loading = false;
    //   this._messageService.add({ severity: 'info', summary: 'Informativo', detail: 'Digite el dato a buscar', life: 3000 });
    //   return;
    // }

    if (this.fechafinal === null || this.fechainicial === null ) {
      this.loading = false;
      this._messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Los campos de las fechas deben ir asignados.', life: 3000 });
      return;
    }

    var dateinicio = this.datepipe.transform(this.fechainicial, "yyyy-MM-dd");
    var datefinal = this.datepipe.transform(this.fechafinal, "yyyy-MM-dd");
    if (dateinicio > datefinal) {
      this.loading = false;
      this._messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'La fecha inicial debe ser menor a la fecha final.', life: 3000 });
      return;
    }

    // var valor = this.buscarData.trim();
    // if (this.selectBuscar === 1) {
    //   // valor = 'valor';
    // //  await this.fnSearchByFecha(this.selectBuscar,valor,checkTemp,dateinicio,datefinal);
    // }else{
    // //  await this.fnSearchByFecha(this.selectBuscar,valor,checkTemp,dateinicio,datefinal);
    // }

    await this.buscarVRByFechas(this.id,dateinicio,datefinal);

  }

  async buscarVRByFechas(id:number,fechaInicial:string,fechaFinal:string){
    this.vrData = [];
    await this.valoraRiesgoService.buscarVRByFechas(id,fechaInicial,fechaFinal).toPromise().then((resp:ValorRiesgoModel[]) => {
      this.vrData = resp;
      this.makeRowsSameHeight();
      if (this.vrData.length === 0) {
        this._messageService.add({ severity: 'info', summary: 'Informativo', detail: 'No hay registros para el tipo de busqueda.', life: 3000 });
      }else{
        this.asignarNombArea();
      }
      this.loading = false;

    });
  }

  async buscarArea(id:any){
    await this.areasServices.buscarByArea(id).toPromise().then((data:Area[])=>{
      this.areas = data;
    });

  }

  asignarNombArea(){
    this.vrData.map(resp => {
      var varTemp: Area[] = [];
      varTemp = this.areas.filter(area => area.areid === resp.idparea);
      resp.idpareanombre = varTemp[0].arenombre;
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getCars());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "VR");
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

  getCars() {
    let arrFinal :any;

    console.log("ARRAY DATA", this.vrData);
    
    arrFinal = this.vrData.map( resp => { 
      return {
        'EMPRESA': sessionStorage.getItem('nombreEmpresa'),
        'ÁREA': resp.idpareanombre,
        'NOMBRE LIDER': resp.idpnombre,
        'CÉDULA': resp.idpcedula,
        'TELEFONO':resp.idptelefono,
        'SEDE': resp.idpsede,
        'PROCESO' : '',
        'ZONA/LUGAR':'',
        'ACTIVIDADES':'',
        'TAREAS':'',
        'RUTINARIO (SI/NO)': '',
        /* ----------------------BIOLOGICO------------------- */
        /*Biologico - Derivados de origen animal */
        '1BIOLOGICO - Derivados de origen animal: EFECTOS POSIBLES': resp.idpbioderani_efectos,
        '1BIOLOGICO - Derivados de origen animal: CONTROL EXISTENTE(FUENTE)': resp.idpbioderani_ctrlfuente,
        '1BIOLOGICO - Derivados de origen animal: CONTROL EXISTENTE(MEDIO)': resp.idpbioderani_ctrlmedio,
        '1BIOLOGICO - Derivados de origen animal: CONTROL EXISTENTE(INDIVIDUO)': resp.idpbioderani_ctrlindividuo,
        '1BIOLOGICO - Derivados de origen animal: ND': resp.idpbioderani_tb_nd,
        '1BIOLOGICO - Derivados de origen animal: NE': resp.idpbioderani_tb_ne,
        '1BIOLOGICO - Derivados de origen animal: NP': resp.idpbioderani_tb_ne,
        '1BIOLOGICO - Derivados de origen animal: INTERPRETACIÓN': resp.idpbioderani_interpreta,
        '1BIOLOGICO - Derivados de origen animal: NC': resp.idpbioderani_tb_nc,
        '1BIOLOGICO - Derivados de origen animal: INTERVENCIÓN': resp.idpbioderani_intervencion,
        '1BIOLOGICO - Derivados de origen animal: NR': resp.idpbioderani_tb_nr,
        '1BIOLOGICO - Derivados de origen animal: N° EXPUESTOS': resp.idpbioderani_numpuestos,
        '1BIOLOGICO - Derivados de origen animal: OBSERVACIONES': resp.idpbioderani_observaciones,
        /*Biologico - Microorganismos tipo hongo */
        '2BIOLOGICO - Microorganismos tipo hongo: EFECTOS POSIBLES': resp.idpbiohongo_efectos,
        '2BIOLOGICO - Microorganismos tipo hongo: CONTROL EXISTENTE(FUENTE)': resp.idpbiohongo_ctrlfuente,
        '2BIOLOGICO - Microorganismos tipo hongo: CONTROL EXISTENTE(MEDIO)': resp.idpbiohongo_ctrlmedio,
        '2BIOLOGICO - Microorganismos tipo hongo: CONTROL EXISTENTE(INDIVIDUO)': resp.idpbiohongo_ctrlindividuo,
        '2BIOLOGICO - Microorganismos tipo hongo: ND': resp.idpbiohongo_tb_nd,
        '2BIOLOGICO - Microorganismos tipo hongo: NE': resp.idpbiohongo_tb_ne,
        '2BIOLOGICO - Microorganismos tipo hongo: NP': resp.idpbiohongo_tb_ne,
        '2BIOLOGICO - Microorganismos tipo hongo: INTERPRETACIÓN': resp.idpbiohongo_interpreta,
        '2BIOLOGICO - Microorganismos tipo hongo: NC': resp.idpbiohongo_tb_nc,
        '2BIOLOGICO - Microorganismos tipo hongo: INTERVENCIÓN': resp.idpbiohongo_intervencion,
        '2BIOLOGICO - Microorganismos tipo hongo: NR': resp.idpbiohongo_tb_nr,
        '2BIOLOGICO - Microorganismos tipo hongo: N° EXPUESTOS': resp.idpbiohongo_numpuestos,
        '2BIOLOGICO - Microorganismos tipo hongo: OBSERVACIONES': resp.idpbiohongo_observaciones,
        /*Biologico - Microorganismos tipo bacterias */
        '3BIOLOGICO - Microorganismos tipo bacterias: EFECTOS POSIBLES': resp.idpbiobacterias_efectos,
        '3BIOLOGICO - Microorganismos tipo bacterias: CONTROL EXISTENTE(FUENTE)': resp.idpbiobacterias_ctrlfuente,
        '3BIOLOGICO - Microorganismos tipo bacterias: CONTROL EXISTENTE(MEDIO)': resp.idpbiobacterias_ctrlmedio,
        '3BIOLOGICO - Microorganismos tipo bacterias: CONTROL EXISTENTE(INDIVIDUO)': resp.idpbiobacterias_ctrlindividuo,
        '3BIOLOGICO - Microorganismos tipo bacterias: ND': resp.idpbiobacterias_tb_nd,
        '3BIOLOGICO - Microorganismos tipo bacterias: NE': resp.idpbiobacterias_tb_ne,
        '3BIOLOGICO - Microorganismos tipo bacterias: NP': resp.idpbiobacterias_tb_ne,
        '3BIOLOGICO - Microorganismos tipo bacterias: INTERPRETACIÓN': resp.idpbiobacterias_interpreta,
        '3BIOLOGICO - Microorganismos tipo bacterias: NC': resp.idpbiobacterias_tb_nc,
        '3BIOLOGICO - Microorganismos tipo bacterias: INTERVENCIÓN': resp.idpbiobacterias_intervencion,
        '3BIOLOGICO - Microorganismos tipo bacterias: NR': resp.idpbiobacterias_tb_nr,
        '3BIOLOGICO - Microorganismos tipo bacterias: N° EXPUESTOS': resp.idpbiobacterias_numpuestos,
        '3BIOLOGICO - Microorganismos tipo bacterias: OBSERVACIONES': resp.idpbiobacterias_observaciones,
        /*Biologico - Microorganismos tipo virus */
        '4BIOLOGICO - Microorganismos tipo virus: EFECTOS POSIBLES': resp.idpbiovirus_efectos,
        '4BIOLOGICO - Microorganismos tipo virus: CONTROL EXISTENTE(FUENTE)': resp.idpbiovirus_ctrlfuente,
        '4BIOLOGICO - Microorganismos tipo virus: CONTROL EXISTENTE(MEDIO)': resp.idpbiovirus_ctrlmedio,
        '4BIOLOGICO - Microorganismos tipo virus: CONTROL EXISTENTE(INDIVIDUO)': resp.idpbiovirus_ctrlindividuo,
        '4BIOLOGICO - Microorganismos tipo virus: ND': resp.idpbiovirus_tb_nd,
        '4BIOLOGICO - Microorganismos tipo virus: NE': resp.idpbiovirus_tb_ne,
        '4BIOLOGICO - Microorganismos tipo virus: NP': resp.idpbiovirus_tb_ne,
        '4BIOLOGICO - Microorganismos tipo virus: INTERPRETACIÓN': resp.idpbiovirus_interpreta,
        '4BIOLOGICO - Microorganismos tipo virus: NC': resp.idpbiovirus_tb_nc,
        '4BIOLOGICO - Microorganismos tipo virus: INTERVENCIÓN': resp.idpbiovirus_intervencion,
        '4BIOLOGICO - Microorganismos tipo virus: NR': resp.idpbiovirus_tb_nr,
        '4BIOLOGICO - Microorganismos tipo virus: N° EXPUESTOS': resp.idpbiovirus_numpuestos,
        '4BIOLOGICO - Microorganismos tipo virus: OBSERVACIONES': resp.idpbiovirus_observaciones,
        /*Biologico - Parásitos */
        '5BIOLOGICO - Parásitos: EFECTOS POSIBLES': resp.idpbioparasitos_efectos,
        '5BIOLOGICO - Parásitos: CONTROL EXISTENTE(FUENTE)': resp.idpbioparasitos_ctrlfuente,
        '5BIOLOGICO - Parásitos: CONTROL EXISTENTE(MEDIO)': resp.idpbioparasitos_ctrlmedio,
        '5BIOLOGICO - Parásitos: CONTROL EXISTENTE(INDIVIDUO)': resp.idpbioparasitos_ctrlindividuo,
        '5BIOLOGICO - Parásitos: ND': resp.idpbioparasitos_tb_nd,
        '5BIOLOGICO - Parásitos: NE': resp.idpbioparasitos_tb_ne,
        '5BIOLOGICO - Parásitos: NP': resp.idpbioparasitos_tb_ne,
        '5BIOLOGICO - Parásitos: INTERPRETACIÓN': resp.idpbioparasitos_interpreta,
        '5BIOLOGICO - Parásitos: NC': resp.idpbioparasitos_tb_nc,
        '5BIOLOGICO - Parásitos: INTERVENCIÓN': resp.idpbioparasitos_intervencion,
        '5BIOLOGICO - Parásitos: NR': resp.idpbioparasitos_tb_nr,
        '5BIOLOGICO - Parásitos: N° EXPUESTOS': resp.idpbioparasitos_numpuestos,
        '5BIOLOGICO - Parásitos: OBSERVACIONES': resp.idpbioparasitos_observaciones,
        /* ----------------------CARGA FÍSICA------------------- */
        /* Carga Física - Carga dinámica por esfuerzos */
        '1CARGA FÍSICA - Carga dinámica por esfuerzos: EFECTOS POSIBLES': resp.idpcargesfuerzos_efectos,
        '1CARGA FÍSICA - Carga dinámica por esfuerzos: CONTROL EXISTENTE(FUENTE)': resp.idpcargesfuerzos_ctrlfuente,
        '1CARGA FÍSICA - Carga dinámica por esfuerzos: CONTROL EXISTENTE(MEDIO)': resp.idpcargesfuerzos_ctrlmedio,
        '1CARGA FÍSICA - Carga dinámica por esfuerzos: CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargesfuerzos_ctrlindividuo,
        '1CARGA FÍSICA - Carga dinámica por esfuerzos: ND': resp.idpcargesfuerzos_tb_nd,
        '1CARGA FÍSICA - Carga dinámica por esfuerzos: NE': resp.idpcargesfuerzos_tb_ne,
        '1CARGA FÍSICA - Carga dinámica por esfuerzos: NP': resp.idpcargesfuerzos_tb_ne,
        '1CARGA FÍSICA - Carga dinámica por esfuerzos: INTERPRETACIÓN': resp.idpcargesfuerzos_interpreta,
        '1CARGA FÍSICA - Carga dinámica por esfuerzos: NC': resp.idpcargesfuerzos_tb_nc,
        '1CARGA FÍSICA - Carga dinámica por esfuerzos: INTERVENCIÓN': resp.idpcargesfuerzos_intervencion,
        '1CARGA FÍSICA - Carga dinámica por esfuerzos: NR': resp.idpcargesfuerzos_tb_nr,
        '1CARGA FÍSICA - Carga dinámica por esfuerzos: N° EXPUESTOS': resp.idpcargesfuerzos_numpuestos,
        '1CARGA FÍSICA - Carga dinámica por esfuerzos: OBSERVACIONES': resp.idpcargesfuerzos_observaciones,
        /* Carga Física - Carga dinámica por movimientos repetitivos */
        '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: EFECTOS POSIBLES': resp.idpcargmovimiento_efectos,
        '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: CONTROL EXISTENTE(FUENTE)': resp.idpcargmovimiento_ctrlfuente,
        '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: CONTROL EXISTENTE(MEDIO)': resp.idpcargmovimiento_ctrlmedio,
        '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargmovimiento_ctrlindividuo,
        '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: ND': resp.idpcargmovimiento_tb_nd,
        '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: NE': resp.idpcargmovimiento_tb_ne,
        '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: NP': resp.idpcargmovimiento_tb_ne,
        '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: INTERPRETACIÓN': resp.idpcargmovimiento_interpreta,
        '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: NC': resp.idpcargmovimiento_tb_nc,
        '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: INTERVENCIÓN': resp.idpcargmovimiento_intervencion,
        '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: NR': resp.idpcargmovimiento_tb_nr,
        '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: N° EXPUESTOS': resp.idpcargmovimiento_numpuestos,
        '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: OBSERVACIONES': resp.idpcargmovimiento_observaciones,
        /* Carga Física - Carga dinámica por sobreesfuerzos de la voz */
        '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: EFECTOS POSIBLES': resp.idpcargvoz_efectos,
        '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: CONTROL EXISTENTE(FUENTE)': resp.idpcargvoz_ctrlfuente,
        '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: CONTROL EXISTENTE(MEDIO)': resp.idpcargvoz_ctrlmedio,
        '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargvoz_ctrlindividuo,
        '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: ND': resp.idpcargvoz_tb_nd,
        '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: NE': resp.idpcargvoz_tb_ne,
        '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: NP': resp.idpcargvoz_tb_ne,
        '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: INTERPRETACIÓN': resp.idpcargvoz_interpreta,
        '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: NC': resp.idpcargvoz_tb_nc,
        '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: INTERVENCIÓN': resp.idpcargvoz_intervencion,
        '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: NR': resp.idpcargvoz_tb_nr,
        '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: N° EXPUESTOS': resp.idpcargvoz_numpuestos,
        '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: OBSERVACIONES': resp.idpcargvoz_observaciones,
        /* Carga Física - Carga estática de pie */
        '4CARGA FÍSICA - Carga estática de pie: EFECTOS POSIBLES': resp.idpcargpie_efectos,
        '4CARGA FÍSICA - Carga estática de pie: CONTROL EXISTENTE(FUENTE)': resp.idpcargpie_ctrlfuente,
        '4CARGA FÍSICA - Carga estática de pie: CONTROL EXISTENTE(MEDIO)': resp.idpcargpie_ctrlmedio,
        '4CARGA FÍSICA - Carga estática de pie: CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargpie_ctrlindividuo,
        '4CARGA FÍSICA - Carga estática de pie: ND': resp.idpcargpie_tb_nd,
        '4CARGA FÍSICA - Carga estática de pie: NE': resp.idpcargpie_tb_ne,
        '4CARGA FÍSICA - Carga estática de pie: NP': resp.idpcargpie_tb_ne,
        '4CARGA FÍSICA - Carga estática de pie: INTERPRETACIÓN': resp.idpcargpie_interpreta,
        '4CARGA FÍSICA - Carga estática de pie: NC': resp.idpcargpie_tb_nc,
        '4CARGA FÍSICA - Carga estática de pie: INTERVENCIÓN': resp.idpcargpie_intervencion,
        '4CARGA FÍSICA - Carga estática de pie: NR': resp.idpcargpie_tb_nr,
        '4CARGA FÍSICA - Carga estática de pie: N° EXPUESTOS': resp.idpcargpie_numpuestos,
        '4CARGA FÍSICA - Carga estática de pie: OBSERVACIONES': resp.idpcargpie_observaciones,
        /* Carga Física - Posiciones prolongadas sentado */
        '5CARGA FÍSICA - Posiciones prolongadas sentado: EFECTOS POSIBLES': resp.idpcargsentado_efectos,
        '5CARGA FÍSICA - Posiciones prolongadas sentado: CONTROL EXISTENTE(FUENTE)': resp.idpcargsentado_ctrlfuente,
        '5CARGA FÍSICA - Posiciones prolongadas sentado: CONTROL EXISTENTE(MEDIO)': resp.idpcargsentado_ctrlmedio,
        '5CARGA FÍSICA - Posiciones prolongadas sentado: CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargsentado_ctrlindividuo,
        '5CARGA FÍSICA - Posiciones prolongadas sentado: ND': resp.idpcargsentado_tb_nd,
        '5CARGA FÍSICA - Posiciones prolongadas sentado: NE': resp.idpcargsentado_tb_ne,
        '5CARGA FÍSICA - Posiciones prolongadas sentado: NP': resp.idpcargsentado_tb_ne,
        '5CARGA FÍSICA - Posiciones prolongadas sentado: INTERPRETACIÓN': resp.idpcargsentado_interpreta,
        '5CARGA FÍSICA - Posiciones prolongadas sentado: NC': resp.idpcargsentado_tb_nc,
        '5CARGA FÍSICA - Posiciones prolongadas sentado: INTERVENCIÓN': resp.idpcargsentado_intervencion,
        '5CARGA FÍSICA - Posiciones prolongadas sentado: NR': resp.idpcargsentado_tb_nr,
        '5CARGA FÍSICA - Posiciones prolongadas sentado: N° EXPUESTOS': resp.idpcargsentado_numpuestos,
        '5CARGA FÍSICA - Posiciones prolongadas sentado: OBSERVACIONES': resp.idpcargsentado_observaciones,
        /* ----------------------ELÉCTRICO------------------- */
        /* Eléctrico - Energía eléctrica de baja */
        '1ELÉCTRICO - Energía eléctrica de baja: EFECTOS POSIBLES': resp.idpelectricobaja_efectos,
        '1ELÉCTRICO - Energía eléctrica de baja: CONTROL EXISTENTE(FUENTE)': resp.idpelectricobaja_ctrlfuente,
        '1ELÉCTRICO - Energía eléctrica de baja: CONTROL EXISTENTE(MEDIO)': resp.idpelectricobaja_ctrlmedio,
        '1ELÉCTRICO - Energía eléctrica de baja: CONTROL EXISTENTE(INDIVIDUO)': resp.idpelectricobaja_ctrlindividuo,
        '1ELÉCTRICO - Energía eléctrica de baja: ND': resp.idpelectricobaja_tb_nd,
        '1ELÉCTRICO - Energía eléctrica de baja: NE': resp.idpelectricobaja_tb_ne,
        '1ELÉCTRICO - Energía eléctrica de baja: NP': resp.idpelectricobaja_tb_ne,
        '1ELÉCTRICO - Energía eléctrica de baja: INTERPRETACIÓN': resp.idpelectricobaja_interpreta,
        '1ELÉCTRICO - Energía eléctrica de baja: NC': resp.idpelectricobaja_tb_nc,
        '1ELÉCTRICO - Energía eléctrica de baja: INTERVENCIÓN': resp.idpelectricobaja_intervencion,
        '1ELÉCTRICO - Energía eléctrica de baja: NR': resp.idpelectricobaja_tb_nr,
        '1ELÉCTRICO - Energía eléctrica de baja: N° EXPUESTOS': resp.idpelectricobaja_numpuestos,
        '1ELÉCTRICO - Energía eléctrica de baja: OBSERVACIONES': resp.idpelectricobaja_observaciones,
        /* Eléctrico - Energía eléctrica de alta */
        '2ELÉCTRICO - Energía eléctrica de alta: EFECTOS POSIBLES': resp.idpelectricoalta_efectos,
        '2ELÉCTRICO - Energía eléctrica de alta: CONTROL EXISTENTE(FUENTE)': resp.idpelectricoalta_ctrlfuente,
        '2ELÉCTRICO - Energía eléctrica de alta: CONTROL EXISTENTE(MEDIO)': resp.idpelectricoalta_ctrlmedio,
        '2ELÉCTRICO - Energía eléctrica de alta: CONTROL EXISTENTE(INDIVIDUO)': resp.idpelectricoalta_ctrlindividuo,
        '2ELÉCTRICO - Energía eléctrica de alta: ND': resp.idpelectricoalta_tb_nd,
        '2ELÉCTRICO - Energía eléctrica de alta: NE': resp.idpelectricoalta_tb_ne,
        '2ELÉCTRICO - Energía eléctrica de alta: NP': resp.idpelectricoalta_tb_ne,
        '2ELÉCTRICO - Energía eléctrica de alta: INTERPRETACIÓN': resp.idpelectricoalta_interpreta,
        '2ELÉCTRICO - Energía eléctrica de alta: NC': resp.idpelectricoalta_tb_nc,
        '2ELÉCTRICO - Energía eléctrica de alta: INTERVENCIÓN': resp.idpelectricoalta_intervencion,
        '2ELÉCTRICO - Energía eléctrica de alta: NR': resp.idpelectricoalta_tb_nr,
        '2ELÉCTRICO - Energía eléctrica de alta: N° EXPUESTOS': resp.idpelectricoalta_numpuestos,
        '2ELÉCTRICO - Energía eléctrica de alta: OBSERVACIONES': resp.idpelectricoalta_observaciones,
        /* Eléctrico - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados */
        '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: EFECTOS POSIBLES': resp.idpelectricocables_efectos,
        '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: CONTROL EXISTENTE(FUENTE)': resp.idpelectricocables_ctrlfuente,
        '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: CONTROL EXISTENTE(MEDIO)': resp.idpelectricocables_ctrlmedio,
        '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: CONTROL EXISTENTE(INDIVIDUO)': resp.idpelectricocables_ctrlindividuo,
        '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: ND': resp.idpelectricocables_tb_nd,
        '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: NE': resp.idpelectricocables_tb_ne,
        '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: NP': resp.idpelectricocables_tb_ne,
        '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: INTERPRETACIÓN': resp.idpelectricocables_interpreta,
        '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: NC': resp.idpelectricocables_tb_nc,
        '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: INTERVENCIÓN': resp.idpelectricocables_intervencion,
        '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: NR': resp.idpelectricocables_tb_nr,
        '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: N° EXPUESTOS': resp.idpelectricocables_numpuestos,
        '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: OBSERVACIONES': resp.idpelectricocables_observaciones,
        /* ----------------------FÍSICO------------------- */
        /* Físico - Iluminación deficiente */
        '1FÍSICO - Iluminación deficiente: EFECTOS POSIBLES': resp.idpfisicoilumdef_efectos,
        '1FÍSICO - Iluminación deficiente: CONTROL EXISTENTE(FUENTE)': resp.idpfisicoilumdef_ctrlfuente,
        '1FÍSICO - Iluminación deficiente: CONTROL EXISTENTE(MEDIO)': resp.idpfisicoilumdef_ctrlmedio,
        '1FÍSICO - Iluminación deficiente: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicoilumdef_ctrlindividuo,
        '1FÍSICO - Iluminación deficiente: ND': resp.idpfisicoilumdef_tb_nd,
        '1FÍSICO - Iluminación deficiente: NE': resp.idpfisicoilumdef_tb_ne,
        '1FÍSICO - Iluminación deficiente: NP': resp.idpfisicoilumdef_tb_ne,
        '1FÍSICO - Iluminación deficiente: INTERPRETACIÓN': resp.idpfisicoilumdef_interpreta,
        '1FÍSICO - Iluminación deficiente: NC': resp.idpfisicoilumdef_tb_nc,
        '1FÍSICO - Iluminación deficiente: INTERVENCIÓN': resp.idpfisicoilumdef_intervencion,
        '1FÍSICO - Iluminación deficiente: NR': resp.idpfisicoilumdef_tb_nr,
        '1FÍSICO - Iluminación deficiente: N° EXPUESTOS': resp.idpfisicoilumdef_numpuestos,
        '1FÍSICO - Iluminación deficiente: OBSERVACIONES': resp.idpfisicoilumdef_observaciones,
        /* Físico - Iluminación en exceso */
        '2FÍSICO - Iluminación en exceso: EFECTOS POSIBLES': resp.idpfisicoilumexceso_efectos,
        '2FÍSICO - Iluminación en exceso: CONTROL EXISTENTE(FUENTE)': resp.idpfisicoilumexceso_ctrlfuente,
        '2FÍSICO - Iluminación en exceso: CONTROL EXISTENTE(MEDIO)': resp.idpfisicoilumexceso_ctrlmedio,
        '2FÍSICO - Iluminación en exceso: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicoilumexceso_ctrlindividuo,
        '2FÍSICO - Iluminación en exceso: ND': resp.idpfisicoilumexceso_tb_nd,
        '2FÍSICO - Iluminación en exceso: NE': resp.idpfisicoilumexceso_tb_ne,
        '2FÍSICO - Iluminación en exceso: NP': resp.idpfisicoilumexceso_tb_ne,
        '2FÍSICO - Iluminación en exceso: INTERPRETACIÓN': resp.idpfisicoilumexceso_interpreta,
        '2FÍSICO - Iluminación en exceso: NC': resp.idpfisicoilumexceso_tb_nc,
        '2FÍSICO - Iluminación en exceso: INTERVENCIÓN': resp.idpfisicoilumexceso_intervencion,
        '2FÍSICO - Iluminación en exceso: NR': resp.idpfisicoilumexceso_tb_nr,
        '2FÍSICO - Iluminación en exceso: N° EXPUESTOS': resp.idpfisicoilumexceso_numpuestos,
        '2FÍSICO - Iluminación en exceso: OBSERVACIONES': resp.idpfisicoilumexceso_observaciones,
        /* Físico - Radiaciones no ionizantes por ultravioleta */
        '3FÍSICO - Radiaciones no ionizantes por ultravioleta: EFECTOS POSIBLES': resp.idpfisiconoradiaciones_efectos,
        '3FÍSICO - Radiaciones no ionizantes por ultravioleta: CONTROL EXISTENTE(FUENTE)': resp.idpfisiconoradiaciones_ctrlfuente,
        '3FÍSICO - Radiaciones no ionizantes por ultravioleta: CONTROL EXISTENTE(MEDIO)': resp.idpfisiconoradiaciones_ctrlmedio,
        '3FÍSICO - Radiaciones no ionizantes por ultravioleta: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisiconoradiaciones_ctrlindividuo,
        '3FÍSICO - Radiaciones no ionizantes por ultravioleta: ND': resp.idpfisiconoradiaciones_tb_nd,
        '3FÍSICO - Radiaciones no ionizantes por ultravioleta: NE': resp.idpfisiconoradiaciones_tb_ne,
        '3FÍSICO - Radiaciones no ionizantes por ultravioleta: NP': resp.idpfisiconoradiaciones_tb_ne,
        '3FÍSICO - Radiaciones no ionizantes por ultravioleta: INTERPRETACIÓN': resp.idpfisiconoradiaciones_interpreta,
        '3FÍSICO - Radiaciones no ionizantes por ultravioleta: NC': resp.idpfisiconoradiaciones_tb_nc,
        '3FÍSICO - Radiaciones no ionizantes por ultravioleta: INTERVENCIÓN': resp.idpfisiconoradiaciones_intervencion,
        '3FÍSICO - Radiaciones no ionizantes por ultravioleta: NR': resp.idpfisiconoradiaciones_tb_nr,
        '3FÍSICO - Radiaciones no ionizantes por ultravioleta: N° EXPUESTOS': resp.idpfisiconoradiaciones_numpuestos,
        '3FÍSICO - Radiaciones no ionizantes por ultravioleta: OBSERVACIONES': resp.idpfisiconoradiaciones_observaciones,
        /* Físico - Radiaciones ionizantes */
        '4FÍSICO - Radiaciones ionizantes: EFECTOS POSIBLES': resp.idpfisicoradiaciones_efectos,
        '4FÍSICO - Radiaciones ionizantes: CONTROL EXISTENTE(FUENTE)': resp.idpfisicoradiaciones_ctrlfuente,
        '4FÍSICO - Radiaciones ionizantes: CONTROL EXISTENTE(MEDIO)': resp.idpfisicoradiaciones_ctrlmedio,
        '4FÍSICO - Radiaciones ionizantes: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicoradiaciones_ctrlindividuo,
        '4FÍSICO - Radiaciones ionizantes: ND': resp.idpfisicoradiaciones_tb_nd,
        '4FÍSICO - Radiaciones ionizantes: NE': resp.idpfisicoradiaciones_tb_ne,
        '4FÍSICO - Radiaciones ionizantes: NP': resp.idpfisicoradiaciones_tb_ne,
        '4FÍSICO - Radiaciones ionizantes: INTERPRETACIÓN': resp.idpfisicoradiaciones_interpreta,
        '4FÍSICO - Radiaciones ionizantes: NC': resp.idpfisicoradiaciones_tb_nc,
        '4FÍSICO - Radiaciones ionizantes: INTERVENCIÓN': resp.idpfisicoradiaciones_intervencion,
        '4FÍSICO - Radiaciones ionizantes: NR': resp.idpfisicoradiaciones_tb_nr,
        '4FÍSICO - Radiaciones ionizantes: N° EXPUESTOS': resp.idpfisicoradiaciones_numpuestos,
        '4FÍSICO - Radiaciones ionizantes: OBSERVACIONES': resp.idpfisicoradiaciones_observaciones,
        /* Físico - Ruido */
        '5FÍSICO - Ruido: EFECTOS POSIBLES': resp.idpfisicoruido_efectos,
        '5FÍSICO - Ruido: CONTROL EXISTENTE(FUENTE)': resp.idpfisicoruido_ctrlfuente,
        '5FÍSICO - Ruido: CONTROL EXISTENTE(MEDIO)': resp.idpfisicoruido_ctrlmedio,
        '5FÍSICO - Ruido: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicoruido_ctrlindividuo,
        '5FÍSICO - Ruido: ND': resp.idpfisicoruido_tb_nd,
        '5FÍSICO - Ruido: NE': resp.idpfisicoruido_tb_ne,
        '5FÍSICO - Ruido: NP': resp.idpfisicoruido_tb_ne,
        '5FÍSICO - Ruido: INTERPRETACIÓN': resp.idpfisicoruido_interpreta,
        '5FÍSICO - Ruido: NC': resp.idpfisicoruido_tb_nc,
        '5FÍSICO - Ruido: INTERVENCIÓN': resp.idpfisicoruido_intervencion,
        '5FÍSICO - Ruido: NR': resp.idpfisicoruido_tb_nr,
        '5FÍSICO - Ruido: N° EXPUESTOS': resp.idpfisicoruido_numpuestos,
        '5FÍSICO - Ruido: OBSERVACIONES': resp.idpfisicoruido_observaciones,
        /* Físico - Vibraciones */
        '6FÍSICO - Vibraciones: EFECTOS POSIBLES': resp.idpfisicovibraciones_efectos,
        '6FÍSICO - Vibraciones: CONTROL EXISTENTE(FUENTE)': resp.idpfisicovibraciones_ctrlfuente,
        '6FÍSICO - Vibraciones: CONTROL EXISTENTE(MEDIO)': resp.idpfisicovibraciones_ctrlmedio,
        '6FÍSICO - Vibraciones: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicovibraciones_ctrlindividuo,
        '6FÍSICO - Vibraciones: ND': resp.idpfisicovibraciones_tb_nd,
        '6FÍSICO - Vibraciones: NE': resp.idpfisicovibraciones_tb_ne,
        '6FÍSICO - Vibraciones: NP': resp.idpfisicovibraciones_tb_ne,
        '6FÍSICO - Vibraciones: INTERPRETACIÓN': resp.idpfisicovibraciones_interpreta,
        '6FÍSICO - Vibraciones: NC': resp.idpfisicovibraciones_tb_nc,
        '6FÍSICO - Vibraciones: INTERVENCIÓN': resp.idpfisicovibraciones_intervencion,
        '6FÍSICO - Vibraciones: NR': resp.idpfisicovibraciones_tb_nr,
        '6FÍSICO - Vibraciones: N° EXPUESTOS': resp.idpfisicovibraciones_numpuestos,
        '6FÍSICO - Vibraciones: OBSERVACIONES': resp.idpfisicovibraciones_observaciones,
        /* Físico - Transferencias de temperaturas por calor */
        '7FÍSICO - Transferencias de temperaturas por calor: EFECTOS POSIBLES': resp.idpfisicocalor_efectos,
        '7FÍSICO - Transferencias de temperaturas por calor: CONTROL EXISTENTE(FUENTE)': resp.idpfisicocalor_ctrlfuente,
        '7FÍSICO - Transferencias de temperaturas por calor: CONTROL EXISTENTE(MEDIO)': resp.idpfisicocalor_ctrlmedio,
        '7FÍSICO - Transferencias de temperaturas por calor: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicocalor_ctrlindividuo,
        '7FÍSICO - Transferencias de temperaturas por calor: ND': resp.idpfisicocalor_tb_nd,
        '7FÍSICO - Transferencias de temperaturas por calor: NE': resp.idpfisicocalor_tb_ne,
        '7FÍSICO - Transferencias de temperaturas por calor: NP': resp.idpfisicocalor_tb_ne,
        '7FÍSICO - Transferencias de temperaturas por calor: INTERPRETACIÓN': resp.idpfisicocalor_interpreta,
        '7FÍSICO - Transferencias de temperaturas por calor: NC': resp.idpfisicocalor_tb_nc,
        '7FÍSICO - Transferencias de temperaturas por calor: INTERVENCIÓN': resp.idpfisicocalor_intervencion,
        '7FÍSICO - Transferencias de temperaturas por calor: NR': resp.idpfisicocalor_tb_nr,
        '7FÍSICO - Transferencias de temperaturas por calor: N° EXPUESTOS': resp.idpfisicocalor_numpuestos,
        '7FÍSICO - Transferencias de temperaturas por calor: OBSERVACIONES': resp.idpfisicocalor_observaciones,
        /* Físico - Transferencias de temperaturas por frio */
        '8FÍSICO - Transferencias de temperaturas por frio: EFECTOS POSIBLES': resp.idpfisicofrio_efectos,
        '8FÍSICO - Transferencias de temperaturas por frio: CONTROL EXISTENTE(FUENTE)': resp.idpfisicofrio_ctrlfuente,
        '8FÍSICO - Transferencias de temperaturas por frio: CONTROL EXISTENTE(MEDIO)': resp.idpfisicofrio_ctrlmedio,
        '8FÍSICO - Transferencias de temperaturas por frio: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicofrio_ctrlindividuo,
        '8FÍSICO - Transferencias de temperaturas por frio: ND': resp.idpfisicofrio_tb_nd,
        '8FÍSICO - Transferencias de temperaturas por frio: NE': resp.idpfisicofrio_tb_ne,
        '8FÍSICO - Transferencias de temperaturas por frio: NP': resp.idpfisicofrio_tb_ne,
        '8FÍSICO - Transferencias de temperaturas por frio: INTERPRETACIÓN': resp.idpfisicofrio_interpreta,
        '8FÍSICO - Transferencias de temperaturas por frio: NC': resp.idpfisicofrio_tb_nc,
        '8FÍSICO - Transferencias de temperaturas por frio: INTERVENCIÓN': resp.idpfisicofrio_intervencion,
        '8FÍSICO - Transferencias de temperaturas por frio: NR': resp.idpfisicofrio_tb_nr,
        '8FÍSICO - Transferencias de temperaturas por frio: N° EXPUESTOS': resp.idpfisicofrio_numpuestos,
        '8FÍSICO - Transferencias de temperaturas por frio: OBSERVACIONES': resp.idpfisicofrio_observaciones,
        /* ----------------------INCENDIOS / EXPLOSIONES------------------- */
        /* Incendios / Explosiones - Materiales combustibles */
        '1INCENDIOS / EXPLOSIONES - Materiales combustibles: EFECTOS POSIBLES': resp.idpincendioscombust_efectos,
        '1INCENDIOS / EXPLOSIONES - Materiales combustibles: CONTROL EXISTENTE(FUENTE)': resp.idpincendioscombust_ctrlfuente,
        '1INCENDIOS / EXPLOSIONES - Materiales combustibles: CONTROL EXISTENTE(MEDIO)': resp.idpincendioscombust_ctrlmedio,
        '1INCENDIOS / EXPLOSIONES - Materiales combustibles: CONTROL EXISTENTE(INDIVIDUO)': resp.idpincendioscombust_ctrlindividuo,
        '1INCENDIOS / EXPLOSIONES - Materiales combustibles: ND': resp.idpincendioscombust_tb_nd,
        '1INCENDIOS / EXPLOSIONES - Materiales combustibles: NE': resp.idpincendioscombust_tb_ne,
        '1INCENDIOS / EXPLOSIONES - Materiales combustibles: NP': resp.idpincendioscombust_tb_ne,
        '1INCENDIOS / EXPLOSIONES - Materiales combustibles: INTERPRETACIÓN': resp.idpincendioscombust_interpreta,
        '1INCENDIOS / EXPLOSIONES - Materiales combustibles: NC': resp.idpincendioscombust_tb_nc,
        '1INCENDIOS / EXPLOSIONES - Materiales combustibles: INTERVENCIÓN': resp.idpincendioscombust_intervencion,
        '1INCENDIOS / EXPLOSIONES - Materiales combustibles: NR': resp.idpincendioscombust_tb_nr,
        '1INCENDIOS / EXPLOSIONES - Materiales combustibles: N° EXPUESTOS': resp.idpincendioscombust_numpuestos,
        '1INCENDIOS / EXPLOSIONES - Materiales combustibles: OBSERVACIONES': resp.idpincendioscombust_observaciones,
        /* Incendios / Explosiones - Ausencia de equipo contra incendio */
        '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: EFECTOS POSIBLES': resp.idpincendiosequipo_efectos,
        '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: CONTROL EXISTENTE(FUENTE)': resp.idpincendiosequipo_ctrlfuente,
        '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: CONTROL EXISTENTE(MEDIO)': resp.idpincendiosequipo_ctrlmedio,
        '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: CONTROL EXISTENTE(INDIVIDUO)': resp.idpincendiosequipo_ctrlindividuo,
        '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: ND': resp.idpincendiosequipo_tb_nd,
        '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: NE': resp.idpincendiosequipo_tb_ne,
        '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: NP': resp.idpincendiosequipo_tb_ne,
        '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: INTERPRETACIÓN': resp.idpincendiosequipo_interpreta,
        '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: NC': resp.idpincendiosequipo_tb_nc,
        '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: INTERVENCIÓN': resp.idpincendiosequipo_intervencion,
        '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: NR': resp.idpincendiosequipo_tb_nr,
        '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: N° EXPUESTOS': resp.idpincendiosequipo_numpuestos,
        '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: OBSERVACIONES': resp.idpincendiosequipo_observaciones,
        /* Incendios / Explosiones - Sustancias inflamables */
        '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: EFECTOS POSIBLES': resp.idpincendiossustancias_efectos,
        '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: CONTROL EXISTENTE(FUENTE)': resp.idpincendiossustancias_ctrlfuente,
        '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: CONTROL EXISTENTE(MEDIO)': resp.idpincendiossustancias_ctrlmedio,
        '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: CONTROL EXISTENTE(INDIVIDUO)': resp.idpincendiossustancias_ctrlindividuo,
        '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: ND': resp.idpincendiossustancias_tb_nd,
        '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: NE': resp.idpincendiossustancias_tb_ne,
        '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: NP': resp.idpincendiossustancias_tb_ne,
        '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: INTERPRETACIÓN': resp.idpincendiossustancias_interpreta,
        '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: NC': resp.idpincendiossustancias_tb_nc,
        '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: INTERVENCIÓN': resp.idpincendiossustancias_intervencion,
        '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: NR': resp.idpincendiossustancias_tb_nr,
        '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: N° EXPUESTOS': resp.idpincendiossustancias_numpuestos,
        '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: OBSERVACIONES': resp.idpincendiossustancias_observaciones,
        /* ----------------------LOCATIVOS------------------- */
        /* Locativos - Pisos defectuosos */
        '1LOCATIVOS - Pisos defectuosos: EFECTOS POSIBLES': resp.idplocativospisos_efectos,
        '1LOCATIVOS - Pisos defectuosos: CONTROL EXISTENTE(FUENTE)': resp.idplocativospisos_ctrlfuente,
        '1LOCATIVOS - Pisos defectuosos: CONTROL EXISTENTE(MEDIO)': resp.idplocativospisos_ctrlmedio,
        '1LOCATIVOS - Pisos defectuosos: CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativospisos_ctrlindividuo,
        '1LOCATIVOS - Pisos defectuosos: ND': resp.idplocativospisos_tb_nd,
        '1LOCATIVOS - Pisos defectuosos: NE': resp.idplocativospisos_tb_ne,
        '1LOCATIVOS - Pisos defectuosos: NP': resp.idplocativospisos_tb_ne,
        '1LOCATIVOS - Pisos defectuosos: INTERPRETACIÓN': resp.idplocativospisos_interpreta,
        '1LOCATIVOS - Pisos defectuosos: NC': resp.idplocativospisos_tb_nc,
        '1LOCATIVOS - Pisos defectuosos: INTERVENCIÓN': resp.idplocativospisos_intervencion,
        '1LOCATIVOS - Pisos defectuosos: NR': resp.idplocativospisos_tb_nr,
        '1LOCATIVOS - Pisos defectuosos: N° EXPUESTOS': resp.idplocativospisos_numpuestos,
        '1LOCATIVOS - Pisos defectuosos: OBSERVACIONES': resp.idplocativospisos_observaciones,
        /* Locativos - Escaleras defectuosas */
        '2LOCATIVOS - Escaleras defectuosas: EFECTOS POSIBLES': resp.idplocativosescaleras_efectos,
        '2LOCATIVOS - Escaleras defectuosas: CONTROL EXISTENTE(FUENTE)': resp.idplocativosescaleras_ctrlfuente,
        '2LOCATIVOS - Escaleras defectuosas: CONTROL EXISTENTE(MEDIO)': resp.idplocativosescaleras_ctrlmedio,
        '2LOCATIVOS - Escaleras defectuosas: CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosescaleras_ctrlindividuo,
        '2LOCATIVOS - Escaleras defectuosas: ND': resp.idplocativosescaleras_tb_nd,
        '2LOCATIVOS - Escaleras defectuosas: NE': resp.idplocativosescaleras_tb_ne,
        '2LOCATIVOS - Escaleras defectuosas: NP': resp.idplocativosescaleras_tb_ne,
        '2LOCATIVOS - Escaleras defectuosas: INTERPRETACIÓN': resp.idplocativosescaleras_interpreta,
        '2LOCATIVOS - Escaleras defectuosas: NC': resp.idplocativosescaleras_tb_nc,
        '2LOCATIVOS - Escaleras defectuosas: INTERVENCIÓN': resp.idplocativosescaleras_intervencion,
        '2LOCATIVOS - Escaleras defectuosas: NR': resp.idplocativosescaleras_tb_nr,
        '2LOCATIVOS - Escaleras defectuosas: N° EXPUESTOS': resp.idplocativosescaleras_numpuestos,
        '2LOCATIVOS - Escaleras defectuosas: OBSERVACIONES': resp.idplocativosescaleras_observaciones,
        /* Locativos - Almacenamiento, estanterías en mal estado */
        '3LOCATIVOS - Almacenamiento, estanterías en mal estado: EFECTOS POSIBLES': resp.idplocativosestanterias_efectos,
        '3LOCATIVOS - Almacenamiento, estanterías en mal estado: CONTROL EXISTENTE(FUENTE)': resp.idplocativosestanterias_ctrlfuente,
        '3LOCATIVOS - Almacenamiento, estanterías en mal estado: CONTROL EXISTENTE(MEDIO)': resp.idplocativosestanterias_ctrlmedio,
        '3LOCATIVOS - Almacenamiento, estanterías en mal estado: CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosestanterias_ctrlindividuo,
        '3LOCATIVOS - Almacenamiento, estanterías en mal estado: ND': resp.idplocativosestanterias_tb_nd,
        '3LOCATIVOS - Almacenamiento, estanterías en mal estado: NE': resp.idplocativosestanterias_tb_ne,
        '3LOCATIVOS - Almacenamiento, estanterías en mal estado: NP': resp.idplocativosestanterias_tb_ne,
        '3LOCATIVOS - Almacenamiento, estanterías en mal estado: INTERPRETACIÓN': resp.idplocativosestanterias_interpreta,
        '3LOCATIVOS - Almacenamiento, estanterías en mal estado: NC': resp.idplocativosestanterias_tb_nc,
        '3LOCATIVOS - Almacenamiento, estanterías en mal estado: INTERVENCIÓN': resp.idplocativosestanterias_intervencion,
        '3LOCATIVOS - Almacenamiento, estanterías en mal estado: NR': resp.idplocativosestanterias_tb_nr,
        '3LOCATIVOS - Almacenamiento, estanterías en mal estado: N° EXPUESTOS': resp.idplocativosestanterias_numpuestos,
        '3LOCATIVOS - Almacenamiento, estanterías en mal estado: OBSERVACIONES': resp.idplocativosestanterias_observaciones,
        /* Locativos - Almacenamiento, arrumes con altura inadecuada */
        '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: EFECTOS POSIBLES': resp.idplocativosarrumes_efectos,
        '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: CONTROL EXISTENTE(FUENTE)': resp.idplocativosarrumes_ctrlfuente,
        '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: CONTROL EXISTENTE(MEDIO)': resp.idplocativosarrumes_ctrlmedio,
        '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosarrumes_ctrlindividuo,
        '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: ND': resp.idplocativosarrumes_tb_nd,
        '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: NE': resp.idplocativosarrumes_tb_ne,
        '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: NP': resp.idplocativosarrumes_tb_ne,
        '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: INTERPRETACIÓN': resp.idplocativosarrumes_interpreta,
        '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: NC': resp.idplocativosarrumes_tb_nc,
        '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: INTERVENCIÓN': resp.idplocativosarrumes_intervencion,
        '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: NR': resp.idplocativosarrumes_tb_nr,
        '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: N° EXPUESTOS': resp.idplocativosarrumes_numpuestos,
        '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: OBSERVACIONES': resp.idplocativosarrumes_observaciones,
        /* Locativos - Señalización y demarcación deficiente, inexistente o inadecuada */
        '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: EFECTOS POSIBLES': resp.idplocativosenalizacion_efectos,
        '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: CONTROL EXISTENTE(FUENTE)': resp.idplocativosenalizacion_ctrlfuente,
        '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: CONTROL EXISTENTE(MEDIO)': resp.idplocativosenalizacion_ctrlmedio,
        '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosenalizacion_ctrlindividuo,
        '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: ND': resp.idplocativosenalizacion_tb_nd,
        '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: NE': resp.idplocativosenalizacion_tb_ne,
        '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: NP': resp.idplocativosenalizacion_tb_ne,
        '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: INTERPRETACIÓN': resp.idplocativosenalizacion_interpreta,
        '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: NC': resp.idplocativosenalizacion_tb_nc,
        '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: INTERVENCIÓN': resp.idplocativosenalizacion_intervencion,
        '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: NR': resp.idplocativosenalizacion_tb_nr,
        '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: N° EXPUESTOS': resp.idplocativosenalizacion_numpuestos,
        '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: OBSERVACIONES': resp.idplocativosenalizacion_observaciones,
        /* Locativos - Falta de orden y aseo */
        '6LOCATIVOS - Falta de orden y aseo: EFECTOS POSIBLES': resp.idplocativosaseo_efectos,
        '6LOCATIVOS - Falta de orden y aseo: CONTROL EXISTENTE(FUENTE)': resp.idplocativosaseo_ctrlfuente,
        '6LOCATIVOS - Falta de orden y aseo: CONTROL EXISTENTE(MEDIO)': resp.idplocativosaseo_ctrlmedio,
        '6LOCATIVOS - Falta de orden y aseo: CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosaseo_ctrlindividuo,
        '6LOCATIVOS - Falta de orden y aseo: ND': resp.idplocativosaseo_tb_nd,
        '6LOCATIVOS - Falta de orden y aseo: NE': resp.idplocativosaseo_tb_ne,
        '6LOCATIVOS - Falta de orden y aseo: NP': resp.idplocativosaseo_tb_ne,
        '6LOCATIVOS - Falta de orden y aseo: INTERPRETACIÓN': resp.idplocativosaseo_interpreta,
        '6LOCATIVOS - Falta de orden y aseo: NC': resp.idplocativosaseo_tb_nc,
        '6LOCATIVOS - Falta de orden y aseo: INTERVENCIÓN': resp.idplocativosaseo_intervencion,
        '6LOCATIVOS - Falta de orden y aseo: NR': resp.idplocativosaseo_tb_nr,
        '6LOCATIVOS - Falta de orden y aseo: N° EXPUESTOS': resp.idplocativosaseo_numpuestos,
        '6LOCATIVOS - Falta de orden y aseo: OBSERVACIONES': resp.idplocativosaseo_observaciones,
        'OBSERVACIONES':resp.idpampliarobservac

      }; 
    });  

    return arrFinal;
  }
}
