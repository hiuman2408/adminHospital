import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient,
    private _svUsuarios:UsuarioService) { }

   // CARGAR TODOS LOS USUARIOS

cargarAllUsuarios( desde: number = 0 ) {

  let url = URL_SERVICIOS + '/hospital?desde=' + desde;
  return this.http.get( url );

}

//cargar hospital select

allHospitales(){
  
  let url = URL_SERVICIOS + '/hospital/select';
  return this.http.get( url );
}

//BUSCAR HOSPITALES

buscarHopital(termino:string,desde:number){

  let url=URL_SERVICIOS+'/busqueda/coleccion/hospitales/'+termino+'?desde='+desde;

  return this.http.get(url);

}

// BUSCAR HOSPITAL POR ID
obtenerHospital( id: string ) {

  let url = URL_SERVICIOS + '/hospital/' + id;
  return this.http.get( url ).pipe(map((resp:any)=>{
     
    return resp.hospital;
  }))

}


//CREAR HOSPITAL

crearHospital(nombre:string){

  let url = URL_SERVICIOS+'/hospital?token='+this._svUsuarios.token;
  return this.http.post(url,{nombre}).pipe(map( (resp:any)=>{

    Swal.fire(
      'Usuario Creado',
      resp.hospital.nombre,
      'success'
    )
    return resp.hospital

   }));

}

  //ACTUALIZAR HOSPITAL
  actualizarHospital(hospital:Hospital){
  
    let url = URL_SERVICIOS+'/hospital/'+hospital._id+'?token='+this._svUsuarios.token;
    return this.http.put(url,hospital).pipe(map((resp:any)=>{
  
      Swal.fire('Hospital actualizado',
                 resp.hospital.nombre, 
                 'success' );
  
      return true;
  
  
  }))
  
  
  }


  // ELIMINAR hOSPITAL

  eliminarHospital(id:string){ 

    let url = URL_SERVICIOS+'/hospital/'+id+'?token='+ this._svUsuarios.token;
    return this.http.delete( url ).pipe(
                map( (resp:any) => {
                  Swal.fire('Hospital Borrado',resp.hospital.nombre, 'success');
                  return true;
                }))



  }





    
}
