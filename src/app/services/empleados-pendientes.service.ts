import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosPendientesService {
  
  apiUrl:string = environment.urlGlobal;
  Url = `${this.apiUrl}/lv/public/allEmpleadosPendientes/`;

  constructor(private http: HttpClient) { }

  getEmpleadosPendientes(id:number){
    return this.http.get(this.Url+`${id}`);
  }
}
