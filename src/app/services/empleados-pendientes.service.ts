import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosPendientesService {

  Url = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/allEmpleadosPendientes/';

  constructor(private http: HttpClient) { }

  getEmpleadosPendientes(id:number){
    return this.http.get(this.Url+`${id}`);
  }
}
