import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { FieldsetModule, DropdownModule, PanelModule, InputTextModule, MultiSelectModule, CalendarModule, LightboxModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { ExformVfRoutingModule } from './exform-vf-routing.module';
import { ExformVfComponent } from './exform-vf.component';
import { VideoInfoModule } from 'src/app/components/video-info/video-info.module';


@NgModule({
  declarations: [ExformVfComponent],
  imports: [
    CommonModule,
    ExformVfRoutingModule,
    RouterModule,
    FieldsetModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
    PanelModule,
    InputTextModule,
    LightboxModule,
    VideoInfoModule
  ]
})
export class ExformVfModule { }
