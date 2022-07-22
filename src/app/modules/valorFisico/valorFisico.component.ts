import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as valoraFisicaAction from '../../store/actions/vf.actions';
import { DatePipe } from '@angular/common';
/*Model */
import { ValorFisico } from '../../models/valorFisico.model';
/*Modulos */
import { MessageService, ConfirmationService, Message } from 'primeng/api';
/*Servicios */
import { ValoracionFisicaService } from 'src/app/services/valoracion-fisica.service';
import { ValidacionService } from 'src/app/services/validacion.service';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { AreasService } from 'src/app/services/areas.service';
import { Area } from 'src/app/models/area.model';


@Component({
  selector: 'app-form-prueba',
  templateUrl: './valorFisico.component.html',
  styleUrls: ['./valorFisico.component.css']
})
export class ValorfisicoComponent implements OnInit {

  vfData: ValorFisico[] = [];/*Arreglo VF */
  idEmpresa:any;
  loading:boolean = true;
  validEmp:boolean = false;
  cols:any[] = [];
  msgs: Message[] = [];
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
  empresas: Empresa[] = [];
  areasData: Area[] = [];
  
  constructor(private vfService: ValoracionFisicaService,
              private empresaServices:EmpresaService,
              private _messageService: MessageService,
              private areasServices: AreasService,
              private _confirmationServices: ConfirmationService,
              private validacionService: ValidacionService,
              private datepipe: DatePipe,
              private store: Store<AppState>) {
               this.validacionService.recargarPagina();
               this.idEmpresa = sessionStorage.getItem('idEmpresa');   
  }

