import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario:Usuario;

  constructor(public _svUsuario:UsuarioService,
             private router:Router) { }

  ngOnInit() {
    this.usuario=this._svUsuario.usuario;
  }

  busqueda(termino:string){

    if(termino.length <= 0){
      return;
    }

    this.router.navigate(['/busqueda',termino])

   

  }

  

}
