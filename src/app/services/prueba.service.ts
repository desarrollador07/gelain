import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  apiUrl:string = environment.urlGlobal;

  UrlLogin = `${this.apiUrl}/lv2/public/api/auth/signin`;

  UrlliderazgoRA = `${this.apiUrl}/lv/public/liderazgoRelacionesA`;
  UrlliderazgoRAFecha = `${this.apiUrl}/lv/public/liderazgoRelacionesAByFecha`;

  UrlcontrolSobreRol = `${this.apiUrl}/lv/public/controlSobreRol`;
  UrlcontrolSobreRolFecha = `${this.apiUrl}/lv/public/controlSobreRolByFecha`;

  UrlDemandasTrabajo = `${this.apiUrl}/lv/public/DemandasTrabajo`;
  UrlDemandasTrabajoFecha = `${this.apiUrl}/lv/public/DemandasTrabajoByFecha`;

  Urlrecompensas = `${this.apiUrl}/lv/public/recompensas`;
  UrlrecompensasFecha = `${this.apiUrl}/lv/public/recompensasByFecha`;

  UrlliderazgoRB = `${this.apiUrl}/lv/public/liderazgoRelacionesB`;
  UrlliderazgoRBFecha = `${this.apiUrl}/lv/public/liderazgoRelacionesBByFecha`;

  UrlcontrolSobreRolB = `${this.apiUrl}/lv/public/controlSobreRolB`;
  UrlcontrolSobreRolBFecha = `${this.apiUrl}/lv/public/controlSobreRolBByFecha`;

  UrlDemandasTrabajoB = `${this.apiUrl}/lv/public/DemandasTrabajoB`;
  UrlDemandasTrabajoBFecha = `${this.apiUrl}/lv/public/DemandasTrabajoBByFecha`;

  UrlrecompensasB = `${this.apiUrl}/lv/public/recompensasB`;
  UrlrecompensasBFecha = `${this.apiUrl}/lv/public/recompensasBByFecha`;

  UrlPSICOSOCIAL_EXTRALABORAL = `${this.apiUrl}/lv/public/PSICOSOCIAL_EXTRALABORAL`;
  UrlPSICOSOCIAL_EXTRALABORALFecha = `${this.apiUrl}/lv/public/PSICOSOCIAL_EXTRALABORALByFecha`;

  UrlESTRES_DETALLES = `${this.apiUrl}/lv/public/ESTRES_DETALLES`;
  UrlESTRES_DETALLESFecha = `${this.apiUrl}/lv/public/ESTRES_DETALLESByFecha`;

  UrlESTRES = `${this.apiUrl}/lv/public/ESTRES`;
  UrlESTRESFecha = `${this.apiUrl}/lv/public/ESTRESByFecha`;

  UrlTotalGeneral = `${this.apiUrl}/lv/public/TotalGeneral`;
  UrlTotalGeneralFecha = `${this.apiUrl}/lv/public/TotalGeneralByFecha`;

  UrlReporExcelDetallado = `${this.apiUrl}/lv/public/ReporteExcelDetallado`;
  UrlCiudadReporte = `${this.apiUrl}/lv/public/CiudadReporte`;
  UrlDatosPersonales = `${this.apiUrl}/lv/public/DatosFooter`;
  UrlDatosEmpleado = `${this.apiUrl}/lv/public/getidEmp`;
  UrlDatoBuscado = `${this.apiUrl}/lv/public/buscarReportesDetallados`;
  UrlReporteArea = `${this.apiUrl}/lv/public/ReporteArea`;
  UrlAllReporteDetallado = `${this.apiUrl}/lv/public/buscarReportesGenerales`;

  constructor(private http: HttpClient) {
  }

  logIn(user: User) {
    return this.http.post(this.UrlLogin, user).toPromise();
  }

  getLiderazgoRA(id:number){
    return this.http.get(this.UrlliderazgoRA+ "/" + id);
  }

  getcontrolSobreRol(id:number){
    return this.http.get(this.UrlcontrolSobreRol+ "/" + id);
  }

  getDemandasTrabajo(id:number){
    return this.http.get(this.UrlDemandasTrabajo+ "/" + id);
  }

  getRecompensas(id:number){
    return this.http.get(this.Urlrecompensas+ "/" + id);
  }

  getLiderazgoRB(id:number){
    return this.http.get(this.UrlliderazgoRB+ "/" + id);
  }

  getcontrolSobreRolB(id:number){
    return this.http.get(this.UrlcontrolSobreRolB+ "/" + id);
  }

  getDemandasTrabajoB(id:number){
    return this.http.get(this.UrlDemandasTrabajoB+ "/" + id);
  }

  getRecompensasB(id:number){
    return this.http.get(this.UrlrecompensasB+ "/" + id);
  }

  getPSICOSOCIAL_EXTRALABORAL(id:number){
    return this.http.get(this.UrlPSICOSOCIAL_EXTRALABORAL+ "/" + id);
  }

  getESTRES_DETALLES(id:number){
    return this.http.get(this.UrlESTRES_DETALLES+ "/" + id);
  }

  getESTRESTOTAL(id:number){
    return this.http.get(this.UrlESTRES+ "/" + id);
  }

  getTotalGeneral(id:number){
    return this.http.get(this.UrlTotalGeneral+ "/" + id);
  }

  getReporteExcelDetallado(id:number){
    return this.http.get(this.UrlReporExcelDetallado+ "/" + id);
  }
  /*   getReporteExcelDetallado(id:number,nom:string){
    return this.http.get(this.UrlReporExcelDetallado+ "/" + id+"/"+nom);
  } */

  getCiudadReporte(id:number){
    return this.http.get(this.UrlCiudadReporte+ "/" + id);
  }

  getDatosEmpresaGelain(){
    return this.http.get(this.UrlDatosPersonales);
  }

  getEmpleadoId(id:string){
    return this.http.get(this.UrlDatosEmpleado+ "/" + id);
  }

  /* SERVICIOS NUEVOS 23-08-2021 MODULO: REPORTE DETALLADO POR EMPLEADO */
  getBuscardorData(idEmpresa:number,  valorBuscado:string, tipo:number, check:number,fechaInicial:string, fechaFinal:string){
    return  this.http.get(this.UrlDatoBuscado +`/${idEmpresa}/${valorBuscado}/${tipo}/${check}/${fechaInicial}/${fechaFinal}`);
  }

  getReporteAreas(idEmpresa:number){
    return this.http.get(this.UrlReporteArea+`/${idEmpresa}`);
  }

  getAllReporteDetallado(){
    return this.http.get(this.UrlAllReporteDetallado);
  }

  /*Servicios consulta por fecha */
  getLiderazgoRAByFecha(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.UrlliderazgoRAFecha+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }

  getLiderazgoRBByFecha(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.UrlliderazgoRBFecha+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }

  getcontrolSobreRolByFecha(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.UrlcontrolSobreRolFecha+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }

  getcontrolSobreRolBByFecha(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.UrlcontrolSobreRolBFecha+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }

  getDemandasTrabajoByFecha(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.UrlDemandasTrabajoFecha+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }

  getDemandasTrabajoBByFecha(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.UrlDemandasTrabajoBFecha+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }

  getRecompensasByFecha(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.UrlrecompensasFecha+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }

  getRecompensasBByFecha(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.UrlrecompensasBFecha+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }

  getPSICOSOCIAL_EXTRALABORALByFecha(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.UrlPSICOSOCIAL_EXTRALABORALFecha+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }

  getESTRES_DETALLESByFecha(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.UrlESTRES_DETALLESFecha+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }

  getTotalGeneralByFecha(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.UrlTotalGeneralFecha+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }

  getESTRESTOTALByFecha(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.UrlESTRESFecha+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }

}
