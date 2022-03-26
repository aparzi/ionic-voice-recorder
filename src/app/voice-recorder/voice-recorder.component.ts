import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RecordingData, VoiceRecorder} from 'capacitor-voice-recorder';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {GestureController, ToastController} from '@ionic/angular';
import {Haptics, ImpactStyle} from '@capacitor/haptics';


@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
  styleUrls: ['./voice-recorder.component.scss'],
})
export class VoiceRecorderComponent implements OnInit, AfterViewInit {

  @ViewChild('recordbtn', {read: ElementRef}) recordbtn: ElementRef;

  public recording = false;
  public storedFileNames = [];
  public durationDisplay = '';
  public duration = 0;

  constructor(private gestureCtrl: GestureController,
              private toastController: ToastController) {
  }

  ngOnInit(): void {
    this.loadFiles();
    VoiceRecorder.requestAudioRecordingPermission();
  }

  ngAfterViewInit(): void {
    const longpress = this.gestureCtrl.create({
      el: this.recordbtn.nativeElement,
      threshold: 0,
      gestureName: 'long-press',
      onStart: ev => {
        console.log('event => ', ev);
        Haptics.impact({style: ImpactStyle.Light});
        this.startRecording();
        this.calculateDuration();
      },
      onEnd: ev => {
        Haptics.impact({style: ImpactStyle.Light});
        this.stopRecording();
      }
    }, true);

    longpress.enable();
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

    VoiceRecorder.stopRecording().then(async (result: RecordingData) => {
      this.recording = false;
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
    }).catch(async _ => {
      this.recording = false;
      await this.viewToast('Press the button!');
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

  public async playFile(filename: string) {
    const audioFile = await Filesystem.readFile({
      path: filename,
      directory: Directory.Data
    });
    const base64sound = audioFile.data;

    const audioRef = new Audio(`data:audio/aac;base64,${base64sound}`);
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
  }

  public async deleteRecording(fileName) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: fileName
    });
    this.loadFiles();
  }

  public calculateDuration(): void {
    if (!this.recording) {
      this.duration = 0;
      this.durationDisplay = '';
      return;
    }

    this.duration += 1;
    const minutes = Math.floor(this.duration / 60);
    const seconds = (this.duration % 60).toString().padStart(2, '0');
    this.durationDisplay = `${minutes}:${seconds}`;

    setTimeout(() => {
      this.calculateDuration();
    }, 1000);
  }

  private async viewToast(message: string) {
    const toast = await this.toastController.create({
      color: 'warning',
      duration: 2500,
      message,
      position: 'middle'
    });

    await toast.present();
  }
}
