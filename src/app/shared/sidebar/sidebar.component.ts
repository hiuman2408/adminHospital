import { Component, OnInit } from '@angular/core';

import { SidebarService } from 'src/app/services/services.index';
import { UsuarioService } from '../../services/services.index';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public _sSidebar:SidebarService,
               public _svUsuario :UsuarioService ) { }

  ngOnInit() {
  }

}
