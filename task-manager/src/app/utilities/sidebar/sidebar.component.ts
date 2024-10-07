import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {

  constructor(private router: Router) { }

  logout() {
    this.router.navigate(['/login']);
    // Lógica de logout aquí
  }

  goToProfile() {
    console.log('Profile clicked');
    // Lógica para ir al perfil aquí
  }

  goToTasks() {
    console.log('Tasks clicked');
    // Lógica para ir a tareas aquí
  }
}
