import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import {PokeDetailsComponent} from './pokedex/poke-details/poke-details.component';
import {PokeComponent} from './poke.component';
import {PokeRoutingModule} from './poke-routing.module';
import {PokeService} from './poke.service';
import {LocationComponent} from './location/location.component';
import {PokedexComponent} from './pokedex/pokedex.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    PokeComponent,
    PokedexComponent,
    PokeDetailsComponent,
    LocationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokeRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    PokeService
  ]
})
export class PokeModule { }
