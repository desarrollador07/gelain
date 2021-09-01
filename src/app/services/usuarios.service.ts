import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  Url = 'https://gelainbienestarlaboral.com/GELAIN/lv/public/allUsers';

  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get(this.Url);
  }

}
