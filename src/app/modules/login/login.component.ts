import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

import { ConfirmationService, MessageService } from "primeng/api";
import { routes } from '../../app.routes';



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

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,

 

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
            user: ["", [Validators.required, Validators.minLength(3)]],
            pwd: [
                "",
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.pattern(
                        "(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}"
                    ),
                ],
            ],
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
        if (this.loginForm.get("user").value === "jennifer@gmail.com" && this.loginForm.get("pwd").value === "12345") {
            this.router.navigate(['/main/dashboard']);
        }else{
            this.router.navigate(['/login']);
        }
    
    }
}
