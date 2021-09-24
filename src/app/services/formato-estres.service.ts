import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estres } from '../models/estres.nodel';

@Injectable({
  providedIn: 'root'
})
export class FormatoEstresService {

  apiUrl:string = environment.urlGlobal;
  Url1es = `${this.apiUrl}/lv/public/allestres`;
  Url2es = `${this.apiUrl}/lv/public/createestres`;
  Url3es = `${this.apiUrl}/lv/public/updateestres`;
  Url4es = `${this.apiUrl}/lv/public/deleteestres`;
  Url5es = `${this.apiUrl}/lv/public/getideEstres`;
  constructor(private http: HttpClient) { }

  getEstres(){
    return this.http.get(this.Url1es);
  }

  deleteEstres(formatoExtres: Estres){
    return this.http.delete<Estres>(this.Url4es+"/"+formatoExtres.estid);
  }

  createEstres(formatoExtres: Estres){
    return this.http.post<Estres>(this.Url2es,formatoExtres);
  }

  updateEstres(formatoExtres: Estres,id:String){
    return this.http.put<Estres>(this.Url3es + "/" + id,formatoExtres);
  }
  buscarByEstres(id:number){
    return this.http.get(this.Url5es + "/" + id);
  }
}
