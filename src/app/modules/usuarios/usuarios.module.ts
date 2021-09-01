import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { RouterModule } from '@angular/router';
import { ButtonModule, CalendarModule, CheckboxModule, ConfirmDialogModule, 
         DialogModule, DropdownModule, FieldsetModule, InputTextareaModule, 
         InputTextModule, MessageModule, MessagesModule, PanelModule, ProgressBarModule, 
         ProgressSpinnerModule, RadioButtonModule, TabMenuModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
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
  ]
})
export class UsuariosModule { }
