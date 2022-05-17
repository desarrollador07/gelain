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
import { ValidacionService } from 'src/app/services/validacion.service';

@Component({
  selector: 'app-valor-riesgo',
  templateUrl: './valor-riesgo.component.html',
  styleUrls: ['./valor-riesgo.component.css']
})
export class ValorRiesgoComponent implements OnInit {

  vrData: ValorRiesgoModel[] = [];/*Arreglo VR */
  idEmpresa:any;
  loading:boolean = true;
  validEmp:boolean = false;
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
  cont1:number;
  cont2:number;
  cont3:number;
  cont4:number;
  cont5:number;
  cont6:number;
  cont7:number;
  cont8:number;
  cont9:number;
  cont10:number;
  cont11:number;
  cont12:number;
  cont13:number;
  cont14:number;
  cont15:number;
  cont16:number;
  cont17:number;
  cont18:number;
  cont19:number;
  cont20:number;
  cont21:number;
  cont22:number;
  cont23:number;
  cont24:number;
  cont25:number;
  cont26:number;
  cont27:number;
  cont28:number;
  cont29:number;
  cont30:number;
  cont31:number;
  cont32:number;
  cont33:number;
  cont34:number;
  cont35:number;
  cont36:number;
  cont37:number;
  cont38:number;
  cont39:number;
  cont40:number;
  cont41:number;
  cont42:number;
  cont43:number;
  cont44:number;
  cont45:number;
  cont46:number;
  cont47:number;
  cont48:number;
  cont49:number;
  cont50:number;
  cont51:number;
  headerRow:any;

  workbook = new Workbook();
  worksheet = this.workbook.addWorksheet('Data');

