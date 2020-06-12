import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   
  usuario:Usuario;
  token:string;

  constructor( private http:HttpClient,
               private router:Router) { 

    this.cargarToken();
    
  }


  //CREAR UN USUARIO
  crearusuario(usuario:Usuario){

    let url = URL_SERVICIOS + '/usuario';

     return this.http.post(url,usuario).pipe(map( (resp:any)=>{

      Swal.fire(
        'Usuario Creado',
        resp.usuario.email,
        'success'
      )
      return resp.usuario

     }));

  }


 //LOGIN USER NORMAL
  loginUser(email:string,password:string){

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url,{email,password}).pipe(map((resp:any)=>{

          this.guardarLocalStorage(resp.id,resp.token,resp.usuario,email)

      return true;
    }))

  }

  //LOGIN USER GOOGLE
  loginGoogle(token:string){



    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url,{token}).pipe(map((resp:any)=>{

      
     this.guardarLocalStorage(resp.id,resp.token,resp.usuario,resp.usuario.email)

       //console.log(resp)

      return true;
    }))

  }

  //LOGAUT DEL SISTEMA

  logaut(){

    this.token='';
    this.usuario=null;
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigateByUrl('/login');

  }



  //LEER EL TOKEN GUARADO EN EL LOCAL STORAGE

  cargarToken(){

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario= JSON.parse( localStorage.getItem('usuario'));
    } else {
      this.token='';
      this.usuario=null;
    }
  }

  //GUARDAR EN EL LOCALSTORAGE
  guardarLocalStorage(id:string,token:string,usuario:Usuario,email:string){
    
    localStorage.setItem('id',id);
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario))
    localStorage.setItem('email',email)
    
    this.usuario = usuario;
    this.token=token;

  }


  //VERIFICAR SI ESTA LOGEADO
  estaLogeado():Boolean{

    return (this.token.length > 5)?true:false;

  }




}
