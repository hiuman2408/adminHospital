import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//RUTAS 
import { AppRoutingModule } from './app-routing.module';
//modulos 
import { PagesModule } from './pages/pages.module';


//componetes 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


//temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//servicios
import { ServiceModule } from './services/service.module';

ServiceModule 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
