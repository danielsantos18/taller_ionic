import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  // Cambia 'private' a 'public'
  constructor(public authService: AuthService, public router: Router) {}

  async loginWithEmail() {
    this.errorMessage = ''; // Reiniciar el mensaje de error
    if (!this.email || !this.password) {
      this.errorMessage = 'Email o contraseña no pueden estar vacíos';
      return;
    }

    try {
      await this.authService.loginWithEmail(this.email, this.password);
      console.log('Usuario autenticado con email');
      this.router.navigate(['/']); // Redirigir después del inicio de sesión
    } catch (error: any) {
      this.errorMessage = error.code ? `Error ${error.code}: ${error.message}` : 'Error en la autenticación';
      console.error('Error en la autenticación:', this.errorMessage);
    }
  }

  async loginWithGoogle() {
    this.errorMessage = ''; // Reiniciar el mensaje de error
    try {
      await this.authService.loginWithGoogle();
      console.log('Usuario autenticado con Google');
      this.router.navigate(['/']); // Redirigir después del inicio de sesión
    } catch (error: any) {
      this.errorMessage = error.code ? `Error ${error.code}: ${error.message}` : 'Error en la autenticación';
      console.error('Error en la autenticación con Google:', this.errorMessage);
    }
  }
}
