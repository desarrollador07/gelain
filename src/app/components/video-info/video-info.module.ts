import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'primeng/primeng';
import { VideoInfoComponent } from './video-info.component';

@NgModule({
  declarations: [VideoInfoComponent],
  imports: [
    CommonModule,
    LightboxModule
  ],
  exports:[
    VideoInfoComponent
  ]
})
export class VideoInfoModule { }
