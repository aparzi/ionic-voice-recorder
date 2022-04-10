import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    {title: 'Pokedex', url: '/poke', queryParams: {section: 'pokedex'}, icon: 'list'},
    {title: 'Poke Locations', url: '/poke', queryParams: {section: 'locations'}, icon: 'business'},
    {title: 'Voice recorder', url: '/voice-recorder', icon: 'mic-circle'},
    {title: 'Contact list', url: '/contact-list', icon: 'call'},
    {title: 'Random Contact', url: '/random-contact', icon: 'shuffle'}
  ];

  constructor() {
  }
}
