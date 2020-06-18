import { CommonModule } from '@angular/common';

 import {FormsModule, ReactiveFormsModule} from '@angular/forms'

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
import { PromesasComponent } from './promesas/promesas.component';

import { RxjsComponent } from './rxjs/rxjs.component';


//PIPES

import { PipesModule } from '../pipes/pipes.module';


import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficadoughnutComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    ModalUploadComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent
   
  ],
  imports: [
     SharedModule,
     PAGES_ROUTES,
     FormsModule,
     ChartsModule,
     PipesModule,
     CommonModule,
     ReactiveFormsModule,
     
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
     
  ]
})
export class PagesModule { }
