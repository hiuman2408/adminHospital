import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http:HttpClient,
              private _usuarioService:UsuarioService) { }


  //CARGAR MEDICOS

  cargarAllMedicos( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get( url );

  }


  //BUSCAR MEDICOS

  buscarMedico(termino:string,desde:number){

    //localhost:3000/medico?desde=0
    let url=URL_SERVICIOS+'/busqueda/coleccion/medicos/'+termino+'?desde='+desde;
    return this.http.get(url);
  }

  //OBTNER PERDICO POR ID

  obtenerMedico(id:string){

    let url = URL_SERVICIOS+'/medico/'+id;

    return this.http.get(url);
  }

  //GUARDAR Medico

  guardarMedico(medico:Medico){

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, medico )
                .pipe(map( (resp: any) => {
                  Swal.fire('Médico Actualizado', medico.nombre, 'success');
                  return resp.medico;

                }));

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      
      return this.http.post( url, medico )
              .pipe(map( (resp: any) => {
                Swal.fire('Médico Creado', medico.nombre, 'success');
                return resp.medico;
              }));
    }



  }





  //elimnar medico

 eliminarMedico( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url ).pipe (
              map( resp => {
                Swal.fire( 'Médico Borrado', 'Médico borrado correctamente', 'success' );
                return resp;
              }));

  }


}
