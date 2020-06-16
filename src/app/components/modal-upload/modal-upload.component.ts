import { ModalUploadService } from './modal-upload.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { SubirArchvioService } from '../../services/subir-archivo/subir-archvio.service';
@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  
  
  imagenTemp: string;
  imagenSubir:File;
  constructor(public _svsubirArchivo:SubirArchvioService,
              public _svModalUploadServide:ModalUploadService) { 
    
  }

  ngOnInit() {
  }

  ocultarModal(){

  this.imagenTemp=null;
  this.imagenSubir=null;
  this._svModalUploadServide.ocultarModal(); //para ocultar modal
  }

  subirImagen(){

    this._svsubirArchivo.subirArchivo( this.imagenSubir, this._svModalUploadServide.tipo, this._svModalUploadServide.id )
    .then( resp => {

        this._svModalUploadServide.notificacion.emit( resp ); //emite el evento con la respuesta 

        this.ocultarModal();
        
  
    })
    .catch( err => {
      console.log( 'Error en la carga... ');
    });


  }


  //PREVISUALIZAR IMAEGN A SUBIR
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


}
