import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {VoiceRecorderComponent} from './voice-recorder.component';
import {VoiceRecorderRoutingModule} from './voice-recorder-routing.module';


@NgModule({
  declarations: [
    VoiceRecorderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoiceRecorderRoutingModule
  ],
})
export class VoiceRecorderModule {
}
