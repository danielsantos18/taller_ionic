import { Component, OnInit } from '@angular/core';
import { Storage, uploadBytesResumable, getDownloadURL, ref } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editableFields: { [key: string]: boolean } = {
    name: false,
    lastName: false,
    email: false,
    age: false,
    phone: false,
    image: false,
  };

  user: any = {};
  imageUrl: string | null = null; // Variable para almacenar la URL de la imagen
  uploadProgess!: Observable<number>;
  downloadURL$!: Observable<string>;

  name: string = '';
  lastName: string = '';
  age: number | null = null;
  phone: string = '';
  image: string = ''; // Aquí guardamos la URL de la imagen
  email: string = '';
  errorMessage: string = '';
  selectedFile!: File; // Archivo seleccionado

  constructor(private authService: AuthService, private storage: Storage) { }

  ngOnInit() {
    this.loadUserData();
  }

  // Método para cargar el perfil del usuario
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

  // Método para manejar la selección de archivo
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("Archivo seleccionado:", this.selectedFile);
  }

  // Método para subir el archivo
  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const currentUser = this.authService.getCurrentUser(); // Obtener el usuario actual
      if (!currentUser) {
        reject(new Error('Usuario no autenticado.'));
        return;
      }

      const filePath = `files/${currentUser.uid}/${file.name}`;
      const fileRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Progreso de carga:', progress);
        },
        (error) => {
          console.error('Error al cargar el archivo:', error);
          reject(error);
        },
        async () => {
          console.log('¡Archivo subido con éxito!');
          const url = await getDownloadURL(fileRef);
          console.log('URL del archivo:', url);
          resolve(url); // Devuelve la URL
        }
      );
    });
  }

  // Método para actualizar el perfil
  async updateProfile() {
    this.errorMessage = ''; // Reiniciar el mensaje de error
    try {
      const uid = await this.authService.getCurrentUser(); // Obtiene el UID del usuario actual
      // Subir la imagen si hay un archivo seleccionado
      if (this.selectedFile) {
        this.image = await this.uploadFile(this.selectedFile);
      }

      // Actualizar el usuario con los nuevos datos
      await this.authService.updateUserData(uid, {
        name: this.name,
        lastName: this.lastName,
        age: this.age,
        phone: this.phone,
        image: this.image, // La URL de la imagen subida
      });

      console.log('Perfil actualizado exitosamente');
      // Aquí puedes agregar una notificación o redirección
    } catch (error: any) {
      this.errorMessage = error.code ? `Error ${error.code}: ${error.message}` : 'Error al actualizar el perfil';
      console.error('Error al actualizar el perfil:', this.errorMessage);
    }
  }

  isFieldEditable(field: string): boolean {
    return this.editableFields[field];
  }

  toggleEdit(field: string) {
    this.editableFields[field] = !this.editableFields[field];
    if (!this.editableFields[field]) {
      this.imageUrl = null; // Reset the new image if editing is closed
    }
  }

}





