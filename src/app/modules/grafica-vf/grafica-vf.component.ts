import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
/*Modulos */
import { Message } from 'primeng/api';
/*Modelos */
import { ValorFisico } from 'src/app/models/valorFisico.model';
/*Servicios */
import { PruebaService } from 'src/app/services/prueba.service';
import { ValoracionFisicaService } from 'src/app/services/valoracion-fisica.service';

@Component({
  selector: 'app-grafica-vf',
  templateUrl: './grafica-vf.component.html',
  styleUrls: ['./grafica-vf.component.css']
})
export class GraficaVfComponent implements OnInit {

  seriesData: number[] = [];
  categories: string[] = ["Bajo Peso", "Peso Normal", "Sobrepeso", "Obesidad T1", "Obesidad T2","Obesidad T3"];
  seriesData2F: number[] = [];
  seriesData2M: number[] = [];
  categories2: string[] = ["Bajo", "Ideal", "Alto"];
  seriesData3: number[] = [];
  categories3: string[] = ["Excelente", "Bueno", "Medio", "Insuficiente", "Malo"];
  seriesData4Mop1: number[] = [];
  seriesData4Mop2: number[] = [];
  seriesData4Mop3: number[] = [];
  seriesData4Fop1: number[] = [];
  seriesData4Fop2: number[] = [];
  seriesData4Fop3: number[] = [];
  categories4: string[] = ["Excelente", "Bien", "Regular", "Mal"];
  seriesData5: number[] = [];
  categories5: string[] = ["Nivel Alto", "Nivel Medio", "Nivel Bajo"];
  seriesData6: number[] = [];
  categories6: string[] = ["Nivel Alto", "Nivel Medio", "Nivel Bajo"];
  seriesData7: number[] = [];
  categories7: string[] = ["Nivel Alto", "Nivel Medio", "Nivel Bajo"];
  seriesData8: number[] = [];
  categories8: string[] = ["Mal", "Regular", "Bien", "Excelente"];
  vfData: ValorFisico[] = [];
  idEmpresa:any;
  imc:number [] = [];
  loading:boolean = false;
  loadingEmpty:boolean = true;
  msgs: Message[] = [];
  sales: any[] = [];/*Arreglo IMC */
  sales2: any[] = [];/*Arreglo Perimetro Abdominal */
  sales3: any[] = [];/*Arreglo Test Ruffier */
  sales4: any[] = [];/*Arreglo Nivel de estabilidad y resistencia del core (HOMBRES) */
  sales5: any[] = [];/*Arreglo Nivel de estabilidad y resistencia del core (MUJERES) */
  sales6: any[] = [];/*Arreglo Nivel de flexibilidad */
  sales7: any[] = [];/*Arreglo Antecedentes familiares de enfermedades */
  sales8: any[] = [];/*Arreglo Condiciones de salud */
  sales9: any[] = [];/*Arreglo Estilo de vida fantastico */
  nombreGelain:any;
  nitGelain:any;
  correoGelain:any;
  telefono:any;
  redGelain:any;
  fechaActual :Date;
  nEmpresa:any;
  usuario:any;
  hora:any;
  min:any;
  fecha:any;
  /*Titulos pdf */
  text1:any;
  text2:any;
  text3:any;
  text4:any;
  text5:any;
  text6:any;
  text7:any;
  text8:any;
  text9:any;
  
  constructor(private vfService: ValoracionFisicaService,
              private pruebaServices:PruebaService,
              private datepipe: DatePipe,
              private store: Store<AppState>) {
                this.idEmpresa = localStorage.getItem('idEmpresa');
                this.nEmpresa = localStorage.getItem("nombreEmpresa"); 
                this.usuario = localStorage.getItem("user");  
               }

