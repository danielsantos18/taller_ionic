// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  user: any = {};

  constructor(private authService: AuthService, private router: Router) { }

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

  async loadUserData() {
    try {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        const uid = currentUser.uid;
        this.user = await this.authService.getUserData(uid);
        console.log('Datos del usuario recuperados:', this.user);
      } else {
        console.warn('No se encontró un usuario autenticado.');
        this.user = null; // Asegúrate de establecer a null si no hay usuario
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.user = null; // También establece a null en caso de error
    }
  }
}
