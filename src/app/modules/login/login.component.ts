import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

import { ConfirmationService, MessageService } from "primeng/api";
import { routes } from '../../app.routes';
import { PruebaService } from '../../services/prueba.service';
import { async } from '@angular/core/testing';
import { User } from '../../models/user';



@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    providers: [ConfirmationService, MessageService],
})
export class LoginComponent implements OnInit {
    public formSubmitted = false;
    loginForm: FormGroup;
    user:String;
    password:String;
    usuarioR:User = {};
    token:string;
    err:User;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private pruebaservices: PruebaService,

 

    ) {
        this.crearFormulario();
    }

    async ngOnInit() {
        

        //  await this.configService.getEmisores()
        //  .toPromise().then((data: Emisor[]) =>{
        //    this.emisores = [...data];
        //    console.log(this.emisores);
        //    localStorage.setItem('id_emisor', this.emisores[0].id.toString());
        //  })
    }

    crearFormulario() {
        this.loginForm = this.fb.group({
            email: [],
            password: [],
        });
    }
    // get usuarioInvalid() {
    //   return (
    //     this.loginForm.get("user").invalid &&
    //     this.loginForm.get("user").touched
    //   );
    // }
    get passwordInvalid() {
        return (
            this.loginForm.get("pwd").invalid &&
            this.loginForm.get("pwd").touched
        );
    }

    ingresar() {
        this.pruebaservices.logIn(this.loginForm.value).then(async(resp: any)=>{

            if (resp.Autherror == "Unauthorized") {
                this.messageService.add({
                    severity: "error",
                    summary: "Verificar",
                    detail: "Usuario o contraseña no validos",
                    life: 3000,
                });
            }else{

                if (resp.access_token !== null ) {
                    console.log(resp);
                    this.usuarioR = resp.user;
                    console.log("user",this.usuarioR);
                    console.log("userN",this.usuarioR.name);
                    localStorage.setItem("token",resp.access_token);
                    localStorage.setItem("user",this.usuarioR.name);
                    this.router.navigate(["/main/dashboard"]);
                }
                else {
                    this.messageService.add({
                        severity: "error",
                        summary: "Verificar",
                        detail: "Usuario o contraseña no validos",
                        life: 3000,
                    });
                }
            }


            
        }
        );
    
    }
}
