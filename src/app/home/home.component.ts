import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  slides = [
    {
      title: 'Benvenuto!',
      description: 'L\'applicazione è realizzata a scopo universitario, al fine di sostenere l\'esame <b> Software project management</b>.',
      image: 'assets/home/slide-1.png'
    },
    {
      title: 'Scopo',
      description: 'In questa app sono presenti una serie di sezioni, ognuna delle quali con un preciso scopo.',
      image: 'assets/home/slide-2.png'
    },
    {
      title: 'Permessi',
      description: 'Ogni sezione permette di accedere ad alcuni permessi di sistema (microfono, rubrica, ecc...)',
      image: 'assets/home/slide-3.png'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
