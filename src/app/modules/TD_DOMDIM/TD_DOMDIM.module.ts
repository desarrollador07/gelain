import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TD_DOMDIMComponent} from './TD_DOMDIM.component';
import { TD_DOMDIMRoutingModule } from './TD_DOMDIM-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import { RouterModule } from '@angular/router';
import { DatePipe, CurrencyPipe} from '@angular/common';
import {FieldsetModule} from 'primeng/fieldset';
import {ProgressBarModule} from 'primeng/progressbar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { MessageService} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule } from 'primeng/primeng';
import {  PanelModule } from 'primeng/panel';
import {DataViewModule} from 'primeng/dataview';
import { DialogModule } from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TabMenuModule} from 'primeng/tabmenu';
import { ChartModule } from 'primeng/chart';
import { ChartsModule } from '@progress/kendo-angular-charts';


import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PDFExportModule } from "@progress/kendo-angular-pdf-export";
import { IntlModule } from "@progress/kendo-angular-intl";
import { GridModule } from "@progress/kendo-angular-grid";
import 'hammerjs';
import {
  PDFModule,
  ExcelModule,
  
} from "@progress/kendo-angular-grid";





import 'hammerjs';

@NgModule({
  declarations: [TD_DOMDIMComponent],
  imports: [
    CommonModule,
    TD_DOMDIMRoutingModule,
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
    ChartModule,
    ChartsModule,
    TabMenuModule,
    ChartsModule,
    GridModule,
    PDFExportModule,
    IntlModule,
    PDFModule,
    ExcelModule,
    PDFExportModule,

    
  ],
  providers:[
    DatePipe,
    MessageService,
    ConfirmationService,
    CurrencyPipe
  ],
})
export class TD_DOMDIMModule { }
