import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormValorFisicoRoutingModule } from './formValorFisico-routing.module';
import { FormValorFisicoComponent } from './formValorFisico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule, MultiSelectModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';
import {  PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [FormValorFisicoComponent],
  imports: [
    CommonModule,
    FormValorFisicoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    InputTextModule,
    MultiSelectModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    PanelModule,
    TableModule,
    ToastModule,
    CalendarModule,
    StepsModule,
  ],
  providers:[
    MessageService,
    ConfirmationService,
    DatePipe
  ],
})
export class FormValorFisicoModule { }