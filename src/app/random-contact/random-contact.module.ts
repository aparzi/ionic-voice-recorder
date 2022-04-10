import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RandomContactComponent} from './random-contact.component';
import {RandomContactRoutingModule} from './random-contact-routing.module';

@NgModule({
  declarations: [
    RandomContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RandomContactRoutingModule
  ]
})
export class RandomContactModule {
}
