import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {


public tipo :string;
public id:string;
public imageUsuario:string;
public oculto:string='oculto'; //para el modal

public tipoImagen:string;

//poder emitar del madal que ya se subio una imagen
 //emite el objeto respuest del servicio carga imagenes 
public notificacion=new EventEmitter<any>();

  constructor() { }

  ocultarModal(){
   this.oculto='oculto';
   this.tipo=null;
   this.id=null;
   this.imageUsuario=null;
  }

  mostrarModal(tipo:string,id:string,imagen:string,tipoImagen:string){

   
  
  
    if(imagen==undefined){
      this.imageUsuario='xxx'
    }
    else{
      this.imageUsuario=imagen;
      
    }

    this.oculto = '';
    this.tipo=tipo;
    this.id=id;
    this.tipoImagen=tipoImagen;
   
  }





}
