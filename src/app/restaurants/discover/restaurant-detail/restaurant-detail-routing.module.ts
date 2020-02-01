import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantDetailPage } from './restaurant-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantDetailPageRoutingModule {}
