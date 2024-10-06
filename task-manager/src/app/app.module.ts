import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponentModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { TaskComponentModule } from './task/task.module';

@NgModule({
  declarations: [AppComponent],  // Solo el AppComponent aquí
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicModule,
    SharedModule,  // Módulo compartido que contiene Header y Footer
    HomeComponentModule,  // Módulo para HomeComponent
    TaskComponentModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }

