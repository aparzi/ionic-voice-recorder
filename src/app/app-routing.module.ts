import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'voice-recorder',
    pathMatch: 'full'
  },
  {
    path: 'voice-recorder',
    loadChildren: () => import('./voice-recorder/voice-recorder.module').then( m => m.VoiceRecorderModule)
  },
  {
    path: 'contact-list',
    loadChildren: () => import('./contact-management/contact-list.module').then( m => m.ContactListModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
