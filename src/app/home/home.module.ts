import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
}
