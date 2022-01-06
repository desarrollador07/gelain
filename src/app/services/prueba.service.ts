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
  UrlcontrolSobreRol = `${this.apiUrl}/lv/public/controlSobreRol`;
  UrlDemandasTrabajo = `${this.apiUrl}/lv/public/DemandasTrabajo`;
  Urlrecompensas = `${this.apiUrl}/lv/public/recompensas`;
  UrlliderazgoRB = `${this.apiUrl}/lv/public/liderazgoRelacionesB`;
  UrlcontrolSobreRolB = `${this.apiUrl}/lv/public/controlSobreRolB`;
  UrlDemandasTrabajoB= `${this.apiUrl}/lv/public/DemandasTrabajoB`;
  UrlrecompensasB = `${this.apiUrl}/lv/public/recompensasB`;
  UrlPSICOSOCIAL_EXTRALABORAL = `${this.apiUrl}/lv/public/PSICOSOCIAL_EXTRALABORAL`;
  UrlESTRES_DETALLES = `${this.apiUrl}/lv/public/ESTRES_DETALLES`;
  UrlESTRES = `${this.apiUrl}/lv/public/ESTRES`;
  UrlTotalGeneral = `${this.apiUrl}/lv/public/TotalGeneral`;
  UrlReporExcelDetallado = `${this.apiUrl}/lv/public/ReporteExcelDetallado`;
  UrlCiudadReporte = `${this.apiUrl}/lv/public/CiudadReporte`;
  UrlDatosPersonales = `${this.apiUrl}/lv/public/DatosFooter`;
  UrlDatosEmpleado = `${this.apiUrl}/lv/public/getidEmp`;
  UrlDatoBuscado = `${this.apiUrl}/lv/public/buscarReportesDetallados`;
  UrlReporteArea = `${this.apiUrl}/lv/public/ReporteArea`;
  UrlAllReporteDetallado = `${this.apiUrl}/lv/public/buscarReportesGenerales`;
  Url = `${this.apiUrl}/lv/public/buscarAreaFecha`;

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
  getBuscardorData(idEmpresa:number,  valorBuscado:string, tipo:number){
    return  this.http.get(this.UrlDatoBuscado + `/${idEmpresa}/${valorBuscado}/${tipo}`);
  }

  getReporteAreas(idEmpresa:number){
    return this.http.get(this.UrlReporteArea+`/${idEmpresa}`);
  }

  getAllReporteDetallado(){
    return this.http.get(this.UrlAllReporteDetallado);
  }

  buscarAreasByFechas(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.Url+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }
}
