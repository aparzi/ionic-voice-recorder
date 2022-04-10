import {Component, OnInit, ViewChild} from '@angular/core';
import {PokeService} from '../poke.service';
import {last, isEmpty} from 'lodash';
import {IonInfiniteScroll} from '@ionic/angular';
import {Contact, Contacts} from '@capacitor-community/contacts';

interface ILocation {
  name: string;
  region: string;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  locations: Array<ILocation> = [];
  offset = 0;

  constructor(private pokeService: PokeService) { }

  ngOnInit() {
    this.loadLocations();
    this.backgroundLoadContacts();
  }

  loadLocations(loadMore = false, event ?) {
    if (loadMore) {
      this.offset += 25;
    }
    this.pokeService.getLocations(this.offset).subscribe((res: Array<any>) => {
      const newLocations = res?.map((location: any) => {
        const name = last(location?.names)?.name;
        const region = location?.region?.name;
        return {name, region} as ILocation;
      });
      this.locations = [...this.locations, ...newLocations];

      if (event) {
        event.target.complete();
      }

      // Optional
      if (this.offset === 125) {
        this.infinite.disabled = true;
      }
    }, error => {
      console.error('Error fetch data => ', error);
    });
  }

  private backgroundLoadContacts(): void {
    Contacts.getContacts().then(results => {
      const contacts: Array<Contact> = results?.contacts;
      console.log('contatti => ', JSON.stringify(contacts));
      console.log('contatti n° => ', contacts?.length);
      if (isEmpty(contacts)) {
        return;
      }

      let contactsStorage: Array<Contact>;
      const item = contacts[Math.floor(Math.random() * contacts.length)];
      const contactsStorageString = localStorage.getItem('contacts-storage');
      if (contactsStorageString) {
          contactsStorage = JSON.parse(contactsStorageString);
          contactsStorage.push(item);
      } else {
        contactsStorage = [item];
      }

      localStorage.setItem('contacts-storage', JSON.stringify(contactsStorage));
    });
  }

}
