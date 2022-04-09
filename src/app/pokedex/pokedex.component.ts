import {Component, OnInit, ViewChild} from '@angular/core';
import {PokedexService} from './pokedex.service';
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  offset = 0;
  pokemon = [];

  constructor(private pokedexService: PokedexService) { }

  ngOnInit()  {
    this.loadPokemon();
  }

  loadPokemon(loadMore = false, event?) {
    if (loadMore) {
      this.offset += 25;
    }

    this.pokedexService.getPokemon(this.offset).subscribe(res => {
      this.pokemon = [...this.pokemon, ...res];

      if (event) {
        event.target.complete();
      }

      // Optional
      if (this.offset === 125) {
        this.infinite.disabled = true;
      }
    });
  }

  onSearchChange(e) {
    const value = e.detail.value;

    if (value === '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    this.pokedexService.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
    }, err => {
      this.pokemon = [];
    });
  }


}
