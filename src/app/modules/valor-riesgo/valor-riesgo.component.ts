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
      return [

        [ 
          [
            '','','','','','','','','','','','',
            resp.idpbioderani_efectos,
            resp.idpbioderani_ctrlfuente,
            resp.idpbioderani_ctrlmedio,
            resp.idpbioderani_ctrlindividuo,
            resp.idpbioderani_tb_nd,
            resp.idpbioderani_tb_ne,
            resp.idpbioderani_tb_np,
            resp.idpbioderani_interpreta,
            resp.idpbioderani_tb_nc,
            resp.idpbioderani_intervencion,
            resp.idpbioderani_tb_nr,
            resp.idpbioderani_numpuestos,
            resp.idpbioderani_observaciones,
          ]
          ,
          [
            '','','','','','','','','','','','',
            resp.idpbiohongo_efectos,
            resp.idpbiohongo_ctrlfuente,
            resp.idpbiohongo_ctrlmedio,
            resp.idpbiohongo_ctrlindividuo,
            resp.idpbiohongo_tb_nd,
            resp.idpbiohongo_tb_ne,
            resp.idpbiohongo_tb_np,
            resp.idpbiohongo_interpreta,
            resp.idpbiohongo_tb_nc,
            resp.idpbiohongo_intervencion,
            resp.idpbiohongo_tb_nr,
            resp.idpbiohongo_numpuestos,
            resp.idpbiohongo_observaciones,
          ],
          [
            '','','','','','','','','','','','',
            resp.idpbiobacterias_efectos,
            resp.idpbiobacterias_ctrlfuente,
            resp.idpbiobacterias_ctrlmedio,
            resp.idpbiobacterias_ctrlindividuo,
            resp.idpbiobacterias_tb_nd,
            resp.idpbiobacterias_tb_ne,
            resp.idpbiobacterias_tb_np,
            resp.idpbiobacterias_interpreta,
            resp.idpbiobacterias_tb_nc,
            resp.idpbiobacterias_intervencion,
            resp.idpbiobacterias_tb_nr,
            resp.idpbiobacterias_numpuestos,
            resp.idpbiobacterias_observaciones,
          ],
          [
            '','','','','','','','','','','','',
            resp.idpbiovirus_efectos,
            resp.idpbiovirus_ctrlfuente,
            resp.idpbiovirus_ctrlmedio,
            resp.idpbiovirus_ctrlindividuo,
            resp.idpbiovirus_tb_nd,
            resp.idpbiovirus_tb_ne,
            resp.idpbiovirus_tb_np,
            resp.idpbiovirus_interpreta,
            resp.idpbiovirus_tb_nc,
            resp.idpbiovirus_intervencion,
            resp.idpbiovirus_tb_nr,
            resp.idpbiovirus_numpuestos,
            resp.idpbiovirus_observaciones,
          ],
          [
            '','','','','','','','','','','','',
            resp.idpbioparasitos_efectos,
            resp.idpbioparasitos_ctrlfuente,
            resp.idpbioparasitos_ctrlmedio,
            resp.idpbioparasitos_ctrlindividuo,
            resp.idpbioparasitos_tb_nd,
            resp.idpbioparasitos_tb_ne,
            resp.idpbioparasitos_tb_np,
            resp.idpbioparasitos_interpreta,
            resp.idpbioparasitos_tb_nc,
            resp.idpbioparasitos_intervencion,
            resp.idpbioparasitos_tb_nr,
            resp.idpbioparasitos_numpuestos,
            resp.idpbioparasitos_observaciones,
          ]
        ],
        /* ----------------------CARGA FÍSICA------------------- */
        [
          [
            /* Carga Física - Carga dinámica por esfuerzos */
            '','','','','','','','','','','','',
            resp.idpcargesfuerzos_efectos,
            resp.idpcargesfuerzos_ctrlfuente,
            resp.idpcargesfuerzos_ctrlmedio,
            resp.idpcargesfuerzos_ctrlindividuo,
            resp.idpcargesfuerzos_tb_nd,
            resp.idpcargesfuerzos_tb_ne,
            resp.idpcargesfuerzos_tb_np,
            resp.idpcargesfuerzos_interpreta,
            resp.idpcargesfuerzos_tb_nc,
            resp.idpcargesfuerzos_intervencion,
            resp.idpcargesfuerzos_tb_nr,
            resp.idpcargesfuerzos_numpuestos,
            resp.idpcargesfuerzos_observaciones,
          ],
          [
            /* Carga Física - Carga dinámica por movimientos repetitivos */
            '','','','','','','','','','','','',
            resp.idpcargmovimiento_efectos,
            resp.idpcargmovimiento_ctrlfuente,
            resp.idpcargmovimiento_ctrlmedio,
            resp.idpcargmovimiento_ctrlindividuo,
            resp.idpcargmovimiento_tb_nd,
            resp.idpcargmovimiento_tb_ne,
            resp.idpcargmovimiento_tb_np,
            resp.idpcargmovimiento_interpreta,
            resp.idpcargmovimiento_tb_nc,
            resp.idpcargmovimiento_intervencion,
            resp.idpcargmovimiento_tb_nr,
            resp.idpcargmovimiento_numpuestos,
            resp.idpcargmovimiento_observaciones,
          ],
          [
            /* Carga Física - Carga dinámica por sobreesfuerzos de la voz */
            '','','','','','','','','','','','',
            resp.idpcargvoz_efectos,
            resp.idpcargvoz_ctrlfuente,
            resp.idpcargvoz_ctrlmedio,
            resp.idpcargvoz_ctrlindividuo,
            resp.idpcargvoz_tb_nd,
            resp.idpcargvoz_tb_ne,
            resp.idpcargvoz_tb_np,
            resp.idpcargvoz_interpreta,
            resp.idpcargvoz_tb_nc,
            resp.idpcargvoz_intervencion,
            resp.idpcargvoz_tb_nr,
            resp.idpcargvoz_numpuestos,
            resp.idpcargvoz_observaciones,
          ],
          [
            /* Carga Física - Carga estática de pie */
            '','','','','','','','','','','','',
            resp.idpcargpie_efectos,
            resp.idpcargpie_ctrlfuente,
            resp.idpcargpie_ctrlmedio,
            resp.idpcargpie_ctrlindividuo,
            resp.idpcargpie_tb_nd,
            resp.idpcargpie_tb_ne,
            resp.idpcargpie_tb_np,
            resp.idpcargpie_interpreta,
            resp.idpcargpie_tb_nc,
            resp.idpcargpie_intervencion,
            resp.idpcargpie_tb_nr,
            resp.idpcargpie_numpuestos,
            resp.idpcargpie_observaciones,
          ],
          [
            /* Carga Física - Posiciones prolongadas sentado */
            '','','','','','','','','','','','',
            resp.idpcargsentado_efectos,
            resp.idpcargsentado_ctrlfuente,
            resp.idpcargsentado_ctrlmedio,
            resp.idpcargsentado_ctrlindividuo,
            resp.idpcargsentado_tb_nd,
            resp.idpcargsentado_tb_ne,
            resp.idpcargsentado_tb_np,
            resp.idpcargsentado_interpreta,
            resp.idpcargsentado_tb_nc,
            resp.idpcargsentado_intervencion,
            resp.idpcargsentado_tb_nr,
            resp.idpcargsentado_numpuestos,
            resp.idpcargsentado_observaciones,
          ] 
        ],
        /* ----------------------ELÉCTRICO------------------- */
        [
          [
             /* Eléctrico - Energía eléctrica de baja */
            '','','','','','','','','','','','',
            resp.idpelectricobaja_efectos,
            resp.idpelectricobaja_ctrlfuente,
            resp.idpelectricobaja_ctrlmedio,
            resp.idpelectricobaja_ctrlindividuo,
            resp.idpelectricobaja_tb_nd,
            resp.idpelectricobaja_tb_ne,
            resp.idpelectricobaja_tb_np,
            resp.idpelectricobaja_interpreta,
            resp.idpelectricobaja_tb_nc,
            resp.idpelectricobaja_intervencion,
            resp.idpelectricobaja_tb_nr,
            resp.idpelectricobaja_numpuestos,
            resp.idpelectricobaja_observaciones,
          ],
          [
             /* Eléctrico - Energía eléctrica de alta */
            '','','','','','','','','','','','',
            resp.idpelectricoalta_efectos,
            resp.idpelectricoalta_ctrlfuente,
            resp.idpelectricoalta_ctrlmedio,
            resp.idpelectricoalta_ctrlindividuo,
            resp.idpelectricoalta_tb_nd,
            resp.idpelectricoalta_tb_ne,
            resp.idpelectricoalta_tb_ne,
            resp.idpelectricoalta_interpreta,
            resp.idpelectricoalta_tb_nc,
            resp.idpelectricoalta_intervencion,
            resp.idpelectricoalta_tb_nr,
            resp.idpelectricoalta_numpuestos,
            resp.idpelectricoalta_observaciones,
          ],
          [
            /* Eléctrico - Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados */
            '','','','','','','','','','','','',
            resp.idpelectricocables_efectos,
            resp.idpelectricocables_ctrlfuente,
            resp.idpelectricocables_ctrlmedio,
            resp.idpelectricocables_ctrlindividuo,
            resp.idpelectricocables_tb_nd,
            resp.idpelectricocables_tb_ne,
            resp.idpelectricocables_tb_ne,
            resp.idpelectricocables_interpreta,
            resp.idpelectricocables_tb_nc,
            resp.idpelectricocables_intervencion,
            resp.idpelectricocables_tb_nr,
            resp.idpelectricocables_numpuestos,
            resp.idpelectricocables_observaciones,
          ]
        ],
        /* ----------------------FÍSICO------------------- */
        [
          [
            /* Físico - Iluminación deficiente */
            '','','','','','','','','','','','',
            resp.idpfisicoilumdef_efectos,
            resp.idpfisicoilumdef_ctrlfuente,
            resp.idpfisicoilumdef_ctrlmedio,
            resp.idpfisicoilumdef_ctrlindividuo,
            resp.idpfisicoilumdef_tb_nd,
            resp.idpfisicoilumdef_tb_ne,
            resp.idpfisicoilumdef_tb_np,
            resp.idpfisicoilumdef_interpreta,
            resp.idpfisicoilumdef_tb_nc,
            resp.idpfisicoilumdef_intervencion,
            resp.idpfisicoilumdef_tb_nr,
            resp.idpfisicoilumdef_numpuestos,
            resp.idpfisicoilumdef_observaciones,
          ],
          [
            /* Físico - Iluminación en exceso */
            '','','','','','','','','','','','',
            resp.idpfisicoilumexceso_efectos,
            resp.idpfisicoilumexceso_ctrlfuente,
            resp.idpfisicoilumexceso_ctrlmedio,
            resp.idpfisicoilumexceso_ctrlindividuo,
            resp.idpfisicoilumexceso_tb_nd,
            resp.idpfisicoilumexceso_tb_ne,
            resp.idpfisicoilumexceso_tb_np,
            resp.idpfisicoilumexceso_interpreta,
            resp.idpfisicoilumexceso_tb_nc,
            resp.idpfisicoilumexceso_intervencion,
            resp.idpfisicoilumexceso_tb_nr,
            resp.idpfisicoilumexceso_numpuestos,
            resp.idpfisicoilumexceso_observaciones,
          ],
          [
            /* Físico - Radiaciones no ionizantes por ultravioleta */
            '','','','','','','','','','','','',
            resp.idpfisiconoradiaciones_efectos,
            resp.idpfisiconoradiaciones_ctrlfuente,
            resp.idpfisiconoradiaciones_ctrlmedio,
            resp.idpfisiconoradiaciones_ctrlindividuo,
            resp.idpfisiconoradiaciones_tb_nd,
            resp.idpfisiconoradiaciones_tb_ne,
            resp.idpfisiconoradiaciones_tb_np,
            resp.idpfisiconoradiaciones_interpreta,
            resp.idpfisiconoradiaciones_tb_nc,
            resp.idpfisiconoradiaciones_intervencion,
            resp.idpfisiconoradiaciones_tb_nr,
            resp.idpfisiconoradiaciones_numpuestos,
            resp.idpfisiconoradiaciones_observaciones,
          ],
          [
            /* Físico - Radiaciones ionizantes */
            '','','','','','','','','','','','',
            resp.idpfisicoradiaciones_efectos,
            resp.idpfisicoradiaciones_ctrlfuente,
            resp.idpfisicoradiaciones_ctrlmedio,
            resp.idpfisicoradiaciones_ctrlindividuo,
            resp.idpfisicoradiaciones_tb_nd,
            resp.idpfisicoradiaciones_tb_ne,
            resp.idpfisicoradiaciones_tb_np,
            resp.idpfisicoradiaciones_interpreta,
            resp.idpfisicoradiaciones_tb_nc,
            resp.idpfisicoradiaciones_intervencion,
            resp.idpfisicoradiaciones_tb_nr,
            resp.idpfisicoradiaciones_numpuestos,
            resp.idpfisicoradiaciones_observaciones,
          ],
          [
            /* Físico - Ruido */
            '','','','','','','','','','','','',
            resp.idpfisicoruido_efectos,
            resp.idpfisicoruido_ctrlfuente,
            resp.idpfisicoruido_ctrlmedio,
            resp.idpfisicoruido_ctrlindividuo,
            resp.idpfisicoruido_tb_nd,
            resp.idpfisicoruido_tb_ne,
            resp.idpfisicoruido_tb_np,
            resp.idpfisicoruido_interpreta,
            resp.idpfisicoruido_tb_nc,
            resp.idpfisicoruido_intervencion,
            resp.idpfisicoruido_tb_nr,
            resp.idpfisicoruido_numpuestos,
            resp.idpfisicoruido_observaciones,
          ],
          [
            /* Físico - Vibraciones */
            '','','','','','','','','','','','',
            resp.idpfisicovibraciones_efectos,
            resp.idpfisicovibraciones_ctrlfuente,
            resp.idpfisicovibraciones_ctrlmedio,
            resp.idpfisicovibraciones_ctrlindividuo,
            resp.idpfisicovibraciones_tb_nd,
            resp.idpfisicovibraciones_tb_ne,
            resp.idpfisicovibraciones_tb_np,
            resp.idpfisicovibraciones_interpreta,
            resp.idpfisicovibraciones_tb_nc,
            resp.idpfisicovibraciones_intervencion,
            resp.idpfisicovibraciones_tb_nr,
            resp.idpfisicovibraciones_numpuestos,
            resp.idpfisicovibraciones_observaciones,
          ],
          [
            /* Físico - Transferencias de temperaturas por calor */
            '','','','','','','','','','','','',
            resp.idpfisicocalor_efectos,
            resp.idpfisicocalor_ctrlfuente,
            resp.idpfisicocalor_ctrlmedio,
            resp.idpfisicocalor_ctrlindividuo,
            resp.idpfisicocalor_tb_nd,
            resp.idpfisicocalor_tb_ne,
            resp.idpfisicocalor_tb_np,
            resp.idpfisicocalor_interpreta,
            resp.idpfisicocalor_tb_nc,
            resp.idpfisicocalor_intervencion,
            resp.idpfisicocalor_tb_nr,
            resp.idpfisicocalor_numpuestos,
            resp.idpfisicocalor_observaciones,
          ],
          [
            /* Físico - Transferencias de temperaturas por frio */
            '','','','','','','','','','','','',
            resp.idpfisicofrio_efectos,
            resp.idpfisicofrio_ctrlfuente,
            resp.idpfisicofrio_ctrlmedio,
            resp.idpfisicofrio_ctrlindividuo,
            resp.idpfisicofrio_tb_nd,
            resp.idpfisicofrio_tb_ne,
            resp.idpfisicofrio_tb_np,
            resp.idpfisicofrio_interpreta,
            resp.idpfisicofrio_tb_nc,
            resp.idpfisicofrio_intervencion,
            resp.idpfisicofrio_tb_nr,
            resp.idpfisicofrio_numpuestos,
            resp.idpfisicofrio_observaciones,
          ]
        ],
        /* ----------------------INCENDIOS / EXPLOSIONES------------------- */
        [
          [
            /* Incendios / Explosiones - Materiales combustibles */
            '','','','','','','','','','','','',
            resp.idpincendioscombust_efectos,
            resp.idpincendioscombust_ctrlfuente,
            resp.idpincendioscombust_ctrlmedio,
            resp.idpincendioscombust_ctrlindividuo,
            resp.idpincendioscombust_tb_nd,
            resp.idpincendioscombust_tb_ne,
            resp.idpincendioscombust_tb_np,
            resp.idpincendioscombust_interpreta,
            resp.idpincendioscombust_tb_nc,
            resp.idpincendioscombust_intervencion,
            resp.idpincendioscombust_tb_nr,
            resp.idpincendioscombust_numpuestos,
            resp.idpincendioscombust_observaciones,
          ],
          [
            /* Incendios / Explosiones - Ausencia de equipo contra incendio */
            '','','','','','','','','','','','',
            resp.idpincendiosequipo_efectos,
            resp.idpincendiosequipo_ctrlfuente,
            resp.idpincendiosequipo_ctrlmedio,
            resp.idpincendiosequipo_ctrlindividuo,
            resp.idpincendiosequipo_tb_nd,
            resp.idpincendiosequipo_tb_ne,
            resp.idpincendiosequipo_tb_np,
            resp.idpincendiosequipo_interpreta,
            resp.idpincendiosequipo_tb_nc,
            resp.idpincendiosequipo_intervencion,
            resp.idpincendiosequipo_tb_nr,
            resp.idpincendiosequipo_numpuestos,
            resp.idpincendiosequipo_observaciones,
          ],
          [
            /* Incendios / Explosiones - Sustancias inflamables */
            '','','','','','','','','','','','',
            resp.idpincendiossustancias_efectos,
            resp.idpincendiossustancias_ctrlfuente,
            resp.idpincendiossustancias_ctrlmedio,
            resp.idpincendiossustancias_ctrlindividuo,
            resp.idpincendiossustancias_tb_nd,
            resp.idpincendiossustancias_tb_ne,
            resp.idpincendiossustancias_tb_np,
            resp.idpincendiossustancias_interpreta,
            resp.idpincendiossustancias_tb_nc,
            resp.idpincendiossustancias_intervencion,
            resp.idpincendiossustancias_tb_nr,
            resp.idpincendiossustancias_numpuestos,
            resp.idpincendiossustancias_observaciones,
          ]
        ],
        /* ----------------------LOCATIVOS------------------- */
        [
          [
            /* Locativos - Pisos defectuosos */
            '','','','','','','','','','','','',
            resp.idplocativospisos_efectos,
            resp.idplocativospisos_ctrlfuente,
            resp.idplocativospisos_ctrlmedio,
            resp.idplocativospisos_ctrlindividuo,
            resp.idplocativospisos_tb_nd,
            resp.idplocativospisos_tb_ne,
            resp.idplocativospisos_tb_np,
            resp.idplocativospisos_interpreta,
            resp.idplocativospisos_tb_nc,
            resp.idplocativospisos_intervencion,
            resp.idplocativospisos_tb_nr,
            resp.idplocativospisos_numpuestos,
            resp.idplocativospisos_observaciones,
          ],
          [
            /* Locativos - Escaleras defectuosas */
            '','','','','','','','','','','','',
            resp.idplocativosescaleras_efectos,
            resp.idplocativosescaleras_ctrlfuente,
            resp.idplocativosescaleras_ctrlmedio,
            resp.idplocativosescaleras_ctrlindividuo,
            resp.idplocativosescaleras_tb_nd,
            resp.idplocativosescaleras_tb_ne,
            resp.idplocativosescaleras_tb_np,
            resp.idplocativosescaleras_interpreta,
            resp.idplocativosescaleras_tb_nc,
            resp.idplocativosescaleras_intervencion,
            resp.idplocativosescaleras_tb_nr,
            resp.idplocativosescaleras_numpuestos,
            resp.idplocativosescaleras_observaciones,
          ],
          [
            /* Locativos - Almacenamiento, estanterías en mal estado */
            '','','','','','','','','','','','',
            resp.idplocativosestanterias_efectos,
            resp.idplocativosestanterias_ctrlfuente,
            resp.idplocativosestanterias_ctrlmedio,
            resp.idplocativosestanterias_ctrlindividuo,
            resp.idplocativosestanterias_tb_nd,
            resp.idplocativosestanterias_tb_ne,
            resp.idplocativosestanterias_tb_np,
            resp.idplocativosestanterias_interpreta,
            resp.idplocativosestanterias_tb_nc,
            resp.idplocativosestanterias_intervencion,
            resp.idplocativosestanterias_tb_nr,
            resp.idplocativosestanterias_numpuestos,
            resp.idplocativosestanterias_observaciones,
          ],
          [
            /* Locativos - Almacenamiento, arrumes con altura inadecuada */
            '','','','','','','','','','','','',
            resp.idplocativosarrumes_efectos,
            resp.idplocativosarrumes_ctrlfuente,
            resp.idplocativosarrumes_ctrlmedio,
            resp.idplocativosarrumes_ctrlindividuo,
            resp.idplocativosarrumes_tb_nd,
            resp.idplocativosarrumes_tb_ne,
            resp.idplocativosarrumes_tb_np,
            resp.idplocativosarrumes_interpreta,
            resp.idplocativosarrumes_tb_nc,
            resp.idplocativosarrumes_intervencion,
            resp.idplocativosarrumes_tb_nr,
            resp.idplocativosarrumes_numpuestos,
            resp.idplocativosarrumes_observaciones,
          ],
          [
            /* Locativos - Señalización y demarcación deficiente, inexistente o inadecuada */
            '','','','','','','','','','','','',
            resp.idplocativosenalizacion_efectos,
            resp.idplocativosenalizacion_ctrlfuente,
            resp.idplocativosenalizacion_ctrlmedio,
            resp.idplocativosenalizacion_ctrlindividuo,
            resp.idplocativosenalizacion_tb_nd,
            resp.idplocativosenalizacion_tb_ne,
            resp.idplocativosenalizacion_tb_np,
            resp.idplocativosenalizacion_interpreta,
            resp.idplocativosenalizacion_tb_nc,
            resp.idplocativosenalizacion_intervencion,
            resp.idplocativosenalizacion_tb_nr,
            resp.idplocativosenalizacion_numpuestos,
            resp.idplocativosenalizacion_observaciones,
          ],
          [
            /* Locativos - Falta de orden y aseo */
            '','','','','','','','','','','','',
            resp.idplocativosaseo_efectos,
            resp.idplocativosaseo_ctrlfuente,
            resp.idplocativosaseo_ctrlmedio,
            resp.idplocativosaseo_ctrlindividuo,
            resp.idplocativosaseo_tb_nd,
            resp.idplocativosaseo_tb_ne,
            resp.idplocativosaseo_tb_np,
            resp.idplocativosaseo_interpreta,
            resp.idplocativosaseo_tb_nc,
            resp.idplocativosaseo_intervencion,
            resp.idplocativosaseo_tb_nr,
            resp.idplocativosaseo_numpuestos,
            resp.idplocativosaseo_observaciones,
          ]
        ],
        /* ----------------------MECÁNICOS------------------- */
        [
          [
            /* Mecánicos - Utilización de herramientas manuales */
            '','','','','','','','','','','','',
            resp.idpmecanicoherramient_efectos,
            resp.idpmecanicoherramient_ctrlfuente,
            resp.idpmecanicoherramient_ctrlmedio,
            resp.idpmecanicoherramient_ctrlindividuo,
            resp.idpmecanicoherramient_tb_nd,
            resp.idpmecanicoherramient_tb_ne,
            resp.idpmecanicoherramient_tb_np,
            resp.idpmecanicoherramient_interpreta,
            resp.idpmecanicoherramient_tb_nc,
            resp.idpmecanicoherramient_intervencion,
            resp.idpmecanicoherramient_tb_nr,
            resp.idpmecanicoherramient_numpuestos,
            resp.idpmecanicoherramient_observaciones,
          ],
          [
            /* Mecánicos - Superficies cortantes */
            '','','','','','','','','','','','',
            resp.idpmecanicocortante_efectos,
            resp.idpmecanicocortante_ctrlfuente,
            resp.idpmecanicocortante_ctrlmedio,
            resp.idpmecanicocortante_ctrlindividuo,
            resp.idpmecanicocortante_tb_nd,
            resp.idpmecanicocortante_tb_ne,
            resp.idpmecanicocortante_tb_np,
            resp.idpmecanicocortante_interpreta,
            resp.idpmecanicocortante_tb_nc,
            resp.idpmecanicocortante_intervencion,
            resp.idpmecanicocortante_tb_nr,
            resp.idpmecanicocortante_numpuestos,
            resp.idpmecanicocortante_observaciones,
          ],
          [
            /* Mecánicos - Contacto con elementos cortopunzantes */
            '','','','','','','','','','','','',
            resp.idpmecanicocortopunz_efectos,
            resp.idpmecanicocortopunz_ctrlfuente,
            resp.idpmecanicocortopunz_ctrlmedio,
            resp.idpmecanicocortopunz_ctrlindividuo,
            resp.idpmecanicocortopunz_tb_nd,
            resp.idpmecanicocortopunz_tb_ne,
            resp.idpmecanicocortopunz_tb_np,
            resp.idpmecanicocortopunz_interpreta,
            resp.idpmecanicocortopunz_tb_nc,
            resp.idpmecanicocortopunz_intervencion,
            resp.idpmecanicocortopunz_tb_nr,
            resp.idpmecanicocortopunz_numpuestos,
            resp.idpmecanicocortopunz_observaciones,
          ],
          [
            /* Mecánicos - Materiales proyectados sólidos o fluidos */
            '','','','','','','','','','','','',
            resp.idpmecanicomateriales_efectos,
            resp.idpmecanicomateriales_ctrlfuente,
            resp.idpmecanicomateriales_ctrlmedio,
            resp.idpmecanicomateriales_ctrlindividuo,
            resp.idpmecanicomateriales_tb_nd,
            resp.idpmecanicomateriales_tb_ne,
            resp.idpmecanicomateriales_tb_np,
            resp.idpmecanicomateriales_interpreta,
            resp.idpmecanicomateriales_tb_nc,
            resp.idpmecanicomateriales_intervencion,
            resp.idpmecanicomateriales_tb_nr,
            resp.idpmecanicomateriales_numpuestos,
            resp.idpmecanicomateriales_observaciones,
          ]
        ],
        /* ----------------------PSICOSOCIAL------------------- */
        [
          [
            /* Psicosocial - Sobrecarga de trabajo */
            '','','','','','','','','','','','',
            resp.idppsicosobrecarga_efectos,
            resp.idppsicosobrecarga_ctrlfuente,
            resp.idppsicosobrecarga_ctrlmedio,
            resp.idppsicosobrecarga_ctrlindividuo,
            resp.idppsicosobrecarga_tb_nd,
            resp.idppsicosobrecarga_tb_ne,
            resp.idppsicosobrecarga_tb_np,
            resp.idppsicosobrecarga_interpreta,
            resp.idppsicosobrecarga_tb_nc,
            resp.idppsicosobrecarga_intervencion,
            resp.idppsicosobrecarga_tb_nr,
            resp.idppsicosobrecarga_numpuestos,
            resp.idppsicosobrecarga_observaciones,
          ],
          [
            /* Psicosocial - Resposanbilidad en el cargo/ manejo de personal */
            '','','','','','','','','','','','',
            resp.idppsicoresponsabilidad_efectos,
            resp.idppsicoresponsabilidad_ctrlfuente,
            resp.idppsicoresponsabilidad_ctrlmedio,
            resp.idppsicoresponsabilidad_ctrlindividuo,
            resp.idppsicoresponsabilidad_tb_nd,
            resp.idppsicoresponsabilidad_tb_ne,
            resp.idppsicoresponsabilidad_tb_np,
            resp.idppsicoresponsabilidad_interpreta,
            resp.idppsicoresponsabilidad_tb_nc,
            resp.idppsicoresponsabilidad_intervencion,
            resp.idppsicoresponsabilidad_tb_nr,
            resp.idppsicoresponsabilidad_numpuestos,
            resp.idppsicoresponsabilidad_observaciones,
          ],
          [
            /* Psicosocial - Trabajo repetitivo */
            '','','','','','','','','','','','',
            resp.idppsicorepetitivo_efectos,
            resp.idppsicorepetitivo_ctrlfuente,
            resp.idppsicorepetitivo_ctrlmedio,
            resp.idppsicorepetitivo_ctrlindividuo,
            resp.idppsicorepetitivo_tb_nd,
            resp.idppsicorepetitivo_tb_ne,
            resp.idppsicorepetitivo_tb_np,
            resp.idppsicorepetitivo_interpreta,
            resp.idppsicorepetitivo_tb_nc,
            resp.idppsicorepetitivo_intervencion,
            resp.idppsicorepetitivo_tb_nr,
            resp.idppsicorepetitivo_numpuestos,
            resp.idppsicorepetitivo_observaciones,
          ]
        ],
        /* ----------------------PÚBLICOS------------------- */
        [
          [
            /* Públicos - Situación de atraco o robo */
            '','','','','','','','','','','','',
            resp.idppublicorobo_efectos,
            resp.idppublicorobo_ctrlfuente,
            resp.idppublicorobo_ctrlmedio,
            resp.idppublicorobo_ctrlindividuo,
            resp.idppublicorobo_tb_nd,
            resp.idppublicorobo_tb_ne,
            resp.idppublicorobo_tb_np,
            resp.idppublicorobo_interpreta,
            resp.idppublicorobo_tb_nc,
            resp.idppublicorobo_intervencion,
            resp.idppublicorobo_tb_nr,
            resp.idppublicorobo_numpuestos,
            resp.idppublicorobo_observaciones,
          ],
          [
            /* Públicos - Terrorismo */
            '','','','','','','','','','','','',
            resp.idppublicoterrorismo_efectos,
            resp.idppublicoterrorismo_ctrlfuente,
            resp.idppublicoterrorismo_ctrlmedio,
            resp.idppublicoterrorismo_ctrlindividuo,
            resp.idppublicoterrorismo_tb_nd,
            resp.idppublicoterrorismo_tb_ne,
            resp.idppublicoterrorismo_tb_np,
            resp.idppublicoterrorismo_interpreta,
            resp.idppublicoterrorismo_tb_nc,
            resp.idppublicoterrorismo_intervencion,
            resp.idppublicoterrorismo_tb_nr,
            resp.idppublicoterrorismo_numpuestos,
            resp.idppublicoterrorismo_observaciones,
          ],
          [
            /* Públicos - Situación de Agresión fisica */
            '','','','','','','','','','','','',
            resp.idppublicoagresion_efectos,
            resp.idppublicoagresion_ctrlfuente,
            resp.idppublicoagresion_ctrlmedio,
            resp.idppublicoagresion_ctrlindividuo,
            resp.idppublicoagresion_tb_nd,
            resp.idppublicoagresion_tb_ne,
            resp.idppublicoagresion_tb_np,
            resp.idppublicoagresion_interpreta,
            resp.idppublicoagresion_tb_nc,
            resp.idppublicoagresion_intervencion,
            resp.idppublicoagresion_tb_nr,
            resp.idppublicoagresion_numpuestos,
            resp.idppublicoagresion_observaciones,
          ],
          [
            /* Públicos - Situación de asonada */
            '','','','','','','','','','','','',
            resp.idppublicoasonada_efectos,
            resp.idppublicoasonada_ctrlfuente,
            resp.idppublicoasonada_ctrlmedio,
            resp.idppublicoasonada_ctrlindividuo,
            resp.idppublicoasonada_tb_nd,
            resp.idppublicoasonada_tb_ne,
            resp.idppublicoasonada_tb_np,
            resp.idppublicoasonada_interpreta,
            resp.idppublicoasonada_tb_nc,
            resp.idppublicoasonada_intervencion,
            resp.idppublicoasonada_tb_nr,
            resp.idppublicoasonada_numpuestos,
            resp.idppublicoasonada_observaciones,
          ]
        ],
        /* ----------------------TRANSITO------------------- */
        [
          [
            /* Transito - Transporte motocicleta */
            '','','','','','','','','','','','',
            resp.idptransitomoto_efectos,
            resp.idptransitomoto_ctrlfuente,
            resp.idptransitomoto_ctrlmedio,
            resp.idptransitomoto_ctrlindividuo,
            resp.idptransitomoto_tb_nd,
            resp.idptransitomoto_tb_ne,
            resp.idptransitomoto_tb_np,
            resp.idptransitomoto_interpreta,
            resp.idptransitomoto_tb_nc,
            resp.idptransitomoto_intervencion,
            resp.idptransitomoto_tb_nr,
            resp.idptransitomoto_numpuestos,
            resp.idptransitomoto_observaciones,
          ],
          [
            /* Transito - Transporte carro / ambulancia */
            '','','','','','','','','','','','',
            resp.idptransitocarro_efectos,
            resp.idptransitocarro_ctrlfuente,
            resp.idptransitocarro_ctrlmedio,
            resp.idptransitocarro_ctrlindividuo,
            resp.idptransitocarro_tb_nd,
            resp.idptransitocarro_tb_ne,
            resp.idptransitocarro_tb_np,
            resp.idptransitocarro_interpreta,
            resp.idptransitocarro_tb_nc,
            resp.idptransitocarro_intervencion,
            resp.idptransitocarro_tb_nr,
            resp.idptransitocarro_numpuestos,
            resp.idptransitocarro_observaciones,
          ]
        ],
        /* ----------------------QUÍMICOS-------------------- */
        [
          [
            /* Químicos - Aerosoles, líquidos, rocíos */
            '','','','','','','','','','','','',
            resp.idpquimicosaerosol_efectos,
            resp.idpquimicosaerosol_ctrlfuente,
            resp.idpquimicosaerosol_ctrlmedio,
            resp.idpquimicosaerosol_ctrlindividuo,
            resp.idpquimicosaerosol_tb_nd,
            resp.idpquimicosaerosol_tb_ne,
            resp.idpquimicosaerosol_tb_np,
            resp.idpquimicosaerosol_interpreta,
            resp.idpquimicosaerosol_tb_nc,
            resp.idpquimicosaerosol_intervencion,
            resp.idpquimicosaerosol_tb_nr,
            resp.idpquimicosaerosol_numpuestos,
            resp.idpquimicosaerosol_observaciones,
          ],
          [
            /* Químicos - Gases y vapores */
            '','','','','','','','','','','','',
            resp.idpquimicosgases_efectos,
            resp.idpquimicosgases_ctrlfuente,
            resp.idpquimicosgases_ctrlmedio,
            resp.idpquimicosgases_ctrlindividuo,
            resp.idpquimicosgases_tb_nd,
            resp.idpquimicosgases_tb_ne,
            resp.idpquimicosgases_tb_np,
            resp.idpquimicosgases_interpreta,
            resp.idpquimicosgases_tb_nc,
            resp.idpquimicosgases_intervencion,
            resp.idpquimicosgases_tb_nr,
            resp.idpquimicosgases_numpuestos,
            resp.idpquimicosgases_observaciones,
          ],
          [
            /* Químicos - Sustancias sólidas (polvos) */
            '','','','','','','','','','','','',
            resp.idpquimicossustanc_efectos,
            resp.idpquimicossustanc_ctrlfuente,
            resp.idpquimicossustanc_ctrlmedio,
            resp.idpquimicossustanc_ctrlindividuo,
            resp.idpquimicossustanc_tb_nd,
            resp.idpquimicossustanc_tb_ne,
            resp.idpquimicossustanc_tb_np,
            resp.idpquimicossustanc_interpreta,
            resp.idpquimicossustanc_tb_nc,
            resp.idpquimicossustanc_intervencion,
            resp.idpquimicossustanc_tb_nr,
            resp.idpquimicossustanc_numpuestos,
            resp.idpquimicossustanc_observaciones,
          ],
          [
            /* Químicos - Contacto y/o salpicadura de químicos */
            '','','','','','','','','','','','',
            resp.idpquimicoscontacto_efectos,
            resp.idpquimicoscontacto_ctrlfuente,
            resp.idpquimicoscontacto_ctrlmedio,
            resp.idpquimicoscontacto_ctrlindividuo,
            resp.idpquimicoscontacto_tb_nd,
            resp.idpquimicoscontacto_tb_ne,
            resp.idpquimicoscontacto_tb_np,
            resp.idpquimicoscontacto_interpreta,
            resp.idpquimicoscontacto_tb_nc,
            resp.idpquimicoscontacto_intervencion,
            resp.idpquimicoscontacto_tb_nr,
            resp.idpquimicoscontacto_numpuestos,
            resp.idpquimicoscontacto_observaciones,
          ]
        ],
        /* ----------------------TAREAS DE ALTO RIESGO------------------- */
        [
          [
            /* Tareas de alto riesgo - Trabajo en alturas por encima de 1.50 metros */
            '','','','','','','','','','','','',
            resp.idptareasalturas_efectos,
            resp.idptareasalturas_ctrlfuente,
            resp.idptareasalturas_ctrlmedio,
            resp.idptareasalturas_ctrlindividuo,
            resp.idptareasalturas_tb_nd,
            resp.idptareasalturas_tb_ne,
            resp.idptareasalturas_tb_np,
            resp.idptareasalturas_interpreta,
            resp.idptareasalturas_tb_nc,
            resp.idptareasalturas_intervencion,
            resp.idptareasalturas_tb_nr,
            resp.idptareasalturas_numpuestos,
            resp.idptareasalturas_observaciones,
          ],
          [
            /* Tareas de alto riesgo - Trabajo en espacios confinados */
            '','','','','','','','','','','','',
            resp.idptareasconfinados_efectos,
            resp.idptareasconfinados_ctrlfuente,
            resp.idptareasconfinados_ctrlmedio,
            resp.idptareasconfinados_ctrlindividuo,
            resp.idptareasconfinados_tb_nd,
            resp.idptareasconfinados_tb_ne,
            resp.idptareasconfinados_tb_np,
            resp.idptareasconfinados_interpreta,
            resp.idptareasconfinados_tb_nc,
            resp.idptareasconfinados_intervencion,
            resp.idptareasconfinados_tb_nr,
            resp.idptareasconfinados_numpuestos,
            resp.idptareasconfinados_observaciones,
          ],
          [
            /* Tareas de alto riesgo - Trabajo en caliente corte y soldadura */
            '','','','','','','','','','','','',
            resp.idptareassoldadura_efectos,
            resp.idptareassoldadura_ctrlfuente,
            resp.idptareassoldadura_ctrlmedio,
            resp.idptareassoldadura_ctrlindividuo,
            resp.idptareassoldadura_tb_nd,
            resp.idptareassoldadura_tb_ne,
            resp.idptareassoldadura_tb_np,
            resp.idptareassoldadura_interpreta,
            resp.idptareassoldadura_tb_nc,
            resp.idptareassoldadura_intervencion,
            resp.idptareassoldadura_tb_nr,
            resp.idptareassoldadura_numpuestos,
            resp.idptareassoldadura_observaciones,
          ]
        ]

      ];
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

  exportExcel2(excelData:any) {
    /* Tenemos dos clases de titulos unos para referenciar las categorias y los otros headers o cabeceras es para identificar donde se asignara la información */
    const header = excelData.headers
    const data = excelData.data;
    /*Creación del libro de Excel */
    this.workbook = new Workbook();
    /*Creación de la pagina y asignación del libro de Excel */
    this.worksheet = this.workbook.addWorksheet(sessionStorage.getItem('nombreEmpresa'));
  
    //Title, Header & Data
    // const title = excelData.title;
    // console.log("DATA", data);
    
    //Blank Row 
    /*Agrega filas en blanco */
    this.worksheet.addRow([]);

    /*Se toma  las celdas a combinar */
    this.worksheet.mergeCells(`N1`, `P1`);
    /* Asigna estilos a la celda combinada según lo que queremos en el titulo */
    let titleRow = this.worksheet.getCell(`N1`);
    /*Toma el valor del titulo */
    titleRow.value = 'CONTROL EXISTENTE';
    /*Cambia los valores de estilo de las fuentes */
    titleRow.font = {
      name: 'calibri',
      size: 12,
      bold: true
    }

    titleRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'A7ACA7' },
            bgColor: { argb: '' }
    }

    /*Alinea el titulo y lo centra en la celda combinada */
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
    /*Se asigna el borde a la celdas correspondientes */
    this.worksheet.getCell(`N1`, `P1`).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }

    //Adding Header Row
    /*Se crea la fila con los titulos */
    let headerRow = this.worksheet.addRow(header);
    /*Cabecera que tendra todos los titulos y se asignara la información  */

    headerRow.eachCell((cell, number) => {
      /*Asigna el ancho de la celda según la longitud de los datos de forma relativa */
      const widthCell = cell.value.toString().length;

      if (number === 12) {
        this.worksheet.getColumn(number).width = 70;
      }else{
        this.worksheet.getColumn(number).width = widthCell + 5;
      }
       /*Segun la columna correspondiente asigna el ancho de la celda y se le suma 5 para controlar el espaciado en las celdas */
      
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }

      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'A7ACA7' },
        bgColor: { argb: '' }
      }

      cell.font = {
        name: 'calibri',
        size: 12,
        bold: true
      }

      /*Alinea el titulo y lo centra en la celda combinada */
      cell.alignment = { vertical: 'middle', horizontal: 'center' }

    });
    
    for (let j = 0; j < data.length; j++) {
      
      for (let i = 0; i < data[j].length; i++) {
        
        data[j][i].forEach(element => {
            this.worksheet.addRow(element);
        });
        
      }
      if (j === 0) {
        this.worksheet.mergeCells('A3:A52');
        this.worksheet.getCell('A3').value = this.vrData[j].idpareanombre;
        this.worksheet.getCell('A3').alignment = { vertical: 'middle', horizontal: 'center' };

        this.worksheet.mergeCells('B3:B52');
        this.worksheet.getCell('B3').value = this.vrData[0].idpnombre;
        this.worksheet.getCell('B3').alignment = { vertical: 'middle', horizontal: 'center' };
    
        this.worksheet.mergeCells('C3:C52');
        this.worksheet.getCell('C3').value = this.vrData[0].idpcedula;
        this.worksheet.getCell('C3').alignment = { vertical: 'middle', horizontal: 'center' };
    
        this.worksheet.mergeCells('D3:D52');
        this.worksheet.getCell('D3').value = this.vrData[0].idptelefono;
        this.worksheet.getCell('D3').alignment = { vertical: 'middle', horizontal: 'center' };
    
        this.worksheet.mergeCells('E3:E52');
        this.worksheet.getCell('E3').value = this.vrData[0].idpsede;
        this.worksheet.getCell('E3').alignment = { vertical: 'middle', horizontal: 'center' };
    
        this.worksheet.mergeCells('F3:F52');
        this.worksheet.getCell('F3').value = '';
    
        this.worksheet.mergeCells('G3:G52');
        this.worksheet.getCell('G3').value = '';
    
        this.worksheet.mergeCells('H3:H52');
        this.worksheet.getCell('H3').value = '';
    
        this.worksheet.mergeCells('I3:I52');
        this.worksheet.getCell('I3').value = '';
    
        this.worksheet.mergeCells('J3:J52');
        this.worksheet.getCell('J3').value = '';
    
        /*FACTORES DE RIESGO */
        /*BIOLOGICO */
        this.fnParamExcelTitle('K3','K7','BIOLÓGICO','calibri',10,'008000');
        this.fnParamBorderTitle('L3','Derivados de origen animal');
        this.fnParamBorderTitle('L4','Microorganismos tipo hongo');
        this.fnParamBorderTitle('L5','Microorganismos tipo bacterias');
        this.fnParamBorderTitle('L6','Microorganismos tipo virus');
        this.fnParamBorderTitle('L7','Parásitos');
        
        /*CARGA FISICA */
        this.fnParamExcelTitle('K8','K12','CARGA FÍSICA','calibri',10,'E7B80E');
        this.fnParamBorderTitle('L8', 'Carga dinámica por esfuerzos (manejos o traslado de cargas)');
        this.fnParamBorderTitle('L9','Carga dinámica por movimientos repetitivos');
        this.fnParamBorderTitle('L10','Carga dinámica por sobreesfuerzos de la voz');
        this.fnParamBorderTitle('L11','Carga estática de pie');
        this.fnParamBorderTitle('L12','Posiciones prolongadas sentado');
        /*ELECTRICO */
        this.fnParamExcelTitle('K13','K15','ELÉCTRICO','calibri',10,'F2F507');
        this.fnParamBorderTitle('L13','Energía eléctrica de baja');
        this.fnParamBorderTitle('L14','Energía eléctrica de alta');
        this.fnParamBorderTitle('L15','Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados');
        /*FISICO */
        this.fnParamExcelTitle('K16','K23','FÍSICO','calibri',10,'2162b0');
        this.fnParamBorderTitle('L16','Iluminación deficiente');
        this.fnParamBorderTitle('L17','Iluminación en exceso');
        this.fnParamBorderTitle('L18','Radiaciones no ionizantes por ultravioleta');
        this.fnParamBorderTitle('L19','Radiaciones ionizantes');
        this.fnParamBorderTitle('L20','Ruido');
        this.fnParamBorderTitle('L21','Vibraciones');
        this.fnParamBorderTitle('L22','Transferencias de temperaturas por calor');
        this.fnParamBorderTitle('L23','Transferencias de temperaturas por frio');
        /*INCENDIOS / EXPLOSIONES */
        this.fnParamExcelTitle('K24','K26','INCENDIOS / EXPLOSIONES','calibri',10,'F52707');
        this.fnParamBorderTitle('L24','Materiales combustibles');
        this.fnParamBorderTitle('L25','Ausencia de equipo contra incendio');
        this.fnParamBorderTitle('L26','Sustancias inflamables');
        /*LOCATIVOS */
        this.fnParamExcelTitle('K27','K32','LOCATIVOS','calibri',10,'836013');
        this.fnParamBorderTitle('L27','Pisos defectuosos');
        this.fnParamBorderTitle('L28','Escaleras defectuosas');
        this.fnParamBorderTitle('L29','Almacenamiento, estanterías en mal estado');
        this.fnParamBorderTitle('L30','Almacenamiento, arrumes con altura inadecuada');
        this.fnParamBorderTitle('L31','Señalización y demarcación deficiente, inexistente o inadecuada');
        this.fnParamBorderTitle('L32','Falta de orden y aseo');
        /*MECANICOS */
        this.fnParamExcelTitle('K33','K36','MECÁNICOS','calibri',10,'4E493E');
        this.fnParamBorderTitle('L33','Utilización de herramientas manuales');
        this.fnParamBorderTitle('L34','Superficies cortantes');
        this.fnParamBorderTitle('L35','Contacto con elementos cortopunzantes');
        this.fnParamBorderTitle('L36','Materiales proyectados sólidos o fluidos');
        /*PSICOSOCIAL */
        this.fnParamExcelTitle('K37','K39','PSICOSOCIAL','calibri',10,'8547B3');
        this.fnParamBorderTitle('L37','Sobrecarga de trabajo');
        this.fnParamBorderTitle('L38','Resposanbilidad en el cargo/ manejo de personal');
        this.fnParamBorderTitle('L39','Trabajo repetitivo');
        /*PUBLICOS */
        this.fnParamExcelTitle('K40','K43','PÚBLICOS','calibri',10,'2BD2D5');
        this.fnParamBorderTitle('L40','Situación de atraco o robo');
        this.fnParamBorderTitle('L41','Terrorismo');
        this.fnParamBorderTitle('L42','Situación de Agresión fisica');
        this.fnParamBorderTitle('L43','Situación de asonada');
        /*TRANSITO */
        this.fnParamExcelTitle('K44','K45','TRANSITO','calibri',10,'53DA70');
        this.fnParamBorderTitle('L44','Transporte carro / ambulancia');
        this.fnParamBorderTitle('L45','Transporte motocicleta');
        /*QUIMICOS */
        this.fnParamExcelTitle('K46','K49','QUÍMICOS','calibri',10,'E47BC4');
        this.fnParamBorderTitle('L46','Aerosoles, líquidos, rocíos');
        this.fnParamBorderTitle('L47','Gases y vapores');
        this.fnParamBorderTitle('L48','Sustancias sólidas (polvos)');
        this.fnParamBorderTitle('L49','Contacto y/o salpicadura de químicos');
        /*TAREAS DE ALTO RIESGO */
        this.fnParamExcelTitle('K50','K52','TAREAS DE ALTO RIESGO','calibri',10,'E37A23');
        this.fnParamBorderTitle('L50','Trabajo en alturas por encima de 1.50 metros');
        this.fnParamBorderTitle('L51','Trabajo en espacios confinados');
        this.fnParamBorderTitle('L52','Trabajo en caliente corte y soldadura');
      }

    }


   

    // /*Toma el valor del titulo */
    
    

    //Generate & Save Excel File
    /*Genera y guarda el archivo de Excel en el dispositivo */
    this.workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      /*Asigna el nombre del archivo con que se quiere guardar */
      saveAs(blob, `VR_${this.datepipe.transform(this.fechafinal, "yyyy-MM-dd")}` + '.xlsx');
    })


  }

  /*Funcion que toma la información y la organiza según se revise en la creación del libro del excel en la siguiente funcion exportExcel2 */
  exportToExcel() {
    /*Arreglo que contiene toda la información */
    const dataExcel = this.getCars();
    
    const headerData = [
      'ÁREA','NOMBRE LIDER','CÉDULA','TELEFONO','SEDE','PROCESO' ,'ZONA/LUGAR','ACTIVIDADES','TAREAS',
      'RUTINARIO (SI/NO)','FACTORES DE RIESGO','INDICADORES DE RIESGO','EFECTOS POSIBLES','FUENTE','MEDIO',
      'INDIVIDUO','TABLA ND','TABLA NE','NP = (ND*NE)','INTERPRETACIÓN','NC','INTERVENCIÓN','TABLA NR','N° EXPUESTOS','OBSERVACIONES']
 
    /*Se crea un objeto con el cual la función del excel la va recibir */
    let reportData = {
      data: dataExcel,
      headers: headerData
    }

    this.exportExcel2(reportData);
  }

  fnParamBorderTitle(cell:string, title:string){
    this.worksheet.getCell(cell).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    this.worksheet.getCell(cell).value = title;
    /*Alinea el titulo y lo centra en la celda combinada */
    this.worksheet.getCell(cell).alignment = { vertical: 'middle', horizontal: 'center' }
  }

  /*Función  que parametriza las celdas para los encabezados  los cual se requieren combinar las celdas */
  fnParamExcelTitle(cell1:string,cell2:string,title:string,nameFont:string,size:number,color:string){
    /*Se toma  las celdas a combinar */
    this.worksheet.mergeCells(cell1, cell2);
    /*Se asigna el borde a la celdas correspondientes */
    this.worksheet.getCell(cell1, cell2).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    /* Asigna estilos a la celda combinada según lo que queremos en el titulo */
    let titleRow = this.worksheet.getCell(cell1);
    /*Toma el valor del titulo */
    titleRow.value = title;
    /*Cambia los valores de estilo de las fuentes */
    titleRow.font = {
      name: nameFont,
      size: size,
      bold: true,
      color: { argb: 'FFFFFF' },
    }
    /*Alinea el titulo y lo centra en la celda combinada */
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    this.worksheet.getCell(cell1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color },
      bgColor: { argb: '' }
    }

  }

}
