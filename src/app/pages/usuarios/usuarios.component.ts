import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {


  usuarios:Usuario[]=[];
  desde: number = 0;   //para la paginacion
  terminoBusqueda:string='';

  totalRegistros: number = 0; //total Usuarios
  cargando: boolean = true;   //para el looding


 //para la otra forma de paginar
 numPaginas:number;
 paginas:any[];     //arreglo de paginas  
 paginaActiva:number=0;   //pagina Activa actual
 

  constructor(private _svUsuarios:UsuarioService,
             private _svModalUpload: ModalUploadService) {
                     }

  ngOnInit() {

    this.cargarUsuarios();
    this._svModalUpload.notificacion
          .subscribe( resp =>{

            // console.log(resp)

            Swal.fire( 'Imagen Actualizada',resp.usuario.nombre, 'success' );

            if(this.terminoBusqueda.length<=0){
              //carga los usuarios
              this.cargarUsuarios() ;

            }else{
                //carga los usuarios por busqueda
              this._svUsuarios.buscarUsuario(this.terminoBusqueda,this.desde).subscribe( (data:any) =>{
          
                this.usuarios = data.usuarios;
                this.cargando= false;
                      
               })

            }
        
          
          });
      
          
  }


  //CARGAR TODOS LOS USUARIOS
  cargarUsuarios(){

      this._svUsuarios.cargarAllUsuarios(this.desde)
                  .subscribe((resp:any)=>{
                    
                  this.totalRegistros = resp.total;
                  this.usuarios = resp.usuarios;
                  this.cargando = false;

                  this.numPaginas=(this.totalRegistros/5);
                  this.paginas=[]; //PARA LA OTRA FORMA DE PAGINAR
                  this.pages(Math.ceil(this.numPaginas)); //PARA LA OTRA FORMA DE PAGINAR
                  
                       
      })



  }

  //PARA LA PAGINACION
  
  paginacion( valor: number ) {
    let desde = this.desde + valor;
    if ( desde >= this.totalRegistros ) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  
  }

  //ACTUALIZAR USUARIO

  actualizarUsuario(usuario:Usuario){
  
    this._svUsuarios.actualizarUsuario(usuario).subscribe();
  }


  //ELIMINAR USUARIO
  
  eliminarUsuario(usuario:Usuario){
  
    if ( usuario._id === this._svUsuarios.usuario._id ) { //id que esta en local storage
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
  
  
    Swal.fire({
      title: 'Estas Serguro ?',
      text:  'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
  
        this._svUsuarios.eliminarUsuario( usuario._id )
                    .subscribe( borrado => {
                        this.cargarUsuarios();
                    });
        
      }
    })
  }



  //BUSCAR USUARIOS
  
  buscarUsuario(termino:string){
    
    if(termino.length<=0){
  
     this.desde=0;
     this.paginaActiva=0;
     
      this.cargarUsuarios();
      return;
    }
  
    this.terminoBusqueda= termino;
  
    this._svUsuarios.buscarUsuario(this.terminoBusqueda,this.desde).subscribe( (data:any) =>{
       
         
         this.totalRegistros = data.total;
         this.usuarios = data.usuarios;
         this.cargando= false;
         //para la OTRA FORMA DE PAGINAR
         this.numPaginas= data.total/5;  
         this.paginas=[]; //PARA LA OTRA FORMA DE PAGINAR
         this.pages(Math.ceil(this.numPaginas)); //PARA LA OTRA FORMA DE PAGINAR
  
  
    })
    
  
  }

  //
  mostrarModal( id:string,image:string ) {

   if(this._svUsuarios.usuario._id===id){
    Swal.fire('Importante', 'Usted Debe actualizar Su imagen en la seccion Perfil', 'error');
    return;
   }


    this._svModalUpload.mostrarModal('usuarios',id,image);
   
     
  
  }




  //****OTRA FORMA DE PAGINAR 
  pages(numpag:number){
  
   for (let index = 0; index<numpag; index++) {
  
      this.paginas.push(index) //areglo de paginas
   
   }
  
  }


  pagination(pagina){

      //this.desde=0;
     // let desde = this.desde + (pagina*5);
      this.paginaActiva=pagina;
      this.desde = pagina*5;
      if(this.terminoBusqueda.length<=0){
        this.cargarUsuarios();
      }else{
    
        this._svUsuarios.buscarUsuario(this.terminoBusqueda,this.desde)
                        .subscribe( (data:any) =>{
                          
                        this.usuarios = data.usuarios;
                        this.cargando= false;
                              
                       })
    
      }
    
  }
  ///*********** */

}



