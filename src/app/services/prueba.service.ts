import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Prueba } from '../models/prueba.model';
@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  Url1  ='https://www.prevensur.tiendasonline.com.co/qs_cartera/test/public/all';
  Url2 = 'https://www.prevensur.tiendasonline.com.co/qs_cartera/test/public/create';
  Url3 = 'https://www.prevensur.tiendasonline.com.co/qs_cartera/test/public/update';
  Url4 = 'https://www.prevensur.tiendasonline.com.co/qs_cartera/test/public/delete';

  Url1p  ='https://www.prevensur.tiendasonline.com.co/qs_cartera/test/public/allp';
  Url2p = 'https://www.prevensur.tiendasonline.com.co/qs_cartera/test/public/createp';
  Url3p = 'https://www.prevensur.tiendasonline.com.co/qs_cartera/test/public/updatep';
  Url4p = 'https://www.prevensur.tiendasonline.com.co/qs_cartera/test/public/deletep';


  constructor(private http: HttpClient) {
  }

  getPrueba(){
    return this.http.get(this.Url1p);
  }

  deletePrueba(prueba: Prueba){
    return this.http.delete<Prueba>(this.Url4p+"/"+prueba.pr_id);
  }

  createPrueba(prueba: Prueba){
    return this.http.post<Prueba>(this.Url2p,prueba);
  }

  updatePrueba(prueba: Prueba){
    return this.http.put<Prueba>(this.Url3p + "/" + prueba.pr_id,prueba);
  }
}
