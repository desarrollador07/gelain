import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { AppState } from 'src/app/app.reducer';
import { Area } from 'src/app/models/area.model';
import { ValorRiesgoModel } from 'src/app/models/valor-riesgo.model';
import { AreasService } from 'src/app/services/areas.service';
import { ValoracionRiesgosService } from '../../services/valoracion-riesgos.service';
import { Workbook } from 'exceljs';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-valor-riesgo',
  templateUrl: './valor-riesgo.component.html',
  styleUrls: ['./valor-riesgo.component.css']
})
export class ValorRiesgoComponent implements OnInit {

  vrData: ValorRiesgoModel[] = [];/*Arreglo VR */
  idEmpresa:any;
  loading:boolean = true;
  msgs: Message[] = [];
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
  workbook = new Workbook();
  worksheet = this.workbook.addWorksheet('Data');

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
        this.limpiarData();
        await this.buscarArea(this.id);
        await this.indexData(this.id);
      }
      if(sessionStorage.getItem('idEmpresa') === null){
        this.loading = false;
        this.showInfo();
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
        this.saveAsExcelFile(excelBuffer, `VR_${this.datepipe.transform(this.fechafinal, "yyyy-MM-dd")}`);
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
    arrFinal = this.vrData.map( resp => { 
      // return {
      //   'EMPRESA': sessionStorage.getItem('nombreEmpresa'),
      //   'ÁREA': resp.idpareanombre,
      //   'NOMBRE LIDER': resp.idpnombre,
      //   'CÉDULA': resp.idpcedula,
      //   'TELEFONO':resp.idptelefono,
      //   'SEDE': resp.idpsede,
      //   'PROCESO' : '',
      //   'ZONA/LUGAR':'',
      //   'ACTIVIDADES':'',
      //   'TAREAS':'',
      //   'RUTINARIO (SI/NO)': '',
      //   /* ----------------------BIOLOGICO------------------- */
      //   /*Biologico - Derivados de origen animal */
      //   '1BIOLOGICO - Derivados de origen animal: EFECTOS POSIBLES': resp.idpbioderani_efectos,
      //   '1BIOLOGICO - Derivados de origen animal: CONTROL EXISTENTE(FUENTE)': resp.idpbioderani_ctrlfuente,
      //   '1BIOLOGICO - Derivados de origen animal: CONTROL EXISTENTE(MEDIO)': resp.idpbioderani_ctrlmedio,
      //   '1BIOLOGICO - Derivados de origen animal: CONTROL EXISTENTE(INDIVIDUO)': resp.idpbioderani_ctrlindividuo,
      //   '1BIOLOGICO - Derivados de origen animal: ND': resp.idpbioderani_tb_nd,
      //   '1BIOLOGICO - Derivados de origen animal: NE': resp.idpbioderani_tb_ne,
      //   '1BIOLOGICO - Derivados de origen animal: NP': resp.idpbioderani_tb_ne,
      //   '1BIOLOGICO - Derivados de origen animal: INTERPRETACIÓN': resp.idpbioderani_interpreta,
      //   '1BIOLOGICO - Derivados de origen animal: NC': resp.idpbioderani_tb_nc,
      //   '1BIOLOGICO - Derivados de origen animal: INTERVENCIÓN': resp.idpbioderani_intervencion,
      //   '1BIOLOGICO - Derivados de origen animal: NR': resp.idpbioderani_tb_nr,
      //   '1BIOLOGICO - Derivados de origen animal: N° EXPUESTOS': resp.idpbioderani_numpuestos,
      //   '1BIOLOGICO - Derivados de origen animal: OBSERVACIONES': resp.idpbioderani_observaciones,
      //   /*Biologico - Microorganismos tipo hongo */
      //   '2BIOLOGICO - Microorganismos tipo hongo: EFECTOS POSIBLES': resp.idpbiohongo_efectos,
      //   '2BIOLOGICO - Microorganismos tipo hongo: CONTROL EXISTENTE(FUENTE)': resp.idpbiohongo_ctrlfuente,
      //   '2BIOLOGICO - Microorganismos tipo hongo: CONTROL EXISTENTE(MEDIO)': resp.idpbiohongo_ctrlmedio,
      //   '2BIOLOGICO - Microorganismos tipo hongo: CONTROL EXISTENTE(INDIVIDUO)': resp.idpbiohongo_ctrlindividuo,
      //   '2BIOLOGICO - Microorganismos tipo hongo: ND': resp.idpbiohongo_tb_nd,
      //   '2BIOLOGICO - Microorganismos tipo hongo: NE': resp.idpbiohongo_tb_ne,
      //   '2BIOLOGICO - Microorganismos tipo hongo: NP': resp.idpbiohongo_tb_ne,
      //   '2BIOLOGICO - Microorganismos tipo hongo: INTERPRETACIÓN': resp.idpbiohongo_interpreta,
      //   '2BIOLOGICO - Microorganismos tipo hongo: NC': resp.idpbiohongo_tb_nc,
      //   '2BIOLOGICO - Microorganismos tipo hongo: INTERVENCIÓN': resp.idpbiohongo_intervencion,
      //   '2BIOLOGICO - Microorganismos tipo hongo: NR': resp.idpbiohongo_tb_nr,
      //   '2BIOLOGICO - Microorganismos tipo hongo: N° EXPUESTOS': resp.idpbiohongo_numpuestos,
      //   '2BIOLOGICO - Microorganismos tipo hongo: OBSERVACIONES': resp.idpbiohongo_observaciones,
      //   /*Biologico - Microorganismos tipo bacterias */
      //   '3BIOLOGICO - Microorganismos tipo bacterias: EFECTOS POSIBLES': resp.idpbiobacterias_efectos,
      //   '3BIOLOGICO - Microorganismos tipo bacterias: CONTROL EXISTENTE(FUENTE)': resp.idpbiobacterias_ctrlfuente,
      //   '3BIOLOGICO - Microorganismos tipo bacterias: CONTROL EXISTENTE(MEDIO)': resp.idpbiobacterias_ctrlmedio,
      //   '3BIOLOGICO - Microorganismos tipo bacterias: CONTROL EXISTENTE(INDIVIDUO)': resp.idpbiobacterias_ctrlindividuo,
      //   '3BIOLOGICO - Microorganismos tipo bacterias: ND': resp.idpbiobacterias_tb_nd,
      //   '3BIOLOGICO - Microorganismos tipo bacterias: NE': resp.idpbiobacterias_tb_ne,
      //   '3BIOLOGICO - Microorganismos tipo bacterias: NP': resp.idpbiobacterias_tb_ne,
      //   '3BIOLOGICO - Microorganismos tipo bacterias: INTERPRETACIÓN': resp.idpbiobacterias_interpreta,
      //   '3BIOLOGICO - Microorganismos tipo bacterias: NC': resp.idpbiobacterias_tb_nc,
      //   '3BIOLOGICO - Microorganismos tipo bacterias: INTERVENCIÓN': resp.idpbiobacterias_intervencion,
      //   '3BIOLOGICO - Microorganismos tipo bacterias: NR': resp.idpbiobacterias_tb_nr,
      //   '3BIOLOGICO - Microorganismos tipo bacterias: N° EXPUESTOS': resp.idpbiobacterias_numpuestos,
      //   '3BIOLOGICO - Microorganismos tipo bacterias: OBSERVACIONES': resp.idpbiobacterias_observaciones,
      //   /*Biologico - Microorganismos tipo virus */
      //   '4BIOLOGICO - Microorganismos tipo virus: EFECTOS POSIBLES': resp.idpbiovirus_efectos,
      //   '4BIOLOGICO - Microorganismos tipo virus: CONTROL EXISTENTE(FUENTE)': resp.idpbiovirus_ctrlfuente,
      //   '4BIOLOGICO - Microorganismos tipo virus: CONTROL EXISTENTE(MEDIO)': resp.idpbiovirus_ctrlmedio,
      //   '4BIOLOGICO - Microorganismos tipo virus: CONTROL EXISTENTE(INDIVIDUO)': resp.idpbiovirus_ctrlindividuo,
      //   '4BIOLOGICO - Microorganismos tipo virus: ND': resp.idpbiovirus_tb_nd,
      //   '4BIOLOGICO - Microorganismos tipo virus: NE': resp.idpbiovirus_tb_ne,
      //   '4BIOLOGICO - Microorganismos tipo virus: NP': resp.idpbiovirus_tb_ne,
      //   '4BIOLOGICO - Microorganismos tipo virus: INTERPRETACIÓN': resp.idpbiovirus_interpreta,
      //   '4BIOLOGICO - Microorganismos tipo virus: NC': resp.idpbiovirus_tb_nc,
      //   '4BIOLOGICO - Microorganismos tipo virus: INTERVENCIÓN': resp.idpbiovirus_intervencion,
      //   '4BIOLOGICO - Microorganismos tipo virus: NR': resp.idpbiovirus_tb_nr,
      //   '4BIOLOGICO - Microorganismos tipo virus: N° EXPUESTOS': resp.idpbiovirus_numpuestos,
      //   '4BIOLOGICO - Microorganismos tipo virus: OBSERVACIONES': resp.idpbiovirus_observaciones,
      //   /*Biologico - Parásitos */
      //   '5BIOLOGICO - Parásitos: EFECTOS POSIBLES': resp.idpbioparasitos_efectos,
      //   '5BIOLOGICO - Parásitos: CONTROL EXISTENTE(FUENTE)': resp.idpbioparasitos_ctrlfuente,
      //   '5BIOLOGICO - Parásitos: CONTROL EXISTENTE(MEDIO)': resp.idpbioparasitos_ctrlmedio,
      //   '5BIOLOGICO - Parásitos: CONTROL EXISTENTE(INDIVIDUO)': resp.idpbioparasitos_ctrlindividuo,
      //   '5BIOLOGICO - Parásitos: ND': resp.idpbioparasitos_tb_nd,
      //   '5BIOLOGICO - Parásitos: NE': resp.idpbioparasitos_tb_ne,
      //   '5BIOLOGICO - Parásitos: NP': resp.idpbioparasitos_tb_ne,
      //   '5BIOLOGICO - Parásitos: INTERPRETACIÓN': resp.idpbioparasitos_interpreta,
      //   '5BIOLOGICO - Parásitos: NC': resp.idpbioparasitos_tb_nc,
      //   '5BIOLOGICO - Parásitos: INTERVENCIÓN': resp.idpbioparasitos_intervencion,
      //   '5BIOLOGICO - Parásitos: NR': resp.idpbioparasitos_tb_nr,
      //   '5BIOLOGICO - Parásitos: N° EXPUESTOS': resp.idpbioparasitos_numpuestos,
      //   '5BIOLOGICO - Parásitos: OBSERVACIONES': resp.idpbioparasitos_observaciones,
      //   /* ----------------------CARGA FÍSICA------------------- */
      //   /* Carga Física - Carga dinámica por esfuerzos */
      //   '1CARGA FÍSICA - Carga dinámica por esfuerzos: EFECTOS POSIBLES': resp.idpcargesfuerzos_efectos,
      //   '1CARGA FÍSICA - Carga dinámica por esfuerzos: CONTROL EXISTENTE(FUENTE)': resp.idpcargesfuerzos_ctrlfuente,
      //   '1CARGA FÍSICA - Carga dinámica por esfuerzos: CONTROL EXISTENTE(MEDIO)': resp.idpcargesfuerzos_ctrlmedio,
      //   '1CARGA FÍSICA - Carga dinámica por esfuerzos: CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargesfuerzos_ctrlindividuo,
      //   '1CARGA FÍSICA - Carga dinámica por esfuerzos: ND': resp.idpcargesfuerzos_tb_nd,
      //   '1CARGA FÍSICA - Carga dinámica por esfuerzos: NE': resp.idpcargesfuerzos_tb_ne,
      //   '1CARGA FÍSICA - Carga dinámica por esfuerzos: NP': resp.idpcargesfuerzos_tb_ne,
      //   '1CARGA FÍSICA - Carga dinámica por esfuerzos: INTERPRETACIÓN': resp.idpcargesfuerzos_interpreta,
      //   '1CARGA FÍSICA - Carga dinámica por esfuerzos: NC': resp.idpcargesfuerzos_tb_nc,
      //   '1CARGA FÍSICA - Carga dinámica por esfuerzos: INTERVENCIÓN': resp.idpcargesfuerzos_intervencion,
      //   '1CARGA FÍSICA - Carga dinámica por esfuerzos: NR': resp.idpcargesfuerzos_tb_nr,
      //   '1CARGA FÍSICA - Carga dinámica por esfuerzos: N° EXPUESTOS': resp.idpcargesfuerzos_numpuestos,
      //   '1CARGA FÍSICA - Carga dinámica por esfuerzos: OBSERVACIONES': resp.idpcargesfuerzos_observaciones,
      //   /* Carga Física - Carga dinámica por movimientos repetitivos */
      //   '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: EFECTOS POSIBLES': resp.idpcargmovimiento_efectos,
      //   '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: CONTROL EXISTENTE(FUENTE)': resp.idpcargmovimiento_ctrlfuente,
      //   '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: CONTROL EXISTENTE(MEDIO)': resp.idpcargmovimiento_ctrlmedio,
      //   '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargmovimiento_ctrlindividuo,
      //   '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: ND': resp.idpcargmovimiento_tb_nd,
      //   '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: NE': resp.idpcargmovimiento_tb_ne,
      //   '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: NP': resp.idpcargmovimiento_tb_ne,
      //   '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: INTERPRETACIÓN': resp.idpcargmovimiento_interpreta,
      //   '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: NC': resp.idpcargmovimiento_tb_nc,
      //   '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: INTERVENCIÓN': resp.idpcargmovimiento_intervencion,
      //   '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: NR': resp.idpcargmovimiento_tb_nr,
      //   '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: N° EXPUESTOS': resp.idpcargmovimiento_numpuestos,
      //   '2CARGA FÍSICA - Carga dinámica por movimientos repetitivos: OBSERVACIONES': resp.idpcargmovimiento_observaciones,
      //   /* Carga Física - Carga dinámica por sobreesfuerzos de la voz */
      //   '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: EFECTOS POSIBLES': resp.idpcargvoz_efectos,
      //   '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: CONTROL EXISTENTE(FUENTE)': resp.idpcargvoz_ctrlfuente,
      //   '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: CONTROL EXISTENTE(MEDIO)': resp.idpcargvoz_ctrlmedio,
      //   '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargvoz_ctrlindividuo,
      //   '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: ND': resp.idpcargvoz_tb_nd,
      //   '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: NE': resp.idpcargvoz_tb_ne,
      //   '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: NP': resp.idpcargvoz_tb_ne,
      //   '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: INTERPRETACIÓN': resp.idpcargvoz_interpreta,
      //   '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: NC': resp.idpcargvoz_tb_nc,
      //   '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: INTERVENCIÓN': resp.idpcargvoz_intervencion,
      //   '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: NR': resp.idpcargvoz_tb_nr,
      //   '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: N° EXPUESTOS': resp.idpcargvoz_numpuestos,
      //   '3CARGA FÍSICA - Carga dinámica por sobreesfuerzos de la voz: OBSERVACIONES': resp.idpcargvoz_observaciones,
      //   /* Carga Física - Carga estática de pie */
      //   '4CARGA FÍSICA - Carga estática de pie: EFECTOS POSIBLES': resp.idpcargpie_efectos,
      //   '4CARGA FÍSICA - Carga estática de pie: CONTROL EXISTENTE(FUENTE)': resp.idpcargpie_ctrlfuente,
      //   '4CARGA FÍSICA - Carga estática de pie: CONTROL EXISTENTE(MEDIO)': resp.idpcargpie_ctrlmedio,
      //   '4CARGA FÍSICA - Carga estática de pie: CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargpie_ctrlindividuo,
      //   '4CARGA FÍSICA - Carga estática de pie: ND': resp.idpcargpie_tb_nd,
      //   '4CARGA FÍSICA - Carga estática de pie: NE': resp.idpcargpie_tb_ne,
      //   '4CARGA FÍSICA - Carga estática de pie: NP': resp.idpcargpie_tb_ne,
      //   '4CARGA FÍSICA - Carga estática de pie: INTERPRETACIÓN': resp.idpcargpie_interpreta,
      //   '4CARGA FÍSICA - Carga estática de pie: NC': resp.idpcargpie_tb_nc,
      //   '4CARGA FÍSICA - Carga estática de pie: INTERVENCIÓN': resp.idpcargpie_intervencion,
      //   '4CARGA FÍSICA - Carga estática de pie: NR': resp.idpcargpie_tb_nr,
      //   '4CARGA FÍSICA - Carga estática de pie: N° EXPUESTOS': resp.idpcargpie_numpuestos,
      //   '4CARGA FÍSICA - Carga estática de pie: OBSERVACIONES': resp.idpcargpie_observaciones,
      //   /* Carga Física - Posiciones prolongadas sentado */
      //   '5CARGA FÍSICA - Posiciones prolongadas sentado: EFECTOS POSIBLES': resp.idpcargsentado_efectos,
      //   '5CARGA FÍSICA - Posiciones prolongadas sentado: CONTROL EXISTENTE(FUENTE)': resp.idpcargsentado_ctrlfuente,
      //   '5CARGA FÍSICA - Posiciones prolongadas sentado: CONTROL EXISTENTE(MEDIO)': resp.idpcargsentado_ctrlmedio,
      //   '5CARGA FÍSICA - Posiciones prolongadas sentado: CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargsentado_ctrlindividuo,
      //   '5CARGA FÍSICA - Posiciones prolongadas sentado: ND': resp.idpcargsentado_tb_nd,
      //   '5CARGA FÍSICA - Posiciones prolongadas sentado: NE': resp.idpcargsentado_tb_ne,
      //   '5CARGA FÍSICA - Posiciones prolongadas sentado: NP': resp.idpcargsentado_tb_ne,
      //   '5CARGA FÍSICA - Posiciones prolongadas sentado: INTERPRETACIÓN': resp.idpcargsentado_interpreta,
      //   '5CARGA FÍSICA - Posiciones prolongadas sentado: NC': resp.idpcargsentado_tb_nc,
      //   '5CARGA FÍSICA - Posiciones prolongadas sentado: INTERVENCIÓN': resp.idpcargsentado_intervencion,
      //   '5CARGA FÍSICA - Posiciones prolongadas sentado: NR': resp.idpcargsentado_tb_nr,
      //   '5CARGA FÍSICA - Posiciones prolongadas sentado: N° EXPUESTOS': resp.idpcargsentado_numpuestos,
      //   '5CARGA FÍSICA - Posiciones prolongadas sentado: OBSERVACIONES': resp.idpcargsentado_observaciones,
      //   /* ----------------------ELÉCTRICO------------------- */
      //   /* Eléctrico - Energía eléctrica de baja */
      //   '1ELÉCTRICO - Energía eléctrica de baja: EFECTOS POSIBLES': resp.idpelectricobaja_efectos,
      //   '1ELÉCTRICO - Energía eléctrica de baja: CONTROL EXISTENTE(FUENTE)': resp.idpelectricobaja_ctrlfuente,
      //   '1ELÉCTRICO - Energía eléctrica de baja: CONTROL EXISTENTE(MEDIO)': resp.idpelectricobaja_ctrlmedio,
      //   '1ELÉCTRICO - Energía eléctrica de baja: CONTROL EXISTENTE(INDIVIDUO)': resp.idpelectricobaja_ctrlindividuo,
      //   '1ELÉCTRICO - Energía eléctrica de baja: ND': resp.idpelectricobaja_tb_nd,
      //   '1ELÉCTRICO - Energía eléctrica de baja: NE': resp.idpelectricobaja_tb_ne,
      //   '1ELÉCTRICO - Energía eléctrica de baja: NP': resp.idpelectricobaja_tb_ne,
      //   '1ELÉCTRICO - Energía eléctrica de baja: INTERPRETACIÓN': resp.idpelectricobaja_interpreta,
      //   '1ELÉCTRICO - Energía eléctrica de baja: NC': resp.idpelectricobaja_tb_nc,
      //   '1ELÉCTRICO - Energía eléctrica de baja: INTERVENCIÓN': resp.idpelectricobaja_intervencion,
      //   '1ELÉCTRICO - Energía eléctrica de baja: NR': resp.idpelectricobaja_tb_nr,
      //   '1ELÉCTRICO - Energía eléctrica de baja: N° EXPUESTOS': resp.idpelectricobaja_numpuestos,
      //   '1ELÉCTRICO - Energía eléctrica de baja: OBSERVACIONES': resp.idpelectricobaja_observaciones,
      //   /* Eléctrico - Energía eléctrica de alta */
      //   '2ELÉCTRICO - Energía eléctrica de alta: EFECTOS POSIBLES': resp.idpelectricoalta_efectos,
      //   '2ELÉCTRICO - Energía eléctrica de alta: CONTROL EXISTENTE(FUENTE)': resp.idpelectricoalta_ctrlfuente,
      //   '2ELÉCTRICO - Energía eléctrica de alta: CONTROL EXISTENTE(MEDIO)': resp.idpelectricoalta_ctrlmedio,
      //   '2ELÉCTRICO - Energía eléctrica de alta: CONTROL EXISTENTE(INDIVIDUO)': resp.idpelectricoalta_ctrlindividuo,
      //   '2ELÉCTRICO - Energía eléctrica de alta: ND': resp.idpelectricoalta_tb_nd,
      //   '2ELÉCTRICO - Energía eléctrica de alta: NE': resp.idpelectricoalta_tb_ne,
      //   '2ELÉCTRICO - Energía eléctrica de alta: NP': resp.idpelectricoalta_tb_ne,
      //   '2ELÉCTRICO - Energía eléctrica de alta: INTERPRETACIÓN': resp.idpelectricoalta_interpreta,
      //   '2ELÉCTRICO - Energía eléctrica de alta: NC': resp.idpelectricoalta_tb_nc,
      //   '2ELÉCTRICO - Energía eléctrica de alta: INTERVENCIÓN': resp.idpelectricoalta_intervencion,
      //   '2ELÉCTRICO - Energía eléctrica de alta: NR': resp.idpelectricoalta_tb_nr,
      //   '2ELÉCTRICO - Energía eléctrica de alta: N° EXPUESTOS': resp.idpelectricoalta_numpuestos,
      //   '2ELÉCTRICO - Energía eléctrica de alta: OBSERVACIONES': resp.idpelectricoalta_observaciones,
      //   /* Eléctrico - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados */
      //   '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: EFECTOS POSIBLES': resp.idpelectricocables_efectos,
      //   '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: CONTROL EXISTENTE(FUENTE)': resp.idpelectricocables_ctrlfuente,
      //   '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: CONTROL EXISTENTE(MEDIO)': resp.idpelectricocables_ctrlmedio,
      //   '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: CONTROL EXISTENTE(INDIVIDUO)': resp.idpelectricocables_ctrlindividuo,
      //   '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: ND': resp.idpelectricocables_tb_nd,
      //   '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: NE': resp.idpelectricocables_tb_ne,
      //   '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: NP': resp.idpelectricocables_tb_ne,
      //   '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: INTERPRETACIÓN': resp.idpelectricocables_interpreta,
      //   '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: NC': resp.idpelectricocables_tb_nc,
      //   '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: INTERVENCIÓN': resp.idpelectricocables_intervencion,
      //   '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: NR': resp.idpelectricocables_tb_nr,
      //   '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: N° EXPUESTOS': resp.idpelectricocables_numpuestos,
      //   '3ELÉCTRICO - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados: OBSERVACIONES': resp.idpelectricocables_observaciones,
      //   /* ----------------------FÍSICO------------------- */
      //   /* Físico - Iluminación deficiente */
      //   '1FÍSICO - Iluminación deficiente: EFECTOS POSIBLES': resp.idpfisicoilumdef_efectos,
      //   '1FÍSICO - Iluminación deficiente: CONTROL EXISTENTE(FUENTE)': resp.idpfisicoilumdef_ctrlfuente,
      //   '1FÍSICO - Iluminación deficiente: CONTROL EXISTENTE(MEDIO)': resp.idpfisicoilumdef_ctrlmedio,
      //   '1FÍSICO - Iluminación deficiente: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicoilumdef_ctrlindividuo,
      //   '1FÍSICO - Iluminación deficiente: ND': resp.idpfisicoilumdef_tb_nd,
      //   '1FÍSICO - Iluminación deficiente: NE': resp.idpfisicoilumdef_tb_ne,
      //   '1FÍSICO - Iluminación deficiente: NP': resp.idpfisicoilumdef_tb_ne,
      //   '1FÍSICO - Iluminación deficiente: INTERPRETACIÓN': resp.idpfisicoilumdef_interpreta,
      //   '1FÍSICO - Iluminación deficiente: NC': resp.idpfisicoilumdef_tb_nc,
      //   '1FÍSICO - Iluminación deficiente: INTERVENCIÓN': resp.idpfisicoilumdef_intervencion,
      //   '1FÍSICO - Iluminación deficiente: NR': resp.idpfisicoilumdef_tb_nr,
      //   '1FÍSICO - Iluminación deficiente: N° EXPUESTOS': resp.idpfisicoilumdef_numpuestos,
      //   '1FÍSICO - Iluminación deficiente: OBSERVACIONES': resp.idpfisicoilumdef_observaciones,
      //   /* Físico - Iluminación en exceso */
      //   '2FÍSICO - Iluminación en exceso: EFECTOS POSIBLES': resp.idpfisicoilumexceso_efectos,
      //   '2FÍSICO - Iluminación en exceso: CONTROL EXISTENTE(FUENTE)': resp.idpfisicoilumexceso_ctrlfuente,
      //   '2FÍSICO - Iluminación en exceso: CONTROL EXISTENTE(MEDIO)': resp.idpfisicoilumexceso_ctrlmedio,
      //   '2FÍSICO - Iluminación en exceso: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicoilumexceso_ctrlindividuo,
      //   '2FÍSICO - Iluminación en exceso: ND': resp.idpfisicoilumexceso_tb_nd,
      //   '2FÍSICO - Iluminación en exceso: NE': resp.idpfisicoilumexceso_tb_ne,
      //   '2FÍSICO - Iluminación en exceso: NP': resp.idpfisicoilumexceso_tb_ne,
      //   '2FÍSICO - Iluminación en exceso: INTERPRETACIÓN': resp.idpfisicoilumexceso_interpreta,
      //   '2FÍSICO - Iluminación en exceso: NC': resp.idpfisicoilumexceso_tb_nc,
      //   '2FÍSICO - Iluminación en exceso: INTERVENCIÓN': resp.idpfisicoilumexceso_intervencion,
      //   '2FÍSICO - Iluminación en exceso: NR': resp.idpfisicoilumexceso_tb_nr,
      //   '2FÍSICO - Iluminación en exceso: N° EXPUESTOS': resp.idpfisicoilumexceso_numpuestos,
      //   '2FÍSICO - Iluminación en exceso: OBSERVACIONES': resp.idpfisicoilumexceso_observaciones,
      //   /* Físico - Radiaciones no ionizantes por ultravioleta */
      //   '3FÍSICO - Radiaciones no ionizantes por ultravioleta: EFECTOS POSIBLES': resp.idpfisiconoradiaciones_efectos,
      //   '3FÍSICO - Radiaciones no ionizantes por ultravioleta: CONTROL EXISTENTE(FUENTE)': resp.idpfisiconoradiaciones_ctrlfuente,
      //   '3FÍSICO - Radiaciones no ionizantes por ultravioleta: CONTROL EXISTENTE(MEDIO)': resp.idpfisiconoradiaciones_ctrlmedio,
      //   '3FÍSICO - Radiaciones no ionizantes por ultravioleta: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisiconoradiaciones_ctrlindividuo,
      //   '3FÍSICO - Radiaciones no ionizantes por ultravioleta: ND': resp.idpfisiconoradiaciones_tb_nd,
      //   '3FÍSICO - Radiaciones no ionizantes por ultravioleta: NE': resp.idpfisiconoradiaciones_tb_ne,
      //   '3FÍSICO - Radiaciones no ionizantes por ultravioleta: NP': resp.idpfisiconoradiaciones_tb_ne,
      //   '3FÍSICO - Radiaciones no ionizantes por ultravioleta: INTERPRETACIÓN': resp.idpfisiconoradiaciones_interpreta,
      //   '3FÍSICO - Radiaciones no ionizantes por ultravioleta: NC': resp.idpfisiconoradiaciones_tb_nc,
      //   '3FÍSICO - Radiaciones no ionizantes por ultravioleta: INTERVENCIÓN': resp.idpfisiconoradiaciones_intervencion,
      //   '3FÍSICO - Radiaciones no ionizantes por ultravioleta: NR': resp.idpfisiconoradiaciones_tb_nr,
      //   '3FÍSICO - Radiaciones no ionizantes por ultravioleta: N° EXPUESTOS': resp.idpfisiconoradiaciones_numpuestos,
      //   '3FÍSICO - Radiaciones no ionizantes por ultravioleta: OBSERVACIONES': resp.idpfisiconoradiaciones_observaciones,
      //   /* Físico - Radiaciones ionizantes */
      //   '4FÍSICO - Radiaciones ionizantes: EFECTOS POSIBLES': resp.idpfisicoradiaciones_efectos,
      //   '4FÍSICO - Radiaciones ionizantes: CONTROL EXISTENTE(FUENTE)': resp.idpfisicoradiaciones_ctrlfuente,
      //   '4FÍSICO - Radiaciones ionizantes: CONTROL EXISTENTE(MEDIO)': resp.idpfisicoradiaciones_ctrlmedio,
      //   '4FÍSICO - Radiaciones ionizantes: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicoradiaciones_ctrlindividuo,
      //   '4FÍSICO - Radiaciones ionizantes: ND': resp.idpfisicoradiaciones_tb_nd,
      //   '4FÍSICO - Radiaciones ionizantes: NE': resp.idpfisicoradiaciones_tb_ne,
      //   '4FÍSICO - Radiaciones ionizantes: NP': resp.idpfisicoradiaciones_tb_ne,
      //   '4FÍSICO - Radiaciones ionizantes: INTERPRETACIÓN': resp.idpfisicoradiaciones_interpreta,
      //   '4FÍSICO - Radiaciones ionizantes: NC': resp.idpfisicoradiaciones_tb_nc,
      //   '4FÍSICO - Radiaciones ionizantes: INTERVENCIÓN': resp.idpfisicoradiaciones_intervencion,
      //   '4FÍSICO - Radiaciones ionizantes: NR': resp.idpfisicoradiaciones_tb_nr,
      //   '4FÍSICO - Radiaciones ionizantes: N° EXPUESTOS': resp.idpfisicoradiaciones_numpuestos,
      //   '4FÍSICO - Radiaciones ionizantes: OBSERVACIONES': resp.idpfisicoradiaciones_observaciones,
      //   /* Físico - Ruido */
      //   '5FÍSICO - Ruido: EFECTOS POSIBLES': resp.idpfisicoruido_efectos,
      //   '5FÍSICO - Ruido: CONTROL EXISTENTE(FUENTE)': resp.idpfisicoruido_ctrlfuente,
      //   '5FÍSICO - Ruido: CONTROL EXISTENTE(MEDIO)': resp.idpfisicoruido_ctrlmedio,
      //   '5FÍSICO - Ruido: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicoruido_ctrlindividuo,
      //   '5FÍSICO - Ruido: ND': resp.idpfisicoruido_tb_nd,
      //   '5FÍSICO - Ruido: NE': resp.idpfisicoruido_tb_ne,
      //   '5FÍSICO - Ruido: NP': resp.idpfisicoruido_tb_ne,
      //   '5FÍSICO - Ruido: INTERPRETACIÓN': resp.idpfisicoruido_interpreta,
      //   '5FÍSICO - Ruido: NC': resp.idpfisicoruido_tb_nc,
      //   '5FÍSICO - Ruido: INTERVENCIÓN': resp.idpfisicoruido_intervencion,
      //   '5FÍSICO - Ruido: NR': resp.idpfisicoruido_tb_nr,
      //   '5FÍSICO - Ruido: N° EXPUESTOS': resp.idpfisicoruido_numpuestos,
      //   '5FÍSICO - Ruido: OBSERVACIONES': resp.idpfisicoruido_observaciones,
      //   /* Físico - Vibraciones */
      //   '6FÍSICO - Vibraciones: EFECTOS POSIBLES': resp.idpfisicovibraciones_efectos,
      //   '6FÍSICO - Vibraciones: CONTROL EXISTENTE(FUENTE)': resp.idpfisicovibraciones_ctrlfuente,
      //   '6FÍSICO - Vibraciones: CONTROL EXISTENTE(MEDIO)': resp.idpfisicovibraciones_ctrlmedio,
      //   '6FÍSICO - Vibraciones: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicovibraciones_ctrlindividuo,
      //   '6FÍSICO - Vibraciones: ND': resp.idpfisicovibraciones_tb_nd,
      //   '6FÍSICO - Vibraciones: NE': resp.idpfisicovibraciones_tb_ne,
      //   '6FÍSICO - Vibraciones: NP': resp.idpfisicovibraciones_tb_ne,
      //   '6FÍSICO - Vibraciones: INTERPRETACIÓN': resp.idpfisicovibraciones_interpreta,
      //   '6FÍSICO - Vibraciones: NC': resp.idpfisicovibraciones_tb_nc,
      //   '6FÍSICO - Vibraciones: INTERVENCIÓN': resp.idpfisicovibraciones_intervencion,
      //   '6FÍSICO - Vibraciones: NR': resp.idpfisicovibraciones_tb_nr,
      //   '6FÍSICO - Vibraciones: N° EXPUESTOS': resp.idpfisicovibraciones_numpuestos,
      //   '6FÍSICO - Vibraciones: OBSERVACIONES': resp.idpfisicovibraciones_observaciones,
      //   /* Físico - Transferencias de temperaturas por calor */
      //   '7FÍSICO - Transferencias de temperaturas por calor: EFECTOS POSIBLES': resp.idpfisicocalor_efectos,
      //   '7FÍSICO - Transferencias de temperaturas por calor: CONTROL EXISTENTE(FUENTE)': resp.idpfisicocalor_ctrlfuente,
      //   '7FÍSICO - Transferencias de temperaturas por calor: CONTROL EXISTENTE(MEDIO)': resp.idpfisicocalor_ctrlmedio,
      //   '7FÍSICO - Transferencias de temperaturas por calor: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicocalor_ctrlindividuo,
      //   '7FÍSICO - Transferencias de temperaturas por calor: ND': resp.idpfisicocalor_tb_nd,
      //   '7FÍSICO - Transferencias de temperaturas por calor: NE': resp.idpfisicocalor_tb_ne,
      //   '7FÍSICO - Transferencias de temperaturas por calor: NP': resp.idpfisicocalor_tb_ne,
      //   '7FÍSICO - Transferencias de temperaturas por calor: INTERPRETACIÓN': resp.idpfisicocalor_interpreta,
      //   '7FÍSICO - Transferencias de temperaturas por calor: NC': resp.idpfisicocalor_tb_nc,
      //   '7FÍSICO - Transferencias de temperaturas por calor: INTERVENCIÓN': resp.idpfisicocalor_intervencion,
      //   '7FÍSICO - Transferencias de temperaturas por calor: NR': resp.idpfisicocalor_tb_nr,
      //   '7FÍSICO - Transferencias de temperaturas por calor: N° EXPUESTOS': resp.idpfisicocalor_numpuestos,
      //   '7FÍSICO - Transferencias de temperaturas por calor: OBSERVACIONES': resp.idpfisicocalor_observaciones,
      //   /* Físico - Transferencias de temperaturas por frio */
      //   '8FÍSICO - Transferencias de temperaturas por frio: EFECTOS POSIBLES': resp.idpfisicofrio_efectos,
      //   '8FÍSICO - Transferencias de temperaturas por frio: CONTROL EXISTENTE(FUENTE)': resp.idpfisicofrio_ctrlfuente,
      //   '8FÍSICO - Transferencias de temperaturas por frio: CONTROL EXISTENTE(MEDIO)': resp.idpfisicofrio_ctrlmedio,
      //   '8FÍSICO - Transferencias de temperaturas por frio: CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicofrio_ctrlindividuo,
      //   '8FÍSICO - Transferencias de temperaturas por frio: ND': resp.idpfisicofrio_tb_nd,
      //   '8FÍSICO - Transferencias de temperaturas por frio: NE': resp.idpfisicofrio_tb_ne,
      //   '8FÍSICO - Transferencias de temperaturas por frio: NP': resp.idpfisicofrio_tb_ne,
      //   '8FÍSICO - Transferencias de temperaturas por frio: INTERPRETACIÓN': resp.idpfisicofrio_interpreta,
      //   '8FÍSICO - Transferencias de temperaturas por frio: NC': resp.idpfisicofrio_tb_nc,
      //   '8FÍSICO - Transferencias de temperaturas por frio: INTERVENCIÓN': resp.idpfisicofrio_intervencion,
      //   '8FÍSICO - Transferencias de temperaturas por frio: NR': resp.idpfisicofrio_tb_nr,
      //   '8FÍSICO - Transferencias de temperaturas por frio: N° EXPUESTOS': resp.idpfisicofrio_numpuestos,
      //   '8FÍSICO - Transferencias de temperaturas por frio: OBSERVACIONES': resp.idpfisicofrio_observaciones,
      //   /* ----------------------INCENDIOS / EXPLOSIONES------------------- */
      //   /* Incendios / Explosiones - Materiales combustibles */
      //   '1INCENDIOS / EXPLOSIONES - Materiales combustibles: EFECTOS POSIBLES': resp.idpincendioscombust_efectos,
      //   '1INCENDIOS / EXPLOSIONES - Materiales combustibles: CONTROL EXISTENTE(FUENTE)': resp.idpincendioscombust_ctrlfuente,
      //   '1INCENDIOS / EXPLOSIONES - Materiales combustibles: CONTROL EXISTENTE(MEDIO)': resp.idpincendioscombust_ctrlmedio,
      //   '1INCENDIOS / EXPLOSIONES - Materiales combustibles: CONTROL EXISTENTE(INDIVIDUO)': resp.idpincendioscombust_ctrlindividuo,
      //   '1INCENDIOS / EXPLOSIONES - Materiales combustibles: ND': resp.idpincendioscombust_tb_nd,
      //   '1INCENDIOS / EXPLOSIONES - Materiales combustibles: NE': resp.idpincendioscombust_tb_ne,
      //   '1INCENDIOS / EXPLOSIONES - Materiales combustibles: NP': resp.idpincendioscombust_tb_ne,
      //   '1INCENDIOS / EXPLOSIONES - Materiales combustibles: INTERPRETACIÓN': resp.idpincendioscombust_interpreta,
      //   '1INCENDIOS / EXPLOSIONES - Materiales combustibles: NC': resp.idpincendioscombust_tb_nc,
      //   '1INCENDIOS / EXPLOSIONES - Materiales combustibles: INTERVENCIÓN': resp.idpincendioscombust_intervencion,
      //   '1INCENDIOS / EXPLOSIONES - Materiales combustibles: NR': resp.idpincendioscombust_tb_nr,
      //   '1INCENDIOS / EXPLOSIONES - Materiales combustibles: N° EXPUESTOS': resp.idpincendioscombust_numpuestos,
      //   '1INCENDIOS / EXPLOSIONES - Materiales combustibles: OBSERVACIONES': resp.idpincendioscombust_observaciones,
      //   /* Incendios / Explosiones - Ausencia de equipo contra incendio */
      //   '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: EFECTOS POSIBLES': resp.idpincendiosequipo_efectos,
      //   '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: CONTROL EXISTENTE(FUENTE)': resp.idpincendiosequipo_ctrlfuente,
      //   '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: CONTROL EXISTENTE(MEDIO)': resp.idpincendiosequipo_ctrlmedio,
      //   '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: CONTROL EXISTENTE(INDIVIDUO)': resp.idpincendiosequipo_ctrlindividuo,
      //   '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: ND': resp.idpincendiosequipo_tb_nd,
      //   '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: NE': resp.idpincendiosequipo_tb_ne,
      //   '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: NP': resp.idpincendiosequipo_tb_ne,
      //   '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: INTERPRETACIÓN': resp.idpincendiosequipo_interpreta,
      //   '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: NC': resp.idpincendiosequipo_tb_nc,
      //   '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: INTERVENCIÓN': resp.idpincendiosequipo_intervencion,
      //   '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: NR': resp.idpincendiosequipo_tb_nr,
      //   '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: N° EXPUESTOS': resp.idpincendiosequipo_numpuestos,
      //   '2INCENDIOS / EXPLOSIONES - Ausencia de equipo contra incendio: OBSERVACIONES': resp.idpincendiosequipo_observaciones,
      //   /* Incendios / Explosiones - Sustancias inflamables */
      //   '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: EFECTOS POSIBLES': resp.idpincendiossustancias_efectos,
      //   '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: CONTROL EXISTENTE(FUENTE)': resp.idpincendiossustancias_ctrlfuente,
      //   '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: CONTROL EXISTENTE(MEDIO)': resp.idpincendiossustancias_ctrlmedio,
      //   '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: CONTROL EXISTENTE(INDIVIDUO)': resp.idpincendiossustancias_ctrlindividuo,
      //   '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: ND': resp.idpincendiossustancias_tb_nd,
      //   '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: NE': resp.idpincendiossustancias_tb_ne,
      //   '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: NP': resp.idpincendiossustancias_tb_ne,
      //   '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: INTERPRETACIÓN': resp.idpincendiossustancias_interpreta,
      //   '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: NC': resp.idpincendiossustancias_tb_nc,
      //   '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: INTERVENCIÓN': resp.idpincendiossustancias_intervencion,
      //   '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: NR': resp.idpincendiossustancias_tb_nr,
      //   '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: N° EXPUESTOS': resp.idpincendiossustancias_numpuestos,
      //   '3INCENDIOS / EXPLOSIONES - Sustancias inflamables: OBSERVACIONES': resp.idpincendiossustancias_observaciones,
      //   /* ----------------------LOCATIVOS------------------- */
      //   /* Locativos - Pisos defectuosos */
      //   '1LOCATIVOS - Pisos defectuosos: EFECTOS POSIBLES': resp.idplocativospisos_efectos,
      //   '1LOCATIVOS - Pisos defectuosos: CONTROL EXISTENTE(FUENTE)': resp.idplocativospisos_ctrlfuente,
      //   '1LOCATIVOS - Pisos defectuosos: CONTROL EXISTENTE(MEDIO)': resp.idplocativospisos_ctrlmedio,
      //   '1LOCATIVOS - Pisos defectuosos: CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativospisos_ctrlindividuo,
      //   '1LOCATIVOS - Pisos defectuosos: ND': resp.idplocativospisos_tb_nd,
      //   '1LOCATIVOS - Pisos defectuosos: NE': resp.idplocativospisos_tb_ne,
      //   '1LOCATIVOS - Pisos defectuosos: NP': resp.idplocativospisos_tb_ne,
      //   '1LOCATIVOS - Pisos defectuosos: INTERPRETACIÓN': resp.idplocativospisos_interpreta,
      //   '1LOCATIVOS - Pisos defectuosos: NC': resp.idplocativospisos_tb_nc,
      //   '1LOCATIVOS - Pisos defectuosos: INTERVENCIÓN': resp.idplocativospisos_intervencion,
      //   '1LOCATIVOS - Pisos defectuosos: NR': resp.idplocativospisos_tb_nr,
      //   '1LOCATIVOS - Pisos defectuosos: N° EXPUESTOS': resp.idplocativospisos_numpuestos,
      //   '1LOCATIVOS - Pisos defectuosos: OBSERVACIONES': resp.idplocativospisos_observaciones,
      //   /* Locativos - Escaleras defectuosas */
      //   '2LOCATIVOS - Escaleras defectuosas: EFECTOS POSIBLES': resp.idplocativosescaleras_efectos,
      //   '2LOCATIVOS - Escaleras defectuosas: CONTROL EXISTENTE(FUENTE)': resp.idplocativosescaleras_ctrlfuente,
      //   '2LOCATIVOS - Escaleras defectuosas: CONTROL EXISTENTE(MEDIO)': resp.idplocativosescaleras_ctrlmedio,
      //   '2LOCATIVOS - Escaleras defectuosas: CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosescaleras_ctrlindividuo,
      //   '2LOCATIVOS - Escaleras defectuosas: ND': resp.idplocativosescaleras_tb_nd,
      //   '2LOCATIVOS - Escaleras defectuosas: NE': resp.idplocativosescaleras_tb_ne,
      //   '2LOCATIVOS - Escaleras defectuosas: NP': resp.idplocativosescaleras_tb_ne,
      //   '2LOCATIVOS - Escaleras defectuosas: INTERPRETACIÓN': resp.idplocativosescaleras_interpreta,
      //   '2LOCATIVOS - Escaleras defectuosas: NC': resp.idplocativosescaleras_tb_nc,
      //   '2LOCATIVOS - Escaleras defectuosas: INTERVENCIÓN': resp.idplocativosescaleras_intervencion,
      //   '2LOCATIVOS - Escaleras defectuosas: NR': resp.idplocativosescaleras_tb_nr,
      //   '2LOCATIVOS - Escaleras defectuosas: N° EXPUESTOS': resp.idplocativosescaleras_numpuestos,
      //   '2LOCATIVOS - Escaleras defectuosas: OBSERVACIONES': resp.idplocativosescaleras_observaciones,
      //   /* Locativos - Almacenamiento, estanterías en mal estado */
      //   '3LOCATIVOS - Almacenamiento, estanterías en mal estado: EFECTOS POSIBLES': resp.idplocativosestanterias_efectos,
      //   '3LOCATIVOS - Almacenamiento, estanterías en mal estado: CONTROL EXISTENTE(FUENTE)': resp.idplocativosestanterias_ctrlfuente,
      //   '3LOCATIVOS - Almacenamiento, estanterías en mal estado: CONTROL EXISTENTE(MEDIO)': resp.idplocativosestanterias_ctrlmedio,
      //   '3LOCATIVOS - Almacenamiento, estanterías en mal estado: CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosestanterias_ctrlindividuo,
      //   '3LOCATIVOS - Almacenamiento, estanterías en mal estado: ND': resp.idplocativosestanterias_tb_nd,
      //   '3LOCATIVOS - Almacenamiento, estanterías en mal estado: NE': resp.idplocativosestanterias_tb_ne,
      //   '3LOCATIVOS - Almacenamiento, estanterías en mal estado: NP': resp.idplocativosestanterias_tb_ne,
      //   '3LOCATIVOS - Almacenamiento, estanterías en mal estado: INTERPRETACIÓN': resp.idplocativosestanterias_interpreta,
      //   '3LOCATIVOS - Almacenamiento, estanterías en mal estado: NC': resp.idplocativosestanterias_tb_nc,
      //   '3LOCATIVOS - Almacenamiento, estanterías en mal estado: INTERVENCIÓN': resp.idplocativosestanterias_intervencion,
      //   '3LOCATIVOS - Almacenamiento, estanterías en mal estado: NR': resp.idplocativosestanterias_tb_nr,
      //   '3LOCATIVOS - Almacenamiento, estanterías en mal estado: N° EXPUESTOS': resp.idplocativosestanterias_numpuestos,
      //   '3LOCATIVOS - Almacenamiento, estanterías en mal estado: OBSERVACIONES': resp.idplocativosestanterias_observaciones,
      //   /* Locativos - Almacenamiento, arrumes con altura inadecuada */
      //   '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: EFECTOS POSIBLES': resp.idplocativosarrumes_efectos,
      //   '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: CONTROL EXISTENTE(FUENTE)': resp.idplocativosarrumes_ctrlfuente,
      //   '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: CONTROL EXISTENTE(MEDIO)': resp.idplocativosarrumes_ctrlmedio,
      //   '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosarrumes_ctrlindividuo,
      //   '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: ND': resp.idplocativosarrumes_tb_nd,
      //   '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: NE': resp.idplocativosarrumes_tb_ne,
      //   '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: NP': resp.idplocativosarrumes_tb_ne,
      //   '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: INTERPRETACIÓN': resp.idplocativosarrumes_interpreta,
      //   '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: NC': resp.idplocativosarrumes_tb_nc,
      //   '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: INTERVENCIÓN': resp.idplocativosarrumes_intervencion,
      //   '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: NR': resp.idplocativosarrumes_tb_nr,
      //   '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: N° EXPUESTOS': resp.idplocativosarrumes_numpuestos,
      //   '4LOCATIVOS - Almacenamiento, arrumes con altura inadecuada: OBSERVACIONES': resp.idplocativosarrumes_observaciones,
      //   /* Locativos - Señalización y demarcación deficiente, inexistente o inadecuada */
      //   '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: EFECTOS POSIBLES': resp.idplocativosenalizacion_efectos,
      //   '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: CONTROL EXISTENTE(FUENTE)': resp.idplocativosenalizacion_ctrlfuente,
      //   '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: CONTROL EXISTENTE(MEDIO)': resp.idplocativosenalizacion_ctrlmedio,
      //   '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosenalizacion_ctrlindividuo,
      //   '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: ND': resp.idplocativosenalizacion_tb_nd,
      //   '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: NE': resp.idplocativosenalizacion_tb_ne,
      //   '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: NP': resp.idplocativosenalizacion_tb_ne,
      //   '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: INTERPRETACIÓN': resp.idplocativosenalizacion_interpreta,
      //   '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: NC': resp.idplocativosenalizacion_tb_nc,
      //   '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: INTERVENCIÓN': resp.idplocativosenalizacion_intervencion,
      //   '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: NR': resp.idplocativosenalizacion_tb_nr,
      //   '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: N° EXPUESTOS': resp.idplocativosenalizacion_numpuestos,
      //   '5LOCATIVOS - Señalización y demarcación deficiente, inexistente o inadecuada: OBSERVACIONES': resp.idplocativosenalizacion_observaciones,
      //   /* Locativos - Falta de orden y aseo */
      //   '6LOCATIVOS - Falta de orden y aseo: EFECTOS POSIBLES': resp.idplocativosaseo_efectos,
      //   '6LOCATIVOS - Falta de orden y aseo: CONTROL EXISTENTE(FUENTE)': resp.idplocativosaseo_ctrlfuente,
      //   '6LOCATIVOS - Falta de orden y aseo: CONTROL EXISTENTE(MEDIO)': resp.idplocativosaseo_ctrlmedio,
      //   '6LOCATIVOS - Falta de orden y aseo: CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosaseo_ctrlindividuo,
      //   '6LOCATIVOS - Falta de orden y aseo: ND': resp.idplocativosaseo_tb_nd,
      //   '6LOCATIVOS - Falta de orden y aseo: NE': resp.idplocativosaseo_tb_ne,
      //   '6LOCATIVOS - Falta de orden y aseo: NP': resp.idplocativosaseo_tb_ne,
      //   '6LOCATIVOS - Falta de orden y aseo: INTERPRETACIÓN': resp.idplocativosaseo_interpreta,
      //   '6LOCATIVOS - Falta de orden y aseo: NC': resp.idplocativosaseo_tb_nc,
      //   '6LOCATIVOS - Falta de orden y aseo: INTERVENCIÓN': resp.idplocativosaseo_intervencion,
      //   '6LOCATIVOS - Falta de orden y aseo: NR': resp.idplocativosaseo_tb_nr,
      //   '6LOCATIVOS - Falta de orden y aseo: N° EXPUESTOS': resp.idplocativosaseo_numpuestos,
      //   '6LOCATIVOS - Falta de orden y aseo: OBSERVACIONES': resp.idplocativosaseo_observaciones,
      //   /* ----------------------MECÁNICOS------------------- */
      //   /* Mecánicos - Utilización de herramientas manuales */
      //   '1MECÁNICOS - Utilización de herramientas manuales: EFECTOS POSIBLES': resp.idpmecanicoherramient_efectos,
      //   '1MECÁNICOS - Utilización de herramientas manuales: CONTROL EXISTENTE(FUENTE)': resp.idpmecanicoherramient_ctrlfuente,
      //   '1MECÁNICOS - Utilización de herramientas manuales: CONTROL EXISTENTE(MEDIO)': resp.idpmecanicoherramient_ctrlmedio,
      //   '1MECÁNICOS - Utilización de herramientas manuales: CONTROL EXISTENTE(INDIVIDUO)': resp.idpmecanicoherramient_ctrlindividuo,
      //   '1MECÁNICOS - Utilización de herramientas manuales: ND': resp.idpmecanicoherramient_tb_nd,
      //   '1MECÁNICOS - Utilización de herramientas manuales: NE': resp.idpmecanicoherramient_tb_ne,
      //   '1MECÁNICOS - Utilización de herramientas manuales: NP': resp.idpmecanicoherramient_tb_ne,
      //   '1MECÁNICOS - Utilización de herramientas manuales: INTERPRETACIÓN': resp.idpmecanicoherramient_interpreta,
      //   '1MECÁNICOS - Utilización de herramientas manuales: NC': resp.idpmecanicoherramient_tb_nc,
      //   '1MECÁNICOS - Utilización de herramientas manuales: INTERVENCIÓN': resp.idpmecanicoherramient_intervencion,
      //   '1MECÁNICOS - Utilización de herramientas manuales: NR': resp.idpmecanicoherramient_tb_nr,
      //   '1MECÁNICOS - Utilización de herramientas manuales: N° EXPUESTOS': resp.idpmecanicoherramient_numpuestos,
      //   '1MECÁNICOS - Utilización de herramientas manuales: OBSERVACIONES': resp.idpmecanicoherramient_observaciones,
      //   /* Mecánicos - Superficies cortantes */
      //   '2MECÁNICOS - Superficies cortantes: EFECTOS POSIBLES': resp.idpmecanicocortante_efectos,
      //   '2MECÁNICOS - Superficies cortantes: CONTROL EXISTENTE(FUENTE)': resp.idpmecanicocortante_ctrlfuente,
      //   '2MECÁNICOS - Superficies cortantes: CONTROL EXISTENTE(MEDIO)': resp.idpmecanicocortante_ctrlmedio,
      //   '2MECÁNICOS - Superficies cortantes: CONTROL EXISTENTE(INDIVIDUO)': resp.idpmecanicocortante_ctrlindividuo,
      //   '2MECÁNICOS - Superficies cortantes: ND': resp.idpmecanicocortante_tb_nd,
      //   '2MECÁNICOS - Superficies cortantes: NE': resp.idpmecanicocortante_tb_ne,
      //   '2MECÁNICOS - Superficies cortantes: NP': resp.idpmecanicocortante_tb_ne,
      //   '2MECÁNICOS - Superficies cortantes: INTERPRETACIÓN': resp.idpmecanicocortante_interpreta,
      //   '2MECÁNICOS - Superficies cortantes: NC': resp.idpmecanicocortante_tb_nc,
      //   '2MECÁNICOS - Superficies cortantes: INTERVENCIÓN': resp.idpmecanicocortante_intervencion,
      //   '2MECÁNICOS - Superficies cortantes: NR': resp.idpmecanicocortante_tb_nr,
      //   '2MECÁNICOS - Superficies cortantes: N° EXPUESTOS': resp.idpmecanicocortante_numpuestos,
      //   '2MECÁNICOS - Superficies cortantes: OBSERVACIONES': resp.idpmecanicocortante_observaciones,
      //   /* Mecánicos - Contacto con elementos cortopunzantes */
      //   '3MECÁNICOS - Contacto con elementos cortopunzantes: EFECTOS POSIBLES': resp.idpmecanicocortopunz_efectos,
      //   '3MECÁNICOS - Contacto con elementos cortopunzantes: CONTROL EXISTENTE(FUENTE)': resp.idpmecanicocortopunz_ctrlfuente,
      //   '3MECÁNICOS - Contacto con elementos cortopunzantes: CONTROL EXISTENTE(MEDIO)': resp.idpmecanicocortopunz_ctrlmedio,
      //   '3MECÁNICOS - Contacto con elementos cortopunzantes: CONTROL EXISTENTE(INDIVIDUO)': resp.idpmecanicocortopunz_ctrlindividuo,
      //   '3MECÁNICOS - Contacto con elementos cortopunzantes: ND': resp.idpmecanicocortopunz_tb_nd,
      //   '3MECÁNICOS - Contacto con elementos cortopunzantes: NE': resp.idpmecanicocortopunz_tb_ne,
      //   '3MECÁNICOS - Contacto con elementos cortopunzantes: NP': resp.idpmecanicocortopunz_tb_ne,
      //   '3MECÁNICOS - Contacto con elementos cortopunzantes: INTERPRETACIÓN': resp.idpmecanicocortopunz_interpreta,
      //   '3MECÁNICOS - Contacto con elementos cortopunzantes: NC': resp.idpmecanicocortopunz_tb_nc,
      //   '3MECÁNICOS - Contacto con elementos cortopunzantes: INTERVENCIÓN': resp.idpmecanicocortopunz_intervencion,
      //   '3MECÁNICOS - Contacto con elementos cortopunzantes: NR': resp.idpmecanicocortopunz_tb_nr,
      //   '3MECÁNICOS - Contacto con elementos cortopunzantes: N° EXPUESTOS': resp.idpmecanicocortopunz_numpuestos,
      //   '3MECÁNICOS - Contacto con elementos cortopunzantes: OBSERVACIONES': resp.idpmecanicocortopunz_observaciones,
      //   /* Mecánicos - Materiales proyectados sólidos o fluidos */
      //   '4MECÁNICOS - Materiales proyectados sólidos o fluidos: EFECTOS POSIBLES': resp.idpmecanicomateriales_efectos,
      //   '4MECÁNICOS - Materiales proyectados sólidos o fluidos: CONTROL EXISTENTE(FUENTE)': resp.idpmecanicomateriales_ctrlfuente,
      //   '4MECÁNICOS - Materiales proyectados sólidos o fluidos: CONTROL EXISTENTE(MEDIO)': resp.idpmecanicomateriales_ctrlmedio,
      //   '4MECÁNICOS - Materiales proyectados sólidos o fluidos: CONTROL EXISTENTE(INDIVIDUO)': resp.idpmecanicomateriales_ctrlindividuo,
      //   '4MECÁNICOS - Materiales proyectados sólidos o fluidos: ND': resp.idpmecanicomateriales_tb_nd,
      //   '4MECÁNICOS - Materiales proyectados sólidos o fluidos: NE': resp.idpmecanicomateriales_tb_ne,
      //   '4MECÁNICOS - Materiales proyectados sólidos o fluidos: NP': resp.idpmecanicomateriales_tb_ne,
      //   '4MECÁNICOS - Materiales proyectados sólidos o fluidos: INTERPRETACIÓN': resp.idpmecanicomateriales_interpreta,
      //   '4MECÁNICOS - Materiales proyectados sólidos o fluidos: NC': resp.idpmecanicomateriales_tb_nc,
      //   '4MECÁNICOS - Materiales proyectados sólidos o fluidos: INTERVENCIÓN': resp.idpmecanicomateriales_intervencion,
      //   '4MECÁNICOS - Materiales proyectados sólidos o fluidos: NR': resp.idpmecanicomateriales_tb_nr,
      //   '4MECÁNICOS - Materiales proyectados sólidos o fluidos: N° EXPUESTOS': resp.idpmecanicomateriales_numpuestos,
      //   '4MECÁNICOS - Materiales proyectados sólidos o fluidos: OBSERVACIONES': resp.idpmecanicomateriales_observaciones,
      //   /* ----------------------PSICOSOCIAL------------------- */
      //   /* Psicosocial - Sobrecarga de trabajo */
      //   '1PSICOSOCIAL - Sobrecarga de trabajo: EFECTOS POSIBLES': resp.idppsicosobrecarga_efectos,
      //   '1PSICOSOCIAL - Sobrecarga de trabajo: CONTROL EXISTENTE(FUENTE)': resp.idppsicosobrecarga_ctrlfuente,
      //   '1PSICOSOCIAL - Sobrecarga de trabajo: CONTROL EXISTENTE(MEDIO)': resp.idppsicosobrecarga_ctrlmedio,
      //   '1PSICOSOCIAL - Sobrecarga de trabajo: CONTROL EXISTENTE(INDIVIDUO)': resp.idppsicosobrecarga_ctrlindividuo,
      //   '1PSICOSOCIAL - Sobrecarga de trabajo: ND': resp.idppsicosobrecarga_tb_nd,
      //   '1PSICOSOCIAL - Sobrecarga de trabajo: NE': resp.idppsicosobrecarga_tb_ne,
      //   '1PSICOSOCIAL - Sobrecarga de trabajo: NP': resp.idppsicosobrecarga_tb_ne,
      //   '1PSICOSOCIAL - Sobrecarga de trabajo: INTERPRETACIÓN': resp.idppsicosobrecarga_interpreta,
      //   '1PSICOSOCIAL - Sobrecarga de trabajo: NC': resp.idppsicosobrecarga_tb_nc,
      //   '1PSICOSOCIAL - Sobrecarga de trabajo: INTERVENCIÓN': resp.idppsicosobrecarga_intervencion,
      //   '1PSICOSOCIAL - Sobrecarga de trabajo: NR': resp.idppsicosobrecarga_tb_nr,
      //   '1PSICOSOCIAL - Sobrecarga de trabajo: N° EXPUESTOS': resp.idppsicosobrecarga_numpuestos,
      //   '1PSICOSOCIAL - Sobrecarga de trabajo: OBSERVACIONES': resp.idppsicosobrecarga_observaciones,
      //   /* Psicosocial - Resposanbilidad en el cargo/ manejo de personal */
      //   '2PSICOSOCIAL - Resposanbilidad en el cargo/ manejo de personal: EFECTOS POSIBLES': resp.idppsicoresponsabilidad_efectos,
      //   '2PSICOSOCIAL - Resposanbilidad en el cargo/ manejo de personal: CONTROL EXISTENTE(FUENTE)': resp.idppsicoresponsabilidad_ctrlfuente,
      //   '2PSICOSOCIAL - Resposanbilidad en el cargo/ manejo de personal: CONTROL EXISTENTE(MEDIO)': resp.idppsicoresponsabilidad_ctrlmedio,
      //   '2PSICOSOCIAL - Resposanbilidad en el cargo/ manejo de personal: CONTROL EXISTENTE(INDIVIDUO)': resp.idppsicoresponsabilidad_ctrlindividuo,
      //   '2PSICOSOCIAL - Resposanbilidad en el cargo/ manejo de personal: ND': resp.idppsicoresponsabilidad_tb_nd,
      //   '2PSICOSOCIAL - Resposanbilidad en el cargo/ manejo de personal: NE': resp.idppsicoresponsabilidad_tb_ne,
      //   '2PSICOSOCIAL - Resposanbilidad en el cargo/ manejo de personal: NP': resp.idppsicoresponsabilidad_tb_ne,
      //   '2PSICOSOCIAL - Resposanbilidad en el cargo/ manejo de personal: INTERPRETACIÓN': resp.idppsicoresponsabilidad_interpreta,
      //   '2PSICOSOCIAL - Resposanbilidad en el cargo/ manejo de personal: NC': resp.idppsicoresponsabilidad_tb_nc,
      //   '2PSICOSOCIAL - Resposanbilidad en el cargo/ manejo de personal: INTERVENCIÓN': resp.idppsicoresponsabilidad_intervencion,
      //   '2PSICOSOCIAL - Resposanbilidad en el cargo/ manejo de personal: NR': resp.idppsicoresponsabilidad_tb_nr,
      //   '2PSICOSOCIAL - Resposanbilidad en el cargo/ manejo de personal: N° EXPUESTOS': resp.idppsicoresponsabilidad_numpuestos,
      //   '2PSICOSOCIAL - Resposanbilidad en el cargo/ manejo de personal: OBSERVACIONES': resp.idppsicoresponsabilidad_observaciones,
      //   /* Psicosocial - Trabajo repetitivo */
      //   '3PSICOSOCIAL - Trabajo repetitivo: EFECTOS POSIBLES': resp.idppsicorepetitivo_efectos,
      //   '3PSICOSOCIAL - Trabajo repetitivo: CONTROL EXISTENTE(FUENTE)': resp.idppsicorepetitivo_ctrlfuente,
      //   '3PSICOSOCIAL - Trabajo repetitivo: CONTROL EXISTENTE(MEDIO)': resp.idppsicorepetitivo_ctrlmedio,
      //   '3PSICOSOCIAL - Trabajo repetitivo: CONTROL EXISTENTE(INDIVIDUO)': resp.idppsicorepetitivo_ctrlindividuo,
      //   '3PSICOSOCIAL - Trabajo repetitivo: ND': resp.idppsicorepetitivo_tb_nd,
      //   '3PSICOSOCIAL - Trabajo repetitivo: NE': resp.idppsicorepetitivo_tb_ne,
      //   '3PSICOSOCIAL - Trabajo repetitivo: NP': resp.idppsicorepetitivo_tb_ne,
      //   '3PSICOSOCIAL - Trabajo repetitivo: INTERPRETACIÓN': resp.idppsicorepetitivo_interpreta,
      //   '3PSICOSOCIAL - Trabajo repetitivo: NC': resp.idppsicorepetitivo_tb_nc,
      //   '3PSICOSOCIAL - Trabajo repetitivo: INTERVENCIÓN': resp.idppsicorepetitivo_intervencion,
      //   '3PSICOSOCIAL - Trabajo repetitivo: NR': resp.idppsicorepetitivo_tb_nr,
      //   '3PSICOSOCIAL - Trabajo repetitivo: N° EXPUESTOS': resp.idppsicorepetitivo_numpuestos,
      //   '3PSICOSOCIAL - Trabajo repetitivo: OBSERVACIONES': resp.idppsicorepetitivo_observaciones,
      //   /* ----------------------PÚBLICOS------------------- */
      //   /* Públicos - Situación de atraco o robo */
      //   '1PÚBLICOS - Situación de atraco o robo: EFECTOS POSIBLES': resp.idppublicorobo_efectos,
      //   '1PÚBLICOS - Situación de atraco o robo: CONTROL EXISTENTE(FUENTE)': resp.idppublicorobo_ctrlfuente,
      //   '1PÚBLICOS - Situación de atraco o robo: CONTROL EXISTENTE(MEDIO)': resp.idppublicorobo_ctrlmedio,
      //   '1PÚBLICOS - Situación de atraco o robo: CONTROL EXISTENTE(INDIVIDUO)': resp.idppublicorobo_ctrlindividuo,
      //   '1PÚBLICOS - Situación de atraco o robo: ND': resp.idppublicorobo_tb_nd,
      //   '1PÚBLICOS - Situación de atraco o robo: NE': resp.idppublicorobo_tb_ne,
      //   '1PÚBLICOS - Situación de atraco o robo: NP': resp.idppublicorobo_tb_ne,
      //   '1PÚBLICOS - Situación de atraco o robo: INTERPRETACIÓN': resp.idppublicorobo_interpreta,
      //   '1PÚBLICOS - Situación de atraco o robo: NC': resp.idppublicorobo_tb_nc,
      //   '1PÚBLICOS - Situación de atraco o robo: INTERVENCIÓN': resp.idppublicorobo_intervencion,
      //   '1PÚBLICOS - Situación de atraco o robo: NR': resp.idppublicorobo_tb_nr,
      //   '1PÚBLICOS - Situación de atraco o robo: N° EXPUESTOS': resp.idppublicorobo_numpuestos,
      //   '1PÚBLICOS - Situación de atraco o robo: OBSERVACIONES': resp.idppublicorobo_observaciones,
      //   /* Públicos - Terrorismo */
      //   '2PÚBLICOS - Terrorismo: EFECTOS POSIBLES': resp.idppublicoterrorismo_efectos,
      //   '2PÚBLICOS - Terrorismo: CONTROL EXISTENTE(FUENTE)': resp.idppublicoterrorismo_ctrlfuente,
      //   '2PÚBLICOS - Terrorismo: CONTROL EXISTENTE(MEDIO)': resp.idppublicoterrorismo_ctrlmedio,
      //   '2PÚBLICOS - Terrorismo: CONTROL EXISTENTE(INDIVIDUO)': resp.idppublicoterrorismo_ctrlindividuo,
      //   '2PÚBLICOS - Terrorismo: ND': resp.idppublicoterrorismo_tb_nd,
      //   '2PÚBLICOS - Terrorismo: NE': resp.idppublicoterrorismo_tb_ne,
      //   '2PÚBLICOS - Terrorismo: NP': resp.idppublicoterrorismo_tb_ne,
      //   '2PÚBLICOS - Terrorismo: INTERPRETACIÓN': resp.idppublicoterrorismo_interpreta,
      //   '2PÚBLICOS - Terrorismo: NC': resp.idppublicoterrorismo_tb_nc,
      //   '2PÚBLICOS - Terrorismo: INTERVENCIÓN': resp.idppublicoterrorismo_intervencion,
      //   '2PÚBLICOS - Terrorismo: NR': resp.idppublicoterrorismo_tb_nr,
      //   '2PÚBLICOS - Terrorismo: N° EXPUESTOS': resp.idppublicoterrorismo_numpuestos,
      //   '2PÚBLICOS - Terrorismo: OBSERVACIONES': resp.idppublicoterrorismo_observaciones,
      //   /* Públicos - Situación de Agresión fisica */
      //   '3PÚBLICOS - Situación de Agresión fisica: EFECTOS POSIBLES': resp.idppublicoagresion_efectos,
      //   '3PÚBLICOS - Situación de Agresión fisica: CONTROL EXISTENTE(FUENTE)': resp.idppublicoagresion_ctrlfuente,
      //   '3PÚBLICOS - Situación de Agresión fisica: CONTROL EXISTENTE(MEDIO)': resp.idppublicoagresion_ctrlmedio,
      //   '3PÚBLICOS - Situación de Agresión fisica: CONTROL EXISTENTE(INDIVIDUO)': resp.idppublicoagresion_ctrlindividuo,
      //   '3PÚBLICOS - Situación de Agresión fisica: ND': resp.idppublicoagresion_tb_nd,
      //   '3PÚBLICOS - Situación de Agresión fisica: NE': resp.idppublicoagresion_tb_ne,
      //   '3PÚBLICOS - Situación de Agresión fisica: NP': resp.idppublicoagresion_tb_ne,
      //   '3PÚBLICOS - Situación de Agresión fisica: INTERPRETACIÓN': resp.idppublicoagresion_interpreta,
      //   '3PÚBLICOS - Situación de Agresión fisica: NC': resp.idppublicoagresion_tb_nc,
      //   '3PÚBLICOS - Situación de Agresión fisica: INTERVENCIÓN': resp.idppublicoagresion_intervencion,
      //   '3PÚBLICOS - Situación de Agresión fisica: NR': resp.idppublicoagresion_tb_nr,
      //   '3PÚBLICOS - Situación de Agresión fisica: N° EXPUESTOS': resp.idppublicoagresion_numpuestos,
      //   '3PÚBLICOS - Situación de Agresión fisica: OBSERVACIONES': resp.idppublicoagresion_observaciones,
      //   /* Públicos - Situación de asonada */
      //   '4PÚBLICOS - Situación de asonada: EFECTOS POSIBLES': resp.idppublicoasonada_efectos,
      //   '4PÚBLICOS - Situación de asonada: CONTROL EXISTENTE(FUENTE)': resp.idppublicoasonada_ctrlfuente,
      //   '4PÚBLICOS - Situación de asonada: CONTROL EXISTENTE(MEDIO)': resp.idppublicoasonada_ctrlmedio,
      //   '4PÚBLICOS - Situación de asonada: CONTROL EXISTENTE(INDIVIDUO)': resp.idppublicoasonada_ctrlindividuo,
      //   '4PÚBLICOS - Situación de asonada: ND': resp.idppublicoasonada_tb_nd,
      //   '4PÚBLICOS - Situación de asonada: NE': resp.idppublicoasonada_tb_ne,
      //   '4PÚBLICOS - Situación de asonada: NP': resp.idppublicoasonada_tb_ne,
      //   '4PÚBLICOS - Situación de asonada: INTERPRETACIÓN': resp.idppublicoasonada_interpreta,
      //   '4PÚBLICOS - Situación de asonada: NC': resp.idppublicoasonada_tb_nc,
      //   '4PÚBLICOS - Situación de asonada: INTERVENCIÓN': resp.idppublicoasonada_intervencion,
      //   '4PÚBLICOS - Situación de asonada: NR': resp.idppublicoasonada_tb_nr,
      //   '4PÚBLICOS - Situación de asonada: N° EXPUESTOS': resp.idppublicoasonada_numpuestos,
      //   '4PÚBLICOS - Situación de asonada: OBSERVACIONES': resp.idppublicoasonada_observaciones,
      //   /* ----------------------TRANSITO------------------- */
      //   /* Transito - Transporte motocicleta */
      //   '1TRANSITO - Transporte motocicleta: EFECTOS POSIBLES': resp.idptransitomoto_efectos,
      //   '1TRANSITO - Transporte motocicleta: CONTROL EXISTENTE(FUENTE)': resp.idptransitomoto_ctrlfuente,
      //   '1TRANSITO - Transporte motocicleta: CONTROL EXISTENTE(MEDIO)': resp.idptransitomoto_ctrlmedio,
      //   '1TRANSITO - Transporte motocicleta: CONTROL EXISTENTE(INDIVIDUO)': resp.idptransitomoto_ctrlindividuo,
      //   '1TRANSITO - Transporte motocicleta: ND': resp.idptransitomoto_tb_nd,
      //   '1TRANSITO - Transporte motocicleta: NE': resp.idptransitomoto_tb_ne,
      //   '1TRANSITO - Transporte motocicleta: NP': resp.idptransitomoto_tb_ne,
      //   '1TRANSITO - Transporte motocicleta: INTERPRETACIÓN': resp.idptransitomoto_interpreta,
      //   '1TRANSITO - Transporte motocicleta: NC': resp.idptransitomoto_tb_nc,
      //   '1TRANSITO - Transporte motocicleta: INTERVENCIÓN': resp.idptransitomoto_intervencion,
      //   '1TRANSITO - Transporte motocicleta: NR': resp.idptransitomoto_tb_nr,
      //   '1TRANSITO - Transporte motocicleta: N° EXPUESTOS': resp.idptransitomoto_numpuestos,
      //   '1TRANSITO - Transporte motocicleta: OBSERVACIONES': resp.idptransitomoto_observaciones,
      //   /* Transito - Transporte carro / ambulancia */
      //   '2TRANSITO - Transporte carro / ambulancia: EFECTOS POSIBLES': resp.idptransitocarro_efectos,
      //   '2TRANSITO - Transporte carro / ambulancia: CONTROL EXISTENTE(FUENTE)': resp.idptransitocarro_ctrlfuente,
      //   '2TRANSITO - Transporte carro / ambulancia: CONTROL EXISTENTE(MEDIO)': resp.idptransitocarro_ctrlmedio,
      //   '2TRANSITO - Transporte carro / ambulancia: CONTROL EXISTENTE(INDIVIDUO)': resp.idptransitocarro_ctrlindividuo,
      //   '2TRANSITO - Transporte carro / ambulancia: ND': resp.idptransitocarro_tb_nd,
      //   '2TRANSITO - Transporte carro / ambulancia: NE': resp.idptransitocarro_tb_ne,
      //   '2TRANSITO - Transporte carro / ambulancia: NP': resp.idptransitocarro_tb_ne,
      //   '2TRANSITO - Transporte carro / ambulancia: INTERPRETACIÓN': resp.idptransitocarro_interpreta,
      //   '2TRANSITO - Transporte carro / ambulancia: NC': resp.idptransitocarro_tb_nc,
      //   '2TRANSITO - Transporte carro / ambulancia: INTERVENCIÓN': resp.idptransitocarro_intervencion,
      //   '2TRANSITO - Transporte carro / ambulancia: NR': resp.idptransitocarro_tb_nr,
      //   '2TRANSITO - Transporte carro / ambulancia: N° EXPUESTOS': resp.idptransitocarro_numpuestos,
      //   '2TRANSITO - Transporte carro / ambulancia: OBSERVACIONES': resp.idptransitocarro_observaciones,
      //   /* ----------------------QUÍMICOS-------------------- */
      //   /* Químicos - Aerosoles, líquidos, rocíos */
      //   '1QUÍMICOS - Químicos - Aerosoles, líquidos, rocíos: EFECTOS POSIBLES': resp.idpquimicosaerosol_efectos,
      //   '1QUÍMICOS - Químicos - Aerosoles, líquidos, rocíos: CONTROL EXISTENTE(FUENTE)': resp.idpquimicosaerosol_ctrlfuente,
      //   '1QUÍMICOS - Químicos - Aerosoles, líquidos, rocíos: CONTROL EXISTENTE(MEDIO)': resp.idpquimicosaerosol_ctrlmedio,
      //   '1QUÍMICOS - Químicos - Aerosoles, líquidos, rocíos: CONTROL EXISTENTE(INDIVIDUO)': resp.idpquimicosaerosol_ctrlindividuo,
      //   '1QUÍMICOS - Químicos - Aerosoles, líquidos, rocíos: ND': resp.idpquimicosaerosol_tb_nd,
      //   '1QUÍMICOS - Químicos - Aerosoles, líquidos, rocíos: NE': resp.idpquimicosaerosol_tb_ne,
      //   '1QUÍMICOS - Químicos - Aerosoles, líquidos, rocíos: NP': resp.idpquimicosaerosol_tb_ne,
      //   '1QUÍMICOS - Químicos - Aerosoles, líquidos, rocíos: INTERPRETACIÓN': resp.idpquimicosaerosol_interpreta,
      //   '1QUÍMICOS - Químicos - Aerosoles, líquidos, rocíos: NC': resp.idpquimicosaerosol_tb_nc,
      //   '1QUÍMICOS - Químicos - Aerosoles, líquidos, rocíos: INTERVENCIÓN': resp.idpquimicosaerosol_intervencion,
      //   '1QUÍMICOS - Químicos - Aerosoles, líquidos, rocíos: NR': resp.idpquimicosaerosol_tb_nr,
      //   '1QUÍMICOS - Químicos - Aerosoles, líquidos, rocíos: N° EXPUESTOS': resp.idpquimicosaerosol_numpuestos,
      //   '1QUÍMICOS - Químicos - Aerosoles, líquidos, rocíos: OBSERVACIONES': resp.idpquimicosaerosol_observaciones,
      //    /* Químicos - Gases y vapores */
      //   '2QUÍMICOS - Gases y vapores: EFECTOS POSIBLES': resp.idpquimicosgases_efectos,
      //   '2QUÍMICOS - Gases y vapores: CONTROL EXISTENTE(FUENTE)': resp.idpquimicosgases_ctrlfuente,
      //   '2QUÍMICOS - Gases y vapores: CONTROL EXISTENTE(MEDIO)': resp.idpquimicosgases_ctrlmedio,
      //   '2QUÍMICOS - Gases y vapores: CONTROL EXISTENTE(INDIVIDUO)': resp.idpquimicosgases_ctrlindividuo,
      //   '2QUÍMICOS - Gases y vapores: ND': resp.idpquimicosgases_tb_nd,
      //   '2QUÍMICOS - Gases y vapores: NE': resp.idpquimicosgases_tb_ne,
      //   '2QUÍMICOS - Gases y vapores: NP': resp.idpquimicosgases_tb_ne,
      //   '2QUÍMICOS - Gases y vapores: INTERPRETACIÓN': resp.idpquimicosgases_interpreta,
      //   '2QUÍMICOS - Gases y vapores: NC': resp.idpquimicosgases_tb_nc,
      //   '2QUÍMICOS - Gases y vapores: INTERVENCIÓN': resp.idpquimicosgases_intervencion,
      //   '2QUÍMICOS - Gases y vapores: NR': resp.idpquimicosgases_tb_nr,
      //   '2QUÍMICOS - Gases y vapores: N° EXPUESTOS': resp.idpquimicosgases_numpuestos,
      //   '2QUÍMICOS - Gases y vapores: OBSERVACIONES': resp.idpquimicosgases_observaciones,
      //   /* Químicos - Sustancias sólidas (polvos) */
      //   '3QUÍMICOS - Sustancias sólidas (polvos): EFECTOS POSIBLES': resp.idpquimicossustanc_efectos,
      //   '3QUÍMICOS - Sustancias sólidas (polvos): CONTROL EXISTENTE(FUENTE)': resp.idpquimicossustanc_ctrlfuente,
      //   '3QUÍMICOS - Sustancias sólidas (polvos): CONTROL EXISTENTE(MEDIO)': resp.idpquimicossustanc_ctrlmedio,
      //   '3QUÍMICOS - Sustancias sólidas (polvos): CONTROL EXISTENTE(INDIVIDUO)': resp.idpquimicossustanc_ctrlindividuo,
      //   '3QUÍMICOS - Sustancias sólidas (polvos): ND': resp.idpquimicossustanc_tb_nd,
      //   '3QUÍMICOS - Sustancias sólidas (polvos): NE': resp.idpquimicossustanc_tb_ne,
      //   '3QUÍMICOS - Sustancias sólidas (polvos): NP': resp.idpquimicossustanc_tb_ne,
      //   '3QUÍMICOS - Sustancias sólidas (polvos): INTERPRETACIÓN': resp.idpquimicossustanc_interpreta,
      //   '3QUÍMICOS - Sustancias sólidas (polvos): NC': resp.idpquimicossustanc_tb_nc,
      //   '3QUÍMICOS - Sustancias sólidas (polvos): INTERVENCIÓN': resp.idpquimicossustanc_intervencion,
      //   '3QUÍMICOS - Sustancias sólidas (polvos): NR': resp.idpquimicossustanc_tb_nr,
      //   '3QUÍMICOS - Sustancias sólidas (polvos): N° EXPUESTOS': resp.idpquimicossustanc_numpuestos,
      //   '3QUÍMICOS - Sustancias sólidas (polvos): OBSERVACIONES': resp.idpquimicossustanc_observaciones,
      //   /* Químicos - Contacto y/o salpicadura de químicos */
      //   '4QUÍMICOS - Contacto y/o salpicadura de químicos: EFECTOS POSIBLES': resp.idpquimicoscontacto_efectos,
      //   '4QUÍMICOS - Contacto y/o salpicadura de químicos: CONTROL EXISTENTE(FUENTE)': resp.idpquimicoscontacto_ctrlfuente,
      //   '4QUÍMICOS - Contacto y/o salpicadura de químicos: CONTROL EXISTENTE(MEDIO)': resp.idpquimicoscontacto_ctrlmedio,
      //   '4QUÍMICOS - Contacto y/o salpicadura de químicos: CONTROL EXISTENTE(INDIVIDUO)': resp.idpquimicoscontacto_ctrlindividuo,
      //   '4QUÍMICOS - Contacto y/o salpicadura de químicos: ND': resp.idpquimicoscontacto_tb_nd,
      //   '4QUÍMICOS - Contacto y/o salpicadura de químicos: NE': resp.idpquimicoscontacto_tb_ne,
      //   '4QUÍMICOS - Contacto y/o salpicadura de químicos: NP': resp.idpquimicoscontacto_tb_ne,
      //   '4QUÍMICOS - Contacto y/o salpicadura de químicos: INTERPRETACIÓN': resp.idpquimicoscontacto_interpreta,
      //   '4QUÍMICOS - Contacto y/o salpicadura de químicos: NC': resp.idpquimicoscontacto_tb_nc,
      //   '4QUÍMICOS - Contacto y/o salpicadura de químicos: INTERVENCIÓN': resp.idpquimicoscontacto_intervencion,
      //   '4QUÍMICOS - Contacto y/o salpicadura de químicos: NR': resp.idpquimicoscontacto_tb_nr,
      //   '4QUÍMICOS - Contacto y/o salpicadura de químicos: N° EXPUESTOS': resp.idpquimicoscontacto_numpuestos,
      //   '4QUÍMICOS - Contacto y/o salpicadura de químicos: OBSERVACIONES': resp.idpquimicoscontacto_observaciones,
      //   /* ----------------------TAREAS DE ALTO RIESGO------------------- */
      //   /* Tareas de alto riesgo - Trabajo en alturas por encima de 1.50 metros */
      //   '1TAREAS DE ALTO RIESGO - Trabajo en alturas por encima de 1.50 metros: EFECTOS POSIBLES': resp.idptareasalturas_efectos,
      //   '1TAREAS DE ALTO RIESGO - Trabajo en alturas por encima de 1.50 metros: CONTROL EXISTENTE(FUENTE)': resp.idptareasalturas_ctrlfuente,
      //   '1TAREAS DE ALTO RIESGO - Trabajo en alturas por encima de 1.50 metros: CONTROL EXISTENTE(MEDIO)': resp.idptareasalturas_ctrlmedio,
      //   '1TAREAS DE ALTO RIESGO - Trabajo en alturas por encima de 1.50 metros: CONTROL EXISTENTE(INDIVIDUO)': resp.idptareasalturas_ctrlindividuo,
      //   '1TAREAS DE ALTO RIESGO - Trabajo en alturas por encima de 1.50 metros: ND': resp.idptareasalturas_tb_nd,
      //   '1TAREAS DE ALTO RIESGO - Trabajo en alturas por encima de 1.50 metros: NE': resp.idptareasalturas_tb_ne,
      //   '1TAREAS DE ALTO RIESGO - Trabajo en alturas por encima de 1.50 metros: NP': resp.idptareasalturas_tb_ne,
      //   '1TAREAS DE ALTO RIESGO - Trabajo en alturas por encima de 1.50 metros: INTERPRETACIÓN': resp.idptareasalturas_interpreta,
      //   '1TAREAS DE ALTO RIESGO - Trabajo en alturas por encima de 1.50 metros: NC': resp.idptareasalturas_tb_nc,
      //   '1TAREAS DE ALTO RIESGO - Trabajo en alturas por encima de 1.50 metros: INTERVENCIÓN': resp.idptareasalturas_intervencion,
      //   '1TAREAS DE ALTO RIESGO - Trabajo en alturas por encima de 1.50 metros: NR': resp.idptareasalturas_tb_nr,
      //   '1TAREAS DE ALTO RIESGO - Trabajo en alturas por encima de 1.50 metros: N° EXPUESTOS': resp.idptareasalturas_numpuestos,
      //   '1TAREAS DE ALTO RIESGO - Trabajo en alturas por encima de 1.50 metros: OBSERVACIONES': resp.idptareasalturas_observaciones,
      //   /* Tareas de alto riesgo - Trabajo en espacios confinados */
      //   '2TAREAS DE ALTO RIESGO - Trabajo en espacios confinados: EFECTOS POSIBLES': resp.idptareasconfinados_efectos,
      //   '2TAREAS DE ALTO RIESGO - Trabajo en espacios confinados: CONTROL EXISTENTE(FUENTE)': resp.idptareasconfinados_ctrlfuente,
      //   '2TAREAS DE ALTO RIESGO - Trabajo en espacios confinados: CONTROL EXISTENTE(MEDIO)': resp.idptareasconfinados_ctrlmedio,
      //   '2TAREAS DE ALTO RIESGO - Trabajo en espacios confinados: CONTROL EXISTENTE(INDIVIDUO)': resp.idptareasconfinados_ctrlindividuo,
      //   '2TAREAS DE ALTO RIESGO - Trabajo en espacios confinados: ND': resp.idptareasconfinados_tb_nd,
      //   '2TAREAS DE ALTO RIESGO - Trabajo en espacios confinados: NE': resp.idptareasconfinados_tb_ne,
      //   '2TAREAS DE ALTO RIESGO - Trabajo en espacios confinados: NP': resp.idptareasconfinados_tb_ne,
      //   '2TAREAS DE ALTO RIESGO - Trabajo en espacios confinados: INTERPRETACIÓN': resp.idptareasconfinados_interpreta,
      //   '2TAREAS DE ALTO RIESGO - Trabajo en espacios confinados: NC': resp.idptareasconfinados_tb_nc,
      //   '2TAREAS DE ALTO RIESGO - Trabajo en espacios confinados: INTERVENCIÓN': resp.idptareasconfinados_intervencion,
      //   '2TAREAS DE ALTO RIESGO - Trabajo en espacios confinados: NR': resp.idptareasconfinados_tb_nr,
      //   '2TAREAS DE ALTO RIESGO - Trabajo en espacios confinados: N° EXPUESTOS': resp.idptareasconfinados_numpuestos,
      //   '2TAREAS DE ALTO RIESGO - Trabajo en espacios confinados: OBSERVACIONES': resp.idptareasconfinados_observaciones,
      //   /* Tareas de alto riesgo - Trabajo en caliente corte y soldadura */
      //   '3TAREAS DE ALTO RIESGO - Trabajo en caliente corte y soldadura: EFECTOS POSIBLES': resp.idptareassoldadura_efectos,
      //   '3TAREAS DE ALTO RIESGO - Trabajo en caliente corte y soldadura: CONTROL EXISTENTE(FUENTE)': resp.idptareassoldadura_ctrlfuente,
      //   '3TAREAS DE ALTO RIESGO - Trabajo en caliente corte y soldadura: CONTROL EXISTENTE(MEDIO)': resp.idptareassoldadura_ctrlmedio,
      //   '3TAREAS DE ALTO RIESGO - Trabajo en caliente corte y soldadura: CONTROL EXISTENTE(INDIVIDUO)': resp.idptareassoldadura_ctrlindividuo,
      //   '3TAREAS DE ALTO RIESGO - Trabajo en caliente corte y soldadura: ND': resp.idptareassoldadura_tb_nd,
      //   '3TAREAS DE ALTO RIESGO - Trabajo en caliente corte y soldadura: NE': resp.idptareassoldadura_tb_ne,
      //   '3TAREAS DE ALTO RIESGO - Trabajo en caliente corte y soldadura: NP': resp.idptareassoldadura_tb_ne,
      //   '3TAREAS DE ALTO RIESGO - Trabajo en caliente corte y soldadura: INTERPRETACIÓN': resp.idptareassoldadura_interpreta,
      //   '3TAREAS DE ALTO RIESGO - Trabajo en caliente corte y soldadura: NC': resp.idptareassoldadura_tb_nc,
      //   '3TAREAS DE ALTO RIESGO - Trabajo en caliente corte y soldadura: INTERVENCIÓN': resp.idptareassoldadura_intervencion,
      //   '3TAREAS DE ALTO RIESGO - Trabajo en caliente corte y soldadura: NR': resp.idptareassoldadura_tb_nr,
      //   '3TAREAS DE ALTO RIESGO - Trabajo en caliente corte y soldadura: N° EXPUESTOS': resp.idptareassoldadura_numpuestos,
      //   '3TAREAS DE ALTO RIESGO - Trabajo en caliente corte y soldadura: OBSERVACIONES': resp.idptareassoldadura_observaciones,
      //   'OBSERVACIONES':resp.idpampliarobservac

      // }; 
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
        '1 EFECTOS POSIBLES': resp.idpbioderani_efectos,
        '1 CONTROL EXISTENTE(FUENTE)': resp.idpbioderani_ctrlfuente,
        '1 CONTROL EXISTENTE(MEDIO)': resp.idpbioderani_ctrlmedio,
        '1 CONTROL EXISTENTE(INDIVIDUO)': resp.idpbioderani_ctrlindividuo,
        '1 ND': resp.idpbioderani_tb_nd,
        '1 NE': resp.idpbioderani_tb_ne,
        '1 NP': resp.idpbioderani_tb_ne,
        '1 INTERPRETACIÓN': resp.idpbioderani_interpreta,
        '1 NC': resp.idpbioderani_tb_nc,
        '1 INTERVENCIÓN': resp.idpbioderani_intervencion,
        '1 NR': resp.idpbioderani_tb_nr,
        '1 N° EXPUESTOS': resp.idpbioderani_numpuestos,
        '1 OBSERVACIONES': resp.idpbioderani_observaciones,
        /*Biologico - Microorganismos tipo hongo */
        '2 EFECTOS POSIBLES': resp.idpbiohongo_efectos,
        '2 CONTROL EXISTENTE(FUENTE)': resp.idpbiohongo_ctrlfuente,
        '2 CONTROL EXISTENTE(MEDIO)': resp.idpbiohongo_ctrlmedio,
        '2 CONTROL EXISTENTE(INDIVIDUO)': resp.idpbiohongo_ctrlindividuo,
        '2 ND': resp.idpbiohongo_tb_nd,
        '2 NE': resp.idpbiohongo_tb_ne,
        '2 NP': resp.idpbiohongo_tb_ne,
        '2 INTERPRETACIÓN': resp.idpbiohongo_interpreta,
        '2 NC': resp.idpbiohongo_tb_nc,
        '2 INTERVENCIÓN': resp.idpbiohongo_intervencion,
        '2 NR': resp.idpbiohongo_tb_nr,
        '2 N° EXPUESTOS': resp.idpbiohongo_numpuestos,
        '2 OBSERVACIONES': resp.idpbiohongo_observaciones,
        /*Biologico - Microorganismos tipo bacterias */
        '3 EFECTOS POSIBLES': resp.idpbiobacterias_efectos,
        '3 CONTROL EXISTENTE(FUENTE)': resp.idpbiobacterias_ctrlfuente,
        '3 CONTROL EXISTENTE(MEDIO)': resp.idpbiobacterias_ctrlmedio,
        '3 CONTROL EXISTENTE(INDIVIDUO)': resp.idpbiobacterias_ctrlindividuo,
        '3 ND': resp.idpbiobacterias_tb_nd,
        '3 NE': resp.idpbiobacterias_tb_ne,
        '3 NP': resp.idpbiobacterias_tb_ne,
        '3 INTERPRETACIÓN': resp.idpbiobacterias_interpreta,
        '3 NC': resp.idpbiobacterias_tb_nc,
        '3 INTERVENCIÓN': resp.idpbiobacterias_intervencion,
        '3 NR': resp.idpbiobacterias_tb_nr,
        '3 N° EXPUESTOS': resp.idpbiobacterias_numpuestos,
        '3 OBSERVACIONES': resp.idpbiobacterias_observaciones,
        /*Biologico - Microorganismos tipo virus */
        '4 EFECTOS POSIBLES': resp.idpbiovirus_efectos,
        '4 CONTROL EXISTENTE(FUENTE)': resp.idpbiovirus_ctrlfuente,
        '4 CONTROL EXISTENTE(MEDIO)': resp.idpbiovirus_ctrlmedio,
        '4 CONTROL EXISTENTE(INDIVIDUO)': resp.idpbiovirus_ctrlindividuo,
        '4 ND': resp.idpbiovirus_tb_nd,
        '4 NE': resp.idpbiovirus_tb_ne,
        '4 NP': resp.idpbiovirus_tb_ne,
        '4 INTERPRETACIÓN': resp.idpbiovirus_interpreta,
        '4 NC': resp.idpbiovirus_tb_nc,
        '4 INTERVENCIÓN': resp.idpbiovirus_intervencion,
        '4 NR': resp.idpbiovirus_tb_nr,
        '4 N° EXPUESTOS': resp.idpbiovirus_numpuestos,
        '4 OBSERVACIONES': resp.idpbiovirus_observaciones,
        /*Biologico - Parásitos */
        '5 EFECTOS POSIBLES': resp.idpbioparasitos_efectos,
        '5 CONTROL EXISTENTE(FUENTE)': resp.idpbioparasitos_ctrlfuente,
        '5 CONTROL EXISTENTE(MEDIO)': resp.idpbioparasitos_ctrlmedio,
        '5 CONTROL EXISTENTE(INDIVIDUO)': resp.idpbioparasitos_ctrlindividuo,
        '5 ND': resp.idpbioparasitos_tb_nd,
        '5 NE': resp.idpbioparasitos_tb_ne,
        '5 NP': resp.idpbioparasitos_tb_ne,
        '5 INTERPRETACIÓN': resp.idpbioparasitos_interpreta,
        '5 NC': resp.idpbioparasitos_tb_nc,
        '5 INTERVENCIÓN': resp.idpbioparasitos_intervencion,
        '5 NR': resp.idpbioparasitos_tb_nr,
        '5 N° EXPUESTOS': resp.idpbioparasitos_numpuestos,
        '5 OBSERVACIONES': resp.idpbioparasitos_observaciones,
        /* ----------------------CARGA FÍSICA------------------- */
        /* Carga Física - Carga dinámica por esfuerzos */
        '6 EFECTOS POSIBLES': resp.idpcargesfuerzos_efectos,
        '6 CONTROL EXISTENTE(FUENTE)': resp.idpcargesfuerzos_ctrlfuente,
        '6 CONTROL EXISTENTE(MEDIO)': resp.idpcargesfuerzos_ctrlmedio,
        '6 CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargesfuerzos_ctrlindividuo,
        '6 ND': resp.idpcargesfuerzos_tb_nd,
        '6 NE': resp.idpcargesfuerzos_tb_ne,
        '6 NP': resp.idpcargesfuerzos_tb_ne,
        '6 INTERPRETACIÓN': resp.idpcargesfuerzos_interpreta,
        '6 NC': resp.idpcargesfuerzos_tb_nc,
        '6 INTERVENCIÓN': resp.idpcargesfuerzos_intervencion,
        '6 NR': resp.idpcargesfuerzos_tb_nr,
        '6 N° EXPUESTOS': resp.idpcargesfuerzos_numpuestos,
        '6 OBSERVACIONES': resp.idpcargesfuerzos_observaciones,
        /* Carga Física - Carga dinámica por movimientos repetitivos */
        '7 EFECTOS POSIBLES': resp.idpcargmovimiento_efectos,
        '7 CONTROL EXISTENTE(FUENTE)': resp.idpcargmovimiento_ctrlfuente,
        '7 CONTROL EXISTENTE(MEDIO)': resp.idpcargmovimiento_ctrlmedio,
        '7 CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargmovimiento_ctrlindividuo,
        '7 ND': resp.idpcargmovimiento_tb_nd,
        '7 NE': resp.idpcargmovimiento_tb_ne,
        '7 NP': resp.idpcargmovimiento_tb_ne,
        '7 INTERPRETACIÓN': resp.idpcargmovimiento_interpreta,
        '7 NC': resp.idpcargmovimiento_tb_nc,
        '7 INTERVENCIÓN': resp.idpcargmovimiento_intervencion,
        '7 NR': resp.idpcargmovimiento_tb_nr,
        '7 N° EXPUESTOS': resp.idpcargmovimiento_numpuestos,
        '7 OBSERVACIONES': resp.idpcargmovimiento_observaciones,
        /* Carga Física - Carga dinámica por sobreesfuerzos de la voz */
        '8 EFECTOS POSIBLES': resp.idpcargvoz_efectos,
        '8 CONTROL EXISTENTE(FUENTE)': resp.idpcargvoz_ctrlfuente,
        '8 CONTROL EXISTENTE(MEDIO)': resp.idpcargvoz_ctrlmedio,
        '8 CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargvoz_ctrlindividuo,
        '8 ND': resp.idpcargvoz_tb_nd,
        '8 NE': resp.idpcargvoz_tb_ne,
        '8 NP': resp.idpcargvoz_tb_ne,
        '8 INTERPRETACIÓN': resp.idpcargvoz_interpreta,
        '8 NC': resp.idpcargvoz_tb_nc,
        '8 INTERVENCIÓN': resp.idpcargvoz_intervencion,
        '8 NR': resp.idpcargvoz_tb_nr,
        '8 N° EXPUESTOS': resp.idpcargvoz_numpuestos,
        '8 OBSERVACIONES': resp.idpcargvoz_observaciones,
        /* Carga Física - Carga estática de pie */
        '9 EFECTOS POSIBLES': resp.idpcargpie_efectos,
        '9 CONTROL EXISTENTE(FUENTE)': resp.idpcargpie_ctrlfuente,
        '9 CONTROL EXISTENTE(MEDIO)': resp.idpcargpie_ctrlmedio,
        '9 CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargpie_ctrlindividuo,
        '9 ND': resp.idpcargpie_tb_nd,
        '9 NE': resp.idpcargpie_tb_ne,
        '9 NP': resp.idpcargpie_tb_ne,
        '9 INTERPRETACIÓN': resp.idpcargpie_interpreta,
        '9 NC': resp.idpcargpie_tb_nc,
        '9 INTERVENCIÓN': resp.idpcargpie_intervencion,
        '9 NR': resp.idpcargpie_tb_nr,
        '9 N° EXPUESTOS': resp.idpcargpie_numpuestos,
        '9 OBSERVACIONES': resp.idpcargpie_observaciones,
        /* Carga Física - Posiciones prolongadas sentado */
        '10 EFECTOS POSIBLES': resp.idpcargsentado_efectos,
        '10 CONTROL EXISTENTE(FUENTE)': resp.idpcargsentado_ctrlfuente,
        '10 CONTROL EXISTENTE(MEDIO)': resp.idpcargsentado_ctrlmedio,
        '10 CONTROL EXISTENTE(INDIVIDUO)': resp.idpcargsentado_ctrlindividuo,
        '10 ND': resp.idpcargsentado_tb_nd,
        '10 NE': resp.idpcargsentado_tb_ne,
        '10 NP': resp.idpcargsentado_tb_ne,
        '10 INTERPRETACIÓN': resp.idpcargsentado_interpreta,
        '10 NC': resp.idpcargsentado_tb_nc,
        '10 INTERVENCIÓN': resp.idpcargsentado_intervencion,
        '10 NR': resp.idpcargsentado_tb_nr,
        '10 N° EXPUESTOS': resp.idpcargsentado_numpuestos,
        '10 OBSERVACIONES': resp.idpcargsentado_observaciones,
        /* ----------------------ELÉCTRICO------------------- */
        /* Eléctrico - Energía eléctrica de baja */
        '11 EFECTOS POSIBLES': resp.idpelectricobaja_efectos,
        '11 CONTROL EXISTENTE(FUENTE)': resp.idpelectricobaja_ctrlfuente,
        '11 CONTROL EXISTENTE(MEDIO)': resp.idpelectricobaja_ctrlmedio,
        '11 CONTROL EXISTENTE(INDIVIDUO)': resp.idpelectricobaja_ctrlindividuo,
        '11 ND': resp.idpelectricobaja_tb_nd,
        '11 NE': resp.idpelectricobaja_tb_ne,
        '11 NP': resp.idpelectricobaja_tb_ne,
        '11 INTERPRETACIÓN': resp.idpelectricobaja_interpreta,
        '11 NC': resp.idpelectricobaja_tb_nc,
        '11 INTERVENCIÓN': resp.idpelectricobaja_intervencion,
        '11 NR': resp.idpelectricobaja_tb_nr,
        '11 N° EXPUESTOS': resp.idpelectricobaja_numpuestos,
        '11 OBSERVACIONES': resp.idpelectricobaja_observaciones,
        /* Eléctrico - Energía eléctrica de alta */
        '12 EFECTOS POSIBLES': resp.idpelectricoalta_efectos,
        '12 CONTROL EXISTENTE(FUENTE)': resp.idpelectricoalta_ctrlfuente,
        '12 CONTROL EXISTENTE(MEDIO)': resp.idpelectricoalta_ctrlmedio,
        '12 CONTROL EXISTENTE(INDIVIDUO)': resp.idpelectricoalta_ctrlindividuo,
        '12 ND': resp.idpelectricoalta_tb_nd,
        '12 NE': resp.idpelectricoalta_tb_ne,
        '12 NP': resp.idpelectricoalta_tb_ne,
        '12 INTERPRETACIÓN': resp.idpelectricoalta_interpreta,
        '12 NC': resp.idpelectricoalta_tb_nc,
        '12 INTERVENCIÓN': resp.idpelectricoalta_intervencion,
        '12 NR': resp.idpelectricoalta_tb_nr,
        '12 N° EXPUESTOS': resp.idpelectricoalta_numpuestos,
        '12 OBSERVACIONES': resp.idpelectricoalta_observaciones,
        /* Eléctrico - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados */
        '13 EFECTOS POSIBLES': resp.idpelectricocables_efectos,
        '13 CONTROL EXISTENTE(FUENTE)': resp.idpelectricocables_ctrlfuente,
        '13 CONTROL EXISTENTE(MEDIO)': resp.idpelectricocables_ctrlmedio,
        '13 CONTROL EXISTENTE(INDIVIDUO)': resp.idpelectricocables_ctrlindividuo,
        '13 ND': resp.idpelectricocables_tb_nd,
        '13 NE': resp.idpelectricocables_tb_ne,
        '13 NP': resp.idpelectricocables_tb_ne,
        '13 INTERPRETACIÓN': resp.idpelectricocables_interpreta,
        '13 NC': resp.idpelectricocables_tb_nc,
        '13 INTERVENCIÓN': resp.idpelectricocables_intervencion,
        '13 NR': resp.idpelectricocables_tb_nr,
        '13 N° EXPUESTOS': resp.idpelectricocables_numpuestos,
        '13 OBSERVACIONES': resp.idpelectricocables_observaciones,
        /* ----------------------FÍSICO------------------- */
        /* Físico - Iluminación deficiente */
        '14 EFECTOS POSIBLES': resp.idpfisicoilumdef_efectos,
        '14 CONTROL EXISTENTE(FUENTE)': resp.idpfisicoilumdef_ctrlfuente,
        '14 CONTROL EXISTENTE(MEDIO)': resp.idpfisicoilumdef_ctrlmedio,
        '14 CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicoilumdef_ctrlindividuo,
        '14 ND': resp.idpfisicoilumdef_tb_nd,
        '14 NE': resp.idpfisicoilumdef_tb_ne,
        '14 NP': resp.idpfisicoilumdef_tb_ne,
        '14 INTERPRETACIÓN': resp.idpfisicoilumdef_interpreta,
        '14 NC': resp.idpfisicoilumdef_tb_nc,
        '14 INTERVENCIÓN': resp.idpfisicoilumdef_intervencion,
        '14 NR': resp.idpfisicoilumdef_tb_nr,
        '14 N° EXPUESTOS': resp.idpfisicoilumdef_numpuestos,
        '14 OBSERVACIONES': resp.idpfisicoilumdef_observaciones,
        /* Físico - Iluminación en exceso */
        '15 EFECTOS POSIBLES': resp.idpfisicoilumexceso_efectos,
        '15 CONTROL EXISTENTE(FUENTE)': resp.idpfisicoilumexceso_ctrlfuente,
        '15 CONTROL EXISTENTE(MEDIO)': resp.idpfisicoilumexceso_ctrlmedio,
        '15 CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicoilumexceso_ctrlindividuo,
        '15 ND': resp.idpfisicoilumexceso_tb_nd,
        '15 NE': resp.idpfisicoilumexceso_tb_ne,
        '15 NP': resp.idpfisicoilumexceso_tb_ne,
        '15 INTERPRETACIÓN': resp.idpfisicoilumexceso_interpreta,
        '15 NC': resp.idpfisicoilumexceso_tb_nc,
        '15 INTERVENCIÓN': resp.idpfisicoilumexceso_intervencion,
        '15 NR': resp.idpfisicoilumexceso_tb_nr,
        '15 N° EXPUESTOS': resp.idpfisicoilumexceso_numpuestos,
        '15 OBSERVACIONES': resp.idpfisicoilumexceso_observaciones,
        /* Físico - Radiaciones no ionizantes por ultravioleta */
        '16 EFECTOS POSIBLES': resp.idpfisiconoradiaciones_efectos,
        '16 CONTROL EXISTENTE(FUENTE)': resp.idpfisiconoradiaciones_ctrlfuente,
        '16 CONTROL EXISTENTE(MEDIO)': resp.idpfisiconoradiaciones_ctrlmedio,
        '16 CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisiconoradiaciones_ctrlindividuo,
        '16 ND': resp.idpfisiconoradiaciones_tb_nd,
        '16 NE': resp.idpfisiconoradiaciones_tb_ne,
        '16 NP': resp.idpfisiconoradiaciones_tb_ne,
        '16 INTERPRETACIÓN': resp.idpfisiconoradiaciones_interpreta,
        '16 NC': resp.idpfisiconoradiaciones_tb_nc,
        '16 INTERVENCIÓN': resp.idpfisiconoradiaciones_intervencion,
        '16 NR': resp.idpfisiconoradiaciones_tb_nr,
        '16 N° EXPUESTOS': resp.idpfisiconoradiaciones_numpuestos,
        '16 OBSERVACIONES': resp.idpfisiconoradiaciones_observaciones,
        /* Físico - Radiaciones ionizantes */
        '17 EFECTOS POSIBLES': resp.idpfisicoradiaciones_efectos,
        '17 CONTROL EXISTENTE(FUENTE)': resp.idpfisicoradiaciones_ctrlfuente,
        '17 CONTROL EXISTENTE(MEDIO)': resp.idpfisicoradiaciones_ctrlmedio,
        '17 CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicoradiaciones_ctrlindividuo,
        '17 ND': resp.idpfisicoradiaciones_tb_nd,
        '17 NE': resp.idpfisicoradiaciones_tb_ne,
        '17 NP': resp.idpfisicoradiaciones_tb_ne,
        '17 INTERPRETACIÓN': resp.idpfisicoradiaciones_interpreta,
        '17 NC': resp.idpfisicoradiaciones_tb_nc,
        '17 INTERVENCIÓN': resp.idpfisicoradiaciones_intervencion,
        '17 NR': resp.idpfisicoradiaciones_tb_nr,
        '17 N° EXPUESTOS': resp.idpfisicoradiaciones_numpuestos,
        '17 OBSERVACIONES': resp.idpfisicoradiaciones_observaciones,
        /* Físico - Ruido */
        '18 EFECTOS POSIBLES': resp.idpfisicoruido_efectos,
        '18 CONTROL EXISTENTE(FUENTE)': resp.idpfisicoruido_ctrlfuente,
        '18 CONTROL EXISTENTE(MEDIO)': resp.idpfisicoruido_ctrlmedio,
        '18 CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicoruido_ctrlindividuo,
        '18 ND': resp.idpfisicoruido_tb_nd,
        '18 NE': resp.idpfisicoruido_tb_ne,
        '18 NP': resp.idpfisicoruido_tb_ne,
        '18 INTERPRETACIÓN': resp.idpfisicoruido_interpreta,
        '18 NC': resp.idpfisicoruido_tb_nc,
        '18 INTERVENCIÓN': resp.idpfisicoruido_intervencion,
        '18 NR': resp.idpfisicoruido_tb_nr,
        '18 N° EXPUESTOS': resp.idpfisicoruido_numpuestos,
        '18 OBSERVACIONES': resp.idpfisicoruido_observaciones,
        /* Físico - Vibraciones */
        '19 EFECTOS POSIBLES': resp.idpfisicovibraciones_efectos,
        '19 CONTROL EXISTENTE(FUENTE)': resp.idpfisicovibraciones_ctrlfuente,
        '19 CONTROL EXISTENTE(MEDIO)': resp.idpfisicovibraciones_ctrlmedio,
        '19 CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicovibraciones_ctrlindividuo,
        '19 ND': resp.idpfisicovibraciones_tb_nd,
        '19 NE': resp.idpfisicovibraciones_tb_ne,
        '19 NP': resp.idpfisicovibraciones_tb_ne,
        '19 INTERPRETACIÓN': resp.idpfisicovibraciones_interpreta,
        '19 NC': resp.idpfisicovibraciones_tb_nc,
        '19 INTERVENCIÓN': resp.idpfisicovibraciones_intervencion,
        '19 NR': resp.idpfisicovibraciones_tb_nr,
        '19 N° EXPUESTOS': resp.idpfisicovibraciones_numpuestos,
        '19 OBSERVACIONES': resp.idpfisicovibraciones_observaciones,
        /* Físico - Transferencias de temperaturas por calor */
        '20 EFECTOS POSIBLES': resp.idpfisicocalor_efectos,
        '20 CONTROL EXISTENTE(FUENTE)': resp.idpfisicocalor_ctrlfuente,
        '20 CONTROL EXISTENTE(MEDIO)': resp.idpfisicocalor_ctrlmedio,
        '20 CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicocalor_ctrlindividuo,
        '20 ND': resp.idpfisicocalor_tb_nd,
        '20 NE': resp.idpfisicocalor_tb_ne,
        '20 NP': resp.idpfisicocalor_tb_ne,
        '20 INTERPRETACIÓN': resp.idpfisicocalor_interpreta,
        '20 NC': resp.idpfisicocalor_tb_nc,
        '20 INTERVENCIÓN': resp.idpfisicocalor_intervencion,
        '20 NR': resp.idpfisicocalor_tb_nr,
        '20 N° EXPUESTOS': resp.idpfisicocalor_numpuestos,
        '20 OBSERVACIONES': resp.idpfisicocalor_observaciones,
        /* Físico - Transferencias de temperaturas por frio */
        '21 EFECTOS POSIBLES': resp.idpfisicofrio_efectos,
        '21 CONTROL EXISTENTE(FUENTE)': resp.idpfisicofrio_ctrlfuente,
        '21 CONTROL EXISTENTE(MEDIO)': resp.idpfisicofrio_ctrlmedio,
        '21 CONTROL EXISTENTE(INDIVIDUO)': resp.idpfisicofrio_ctrlindividuo,
        '21 ND': resp.idpfisicofrio_tb_nd,
        '21 NE': resp.idpfisicofrio_tb_ne,
        '21 NP': resp.idpfisicofrio_tb_ne,
        '21 INTERPRETACIÓN': resp.idpfisicofrio_interpreta,
        '21 NC': resp.idpfisicofrio_tb_nc,
        '21 INTERVENCIÓN': resp.idpfisicofrio_intervencion,
        '21 NR': resp.idpfisicofrio_tb_nr,
        '21 N° EXPUESTOS': resp.idpfisicofrio_numpuestos,
        '21 OBSERVACIONES': resp.idpfisicofrio_observaciones,
        /* ----------------------INCENDIOS / EXPLOSIONES------------------- */
        /* Incendios / Explosiones - Materiales combustibles */
        '22 EFECTOS POSIBLES': resp.idpincendioscombust_efectos,
        '22 CONTROL EXISTENTE(FUENTE)': resp.idpincendioscombust_ctrlfuente,
        '22 CONTROL EXISTENTE(MEDIO)': resp.idpincendioscombust_ctrlmedio,
        '22 CONTROL EXISTENTE(INDIVIDUO)': resp.idpincendioscombust_ctrlindividuo,
        '22 ND': resp.idpincendioscombust_tb_nd,
        '22 NE': resp.idpincendioscombust_tb_ne,
        '22 NP': resp.idpincendioscombust_tb_ne,
        '22 INTERPRETACIÓN': resp.idpincendioscombust_interpreta,
        '22 NC': resp.idpincendioscombust_tb_nc,
        '22 INTERVENCIÓN': resp.idpincendioscombust_intervencion,
        '22 NR': resp.idpincendioscombust_tb_nr,
        '22 N° EXPUESTOS': resp.idpincendioscombust_numpuestos,
        '22 OBSERVACIONES': resp.idpincendioscombust_observaciones,
        /* Incendios / Explosiones - Ausencia de equipo contra incendio */
        '23 EFECTOS POSIBLES': resp.idpincendiosequipo_efectos,
        '23 CONTROL EXISTENTE(FUENTE)': resp.idpincendiosequipo_ctrlfuente,
        '23 CONTROL EXISTENTE(MEDIO)': resp.idpincendiosequipo_ctrlmedio,
        '23 CONTROL EXISTENTE(INDIVIDUO)': resp.idpincendiosequipo_ctrlindividuo,
        '23 ND': resp.idpincendiosequipo_tb_nd,
        '23 NE': resp.idpincendiosequipo_tb_ne,
        '23 NP': resp.idpincendiosequipo_tb_ne,
        '23 INTERPRETACIÓN': resp.idpincendiosequipo_interpreta,
        '23 NC': resp.idpincendiosequipo_tb_nc,
        '23 INTERVENCIÓN': resp.idpincendiosequipo_intervencion,
        '23 NR': resp.idpincendiosequipo_tb_nr,
        '23 N° EXPUESTOS': resp.idpincendiosequipo_numpuestos,
        '23 OBSERVACIONES': resp.idpincendiosequipo_observaciones,
        /* Incendios / Explosiones - Sustancias inflamables */
        '24 EFECTOS POSIBLES': resp.idpincendiossustancias_efectos,
        '24 CONTROL EXISTENTE(FUENTE)': resp.idpincendiossustancias_ctrlfuente,
        '24 CONTROL EXISTENTE(MEDIO)': resp.idpincendiossustancias_ctrlmedio,
        '24 CONTROL EXISTENTE(INDIVIDUO)': resp.idpincendiossustancias_ctrlindividuo,
        '24 ND': resp.idpincendiossustancias_tb_nd,
        '24 NE': resp.idpincendiossustancias_tb_ne,
        '24 NP': resp.idpincendiossustancias_tb_ne,
        '24 INTERPRETACIÓN': resp.idpincendiossustancias_interpreta,
        '24 NC': resp.idpincendiossustancias_tb_nc,
        '24 INTERVENCIÓN': resp.idpincendiossustancias_intervencion,
        '24 NR': resp.idpincendiossustancias_tb_nr,
        '24 N° EXPUESTOS': resp.idpincendiossustancias_numpuestos,
        '24 OBSERVACIONES': resp.idpincendiossustancias_observaciones,
        /* ----------------------LOCATIVOS------------------- */
        /* Locativos - Pisos defectuosos */
        '25 EFECTOS POSIBLES': resp.idplocativospisos_efectos,
        '25 CONTROL EXISTENTE(FUENTE)': resp.idplocativospisos_ctrlfuente,
        '25 CONTROL EXISTENTE(MEDIO)': resp.idplocativospisos_ctrlmedio,
        '25 CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativospisos_ctrlindividuo,
        '25 ND': resp.idplocativospisos_tb_nd,
        '25 NE': resp.idplocativospisos_tb_ne,
        '25 NP': resp.idplocativospisos_tb_ne,
        '25 INTERPRETACIÓN': resp.idplocativospisos_interpreta,
        '25 NC': resp.idplocativospisos_tb_nc,
        '25 INTERVENCIÓN': resp.idplocativospisos_intervencion,
        '25 NR': resp.idplocativospisos_tb_nr,
        '25 N° EXPUESTOS': resp.idplocativospisos_numpuestos,
        '25 OBSERVACIONES': resp.idplocativospisos_observaciones,
        /* Locativos - Escaleras defectuosas */
        '26 EFECTOS POSIBLES': resp.idplocativosescaleras_efectos,
        '26 CONTROL EXISTENTE(FUENTE)': resp.idplocativosescaleras_ctrlfuente,
        '26 CONTROL EXISTENTE(MEDIO)': resp.idplocativosescaleras_ctrlmedio,
        '26 CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosescaleras_ctrlindividuo,
        '26 ND': resp.idplocativosescaleras_tb_nd,
        '26 NE': resp.idplocativosescaleras_tb_ne,
        '26 NP': resp.idplocativosescaleras_tb_ne,
        '26 INTERPRETACIÓN': resp.idplocativosescaleras_interpreta,
        '26 NC': resp.idplocativosescaleras_tb_nc,
        '26 INTERVENCIÓN': resp.idplocativosescaleras_intervencion,
        '26 NR': resp.idplocativosescaleras_tb_nr,
        '26 N° EXPUESTOS': resp.idplocativosescaleras_numpuestos,
        '26 OBSERVACIONES': resp.idplocativosescaleras_observaciones,
        /* Locativos - Almacenamiento, estanterías en mal estado */
        '27 EFECTOS POSIBLES': resp.idplocativosestanterias_efectos,
        '27 CONTROL EXISTENTE(FUENTE)': resp.idplocativosestanterias_ctrlfuente,
        '27 CONTROL EXISTENTE(MEDIO)': resp.idplocativosestanterias_ctrlmedio,
        '27 CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosestanterias_ctrlindividuo,
        '27 ND': resp.idplocativosestanterias_tb_nd,
        '27 NE': resp.idplocativosestanterias_tb_ne,
        '27 NP': resp.idplocativosestanterias_tb_ne,
        '27 INTERPRETACIÓN': resp.idplocativosestanterias_interpreta,
        '27 NC': resp.idplocativosestanterias_tb_nc,
        '27 INTERVENCIÓN': resp.idplocativosestanterias_intervencion,
        '27 NR': resp.idplocativosestanterias_tb_nr,
        '27 N° EXPUESTOS': resp.idplocativosestanterias_numpuestos,
        '27 OBSERVACIONES': resp.idplocativosestanterias_observaciones,
        /* Locativos - Almacenamiento, arrumes con altura inadecuada */
        '28 EFECTOS POSIBLES': resp.idplocativosarrumes_efectos,
        '28 CONTROL EXISTENTE(FUENTE)': resp.idplocativosarrumes_ctrlfuente,
        '28 CONTROL EXISTENTE(MEDIO)': resp.idplocativosarrumes_ctrlmedio,
        '28 CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosarrumes_ctrlindividuo,
        '28 ND': resp.idplocativosarrumes_tb_nd,
        '28 NE': resp.idplocativosarrumes_tb_ne,
        '28 NP': resp.idplocativosarrumes_tb_ne,
        '28 INTERPRETACIÓN': resp.idplocativosarrumes_interpreta,
        '28 NC': resp.idplocativosarrumes_tb_nc,
        '28 INTERVENCIÓN': resp.idplocativosarrumes_intervencion,
        '28 NR': resp.idplocativosarrumes_tb_nr,
        '28 N° EXPUESTOS': resp.idplocativosarrumes_numpuestos,
        '28 OBSERVACIONES': resp.idplocativosarrumes_observaciones,
        /* Locativos - Señalización y demarcación deficiente, inexistente o inadecuada */
        '29 EFECTOS POSIBLES': resp.idplocativosenalizacion_efectos,
        '29 CONTROL EXISTENTE(FUENTE)': resp.idplocativosenalizacion_ctrlfuente,
        '29 CONTROL EXISTENTE(MEDIO)': resp.idplocativosenalizacion_ctrlmedio,
        '29 CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosenalizacion_ctrlindividuo,
        '29 ND': resp.idplocativosenalizacion_tb_nd,
        '29 NE': resp.idplocativosenalizacion_tb_ne,
        '29 NP': resp.idplocativosenalizacion_tb_ne,
        '29 INTERPRETACIÓN': resp.idplocativosenalizacion_interpreta,
        '29 NC': resp.idplocativosenalizacion_tb_nc,
        '29 INTERVENCIÓN': resp.idplocativosenalizacion_intervencion,
        '29 NR': resp.idplocativosenalizacion_tb_nr,
        '29 N° EXPUESTOS': resp.idplocativosenalizacion_numpuestos,
        '29 OBSERVACIONES': resp.idplocativosenalizacion_observaciones,
        /* Locativos - Falta de orden y aseo */
        '30 EFECTOS POSIBLES': resp.idplocativosaseo_efectos,
        '30 CONTROL EXISTENTE(FUENTE)': resp.idplocativosaseo_ctrlfuente,
        '30 CONTROL EXISTENTE(MEDIO)': resp.idplocativosaseo_ctrlmedio,
        '30 CONTROL EXISTENTE(INDIVIDUO)': resp.idplocativosaseo_ctrlindividuo,
        '30 ND': resp.idplocativosaseo_tb_nd,
        '30 NE': resp.idplocativosaseo_tb_ne,
        '30 NP': resp.idplocativosaseo_tb_ne,
        '30 INTERPRETACIÓN': resp.idplocativosaseo_interpreta,
        '30 NC': resp.idplocativosaseo_tb_nc,
        '30 INTERVENCIÓN': resp.idplocativosaseo_intervencion,
        '30 NR': resp.idplocativosaseo_tb_nr,
        '30 N° EXPUESTOS': resp.idplocativosaseo_numpuestos,
        '30 OBSERVACIONES': resp.idplocativosaseo_observaciones,
        /* ----------------------MECÁNICOS------------------- */
        /* Mecánicos - Utilización de herramientas manuales */
        '31 EFECTOS POSIBLES': resp.idpmecanicoherramient_efectos,
        '31 CONTROL EXISTENTE(FUENTE)': resp.idpmecanicoherramient_ctrlfuente,
        '31 CONTROL EXISTENTE(MEDIO)': resp.idpmecanicoherramient_ctrlmedio,
        '31 CONTROL EXISTENTE(INDIVIDUO)': resp.idpmecanicoherramient_ctrlindividuo,
        '31 ND': resp.idpmecanicoherramient_tb_nd,
        '31 NE': resp.idpmecanicoherramient_tb_ne,
        '31 NP': resp.idpmecanicoherramient_tb_ne,
        '31 INTERPRETACIÓN': resp.idpmecanicoherramient_interpreta,
        '31 NC': resp.idpmecanicoherramient_tb_nc,
        '31 INTERVENCIÓN': resp.idpmecanicoherramient_intervencion,
        '31 NR': resp.idpmecanicoherramient_tb_nr,
        '31 N° EXPUESTOS': resp.idpmecanicoherramient_numpuestos,
        '31 OBSERVACIONES': resp.idpmecanicoherramient_observaciones,
        /* Mecánicos - Superficies cortantes */
        '32 EFECTOS POSIBLES': resp.idpmecanicocortante_efectos,
        '32 CONTROL EXISTENTE(FUENTE)': resp.idpmecanicocortante_ctrlfuente,
        '32 CONTROL EXISTENTE(MEDIO)': resp.idpmecanicocortante_ctrlmedio,
        '32 CONTROL EXISTENTE(INDIVIDUO)': resp.idpmecanicocortante_ctrlindividuo,
        '32 ND': resp.idpmecanicocortante_tb_nd,
        '32 NE': resp.idpmecanicocortante_tb_ne,
        '32 NP': resp.idpmecanicocortante_tb_ne,
        '32 INTERPRETACIÓN': resp.idpmecanicocortante_interpreta,
        '32 NC': resp.idpmecanicocortante_tb_nc,
        '32 INTERVENCIÓN': resp.idpmecanicocortante_intervencion,
        '32 NR': resp.idpmecanicocortante_tb_nr,
        '32 N° EXPUESTOS': resp.idpmecanicocortante_numpuestos,
        '32 OBSERVACIONES': resp.idpmecanicocortante_observaciones,
        /* Mecánicos - Contacto con elementos cortopunzantes */
        '33 EFECTOS POSIBLES': resp.idpmecanicocortopunz_efectos,
        '33 CONTROL EXISTENTE(FUENTE)': resp.idpmecanicocortopunz_ctrlfuente,
        '33 CONTROL EXISTENTE(MEDIO)': resp.idpmecanicocortopunz_ctrlmedio,
        '33 CONTROL EXISTENTE(INDIVIDUO)': resp.idpmecanicocortopunz_ctrlindividuo,
        '33 ND': resp.idpmecanicocortopunz_tb_nd,
        '33 NE': resp.idpmecanicocortopunz_tb_ne,
        '33 NP': resp.idpmecanicocortopunz_tb_ne,
        '33 INTERPRETACIÓN': resp.idpmecanicocortopunz_interpreta,
        '33 NC': resp.idpmecanicocortopunz_tb_nc,
        '33 INTERVENCIÓN': resp.idpmecanicocortopunz_intervencion,
        '33 NR': resp.idpmecanicocortopunz_tb_nr,
        '33 N° EXPUESTOS': resp.idpmecanicocortopunz_numpuestos,
        '33 OBSERVACIONES': resp.idpmecanicocortopunz_observaciones,
        /* Mecánicos - Materiales proyectados sólidos o fluidos */
        '34 EFECTOS POSIBLES': resp.idpmecanicomateriales_efectos,
        '34 CONTROL EXISTENTE(FUENTE)': resp.idpmecanicomateriales_ctrlfuente,
        '34 CONTROL EXISTENTE(MEDIO)': resp.idpmecanicomateriales_ctrlmedio,
        '34 CONTROL EXISTENTE(INDIVIDUO)': resp.idpmecanicomateriales_ctrlindividuo,
        '34 ND': resp.idpmecanicomateriales_tb_nd,
        '34 NE': resp.idpmecanicomateriales_tb_ne,
        '34 NP': resp.idpmecanicomateriales_tb_ne,
        '34 INTERPRETACIÓN': resp.idpmecanicomateriales_interpreta,
        '34 NC': resp.idpmecanicomateriales_tb_nc,
        '34 INTERVENCIÓN': resp.idpmecanicomateriales_intervencion,
        '34 NR': resp.idpmecanicomateriales_tb_nr,
        '34 N° EXPUESTOS': resp.idpmecanicomateriales_numpuestos,
        '34 OBSERVACIONES': resp.idpmecanicomateriales_observaciones,
        /* ----------------------PSICOSOCIAL------------------- */
        /* Psicosocial - Sobrecarga de trabajo */
        '35 EFECTOS POSIBLES': resp.idppsicosobrecarga_efectos,
        '35 CONTROL EXISTENTE(FUENTE)': resp.idppsicosobrecarga_ctrlfuente,
        '35 CONTROL EXISTENTE(MEDIO)': resp.idppsicosobrecarga_ctrlmedio,
        '35 CONTROL EXISTENTE(INDIVIDUO)': resp.idppsicosobrecarga_ctrlindividuo,
        '35 ND': resp.idppsicosobrecarga_tb_nd,
        '35 NE': resp.idppsicosobrecarga_tb_ne,
        '35 NP': resp.idppsicosobrecarga_tb_ne,
        '35 INTERPRETACIÓN': resp.idppsicosobrecarga_interpreta,
        '35 NC': resp.idppsicosobrecarga_tb_nc,
        '35 INTERVENCIÓN': resp.idppsicosobrecarga_intervencion,
        '35 NR': resp.idppsicosobrecarga_tb_nr,
        '35 N° EXPUESTOS': resp.idppsicosobrecarga_numpuestos,
        '35 OBSERVACIONES': resp.idppsicosobrecarga_observaciones,
        /* Psicosocial - Resposanbilidad en el cargo/ manejo de personal */
        '36 EFECTOS POSIBLES': resp.idppsicoresponsabilidad_efectos,
        '36 CONTROL EXISTENTE(FUENTE)': resp.idppsicoresponsabilidad_ctrlfuente,
        '36 CONTROL EXISTENTE(MEDIO)': resp.idppsicoresponsabilidad_ctrlmedio,
        '36 CONTROL EXISTENTE(INDIVIDUO)': resp.idppsicoresponsabilidad_ctrlindividuo,
        '36 ND': resp.idppsicoresponsabilidad_tb_nd,
        '36 NE': resp.idppsicoresponsabilidad_tb_ne,
        '36 NP': resp.idppsicoresponsabilidad_tb_ne,
        '36 INTERPRETACIÓN': resp.idppsicoresponsabilidad_interpreta,
        '36 NC': resp.idppsicoresponsabilidad_tb_nc,
        '36 INTERVENCIÓN': resp.idppsicoresponsabilidad_intervencion,
        '36 NR': resp.idppsicoresponsabilidad_tb_nr,
        '36 N° EXPUESTOS': resp.idppsicoresponsabilidad_numpuestos,
        '36 OBSERVACIONES': resp.idppsicoresponsabilidad_observaciones,
        /* Psicosocial - Trabajo repetitivo */
        '37 EFECTOS POSIBLES': resp.idppsicorepetitivo_efectos,
        '37 CONTROL EXISTENTE(FUENTE)': resp.idppsicorepetitivo_ctrlfuente,
        '37 CONTROL EXISTENTE(MEDIO)': resp.idppsicorepetitivo_ctrlmedio,
        '37 CONTROL EXISTENTE(INDIVIDUO)': resp.idppsicorepetitivo_ctrlindividuo,
        '37 ND': resp.idppsicorepetitivo_tb_nd,
        '37 NE': resp.idppsicorepetitivo_tb_ne,
        '37 NP': resp.idppsicorepetitivo_tb_ne,
        '37 INTERPRETACIÓN': resp.idppsicorepetitivo_interpreta,
        '37 NC': resp.idppsicorepetitivo_tb_nc,
        '37 INTERVENCIÓN': resp.idppsicorepetitivo_intervencion,
        '37 NR': resp.idppsicorepetitivo_tb_nr,
        '37 N° EXPUESTOS': resp.idppsicorepetitivo_numpuestos,
        '37 OBSERVACIONES': resp.idppsicorepetitivo_observaciones,
        /* ----------------------PÚBLICOS------------------- */
        /* Públicos - Situación de atraco o robo */
        '38 EFECTOS POSIBLES': resp.idppublicorobo_efectos,
        '38 CONTROL EXISTENTE(FUENTE)': resp.idppublicorobo_ctrlfuente,
        '38 CONTROL EXISTENTE(MEDIO)': resp.idppublicorobo_ctrlmedio,
        '38 CONTROL EXISTENTE(INDIVIDUO)': resp.idppublicorobo_ctrlindividuo,
        '38 ND': resp.idppublicorobo_tb_nd,
        '38 NE': resp.idppublicorobo_tb_ne,
        '38 NP': resp.idppublicorobo_tb_ne,
        '38 INTERPRETACIÓN': resp.idppublicorobo_interpreta,
        '38 NC': resp.idppublicorobo_tb_nc,
        '38 INTERVENCIÓN': resp.idppublicorobo_intervencion,
        '38 NR': resp.idppublicorobo_tb_nr,
        '38 N° EXPUESTOS': resp.idppublicorobo_numpuestos,
        '38 OBSERVACIONES': resp.idppublicorobo_observaciones,
        /* Públicos - Terrorismo */
        '39 EFECTOS POSIBLES': resp.idppublicoterrorismo_efectos,
        '39 CONTROL EXISTENTE(FUENTE)': resp.idppublicoterrorismo_ctrlfuente,
        '39 CONTROL EXISTENTE(MEDIO)': resp.idppublicoterrorismo_ctrlmedio,
        '39 CONTROL EXISTENTE(INDIVIDUO)': resp.idppublicoterrorismo_ctrlindividuo,
        '39 ND': resp.idppublicoterrorismo_tb_nd,
        '39 NE': resp.idppublicoterrorismo_tb_ne,
        '39 NP': resp.idppublicoterrorismo_tb_ne,
        '39 INTERPRETACIÓN': resp.idppublicoterrorismo_interpreta,
        '39 NC': resp.idppublicoterrorismo_tb_nc,
        '39 INTERVENCIÓN': resp.idppublicoterrorismo_intervencion,
        '39 NR': resp.idppublicoterrorismo_tb_nr,
        '39 N° EXPUESTOS': resp.idppublicoterrorismo_numpuestos,
        '39 OBSERVACIONES': resp.idppublicoterrorismo_observaciones,
        /* Públicos - Situación de Agresión fisica */
        '40 EFECTOS POSIBLES': resp.idppublicoagresion_efectos,
        '40 CONTROL EXISTENTE(FUENTE)': resp.idppublicoagresion_ctrlfuente,
        '40 CONTROL EXISTENTE(MEDIO)': resp.idppublicoagresion_ctrlmedio,
        '40 CONTROL EXISTENTE(INDIVIDUO)': resp.idppublicoagresion_ctrlindividuo,
        '40 ND': resp.idppublicoagresion_tb_nd,
        '40 NE': resp.idppublicoagresion_tb_ne,
        '40 NP': resp.idppublicoagresion_tb_ne,
        '40 INTERPRETACIÓN': resp.idppublicoagresion_interpreta,
        '40 NC': resp.idppublicoagresion_tb_nc,
        '40 INTERVENCIÓN': resp.idppublicoagresion_intervencion,
        '40 NR': resp.idppublicoagresion_tb_nr,
        '40 N° EXPUESTOS': resp.idppublicoagresion_numpuestos,
        '40 OBSERVACIONES': resp.idppublicoagresion_observaciones,
        /* Públicos - Situación de asonada */
        '41 EFECTOS POSIBLES': resp.idppublicoasonada_efectos,
        '41 CONTROL EXISTENTE(FUENTE)': resp.idppublicoasonada_ctrlfuente,
        '41 CONTROL EXISTENTE(MEDIO)': resp.idppublicoasonada_ctrlmedio,
        '41 CONTROL EXISTENTE(INDIVIDUO)': resp.idppublicoasonada_ctrlindividuo,
        '41 ND': resp.idppublicoasonada_tb_nd,
        '41 NE': resp.idppublicoasonada_tb_ne,
        '41 NP': resp.idppublicoasonada_tb_ne,
        '41 INTERPRETACIÓN': resp.idppublicoasonada_interpreta,
        '41 NC': resp.idppublicoasonada_tb_nc,
        '41 INTERVENCIÓN': resp.idppublicoasonada_intervencion,
        '41 NR': resp.idppublicoasonada_tb_nr,
        '41 N° EXPUESTOS': resp.idppublicoasonada_numpuestos,
        '41 OBSERVACIONES': resp.idppublicoasonada_observaciones,
        /* ----------------------TRANSITO------------------- */
        /* Transito - Transporte motocicleta */
        '42 EFECTOS POSIBLES': resp.idptransitomoto_efectos,
        '42 CONTROL EXISTENTE(FUENTE)': resp.idptransitomoto_ctrlfuente,
        '42 CONTROL EXISTENTE(MEDIO)': resp.idptransitomoto_ctrlmedio,
        '42 CONTROL EXISTENTE(INDIVIDUO)': resp.idptransitomoto_ctrlindividuo,
        '42 ND': resp.idptransitomoto_tb_nd,
        '42 NE': resp.idptransitomoto_tb_ne,
        '42 NP': resp.idptransitomoto_tb_ne,
        '42 INTERPRETACIÓN': resp.idptransitomoto_interpreta,
        '42 NC': resp.idptransitomoto_tb_nc,
        '42 INTERVENCIÓN': resp.idptransitomoto_intervencion,
        '42 NR': resp.idptransitomoto_tb_nr,
        '42 N° EXPUESTOS': resp.idptransitomoto_numpuestos,
        '42 OBSERVACIONES': resp.idptransitomoto_observaciones,
        /* Transito - Transporte carro / ambulancia */
        '43 EFECTOS POSIBLES': resp.idptransitocarro_efectos,
        '43 CONTROL EXISTENTE(FUENTE)': resp.idptransitocarro_ctrlfuente,
        '43 CONTROL EXISTENTE(MEDIO)': resp.idptransitocarro_ctrlmedio,
        '43 CONTROL EXISTENTE(INDIVIDUO)': resp.idptransitocarro_ctrlindividuo,
        '43 ND': resp.idptransitocarro_tb_nd,
        '43 NE': resp.idptransitocarro_tb_ne,
        '43 NP': resp.idptransitocarro_tb_ne,
        '43 INTERPRETACIÓN': resp.idptransitocarro_interpreta,
        '43 NC': resp.idptransitocarro_tb_nc,
        '43 INTERVENCIÓN': resp.idptransitocarro_intervencion,
        '43 NR': resp.idptransitocarro_tb_nr,
        '43 N° EXPUESTOS': resp.idptransitocarro_numpuestos,
        '43 OBSERVACIONES': resp.idptransitocarro_observaciones,
        /* ----------------------QUÍMICOS-------------------- */
        /* Químicos - Aerosoles, líquidos, rocíos */
        '44 EFECTOS POSIBLES': resp.idpquimicosaerosol_efectos,
        '44 CONTROL EXISTENTE(FUENTE)': resp.idpquimicosaerosol_ctrlfuente,
        '44 CONTROL EXISTENTE(MEDIO)': resp.idpquimicosaerosol_ctrlmedio,
        '44 CONTROL EXISTENTE(INDIVIDUO)': resp.idpquimicosaerosol_ctrlindividuo,
        '44 ND': resp.idpquimicosaerosol_tb_nd,
        '44 NE': resp.idpquimicosaerosol_tb_ne,
        '44 NP': resp.idpquimicosaerosol_tb_ne,
        '44 INTERPRETACIÓN': resp.idpquimicosaerosol_interpreta,
        '44 NC': resp.idpquimicosaerosol_tb_nc,
        '44 INTERVENCIÓN': resp.idpquimicosaerosol_intervencion,
        '44 NR': resp.idpquimicosaerosol_tb_nr,
        '44 N° EXPUESTOS': resp.idpquimicosaerosol_numpuestos,
        '44 OBSERVACIONES': resp.idpquimicosaerosol_observaciones,
         /* Químicos - Gases y vapores */
        '45 EFECTOS POSIBLES': resp.idpquimicosgases_efectos,
        '45 CONTROL EXISTENTE(FUENTE)': resp.idpquimicosgases_ctrlfuente,
        '45 CONTROL EXISTENTE(MEDIO)': resp.idpquimicosgases_ctrlmedio,
        '45 CONTROL EXISTENTE(INDIVIDUO)': resp.idpquimicosgases_ctrlindividuo,
        '45 ND': resp.idpquimicosgases_tb_nd,
        '45 NE': resp.idpquimicosgases_tb_ne,
        '45 NP': resp.idpquimicosgases_tb_ne,
        '45 INTERPRETACIÓN': resp.idpquimicosgases_interpreta,
        '45 NC': resp.idpquimicosgases_tb_nc,
        '45 INTERVENCIÓN': resp.idpquimicosgases_intervencion,
        '45 NR': resp.idpquimicosgases_tb_nr,
        '45 N° EXPUESTOS': resp.idpquimicosgases_numpuestos,
        '45 OBSERVACIONES': resp.idpquimicosgases_observaciones,
        /* Químicos - Sustancias sólidas (polvos) */
        '46 EFECTOS POSIBLES': resp.idpquimicossustanc_efectos,
        '46 CONTROL EXISTENTE(FUENTE)': resp.idpquimicossustanc_ctrlfuente,
        '46 CONTROL EXISTENTE(MEDIO)': resp.idpquimicossustanc_ctrlmedio,
        '46 CONTROL EXISTENTE(INDIVIDUO)': resp.idpquimicossustanc_ctrlindividuo,
        '46 ND': resp.idpquimicossustanc_tb_nd,
        '46 NE': resp.idpquimicossustanc_tb_ne,
        '46 NP': resp.idpquimicossustanc_tb_ne,
        '46 INTERPRETACIÓN': resp.idpquimicossustanc_interpreta,
        '46 NC': resp.idpquimicossustanc_tb_nc,
        '46 INTERVENCIÓN': resp.idpquimicossustanc_intervencion,
        '46 NR': resp.idpquimicossustanc_tb_nr,
        '46 N° EXPUESTOS': resp.idpquimicossustanc_numpuestos,
        '46 OBSERVACIONES': resp.idpquimicossustanc_observaciones,
        /* Químicos - Contacto y/o salpicadura de químicos */
        '47 EFECTOS POSIBLES': resp.idpquimicoscontacto_efectos,
        '47 CONTROL EXISTENTE(FUENTE)': resp.idpquimicoscontacto_ctrlfuente,
        '47 CONTROL EXISTENTE(MEDIO)': resp.idpquimicoscontacto_ctrlmedio,
        '47 CONTROL EXISTENTE(INDIVIDUO)': resp.idpquimicoscontacto_ctrlindividuo,
        '47 ND': resp.idpquimicoscontacto_tb_nd,
        '47 NE': resp.idpquimicoscontacto_tb_ne,
        '47 NP': resp.idpquimicoscontacto_tb_ne,
        '47 INTERPRETACIÓN': resp.idpquimicoscontacto_interpreta,
        '47 NC': resp.idpquimicoscontacto_tb_nc,
        '47 INTERVENCIÓN': resp.idpquimicoscontacto_intervencion,
        '47 NR': resp.idpquimicoscontacto_tb_nr,
        '47 N° EXPUESTOS': resp.idpquimicoscontacto_numpuestos,
        '47 OBSERVACIONES': resp.idpquimicoscontacto_observaciones,
        /* ----------------------TAREAS DE ALTO RIESGO------------------- */
        /* Tareas de alto riesgo - Trabajo en alturas por encima de 1.50 metros */
        '48 EFECTOS POSIBLES': resp.idptareasalturas_efectos,
        '48 CONTROL EXISTENTE(FUENTE)': resp.idptareasalturas_ctrlfuente,
        '48 CONTROL EXISTENTE(MEDIO)': resp.idptareasalturas_ctrlmedio,
        '48 CONTROL EXISTENTE(INDIVIDUO)': resp.idptareasalturas_ctrlindividuo,
        '48 ND': resp.idptareasalturas_tb_nd,
        '48 NE': resp.idptareasalturas_tb_ne,
        '48 NP': resp.idptareasalturas_tb_ne,
        '48 INTERPRETACIÓN': resp.idptareasalturas_interpreta,
        '48 NC': resp.idptareasalturas_tb_nc,
        '48 INTERVENCIÓN': resp.idptareasalturas_intervencion,
        '48 NR': resp.idptareasalturas_tb_nr,
        '48 N° EXPUESTOS': resp.idptareasalturas_numpuestos,
        '48 OBSERVACIONES': resp.idptareasalturas_observaciones,
        /* Tareas de alto riesgo - Trabajo en espacios confinados */
        '49 EFECTOS POSIBLES': resp.idptareasconfinados_efectos,
        '49 CONTROL EXISTENTE(FUENTE)': resp.idptareasconfinados_ctrlfuente,
        '49 CONTROL EXISTENTE(MEDIO)': resp.idptareasconfinados_ctrlmedio,
        '49 CONTROL EXISTENTE(INDIVIDUO)': resp.idptareasconfinados_ctrlindividuo,
        '49 ND': resp.idptareasconfinados_tb_nd,
        '49 NE': resp.idptareasconfinados_tb_ne,
        '49 NP': resp.idptareasconfinados_tb_ne,
        '49 INTERPRETACIÓN': resp.idptareasconfinados_interpreta,
        '49 NC': resp.idptareasconfinados_tb_nc,
        '49 INTERVENCIÓN': resp.idptareasconfinados_intervencion,
        '49 NR': resp.idptareasconfinados_tb_nr,
        '49 N° EXPUESTOS': resp.idptareasconfinados_numpuestos,
        '49 OBSERVACIONES': resp.idptareasconfinados_observaciones,
        /* Tareas de alto riesgo - Trabajo en caliente corte y soldadura */
        '50 EFECTOS POSIBLES': resp.idptareassoldadura_efectos,
        '50 CONTROL EXISTENTE(FUENTE)': resp.idptareassoldadura_ctrlfuente,
        '50 CONTROL EXISTENTE(MEDIO)': resp.idptareassoldadura_ctrlmedio,
        '50 CONTROL EXISTENTE(INDIVIDUO)': resp.idptareassoldadura_ctrlindividuo,
        '50 ND': resp.idptareassoldadura_tb_nd,
        '50 NE': resp.idptareassoldadura_tb_ne,
        '50 NP': resp.idptareassoldadura_tb_ne,
        '50 INTERPRETACIÓN': resp.idptareassoldadura_interpreta,
        '50 NC': resp.idptareassoldadura_tb_nc,
        '50 INTERVENCIÓN': resp.idptareassoldadura_intervencion,
        '50 NR': resp.idptareassoldadura_tb_nr,
        '50 N° EXPUESTOS': resp.idptareassoldadura_numpuestos,
        '50 OBSERVACIONES': resp.idptareassoldadura_observaciones,
        'OBSERVACIONES':resp.idpampliarobservac

      }; 
    });  

    return arrFinal;
  }

  /*Mensaje Informativo cuando esta seleccionada la empresa */
  showInfo() {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Info', detail:'SELECCIONE UNA EMPRESA'});
  }

  limpiarData(){
    this.msgs = [];
  }

  exportExcel2(excelData) {

    //Title, Header & Data
    // const title = excelData.title;
    const header = excelData.headers
    const data = excelData.data;
    const header2 = ['BIOLOGICO','CARGA FÍSICA','ELÉCTRICO','FÍSICO','INCENDIOS / EXPLOSIONES','LOCATIVOS','MECÁNICOS','PSICOSOCIAL','PÚBLICOS','TRANSITO','QUÍMICOS','TAREAS DE ALTO RIESGO']

    //Blank Row 
    this.worksheet.addRow([]);
    this.worksheet.addRow([]);

    //Add Row and formatting
    /* Titulo - BIOLOGICO*/
    this.fnParamExcelTitle('L2','BX2',header2[0],'Calibri',16);
    /* Titulo - BIOLOGICO: Derivados de origen animal*/
    this.fnParamExcelTitle('L3','X3','Derivados de origen animal','Calibri',13);
    /* Titulo - BIOLOGICO: Microorganismos tipo hongo*/
    this.fnParamExcelTitle('Y3','AK3','Microorganismos tipo hongo','Calibri',13);
    /* Titulo - BIOLOGICO: Microorganismos tipo bacterias*/
    this.fnParamExcelTitle('AL3','AX3','Microorganismos tipo bacterias','Calibri',13);
    /* Titulo - BIOLOGICO: Microorganismos tipo virus*/
    this.fnParamExcelTitle('AY3','BK3','Microorganismos tipo virus','Calibri',13);
    /* Titulo - BIOLOGICO: Parásitos*/
    this.fnParamExcelTitle('BL3','BX3','Parásitos','Calibri',13);

    /* Titulo - CARGA FÍSICA */
    this.fnParamExcelTitle('BY2','EK2',header2[1],'Calibri',16);
    /* Titulo - CARGA FÍSICA : Carga dinámica por esfuerzos*/
    this.fnParamExcelTitle('BY3','CK3','Carga dinámica por esfuerzos','Calibri',13);
    /* Titulo - CARGA FÍSICA : Carga dinámica por movimientos repetitivos*/
    this.fnParamExcelTitle('CL3','CX3','Carga dinámica por movimientos repetitivos','Calibri',13);
    /* Titulo - CARGA FÍSICA : Carga dinámica por sobreesfuerzos de la voz*/
    this.fnParamExcelTitle('CY3','DK3','Carga dinámica por sobreesfuerzos de la voz','Calibri',13);
    /* Titulo - CARGA FÍSICA : Carga estática de pie*/
    this.fnParamExcelTitle('DL3','DX3','Carga estática de pie','Calibri',13);
    /* Titulo - CARGA FÍSICA : Posiciones prolongadas sentado*/
    this.fnParamExcelTitle('DY3','EK3','Posiciones prolongadas sentado','Calibri',13);

    /* Titulo - ELÉCTRICO */
    this.fnParamExcelTitle('EL2','FX2',header2[2],'Calibri',16);
    /* Titulo - ELÉCTRICO : Energía eléctrica de baja*/
    this.fnParamExcelTitle('EL3','EX3','Energía eléctrica de baja','Calibri',13);
    /* Titulo - ELÉCTRICO : Energía eléctrica de alta*/
    this.fnParamExcelTitle('EY3','FK3','Energía eléctrica de alta','Calibri',13);
    /* Titulo - ELÉCTRICO : Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados*/
    this.fnParamExcelTitle('FL3','FX3','Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados','Calibri',13);

    /* Titulo - FÍSICO */
    this.fnParamExcelTitle('FY2','JX2',header2[3],'Calibri',16);
    /* Titulo - FÍSICO : Iluminación deficiente*/
    this.fnParamExcelTitle('FY3','GK3','Iluminación deficiente','Calibri',13);
    /* Titulo - FÍSICO : Iluminación en exceso*/
    this.fnParamExcelTitle('GL3','GX3','Iluminación en exceso','Calibri',13);
    /* Titulo - FÍSICO : Radiaciones no ionizantes por ultravioleta*/
    this.fnParamExcelTitle('GY3','HK3','Radiaciones no ionizantes por ultravioleta','Calibri',13);
    /* Titulo - FÍSICO : Radiaciones ionizantes*/
    this.fnParamExcelTitle('HL3','HX3','Radiaciones ionizantes','Calibri',13);
    /* Titulo - FÍSICO : Ruido*/
    this.fnParamExcelTitle('HY3','IK3','Ruido','Calibri',13);
    /* Titulo - FÍSICO : Vibraciones*/
    this.fnParamExcelTitle('IL3','IX3','Vibraciones','Calibri',13);
    /* Titulo - FÍSICO : Transferencias de temperaturas por calor*/
    this.fnParamExcelTitle('IY3','JK3','Transferencias de temperaturas por calor','Calibri',13);
    /* Titulo - FÍSICO : Transferencias de temperaturas por frio*/
    this.fnParamExcelTitle('JL3','JX3','Transferencias de temperaturas por frio','Calibri',13);

    /* Titulo - INCENDIOS / EXPLOSIONES */
    this.fnParamExcelTitle('JY2','LK2',header2[4],'Calibri',16);
    /* Titulo - INCENDIOS / EXPLOSIONES : Materiales combustibles*/
    this.fnParamExcelTitle('JY3','KK3','Materiales combustibles','Calibri',13);
    /* Titulo - INCENDIOS / EXPLOSIONES : Ausencia de equipo contra incendio*/
    this.fnParamExcelTitle('KL3','KX3','Ausencia de equipo contra incendio','Calibri',13);
    /* Titulo - INCENDIOS / EXPLOSIONES : Sustancias inflamables*/
    this.fnParamExcelTitle('KY3','LK3','Sustancias inflamables','Calibri',13);

    /* Titulo - LOCATIVOS */
    this.fnParamExcelTitle('LL2','OK2',header2[5],'Calibri',16);
    /* Titulo - LOCATIVOS : Pisos defectuosos*/
    this.fnParamExcelTitle('LL3','LX3','Pisos defectuosos','Calibri',13);
    /* Titulo - LOCATIVOS : Escaleras defectuosas*/
    this.fnParamExcelTitle('LY3','MK3','Escaleras defectuosas','Calibri',13);
    /* Titulo - LOCATIVOS :  Almacenamiento, estanterías en mal estado*/
    this.fnParamExcelTitle('ML3','MX3','Almacenamiento, estanterías en mal estado','Calibri',13);
    /* Titulo - LOCATIVOS : Almacenamiento, arrumes con altura inadecuada*/
    this.fnParamExcelTitle('MY3','NK3','Almacenamiento, arrumes con altura inadecuada','Calibri',13);
    /* Titulo - LOCATIVOS : Señalización y demarcación deficiente, inexistente o inadecuad*/
    this.fnParamExcelTitle('NL3','NX3','Señalización y demarcación deficiente, inexistente o inadecuad','Calibri',13);
    /* Titulo - LOCATIVOS : Falta de orden y aseo*/
    this.fnParamExcelTitle('NY3','OK3','Falta de orden y aseo','Calibri',13);

    /* Titulo - MECÁNICOS */
    this.fnParamExcelTitle('OL2','QK2',header2[6],'Calibri',16);
    /* Titulo - MECÁNICOS : Utilización de herramientas manuales*/
    this.fnParamExcelTitle('OL3','OX3','Utilización de herramientas manuales','Calibri',13);
    /* Titulo - MECÁNICOS : Superficies cortantes*/
    this.fnParamExcelTitle('OY3','PK3','Superficies cortantes','Calibri',13);
    /* Titulo - MECÁNICOS : Contacto con elementos cortopunzantes*/
    this.fnParamExcelTitle('PL3','PX3','Contacto con elementos cortopunzantes','Calibri',13);
    /* Titulo - MECÁNICOS : Materiales proyectados sólidos o fluidos*/
    this.fnParamExcelTitle('PY3','QK3','Materiales proyectados sólidos o fluidos','Calibri',13);

    /* Titulo - PSICOSOCIAL */
    this.fnParamExcelTitle('QL2','RX2',header2[7],'Calibri',16);
    /* Titulo - PSICOSOCIAL : Sobrecarga de trabajo*/
    this.fnParamExcelTitle('QL3','QX3','Sobrecarga de trabajo','Calibri',13);
    /* Titulo - PSICOSOCIAL : Resposanbilidad en el cargo/ manejo de personal*/
    this.fnParamExcelTitle('QY3','RK3','Resposanbilidad en el cargo/ manejo de personal','Calibri',13);
    /* Titulo - PSICOSOCIAL : Trabajo repetitivo*/
    this.fnParamExcelTitle('RL3','RX3','Trabajo repetitivo','Calibri',13);

    /* Titulo - PÚBLICOS */
    this.fnParamExcelTitle('RY2','TX2',header2[8],'Calibri',16);
    /* Titulo - PÚBLICOS : Situación de atraco o robo*/
    this.fnParamExcelTitle('RY3','SK3','Situación de atraco o robo','Calibri',13);
    /* Titulo - PÚBLICOS : Terrorismo*/
    this.fnParamExcelTitle('SL3','SX3',' Terrorismo','Calibri',13);
    /* Titulo - PÚBLICOS : Situación de Agresión fisica*/
    this.fnParamExcelTitle('SY3','TK3','Situación de Agresión fisica','Calibri',13);
    /* Titulo - PÚBLICOS :  Situación de asonada*/
    this.fnParamExcelTitle('TL3','TX3',' Situación de asonada','Calibri',13);

    /* Titulo - TRANSITO */
    this.fnParamExcelTitle('TY2','UX2',header2[9],'Calibri',16);
    /* Titulo - TRANSITO :  Transporte motocicleta*/
    this.fnParamExcelTitle('TY3','UK3','Transporte motocicleta','Calibri',13);
    /* Titulo - TRANSITO : Transporte carro / ambulancia*/
    this.fnParamExcelTitle('UL3','UX3','Transporte carro / ambulancia','Calibri',13);

    /* Titulo - QUÍMICOS */
    this.fnParamExcelTitle('UY2','WX2',header2[10],'Calibri',16);
    /* Titulo - QUÍMICOS :  Químicos - Aerosoles, líquidos, rocíos*/
    this.fnParamExcelTitle('UY3','VK3','Químicos - Aerosoles, líquidos, rocíos','Calibri',13);
    /* Titulo - QUÍMICOS : Gases y vapores*/
    this.fnParamExcelTitle('VL3','VX3','Gases y vapores','Calibri',13);
    /* Titulo - QUÍMICOS : Sustancias sólidas (polvos)*/
    this.fnParamExcelTitle('VY3','WK3','Sustancias sólidas (polvos)','Calibri',13);
    /* Titulo - QUÍMICOS : Contacto y/o salpicadura de químicos*/
    this.fnParamExcelTitle('WL3','WX3','Contacto y/o salpicadura de químicos','Calibri',13);

    /* Titulo - TAREAS DE ALTO RIESGO */
    this.fnParamExcelTitle('WY2','YK2',header2[11],'Calibri',16);
    /* Titulo - TAREAS DE ALTO RIESGO :  Trabajo en alturas por encima de 1.50 metros*/
    this.fnParamExcelTitle('WY3','XK3','Trabajo en alturas por encima de 1.50 metros','Calibri',13);
    /* Titulo - TAREAS DE ALTO RIESGO : Trabajo en espacios confinados*/
    this.fnParamExcelTitle('XL3','XX3','Trabajo en espacios confinados','Calibri',13);
    /* Titulo - TAREAS DE ALTO RIESGO : Trabajo en caliente corte y soldadura*/
    this.fnParamExcelTitle('XY3','YK3','Trabajo en caliente corte y soldadura','Calibri',13);

    //Adding Header Row
    let headerRow = this.worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }

      const widthCell = cell.value.toString().length
      this.worksheet.getColumn(number).width = widthCell + 5;
      /*Organización de colores por grupo de datos */
      /*BIOLÓGICO */
      if (number >= 12 && number <= 76) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '008000' },
          bgColor: { argb: '' }
        }
        /*CARGA FÍSICA */
      }else if(number >= 77 && number <= 141){
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'E7B80E' },
          bgColor: { argb: '' }
        }
        /*ELÉCTRICO */
      }else if(number >= 142 && number <= 180){
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'F2F507' },
          bgColor: { argb: '' }
        }
        /*FÍSICA */
      }else if(number >= 181 && number <= 284){
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '2162b0' },
          bgColor: { argb: '' }
        }
        /*INCENDIOS / EXPLOSIONES */
      }else if(number >= 285 && number <= 323){
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'F52707' },
          bgColor: { argb: '' }
        }
        /*LOCATIVOS */
      }else if(number >= 324 && number <= 401){
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '836013' },
          bgColor: { argb: '' }
        }
        /*MECÁNICOS */
      }else if(number >= 402 && number <= 453){
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '4E493E' },
          bgColor: { argb: '' }
        }
        /*PSICOSOCIAL */
      }else if(number >= 454 && number <= 492){
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '8547B3' },
          bgColor: { argb: '' }
        }
        /*PÚBLICOS */
      }else if(number >= 493 && number <= 544){
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '2BD2D5' },
          bgColor: { argb: '' }
        }
        /*TRANSITO */
      }else if(number >= 545 && number <= 570){
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '53DA70' },
          bgColor: { argb: '' }
        }
        /*QUÍMICOS*/
      }else if(number >= 571 && number <= 622){
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'E47BC4' },
          bgColor: { argb: '' }
        }
        /*TAREAS DE ALTO RIESGO */
      }else if(number >= 623 && number <= 661){
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'E37A23' },
          bgColor: { argb: '' }
        }
      }else{
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '4167B8' },
          bgColor: { argb: '' }
        }
      }
      
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }

    })

    // Adding Data with Conditional Formatting
    data.forEach(d => {
      this.worksheet.addRow(d);
    }
    );

    //Generate & Save Excel File
    this.workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `VR_${this.datepipe.transform(this.fechafinal, "yyyy-MM-dd")}` + '.xlsx');
    })

  }

  
  exportToExcel() {

    var dataForExcel = [];

    const dataExcel = this.getCars();

    dataExcel.forEach((row: any) => {
      dataForExcel.push(Object.values(row))
    })

    let reportData = {
      data: dataForExcel,
      headers: Object.keys(dataExcel[0])
    }

    this.exportExcel2(reportData);
  }

  fnParamExcelTitle(cell1:string,cell2:string,title:string,nameFont:string,size:number,){
    this.worksheet.mergeCells(`${cell1}`, `${cell2}`);
    this.worksheet.getCell(`${cell1}`, `${cell2}`).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    let titleRow = this.worksheet.getCell(`${cell1}`);
    titleRow.value = title;
    titleRow.font = {
      name: nameFont,
      size: size,
      bold: true
    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
  }

}