  constructor(private valoraRiesgoService: ValoracionRiesgosService,
              private _messageService: MessageService,
              private datepipe: DatePipe,
              private areasServices: AreasService,
              private _confirmationServices: ConfirmationService,
              private validacionService: ValidacionService,
              private store: Store<AppState>) {
               this.validacionService.recargarPagina();
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
      { field: 'opciones', header: 'Opciones', width: '120px' },
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
        this.validEmp = false;
        await this.buscarArea(this.id);
        await this.indexData(this.id);
      }
      if(sessionStorage.getItem('idEmpresa') === null){
        this.loading = false;
        this.validEmp = true;
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
      if (varTemp.length !== 0) {
        resp.idpareanombre = varTemp[0].arenombre;
      }
    });
  }

  fnArrData() {
    let arrFinal :any;
    arrFinal = this.vrData.map( (resp:ValorRiesgoModel) => { 
      /*Arreglo que llena  la info  del Excel en las Subcategorias */
      return [
        /* ----------------------BIOLOGICO------------------- */
        [ 
          [
            /*Biologico - Derivados de origen animal */
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
            resp.idpbioderani_peorconsecue,
            resp.idpbioderani_existerequisito,
            resp.idpbioderani_elimina,
            resp.idpbioderani_sustitucion,
            resp.idpbioderani_ctrlingenieria,
            resp.idpbioderani_ctrladmin,
            resp.idpbioderani_equipoeleme
          ]
          ,
          [
            /*Biologico - Microorganismos tipo hongo */
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
            resp.idpbiohongo_peorconsecue,
            resp.idpbiohongo_existerequisito,
            resp.idpbiohongo_elimina,
            resp.idpbiohongo_sustitucion,
            resp.idpbiohongo_ctrlingenieria,
            resp.idpbiohongo_ctrladmin,
            resp.idpbiohongo_equipoeleme
            
          ],
          [
            /*Biologico - Microorganismos tipo bacterias */
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
            resp.idpbiobacterias_peorconsecue,
            resp.idpbiobacterias_existerequisito,
            resp.idpbiobacterias_elimina,
            resp.idpbiobacterias_sustitucion,
            resp.idpbiobacterias_ctrlingenieria,
            resp.idpbiobacterias_ctrladmin,
            resp.idpbiobacterias_equipoeleme
          ],
          [
            /*Biologico - Microorganismos tipo virus */
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
            resp.idpbiovirus_peorconsecue,
            resp.idpbiovirus_existerequisito,
            resp.idpbiovirus_elimina,
            resp.idpbiovirus_sustitucion,
            resp.idpbiovirus_ctrlingenieria,
            resp.idpbiovirus_ctrladmin,
            resp.idpbiovirus_equipoeleme
          ],
          [
            /*Biologico - Parásitos */
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
            resp.idpbioparasitos_peorconsecue,
            resp.idpbioparasitos_existerequisito,
            resp.idpbioparasitos_elimina,
            resp.idpbioparasitos_sustitucion,
            resp.idpbioparasitos_ctrlingenieria,
            resp.idpbioparasitos_ctrladmin,
            resp.idpbioparasitos_equipoeleme
            
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
            resp.idpcargesfuerzos_peorconsecue,
            resp.idpcargesfuerzos_existerequisito,
            resp.idpcargesfuerzos_elimina,
            resp.idpcargesfuerzos_sustitucion,
            resp.idpcargesfuerzos_ctrlingenieria,
            resp.idpcargesfuerzos_ctrladmin,
            resp.idpcargesfuerzos_equipoeleme
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
            resp.idpcargmovimiento_peorconsecue,
            resp.idpcargmovimiento_existerequisito,
            resp.idpcargmovimiento_elimina,
            resp.idpcargmovimiento_sustitucion,
            resp.idpcargmovimiento_ctrlingenieria,
            resp.idpcargmovimiento_ctrladmin,
            resp.idpcargmovimiento_equipoeleme
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
            resp.idpcargvoz_peorconsecue,
            resp.idpcargvoz_existerequisito,
            resp.idpcargvoz_elimina,
            resp.idpcargvoz_sustitucion,
            resp.idpcargvoz_ctrlingenieria,
            resp.idpcargvoz_ctrladmin,
            resp.idpcargvoz_equipoeleme
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
            resp.idpcargpie_peorconsecue,
            resp.idpcargpie_existerequisito,
            resp.idpcargpie_elimina,
            resp.idpcargpie_sustitucion,
            resp.idpcargpie_ctrlingenieria,
            resp.idpcargpie_ctrladmin,
            resp.idpcargpie_equipoeleme
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
            resp.idpcargsentado_peorconsecue,
            resp.idpcargsentado_existerequisito,
            resp.idpcargsentado_elimina,
            resp.idpcargsentado_sustitucion,
            resp.idpcargsentado_ctrlingenieria,
            resp.idpcargsentado_ctrladmin,
            resp.idpcargsentado_equipoeleme
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
            resp.idpelectricobaja_peorconsecue,
            resp.idpelectricobaja_existerequisito,
            resp.idpelectricobaja_elimina,
            resp.idpelectricobaja_sustitucion,
            resp.idpelectricobaja_ctrlingenieria,
            resp.idpelectricobaja_ctrladmin,
            resp.idpelectricobaja_equipoeleme
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
            resp.idpelectricoalta_peorconsecue,
            resp.idpelectricoalta_existerequisito,
            resp.idpelectricoalta_elimina,
            resp.idpelectricoalta_sustitucion,
            resp.idpelectricoalta_ctrlingenieria,
            resp.idpelectricoalta_ctrladmin,
            resp.idpelectricoalta_equipoeleme
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
            resp.idpelectricocables_peorconsecue,
            resp.idpelectricocables_existerequisito,
            resp.idpelectricocables_elimina,
            resp.idpelectricocables_sustitucion,
            resp.idpelectricocables_ctrlingenieria,
            resp.idpelectricocables_ctrladmin,
            resp.idpelectricocables_equipoeleme
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
            resp.idpfisicoilumdef_peorconsecue,
            resp.idpfisicoilumdef_existerequisito,
            resp.idpfisicoilumdef_elimina,
            resp.idpfisicoilumdef_sustitucion,
            resp.idpfisicoilumdef_ctrlingenieria,
            resp.idpfisicoilumdef_ctrladmin,
            resp.idpfisicoilumdef_equipoeleme
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
            resp.idpfisicoilumexceso_peorconsecue,
            resp.idpfisicoilumexceso_existerequisito,
            resp.idpfisicoilumexceso_elimina,
            resp.idpfisicoilumexceso_sustitucion,
            resp.idpfisicoilumexceso_ctrlingenieria,
            resp.idpfisicoilumexceso_ctrladmin,
            resp.idpfisicoilumexceso_equipoeleme
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
            resp.idpfisiconoradiaciones_peorconsecue,
            resp.idpfisiconoradiaciones_existerequisito,
            resp.idpfisiconoradiaciones_elimina,
            resp.idpfisiconoradiaciones_sustitucion,
            resp.idpfisiconoradiaciones_ctrlingenieria,
            resp.idpfisiconoradiaciones_ctrladmin,
            resp.idpfisiconoradiaciones_equipoeleme
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
            resp.idpfisicoradiaciones_peorconsecue,
            resp.idpfisicoradiaciones_existerequisito,
            resp.idpfisicoradiaciones_elimina,
            resp.idpfisicoradiaciones_sustitucion,
            resp.idpfisicoradiaciones_ctrlingenieria,
            resp.idpfisicoradiaciones_ctrladmin,
            resp.idpfisicoradiaciones_equipoeleme
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
            resp.idpfisicoruido_peorconsecue,
            resp.idpfisicoruido_existerequisito,
            resp.idpfisicoruido_elimina,
            resp.idpfisicoruido_sustitucion,
            resp.idpfisicoruido_ctrlingenieria,
            resp.idpfisicoruido_ctrladmin,
            resp.idpfisicoruido_equipoeleme
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
            resp.idpfisicovibraciones_peorconsecue,
            resp.idpfisicovibraciones_existerequisito,
            resp.idpfisicovibraciones_elimina,
            resp.idpfisicovibraciones_sustitucion,
            resp.idpfisicovibraciones_ctrlingenieria,
            resp.idpfisicovibraciones_ctrladmin,
            resp.idpfisicovibraciones_equipoeleme
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
            resp.idpfisicocalor_peorconsecue,
            resp.idpfisicocalor_existerequisito,
            resp.idpfisicocalor_elimina,
            resp.idpfisicocalor_sustitucion,
            resp.idpfisicocalor_ctrlingenieria,
            resp.idpfisicocalor_ctrladmin,
            resp.idpfisicocalor_equipoeleme
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
            resp.idpfisicofrio_peorconsecue,
            resp.idpfisicofrio_existerequisito,
            resp.idpfisicofrio_elimina,
            resp.idpfisicofrio_sustitucion,
            resp.idpfisicofrio_ctrlingenieria,
            resp.idpfisicofrio_ctrladmin,
            resp.idpfisicofrio_equipoeleme
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
            resp.idpincendioscombust_peorconsecue,
            resp.idpincendioscombust_existerequisito,
            resp.idpincendioscombust_elimina,
            resp.idpincendioscombust_sustitucion,
            resp.idpincendioscombust_ctrlingenieria,
            resp.idpincendioscombust_ctrladmin,
            resp.idpincendioscombust_equipoeleme
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
            resp.idpincendiosequipo_peorconsecue,
            resp.idpincendiosequipo_existerequisito,
            resp.idpincendiosequipo_elimina,
            resp.idpincendiosequipo_sustitucion,
            resp.idpincendiosequipo_ctrlingenieria,
            resp.idpincendiosequipo_ctrladmin,
            resp.idpincendiosequipo_equipoeleme
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
            resp.idpincendiossustancias_peorconsecue,
            resp.idpincendiossustancias_existerequisito,
            resp.idpincendiossustancias_elimina,
            resp.idpincendiossustancias_sustitucion,
            resp.idpincendiossustancias_ctrlingenieria,
            resp.idpincendiossustancias_ctrladmin,
            resp.idpincendiossustancias_equipoeleme
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
            resp.idplocativospisos_peorconsecue,
            resp.idplocativospisos_existerequisito,
            resp.idplocativospisos_elimina,
            resp.idplocativospisos_sustitucion,
            resp.idplocativospisos_ctrlingenieria,
            resp.idplocativospisos_ctrladmin,
            resp.idplocativospisos_equipoeleme
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
            resp.idplocativosescaleras_peorconsecue,
            resp.idplocativosescaleras_existerequisito,
            resp.idplocativosescaleras_elimina,
            resp.idplocativosescaleras_sustitucion,
            resp.idplocativosescaleras_ctrlingenieria,
            resp.idplocativosescaleras_ctrladmin,
            resp.idplocativosescaleras_equipoeleme
   
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
            resp.idplocativosestanterias_peorconsecue,
            resp.idplocativosestanterias_existerequisito,
            resp.idplocativosestanterias_elimina,
            resp.idplocativosestanterias_sustitucion,
            resp.idplocativosestanterias_ctrlingenieria,
            resp.idplocativosestanterias_ctrladmin,
            resp.idplocativosestanterias_equipoeleme
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
            resp.idplocativosarrumes_peorconsecue,
            resp.idplocativosarrumes_existerequisito,
            resp.idplocativosarrumes_elimina,
            resp.idplocativosarrumes_sustitucion,
            resp.idplocativosarrumes_ctrlingenieria,
            resp.idplocativosarrumes_ctrladmin,
            resp.idplocativosarrumes_equipoeleme
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
            resp.idplocativosenalizacion_peorconsecue,
            resp.idplocativosenalizacion_existerequisito,
            resp.idplocativosenalizacion_elimina,
            resp.idplocativosenalizacion_sustitucion,
            resp.idplocativosenalizacion_ctrlingenieria,
            resp.idplocativosenalizacion_ctrladmin,
            resp.idplocativosenalizacion_equipoeleme
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
            resp.idplocativosaseo_peorconsecue,
            resp.idplocativosaseo_existerequisito,
            resp.idplocativosaseo_elimina,
            resp.idplocativosaseo_sustitucion,
            resp.idplocativosaseo_ctrlingenieria,
            resp.idplocativosaseo_ctrladmin,
            resp.idplocativosaseo_equipoeleme
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
            resp.idpmecanicoherramient_peorconsecue,
            resp.idpmecanicoherramient_existerequisito,
            resp.idpmecanicoherramient_elimina,
            resp.idpmecanicoherramient_sustitucion,
            resp.idpmecanicoherramient_ctrlingenieria,
            resp.idpmecanicoherramient_ctrladmin,
            resp.idpmecanicoherramient_equipoeleme
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
            resp.idpmecanicocortante_peorconsecue,
            resp.idpmecanicocortante_existerequisito,
            resp.idpmecanicocortante_elimina,
            resp.idpmecanicocortante_sustitucion,
            resp.idpmecanicocortante_ctrlingenieria,
            resp.idpmecanicocortante_ctrladmin,
            resp.idpmecanicocortante_equipoeleme
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
            resp.idpmecanicocortopunz_peorconsecue,
            resp.idpmecanicocortopunz_existerequisito,
            resp.idpmecanicocortopunz_elimina,
            resp.idpmecanicocortopunz_sustitucion,
            resp.idpmecanicocortopunz_ctrlingenieria,
            resp.idpmecanicocortopunz_ctrladmin,
            resp.idpmecanicocortopunz_equipoeleme
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
            resp.idpmecanicomateriales_peorconsecue,
            resp.idpmecanicomateriales_existerequisito,
            resp.idpmecanicomateriales_elimina,
            resp.idpmecanicomateriales_sustitucion,
            resp.idpmecanicomateriales_ctrlingenieria,
            resp.idpmecanicomateriales_ctrladmin,
            resp.idpmecanicomateriales_equipoeleme
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
            resp.idppsicosobrecarga_peorconsecue,
            resp.idppsicosobrecarga_existerequisito,
            resp.idppsicosobrecarga_elimina,
            resp.idppsicosobrecarga_sustitucion,
            resp.idppsicosobrecarga_ctrlingenieria,
            resp.idppsicosobrecarga_ctrladmin,
            resp.idppsicosobrecarga_equipoeleme
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
            resp.idppsicoresponsabilidad_peorconsecue,
            resp.idppsicoresponsabilidad_existerequisito,
            resp.idppsicoresponsabilidad_elimina,
            resp.idppsicoresponsabilidad_sustitucion,
            resp.idppsicoresponsabilidad_ctrlingenieria,
            resp.idppsicoresponsabilidad_ctrladmin,
            resp.idppsicoresponsabilidad_equipoeleme
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
            resp.idppsicorepetitivo_peorconsecue,
            resp.idppsicorepetitivo_existerequisito,
            resp.idppsicorepetitivo_elimina,
            resp.idppsicorepetitivo_sustitucion,
            resp.idppsicorepetitivo_ctrlingenieria,
            resp.idppsicorepetitivo_ctrladmin,
            resp.idppsicorepetitivo_equipoeleme
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
            resp.idppublicorobo_peorconsecue,
            resp.idppublicorobo_existerequisito,
            resp.idppublicorobo_elimina,
            resp.idppublicorobo_sustitucion,
            resp.idppublicorobo_ctrlingenieria,
            resp.idppublicorobo_ctrladmin,
            resp.idppublicorobo_equipoeleme
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
            resp.idppublicoterrorismo_peorconsecue,
            resp.idppublicoterrorismo_existerequisito,
            resp.idppublicoterrorismo_elimina,
            resp.idppublicoterrorismo_sustitucion,
            resp.idppublicoterrorismo_ctrlingenieria,
            resp.idppublicoterrorismo_ctrladmin,
            resp.idppublicoterrorismo_equipoeleme
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
            resp.idppublicoagresion_peorconsecue,
            resp.idppublicoagresion_existerequisito,
            resp.idppublicoagresion_elimina,
            resp.idppublicoagresion_sustitucion,
            resp.idppublicoagresion_ctrlingenieria,
            resp.idppublicoagresion_ctrladmin,
            resp.idppublicoagresion_equipoeleme
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
            resp.idppublicoasonada_peorconsecue,
            resp.idppublicoasonada_existerequisito,
            resp.idppublicoasonada_elimina,
            resp.idppublicoasonada_sustitucion,
            resp.idppublicoasonada_ctrlingenieria,
            resp.idppublicoasonada_ctrladmin,
            resp.idppublicoasonada_equipoeleme
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
            resp.idptransitomoto_peorconsecue,
            resp.idptransitomoto_existerequisito,
            resp.idptransitomoto_elimina,
            resp.idptransitomoto_sustitucion,
            resp.idptransitomoto_ctrlingenieria,
            resp.idptransitomoto_ctrladmin,
            resp.idptransitomoto_equipoeleme
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
            resp.idptransitocarro_peorconsecue,
            resp.idptransitocarro_existerequisito,
            resp.idptransitocarro_elimina,
            resp.idptransitocarro_sustitucion,
            resp.idptransitocarro_ctrlingenieria,
            resp.idptransitocarro_ctrladmin,
            resp.idptransitocarro_equipoeleme
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
            resp.idpquimicosaerosol_peorconsecue,
            resp.idpquimicosaerosol_existerequisito,
            resp.idpquimicosaerosol_elimina,
            resp.idpquimicosaerosol_sustitucion,
            resp.idpquimicosaerosol_ctrlingenieria,
            resp.idpquimicosaerosol_ctrladmin,
            resp.idpquimicosaerosol_equipoeleme
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
            resp.idpquimicosgases_peorconsecue,
            resp.idpquimicosgases_existerequisito,
            resp.idpquimicosgases_elimina,
            resp.idpquimicosgases_sustitucion,
            resp.idpquimicosgases_ctrlingenieria,
            resp.idpquimicosgases_ctrladmin,
            resp.idpquimicosgases_equipoeleme
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
            resp.idpquimicossustanc_peorconsecue,
            resp.idpquimicossustanc_existerequisito,
            resp.idpquimicossustanc_elimina,
            resp.idpquimicossustanc_sustitucion,
            resp.idpquimicossustanc_ctrlingenieria,
            resp.idpquimicossustanc_ctrladmin,
            resp.idpquimicossustanc_equipoeleme
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
            resp.idpquimicoscontacto_peorconsecue,
            resp.idpquimicoscontacto_existerequisito,
            resp.idpquimicoscontacto_elimina,
            resp.idpquimicoscontacto_sustitucion,
            resp.idpquimicoscontacto_ctrlingenieria,
            resp.idpquimicoscontacto_ctrladmin,
            resp.idpquimicoscontacto_equipoeleme
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
            resp.idptareasalturas_peorconsecue,
            resp.idptareasalturas_existerequisito,
            resp.idptareasalturas_elimina,
            resp.idptareasalturas_sustitucion,
            resp.idptareasalturas_ctrlingenieria,
            resp.idptareasalturas_ctrladmin,
            resp.idptareasalturas_equipoeleme
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
            resp.idptareasconfinados_peorconsecue,
            resp.idptareasconfinados_existerequisito,
            resp.idptareasconfinados_elimina,
            resp.idptareasconfinados_sustitucion,
            resp.idptareasconfinados_ctrlingenieria,
            resp.idptareasconfinados_ctrladmin,
            resp.idptareasconfinados_equipoeleme
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
            resp.idptareassoldadura_peorconsecue,
            resp.idptareassoldadura_existerequisito,
            resp.idptareassoldadura_elimina,
            resp.idptareassoldadura_sustitucion,
            resp.idptareassoldadura_ctrlingenieria,
            resp.idptareassoldadura_ctrladmin,
            resp.idptareassoldadura_equipoeleme
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
    /*Agrega filas en blanco */
    this.worksheet.addRow([]);
    /*Agrega la cabecera de agrupación inicial */
    this.fnHeaderSup();
    /*Agrega la cabecera princial*/
    this.fnHeaderRow(header);
    /*Inician los contadores de acuerdo a la posición que se necesita en las celdas */
    this.fnContDataInit();
    /*Ciclo que recorre el arreglo de los datos, tambien se adquieren datos del arreglo principal  y el arreglo segundario */
    var contFila:number = 2;
    for (let j = 0; j < data.length; j++) {
      /*Ciclo de arreglo con data secundaria el cual recorre por categoria */
      for (let i = 0; i < data[j].length; i++) {
        /*Ciclo que recorre por subcategoria */
        
        data[j][i].forEach((element:any)=> {
            contFila += 1;
            this.worksheet.addRow(element);

            if (element[22].trim() === 'I') {
              this.fnvalidColor(contFila, 'ED2616');
            } else if (element[22].trim() === 'II') {
              this.fnvalidColor(contFila, 'F3ED1A');
            } else if (element[22].trim() === 'III' || element[22].trim() === 'IV') {
              this.fnvalidColor(contFila, '86C537');
            } 
            
        });

      }
      /*Condicional que valida los datos iniciales */
      if (j === 0) {
        /*Estructura de los datos */
        this.fnGroup(j);
        /*Condición que valida los N datos siguientes haciendo la sumatoria de las 50 filas posteriores para la organización de los siguientes datos*/
      }else{
        /*Sumatoria de los contadores para la númeración de las celdas */
        this.fnContSumaData();
        /*Estructura de los datos */
        this.fnGroup(j);
  
      }

    }
    
    /*Genera y guarda el archivo de Excel en el dispositivo */
    this.workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      /*Asigna el nombre del archivo con que se quiere guardar */
      saveAs(blob, `VR_${sessionStorage.getItem('nombreEmpresa')}_${this.datepipe.transform(this.fechafinal, "yyyy-MM-dd")}` + '.xlsx');
    });

  }

  /*Funcion que toma la información y la organiza según se revise en la creación del libro del excel en la siguiente funcion exportExcel2 */
  exportToExcel() {
    /*Arreglo que contiene toda la información */
    const dataExcel = this.fnArrData();
    
    const headerData = [
      'ÁREA','NOMBRE LIDER','CÉDULA','TELEFONO','SEDE','PROCESO' ,'ZONA/LUGAR','ACTIVIDADES','TAREAS',
      'RUTINARIO (SI/NO)','FACTORES DE RIESGO','INDICADORES DE RIESGO','EFECTOS POSIBLES','FUENTE','MEDIO',
      'INDIVIDUO','TABLA ND','TABLA NE','NP = (ND*NE)','INTERPRETACIÓN','NC','INTERVENCIÓN','TABLA NR',
      'N° EXPUESTOS','OBSERVACIONES','PEOR CONSECUENCIA', 'EXISTENCIA REQUISITO LEGAL ESPECIFICO ASOCIADO (SI/NO)',
      'ELIMINACIÓN','SUSTITUCIÓN','CONTROL DE INGENIERIA','CONTROLES ADMINISTRATIVOS SEÑALIZACIÓN, ADVERTENCIA',
      'EQUIPO / ELEMENTOS DE PROTECCIÓN PERSONAL'];
 
    /*Se crea un objeto con el cual la función del excel la va recibir */
    let reportData = {
      data: dataExcel,
      headers: headerData
    };

    this.exportExcel2(reportData);
  }

  fnParamBorderTitle(cell:string, title:string){
    this.worksheet.getCell(cell).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    this.worksheet.getCell(cell).value = title;
    /*Alinea el titulo y lo centra en la celda combinada */
    this.worksheet.getCell(cell).alignment = { vertical: 'middle', horizontal: 'center' };
  }

  /*Función  que parametriza las celdas para los encabezados  los cual se requieren combinar las celdas */
  fnParamExcelTitle(cell1:string,cell2:string,title:string,nameFont:string,size:number,color:string,colorFont:string){
    /*Se toma  las celdas a combinar */
    this.worksheet.mergeCells(cell1, cell2);
    /*Se asigna el borde a la celdas correspondientes */
    this.worksheet.getCell(cell1, cell2).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    /* Asigna estilos a la celda combinada según lo que queremos en el titulo */
    let titleRow = this.worksheet.getCell(cell1);
    /*Toma el valor del titulo */
    titleRow.value = title;
    /*Cambia los valores de estilo de las fuentes */
    titleRow.font = {
      name: nameFont,
      size: size,
      bold: true,
      color: { argb: colorFont },
    };
    /*Alinea el titulo y lo centra en la celda combinada */
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };

    this.worksheet.getCell(cell1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color },
      bgColor: { argb: '' }
    };

  }

  fnParamSubtitle(cell1:string,cell2:string, data:string){
    this.worksheet.mergeCells(cell1,cell2);
    this.worksheet.getCell(cell1).value = data;
    this.worksheet.getCell(cell1).alignment = { vertical: 'middle', horizontal: 'center' };
  }

  fnContDataInit(){
    this.cont1 = 3;
    this.cont2 = 52;
    this.cont3 = 7;
    this.cont4 = 4;
    this.cont5 = 5;
    this.cont6 = 6;
    this.cont7 = 8;
    this.cont8 = 12;
    this.cont9 = 9;
    this.cont10 = 10;
    this.cont11 = 11;
    this.cont12 = 13;
    this.cont13 = 15;
    this.cont14 = 14;
    this.cont15 = 16;
    this.cont16 = 23;
    this.cont17 = 17;
    this.cont18 = 18;
    this.cont19 = 19;
    this.cont20 = 20;
    this.cont21 = 21;
    this.cont22 = 22;
    this.cont23 = 24;
    this.cont24 = 26;
    this.cont25 = 25;
    this.cont26 = 27;
    this.cont27 = 32;
    this.cont28 = 28;
    this.cont29 = 29;
    this.cont30 = 30;
    this.cont31 = 31;
    this.cont32 = 33;
    this.cont33 = 36;
    this.cont34 = 34;
    this.cont35 = 35;
    this.cont36 = 37;
    this.cont37 = 39;
    this.cont38 = 38;
    this.cont39 = 40;
    this.cont40 = 43;
    this.cont41 = 41;
    this.cont42 = 42;
    this.cont43 = 44;
    this.cont44 = 45;
    this.cont45 = 46;
    this.cont46 = 49;
    this.cont47 = 47;
    this.cont48 = 48;
    this.cont49 = 50;
    this.cont50 = 52;
    this.cont51 = 51;
  }

  fnGroup(j:number){
        this.fnParamSubtitle(`A${this.cont1}`,`A${this.cont2}`,this.vrData[j].idpareanombre);
        this.fnParamSubtitle(`B${this.cont1}`,`B${this.cont2}`,this.vrData[j].idpnombre);
        this.fnParamSubtitle(`C${this.cont1}`,`C${this.cont2}`,this.vrData[j].idpcedula);
        this.fnParamSubtitle(`D${this.cont1}`,`D${this.cont2}`,this.vrData[j].idptelefono);
        this.fnParamSubtitle(`E${this.cont1}`,`E${this.cont2}`,this.vrData[j].idpsede);
        this.fnParamSubtitle(`F${this.cont1}`,`F${this.cont2}`,this.vrData[j].idpproceso);
        this.fnParamSubtitle(`G${this.cont1}`,`G${this.cont2}`,this.vrData[j].idpzona);
        this.fnParamSubtitle(`H${this.cont1}`,`H${this.cont2}`,this.vrData[j].idpactividades);
        this.fnParamSubtitle(`I${this.cont1}`,`I${this.cont2}`,this.vrData[j].idptareas);
        this.fnParamSubtitle(`J${this.cont1}`,`J${this.cont2}`,this.vrData[j].idprutinario);

        /*FACTORES DE RIESGO */
        /*BIOLOGICO */
        this.fnParamExcelTitle(`K${this.cont1}`,`K${this.cont3}`,'BIOLÓGICO','calibri',10,'008000','FFFFFF');
        this.fnParamBorderTitle(`L${this.cont1}`,'Derivados de origen animal');
        this.fnParamBorderTitle(`L${this.cont4}`,'Microorganismos tipo hongo');
        this.fnParamBorderTitle(`L${this.cont5}`,'Microorganismos tipo bacterias');
        this.fnParamBorderTitle(`L${this.cont6}`,'Microorganismos tipo virus');
        this.fnParamBorderTitle(`L${this.cont3}`,'Parásitos');
        /*CARGA FISICA */
        this.fnParamExcelTitle(`K${this.cont7}`,`K${this.cont8}`,'CARGA FÍSICA','calibri',10,'E7B80E','FFFFFF');
        this.fnParamBorderTitle(`L${this.cont7}`, 'Carga dinámica por esfuerzos (manejos o traslado de cargas)');
        this.fnParamBorderTitle(`L${this.cont9}`,'Carga dinámica por movimientos repetitivos');
        this.fnParamBorderTitle(`L${this.cont10}`,'Carga dinámica por sobreesfuerzos de la voz');
        this.fnParamBorderTitle(`L${this.cont11}`,'Carga estática de pie');
        this.fnParamBorderTitle(`L${this.cont8}`,'Posiciones prolongadas sentado');
        /*ELECTRICO */
        this.fnParamExcelTitle(`K${this.cont12}`,`K${this.cont13}`,'ELÉCTRICO','calibri',10,'F2F507','FFFFFF');
        this.fnParamBorderTitle(`L${this.cont12}`,'Energía eléctrica de baja');
        this.fnParamBorderTitle(`L${this.cont14}`,'Energía eléctrica de alta');
        this.fnParamBorderTitle(`L${this.cont13}`,'Cables eléctricos expuestos, encintados, tomacorrientes sobrecargados');
        /*FISICO */
        this.fnParamExcelTitle(`K${this.cont15}`,`K${this.cont16}`,'FÍSICO','calibri',10,'2162b0','FFFFFF');
        this.fnParamBorderTitle(`L${this.cont15}`,'Iluminación deficiente');
        this.fnParamBorderTitle(`L${this.cont17}`,'Iluminación en exceso');
        this.fnParamBorderTitle(`L${this.cont18}`,'Radiaciones no ionizantes por ultravioleta');
        this.fnParamBorderTitle(`L${this.cont19}`,'Radiaciones ionizantes');
        this.fnParamBorderTitle(`L${this.cont20}`,'Ruido');
        this.fnParamBorderTitle(`L${this.cont21}`,'Vibraciones');
        this.fnParamBorderTitle(`L${this.cont22}`,'Transferencias de temperaturas por calor');
        this.fnParamBorderTitle(`L${this.cont16}`,'Transferencias de temperaturas por frio');
        /*INCENDIOS / EXPLOSIONES */
        this.fnParamExcelTitle(`K${this.cont23}`,`K${this.cont24}`,'INCENDIOS / EXPLOSIONES','calibri',10,'F52707','FFFFFF');
        this.fnParamBorderTitle(`L${this.cont23}`,'Materiales combustibles');
        this.fnParamBorderTitle(`L${this.cont25}`,'Ausencia de equipo contra incendio');
        this.fnParamBorderTitle(`L${this.cont24}`,'Sustancias inflamables');
        /*LOCATIVOS */
        this.fnParamExcelTitle(`K${this.cont26}`,`K${this.cont27}`,'LOCATIVOS','calibri',10,'836013','FFFFFF');
        this.fnParamBorderTitle(`L${this.cont26}`,'Pisos defectuosos');
        this.fnParamBorderTitle(`L${this.cont28}`,'Escaleras defectuosas');
        this.fnParamBorderTitle(`L${this.cont29}`,'Almacenamiento, estanterías en mal estado');
        this.fnParamBorderTitle(`L${this.cont30}`,'Almacenamiento, arrumes con altura inadecuada');
        this.fnParamBorderTitle(`L${this.cont31}`,'Señalización y demarcación deficiente, inexistente o inadecuada');
        this.fnParamBorderTitle(`L${this.cont27}`,'Falta de orden y aseo');
        /*MECANICOS */
        this.fnParamExcelTitle(`K${this.cont32}`,`K${this.cont33}`,'MECÁNICOS','calibri',10,'4E493E','FFFFFF');
        this.fnParamBorderTitle(`L${this.cont32}`,'Utilización de herramientas manuales');
        this.fnParamBorderTitle(`L${this.cont34}`,'Superficies cortantes');
        this.fnParamBorderTitle(`L${this.cont35}`,'Contacto con elementos cortopunzantes');
        this.fnParamBorderTitle(`L${this.cont33}`,'Materiales proyectados sólidos o fluidos');
         /*PSICOSOCIAL */
        this.fnParamExcelTitle(`K${this.cont36}`,`K${this.cont37}`,'PSICOSOCIAL','calibri',10,'8547B3','FFFFFF');
        this.fnParamBorderTitle(`L${this.cont36}`,'Sobrecarga de trabajo');
        this.fnParamBorderTitle(`L${this.cont38}`,'Resposanbilidad en el cargo/ manejo de personal');
        this.fnParamBorderTitle(`L${this.cont37}`,'Trabajo repetitivo');
         /*PUBLICOS */
        this.fnParamExcelTitle(`K${this.cont39}`,`K${this.cont40}`,'PÚBLICOS','calibri',10,'2BD2D5','FFFFFF');
        this.fnParamBorderTitle(`L${this.cont39}`,'Situación de atraco o robo');
        this.fnParamBorderTitle(`L${this.cont41}`,'Terrorismo');
        this.fnParamBorderTitle(`L${this.cont42}`,'Situación de Agresión fisica');
        this.fnParamBorderTitle(`L${this.cont40}`,'Situación de asonada');
        /*TRANSITO */
        this.fnParamExcelTitle(`K${this.cont43}`,`K${this.cont44}`,'TRANSITO','calibri',10,'53DA70','FFFFFF');
        this.fnParamBorderTitle(`L${this.cont43}`,'Transporte carro / ambulancia');
        this.fnParamBorderTitle(`L${this.cont44}`,'Transporte motocicleta');
         /*QUIMICOS */
        this.fnParamExcelTitle(`K${this.cont45}`,`K${this.cont46}`,'QUÍMICOS','calibri',10,'E47BC4','FFFFFF');
        this.fnParamBorderTitle(`L${this.cont45}`,'Aerosoles, líquidos, rocíos');
        this.fnParamBorderTitle(`L${this.cont47}`,'Gases y vapores');
        this.fnParamBorderTitle(`L${this.cont48}`,'Sustancias sólidas (polvos)');
        this.fnParamBorderTitle(`L${this.cont46}`,'Contacto y/o salpicadura de químicos');
         /*TAREAS DE ALTO RIESGO */
        this.fnParamExcelTitle(`K${this.cont49}`,`K${this.cont50}`,'TAREAS DE ALTO RIESGO','calibri',10,'E37A23','FFFFFF');
        this.fnParamBorderTitle(`L${this.cont49}`,'Trabajo en alturas por encima de 2 metros');
        this.fnParamBorderTitle(`L${this.cont51}`,'Trabajo en espacios confinados');
        this.fnParamBorderTitle(`L${this.cont50}`,'Trabajo en caliente corte y soldadura');

  }

  fnContSumaData(){
    this.cont1 += 50;
    this.cont2 += 50;
    this.cont3 += 50;
    this.cont4 += 50;
    this.cont5 += 50;
    this.cont6 += 50;
    this.cont7 += 50;
    this.cont8 += 50;
    this.cont9 += 50;
    this.cont10 += 50;
    this.cont11 += 50;
    this.cont12 += 50;
    this.cont13 += 50;
    this.cont14 += 50;
    this.cont15 += 50;
    this.cont16 += 50;
    this.cont17 += 50;
    this.cont18 += 50;
    this.cont19 += 50;
    this.cont20 += 50;
    this.cont21 += 50;
    this.cont22 += 50;
    this.cont23 += 50;
    this.cont24 += 50;
    this.cont25 += 50;
    this.cont26 += 50;
    this.cont27 += 50;
    this.cont28 += 50;
    this.cont29 += 50;
    this.cont30 += 50;
    this.cont31 += 50;
    this.cont32 += 50;
    this.cont33 += 50;
    this.cont34 += 50;
    this.cont35 += 50;
    this.cont36 += 50;
    this.cont37 += 50;
    this.cont38 += 50;
    this.cont39 += 50;
    this.cont40 += 50;
    this.cont41 += 50;
    this.cont42 += 50;
    this.cont43 += 50;
    this.cont44 += 50;
    this.cont45 += 50;
    this.cont46 += 50;
    this.cont47 += 50;
    this.cont48 += 50;
    this.cont49 += 50;
    this.cont50 += 50;
    this.cont51 += 50;
  }

  fnHeaderRow(header:any){
    /*Se crea la fila con los titulos */
    this.headerRow = this.worksheet.addRow(header);
    /*Cabecera que tendra todos los titulos y se asignara la información  */

    this.headerRow.eachCell((cell:any, number:any) => {
      /*Asigna el ancho de la celda según la longitud de los datos de forma relativa */
      const widthCell = cell.value.toString().length;

      if (number === 12 || number === 32 || number === 33) {
        this.worksheet.getColumn(number).width = 70;
      } else if (number === 6 || number === 7) {
        this.worksheet.getColumn(number).width = 35;
      } else if (number === 8 || number === 9) {
        this.worksheet.getColumn(number).width = 45;
      } else {
        this.worksheet.getColumn(number).width = widthCell + 5;
      }
       /*Segun la columna correspondiente asigna el ancho de la celda y se le suma 5 para controlar el espaciado en las celdas */
      
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };

      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'A7ACA7' },
        bgColor: { argb: '' }
      };

      cell.font = {
        name: 'calibri',
        size: 12,
        bold: true
      };

      /*Alinea el titulo y lo centra en la celda combinada */
      cell.alignment = { vertical: 'middle', horizontal: 'center' };

    });
  }

  fnHeaderSup(){
    this.fnParamExcelTitle(`N1`,`P1`,'CONTROL EXISTENTE','calibri',12,'A7ACA7','000000');
    this.fnParamExcelTitle(`Q1`,`W1`,'EVALUACION DEL RIESGO','calibri',12,'A7ACA7','000000');
    this.fnParamExcelTitle(`X1`,`Z1`,'CRITERIOS PARA ESTABLECER CONTROLES','calibri',12,'A7ACA7','000000');
    this.fnParamExcelTitle(`AA1`,`AF1`,'MEDIDAS DE INTERVENCIÓN','calibri',12,'A7ACA7','000000');
  }

  fnvalidColor( fila:number, color:string){
    this.worksheet.getCell(`T${fila}`).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color },
      bgColor: { argb: '' }
    };
    this.worksheet.getCell(`U${fila}`).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color },
      bgColor: { argb: '' }
    };
    this.worksheet.getCell(`V${fila}`).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color },
      bgColor: { argb: '' }
    };
    this.worksheet.getCell(`W${fila}`).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color },
      bgColor: { argb: '' }
    };
  }

}
