import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ValorRiesgoModel } from '../models/valor-riesgo.model';

@Injectable({
  providedIn: 'root'
})
export class ValoracionRiesgosService {

  apiUrl:string = environment.urlGlobal;
  Url1vr = `${this.apiUrl}/lv/public/allvalorRiesgo`;
  Url2vr = `${this.apiUrl}/lv/public/createValorRiesgo`;
  Url3vr = `${this.apiUrl}/lv/public/updateValorRiesgo`;
  Url4vr = `${this.apiUrl}/lv/public/deleteValorRiesgo`;
  Url5vr = `${this.apiUrl}/lv/public/getidempValorRiesgo`;

  constructor(private http: HttpClient) { }

  getvalorRiesgo(){
    return this.http.get<ValorRiesgoModel[]>(this.Url1vr);
  }

  deletevalorRiesgo(id:number){
    return this.http.delete<ValorRiesgoModel>(this.Url4vr+"/"+id);
  }

  createvalorRiesgo(vr: ValorRiesgoModel){
    return this.http.post<ValorRiesgoModel>(this.Url2vr,vr);
  }

  updatevalorRiesgo(vr: ValorRiesgoModel,id:number){
    return this.http.put<ValorRiesgoModel>(this.Url3vr + "/" + id,vr);
  }

  getvalorRiesgoId(id:number){
    return this.http.get<ValorRiesgoModel[]>(this.Url5vr+ "/" + id);
  }
}
