import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  logout() {
    console.log('Logout clicked');
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
