import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apiUrl:string = environment.urlGlobal;
  url  = `${this.apiUrl}/lv/public/allUsers`;
  url2 = `${this.apiUrl}/lv/public/deleteUser/`;
  
  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get(this.url);
  }

  deleteUsuarios(id:number){
    return this.http.get(this.url2 + `${id}`);
  }
}
