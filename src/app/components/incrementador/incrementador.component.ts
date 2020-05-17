import { Component, OnInit, Input, Output ,EventEmitter, ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {


  @ViewChild('txtprogress',{static: false}) txtProgress:ElementRef;

  @Input('titulo')  leyenda:string="Leyenda"
  @Input() progreso:number=25;
 
  @Output() cambioValor:EventEmitter<number>=new EventEmitter;
  
  
  constructor() { 

     
  }

  ngOnInit() {
  }


   
  aumentar(){

    if(this.progreso<100){
      this.progreso = this.progreso+5;
      this.cambioValor.emit(this.progreso);
      this.txtProgress.nativeElement.focus();
    }
    
  }

  disminuir(){

    if(this.progreso>0){
      this.progreso = this.progreso-5
      this.cambioValor.emit(this.progreso);
      this.txtProgress.nativeElement.focus();
      
    }

  
  }

  onChange(newValor){

    //let elementHtml:any= document.getElementsByName('progreso')[0];

    if(newValor >= 100){
      this.progreso=100;
     
    }else if(newValor<=0){
      this.progreso=0
      
    }else if(newValor===null) {
      this.progreso = 0;
     
      
    }else{
      this.progreso = newValor
      
    }

   // console.log(this.txtProgress)

   // elementHtml.value = this.progreso
    
   this.txtProgress.nativeElement.value=this.progreso
    
   this.cambioValor.emit(this.progreso);

    

  }

}
