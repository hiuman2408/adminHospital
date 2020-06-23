import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {


  totalRegistro:number=0;
  desde:number=0;

  medicos:Medico[]=[];

  terminoBusqueda:string='';
  cargando: boolean = true;   //para el looding
 //para la otra forma de paginar
 numPaginas:number;
 paginas:any[]=[];     //arreglo de paginas  
 paginaActiva:number=0;   //pagina Activa actual


  constructor(private _svmedico:MedicoService,
                private _svModalUpload:ModalUploadService) { }

  ngOnInit() {
    this.cargarMedicos();


    this._svModalUpload.notificacion.subscribe(resp=>{

                          Swal.fire( 'Imagen Actualizada', '', 'success' );

                          if(this.terminoBusqueda.length <=0){

                            this.cargarMedicos();
                            
                            this.terminoBusqueda='';
                          }else{
                            this._svmedico.buscarMedico(this.terminoBusqueda,this.desde)
                                            .subscribe( (data:any) =>{
                                              
                                            this.medicos = data.medicos;
                                            this.cargando= false;
                                    
                                             })
                

                          }
                          

    })


  }

  //cargar medicos
  cargarMedicos(){
  
     this._svmedico.cargarAllMedicos(this.desde)
                   .subscribe((resp:any)=>{
                     
                     this.totalRegistro=resp.total;
                     this.medicos = resp.medicos;
                     this.cargando= false;
                     //para la OTRA FORMA DE PAGINAR
                     this.numPaginas= resp.total/5;  
                     this.paginas=[]; //PARA LA OTRA FORMA DE PAGINAR
                     this.pages(Math.ceil(this.numPaginas)); //PARA LA OTRA FORMA DE PAGINAR
                     //console.log(this.hospitales)
                
                
                   })
                
      
    }

    //BUSCARM MEDICOS
    buscarMedico(termino:string ){


      if(termino.length <=0){
        this.desde=0;
        this.paginaActiva=0;
       this.terminoBusqueda='';
        this.cargarMedicos();
        return;
      }


      this.terminoBusqueda= termino;

      this._svmedico.buscarMedico(this.terminoBusqueda,this.desde).subscribe((resp:any)=>{

        this.medicos= resp.medicos;
        this.totalRegistro = resp.total;
        this.cargando= false;
         //para la OTRA FORMA DE PAGINAR
        this.numPaginas= resp.total/5;  
        this.paginas=[]; //PARA LA OTRA FORMA DE PAGINAR
        this.pages(Math.ceil(this.numPaginas)); //PARA LA OTRA FORMA DE PAGINAR
        
      })

     

  
    }

    //BORRAR MEDICO
    borrarMedico(medico:Medico){
  
          Swal.fire({
            title: 'Estas Serguro ?',
            text:  'Esta a punto de borrar a ' + medico.nombre,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!'
          }).then((borrar) => {
            if (borrar.value) {
        
              this._svmedico.eliminarMedico(medico._id)
                            .subscribe(()=>this.cargarMedicos());
              
            }
          })
    }
  
   

    //ACTUALIZAR IMAGEN DE Medico
  
    actualizarImagen(medico:Medico){

      this._svModalUpload.mostrarModal('medicos',medico._id,medico.image,'medico')
  
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


      if(this.terminoBusqueda.length <=0 ){
        this.cargarMedicos();
      }else{

        this._svmedico.buscarMedico(this.terminoBusqueda,this.desde)
                      .subscribe( (data:any) =>{
                        
                      this.medicos = data.medicos;
                      this.cargando= false;
              
       })

      }
  
      
  
      
    }
 




}
