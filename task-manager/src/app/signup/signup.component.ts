// src/app/components/signup/signup.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  name: string = '';
  lastName: string = '';
  age: number | null = null;
  phone: string = '';
  image: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  async register() {
    this.errorMessage = ''; // Reiniciar el mensaje de error
    try {
      await this.authService.register(this.email, this.password, {
        name: this.name,
        lastName: this.lastName,
        age: this.age,
        phone: this.phone,
        image: this.image,
      });
      console.log('Registro exitoso');
      // Aquí puedes agregar redirección o cualquier otra acción
    } catch (error: any) {  // Cambiamos `unknown` por `any`
      // Comprobar si el error tiene un código y un mensaje
      this.errorMessage = error.code ? `Error ${error.code}: ${error.message}` : 'Error en el registro';
      console.error('Error en el registro:', this.errorMessage);
    }
  }
}
