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
    
    arrTemp = this.vfData.map( item => { 
      switch (item.vafsexo) {
        case 'F':
          item.vafsexo = 'Femenino';
          break;
        case 'M':
          item.vafsexo = 'Masculino';
          break;
      }
      return {
        'CEDULA': item.vafcedula,
        'NOMBRE': item.vafidnombre.toUpperCase(),
        'SEXO': item.vafsexo,
        'EDAD': item.vafedad,
        'FECHA NACIMIENTO': item.vaffecha,
        'GRUPO SANGUINEO': item.vafgruposanguineo,
        'CIUDAD': item.vafciudad.toUpperCase(),
        'CORREO': item.vafcorreo,
        'TELEFONO': item.vaftelefono,
        'EMPRESA': item.nombreEmp,
        'NOMBRE CARGO': item.vafcargo.toUpperCase(),
        'SEDE': item.vafsede.toUpperCase(),
        'ÁREA': item.nombreArea
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

}
