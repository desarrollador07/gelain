import { Component, OnInit } from '@angular/core';
import { UsuariosModel } from 'src/app/models/usuarios.model';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuariosData: UsuariosModel [] = [];
  constructor(private usuariosService: UsuariosService) { }

  async ngOnInit() {

   /*Consulta Usuarios */
   await this.consultaUsuarios();

  }

  async consultaUsuarios(){
    this.usuariosService.getUsuarios().toPromise().then((res:UsuariosModel[]) => {
      this.usuariosData = res;
    });
  }
}
