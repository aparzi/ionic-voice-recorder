import {Component, OnInit} from '@angular/core';
import {Contact, Contacts} from '@capacitor-community/contacts';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {SMS} from '@ionic-native/sms/ngx';
import {isPlatform, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {

  public filterTerm: string;
  public contacts: Array<Contact> = [];

  constructor(private callNumber: CallNumber,
              private sms: SMS,
              private toastController: ToastController) {
  }

  ngOnInit() {
    this.loadContacts();
  }

  public async loadContacts() {
    if (isPlatform('android')) {
      const permission = await Contacts.getPermissions();
      if (!permission.granted) {
        await this.viewToast('Permessi non abilitati per accedere ai contatti!');
        return;
      } else {
        Contacts.getContacts().then(results => {
          console.log(results);
          this.contacts = results.contacts;
          this.contacts = this.contacts.sort((a,b) => a.displayName > b.displayName ? 1 : -1);
        });
      }
    }
  }

  public call(contact: Contact) {
    this.callNumber.callNumber(contact.phoneNumbers[0].number, true);
  }

  public sendSms(contact: Contact) {
    this.sms.send(contact.phoneNumbers[0].number, 'Messaggio di testo predefinito!');
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
