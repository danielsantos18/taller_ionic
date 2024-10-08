import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponentModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';  
import { TaskComponentModule } from './task/task.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileRoutingModule } from './profile/profile-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';  
import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent],  
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SharedModule,  
    HomeComponentModule,  
    ProfileModule,
    TaskComponentModule,
    ProfileRoutingModule,
    
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(environment.FIREBASE_CONFING)),  // Inicializamos Firebase
    provideAuth(() => getAuth()),  
    provideFirestore(() => getFirestore())  // Proveemos Firestore
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
