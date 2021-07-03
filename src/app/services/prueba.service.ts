import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Empleado } from '../models/empleado.mdel';
import { Empresa } from '../models/empresa.model';
import { Area } from '../models/area.model';
import { FormatoA } from '../models/formatoAmodel';
import { Estres } from '../models/estres.nodel';
import { Extralaboral } from '../models/extralaboral.model';
import { FormatoB } from '../models/formatoB.model';
@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  Url1  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/allEmpleados';
  Url2 = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/createEmpleados';
  Url3 = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/updateEmpleados';
  Url4 = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/deleteEmpleados';

  Url1p  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/allEmpresa';
  Url2p = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/createEmpresa';
  Url3p = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/updateEmpresa';
  Url4p = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/deleteEmpresa';

  Url1pa  ='https://gelainbienestarlaboral.com/GELAIN/lv/public/allArea';
  Url2pa = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/createArea';
  Url3pa = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/updateArea';
  Url4pa = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/deleteArea';
  Url5pa = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/getideArea';

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


  constructor(private http: HttpClient) {
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

}
