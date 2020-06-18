import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'ObservableRxJs', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios',iconoSub:'mdi mdi-account-box' },
        { titulo : 'Hospitales', url: '/hospitales',iconoSub:'mdi mdi-hospital-building' },
        { titulo: 'Medicos', url: '/medicos',iconoSub:'mdi mdi-account-multiple' }
      ]
    }
  ];

  constructor() { }
}
