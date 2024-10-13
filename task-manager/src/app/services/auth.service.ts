import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from '@angular/fire/auth';
import { Firestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../model/user.model';
import { Storage, uploadBytesResumable, getDownloadURL, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userSubject = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore, private storage: Storage) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  getCurrentUser(): any | null {
    return this.auth.currentUser;
  }
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  async register(email: string, password: string, additionalData: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(this.firestore, `users/${user.uid}`);

      // Asigna un valor predeterminado a image si es undefined
      const imageUrl = additionalData.image || null; // O puedes usar una URL de imagen por defecto

      await setDoc(userDocRef, {
        email: user.email,
        name: additionalData.name,
        lastName: additionalData.lastName,
        age: additionalData.age,
        phone: additionalData.phone,
        image: imageUrl, // Guarda el valor de la imagen
        createdAt: new Date(),
      });

      console.log('Usuario registrado con éxito:', user);

      return { uid: user.uid }; // Retorna el UID
    } catch (error) {
      const errorCode = (error as any).code;
      const errorMessage = (error as Error).message || 'Ocurrió un error desconocido';
      console.error('Error en el registro', error);
      throw new Error(`Error ${errorCode}: ${errorMessage}`);
    }
  }


  async getUserData(uid: string): Promise<any> {
    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return userDoc.data(); // Retorna el objeto en su forma original
      } else {
        return null; // Retorna null si no existe el documento
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('No se pudieron recuperar los datos del usuario.');
    }
  }

  async getUserImageUrl(uid: string): Promise<string | null> {
    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        return data['image'] || null; // Correctly access the image property
      } else {
        return null; // Return null if the document does not exist
      }
    } catch (error) {
      console.error('Error fetching user image URL:', error);
      throw new Error('No se pudo recuperar la URL de la imagen del usuario.');
    }
  }

  async updateUserData(uid: string, updatedData: any) {
    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await setDoc(userDocRef, updatedData, { merge: true });
      console.log('Datos de usuario actualizados con éxito');
    } catch (error) {
      console.error('Error actualizando los datos del usuario:', error);
      throw new Error('No se pudieron actualizar los datos del usuario:');
    }
  }

  logout() {
    return this.auth.signOut();
  }

  loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}

