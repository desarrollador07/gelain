import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { AppComponent} from './app.component';
import { Empresa } from './models/empresa.model';
import { PruebaService } from './services/prueba.service';
import { AppState } from './app.reducer';
import { Store } from '@ngrx/store';
import * as empresasActions from "./store/actions/empresa.actions";
import { EmpresaService } from './services/empresa.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.css']
})
export class AppTopBarComponent {

  idEmpresa:number;
  empresita:Empresa;
  nombre:string;
  empresa: SelectItem[] = [];
  empresas: Empresa[] = [];
  empresaSelect:any;
  imagen1:any = "https://gelainbienestarlaboral.com/GELAIN/img/usr01.jpg";
  imagen2:any = "https://gelainbienestarlaboral.com/GELAIN/img/usr02.jpg";
  imagen3:any = "https://gelainbienestarlaboral.com/GELAIN/img/usr03.jpg";
  imagenDefecto:any = "assets/layout/images/avatar.png"
  imagenfin:any;

    constructor(public app: AppComponent,
                private router: Router,
                private store: Store<AppState>,
                private pruebaservices: PruebaService,
                private empresaServices: EmpresaService) {

      this.nombre = localStorage.getItem("user");
      this.idEmpresa = Number(localStorage.getItem("idEmpresa"));
       if (localStorage.getItem("user")==="LINA") {
        this.imagenfin = this.imagen1;
      } else if (localStorage.getItem("user")==="JENNIFER") {
        this.imagenfin = this.imagen2;
      }else if(localStorage.getItem("user")==="MONICA"){
        this.imagenfin = this.imagen3;
      }else{
        this.imagenfin = this.imagenDefecto;
      }
    }

  ngOnInit() {

    /*Consulta de las empresas */
    this.consultaEmpresas();
    
  }

    buscarActualizarData(){

      this.store.dispatch(empresasActions.selectEmpresa({ id: parseInt(this.empresaSelect) }));
      let select = this.empresa.find(el => el.value == this.empresaSelect);
      localStorage.setItem("nombreEmpresa",select.label);
      localStorage.setItem('idEmpresa', this.empresaSelect);
      // this.router.navigate(["main/dashboard"]);

    }

    salir(){
      localStorage.clear();
      this.router.navigate(["/login"]);
    }

   async consultaEmpresas(){
      this.empresa = [];
      await this.empresaServices.getEmpresa().toPromise().then((data:any) => {

        this.empresas = data;
        this.empresas.map(x =>{
          this.empresa.push({
            label:x.empnombre,
            value:x.empid
          });
        });
        this.store.dispatch(
          empresasActions.addEmpresas({ list: data })
        );
      });

      if (this.idEmpresa !== 0) {
        this.empresaSelect = this.idEmpresa;
      }
      this.store.dispatch(empresasActions.selectEmpresa({ id: this.empresaSelect }));
    }

}
