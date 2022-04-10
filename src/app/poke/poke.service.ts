import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineAll, map, mergeMap, switchMap} from 'rxjs/operators';
import {combineLatest, forkJoin, Observable, of} from "rxjs";

interface IResult {
  count: number;
  next: string;
  previous: string;
  results: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  baseUrl = 'https://pokeapi.co/api/v2';
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) {
  }

  getPokemon(offset = 0) {
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`)
      .pipe(
        map((result: IResult) => result?.results),
        map(pokemon => pokemon.map((poke, index) => {
            poke.image = this.getPokeImage(offset + index + 1);
            poke.pokeIndex = offset + index + 1;
            return poke;
          }))
      );
  }

  findPokemon(search) {
    return this.http.get(`${this.baseUrl}/pokemon/${search}`).pipe(
      map((pokemon: any) => {
        console.log('pokemon => ', pokemon);
        pokemon.image = this.getPokeImage(pokemon.id);
        pokemon.pokeIndex = pokemon.id;
        return pokemon;
      })
    );
  }

  getPokeImage(index) {
    return `${this.imageUrl}${index}.png`;
  }

  getPokeDetails(index) {
    return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map((poke: any) => {
        const sprites = Object.keys(poke.sprites);
        poke.images = sprites
          .map(spriteKey => poke.sprites[spriteKey])
          .filter(img => img);
        return poke;
      })
    );
  }

  getLocations(offset = 0) {
    return this.http.get(`${this.baseUrl}/location?offset=${offset}&limit=25`).pipe(
      switchMap((result: IResult) => {
        const requests$ = result?.results.map(r => this.http.get(r?.url));
        return forkJoin(requests$);
      })
    );
  }
}
