import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
    
    
  ],
  exports: [RouterModule]

})
export class ProfileRoutingModule { }
