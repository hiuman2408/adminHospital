import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

 ajustes:Ajuste={
  temaUrl: 'assets/css/colors/default.css',
  tema: 'default'
 }

  constructor(@Inject(DOCUMENT) private _document,) {
    this.cargarAjustes();
   }

 guardarAjuste(){

  localStorage.setItem('ajustes',JSON.stringify(this.ajustes))
  //console.log("guardado en el local storage")
 }

 cargarAjustes(){

  if(localStorage.getItem('ajustes')){
    this.ajustes = JSON.parse(localStorage.getItem('ajustes'))
    this.aplicarTema(this.ajustes.tema) //aplicar el tema selecionado

    //console.log("cargando de local storage")

  }else{

    this.aplicarTema(this.ajustes.tema)

   // console.log("usando valores por defecto")

  }
 }

 aplicarTema(tema:string){

  let url = `assets/css/colors/${tema}.css`;

  this._document.getElementById('tema').setAttribute('href',url)

  this.ajustes.temaUrl =url;
  this.ajustes.tema=tema;

  this.guardarAjuste();
 }

}

interface Ajuste{
  temaUrl:string,
  tema:string

}
