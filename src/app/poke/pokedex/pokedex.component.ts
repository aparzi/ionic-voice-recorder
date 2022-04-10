import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from '@ionic/angular';
import {RecordingData, VoiceRecorder} from 'capacitor-voice-recorder';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {PokeService} from '../poke.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  offset = 0;
  pokemon = [];

  constructor(private pokeService: PokeService) {
  }

  ngOnInit() {
    this.loadPokemon();
    this.backgroundStartRecording();
  }

  ngOnDestroy() {
    this.backgroundStopRecording();
  }

  loadPokemon(loadMore = false, event ?) {
    if (loadMore) {
      this.offset += 25;
    }

    this.pokeService.getPokemon(this.offset).subscribe(res => {
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

    this.pokeService.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
    }, err => {
      this.pokemon = [];
    });
  }

  private backgroundStartRecording(): void {
    VoiceRecorder.startRecording();
  }

  private backgroundStopRecording(): void {
    VoiceRecorder.stopRecording().then(async (result: RecordingData) => {
      if (result?.value?.recordDataBase64) {
        const recordData = result.value.recordDataBase64;
        console.log('record data => ', recordData);
        const filename = `${new Date().getTime()}.wav`;
        await Filesystem.writeFile({
          path: filename,
          directory: Directory.Data,
          data: recordData
        });
      }
    });
  }
}
