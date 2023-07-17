import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header-pdf-informe',
  templateUrl: './header-pdf-informe.component.html',
  styleUrls: ['./header-pdf-informe.component.css']
})
export class HeaderPdfInformeComponent implements OnInit {
  
  fechaActual :Date = new Date();

  @Input() dataHeaderInfo: any;
  
  constructor() { }

  ngOnInit() {
    
  }

}
