import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { AppComponent} from './app.component';
import { Empresa } from './models/empresa.model';
import { PruebaService } from './services/prueba.service';
import { Empleado } from './models/empleado.mdel';
import { EmpleadosComponent } from './modules/empleados/empleados.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.css']
})
export class AppTopBarComponent {
  idEmpresa:any;
  empresita:Empresa;
 
  nombre:string;
  empresa: SelectItem[] = [];
  empresas: Empresa[] = [];
  a2: SelectItem[];
  pruebas: Empleado[] = [];
  imagen1:any = "https://gelainbienestarlaboral.com/GELAIN/img/usr01.jpg";
  imagen2:any = "https://gelainbienestarlaboral.com/GELAIN/img/usr02.jpg";
  imagen3:any = "https://gelainbienestarlaboral.com/GELAIN/img/usr03.jpg";
  imagenDefecto:any = "assets/layout/images/avatar.png"
  imagenfin:any;

    constructor(public app: AppComponent,private router: Router,private pruebaServices:PruebaService,public emCopm: EmpleadosComponent) {
      this.nombre = localStorage.getItem("user");
      console.log(this.nombre);
      this.idEmpresa = localStorage.getItem("nameEmpresaEmp");
      console.log("mi empresa:",this.idEmpresa);
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
   async ngOnInit() {

    await this.ValorData();



    }

    buscarActualizarData(arg){
      console.log("empresa " + arg.target.value);
      console.log("empleados:",this.empresas);
      for (let i = 0; i < this.empresas.length; i++) {
        this.empresita = this.empresas[i];
        if (this.empresita.empnombre == arg.target.value) {
           localStorage.setItem("nameEmpresaEmp",this.empresita.empid.toString())
           localStorage.setItem("nombreEmpresa",this.empresita.empnombre)
          this.router.navigate(["main/dashboard"]) 
          this.emCopm.actualizarData(this.empresita.empid);
        }
      }
      
      
    }



    salir(){
      localStorage.clear();
      this.router.navigate(["/login"]);
    }

    async ValorData(){
       this.pruebaServices.getEmpresa().toPromise().then((data:any)=>{
        this.empresas = data;
        this.empresas.map(x=>{
          this.empresa.push({
            label:x.empnombre,
            value: x.empid,
            
            
          }) 
        })
        console.log(this.empresa);
      })
    }

    DataEmpleado(arg){
    

       
    }
    
}
