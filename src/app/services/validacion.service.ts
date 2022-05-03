import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

    private config: { version: string };
    constructor(private httpClient: HttpClient) {}

    recargarPagina(){
        this.config = require("../../assets/config.json");

        const headers = new HttpHeaders()
        .set("Cache-Control", "no-cache")
        .set("Pragma", "no-cache");

        this.httpClient
        .get<{ version: string }>("assets/config.json", { headers })
        .subscribe(config => {
            if (config.version !== this.config.version) {
            this.httpClient
                .get("", { headers, responseType: "text" })
                .subscribe(() => location.reload());
            }
        });
    }
}