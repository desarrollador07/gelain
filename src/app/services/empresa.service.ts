import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrl:string = environment.urlGlobal;
  Url1p = `${this.apiUrl}/lv/public/allEmpresa`;
  Url2p = `${this.apiUrl}/lv/public/createEmpresa`;
  Url3p = `${this.apiUrl}/lv/public/updateEmpresa`;
  Url4p = `${this.apiUrl}/lv/public/deleteEmpresa`;
  Url5p = `${this.apiUrl}/lv/public/getnobEmpresa`;
  
  constructor(private http: HttpClient) { }

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
}
