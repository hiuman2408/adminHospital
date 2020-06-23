import { Component, OnInit } from '@angular/core';

import { SidebarService } from 'src/app/services/services.index';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario:Usuario
  submenu:Array<any>=[];
  role:string='USER_ROLE';
  menu1:Array<any>=[];

  constructor(public _sSidebar:SidebarService,
                   private http:HttpClient,
               public _svUsuario :UsuarioService ) { }

  ngOnInit() {
    this.usuario = this._svUsuario.usuario;
    this.role=this.usuario.role;
    let url =URL_SERVICIOS+'/menu'; 
    
    this.http.get(url).subscribe((resp:any)=>{

           this.menu1=resp.menu;  
           for (let index = 0; index < this.menu1.length; index++) {

               //PARA TARER EL SUBM,ENU DE ACUERDO AL MENU CORRESPONDIENTE
                let url2 = URL_SERVICIOS+'/submenu/'+this.menu1[index]._id+'/'+this.role

                 this.http.get(url2).subscribe((resp:any)=>{

                     
                    this.submenu.push(resp.submenu);
   
                 })
     
           }    
    })

    

  
  }
}


