import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../../models/empleado.mdel';
import { PruebaService } from '../../services/prueba.service';
import { SelectItem,ConfirmationService,MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { Empresa } from 'src/app/models/empresa.model';
import { Area } from '../../models/area.model';
import { ReporteDetallado } from '../../models/reporteDetallado';

@Component({
  selector: 'app-empleados',
  templateUrl: './ReporteDetallado.component.html',
  styleUrls: ['./ReporteDetallado.component.css']
})
export class ReporteDetalladoComponent implements OnInit {
  idEmpresa:any;
  idtemporal:any;
  prueba: ReporteDetallado;

  pruebas: ReporteDetallado[] = [];
repor:ReporteDetallado[] = [];

 
  

  constructor(private pruebaServices:PruebaService,private router: Router,
              private _confirmationServices: ConfirmationService,
              private _messageService: MessageService) {
                this.idEmpresa = localStorage.getItem("nameEmpresaEmp");
                this.idtemporal = 0;    
   }

  async ngOnInit() {

    await this.pruebaServices
    .getReporteExcelDetallado(this.idEmpresa).toPromise().then((data: any)=>{
      this.pruebas = [...data];
      console.log("reportes", this.pruebas);
      

    }) 

  }



    exportPdf() {
      import("jspdf").then(jsPDF => {
          import("jspdf-autotable").then(x => {
              const doc = new jsPDF.default();
              //doc.autoTable(this.columns, this.pruebas);
              doc.save('empleados.pdf');
          })
      })
  }
  
  exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.getCars());
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "EMPLEADOS");
      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      import("file-saver").then(FileSaver => {
          let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
          let EXCEL_EXTENSION = '.xlsx';
          const data: Blob = new Blob([buffer], {
              type: EXCEL_TYPE
          });
          FileSaver.saveAs(data, fileName  + EXCEL_EXTENSION);
      });
  }

  getCars() {
      let pruebass = [];
      let arreglado :any;
      console.log("aa",this.pruebas);
      
      for(let car of this.pruebas) {
          car.emdnombres = car.emdnombres.toString()+" "+car.emdapellidos.toString();
          pruebass.push(car);
      }
      arreglado = pruebass.map( item => { 
        return {
          'CEDULA': item.emdcedula,
          'NOMBRE': item.emdnombres,
          
          'LIDERAZGO': item.Resintr_lider_liderazgo,
          'RELACIONES': item.Resintr_lider_relaciones,
          'RETROALIMENTACION': item.Resintr_lider_retroalimenta,
          'COLABORA': item.Resintr_lider_rela_colabora,
          'ROL': item.Resintr_lider_ctrl_rol,
          'CAPACITA': item.Resintr_lider_ctrl_capacita,
          'OPORTUNIDADES': item.Resintr_lider_ctrl_oportunidades,
          'PARTICIPACION': item.Resintr_lider_ctrl_participacion,
          'CONTROL': item.Resintr_lider_ctrl_control,
          'AMBIENTE':  item.Resintr_deman_ambiental,
          'RESPONSABLE':  item.Resintr_deman_responsa,
          'CONSISTENCIA':  item.Resintr_deman_consistencia,
          'EMOCIONALES': item.Resintr_deman_emocionales,
          'JORNADA': item.Resintr_deman_jornada,
          'INFLUENCIA': item.Resintr_deman_influencia,
          'CUANTITATIVA': item.Resintr_deman_cuantitativas,
          'MENTAL': item.Resintr_deman_carmental,
          'RECONOCIMIENTO': item.Resintr_recom_reconocimiento,
          'RECOMPENSAS': item.Resintr_recom_recompensas,

          'TIEMPOF':  item.Resextralab_tiempof,
          'RELACION FAMILIA':  item.Resextralab_relafami,
          'COMUNICACION':  item.Resextralab_comunicacion,
          'SITUACION ECONOMICA': item.Resextralab_situacion_econo,
          'VIVIENDA': item.Resextralab_carvivienda,
          'INFLUENCIAENT': item.Resextralab_influenciaent,
          'DESPLAZAMIENTO': item.Resextralab_desplazamiento,

          'FISIOLO': item.Resestres_fisiolo,
          'CORPORAL': item.Resestres_comporta,
          'INTELECTUAL': item.Resestres_intelectuales,
          'PSICOEMOCIONAL': item.Resestres_psicoemocionales,
    
                  }; 
      });
      console.log('pruebass',pruebass);
      return arreglado;
 
  }



}
