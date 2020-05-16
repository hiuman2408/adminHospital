

import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
//modulos 
import { SharedModule } from '../shared/shared.module';

//rutas 
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
  ],
  imports: [
    SharedModule,
     PAGES_ROUTES
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
   
  
  ]
})
export class PagesModule { }
