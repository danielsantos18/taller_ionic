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
  isLoading: boolean = false; // Estado de carga

  constructor(public authService: AuthService, public router: Router) {}

  async loginWithEmail() {
    this.errorMessage = ''; // Reiniciar el mensaje de error
    if (!this.email || !this.password) {
      this.errorMessage = 'Email o contraseña no pueden estar vacíos';
      return;
    }

    this.isLoading = true; // Establecer loading en true
    try {
      await this.authService.loginWithEmail(this.email, this.password);
      console.log('Usuario autenticado con email');
      this.router.navigate(['/']); // Redirigir después del inicio de sesión
    } catch (error: any) {
      this.errorMessage = error.code ? `Error ${error.code}: ${error.message}` : 'Error en la autenticación';
      console.error('Error en la autenticación:', this.errorMessage);
    } finally {
      this.isLoading = false; // Asegurarse de que loading se establece en false
    }
  }

  async loginWithGoogle() {
    this.errorMessage = ''; // Reiniciar el mensaje de error
    this.isLoading = true; // Establecer loading en true
    try {
      await this.authService.loginWithGoogle();
      console.log('Usuario autenticado con Google');
      this.router.navigate(['/']); // Redirigir después del inicio de sesión
    } catch (error: any) {
      this.errorMessage = error.code ? `Error ${error.code}: ${error.message}` : 'Error en la autenticación';
      console.error('Error en la autenticación con Google:', this.errorMessage);
    } finally {
      this.isLoading = false; // Asegurarse de que loading se establece en false
    }
  }
}
