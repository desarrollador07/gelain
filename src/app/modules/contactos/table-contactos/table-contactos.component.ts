import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { Contactos } from 'src/app/models/contactos.model';
import { ContactosService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-table-contactos',
  templateUrl: './table-contactos.component.html',
  styleUrls: ['./table-contactos.component.css']
})
export class TableContactosComponent implements OnInit {

  contactos: Contactos[] = [];

  constructor(private contactosService:ContactosService,
             private _confirmationServices: ConfirmationService,
              private _messageService: MessageService) {  }

  ngOnInit() {
    this.obtenerContactos();
  }

  obtenerContactos(){
    this.contactosService.getContactos().subscribe((data: Contactos[])=>{
      this.contactos = data;
    });
  }

  editContacto(contac:Contactos){
    sessionStorage.setItem('contactos',JSON.stringify(contac));
    
  }

  deleteContato(contacto: Contactos) {

    this._confirmationServices.confirm({
      message: '¿Seguro que desea eliminar este registro?',
      header:'Confirmación',
      icon:'pi pi-exclamation-triangle',
      accept:() => {
        this.contactosService.deleteContactos(contacto).toPromise().then(data => {
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'Registro eliminado', life: 3000})
          this.obtenerContactos();
        });
      }
    });
        
  }

  newcPrueba(){
    sessionStorage.removeItem('contactos');
  }

}
