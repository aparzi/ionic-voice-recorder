import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecordingData, VoiceRecorder} from 'capacitor-voice-recorder';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {PokeService} from '../../poke.service';

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss'],
})
export class PokeDetailsComponent implements OnInit, OnDestroy {

  details: any;

  slideOpts = {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    }
  };

  constructor(private pokeService: PokeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');
    this.pokeService.getPokeDetails(index).subscribe(details => {
      this.details = details;
    });
    // this.backgroundStartRecording();
  }

  ngOnDestroy() {
    // this.backgroundStopRecording();
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
