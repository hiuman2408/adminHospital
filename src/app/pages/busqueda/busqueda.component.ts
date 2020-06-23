import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(private activatedRoute:ActivatedRoute,
               private http:HttpClient) { 

      activatedRoute.params.subscribe(resp=>{
        
        let termino=resp.termino;
        this.buscar(termino);

      })

  }

  ngOnInit() {
  }



  buscar(termino:string){
   
    let url = URL_SERVICIOS+'/busqueda/todo/'+termino;

    this.http.get(url).subscribe((resp:any)=>{

      this.hospitales=resp.hospitales.usuarios;
      this.medicos=resp.medicos.usuarios;
      this.usuarios=resp.usuarios.usuarios;
      
      
    })


  }

}
