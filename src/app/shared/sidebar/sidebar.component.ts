import { Component, OnInit } from '@angular/core';

import { SidebarService } from 'src/app/services/services.index';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario:Usuario

  constructor(public _sSidebar:SidebarService,
               public _svUsuario :UsuarioService ) { }

  ngOnInit() {
    this.usuario = this._svUsuario.usuario;
  }

}
