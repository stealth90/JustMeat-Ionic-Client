import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantOrdersPageRoutingModule } from './restaurant-orders-routing.module';

import { RestaurantOrdersPage } from './restaurant-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantOrdersPageRoutingModule
  ],
  declarations: [RestaurantOrdersPage]
})
export class RestaurantOrdersPageModule {}
