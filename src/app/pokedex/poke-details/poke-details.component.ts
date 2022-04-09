import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokedexService} from '../pokedex.service';

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss'],
})
export class PokeDetailsComponent implements OnInit {

  details: any;

  slideOpts = {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    }
  };

  constructor(private pokeService: PokedexService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');
    this.pokeService.getPokeDetails(index).subscribe(details => {
      this.details = details;
    });
  }

}
