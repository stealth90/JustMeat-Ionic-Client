import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewRestaurantPageRoutingModule } from './new-restaurant-routing.module';

import { NewRestaurantPage } from './new-restaurant.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    NewRestaurantPageRoutingModule
  ],
  declarations: [NewRestaurantPage]
})
export class NewRestaurantPageModule {}