  ngOnInit() {
    this.dataGeneral();
    this.consultaStore();
    this.datosGelain();
  }
 /*Función que calcula y crea el arreglo para la grafica del IMC */
  fnIMC(){
    var cont1:number = 0;
    var cont2:number = 0;
    var cont3:number = 0;
    var cont4:number = 0;
    var cont5:number = 0;
    var cont6:number = 0;
    var total:number = 0;
    
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
    total = cont1 + cont2 + cont3 + cont4 + cont5 + cont6;
    this.sales = [
      { brand: 'Bajo Peso', rango: cont1},
      { brand: 'Peso Normal', rango: cont2 },
      { brand: 'Sobrepeso', rango: cont3 },
      { brand: 'Obesidad T1', rango: cont4 },
      { brand: 'Obesidad T2', rango: cont5 },
      { brand: 'Obesidad T3', rango: cont6 },
      { brand: 'TOTAL', rango: total },
    ];
    this.seriesData.push(cont1,cont2,cont3,cont4,cont5,cont6);
  }
  /*Función que calcula y crea el arreglo para la grafica del perimetro Abdominal */
  fnPeriAbdo(){
    var cont1F:number = 0;
    var cont2F:number = 0;
    var cont3F:number = 0;
    var cont1M:number = 0;
    var cont2M:number = 0;
    var cont3M:number = 0;
    var totalM:number = 0;
    var totalF:number = 0;

    this.vfData.map( resp => {
        if (resp.vafsexo === "F" && resp.vafperimetro > 60 && resp.vafperimetro < 80 ) {
          cont1F += 1;
        } else if (resp.vafsexo === "F" && resp.vafperimetro >= 80 && resp.vafperimetro < 90) {
          cont2F += 1;
        } else if (resp.vafsexo === "F" && resp.vafperimetro >= 90 && resp.vafperimetro < 100) {
          cont3F += 1;
        }

        if (resp.vafsexo === "M" && resp.vafperimetro > 60 && resp.vafperimetro < 90 ) {
          cont1M += 1;
        } else if (resp.vafsexo === "M" && resp.vafperimetro >= 90 && resp.vafperimetro < 100) {
          cont2M += 1;
        } else if (resp.vafsexo === "M" && resp.vafperimetro >= 101 && resp.vafperimetro < 120) {
          cont3M += 1;
        }
    });
    totalM = cont1M + cont2M + cont3M ;
    totalF = cont1F + cont2F + cont3F;
    this.sales2 = [
      { brand: 'Bajo', hombre: cont1M, mujer: cont1F },
      { brand: 'Ideal', hombre: cont2M, mujer: cont2F },
      { brand: 'Alto', hombre: cont3M, mujer: cont3F },
      { brand: 'TOTAL', hombre: totalM, mujer: totalF},
    ];

    this.seriesData2F.push(cont1F,cont2F,cont3F);
    this.seriesData2M.push(cont1M,cont2M,cont3M);
    
  }
  /*Función que calcula y crea el arreglo para la grafica del Test de Ruffier */
  fnRuffierCRC(){
    var cont1:number = 0;
    var cont2:number = 0;
    var cont3:number = 0;
    var cont4:number = 0;
    var cont5:number = 0;
    var totalCR:number = 0;
    var total:number = 0;
    var p0:number = 0;
    var p1:number = 0;
    var p2:number = 0;

    this.vfData.map( resp => {

      p0 = Number(resp.vafp0);
      p1 = Number(resp.vafp1);
      p2 = Number(resp.vafp2);

      totalCR = ((p0 + p1 + p2) - 200) / 10;

      if (totalCR === 0) {
        cont1 += 1;
      }
  
      if (totalCR >= 0.1 && totalCR <= 5) {
        cont2 += 1;
      }
  
      if (totalCR >= 5.1 && totalCR <= 10) {
        cont3 += 1;
      }
  
      if (totalCR >= 10.1 && totalCR <= 15) {
        cont4 += 1;
      }
  
      if (totalCR >= 15.1 && totalCR <= 20) {
        cont5 += 1;
      }
    })

    total = cont1 + cont2 + cont3 + cont4 + cont5;

    this.sales3 = [
      { brand: 'Excelente', rango: cont1},
      { brand: 'Bueno', rango: cont2 },
      { brand: 'Medio', rango: cont3 },
      { brand: 'Insuficiente', rango: cont4 },
      { brand: 'Malo', rango: cont5 },
      { brand: 'TOTAL', rango: total },
    ];

    this.seriesData3.push(cont1,cont2,cont3,cont4,cont5);
  }
  /*Función que calcula y crea el arreglo para la grafica del nivel de estabilidad y resistencia del core (HOMBRES) */
  fnNivelERCHombre(){
    /*Hombres 35*/
    var cont1M35:number = 0;
    var cont2M35:number = 0;
    var cont3M35:number = 0;
    var cont4M35:number = 0;
    /*Hombres 44*/
    var cont1M44:number = 0;
    var cont2M44:number = 0;
    var cont3M44:number = 0;
    var cont4M44:number = 0;
    /*Hombres Mayor 44*/
    var cont1M50:number = 0;
    var cont2M50:number = 0;
    var cont3M50:number = 0;
    var cont4M50:number = 0;
    var total35:number = 0;
    var total44:number = 0;
    var total50:number = 0;

    this.vfData.map(resp => {

      if (resp.vafsexo === "M" && Number(resp.vafedad) < 35) {
        if (Number(resp.vaftestbiering) >= 60 ) {
          cont1M35 += 1;
        } else if (Number(resp.vaftestbiering) < 60 &&  Number(resp.vaftestbiering) >= 45) {
          cont2M35 += 1;
        } else if (Number(resp.vaftestbiering) < 45 && Number(resp.vaftestbiering) >= 30) {
          cont3M35 += 1;
        } else if (Number(resp.vaftestbiering) < 30 && Number(resp.vaftestbiering) >= 15) {
          cont4M35 += 1;
        }
      }

      if (resp.vafsexo === "M" && Number(resp.vafedad) <= 35 && Number(resp.vafedad) > 44) {
        if (Number(resp.vaftestbiering) >= 50 ) {
          cont1M44 += 1;
        } else if (Number(resp.vaftestbiering) < 50 &&  Number(resp.vaftestbiering) >= 40) {
          cont2M44 += 1;
        } else if (Number(resp.vaftestbiering) < 40 && Number(resp.vaftestbiering) >= 25) {
          cont3M44 += 1;
        } else if (Number(resp.vaftestbiering) < 25 && Number(resp.vaftestbiering) >= 10) {
          cont4M44 += 1;
        }
      }

      if (resp.vafsexo === "M" && Number(resp.vafedad) > 44) {
        if (Number(resp.vaftestbiering) >= 40 ) {
          cont1M50 += 1;
        } else if (Number(resp.vaftestbiering) < 40 &&  Number(resp.vaftestbiering) >= 25) {
          cont2M50 += 1;
        } else if (Number(resp.vaftestbiering) < 25 && Number(resp.vaftestbiering) >= 15) {
          cont3M50 += 1;
        } else if (Number(resp.vaftestbiering) < 15 && Number(resp.vaftestbiering) >= 5) {
          cont4M50 += 1;
        }
      }
    })

    total35 = cont1M35 + cont2M35 + cont3M35 + cont4M35;
    total44 = cont1M44 + cont2M44 + cont3M44 + cont4M44;
    total50 = cont1M50 + cont2M50 + cont3M50 + cont4M50;

    this.sales4 = [
      { brand: 'Excelente', hombre35: cont1M35, hombre44: cont1M44, hombre50: cont1M50 },
      { brand: 'Bien', hombre35: cont2M35, hombre44: cont2M44, hombre50: cont2M50 },
      { brand: 'Regular', hombre35: cont3M35, hombre44: cont3M44, hombre50: cont3M50 },
      { brand: 'Malo', hombre35: cont4M35, hombre44: cont4M44, hombre50: cont4M50 },
      { brand: 'TOTAL', hombre35: total35, hombre44: total44, hombre50: total50},
    ];

    this.seriesData4Mop1.push(cont1M35,cont2M35,cont3M35,cont4M35);
    this.seriesData4Mop2.push(cont1M44,cont2M44,cont3M44,cont4M44);
    this.seriesData4Mop3.push(cont1M50,cont2M50,cont3M50,cont4M50);

  }
  /*Función que calcula y crea el arreglo para la grafica del nivel de estabilidad y resistencia del core (MUJERES) */
  fnNivelERCMujer(){
    /*Mujeres 35*/
    var cont1F35:number = 0;
    var cont2F35:number = 0;
    var cont3F35:number = 0;
    var cont4F35:number = 0;
    /*Mujeres 44*/
    var cont1F44:number = 0;
    var cont2F44:number = 0;
    var cont3F44:number = 0;
    var cont4F44:number = 0;
    /*Mujeres Mayor 44*/
    var cont1F50:number = 0;
    var cont2F50:number = 0;
    var cont3F50:number = 0;
    var cont4F50:number = 0;
    var total35:number = 0;
    var total44:number = 0;
    var total50:number = 0;

    this.vfData.map(resp => {

      if (resp.vafsexo === "F" && Number(resp.vafedad) < 35) {
        if (Number(resp.vaftestbiering) >= 50 ) {
          cont1F35 += 1;
        } else if (Number(resp.vaftestbiering) < 50 &&  Number(resp.vaftestbiering) >= 40) {
          cont2F35 += 1;
        } else if (Number(resp.vaftestbiering) < 40 && Number(resp.vaftestbiering) >= 25) {
          cont3F35 += 1;
        } else if (Number(resp.vaftestbiering) < 25 && Number(resp.vaftestbiering) >= 10) {
          cont4F35 += 1;
        }
      }

      if (resp.vafsexo === "F" && Number(resp.vafedad) <= 35 && Number(resp.vafedad) > 44) {
        if (Number(resp.vaftestbiering) >= 40 ) {
          cont1F44 += 1;
        } else if (Number(resp.vaftestbiering) < 40 &&  Number(resp.vaftestbiering) >= 25) {
          cont2F44 += 1;
        } else if (Number(resp.vaftestbiering) < 25 && Number(resp.vaftestbiering) >= 15) {
          cont3F44 += 1;
        } else if (Number(resp.vaftestbiering) < 15 && Number(resp.vaftestbiering) >= 6) {
          cont4F44 += 1;
        }
      }

      if (resp.vafsexo === "F" && Number(resp.vafedad) > 44) {
        if (Number(resp.vaftestbiering) >= 30 ) {
          cont1F50 += 1;
        } else if (Number(resp.vaftestbiering) < 30 &&  Number(resp.vaftestbiering) >= 15) {
          cont2F50 += 1;
        } else if (Number(resp.vaftestbiering) < 15 && Number(resp.vaftestbiering) >= 10) {
          cont3F50 += 1;
        } else if (Number(resp.vaftestbiering) < 10 && Number(resp.vaftestbiering) >= 4) {
          cont4F50 += 1;
        }
      }
    })

    total35 = cont1F35 + cont2F35 + cont3F35 + cont4F35;
    total44 = cont1F44 + cont2F44 + cont3F44 + cont4F44;
    total50 = cont1F50 + cont2F50 + cont3F50 + cont4F50;

    this.sales5 = [
      { brand: 'Excelente', mujer35: cont1F35, mujer44: cont1F44, mujer50: cont1F50 },
      { brand: 'Bien', mujer35: cont2F35, mujer44: cont2F44, mujer50: cont2F50 },
      { brand: 'Regular', mujer35: cont3F35, mujer44: cont3F44, mujer50: cont3F50 },
      { brand: 'Malo', mujer35: cont4F35, mujer44: cont4F44, mujer50: cont4F50 },
      { brand: 'TOTAL', mujer35: total35, mujer44: total44, mujer50: total50},
    ];

    this.seriesData4Fop1.push(cont1F35,cont2F35,cont3F35,cont4F35);
    this.seriesData4Fop2.push(cont1F44,cont2F44,cont3F44,cont4F44);
    this.seriesData4Fop3.push(cont1F50,cont2F50,cont3F50,cont4F50);
  }
  /*Función que calcula y crea el arreglo para la grafica del nivel de flexibilidad */
  fnNvlFlex(){
    var cont1:number = 0;
    var cont2:number = 0;
    var cont3:number = 0;
    var total:number = 0;

    this.vfData.map( resp => {
      /*Nivel Alto */
      if (Number(resp.vaftestflextronco) > 0) {
        cont1 += 1;
        /*Nivel Medio */
      } else if (Number(resp.vaftestflextronco) === 0) {
        cont2 += 1;
        /*Nivel Bajo */
      } else {
        cont3 += 1;
      }
    })

    total = cont1 + cont2 + cont3;

    this.sales6 = [
      { brand: 'Nivel Alto', rango: cont1 },
      { brand: 'Nivel Medio', rango: cont2 },
      { brand: 'Nivel Bajo', rango: cont3 },
      { brand: 'TOTAL', rango: total },
    ];

    this.seriesData5.push(cont1,cont2,cont3);
  }
  /*Función que calcula y crea el arreglo para la grafica de los antecedentes familiares de enfermedades */
  fnAnteFami(){
    var cont1:number = 0;
    var cont2:number = 0;
    var cont3:number = 0;
    var total:number = 0;

    this.vfData.map(resp => {

      let cont:number = 0;

      if (resp.vafcancer_opc  === 1) {
        cont += 1;
      } 
      if (resp.vafhiper_arte_opc === 1) {
        cont += 1;
      } 
      if (resp.vafasma_opc === 1) {
        cont += 1;
      } 
      if (resp.vafcardio_opc === 1) {
        cont += 1;
      } 
      if (resp.vafdiabet_opc === 1){
        cont += 1;
      } 
      if (resp.vafalergia_opc === 1) {
        cont += 1;
      } 
      if (resp.vafartritis_opc === 1) {
        cont += 1;
      } 
      if (resp.vafem_opc === 1) {
        cont += 1;
      } 
      if (resp.vafer_opc === 1) {
        cont += 1;
      }

      if (cont < 3) {
        cont1 += 1;
      } else if (cont > 3  &&  cont <= 6) {
        cont2 += 1;
      } else  if (cont > 6 && cont <= 9) {
        cont3 += 1;
      }
    })

    total = cont1 + cont2 + cont3;

    this.sales7 = [
      { brand: 'Nivel Alto', rango: cont1 },
      { brand: 'Nivel Medio', rango: cont2 },
      { brand: 'Nivel Bajo', rango: cont3 },
      { brand: 'TOTAL', rango: total },
    ];

    this.seriesData6.push(cont1,cont2,cont3);
  }
  /*Función que calcula y crea el arreglo para la grafica de la condición de salud */
  fncondSalud(){
    var cont1:number = 0;
    var cont2:number = 0;
    var cont3:number = 0;
    var total:number = 0;

    this.vfData.map(resp => {

      let cont:number = 0;

      if (resp.vafcs01  === 1) {
        cont += 1;
      } 
      if (resp.vafcs02 === 1) {
        cont += 1;
      } 
      if (resp.vafcs03 === 1) {
        cont += 1;
      } 
      if (resp.vafcs04 === 1) {
        cont += 1;
      } 
      if (resp.vafcs05 === 1){
        cont += 1;
      } 
      if (resp.vafcs06 === 1) {
        cont += 1;
      } 
      if (resp.vafcs07 === 1) {
        cont += 1;
      } 
      if (resp.vafcs08 === 1) {
        cont += 1;
      } 
      if (resp.vafcs09 === 1) {
        cont += 1;
      }

      if (resp.vafcs10 === 1) {
        cont += 1;
      }

      if (resp.vafcs11 === 1) {
        cont += 1;
      }

      if (resp.vafcs12 === 1) {
        cont += 1;
      }

      if (resp.vafcs13 === 1) {
        cont += 1;
      }

      if (resp.vafcs14 === 1) {
        cont += 1;
      }

      if (resp.vafcs16 === 1) {
        cont += 1;
      }

      if (resp.vafcs17 === 1) {
        cont += 1;
      }

      if (resp.vafcs18 === 1) {
        cont += 1;
      }

      if (resp.vafcs19 === 1) {
        cont += 1;
      }

      if (resp.vafcs20 === 1) {
        cont += 1;
      }

      if (cont < 6) {
        cont1 += 1;
      } else if (cont > 6  &&  cont <= 12) {
        cont2 += 1;
      } else  if (cont > 12 && cont <= 19) {
        cont3 += 1;
      }
    })

    total = cont1 + cont2 + cont3;

    this.sales8 = [
      { brand: 'Nivel Alto', rango: cont1 },
      { brand: 'Nivel Medio', rango: cont2 },
      { brand: 'Nivel Bajo', rango: cont3 },
      { brand: 'TOTAL', rango: total },
    ];

    this.seriesData7.push(cont1,cont2,cont3);
  }
  /*Función que calcula y crea el arreglo para la grafica de estilo de vida fantastico */
  fnTestFantastico(){
    var cont1:number = 0;
    var cont2:number = 0;
    var cont3:number = 0;
    var cont4:number = 0;
    var total:number = 0;
    
    this.vfData.map(resp => {
      let total:number = 0;
      total = Number(resp.vaf_fantastico_total) 

      if( total > 0  && total <= 46){
        cont1 += 1;
      }
      if( total > 47 && total <= 72){
        cont2 += 1;
      }
      if( total > 73 && total <= 84){
        cont3 += 1;
      }
      if( total > 85 && total <= 100){
        cont4 += 1;
      }
    })

    total = cont1 + cont2 + cont3 + cont4;

    this.sales9 = [
      { brand: 'Malo', rango: cont1 },
      { brand: 'Regular', rango: cont2 },
      { brand: 'Bien', rango: cont3 },
      { brand: 'Excelente', rango: cont4 },
      { brand: 'TOTAL', rango: total },
    ];

    this.seriesData8.push(cont1, cont2, cont3, cont4);

  }
  /*Consulta los registros de la tabla valoración física */
  async consultaVF(id:number){
    this.limpiarData();
    await this.vfService.getvalorFisicoId(id).toPromise().then((data:any)=>{
      this.vfData = data;
      if (this.vfData.length === 0) {
        this.loadingEmpty = false;
        this.showInfo();
      }
      this.loading = true;
    });
    this.fnIMC();
    this.fnPeriAbdo();
    this.fnRuffierCRC();
    this.fnNivelERCHombre();
    this.fnNivelERCMujer();
    this.fnNvlFlex();
    this.fnAnteFami();
    this.fncondSalud();
    this.fnTestFantastico();
  }

