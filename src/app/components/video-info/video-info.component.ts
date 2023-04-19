import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.css']
})
export class VideoInfoComponent implements OnInit {
  
  apiUrl:string = environment.urlGlobal;
  @Input() validVideo:any;
  urlVideoPsicoSocial:string = this.apiUrl+'/videos/Formulario_Psicosocial.mp4';
  urlVideoVF:string = this.apiUrl+'/videos/Formulario_VF.mp4';
  mostrarVideo:SafeResourceUrl;

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.validVideo === 1) {
      this.mostrarVideo = this.videoSanitizerURL(this.urlVideoPsicoSocial);
    }else{
      this.mostrarVideo = this.videoSanitizerURL(this.urlVideoVF);
    }
  }

  videoSanitizerURL(url:string){
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
