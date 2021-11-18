import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-valor-riesgo',
  templateUrl: './valor-riesgo.component.html',
  styleUrls: ['./valor-riesgo.component.css']
})
export class ValorRiesgoComponent implements OnInit {

  vrData: any[] = [];/*Arreglo VR */
  idEmpresa:any;
  loading:boolean = true;
  cols:any[];
  frozenCols: any[];

  constructor(
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
  deleteVR(valorRiesgo: any) {
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
  editPrueba(vrData:any){
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
  /*Consulta los registros de la valoración física */
  async indexData(id:number){
    // await this.vfService.getvalorFisicoId(id).toPromise().then((data:any)=>{
    //   this.vfData = data;
      
    //   if (this.vfData.length > 0) {
    //     this.loading = false;
    //   }else{
    //     this.loading = false;
    //   }
    // });
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
