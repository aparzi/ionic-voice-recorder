import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule)
  },
  {
    path: 'pokedex',
    loadChildren: () => import('./pokedex/pokedex.module').then( m => m.PokedexModule)
  },
  {
    path: 'voice-recorder',
    loadChildren: () => import('./voice-recorder/voice-recorder.module').then( m => m.VoiceRecorderModule)
  },
  {
    path: 'contact-list',
    loadChildren: () => import('./contact-management/contact-list.module').then( m => m.ContactListModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
