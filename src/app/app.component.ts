import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    {title: 'Pokedex', url: '/pokedex', icon: 'list'},
    {title: 'Voice recorder', url: '/voice-recorder', icon: 'mic-circle'},
    {title: 'Contact list', url: '/contact-list', icon: 'call'},
    {title: 'Random Contact', url: '/folder/Outbox', icon: 'paper-plane'}
  ];

  constructor() {
  }
}
