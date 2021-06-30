import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardComponent } from './dashboard.componet';
import { ChartModule } from 'primeng/chart';
import {TableModule} from 'primeng/table';
import {ListboxModule} from 'primeng/listbox';
import {FieldsetModule} from 'primeng/fieldset';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule} from 'primeng/panel';
import {GalleriaModule} from 'primeng/galleria';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FieldsetModule,
    DashboardRoutingModule,
    ChartModule,
    TableModule,
    ListboxModule,
    DropdownModule,
    FormsModule,
    PanelMenuModule,
    PanelModule,
    GalleriaModule
  ]
})
export class DashboardModule { }
