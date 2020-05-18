import { Component, OnInit } from '@angular/core';

import { SettingsService } from 'src/app/services/services.index';




@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _sAjustes:SettingsService) { }

  ngOnInit() {

    this.colocarCheck();
  }


  // CAMBIAR EL TEMA

  cambiarColor(tema:string,link:string){
   
    this.aplicarCheck(link); //para enviar la referencia del tema para el check  
    this._sAjustes.aplicarTema(tema);

  }


 //APLICAR EL CKEK CUANDO SE HACE CLIC EN TEMA
  aplicarCheck( link: any ) {

    let selectores: any = document.getElementsByClassName('selector');

    for ( let ref of selectores ) {

      ref.classList.remove('working');//eliminar la clase working a todos 
    }

    link.classList.add('working'); //agregar la clase workinkin a Link



  }

  //COLOCAR EL CKECKK PARA QUE SEA PERSISTENTE 
  colocarCheck() {  

    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._sAjustes.ajustes.tema;

    for ( let ref of selectores ) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }

  }


}
