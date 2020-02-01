import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRestaurantPageRoutingModule } from './edit-restaurant-routing.module';

import { EditRestaurantPage } from './edit-restaurant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRestaurantPageRoutingModule
  ],
  declarations: [EditRestaurantPage]
})
export class EditRestaurantPageModule {}
