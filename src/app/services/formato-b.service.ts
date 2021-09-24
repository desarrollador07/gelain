import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormatoB } from '../models/formatoB.model';

@Injectable({
  providedIn: 'root'
})
export class FormatoBService {

  apiUrl:string = environment.urlGlobal;
  Url1fb = `${this.apiUrl}/lv/public/allformatoB`;
  Url2fb = `${this.apiUrl}/lv/public/createformatoB`;
  Url3fb = `${this.apiUrl}/lv/public/updateformatoB`;
  Url4fb = `${this.apiUrl}/lv/public/deleteformatoB`;
  Url5fb = `${this.apiUrl}/lv/public/getideForB`;

  constructor(private http: HttpClient) { }

  getFormatoB(){
    return this.http.get(this.Url1fb);
  }

  deleteFormatoB(formatoB: FormatoB){
    return this.http.delete<FormatoB>(this.Url4fb+"/"+formatoB.inbid);
  }

  createFormatoB(formatoB: FormatoB){
    return this.http.post<FormatoB>(this.Url2fb,formatoB);
  }

  updateFormatoB(formatoB: FormatoB,id:String){
    return this.http.put<FormatoB>(this.Url3fb + "/" + id,formatoB);
  }
  buscarByFb(id:number){
    return this.http.get(this.Url5fb + "/" + id);
  }
}
