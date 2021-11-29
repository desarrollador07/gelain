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
    localStorage.setItem('valorRiesgo',JSON.stringify(vrData));
  }
  /*Remover items del localStorage */
  newVR(){
    localStorage.removeItem('valorRiesgo');
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
      
      if (this.vrData.length > 0) {
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
      { field: 'idpcedula', header: 'Cédula', width: '180px' }
    ];

    this.cols = [
      { field: 'idpnombre', header: 'Nombre', width: '350px' },
      { field: 'idpfecha', header: 'Fecha', width: '160px' },
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
