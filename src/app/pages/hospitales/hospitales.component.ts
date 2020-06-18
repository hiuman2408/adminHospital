import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';

import Swal from 'sweetalert2';

import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { HospitalService } from 'src/app/services/services.index';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales:Hospital[]=[];
  desde: number = 0;   //para la paginacion
  
  terminoBusqueda:string='';

  totalRegistros: number = 0; //total Usuarios
  cargando: boolean = true;   //para el looding


 //para la otra forma de paginar
 numPaginas:number;
 paginas:any[]=[];     //arreglo de paginas  
 paginaActiva:number=0;   //pagina Activa actual


  constructor(private _svHospital:HospitalService,
    private _svModalUpload:ModalUploadService) { 

  }

  ngOnInit() {
    this.cargarHospitales();
    this._svModalUpload.notificacion
          .subscribe( resp =>{

           
            Swal.fire( 'Imagen Actualizada','', 'success' );

            if(this.terminoBusqueda.length<=0){
              //carga los usuarios
              this.cargarHospitales();

            }else{
                //carga los usuarios por busqueda
                this._svHospital.buscarHopital(this.terminoBusqueda,this.desde)
                                .subscribe( (data:any) =>{
          
                              this.hospitales = data.hospitales;
                              this.cargando= false;
                                    
               })

            }
            
          });
  }


  //LISTAR TODOS LOS HOSPITALES
  cargarHospitales(){
  this._svHospital.cargarAllUsuarios(this.desde).subscribe((resp:any)=>{

       this.hospitales= resp.hospitales;
       this.totalRegistros= resp.total;

       
        this.cargando = false;
        this.numPaginas=(this.totalRegistros/5);
        this.paginas=[]; //PARA LA OTRA FORMA DE PAGINAR
        this.pages(Math.ceil(this.numPaginas)); //PARA LA OTRA FORMA DE PAGINAR
      
  })

  }

  //BUACAR HOSPITAL

  buscarHospital(termino:string){


    if ( termino.length <= 0 ) {
      this.desde=0;
      this.paginaActiva=0;
      this.cargarHospitales();
      this.terminoBusqueda='';
      return;
    }

    this.terminoBusqueda= termino;
     

      this._svHospital.buscarHopital(this.terminoBusqueda,this.desde)
              .subscribe((resp:any)=>{


               this.totalRegistros = resp.total;
               this.hospitales = resp.hospitales;
               this.cargando= false;
               //para la OTRA FORMA DE PAGINAR
               this.numPaginas= resp.total/5;  
               this.paginas=[]; //PARA LA OTRA FORMA DE PAGINAR
               this.pages(Math.ceil(this.numPaginas)); //PARA LA OTRA FORMA DE PAGINAR
               //console.log(this.hospitales)
     
     });


     

     

     

  }

  //CREAR HOSPITAL

  crearHospital(){

    Swal.fire({
        title: "Crear Hospital",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        inputValidator: hospital => {
            // Si el valor es válido, debes regresar undefined. Si no, una cadena
            if (!hospital) {
                return "Por favor escriba un hospital";
            } else {
                return undefined;
            }
        }
    })
    .then((resultado:any) => {
        if (resultado.value) {

            let valor = resultado.value;

            this._svHospital.crearHospital(valor).subscribe(()=>{
                this.cargarHospitales();
            })

            
        }
    });

  }


  //ACTUALIZAR HOSPITAL

  actualizarHospital(hospital:Hospital){

    this._svHospital.actualizarHospital(hospital).subscribe( ()=> this.cargarHospitales)
  }

   
  //ELIMINAR Hospiatl
  
  eliminarUsuario(hospital:Hospital){
  
    
  
    Swal.fire({
      title: 'Estas Serguro ?',
      text: ` Esta a punto de borrar a:  ${hospital.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!'
    }).then((borrar) => {
      if (borrar.value) {
  
        this._svHospital.eliminarHospital(hospital._id )
                    .subscribe( borrado => {
                        this.cargarHospitales();
                    });
        
      }
    })
  }


  //ACTUALIZAR IMAGEN DE HOSPITAL

  actualizarImagen(hospital:Hospital){

    
    this._svModalUpload.mostrarModal('hospitales',hospital._id,hospital.image,'hospital')


  }


  //****OTRA FORMA DE PAGINAR 
  pages(numpag:number){
  
    for (let index = 0; index<numpag; index++) {
   
       this.paginas.push(index) //areglo de paginas
    
    }
   
  }

  pagination(pagina){


    
    this.paginaActiva=pagina;

    this.desde = pagina*5;

    if(this.terminoBusqueda.length <=0){

      this.cargarHospitales();

    }else{
  
      this._svHospital.buscarHopital(this.terminoBusqueda,this.desde)
                      .subscribe( (data:any) =>{
                        
                      this.hospitales = data.hospitales;
                      this.cargando= false;
                            
                     })
  
    }
  }
 



}
