import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RandomContactComponent} from './random-contact.component';

const routes: Routes = [
  {
    path: '',
    component: RandomContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RandomContactRoutingModule {}
