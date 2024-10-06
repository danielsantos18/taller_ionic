import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module'; // Asegúrate de que este módulo contenga Header y Footer
import { TaskComponentModule } from '../task/task.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,  // Correcto: Importando el módulo compartido
    TaskComponentModule
  ],
  declarations: [HomeComponent]  // Solo declara el HomeComponent
})
export class HomeComponentModule { }
