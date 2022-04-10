import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PokeDetailsComponent} from './pokedex/poke-details/poke-details.component';
import {LocationComponent} from './location/location.component';
import {PokedexComponent} from './pokedex/pokedex.component';
import {PokeComponent} from './poke.component';

const routes: Routes = [
  {
    path: '',
    component: PokeComponent
  },
  {
    path: 'pokedex',
    component: PokedexComponent
  },
  {
    path: 'pokedex/pokemon/:index',
    component: PokeDetailsComponent
  },
  {
    path: 'locations',
    component: LocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokeRoutingModule {}
