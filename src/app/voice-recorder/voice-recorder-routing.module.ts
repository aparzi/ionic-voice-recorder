import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {VoiceRecorderComponent} from './voice-recorder.component';

const routes: Routes = [
  {
    path: '',
    component: VoiceRecorderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoiceRecorderRoutingModule {}
