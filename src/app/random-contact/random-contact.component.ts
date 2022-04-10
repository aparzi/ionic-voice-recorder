import {Component, OnInit} from '@angular/core';
import {Contact} from '@capacitor-community/contacts';

@Component({
  selector: 'app-random-contact',
  templateUrl: './random-contact.component.html',
  styleUrls: ['./random-contact.component.scss'],
})
export class RandomContactComponent implements OnInit {

  randomContacts: Array<Contact> = [];

  constructor() {
  }

  ngOnInit() {
    this.loadRandomContacts();
  }

  private loadRandomContacts(): void {
    const contactsString = localStorage.getItem('contacts-storage');
    if (contactsString) {
      const contacts: Array<Contact> = JSON.parse(contactsString);
      this.randomContacts = [...contacts];
    }
  }

}
