import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/*Modulos */
import { ConfirmationService, MessageService } from 'primeng/api';
/*Modelos */
import { UsuariosModel } from 'src/app/models/usuarios.model';
/*Servicios */
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuariosData: UsuariosModel [] = [];
  loading:boolean = true;
  
  constructor(private usuariosService: UsuariosService,
              private router: Router,
              private _confirmationService: ConfirmationService,
              private _messageService: MessageService) { }

  async ngOnInit() {

   /*Consulta Usuarios */
   await this.consultaUsuarios();

  }

  async consultaUsuarios(){
    this.usuariosService.getUsuarios().toPromise().then((res:UsuariosModel[]) => {
      this.usuariosData = res;
      if (this.usuariosData.length > 0) {
        this.loading = false;
      }else{
        this.loading = false;
      }
    });
  }

  deleteUser(user:UsuariosModel){
    
    this._confirmationService.confirm({

      message: '¿Seguro que deseas eliminar este registro?',
      header: 'Eliminar registro',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        this.usuariosService.deleteUsuarios(user.id).toPromise().then( res => {
          this._messageService.add({severity: 'success',summary: 'Exitoso',detail: 'El registro se ha eliminado', life: 3000});
          this.usuariosData = this.usuariosData.filter(r => r !== user);
        },err => {
          console.log(err);
        });
        
      }
    });
  }

  editarUser(userForm:UsuariosModel){
    sessionStorage.setItem('userForm',JSON.stringify(userForm));
  }

  agregarForm(){
    sessionStorage.removeItem('userForm');
    this.router.navigateByUrl("/main/usuarios/form-usuarios");
  }


  
}
