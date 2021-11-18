import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosPendientesRoutingModule } from './empleados-pendientes-routing.module';
import { EmpleadosPendientesComponent } from './empleados-pendientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { FieldsetModule, CalendarModule, CheckboxModule, 
         ProgressBarModule, ProgressSpinnerModule, ButtonModule, 
         InputTextareaModule, DropdownModule, PanelModule, DialogModule, 
         RadioButtonModule, TabMenuModule, TooltipModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [EmpleadosPendientesComponent],
  imports: [
    CommonModule,
    EmpleadosPendientesRoutingModule,
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
    TooltipModule
  ]
})
export class EmpleadosPendientesModule { }
