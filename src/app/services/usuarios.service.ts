import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/allUsers';
  url2 = `https://gelainbienestarlaboral.com/GELAIN/lv/public/deleteUser/`;
  

  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get(this.url);
  }

  deleteUsuarios(id:number){
    return this.http.get(this.url2 + `${id}`);
  }
}
