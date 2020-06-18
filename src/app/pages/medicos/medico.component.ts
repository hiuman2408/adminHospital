import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../../services/services.index';
import { HospitalService } from 'src/app/services/services.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  medicoForm: FormGroup;
  
  hospitales: Hospital[] = [];

  medico: Medico = new Medico('', '', '', '', '');
  
  hospital: Hospital = new Hospital('');

  
  constructor(
    public _svMedico:MedicoService,
    public router:Router,
    public activatedRoute: ActivatedRoute,
    public _svModalUpload:ModalUploadService,
    public _svHospital:HospitalService)
     { 

      this.activatedRoute.params.subscribe(resp=>{

        let id = resp['id'];

        if ( id !== 'nuevo' ) {
          this.cargarMedico(id);

          this.medicoForm= this.crearFromGroup();
          
        }else{
          this.medico.nombre='';
          this.medico.hospital=''
          this.medicoForm= this.crearFromGroup();
        }

      })
    }



  ngOnInit() {

    this._svHospital.allHospitales().subscribe((data:any)=>{

      this.hospitales = data.hospitales
      
    })


    this._svModalUpload.notificacion
          .subscribe(resp => {
            //console.log(resp)

            this.medico.image = resp.medico.image;
          });
  }




  cargarMedico(id:string){

    this._svMedico.obtenerMedico(id).subscribe((resp:any)=>{
    
      this.hospital.image = resp.medico.hospital['image'];
      this.medico=resp.medico
      this.medico.hospital = resp.medico.hospital['_id'];
      this.medico.nombre = resp.medico.nombre;
      this.medicoForm= this.crearFromGroup();
      

    })

  }


  guardarMedico(){

    if (this.medicoForm.invalid ) {
      return;
    }

    let c = this.medicoForm.value;
    this.medico.nombre=c.nombre;
    this.medico.hospital=c.hospital;
   
    this._svMedico.guardarMedico(this.medico).subscribe(resp=>{

    
            this.medico._id = resp._id;
      
            this.router.navigate(['/medico', resp._id ]);
            
    })

    

  }

  /*guardarMedico( f: NgForm ){

    console.log(f.value);

  }*/

  cambioHospital( id:string ){

    this._svHospital.obtenerHospital( id )
          .subscribe( hospital => {
           
            this.hospital = hospital
          } );

  
  }


  cambiarFoto(medico:Medico){

    this._svModalUpload.mostrarModal('medicos',medico._id,medico.image,'medico')


  }


  crearFromGroup(){

    return new FormGroup({
      nombre:  new FormControl(this.medico.nombre,Validators.required),
      hospital:  new FormControl(this.medico.hospital,Validators.required)

    })
  }

  get nombre() { return this.medicoForm.get('nombre'); }
  get hospital1() { return this.medicoForm.get('hospital'); }


  resetearForm(){
    this.medicoForm.reset();
    
  }



}
