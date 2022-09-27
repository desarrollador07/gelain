import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contactos } from '../models/contactos.model';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  apiUrl:string = environment.urlGlobal;
  Url1pa = `${this.apiUrl}/lv/public/allContacto`;
  Url2pa = `${this.apiUrl}/lv/public/createContacto`;
  Url3pa = `${this.apiUrl}/lv/public/updateContacto`;
  Url4pa = `${this.apiUrl}/lv/public/deleteContacto`;
  Url5pa = `${this.apiUrl}/lv/public/lv/public/getideContacto`;
  Url6pa = `${this.apiUrl}/lv/public/getEstadoContac`;



  constructor(private http: HttpClient) { }

  getContactos(){
    return this.http.get(this.Url1pa);
  }

  deleteContactos(contactos: Contactos){
    return this.http.delete(this.Url4pa+"/"+contactos.con_id);
  }
  createContactos(contactos: Contactos){
    return this.http.post(this.Url2pa,contactos);
  }
  updateContactos(contactos: Contactos, id:number){
    return this.http.put(this.Url3pa+"/"+id,contactos)
  }
  getIdContacto(id: number){
      return this.http.get(this.Url5pa+"/"+id)
  }
  getEstadoContactos(){
    return this.http.get(this.Url6pa);
  }
}
