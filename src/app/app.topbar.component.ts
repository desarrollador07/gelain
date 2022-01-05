import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from './app.reducer';
import { Store } from '@ngrx/store';
import * as empresasActions from "./store/actions/empresa.actions";
/*Modulos */
import { SelectItem } from 'primeng/primeng';
/*Modelos */
import { Empresa } from './models/empresa.model';
/*Servicios */
import { EmpresaService } from './services/empresa.service';
/*Componente */
import { AppComponent} from './app.component';

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
  mobWidth: any;
  imgvalidator: boolean = true;
  imagen1:any = "https://gelainbienestarlaboral.com/GELAIN/img/usr01.jpg";
  imagen2:any = "https://gelainbienestarlaboral.com/GELAIN/img/usr02.jpg";
  imagen3:any = "https://gelainbienestarlaboral.com/GELAIN/img/usr03.jpg";
  imagenDefecto:any = "assets/layout/images/avatar.png"
  imagenfin:any;
  loading:boolean = true;

    constructor(public app: AppComponent,
                private router: Router,
                private store: Store<AppState>,
                private empresaServices: EmpresaService) {

      this.nombre = sessionStorage.getItem("user");
      this.idEmpresa = Number(sessionStorage.getItem("idEmpresa"));
       if (sessionStorage.getItem("user")==="LINA") {
        this.imagenfin = this.imagen1;
      } else if (sessionStorage.getItem("user")==="JENNIFER") {
        this.imagenfin = this.imagen2;
      }else if(sessionStorage.getItem("user")==="MONICA"){
        this.imagenfin = this.imagen3;
      }else{
        this.imagenfin = this.imagenDefecto;
      }
    }

    @HostListener("window:resize", ["$event"])
    onResize() {
        this.mobWidth = window.innerWidth;

        if (this.mobWidth <= 1024) {
            this.imgvalidator = false;
        } else {
            this.imgvalidator = true;
        }
    }

  ngOnInit() {

    /*Consulta de las empresas */
    this.consultaEmpresas();
    
  }

    buscarActualizarData(){

      this.store.dispatch(empresasActions.selectEmpresa({ id: parseInt(this.empresaSelect) }));
      let select = this.empresa.find(el => el.value == this.empresaSelect);
      sessionStorage.setItem("nombreEmpresa",select.label);
      sessionStorage.setItem('idEmpresa', this.empresaSelect);
      // this.router.navigate(["main/dashboard"]);

    }

    salir(){
      sessionStorage.clear();
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
          this.loading = false;
        });

        if (this.idEmpresa !== 0) {
          this.empresaSelect = this.idEmpresa;
        }
        this.store.dispatch(empresasActions.selectEmpresa({ id: this.empresaSelect }));
    }

}
