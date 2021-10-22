import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ValorFisico } from 'src/app/models/valorFisico.model';
import { ValoracionFisicaService } from 'src/app/services/valoracion-fisica.service';

@Component({
  selector: 'app-grafica-vf',
  templateUrl: './grafica-vf.component.html',
  styleUrls: ['./grafica-vf.component.css']
})
export class GraficaVfComponent implements OnInit {

  public seriesData: number[] = [];
  public categories: string[] = ["Bajo Peso", "Peso Normal", "Sobrepeso", "Obesidad Tipo 1", "Obesidad Tipo 2","Obesidad Tipo 3"];
  vfData: ValorFisico[] = [];
  idEmpresa:any;
  imc:number [] = [];
  loading:boolean = false;
  
  constructor(private vfService: ValoracionFisicaService,
              private store: Store<AppState>) {
                this.idEmpresa = localStorage.getItem('idEmpresa');   
               }

  ngOnInit() {

    this.store.select('empresas').subscribe(async res=>{
      var id:number;
      if (res.empresa !== undefined) {
        id = res.empresa.empid;
      }else{
        id = this.idEmpresa;
      }
      if (id !== undefined && id !== null) {
        this.loading = false;
        await this.consultaVF(id);
      }
     
    });

  }

  fnIMC(){

    var cont1:number = 0;
    var cont2:number = 0;
    var cont3:number = 0;
    var cont4:number = 0;
    var cont5:number = 0;
    var cont6:number = 0;
    
    this.vfData.map( resp => {
      var imc:number = 0;
      imc = Number(resp.vafpeso) / Math.pow(Number(resp.vaftalla),2)
      if (imc < 18.5) {
        cont1 += 1;
      } else if (imc  >= 18.5 && imc <= 24.9) {
        cont2 += 1;
      } else if (imc >= 25 && imc <= 29.9) {
        cont3 += 1;
      } else if (imc >= 30 && imc <= 34.9){
        cont4 += 1;
      } else if (imc >= 35 && imc <= 39.9) {
        cont5 += 1;
      } else if (imc >= 40) {
        cont6 += 1;
      }

    });

    this.seriesData.push(cont1,cont2,cont3,cont4,cont5,cont6);
    if (this.seriesData.length > 0) {
      this.loading = true;
    }
  }

  async consultaVF(id:number){
    this.vfData = [];
    this.seriesData = [];
    await this.vfService.getvalorFisicoId(id).toPromise().then((data:any)=>{
      this.vfData = data;
    });
    this.fnIMC();
  }

}
