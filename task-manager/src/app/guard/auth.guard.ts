import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Ajusta la ruta según tu estructura de carpetas
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  async canActivate(): Promise<boolean> {
    const user = this.authService.getCurrentUser();

    if (user) {
      return true; // Permitir acceso a la ruta
    } else {
      await this.presentToast('Acceso denegado. Por favor, inicie sesión.');
      this.router.navigate(['/login']); // Redirigir a la página de login si no está autenticado
      return false; // Denegar acceso a la ruta
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000, // Duración del mensaje en milisegundos
      position: 'top', // Posición del toast
    });
    await toast.present();
  }
}
