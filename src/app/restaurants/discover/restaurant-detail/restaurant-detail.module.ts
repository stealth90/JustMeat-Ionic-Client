import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantDetailPageRoutingModule } from './restaurant-detail-routing.module';

import { RestaurantDetailPage } from './restaurant-detail.page';
import { CreateOrderComponent } from '../../../orders/create-order/create-order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantDetailPageRoutingModule
  ],
  declarations: [RestaurantDetailPage, CreateOrderComponent],
  entryComponents: [CreateOrderComponent]
})
export class RestaurantDetailPageModule {}
