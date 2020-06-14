import { Usuario } from './../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';

declare function init_plugins();

declare const gapi:any //libreria caundo importamos script de google



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo:string
  recordarEmail:boolean = false;


 // usuario:Usuario;

  auth2:any //informacion que viene de google

  constructor(private router:Router,
            private _serviceUser:UsuarioService) { 

             // this.usuario = _serviceUser.usuario;///lalmaos al usuario
             // console.log(this.usuario)

    
    }


  ngOnInit() {

    init_plugins();

    this.googleInit();

    if(localStorage.getItem('token')){
      this.router.navigate([ '/dashboard' ])
    }

    if(localStorage.getItem('email')){
      this.correo =localStorage.getItem('email')
      this.recordarEmail=true;
    }

  }



  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '555549239182-soiuv2rmf5977s584ojk8ssmo85ippqr.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope:'profile email'
    });

    this.attachSignin(document.getElementById('btnGoogle')) //

    });
  }


  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},(googleUser)=> {
       //let profile = googleUser.getBasicProfile().getName();

       let token = googleUser.getAuthResponse().id_token;
       

       this._serviceUser.loginGoogle(token).subscribe(resp=>{

           // this.router.navigate([ '/dashboard' ])

           window.location.href='#/dashboard';//forzar la redicrecion 

       });
                
    });
  }





  //LOGIN NORMAL
  ingresar(formUsuario:NgForm){

    if(formUsuario.invalid){
      return;
    }


    let email = formUsuario.value.correo;
    let password = formUsuario.value.password;
    
    this._serviceUser.loginUser(email,password)
                     .subscribe(resp=>this.router.navigate([ '/dashboard' ]));
                    
  }

  


  //RECORDAR EMAIL
  onChange(isChecked: boolean){
    this.recordarEmail = isChecked
   
    if(this.recordarEmail){
      
      localStorage.setItem('email',this.correo)

    }else{

      localStorage.removeItem('email')

    }
    


   // console.log(isChecked);
  }

}
