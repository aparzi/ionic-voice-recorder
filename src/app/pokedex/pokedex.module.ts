import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PokedexComponent} from './pokedex.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {PokedexRoutingModule} from './pokedex-routing.module';
import {PokedexService} from './pokedex.service';
import {HttpClientModule} from '@angular/common/http';
import {PokeDetailsComponent} from './poke-details/poke-details.component';

@NgModule({
  declarations: [
    PokedexComponent,
    PokeDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokedexRoutingModule,
    HttpClientModule
  ],
  providers: [
    PokedexService
  ]
})
export class PokedexModule { }
