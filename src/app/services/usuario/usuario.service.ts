

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { SubirArchvioService } from '../subir-archivo/subir-archvio.service';
import { throwError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   
  usuario:Usuario;
  token:string;

  constructor( private http:HttpClient,
               private router:Router,
               private _svSubirArchivo:SubirArchvioService) { 

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

     }),catchError(err => {

      
            Swal.fire(
              err.error.mensaje,
              err.error.errors.message,
              'warning'
            )
      
              
              return of();
    }));

  }


 //LOGIN USER NORMAL
  loginUser(email:string,password:string){

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url,{email,password}).pipe(map((resp:any)=>{

          this.guardarLocalStorage(resp.id,resp.token,resp.usuario,email)

            return true;

            }),catchError(err => {

             // console.log( err.error.mensaje);
              Swal.fire(
                'Error en el login',
                err.error.mensaje,
                'warning'
              )

              
              return of();
          }));

  }

  //LOGIN USER GOOGLE
  loginGoogle(token:string){



    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url,{token}).pipe(map((resp:any)=>{

      
             this.guardarLocalStorage(resp.id,resp.token,resp.usuario,resp.usuario.email)
        
               //console.log(resp)
        
              return true;
            }),catchError(err => {
        
              //console.log( err.error.mensaje);
              Swal.fire(
                'Error en el login',
                err.error.mensaje,
                'warning'
              )
        
              
              return of([]);
          }));

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

//ACTUALIZAR  PERFIL DEL USURIO (NOMBRE , EMAIL )

  actualizarProfile(usuario:Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
        url += '?token=' + this.token;

    return this.http.put(url,usuario).pipe(map((resp:any)=>{

      
        let usuarioDB: Usuario = resp.usuario;
  
        this.guardarLocalStorage(usuarioDB._id,this.token,usuarioDB,usuarioDB.email)
  
        Swal.fire('Usuario actualizado',
                   usuario.nombre, 
                   'success' );

        return true 


    }),catchError(err => {


      Swal.fire(
        err.error.mensaje,
        err.error.errors.message,
        'warning'
      )

        
        return of([]);
    }));

  }

//ACTUALIZAR IMAGEN DE PERFIL

  cambiarImagen( archivo: File, id: string ) {

    this. _svSubirArchivo.subirArchivo( archivo, 'usuarios', id )
          .then( (resp: any) => {

            this.usuario.image = resp.usuario.image;

            Swal.fire( 'Imagen Actualizada', this.usuario.nombre, 'success' );

            this.guardarLocalStorage( id, this.token, this.usuario,this.usuario.email);

          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }


  // CARGAR TODOS LOS USUARIOS

  cargarAllUsuarios( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );

  }

  //BUSCAR USUARIOS

  buscarUsuario(termino:string,desde:number){

    let url=URL_SERVICIOS+'/busqueda/coleccion/usuarios/'+termino+'?desde='+desde;

    return this.http.get(url);

  }

  //ACTUALIZAR USUARIO (ROL)

  actualizarUsuario(usuario:Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
        url += '?token=' + this.token;

    return this.http.put(url,usuario).pipe(map((resp:any)=>{

       //console.log(resp);
      if ( usuario._id === this.usuario._id ) {
        let usuarioDB: Usuario = resp.usuario;
  
        this.guardarLocalStorage(usuarioDB._id,this.token,usuarioDB,usuarioDB.email)
  
      }

       
        Swal.fire('Usuario actualizado',
                   usuario.nombre, 
                   'success' );

        return true 


    }),catchError(err => {

      Swal.fire(
        err.error.mensaje,
        err.error.errors.message,
        'warning'
      )

        
        return of([]);
    }));


  }

  // ELIMINAR USUARIOS

  eliminarUsuario(id:string){ 

    let url = URL_SERVICIOS+'/usuario/'+id+'?token='+ this.token;
    return this.http.delete( url ).pipe(
                map( resp => {
                  Swal.fire('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                  return true;
                }))



  }

  //VERIFICA SI EXXISTE EL CORRE EN LA BASE DE DATOS
  verificaCorreo(email:string){

    let url=URL_SERVICIOS+'/usuario/correo?email='+email;

    return this.http.get(url);
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
