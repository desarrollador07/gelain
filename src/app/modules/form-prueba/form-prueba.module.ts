import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPruebaRoutingModule } from './form-prueba-routing.module';
import { FormPruebaComponent } from './form-prueba.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { MessageService} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule, MenuItemContent, TooltipModule } from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import {  PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table'
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import {StepsModule} from 'primeng/steps';
import {ChipsModule} from 'primeng/chips';
import {InputTextareaModule} from 'primeng/inputtextarea';


@NgModule({
  declarations: [FormPruebaComponent],
  imports: [
    CommonModule,
    FormPruebaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    PanelModule,
    TableModule,
    ToastModule,
    CalendarModule,
    StepsModule,
    ChipsModule,
    TooltipModule
  ],
  providers:[
    MessageService,
    ConfirmationService,
    DatePipe
  ],
})
export class FormPruebaModule { }
