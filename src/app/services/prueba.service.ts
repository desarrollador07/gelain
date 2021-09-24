import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Empleado } from '../models/empleado.mdel';
import { Area } from '../models/area.model';
import { FormatoA } from '../models/formatoAmodel';
import { Estres } from '../models/estres.nodel';
import { Extralaboral } from '../models/extralaboral.model';
import { FormatoB } from '../models/formatoB.model';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  apiUrl:string = environment.urlGlobal;
  Url1 = `${this.apiUrl}/lv/public/allEmpleados`;
  Url2 = `${this.apiUrl}/lv/public/createEmpleados`;
  Url3 = `${this.apiUrl}/lv/public/updateEmpleados`;
  Url4 = `${this.apiUrl}/lv/public/deleteEmpleados`;
  Url5 = `${this.apiUrl}/lv/public/getid`;
  Url6 = `${this.apiUrl}/lv/public/allEmpleadosReportes`;
  Url7 = `${this.apiUrl}/lv/public/updateEstado`;

  Url1pa = `${this.apiUrl}/lv/public/allArea`;
  Url2pa = `${this.apiUrl}/lv/public/createArea`;
  Url3pa = `${this.apiUrl}/lv/public/updateArea`;
  Url4pa = `${this.apiUrl}/lv/public/deleteArea`;
  Url5pa = `${this.apiUrl}/lv/public/getideArea`;
  Url6pa = `${this.apiUrl}/lv/public/getideAreaUnica`;

  Url1fa = `${this.apiUrl}/lv/public/allformatoA`;
  Url2fa = `${this.apiUrl}/lv/public/createformatoA`;
  Url3fa = `${this.apiUrl}/lv/public/updateformatoA`;
  Url4fa = `${this.apiUrl}/lv/public/deleteformatoA`;
  Url5fa = `${this.apiUrl}/lv/public/getideForA`;

  Url1fb = `${this.apiUrl}/lv/public/allformatoB`;
  Url2fb = `${this.apiUrl}/lv/public/createformatoB`;
  Url3fb = `${this.apiUrl}/lv/public/updateformatoB`;
  Url4fb = `${this.apiUrl}/lv/public/deleteformatoB`;
  Url5fb = `${this.apiUrl}/lv/public/getideForB`;

  Url1es = `${this.apiUrl}/lv/public/allestres`;
  Url2es = `${this.apiUrl}/lv/public/createestres`;
  Url3es = `${this.apiUrl}/lv/public/updateestres`;
  Url4es = `${this.apiUrl}/lv/public/deleteestres`;
  Url5es = `${this.apiUrl}/lv/public/getideEstres`;

  Url1ex = `${this.apiUrl}/lv/public/allextra`;
  Url2ex = `${this.apiUrl}/lv/public/createextra`;
  Url3ex = `${this.apiUrl}/lv/public/updateextra`;
  Url4ex = `${this.apiUrl}/lv/public/deleteextra`;
  Url5ex = `${this.apiUrl}/lv/public/getideExtra`;


  UrlLogin = `${this.apiUrl}/lv2/public/api/auth/signin`;

  UrlliderazgoRA = `${this.apiUrl}/lv/public/liderazgoRelacionesA`;

  UrlcontrolSobreRol = `${this.apiUrl}/lv/public/controlSobreRol`;

  UrlDemandasTrabajo= `${this.apiUrl}/lv/public/DemandasTrabajo`;

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

  constructor(private http: HttpClient) {
  }

  logIn(user: User) {
    return this.http.post(this.UrlLogin, user).toPromise();
  }

  getPrueba(){
    return this.http.get(this.Url1);
  }

  deletePrueba(prueba: Empleado){
    return this.http.delete<Empleado>(this.Url4+"/"+prueba.emdid);
  }

  createPrueba(prueba: Empleado){
    return this.http.post<Empleado>(this.Url2,prueba);
  }

  updatePrueba(prueba: Empleado,id:String){
    return this.http.put<Empleado>(this.Url3 + "/" + id,prueba);
  }

  buscarByEmpleados(id:number){
    return this.http.get(this.Url5 + "/" + id);
  }
  buscarByEmpleadosRepor(id:number){
    return this.http.get(this.Url6+ "/" + id);
  }

  updateEstado(id:number){
    return this.http.get(this.Url7+ "/" + id);
  }

  getArea(){
    return this.http.get(this.Url1pa);
  }

  deleteArea(prueba: Area){
    return this.http.delete<Area>(this.Url4pa+"/"+prueba.areid);
  }

  createArea(prueba: Area){
    return this.http.post<Area>(this.Url2pa,prueba);
  }

  updateArea(prueba: Area,id:number){
    return this.http.put<Area>(this.Url3pa + "/" + id,prueba);
  }

 buscarByArea(id:number){
    return this.http.get(this.Url5pa + "/" + id);
  }

  buscarByAreaExpecifica(idE:number,id:number){
    return this.http.get(this.Url6pa + "/" + idE+"/"+id);
  }

  getFormatoA(){
    return this.http.get(this.Url1fa);
  }

  deleteFormatoA(prueba: FormatoA){
    return this.http.delete<FormatoA>(this.Url4fa+"/"+prueba.inaid);
  }

  createFormatoA(prueba: FormatoA){
    return this.http.post<FormatoA>(this.Url2fa,prueba);
  }

  updateFormatoA(prueba: FormatoA,id:String){
    return this.http.put<FormatoA>(this.Url3fa + "/" + id,prueba);
  }
  buscarByFa(id:number){
    return this.http.get(this.Url5fa + "/" + id);
  }

  
  getFormatoB(){
    return this.http.get(this.Url1fb);
  }

  deleteFormatoB(prueba: FormatoB){
    return this.http.delete<FormatoB>(this.Url4fb+"/"+prueba.inbid);
  }

  createFormatoB(prueba: FormatoB){
    return this.http.post<FormatoB>(this.Url2fb,prueba);
  }

  updateFormatoB(prueba: FormatoB,id:String){
    return this.http.put<FormatoB>(this.Url3fb + "/" + id,prueba);
  }
  buscarByFb(id:number){
    return this.http.get(this.Url5fb + "/" + id);
  }

  getEstres(){
    return this.http.get(this.Url1es);
  }

  deleteEstres(prueba: Estres){
    return this.http.delete<Estres>(this.Url4es+"/"+prueba.estid);
  }

  createEstres(prueba: Estres){
    return this.http.post<Estres>(this.Url2es,prueba);
  }

  updateEstres(prueba: Estres,id:String){
    return this.http.put<Estres>(this.Url3es + "/" + id,prueba);
  }
  buscarByEstres(id:number){
    return this.http.get(this.Url5es + "/" + id);
  }

  getExtra(){
    return this.http.get(this.Url1ex);
  }

  deleteExtra(prueba: Extralaboral){
    return this.http.delete<Extralaboral>(this.Url4ex+"/"+prueba.extid);
  }

  createExtra(prueba: Extralaboral){
    return this.http.post<Extralaboral>(this.Url2ex,prueba);
  }

  updateExtra(prueba: Extralaboral,id:String){
    return this.http.put<Extralaboral>(this.Url3ex + "/" + id,prueba);
  }
  buscarExtra(id:number){
    return this.http.get(this.Url5ex + "/" + id);
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
  getBuscardorData(idEmpresa:number,  valorBuscado:string, tipo:number){
    return  this.http.get(this.UrlDatoBuscado + `/${idEmpresa}/${valorBuscado}/${tipo}`);
  }

  getReporteAreas(idEmpresa:number){
    return this.http.get(this.UrlReporteArea+`/${idEmpresa}`);
  }

  getAllReporteDetallado(){
    return this.http.get(this.UrlAllReporteDetallado);
  }

  
/*  getIPAddress()  
  {  
    return this.http.get("http://api.ipify.org/?format=json");  
  } */

}
