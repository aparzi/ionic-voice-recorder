import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RecordingData, VoiceRecorder} from 'capacitor-voice-recorder';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {GestureController} from '@ionic/angular';

@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
  styleUrls: ['./voice-recorder.component.scss'],
})
export class VoiceRecorderComponent implements OnInit, AfterViewInit {

  public recording = false;
  public storedFileNames = [];

  constructor(private gestureCtrl: GestureController) {
  }

  ngOnInit(): void {
    this.loadFiles();
    VoiceRecorder.requestAudioRecordingPermission();
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  public startRecording(): void {
    if (this.recording) {
      return;
    }

    this.recording = true;
    VoiceRecorder.startRecording();
  }

  public stopRecording(): void {
    if (!this.recording) {
      return;
    }

    this.recording = false;
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
        this.loadFiles();
      }
    });
  }

  async loadFiles() {
    Filesystem.readdir({
      path: '',
      directory: Directory.Data
    }).then(result => {
      console.log(result);
      this.storedFileNames = result.files;
    });
  }

  async playFile(filename: string) {
    const audioFile = await Filesystem.readFile({
      path: filename,
      directory: Directory.Data
    });
    const base64sound = audioFile.data;

    const audioRef = new Audio(`data:audio/aac;base64,${base64sound}`);
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
  }
}
