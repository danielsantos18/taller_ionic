import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Si estás usando Firebase Auth
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Si estás usando Firestore

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth, // Servicio de autenticación
    private firestore: AngularFirestore // Servicio de Firestore
  ) {}

  // Métodos para interactuar con Firebase
  createUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  // Métodos para interactuar con Firestore
  addData(collection: string, data: any) {
    return this.firestore.collection(collection).add(data);
  }

  getData(collection: string) {
    return this.firestore.collection(collection).snapshotChanges();
  }
}
