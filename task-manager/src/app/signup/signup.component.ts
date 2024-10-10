import { Component } from '@angular/core';
import { Storage, uploadBytesResumable, getDownloadURL, ref } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  uploadProgess!: Observable<number>;
  downloadURL$!: Observable<string>;

  name: string = '';
  lastName: string = '';
  age: number | null = null;
  phone: string = '';
  image: string = ''; // Aquí guardamos la URL de la imagen
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  selectedFile!: File; // Archivo seleccionado

  constructor(private authService: AuthService, private storage: Storage) { }

  // Método para manejar la selección de archivo
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("Archivo seleccionado:", this.selectedFile);
  }

  // Método para subir el archivo
  uploadFile(file: File, uid: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // Cambia la ruta para incluir el UID del usuario
      const filePath = `files/${uid}/${file.name}`;
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

  // Método de registro
  async register() {
    this.errorMessage = ''; // Reiniciar el mensaje de error
    try {
      // Registrar el usuario
      const { uid } = await this.authService.register(this.email, this.password, {
        name: this.name,
        lastName: this.lastName,
        age: this.age,
        phone: this.phone,
      });

      // Subir la imagen si hay un archivo seleccionado
      if (this.selectedFile) {
        this.image = await this.uploadFile(this.selectedFile, uid); // Usar el UID
      }

      // Actualizar el usuario con la URL de la imagen (si se subió)
      await this.authService.updateUserData(uid, {
        image: this.image, // La URL de la imagen subida
      });

      console.log('Registro exitoso');
      // Aquí puedes agregar redirección o cualquier otra acción
    } catch (error: any) {
      // Comprobar si el error tiene un código y un mensaje
      this.errorMessage = error.code ? `Error ${error.code}: ${error.message}` : 'Error en el registro';
      console.error('Error en el registro:', this.errorMessage);
    }
  }

}
