
import {  Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';


export const PAGESROUTES: Routes = [
    { path: 'dashboard', component:DashboardComponent },
    { path: 'progress', component:ProgressComponent },
    { path: 'graficas1', component:Graficas1Component },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
 ];