import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Empleado } from '../models/empleado.mdel';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  apiUrl:string = environment.urlGlobal;
  Url1 = `${this.apiUrl}/lv/public/allEmpleados`;
  Url2 = `${this.apiUrl}/lv/public/createEmpleados`;
  Url3 = `${this.apiUrl}/lv/public/updateEmpleados`;
  Url4 = `${this.apiUrl}/lv/public/deleteEmpleados`;
  Url5 = `${this.apiUrl}/lv/public/getid`;
  Url6 = `${this.apiUrl}/lv/public/allEmpleadosReportes`;
  Url7 = `${this.apiUrl}/lv/public/updateEstado`;
  constructor(private http: HttpClient) { }

  getPrueba(){
    return this.http.get(this.Url1);
  }

  deletePrueba(empleado: Empleado){
    return this.http.delete<Empleado>(this.Url4+"/"+empleado.emdid);
  }

  createPrueba(empleado: Empleado){
    return this.http.post<Empleado>(this.Url2,empleado);
  }

  updatePrueba(empleado: Empleado,id:String){
    return this.http.put<Empleado>(this.Url3 + "/" + id,empleado);
  }

  buscarByEmpleados(id:number){
    return this.http.get(this.Url5 + "/" + id);
  }
  buscarByEmpleadosRepor(id:number){
    return this.http.get(this.Url6+ "/" + id);
  }

  updateEstado(id:number){
    return this.http.get(this.Url7+ "/" + id);
  }
}
