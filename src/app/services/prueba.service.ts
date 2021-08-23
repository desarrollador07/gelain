import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Empleado } from '../models/empleado.mdel';
import { Empresa } from '../models/empresa.model';
import { Area } from '../models/area.model';
import { FormatoA } from '../models/formatoAmodel';
import { Estres } from '../models/estres.nodel';
import { Extralaboral } from '../models/extralaboral.model';
import { FormatoB } from '../models/formatoB.model';
import { User } from '../models/user';

import { Observable } from 'rxjs';
import { ValorFisico } from '../models/valorFisico.model';
@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  Url1  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/allEmpleados';
  Url2 = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/createEmpleados';
  Url3 = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/updateEmpleados';
  Url4 = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/deleteEmpleados';
  Url5 = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/getid';
  Url6  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/allEmpleadosReportes';
  Url7  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/updateEstado';

  Url1p  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/allEmpresa';
  Url2p = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/createEmpresa';
  Url3p = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/updateEmpresa';
  Url4p = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/deleteEmpresa';
  Url5p  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/getnobEmpresa';

  Url1pa  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/allArea';
  Url2pa = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/createArea';
  Url3pa = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/updateArea';
  Url4pa = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/deleteArea';
  Url5pa = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/getideArea';
  Url6pa = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/getideAreaUnica';

  Url1fa  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/allformatoA';
  Url2fa = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/createformatoA';
  Url3fa = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/updateformatoA';
  Url4fa = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/deleteformatoA';
  Url5fa = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/getideForA';

  Url1fb  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/allformatoB';
  Url2fb = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/createformatoB';
  Url3fb = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/updateformatoB';
  Url4fb = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/deleteformatoB';
  Url5fb = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/getideForB';

  Url1es  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/allestres';
  Url2es = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/createestres';
  Url3es = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/updateestres';
  Url4es = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/deleteestres';
  Url5es = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/getideEstres';

  Url1ex  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/allextra';
  Url2ex = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/createextra';
  Url3ex = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/updateextra';
  Url4ex = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/deleteextra';
  Url5ex = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/getideExtra';

  Url1vf  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/allvalorFisico';
  Url2vf = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/createValorFisico';
  Url3vf = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/updateValorFisico';
  Url4vf = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/deleteValorFisico';
  Url5vf = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/getidempValor';

  UrlLogin = 'https://gelainbienestarlaboral.com/GELAIN/lv2/public/api/auth/signin';

  UrlliderazgoRA = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/liderazgoRelacionesA';

  UrlcontrolSobreRol = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/controlSobreRol';

  UrlDemandasTrabajo= 'https://gelainbienestarlaboral.com/GELAIN/lv/public/DemandasTrabajo';

  Urlrecompensas = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/recompensas';

  UrlliderazgoRB = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/liderazgoRelacionesB';

  UrlcontrolSobreRolB = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/controlSobreRolB';

  UrlDemandasTrabajoB= 'https://gelainbienestarlaboral.com/GELAIN/lv/public/DemandasTrabajoB';

  UrlrecompensasB = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/recompensasB';

  UrlPSICOSOCIAL_EXTRALABORAL = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/PSICOSOCIAL_EXTRALABORAL';

  UrlESTRES_DETALLES = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/ESTRES_DETALLES';

  UrlESTRES = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/ESTRES';

  UrlTotalGeneral = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/TotalGeneral';

  UrlReporExcelDetallado = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/ReporteExcelDetallado';

  UrlCiudadReporte = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/CiudadReporte';

  UrlDatosPersonales = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/DatosFooter';

  UrlDatosEmpleado = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/getidEmp';

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


  getEmpresa(){
    return this.http.get(this.Url1p);
  }

  deleteEmpresa(prueba: Empresa){
    return this.http.delete<Empresa>(this.Url4p+"/"+prueba.empid);
  }

  createEmpresa(prueba: Empresa){
    return this.http.post<Empresa>(this.Url2p,prueba);
  }

  updateEmpresa(prueba: Empresa,id:String){
    return this.http.put<Empresa>(this.Url3p + "/" + id,prueba);
  }

  getEmpresaId(id:number){
    return this.http.get(this.Url5p + "/" + id);
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

  //-----------------------------------------------------------
  getvalorFisico(){
    return this.http.get(this.Url1vf);
  }

  deletevalorFisico(prueba: ValorFisico){
    return this.http.delete<Extralaboral>(this.Url4vf+"/"+prueba.vafid);
  }

  createvalorFisico(prueba: ValorFisico){
    return this.http.post<ValorFisico>(this.Url2vf,prueba);
  }

  updatevalorFisico(prueba: ValorFisico,id:String){
    return this.http.put<ValorFisico>(this.Url3vf + "/" + id,prueba);
  }

  getvalorFisicoId(id:number){
    return this.http.get(this.Url5vf+ "/" + id);
  }
//------------------------------------------------------------
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

  


  
/*  getIPAddress()  
  {  
    return this.http.get("http://api.ipify.org/?format=json");  
  } */

}
