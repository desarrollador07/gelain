import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Area } from '../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  apiUrl:string = environment.urlGlobal;
  Url1pa = `${this.apiUrl}/lv/public/allArea`;
  Url2pa = `${this.apiUrl}/lv/public/createArea`;
  Url3pa = `${this.apiUrl}/lv/public/updateArea`;
  Url4pa = `${this.apiUrl}/lv/public/deleteArea`;
  Url5pa = `${this.apiUrl}/lv/public/getideArea`;
  Url6pa = `${this.apiUrl}/lv/public/getideAreaUnica`;
  
  constructor(private http: HttpClient) { }
  
  
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
}
