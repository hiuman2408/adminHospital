import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate  {


  constructor (private _serviceUsuario:UsuarioService,
    private router:Router){}
  canActivate() {
    
          if(this._serviceUsuario.estaLogeado()){
            console.log('paso por el guard')
            return true;
        
          }else{
        
            console.log('Bloqueado por el guard')
            this.router.navigateByUrl('/login');
        
            return false;
          }
  
 
    
  }
}
