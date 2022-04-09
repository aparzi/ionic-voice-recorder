import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ContactListComponent} from './contact-list.component';
import {ContactListRoutingModule} from './contact-list-routing.module';
import {Ng2SearchPipeModule} from "ng2-search-filter";

@NgModule({
  declarations: [
    ContactListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactListRoutingModule,
    Ng2SearchPipeModule
  ]
})
export class ContactListModule {
}
