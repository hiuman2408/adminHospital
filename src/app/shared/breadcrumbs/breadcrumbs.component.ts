import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta ,MetaDefinition} from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

 titulo:string;
  constructor(private router:Router,
              private title: Title,
              private meta: Meta ) {
  
    this.getDataRoute().subscribe(event=>{
      //console.log(event)
      this.titulo =event.titulo;

     // console.log("Pagina:"+this.titulo);
      this.title.setTitle( this.titulo ); //colocar titulo en barra superior 
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };
      this.meta.updateTag( metaTag ); //tag para el buscado
  
    })

   
  
   }

  ngOnInit() {
  }

  getDataRoute(){

    return this.router.events.pipe(

      filter(evento => {
        return evento instanceof ActivationEnd
      }),
      filter( (evento: ActivationEnd) => evento.snapshot.url.length != 0 ),
      map( (evento: ActivationEnd ) => evento.snapshot.data )

    );

  }

}
