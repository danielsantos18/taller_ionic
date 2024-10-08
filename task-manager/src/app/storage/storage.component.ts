import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent {
  constructor(private photoService: PhotoService) {}

  async uploadPhoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      try {
        await this.photoService.uploadPhoto(file);
        console.log('Foto cargada con éxito.');
      } catch (error) {
        console.error('Error al cargar la foto:', error);
      }
    }
  }
}
