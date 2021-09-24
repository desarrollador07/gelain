import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormatoA } from '../models/formatoAmodel';

@Injectable({
  providedIn: 'root'
})
export class FormatoAService {

  apiUrl:string = environment.urlGlobal;
  Url1fa = `${this.apiUrl}/lv/public/allformatoA`;
  Url2fa = `${this.apiUrl}/lv/public/createformatoA`;
  Url3fa = `${this.apiUrl}/lv/public/updateformatoA`;
  Url4fa = `${this.apiUrl}/lv/public/deleteformatoA`;
  Url5fa = `${this.apiUrl}/lv/public/getideForA`;
  
  constructor(private http: HttpClient) { }

  getFormatoA(){
    return this.http.get(this.Url1fa);
  }

  deleteFormatoA(formatoA: FormatoA){
    return this.http.delete<FormatoA>(this.Url4fa+"/"+formatoA.inaid);
  }

  createFormatoA(formatoA: FormatoA){
    return this.http.post<FormatoA>(this.Url2fa,formatoA);
  }

  updateFormatoA(formatoA: FormatoA,id:String){
    return this.http.put<FormatoA>(this.Url3fa + "/" + id,formatoA);
  }
  buscarByFa(id:number){
    return this.http.get(this.Url5fa + "/" + id);
  }
}
