import { PagesComponent } from './pages/pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
//rutas hijas de pages 
import { PAGESROUTES } from './pages/pages.routes';


const routes: Routes = [

  
  { path: 'login', component:LoginComponent },
  { path: 'register', component:RegisterComponent },
  { path: '',
   component: PagesComponent,
  children:PAGESROUTES },
  
  { path: '**', component:NopagefoundComponent }

  
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
