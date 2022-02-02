import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { FieldsetModule, CalendarModule, CheckboxModule, ProgressBarModule, ProgressSpinnerModule, CardModule, InputTextModule, ButtonModule, InputTextareaModule, DropdownModule, PanelModule, DialogModule, RadioButtonModule, TabMenuModule, TooltipModule, TabViewModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ValorRiesgoRoutingModule } from './valor-riesgo-routing.module';
import { ValorRiesgoComponent } from './valor-riesgo.component';
import { FormValorRiesgoComponent } from '../form-valor-riesgo/form-valor-riesgo.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  declarations: [ 
    ValorRiesgoComponent,
    FormValorRiesgoComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    ValorRiesgoRoutingModule,
    RouterModule,
    FieldsetModule,
    FormsModule,
    CalendarModule,
    TableModule,
    CheckboxModule,
    ReactiveFormsModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    ToastModule,
    CardModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    PanelModule,
    TableModule,
    DataViewModule,
    DialogModule,
    RadioButtonModule,
    TabMenuModule,
    TooltipModule,
    TabViewModule,
    OverlayPanelModule
  ]
})
export class ValorRiesgoModule { }