  limpiarData(){
    this.loading = false;
    this.loadingEmpty = true;
    this.msgs = [];
    this.vfData = [];
    this.seriesData = [];
    this.seriesData2F = [];
    this.seriesData2M = [];
    this.seriesData3 = [];
    this.seriesData4Mop1 = [];
    this.seriesData4Mop2 = [];
    this.seriesData4Mop3 = [];
    this.seriesData4Fop1 = [];
    this.seriesData4Fop2 = [];
    this.seriesData4Fop3 = [];
    this.seriesData5 = [];
    this.seriesData6 = [];
    this.seriesData7 = [];
    this.seriesData8 = [];
    this.sales = [];
    this.sales2 = [];
    this.sales3 = [];
    this.sales4 = [];
    this.sales5 = [];
    this.sales6 = [];
    this.sales7 = [];
    this.sales8 = [];
    this.sales9 = [];
  }
  /*Data para la generación del pdf 1 */
  datosGelain(){
    this.pruebaServices.getDatosEmpresaGelain().subscribe((data:any)=>{
      this.nombreGelain = data.nombre;
      this.nitGelain= data.nit;
      this.correoGelain= data.correo;
      this.telefono= data.telefono;
      this.redGelain= data.instagram;

    })
  }

  /*Datos para la generación del pdf 2 Titulos y Fechas */
  dataGeneral(){
    this.fechaActual = new Date();
    const fechaAct = this.datepipe.transform(this.fechaActual, "yyyy-MM-dd");
    this.hora = this.fechaActual.getHours();
    this.min = this.fechaActual.getMinutes();
    this.fecha = fechaAct+" "+this.hora+":"+this.min;

    this.text1 = "IMC_"+this.fecha;
    this.text2 = "PA_"+this.fecha;
    this.text3 = "TRUFFIER_"+this.fecha;
    this.text4 = "NERCHOMBRE_"+this.fecha;
    this.text5 = "NERCMUJER_"+this.fecha;
    this.text6 = "NF_"+this.fecha;
    this.text7 = "AF_"+this.fecha;
    this.text8 = "CS_"+this.fecha;
    this.text9 = "EVF_"+this.fecha;
  }
  /*Mensaje Informativo cuando no hasy datos para la empresa seleccionada */
  showInfo() {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Info', detail:'LA EMPRESA SELECCIONADA NO CUENTA CON REGISTROS EN ESTE MOMENTO EN LA TABLA DE VALORACIÓN FÍSICA.'});
  }
  /*Consulta los datos en el store cuando se cambia de empresa en el desplegable principal */
  consultaStore(){
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

}
