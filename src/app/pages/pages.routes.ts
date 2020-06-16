

import {  Routes ,RouterModule} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const PagesRoutes: Routes = [
    { path: '',
       component: PagesComponent,
       canActivate:[LoginGuardGuard],
       children:[
          { path: 'dashboard', component:DashboardComponent,data:{titulo:'Dashboard'} },
          {path: 'profile', component:ProfileComponent,data:{titulo:'Perfil Usuario'} },
          { path: 'progress', component:ProgressComponent,data:{titulo:'Progress'} },
          { path: 'graficas1', component:Graficas1Component,data:{titulo:'Graficas'} },
          { path: 'accountSettings', component: AccountSettingsComponent,data:{titulo:'Agustes del tema'} },
          { path: 'promesas', component: PromesasComponent,data:{titulo:'Promesas'} },
          { path: 'rxjs', component:RxjsComponent,data:{titulo:'Observable RxJs'} },
          { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
          //mantenimiento
          {path: 'usuarios', component:UsuariosComponent,data:{titulo:'Mantenimiento Usuarios'} },
          ]
   }   
 ];

 
export const PAGES_ROUTES=RouterModule.forChild(PagesRoutes);






