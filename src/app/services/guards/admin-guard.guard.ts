import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import Swal from 'sweetalert2'
import { UsuarioService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
   role:string;

  constructor(private _serviceUsuario:UsuarioService){
       this.role = _serviceUsuario.usuario.role;
              
  }

  canActivate() {

    if(this.role==="ADMIN_ROLE"){

      return true;


    }else{
      
      Swal.fire('Alerta!!!',
       'Ha intentado Ingresar a una pagina Prohibida ', 
      'warning' );
      this._serviceUsuario.logaut();
      return false;
    }

    
    
  }
  
}
