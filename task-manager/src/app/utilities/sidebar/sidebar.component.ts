import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular'; // Importa ToastController

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  user: any = {};
  imageUrl: string | null = null; // Variable para almacenar la URL de la imagen

  constructor(private router: Router, private authService: AuthService, private toastController: ToastController) { } // Inyecta ToastController

  ngOnInit() {
    this.loadUserData();
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user) {
        // Redirigir a login si el usuario no está autenticado
        this.router.navigate(['/login']);
      }
    });
  }

  // Método para mostrar notificaciones
  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      buttons: [{ text: 'Cerrar', role: 'cancel' }]
    });
    toast.present();
  }

  async loadUserData() {
    try {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        const uid = currentUser.uid;
        this.user = await this.authService.getUserData(uid);

        // Verifica que la URL sea válida
        this.imageUrl = this.user.image || null;
        console.log('URL de la imagen:', this.imageUrl);
      } else {
        console.warn('No se encontró un usuario autenticado.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async logout() {
    try {
      await this.authService.logout(); // Asegúrate de tener un método de logout en tu AuthService
      this.router.navigate(['/login']);
      this.showToast('Sesión cerrada exitosamente'); // Notificación de éxito
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      this.showToast('Error al cerrar sesión: ' ); // Notificación de error
    }
  }

  goToTasks() {
    this.router.navigate(['/home']);
    // Lógica para ir a tareas aquí
  }
}
