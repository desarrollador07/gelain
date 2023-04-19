import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
/*Modulos */
import { ConfirmationService, MessageService } from "primeng/api";
import { ValidacionService } from "src/app/services/validacion.service";
/*Modelos */
import { User } from '../../models/user';
/*Servicios */
import { PruebaService } from '../../services/prueba.service';
import { environment } from "src/environments/environment";


@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    providers: [ConfirmationService, MessageService],
})
export class LoginComponent implements OnInit {

    apiUrl:string = environment.urlGlobal;
    public formSubmitted = false;
    loginForm: FormGroup;
    user:String;
    password:String;
    usuarioR:User = {};
    token:string;
    err:User;
    validPass1:boolean = true;
    loading:boolean = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private pruebaservices: PruebaService,
        private validacionService: ValidacionService
    ) {
        this.validacionService.recargarPagina();
        this.crearFormulario();
    }

    async ngOnInit() {
        sessionStorage.clear();
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
        this.loading = true;
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
                    sessionStorage.setItem("token",resp.access_token);
                    sessionStorage.setItem("user",this.usuarioR.name);
                    
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
            this.loading = false;
        }, err => {
            console.error(err);
            if (err.status === 422) {
                this.messageService.add({
                    severity: "error",
                    summary: "Verificar",
                    detail: "Usuario o contraseña no validos",
                    life: 3000,
                });
                this.loginForm.reset();
            }else{
                this.messageService.add({
                    severity: "error",
                    summary: "Fallo",
                    detail: "Se presento un error inesperado al iniciar sesión",
                    life: 6000,
                });
            }
            this.loading = false;
        });
    
    }

    mostrarContrasena(){
        var tipo = <HTMLInputElement>document.getElementById("pass1");
        if(tipo.type == "password"){
            tipo.type = "text";
            this.validPass1 = false;
        }else{
            tipo.type = "password";
            this.validPass1 = true;
        }
    }
}
