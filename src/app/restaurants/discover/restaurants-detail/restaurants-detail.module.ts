import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantsDetailPageRoutingModule } from './restaurants-detail-routing.module';

import { RestaurantsDetailPage } from './restaurants-detail.page';
import { BarRatingModule } from 'ngx-bar-rating';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantsDetailPageRoutingModule,
    BarRatingModule,
    SharedModule
  ],
  declarations: [RestaurantsDetailPage]
})
export class RestaurantsDetailPageModule {}
