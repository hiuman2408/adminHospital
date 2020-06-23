import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/services.index';


export class MyValidations{


    static validateEmail(userService: UsuarioService) {
        return (control: AbstractControl) => {
          const value = control.value;
          return userService.verificaCorreo(value)
          .pipe(
            map((response:any) => {

                if(!response.usuario){
   
                    return null;
         
                  }else{
                    
                    return {existe:true}
                  }
            })
          );
        };
    }

    

}