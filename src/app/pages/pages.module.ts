
 import {FormsModule} from '@angular/forms'

import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';

//ng2charts

import { ChartsModule } from 'ng2-charts';
//modulos 
import { SharedModule } from '../shared/shared.module';

//rutas 
import { PAGES_ROUTES } from './pages.routes';


//temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficadoughnutComponent } from '../components/graficadoughnut/graficadoughnut.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficadoughnutComponent,
    AccountSettingsComponent
   
  ],
  imports: [
     SharedModule,
     PAGES_ROUTES,
     FormsModule,
     ChartsModule
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    
   
  
  ]
})
export class PagesModule { }
