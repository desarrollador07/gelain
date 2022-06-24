
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtralaboralLRoutingModule } from './extralaboralL-routing.module';
import { ExtralaboralLComponent } from './extralaboralL.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { MessageService} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule, MenuItemContent } from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import {  PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table'
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import {StepsModule} from 'primeng/steps';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { VideoInfoModule } from 'src/app/components/video-info/video-info.module';
import { DatosEmpleadoModule } from 'src/app/components/datos-empleado/datos-empleado.module';


@NgModule({
  declarations: [ExtralaboralLComponent],
  imports: [
    CommonModule,
    ExtralaboralLRoutingModule,
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
    VideoInfoModule,
    DatosEmpleadoModule
  ],
  providers:[
    MessageService,
    ConfirmationService,
    DatePipe
  ],
})
export class ExtralaboralModule { }
