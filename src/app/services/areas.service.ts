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
  Url7pa = `${this.apiUrl}/lv/public/getidAreaEmp`;
  Url8pa = `${this.apiUrl}/lv/public/getidAreaVR`;
  Url9pa = `${this.apiUrl}/lv/public/getidAreaVF`;
  Url10pa = `${this.apiUrl}/lv/public/editArea`;
  
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

  buscarByAreaEmp(idEmp:number,idArea:number){
    return this.http.get(this.Url7pa +`/${idEmp}/${idArea}`);
  }

  buscarByAreaVR(idEmp:number,idArea:number){
    return this.http.get(this.Url8pa +`/${idEmp}/${idArea}`);
  }

  buscarByAreaVF(idEmp:number,idArea:number){
    return this.http.get(this.Url9pa +`/${idEmp}/${idArea}`);
  }

  buscarByAreaExpecifica(idE:number,id:number){
    return this.http.get(this.Url6pa + "/" + idE+"/"+id);
  }

  editArea(area: Area,id:number){
    return this.http.put<Area>(this.Url10pa + "/" + id,area);
  }
}
