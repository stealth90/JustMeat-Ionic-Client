import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantsDetailPageRoutingModule } from './restaurants-detail-routing.module';

import { RestaurantsDetailPage } from './restaurants-detail.page';
import { BarRatingModule } from 'ngx-bar-rating';
import { RatingComponent } from 'src/app/rating/rating.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantsDetailPageRoutingModule,
    BarRatingModule
  ],
  declarations: [RestaurantsDetailPage, RatingComponent]
})
export class RestaurantsDetailPageModule {}
