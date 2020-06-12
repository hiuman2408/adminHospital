import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

import Swal from 'sweetalert2'
declare function init_plugins(); //par que desparesca el loooding

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  usuarioForm: FormGroup;

  constructor( private _usuarioService:UsuarioService,
               private router:Router) { }

  ngOnInit() {

    init_plugins(); //para el looding


    this.usuarioForm = new FormGroup({
      nombre: new FormControl('',Validators.required),
      correo: new FormControl(null,[Validators.required,Validators.pattern(this.emailPattern)]
      ),
      password: new FormControl(null,Validators.required),
      password2: new FormControl(null,Validators.required),
      condiciones: new FormControl(false)
    },{ validators:this.sonIguales('password','password2') }); //OARA VALIDAR SI LAS PSSWORDS SONIGUALERS 


    //PAR4A LLENAR DATOS EN EL FORMULARIO

    this.usuarioForm.setValue({
      nombre:'uribe Viloslda',
      correo:'hiuman2408@gmail.com',
      password:'123456',
      password2:'123456',
      condiciones:true

    });
    
  }



  //FUNCON PARA VALIDADR LAS CONTRASEÑAS
  sonIguales( campo1:string ,campo2:string){
    return (group:FormGroup)=>{
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1===pass2){
        return null
      }

      return {
        sonIguales:true//error del formulario msea valido
      }

    }

  }

  
  registarUsuario(){
 
    if(this.usuarioForm.invalid){
      return ;
    }

    if(!this.usuarioForm.value.condiciones){


      Swal.fire({
        icon: 'warning',
        title: 'Importante!',
        text: 'Debe Acepatar las Condiciones!',
        
      })
      
      
      return;
    }

    var tempUsuario= this.usuarioForm.value;

    let usuario = new Usuario(
      tempUsuario.nombre,
      tempUsuario.correo,
      tempUsuario.password
  
    )

    this._usuarioService.crearusuario(usuario).subscribe(result=>{

         // console.log(result)
  
         this.router.navigate(['/login']);
    })

    //console.log(this.usuarioForm.value);
  }





  get nombre() { return this.usuarioForm.get('nombre'); }
  get correo() { return this.usuarioForm.get('correo'); }
  get password() { return this.usuarioForm.get('password'); }
  get password2() { return this.usuarioForm.get('password2'); }
  get condiciones() { return this.usuarioForm.get('condiciones'); }


}
