import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario:Usuario;
  imagenTemp: string;
  imagenSubir:File;

  constructor( public _svUsuario:UsuarioService) { 

    this.usuario =this._svUsuario.usuario; //tare el usuario que esta en local storage
    
  }

  ngOnInit() {
  }



  actualizarUsuario(usuario:Usuario){

    this.usuario.nombre = usuario.nombre;  //cambia el nombre

    if ( !this.usuario.google ) {     //validacion si no de google se puede cambiar el email
      this.usuario.email = usuario.email;
    }
    
    this._svUsuario.actualizarProfile(this.usuario).subscribe();

    
  }

  previsualizarImagen($event: Event){
    let archivo:File =$event.target['files'][0];

    if ( !archivo ) {
      this.imagenSubir = null;
       return;
    }
     //compruena si es una imagen
     if (!(/\.(jpg|jpeg|png|gif)$/i).test(archivo.name)) {
      this.imagenSubir = null;
      Swal.fire('Sólo imágenes', 'El archivo : '+archivo.name +' no es una imagen','error');
      return;
     }
    //validadr el tañamo de la imagen
      if (archivo.size > 200000) {
        this.imagenSubir = null;
        Swal.fire('Tenga Cuidado','El peso de la imagen no puede exceder los 2MB', 'warning')
           
        return;
      }

      if($event.target['files']){
        let reader = new FileReader;
        reader.readAsDataURL(archivo);
        reader.onload = (e: any) => {
          this.imagenTemp = e.target.result;        
      }
      }

      this.imagenSubir = archivo;
      
  }


  actualizarImagen(){


    this._svUsuario.cambiarImagen(this.imagenSubir,this.usuario._id)

    //console.log(this.imagenSubir);

  }




}
