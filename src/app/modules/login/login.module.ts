import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginComponent } from "./login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";


@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,

        MessageModule,
        MessagesModule,
        ConfirmDialogModule,
        ReactiveFormsModule,
        ToastModule,
    ],
    providers: [MessageService, ConfirmationService],
})
export class LoginModule {}