import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchvioService {

  constructor() { }

  //archivo tipo file , tipo (usuarios,hospitales,medicos) id=id de tipo(usuario,hospitales medicos)

  subirArchivo( archivo: File, tipo: string, id: string ) {

    return new Promise( (resolve, reject ) => {

      let formData = new FormData(); //lo que tengo que neviar por ajax 
      let xhr = new XMLHttpRequest(); //inicializar peticion ajax

      formData.append( 'imagen', archivo, archivo.name ); //configuar el formdata

      xhr.onreadystatechange = function() {
            
        if ( xhr.readyState === 4 ) { //caundo termine el proceso

          if ( xhr.status === 200 ) {
            //console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response ) );
          } else {
           // console.log( 'Fallo la subida' );
            reject( xhr.response );
          }

        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true );
      xhr.send( formData );

    });

  }
}
