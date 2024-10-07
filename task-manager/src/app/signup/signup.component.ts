import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  // Definición de las propiedades necesarias
  name: string = '';
  lastName: string = '';
  age: number | null = null; // Se puede usar null inicialmente
  phone: string = '';
  image: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async signUp() {
    try {
      await this.authService.signUp(this.email, this.password);
      this.router.navigate(['/login']); // Redirigir al login después del registro
    } catch (error) {
      console.error('Error en el registro', error);
    }
  }
}