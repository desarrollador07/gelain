import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { ConfirmationService, MessageService } from "primeng/api";
import { PruebaService } from '../../services/prueba.service';
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
        private pruebaservices: PruebaService
    ) {
        this.crearFormulario();
    }

    async ngOnInit() {
        localStorage.clear();
    }

    crearFormulario() {
        this.loginForm = this.fb.group({
            email: [],
            password: [],
        });
    }
 
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
                    this.usuarioR = resp.user;
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
