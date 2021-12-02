import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ValorFisico } from '../models/valorFisico.model';

@Injectable({
  providedIn: 'root'
})
export class ValoracionFisicaService {

  apiUrl:string = environment.urlGlobal;
  Url1vf = `${this.apiUrl}/lv/public/allvalorFisico`;
  Url2vf = `${this.apiUrl}/lv/public/createValorFisico`;
  Url3vf = `${this.apiUrl}/lv/public/updateValorFisico`;
  Url4vf = `${this.apiUrl}/lv/public/deleteValorFisico`;
  Url5vf = `${this.apiUrl}/lv/public/getidempValor`;
  Url6vf = `${this.apiUrl}/lv/public/buscarVFFecha`;

  constructor(private http: HttpClient) { }

  getvalorFisico(){
    return this.http.get(this.Url1vf);
  }

  deletevalorFisico(vf: ValorFisico){
    return this.http.delete<ValorFisico>(this.Url4vf+"/"+vf.vafid);
  }

  createvalorFisico(vf: ValorFisico){
    return this.http.post<ValorFisico>(this.Url2vf,vf);
  }

  updatevalorFisico(vf: ValorFisico,id:String){
    return this.http.put<ValorFisico>(this.Url3vf + "/" + id,vf);
  }

  getvalorFisicoId(id:number){
    return this.http.get(this.Url5vf+ "/" + id);
  }

  buscarVFByFechas(id:number, fechaInicial:string, fechaFinal:string){
    return this.http.get(this.Url6vf+ `/${id}/${fechaInicial}/${fechaFinal}`);
  }
}
