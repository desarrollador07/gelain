import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.css']
})
export class FormUsuariosComponent implements OnInit {

  userform: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.form();
  }

  form(){
    //Formulario Usuarios
    this.userform = this._fb.group({
     id:[''],
     name:['',Validators.required],
     email:['',Validators.required],
     password:['',Validators.required],
     password_confirmation:['',Validators.required]
   });
  }

  onSubmit(){

  }
}
