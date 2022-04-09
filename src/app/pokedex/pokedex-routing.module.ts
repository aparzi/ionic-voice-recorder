import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PokedexComponent} from './pokedex.component';
import {PokeDetailsComponent} from './poke-details/poke-details.component';

const routes: Routes = [
  {
    path: '',
    component: PokedexComponent
  },
  {
    path: 'pokemon/:index',
    component: PokeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokedexRoutingModule {}
