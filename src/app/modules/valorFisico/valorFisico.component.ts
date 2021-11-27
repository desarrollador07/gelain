import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as valoraFisicaAction from '../../store/actions/vf.actions';
/*Model */
import { ValorFisico } from '../../models/valorFisico.model';
/*Modulos */
import { MessageService, ConfirmationService } from 'primeng/api';
/*Servicios */
import { ValoracionFisicaService } from 'src/app/services/valoracion-fisica.service';


@Component({
  selector: 'app-form-prueba',
  templateUrl: './valorFisico.component.html',
  styleUrls: ['./valorFisico.component.css']
})
export class ValorfisicoComponent implements OnInit {

  vfData: ValorFisico[] = [];/*Arreglo VF */
  idEmpresa:any;
  loading:boolean = true;
  cols:any[] = [];
  frozenCols: any[] = [];

  constructor(private vfService: ValoracionFisicaService,
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
    localStorage.setItem('valorFisico',JSON.stringify(vfData));
  }
  /*Remover items del localStorage */
  newcPrueba(){
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
  /*Consulta los registros de la valoración física */
  async indexData(id:number){
    await this.vfService.getvalorFisicoId(id).toPromise().then((data:any)=>{
      this.vfData = data;
      
      if (this.vfData.length > 0) {
        this.store.dispatch(
          valoraFisicaAction.addValoFisicas({ list: data })
        );
        this.loading = false;
      }else{
        this.loading = false;
      }
    });
  }

  datosGenerales(){
    this.frozenCols = [
      { field: 'vafcedula', header: 'Cédula', width: '180px' }
    ];

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
      { field: 'vafperimetro', header: 'Perimetro', width: '125px' }
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
