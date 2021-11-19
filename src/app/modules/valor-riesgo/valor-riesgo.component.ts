import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppState } from 'src/app/app.reducer';
import { ValorRiesgoModel } from 'src/app/models/valor-riesgo.model';
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
  cols:any[];
  frozenCols: any[];

  constructor(private valoraRiesgoService: ValoracionRiesgosService,
              private _messageService: MessageService,
              private _confirmationServices: ConfirmationService,
              private store: Store<AppState>) {
               this.idEmpresa = localStorage.getItem('idEmpresa');   
  }

  async ngOnInit() {
    this.consultaStore();
    this.datosGenerales();
  }
  /*Elimina los datos de los registros  de la tabla */
  deleteVR(valorRiesgo: ValorRiesgoModel) {
    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este elemento?',
      header:'Confirmación',
      icon:'pi pi-exclamation-triangle',
      accept:() => {
        // this.vfService.deletevalorFisico(valorRiesgo)
        // .toPromise().then(data => {
        //   this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'El registro se ha eliminado', life: 3000})
        //   this.vfData = this.vfData.filter(r => r !== valorRiesgo);
        // });
      }
    });
  }
  /*Agrega el objeto selecionado de VF */
  editPrueba(vrData:ValorRiesgoModel){
    localStorage.setItem('valorRiesgo',JSON.stringify(vrData));
  }
  /*Remover items del localStorage */
  newVR(){
    localStorage.removeItem('valorFisico');
    localStorage.removeItem('prueba');
    localStorage.removeItem('IdEmpleado');
    localStorage.removeItem('ForA');
    localStorage.removeItem('ForAA');
    localStorage.removeItem('ForB');
    localStorage.removeItem('Extra');
    localStorage.removeItem('estres');
    localStorage.removeItem('estresEs');
  }
  /*Consulta los registros de la valoración Riesgos */
  async indexData(id:number){
    await this.valoraRiesgoService.getvalorRiesgoId(id).toPromise().then((data:ValorRiesgoModel[])=>{
      this.vrData = data;
      console.log("DATA", this.vrData);
      
      if (this.vrData.length > 0) {
        this.loading = false;
      }else{
        this.loading = false;
      }
    });
  }

  
  
  
  



  datosGenerales(){
    this.frozenCols = [
      { field: 'idpcedula', header: 'Cédula', width: '180px' }
    ];

    this.cols = [
      { field: 'idpnombre', header: 'Nombre', width: '350px' },
      { field: 'idpempresa', header: 'Empresa', width: '350px' },
      { field: 'idpfecha', header: 'Fecha', width: '160px' },
      { field: 'idparea', header: 'Area', width: '300px' },
      { field: 'idpsede', header: 'Sede', width: '180px' },
      { field: 'idptelefono', header: 'Telefono', width: '200px' },
      { field: 'idpestado', header: 'Estado', width: '100px' },
      { field: 'idphorario', header: 'Horario', width: '150px' }
    ];
  }

  consultaStore(){
    this.store.select('empresas').subscribe(async res=>{
      var id:number;
      if (res.empresa !== undefined) {
        id = res.empresa.empid;
      }else{
        id = this.idEmpresa;
      }
      if (id !== undefined && id !== null) {
        await this.indexData(id);
      }
     
    });
  }
}
