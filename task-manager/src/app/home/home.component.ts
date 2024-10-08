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
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user) {
        // Redirigir a login si el usuario no está autenticado
        this.router.navigate(['/login']);
      }
    });
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
