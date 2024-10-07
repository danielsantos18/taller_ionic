import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  async signUp(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      // Redirigir al usuario a la página principal o dashboard después del inicio de sesión exitoso
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      // Redirigir al usuario a la página de inicio de sesión después de cerrar sesión
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
      throw error;
    }
  }

  getCurrentUser() {
    return this.afAuth.currentUser;
  }
}
