import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
/*Modulos */
import { Message, MessageService } from 'primeng/api';
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

  seriesDataF: number[] = [];
  seriesDataM: number[] = [];
  validEmp:boolean = false;
  categories: string[] = ["Bajo Peso", "Peso Normal", "Sobrepeso", "Obesidad T1", "Obesidad T2","Obesidad T3"];
  seriesData2F: number[] = [];
  seriesData2M: number[] = [];
  categories2: string[] = ["Cumple", "No Cumple"];
  seriesData3: number[] = [];
  categories3: string[] = ["Excelente", "Bueno", "Medio", "Insuficiente", "Malo"];
  seriesData4Mop1: number[] = [];
  seriesData4Mop2: number[] = [];
  seriesData4Mop3: number[] = [];
  seriesData4Fop1: number[] = [];
  seriesData4Fop2: number[] = [];
  seriesData4Fop3: number[] = [];
  categories4: string[] = ["Excelente", "Bien", "Regular", "Malo"];
  seriesData5: number[] = [];
  categories5: string[] = ["Nivel Alto", "Nivel Medio", "Nivel Bajo"];
  seriesData6: number[] = [];
  categories6: string[] = ["Cancer", "Metabolicas", "Cardiacas","Enfermedades mentales","Otras"];
  seriesData7: number[] = [];
  categories7: string[] = ["Depresion", "Metabolicas", "Respiratorias","Cardiacas","Osteomusculares","Digestivos","S.N.C","Visual","Cancer","Otros"];
  seriesData8: number[] = [];
  categories8: string[] = ["Malo", "Regular", "Bien", "Excelente"];
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
  data2:any;/*Arreglo Antecedentes familiares de enfermedades T1*/
  dataCat2:any [] = [];/*Arreglo Antecedentes familiares de enfermedades T2*/
  sales8: any[] = [];/*Arreglo Condiciones de salud */
  dataCat:any [] = [];/*Arreglo Condiciones de salud T1 */
  data:any;/*Arreglo Condiciones de salud T2 */
  sales9: any[] = [];/*Arreglo Estilo de vida fantastico */
  nombreGelain:any;
  nitGelain:any;
  correoGelain:any;
  telefono:any;
  redGelain:any;
  fechaActual :Date = new Date();
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
  fechainicial: Date;
  fechafinal: Date;
  buscarData:string = '';
  selectBuscar:any = 1;
  id:any;
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
  
  constructor(private vfService: ValoracionFisicaService,
              private pruebaServices:PruebaService,
              private _messageService: MessageService,
              private datepipe: DatePipe,
              private store: Store<AppState>) {
                this.idEmpresa = sessionStorage.getItem('idEmpresa');
                this.nEmpresa = sessionStorage.getItem("nombreEmpresa"); 
                this.usuario = sessionStorage.getItem("user");  
               }

  ngOnInit() {
    this.dataGeneral();
    this.consultaStore();
    this.datosGelain();
  }
 /*Función que calcula y crea el arreglo para la grafica del IMC */
  fnIMC(){
    var cont1F:number = 0;
    var cont2F:number = 0;
    var cont3F:number = 0;
    var cont4F:number = 0;
    var cont5F:number = 0;
    var cont6F:number = 0;
    var cont1M:number = 0;
    var cont2M:number = 0;
    var cont3M:number = 0;
    var cont4M:number = 0;
    var cont5M:number = 0;
    var cont6M:number = 0;
    var totalF:number = 0;
    var totalM:number = 0;
    
    this.vfData.map( resp => {
      var imc:number = 0;
      
      imc = Number(resp.vafpeso) / Math.pow(Number(resp.vaftalla),2);

      if (resp.vafsexo === 'F') {

        if (imc < 18.5) {
          cont1F += 1;
        } else if (imc  >= 18.5 && imc <= 24.9) {
          cont2F += 1;
        } else if (imc >= 25 && imc <= 29.9) {
          cont3F += 1;
        } else if (imc >= 30 && imc <= 34.9){
          cont4F += 1;
        } else if (imc >= 35 && imc <= 39.9) {
          cont5F += 1;
        } else if (imc >= 40) {
          cont6F += 1;
        } 

      }else{

        if (imc < 18.5) {
          cont1M += 1;
        } else if (imc  >= 18.5 && imc <= 24.9) {
          cont2M += 1;
        } else if (imc >= 25 && imc <= 29.9) {
          cont3M += 1;
        } else if (imc >= 30 && imc <= 34.9){
          cont4M += 1;
        } else if (imc >= 35 && imc <= 39.9) {
          cont5M += 1;
        } else if (imc >= 40) {
          cont6M += 1;
        }
      }

    });
    totalF = cont1F + cont2F + cont3F + cont4F + cont5F + cont6F;
    totalM = cont1M + cont2M + cont3M + cont4M + cont5M + cont6M;
    
    this.sales = [
      { brand: 'Bajo Peso', hombre: cont1M, mujer: cont1F},
      { brand: 'Peso Normal', hombre: cont2M, mujer: cont2F },
      { brand: 'Sobrepeso', hombre: cont3M, mujer: cont3F },
      { brand: 'Obesidad T1', hombre: cont4M, mujer: cont4F },
      { brand: 'Obesidad T2', hombre: cont5M, mujer: cont5F },
      { brand: 'Obesidad T3', hombre: cont6M, mujer: cont6F },
      { brand: 'TOTAL', hombre: totalM, mujer: totalF },
    ];
    this.seriesDataF.push(cont1F,cont2F,cont3F,cont4F,cont5F,cont6F);
    this.seriesDataM.push(cont1M,cont2M,cont3M,cont4M,cont5M,cont6M);
  }
  /*Función que calcula y crea el arreglo para la grafica del perimetro Abdominal */
  fnPeriAbdo(){
    var cont1F:number = 0;
    var cont2F:number = 0;
    var cont1M:number = 0;
    var cont2M:number = 0;
    var totalM:number = 0;
    var totalF:number = 0;

    this.vfData.map( resp => {
        if (resp.vafsexo === "F" && resp.vafperimetro > 0 && resp.vafperimetro <= 81 ) {
          cont1F += 1;
        } else if (resp.vafsexo === "F" && resp.vafperimetro > 81 ) {
          cont2F += 1;
        } 

        if (resp.vafsexo === "M" && resp.vafperimetro > 0 && resp.vafperimetro <= 91 ) {
          cont1M += 1;
        } else if (resp.vafsexo === "M" && resp.vafperimetro > 91 ){
          cont2M += 1;
        } 
    });
    totalM = cont1M + cont2M;
    totalF = cont1F + cont2F;
    this.sales2 = [
      { brand: 'Cumple', hombre: cont1M, mujer: cont1F },
      { brand: 'No Cumple', hombre: cont2M, mujer: cont2F },
      { brand: 'TOTAL', hombre: totalM, mujer: totalF},
    ];

    this.seriesData2F.push(cont1F,cont2F);
    this.seriesData2M.push(cont1M,cont2M);
    
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

      if (resp.vafsexo === "M" && Number(resp.vafedad) <= 35) {
        if (Number(resp.vaftestbiering) >= 60 ) {
          cont1M35 += 1;
        } else if (Number(resp.vaftestbiering) < 60 &&  Number(resp.vaftestbiering) >= 45) {
          cont2M35 += 1;
        } else if (Number(resp.vaftestbiering) < 45 && Number(resp.vaftestbiering) >= 30) {
          cont3M35 += 1;
        } else if (Number(resp.vaftestbiering) < 30 && Number(resp.vaftestbiering) > 0) {
          cont4M35 += 1;
        }
      }

      if (resp.vafsexo === "M" && Number(resp.vafedad) > 35 && Number(resp.vafedad) <= 44) {
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
        } else if (Number(resp.vaftestbiering) < 15 && Number(resp.vaftestbiering) > 0) {
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
      
      if (resp.vafsexo === "F" && Number(resp.vafedad) <= 35) {
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

      if (resp.vafsexo === "F" && Number(resp.vafedad) > 35 && Number(resp.vafedad) <= 44) {
        if (Number(resp.vaftestbiering) >= 40 ) {
          cont1F44 += 1;
        } else if (Number(resp.vaftestbiering) < 40 &&  Number(resp.vaftestbiering) >= 25) {
          cont2F44 += 1;
        } else if (Number(resp.vaftestbiering) < 25 && Number(resp.vaftestbiering) >= 15) {
          cont3F44 += 1;
        } else if (Number(resp.vaftestbiering) < 15 && Number(resp.vaftestbiering) > 0) {
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
        } else if (Number(resp.vaftestbiering) < 10 && Number(resp.vaftestbiering) >= 0) {
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
    var cont4:number = 0;
    var cont5:number = 0;
    var totalCont1:number = 0;
    var totalCont2:number = 0;
    var totalCont3:number = 0;
    var totalCont4:number = 0;
    var totalCont5:number = 0;
    var total:number = 0;

    this.vfData.map(resp => {

      /*Categoria Cáncer  */
      if (resp.vafcancer_opc  === 1) {
        cont1 += 1;
      } 
      /*Categoria Metabólicas */
      if (resp.vafhiper_arte_opc === 1) {
        cont2 += 1;
      } 

      if (resp.vafdiabet_opc === 1){
        cont2 += 1;
      } 

      if (resp.vafer_opc === 1) {
        cont2 += 1;
      }

      /*Categoria Cardiacas */
      if (resp.vafcardio_opc === 1) {
        cont3 += 1;
      } 

      if (resp.vafAF_p01 === 1) {
        cont3 += 1;
      }

      if (resp.vafAF_p02 === 1) {
        cont3 += 1;
      }

      /*Categoria Enfermedades Mentales */
      if (resp.vafem_opc === 1) {
        cont4 += 1;
      } 

      /*Categoria Otros */
      if (resp.vafasma_opc === 1) {
        cont5 += 1;
      } 
      
      if (resp.vafalergia_opc === 1) {
        cont5 += 1;
      } 
      if (resp.vafartritis_opc === 1) {
        cont5 += 1;
      } 
      
      totalCont1 += cont1;
      totalCont2 += cont2;
      totalCont3 += cont3;
      totalCont4 += cont4;
      totalCont5 += cont5;

      cont1 = 0;
      cont2 = 0;
      cont3 = 0;
      cont4 = 0;
      cont5 = 0;
      
    });
    
    total = totalCont1 + totalCont2 + totalCont3 + totalCont4 + totalCont5;
 
    this.sales7 = [
      { brand: 'Cancer', rango: totalCont1 },
      { brand: 'Metabólicas', rango: totalCont2 },
      { brand: 'Cardiacas', rango: totalCont3 },
      { brand: 'Enfermedades mentales', rango: totalCont4 },
      { brand: 'Otras', rango: totalCont5 },
      { brand: 'TOTAL', rango: total },
    ];


    this.seriesData6.push(totalCont1,totalCont2,totalCont3,totalCont4,totalCont5);

  }
  /*Función que calcula y crea el arreglo para la grafica de la condición de salud */
  fncondSalud(){
    var contador1:number = 0;
    var contador2:number = 0;
    var contador3:number = 0;
    var contador4:number = 0;
    var contador5:number = 0;
    var contador6:number = 0;
    var contador7:number = 0;
    var contador8:number = 0;
    var contador9:number = 0;
    var contador10:number = 0;
    var totalcontador1:number = 0;
    var totalcontador2:number = 0;
    var totalcontador3:number = 0;
    var totalcontador4:number = 0;
    var totalcontador5:number = 0;
    var totalcontador6:number = 0;
    var totalcontador7:number = 0;
    var totalcontador8:number = 0;
    var totalcontador9:number = 0;
    var totalcontador10:number = 0;
    var total:number = 0;


    /*NOTA IMPORTANTE: A partir de la pregunta 14 en adelante se cuenta la 15 como 16 asi sucesivamente, la razón las subpreguntas que tienen estas */
    this.vfData.map(resp => {

      /*Categoria Depresión  P7*/
      if (resp.vafcs07 === 1) {
        contador1 += 1;
      } 

      /*Categoria Metabólicas P1,P2,P3 Y P5*/
      if (resp.vafcs01  === 1) {
        contador2 += 1;
      } 

      if (resp.vafcs02 === 1) {
        contador2 += 1;
      }

      if (resp.vafcs03 === 1) {
        contador2 += 1;
      }

      if (resp.vafcs05 === 1) {
        contador2 += 1;
      }

      /*Categoria Respiratorias P4*/
      if (resp.vafcs04 === 1) {
        contador3 += 1;
      } 

      /*Categoria Cardiacas P6 Y P16*/
      if (resp.vafcs06 === 1) {
        contador4 += 1;
      } 

      if (resp.vafcs17 === 1) {
        contador4 += 1;
      }

      /*Categoria Osteomusculares P10 Y P11*/
      if (resp.vafcs10 === 1 ) {
        contador5 += 1;
      }

      if (resp.vafcs11 === 1) {
        contador5 += 1;
      }

      /*Categoria Digestivos P13 */
      if ( resp.vafcs13 === 1) {
        contador6 += 1;
      }

      /*Categoria S.N.C P8 Y P9 */
      if (resp.vafcs08 === 1) {
        contador7 += 1;
      } 

      if (resp.vafcs09 === 1) {
        contador7 += 1;
      }

      /*Categoria Visual P17 Y P18 */
      if ( resp.vafcs18 === 1) {
        contador8 += 1;
      }

      if( resp.vafcs19 === 1){
        contador8 += 1;
      }

      /*Categoria Cáncer P15 */
      if (resp.vafcs16 === 1 ) {
        contador9 += 1;
      }

      /*Categoria Cáncer P12, P14 Y P19 */
      if (resp.vafcs12 === 1) {
        contador10 += 1;
      }

      if (resp.vafcs14 === 1) {
        contador10 += 1;
      }

      if (resp.vafcs20 === 1) {
        contador10 += 1;
      }

      totalcontador1 += contador1;
      totalcontador2 += contador2;
      totalcontador3 += contador3;
      totalcontador4 += contador4;
      totalcontador5 += contador5;
      totalcontador6 += contador6;
      totalcontador7 += contador7;
      totalcontador8 += contador8;
      totalcontador9 += contador9;
      totalcontador10 += contador10;

      contador1 = 0;
      contador2 = 0;
      contador3 = 0;
      contador4 = 0;
      contador5 = 0;
      contador6 = 0;
      contador7 = 0;
      contador8 = 0;
      contador9 = 0;
      contador10 = 0;
      
    });

    total = totalcontador1 + totalcontador2 + totalcontador3 + totalcontador4 + totalcontador5 + totalcontador6 + totalcontador7 + totalcontador8 + totalcontador9 + totalcontador10;
 
    this.sales8 = [
      { brand: 'Depresion ', rango: totalcontador1 },
      { brand: 'Metabolicas', rango: totalcontador2 },
      { brand: 'Respiratorias', rango: totalcontador3 },
      { brand: 'Cardiacas', rango: totalcontador4 },
      { brand: 'Osteomusculares', rango: totalcontador5 },
      { brand: 'Digestivos', rango: totalcontador6 },
      { brand: 'S.N.C', rango: totalcontador7 },
      { brand: 'Visual', rango: totalcontador8 },
      { brand: 'Cancer', rango: totalcontador9 },
      { brand: 'Otras', rango: totalcontador10 },
      { brand: 'TOTAL', rango: total },
    ];

    this.seriesData7.push(totalcontador1,totalcontador2,totalcontador3,totalcontador4,totalcontador5,totalcontador6,totalcontador7,totalcontador8,totalcontador9,totalcontador10);
  }

  colorHEX(){
    var color = "";
    for(var i=0;i<6;i++){
      color = color + this.generarLetra() ;
    }
    return "#" + color;
  }

  generarLetra(){
    var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
    var numero = (Math.random()*15).toFixed(0);
    return letras[numero];
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
      console.log("DATA", data);
      
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
    this.seriesDataF = [];
    this.seriesDataM = [];
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
    this.data = [];
    this.dataCat = [];
    this.data2 = [];
    this.dataCat2 = [];
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
    const fecini = new Date();
    this.fechainicial = new Date(fecini.getFullYear(), fecini.getMonth()-1, 1);
    this.fechafinal = new Date();
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

  /*Mensaje Informativo cuando esta seleccionada la empresa */
  showInfo2() {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Info', detail:'SELECCIONE UNA EMPRESA'});
  }
  /*Consulta los datos en el store cuando se cambia de empresa en el desplegable principal */
  consultaStore(){
    this.store.select('empresas').subscribe(async res=>{

      if (res.empresa !== undefined) {
        this.id = res.empresa.empid;
      }else{
        this.id = this.idEmpresa;
      }
      if (this.id !== undefined && this.id !== null) {
        this.loading = false;
        this.validEmp = false;
        this.msgs = [];
        await this.consultaVF(this.id);
      }

      if(sessionStorage.getItem('idEmpresa') === null){
        this.loading = false;
        this.validEmp = true;
        this.showInfo2();
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
    this.limpiarData();
    await this.vfService.buscarVFByFechas(id,fechaInicial,fechaFinal).toPromise().then((resp:ValorFisico[]) => {
      this.vfData = resp;
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

}
