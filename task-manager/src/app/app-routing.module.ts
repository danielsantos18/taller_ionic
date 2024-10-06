import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
// app-routing.module.ts
{
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomeComponentModule)  // Asegúrate que coincide con el nombre exportado
},

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfileModule) // Asegúrate que sea 'ProfileModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
