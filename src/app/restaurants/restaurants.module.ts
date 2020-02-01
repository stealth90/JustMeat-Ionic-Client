import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RestaurantsPageRoutingModule } from './restaurants-routing.module';

import { RestaurantsPage } from './restaurants.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RestaurantsPageRoutingModule
  ],
  declarations: [RestaurantsPage]
})
export class RestaurantsPageModule {}