  async ngOnInit() {
    this.consultaStore();
    this.datosGenerales();
  }
  /*Elimina los datos de los registros  de la tabla */
  deletePrueba(prueba: ValorFisico) {
    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este elemento?',
      header:'Confirmación',
      icon:'pi pi-exclamation-triangle',
      accept:() => {
        this.vfService.deletevalorFisico(prueba)
        .toPromise().then(data => {
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'El registro se ha eliminado', life: 3000})
          this.vfData = this.vfData.filter(r => r !== prueba);
        });
      }
    });
  }
  
  /*Agrega el objeto selecionado de VF */
  editPrueba(vfData:ValorFisico){
    sessionStorage.setItem('valorFisico',JSON.stringify(vfData));
  }
  /*Remover items del sessionStorage */
  newcPrueba(){
    sessionStorage.removeItem('valorFisico');
    sessionStorage.removeItem('prueba');
    sessionStorage.removeItem('IdEmpleado');
  }
  /*Consulta los registros de la valoración física */
  async indexData(id:number){
    await this.vfService.getvalorFisicoId(id).toPromise().then((data:ValorFisico[])=>{
      this.vfData = data;
      
      if (this.vfData.length > 0) {
        this.store.dispatch(
          valoraFisicaAction.addValoFisicas({ list: data })
        );
        this.vfData.map(res=>{
          this.empresas.map(x=>{
            if (res.vafidempresa === x.empid) {
              res.nombreEmp = x.empnombre;
            }
          });
          this.areasData.map(x=>{
            if (res.vafidarea === x.areid) {
              res.nombreArea = x.arenombre;
            }
          });
        });
      }
      this.loading = false;
    });
  }

  datosGenerales(){
 
    this.cols = [
      { field: 'vafidnombre', header: 'Nombre', width: '350px' },
      { field: 'vafciudad', header: 'Ciudad', width: '200px' },
      { field: 'vafcorreo', header: 'Correo', width: '300px' },
      { field: 'vafcargo', header: 'Cargo', width: '300px' },
      { field: 'vaftelefono', header: 'Telefono', width: '180px' },
      { field: 'vafsede', header: 'Sede', width: '200px' },
      { field: 'vafsexo', header: 'Sexo', width: '100px' },
      { field: 'vafedad', header: 'Edad', width: '100px' },
      { field: 'vafpeso', header: 'Peso', width: '100px' },
      { field: 'vaftalla', header: 'Talla', width: '100px' },
      { field: 'vafimc', header: 'Ind Masa Corp', width: '160px' },
      { field: 'vafperimetro', header: 'Perimetro', width: '125px' },
      { field: 'vaf_fecha_creacion', header: 'Fecha Registro', width: '250px' }
    ];

    const fecini = new Date();
    this.fechainicial = new Date(fecini.getFullYear(), fecini.getMonth()-1, 1);
    this.fechafinal = new Date();
  }

  async consultaStore(){
    
    this.store.select('empresas').subscribe(async res=>{

      if (res.empresa !== undefined) {
        this.id = res.empresa.empid;
      }else{
        this.id = this.idEmpresa;
      }
      if (this.id !== undefined && this.id !== null) {
        this.limpiarData();
        await this.consultEmpresa();
        await this.consultArea(this.id);
        this.validEmp = false;
        await this.indexData(this.id);
      }
      
      if(sessionStorage.getItem('idEmpresa') === null){
        this.loading = false;
        this.validEmp = true;
        this.showInfo();
      }
     
    });
  }

  async getVFByFiltro(){

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

    await this.buscarVFByFechas(this.id,dateinicio,datefinal);

  }

  async buscarVFByFechas(id:number,fechaInicial:string,fechaFinal:string){
      this.vfData = [];
    await this.vfService.buscarVFByFechas(id,fechaInicial,fechaFinal).toPromise().then((resp:ValorFisico[]) => {
      this.vfData = resp;
      this.makeRowsSameHeight();
      if (this.vfData.length === 0) {
        this._messageService.add({ severity: 'info', summary: 'Informativo', detail: 'No hay registros para el tipo de busqueda.', life: 3000 });
      }else{
        this.store.dispatch(
          valoraFisicaAction.addValoFisicas({ list: resp })
        );
      }
      this.loading = false;

    });
  }
  /*Función para acomodar la altura entre las filas de la tabla */
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

   /*Mensaje Informativo cuando esta seleccionada la empresa */
   showInfo() {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Info', detail:'SELECCIONE UNA EMPRESA'});
  }

  limpiarData(){
    this.msgs = [];
    this.empresas = [];
    this.areasData = [];
    this.vfData = [];
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.orgDataExcel());
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer,`VF_${this.datepipe.transform(this.fechafinal, "yyyy-MM-dd")}`);
    });
  }

  orgDataExcel(){
    let arrTemp :any;
    let fechaN:any;
    let fechaC:any;
    arrTemp = this.vfData.map( item => { 
      fechaN = this.datepipe.transform(item.vaffecha, "yyyy-MM-dd");
      fechaC = this.datepipe.transform(item.vaf_fecha_creacion, "yyyy-MM-dd h:mm:ss a");
      for (const key in item) {
        switch (key) {
          case 'vafsexo':
              item.asigSexo = this.asignarValorSexo(item[key]);
            break;
          case 'vafcs01':
              item.pcs01 = this.asignarValor(item[key]);
            break;
          case 'vafcs02':
              item.pcs02 = this.asignarValor(item[key]);
            break;
          case 'vafcs03':
              item.pcs03 = this.asignarValor(item[key]);
            break;
          case 'vafcs04':
              item.pcs04 = this.asignarValor(item[key]);
            break;
          case 'vafcs05':
              item.pcs05 = this.asignarValor(item[key]);
            break;
          case 'vafcs06':
              item.pcs06 = this.asignarValor(item[key]);
            break;
          case 'vafcs07':
              item.pcs07 = this.asignarValor(item[key]);
            break;
          case 'vafcs08':
              item.pcs08 = this.asignarValor(item[key]);
            break;
          case 'vafcs09':
              item.pcs09 = this.asignarValor(item[key]);
            break;
          case 'vafcs10':
              item.pcs10 = this.asignarValor(item[key]);
            break;
          case 'vafcs11':
              item.pcs11 = this.asignarValor(item[key]);
            break;
          case 'vafcs12':
              item.pcs12 = this.asignarValor(item[key]);
            break;
          case 'vafcs13':
              item.pcs13 = this.asignarValor(item[key]);
            break;
          case 'vafcs14':
              item.pcs14 = this.asignarValor(item[key]);
            break;
          case 'vafcs16':
              item.pcs16 = this.asignarValor(item[key]);
            break;
          case 'vafcs17':
              item.pcs17 = this.asignarValor(item[key]);
            break;
          case 'vafcs18':
              item.pcs18 = this.asignarValor(item[key]);
            break;
          case 'vafcs19':
              item.pcs19 = this.asignarValor(item[key]);
            break;
          case 'vafcs20':
              item.pcs20 = this.asignarValor(item[key]);
            break;
          case 'vafcancer_opc':
              item.pcancer_opc = this.asignarValor(item[key]);
            break;
          case 'vafhiper_arte_opc':
              item.phiper_arte_opc = this.asignarValor(item[key]);
            break;
          case 'vafasma_opc':
              item.pasma_opc = this.asignarValor(item[key]);
            break;
          case 'vafcardio_opc':
              item.pcardio_opc = this.asignarValor(item[key]);
            break;
          case 'vafdiabet_opc':
              item.pdiabet_opc = this.asignarValor(item[key]);
            break;
          case 'vafalergia_opc':
              item.palergia_opc = this.asignarValor(item[key]);
            break;
          case 'vafartritis_opc':
              item.partritis_opc = this.asignarValor(item[key]);
            break;
          case 'vafem_opc':
              item.pem_opc = this.asignarValor(item[key]);
            break;
          case 'vafer_opc':
              item.per_opc = this.asignarValor(item[key]);
            break;
          case 'vafAF_p01':
              item.pAF_p01 = this.asignarValor(item[key]);
            break;
          case 'vafAF_p02':
              item.pAF_p02 = this.asignarValor(item[key]);
            break;
          case 'vafmujer40_opc':
              item.pmujer40_opc = this.asignarValor2(item[key]);
            break;
          case 'vafmujer40_var':
              item.pmujer40_var = this.asignarValor2(Number(item[key]));
            break;
          case 'vafhombre40_opc':
              item.phombre40_opc = this.asignarValor2(item[key]);
            break;
          case 'vafhombre40_var':
              item.phombre40_var = this.asignarValor2(Number(item[key]));
            break;
          case 'vafdiscapacidad_opc':
              item.pdiscapacidad_opc = this.asignarValor(item[key]);
            break;
          case 'vaf_familiap01_opc':
              item.pfamiliap01_opc = this.asignarValor3(item[key]);
            break;
          case 'vaf_familiap02_opc':
              item.pfamiliap02_opc = this.asignarValor3(item[key]);
            break;
          case 'vaf_actifisip01_opc':
              item.pactifisip01_opc = this.asignarValor3(item[key]);
            break;
          case 'vaf_actifisip02_opc':
              item.pactifisip02_opc = this.asignarValor4(item[key]);
            break;
          case 'vaf_nutricionp01_opc':
              item.pnutricionp01_opc = this.asignarValor4(item[key]);
            break;
          case 'vaf_nutricionp02_opc':
              item.pnutricionp02_opc = this.asignarValor5(item[key]);
            break;
          case 'vaf_nutricionp03_opc':
              item.pnutricionp03_opc = this.asignarValor6(item[key]);
            break;
          case 'vaf_tabacop01_opc':
              item.ptabacop01_opc = this.asignarValor7(item[key]);
            break;
          case 'vaf_tabacop02_opc':
              item.ptabacop02_opc = this.asignarValor8(item[key]);
            break;
          case 'vaf_alcoholp01_opc':
              item.palcoholp01_opc = this.asignarValor9(item[key]);
            break;
          case 'vaf_alcoholp02_opc':
              item.palcoholp02_opc = this.asignarValor10(item[key]);
            break;
          case 'vaf_alcoholp03_opc':
              item.palcoholp03_opc = this.asignarValor11(item[key]);
            break;
          case 'vaf_suenop01_opc':
              item.psuenop01_opc = this.asignarValor3(item[key]);
            break;
          case 'vaf_suenop02_opc':
              item.psuenop02_opc = this.asignarValor3(item[key]);
            break;
          case 'vaf_suenop03_opc':
              item.psuenop03_opc = this.asignarValor3(item[key]);
            break;
          case 'vaf_tipop01_opc':
              item.ptipop01_opc = this.asignarValor12(item[key]);
            break;
          case 'vaf_tipop02_opc':
              item.ptipop02_opc = this.asignarValor12(item[key]);
            break;
          case 'vaf_introspep01_opc':
              item.pintrospep01_opc = this.asignarValor3(item[key]);
            break;
          case 'vaf_introspep01_opc':
              item.pintrospep01_opc = this.asignarValor3(item[key]);
            break;
          case 'vaf_introspep02_opc':
              item.pintrospep02_opc = this.asignarValor12(item[key]);
            break;
          case 'vaf_introspep03_opc':
              item.pintrospep03_opc = this.asignarValor12(item[key]);
            break;
          case 'vaf_condup01_opc':
              item.pcondup01_opc = this.asignarValor3(item[key]);
            break;
          case 'vaf_condup02_opc':
              item.pcondup02_opc = this.asignarValor3(item[key]);
            break;
          case 'vaf_otrasdp01_opc':
              item.potrasdp01_opc = this.asignarValor10(item[key]);
            break;
          case 'vaf_otrasdp02_opc':
              item.potrasdp02_opc = this.asignarValor10(item[key]);
            break;
          case 'vaf_otrasdp03_opc':
              item.potrasdp03_opc = this.asignarValor13(item[key]);
            break;
        }
        
      }

      return {
        'CEDULA': item.vafcedula,
        'NOMBRE': item.vafidnombre.toUpperCase(),
        'SEXO': item.asigSexo,
        'EDAD': item.vafedad,
        'FECHA NACIMIENTO': fechaN,
        'GRUPO SANGUINEO': item.vafgruposanguineo,
        'CIUDAD': item.vafciudad.toUpperCase(),
        'CORREO': item.vafcorreo,
        'TELEFONO': item.vaftelefono,
        'EMPRESA': item.nombreEmp,
        'NOMBRE CARGO': item.vafcargo.toUpperCase(),
        'SEDE': item.vafsede.toUpperCase(),
        'ÁREA': item.nombreArea,
        'ECC - PESO': item.vafpeso,
        'ECC - TALLA': item.vaftalla,
        'ECC - IMC': item.vafimc,
        'ECC - PERIMETRO': item.vafperimetro,
        'ECR - P0': item.vafp0,
        'ECR - P1': item.vafp1,
        'ECR - P2': item.vafp2,
        'EM - TMCA': item.vaftestbiering,
        'EM - TPLD': item.vaftestpuenteder,
        'EM - TPLI': item.vaftestpuenteizq,
        'EM - TPP': item.vaftestresistronco,
        'EF - TFT': item.vaftestflextronco,
        'EF - MHD': item.vaftestmovhombder,
        'EF - MHI': item.vaftestmovhombizq,
        'CS - P1': item.pcs01,
        'CS - P2': item.pcs02,
        'CS - P3': item.pcs03,
        'CS - P4': item.pcs04,
        'CS - P5': item.pcs05,
        'CS - P6': item.pcs06,
        'CS - P7': item.pcs07,
        'CS - P8': item.pcs08,
        'CS - P9': item.pcs09,
        'CS - P10': item.pcs10,
        'CS - P11': item.pcs11,
        'CS - P12': item.pcs12,
        'CS - P13': item.pcs13,
        'CS - P14': item.pcs14,
        'CS - P14a': item.vafcs15,
        'CS - P15': item.pcs16,
        'CS - P16': item.pcs17,
        'CS - P17': item.pcs18,
        'CS - P18': item.pcs19,
        'CS - P19': item.pcs20,
        'CS - P19a': item.vafcs21,
        'AF - CANCER': item.pcancer_opc,
        'AF - CANCER RESP': item.vafcancer_var,
        'AF - HIPERTENSIÓN': item.phiper_arte_opc,
        'AF - HIPERTENSIÓN RESP': item.vafhiper_arte_var,
        'AF - ASMA': item.pasma_opc,
        'AF - ASMA RESP': item.vafasma_var,
        'AF - CARDIOPATIAS': item.pcardio_opc,
        'AF - CARDIOPATIAS RESP': item.vafcardio_var,
        'AF - DIABETES': item.pdiabet_opc,
        'AF - DIABETES RESP': item.vafdiabet_var,
        'AF - ALERGIAS': item.palergia_opc,
        'AF - ALERGIAS RESP': item.vafalergia_var,
        'AF - ARTRITIS': item.partritis_opc,
        'AF - ARTRITIS RESP': item.vafartritis_var,
        'AF - EM': item.pem_opc,
        'AF - EM RESP': item.vafem_var,
        'AF - ER': item.per_opc,
        'AF - ER RESP': item.vafer_var,
        'AF - P1': item.pAF_p01,
        'AF - P2': item.pAF_p02,
        'MUJER M40 P1': item.pmujer40_opc,
        'MUJER M40 P2': item.pmujer40_var,
        'HOMBRE M40 P1': item.phombre40_opc,
        'HOMBRE M40 P2': item.phombre40_var,
        'DISCAPACIDAD': item.pdiscapacidad_opc,
        'DISCAPACIDAD RESP': item.vafdiscapacidad_var,
        'TAEVF - F P1': item.pfamiliap01_opc,
        'TAEVF - F P2': item.pfamiliap02_opc,
        'TAEVF - F PUNTAJE': item.vaf_familia_num,
        'TAEVF - AF P1': item.pactifisip01_opc,
        'TAEVF - AF P2': item.pactifisip02_opc,
        'TAEVF - AF PUNTAJE': item.vaf_actifisi_num,
        'TAEVF - N P1': item.pnutricionp01_opc,
        'TAEVF - N P2': item.pnutricionp02_opc,
        'TAEVF - N P3': item.pnutricionp03_opc,
        'TAEVF - N P3 RESP': item.vaf_nutricionp03_var,
        'TAEVF - N PUNTAJE': item.vaf_nutricion_num,
        'TAEVF - T P1': item.ptabacop01_opc,
        'TAEVF - T P2': item.ptabacop02_opc,
        'TAEVF - T P2 RESP': item.vaf_tabacop02_var,
        'TAEVF - T PUNTAJE': item.vaf_tabaco_num,
        'TAEVF - A P1': item.palcoholp01_opc,
        'TAEVF - A P2': item.palcoholp02_opc,
        'TAEVF - A P3': item.palcoholp03_opc,
        'TAEVF - A PUNTAJE': item.vaf_alcohol_num,
        'TAEVF - SE P1': item.psuenop01_opc,
        'TAEVF - SE P2': item.psuenop02_opc,
        'TAEVF - SE P3': item.psuenop03_opc,
        'TAEVF - SE PUNTAJE': item.vaf_sueno_num,
        'TAEVF - TP P1': item.ptipop01_opc,
        'TAEVF - TP P2': item.ptipop02_opc,
        'TAEVF - TP PUNTAJE': item.vaf_tipo_num,
        'TAEVF - I P1': item.pintrospep01_opc,
        'TAEVF - I P2': item.pintrospep02_opc,
        'TAEVF - I P3': item.pintrospep03_opc,
        'TAEVF - I PUNTAJE': item.vaf_introspe_num,
        'TAEVF - CT P1': item.pcondup01_opc,
        'TAEVF - CT P2': item.pcondup02_opc,
        'TAEVF - CT PUNTAJE': item.vaf_condu_num,
        'TAEVF - O P1': item.potrasdp01_opc,
        'TAEVF - O P2': item.potrasdp02_opc,
        'TAEVF - O P3': item.potrasdp03_opc,
        'TAEVF - O PUNTAJE': item.vaf_otrasd_num,
        'TAEVF - PUNTAJE TOTAL': item.vaf_fantastico_total,
        'FECHA CREACIÓN': fechaC,

      }; 
    });  
    return arrTemp;
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
    this.makeRowsSameHeight();
  }

  async consultArea(id:number){
    await this.areasServices.buscarByArea(id).toPromise().then((data: any)=>{
      this.areasData = data;
    });
  }
  async consultEmpresa(){
    await this.empresaServices.getEmpresa().toPromise().then((data:any)=>{
      this.empresas = data;
    });
  }

  asignarValor(valor:number){
    let varTemp:string;
    switch (valor) {
      case 0:
        varTemp = 'NO';
        break;
      case 1:
        varTemp = 'SI';
        break;
      case 2:
        varTemp = 'NO SABE';
        break;
    }
    return varTemp;
  }

  asignarValor2(valor:number){
    let varTemp:string;
    switch (valor) {
      case 0:
        varTemp = 'NO';
        break;
      case 1:
        varTemp = 'SI';
        break;
      case 2:
        varTemp = 'NO APLICA';
        break;
    }
    return varTemp;
  }

  asignarValor3(valor:number){
    let varTemp:string;
    switch (valor) {
      case 0:
        varTemp = 'Casi nunca';
        break;
      case 1:
        varTemp = 'A veces';
        break;
      case 2:
        varTemp = 'Casi siempre';
        break;
    }
    return varTemp;
  }

  asignarValor4(valor:number){
    let varTemp:string;
    switch (valor) {
      case 0:
        varTemp = 'Menos de 1 vez por semana';
        break;
      case 1:
        varTemp = '1 a 3 veces por semana';
        break;
      case 2:
        varTemp = 'Ninguna de estas';
        break;
    }
    return varTemp;
  }

  asignarValor5(valor:number){
    let varTemp:string;
    switch (valor) {
      case 0:
        varTemp = 'Todas estas';
        break;
      case 1:
        varTemp = 'Algunas de estas';
        break;
      case 2:
        varTemp = '4 o más veces por semana';
        break;
    }
    return varTemp;
  }

  asignarValor6(valor:number){
    let varTemp:string;
    switch (valor) {
      case 0:
        varTemp = 'Más de 8 kilos';
        break;
      case 1:
        varTemp = '5 a 8 kilos  de más';
        break;
      case 2:
        varTemp = 'Normal o hasta 4 kilos de más';
        break;
    }
    return varTemp;
  }

  asignarValor7(valor:number){
    let varTemp:string;
    switch (valor) {
      case 0:
        varTemp = 'He fumado en este año';
        break;
      case 1:
        varTemp = 'No en el último año';
        break;
      case 2:
        varTemp = 'No en los últimos 5 años';
        break;
    }
    return varTemp;
  }

  asignarValor8(valor:number){
    let varTemp:string;
    switch (valor) {
      case 0:
        varTemp = 'Más de 10';
        break;
      case 1:
        varTemp = '0 a 10';
        break;
      case 2:
        varTemp = 'Ninguno';
        break;
    }
    return varTemp;
  }

  asignarValor9(valor:number){
    let varTemp:string;
    switch (valor) {
      case 0:
        varTemp = 'Más de 12 tragos';
        break;
      case 1:
        varTemp = '8 a 12 tragos';
        break;
      case 2:
        varTemp = '0 a 7 tragos';
        break;
    }
    return varTemp;
  }

  asignarValor10(valor:number){
    let varTemp:string;
    switch (valor) {
      case 0:
        varTemp = 'A menudo';
        break;
      case 1:
        varTemp = 'Ocasionalmente';
        break;
      case 2:
        varTemp = 'Nunca';
        break;
    }
    return varTemp;
  }

  asignarValor11(valor:number){
    let varTemp:string;
    switch (valor) {
      case 0:
        varTemp = 'A menudo';
        break;
      case 1:
        varTemp = 'Solo rara vez';
        break;
      case 2:
        varTemp = 'Nunca';
        break;
    }
    return varTemp;
  }

  asignarValor12(valor:number){
    let varTemp:string;
    switch (valor) {
      case 0:
        varTemp = 'A menudo';
        break;
      case 1:
        varTemp = 'Algunas veces';
        break;
      case 2:
        varTemp = 'Casi nunca';
        break;
    }
    return varTemp;
  }

  asignarValor13(valor:number){
    let varTemp:string;
    switch (valor) {
      case 0:
        varTemp = 'Más de 6 por día';
        break;
      case 1:
        varTemp = '3 a 6 por día';
        break;
      case 2:
        varTemp = 'Menos de 3 por día';
        break;
    }
    return varTemp;
  }

  asignarValorSexo(valor:string){
    let varTemp:string;
    switch (valor) {
      case 'F':
        varTemp = 'Femenino';
        break;
      case 'M':
        varTemp = 'Masculino';
        break;
    }
    return varTemp;
  }

}
