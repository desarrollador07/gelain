import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Extralaboral } from '../models/extralaboral.model';

@Injectable({
  providedIn: 'root'
})
export class FormatoExtraService {

  apiUrl:string = environment.urlGlobal;
  Url1ex = `${this.apiUrl}/lv/public/allextra`;
  Url2ex = `${this.apiUrl}/lv/public/createextra`;
  Url3ex = `${this.apiUrl}/lv/public/updateextra`;
  Url4ex = `${this.apiUrl}/lv/public/deleteextra`;
  Url5ex = `${this.apiUrl}/lv/public/getideExtra`;
  constructor(private http: HttpClient) { }

  getExtra(){
    return this.http.get(this.Url1ex);
  }

  deleteExtra(extraL: Extralaboral){
    return this.http.delete<Extralaboral>(this.Url4ex+"/"+extraL.extid);
  }

  createExtra(extraL: Extralaboral){
    return this.http.post<Extralaboral>(this.Url2ex,extraL);
  }

  updateExtra(extraL: Extralaboral,id:String){
    return this.http.put<Extralaboral>(this.Url3ex + "/" + id,extraL);
  }
  buscarExtra(id:number){
    return this.http.get(this.Url5ex + "/" + id);
  }
}
