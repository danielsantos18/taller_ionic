// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  async register(email: string, password: string, additionalData: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        email: user.email,
        name: additionalData.name,
        lastName: additionalData.lastName,
        age: additionalData.age,
        phone: additionalData.phone,
        image: additionalData.image,
        createdAt: new Date(),
      });
      console.log('Usuario registrado con éxito:', user);
    } catch (error) {
      // Captura de errores y lanzamiento de un mensaje más descriptivo
      const errorCode = (error as any).code; // Puedes obtener el código del error
      const errorMessage = (error as Error).message || 'Ocurrió un error desconocido';
      console.error('Error en el registro', error);
      throw new Error(`Error ${errorCode}: ${errorMessage}`); // Lanzar error
    }
  }

  logout() {
    return this.auth.signOut();
  }

  loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
