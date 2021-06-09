import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prueba } from '../../models/prueba.model';
import { PruebaService } from '../../services/prueba.service';
import { SelectItem,ConfirmationService,MessageService} from 'primeng/api';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  prueba: Prueba;

  pruebas: Prueba[] = [];

  constructor(private pruebaServices:PruebaService,private router: Router,
              private _confirmationServices: ConfirmationService,
              private _messageService: MessageService) {

   }

  ngOnInit() {

    this.pruebaServices
    .getPrueba().subscribe((data: any)=>{
      this.pruebas = data;
      console.log('los datos son: ',this.pruebas);
    })
  }

  deletePrueba(prueba: Prueba) {

    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este elemento?',
      header:'confirmacion',
      icon:'pi pi-exclamation-triangle',
      accept:() => {
        this.pruebaServices.deletePrueba(prueba)
        .toPromise().then(data => {
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'elemento eliminado', life: 3000})
        });
      }
    });
        

      }

      editPrueba(cpruebas:Prueba){
        localStorage.setItem('prueba',JSON.stringify(cpruebas));
      }
    
      newcPrueba(){
        localStorage.removeItem('prueba');
      }
  

}
